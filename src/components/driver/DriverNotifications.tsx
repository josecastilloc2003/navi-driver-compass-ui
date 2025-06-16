
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft, 
  Bell, 
  DollarSign, 
  AlertTriangle, 
  Info, 
  Gift,
  Trash2,
  MarkAsRead
} from 'lucide-react';

interface DriverNotificationsProps {
  onBack: () => void;
}

interface Notification {
  id: string;
  type: 'tip' | 'news' | 'alert' | 'update';
  title: string;
  message: string;
  time: string;
  read: boolean;
  amount?: string;
}

const DriverNotifications = ({ onBack }: DriverNotificationsProps) => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'tip',
      title: 'New Tip Received',
      message: 'Sarah Johnson added a $5.00 tip to your ride to Downtown',
      time: '2 hours ago',
      read: false,
      amount: '$5.00'
    },
    {
      id: '2',
      type: 'alert',
      title: 'Traffic Alert',
      message: 'Heavy traffic reported on I-95. Consider alternative routes for better earnings.',
      time: '4 hours ago',
      read: false
    },
    {
      id: '3',
      type: 'news',
      title: 'New Feature: In-App Navigation',
      message: 'We\'ve added turn-by-turn navigation directly in the app. Update now to try it!',
      time: '1 day ago',
      read: true
    },
    {
      id: '4',
      type: 'tip',
      title: 'Tip Added',
      message: 'Michael Chen added a $8.50 tip to your Airport ride',
      time: '1 day ago',
      read: true,
      amount: '$8.50'
    },
    {
      id: '5',
      type: 'update',
      title: 'Weekly Earnings Summary',
      message: 'You earned $1,245 this week! You\'re in the top 15% of drivers in your area.',
      time: '2 days ago',
      read: true
    },
    {
      id: '6',
      type: 'alert',
      title: 'Document Expiration Reminder',
      message: 'Your vehicle registration expires in 30 days. Please update your documents.',
      time: '3 days ago',
      read: false
    }
  ]);

  const [filter, setFilter] = useState<'all' | 'unread' | 'tips' | 'alerts'>('all');

  const getFilteredNotifications = () => {
    let filtered = notifications;
    
    switch (filter) {
      case 'unread':
        filtered = notifications.filter(n => !n.read);
        break;
      case 'tips':
        filtered = notifications.filter(n => n.type === 'tip');
        break;
      case 'alerts':
        filtered = notifications.filter(n => n.type === 'alert');
        break;
    }
    
    return filtered;
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(n => ({ ...n, read: true }))
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'tip':
        return <DollarSign className="h-5 w-5 text-green-600" />;
      case 'alert':
        return <AlertTriangle className="h-5 w-5 text-red-600" />;
      case 'news':
        return <Gift className="h-5 w-5 text-blue-600" />;
      case 'update':
        return <Info className="h-5 w-5 text-purple-600" />;
      default:
        return <Bell className="h-5 w-5 text-gray-600" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'tip':
        return 'bg-green-100 text-green-800';
      case 'alert':
        return 'bg-red-100 text-red-800';
      case 'news':
        return 'bg-blue-100 text-blue-800';
      case 'update':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={onBack}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
              <p className="text-gray-600">
                {unreadCount > 0 ? `${unreadCount} unread notifications` : 'All caught up!'}
              </p>
            </div>
          </div>
          
          {unreadCount > 0 && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={markAllAsRead}
              className="text-blue-600"
            >
              <MarkAsRead className="h-4 w-4 mr-1" />
              Mark All Read
            </Button>
          )}
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="bg-white border-b border-gray-200 px-4">
        <div className="flex space-x-1 overflow-x-auto">
          {[
            { id: 'all', label: 'All', count: notifications.length },
            { id: 'unread', label: 'Unread', count: unreadCount },
            { id: 'tips', label: 'Tips', count: notifications.filter(n => n.type === 'tip').length },
            { id: 'alerts', label: 'Alerts', count: notifications.filter(n => n.type === 'alert').length }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                filter === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.label}
              {tab.count > 0 && (
                <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                  {tab.count}
                </Badge>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Notifications List */}
      <div className="flex-1 overflow-y-auto p-4">
        {getFilteredNotifications().length > 0 ? (
          <div className="space-y-3">
            {getFilteredNotifications().map((notification) => (
              <Card 
                key={notification.id} 
                className={`hover:shadow-md transition-shadow ${
                  !notification.read ? 'border-blue-200 bg-blue-50/30' : ''
                }`}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-1">
                      {getIcon(notification.type)}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className={`font-medium ${!notification.read ? 'text-gray-900' : 'text-gray-700'}`}>
                              {notification.title}
                            </h3>
                            {!notification.read && (
                              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            )}
                          </div>
                          <p className={`text-sm ${!notification.read ? 'text-gray-700' : 'text-gray-600'}`}>
                            {notification.message}
                          </p>
                          <div className="flex items-center gap-2 mt-2">
                            <Badge className={getTypeColor(notification.type)}>
                              {notification.type.charAt(0).toUpperCase() + notification.type.slice(1)}
                            </Badge>
                            {notification.amount && (
                              <Badge className="bg-green-100 text-green-800">
                                {notification.amount}
                              </Badge>
                            )}
                            <span className="text-xs text-gray-500">{notification.time}</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-1">
                          {!notification.read && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => markAsRead(notification.id)}
                              className="h-8 w-8 p-0 text-blue-600"
                            >
                              <MarkAsRead className="h-4 w-4" />
                            </Button>
                          )}
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => deleteNotification(notification.id)}
                            className="h-8 w-8 p-0 text-red-600"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-64 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <Bell className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No notifications
            </h3>
            <p className="text-gray-500 max-w-sm">
              {filter === 'all' 
                ? "You're all caught up! No notifications to show."
                : `No ${filter} notifications at the moment.`}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DriverNotifications;
