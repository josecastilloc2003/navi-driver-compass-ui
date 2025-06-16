
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  MapPin, 
  DollarSign, 
  Calendar, 
  Star, 
  Shield, 
  Bell, 
  ChevronUp,
  Navigation,
  Clock,
  Award,
  AlertTriangle
} from 'lucide-react';

interface DriverHomeProps {
  onNavigateToBookings?: () => void;
  onNavigateToCalendar?: () => void;
  onNavigateToEarnings?: () => void;
  onNavigateToSafety?: () => void;
  onNavigateToNotifications?: () => void;
}

const DriverHome = ({ 
  onNavigateToBookings,
  onNavigateToCalendar,
  onNavigateToEarnings,
  onNavigateToSafety,
  onNavigateToNotifications
}: DriverHomeProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const quickActions = [
    {
      title: 'Calendar',
      description: 'Manage your schedule',
      icon: Calendar,
      color: 'gradient-success',
      action: onNavigateToCalendar || (() => console.log('Open calendar'))
    },
    {
      title: 'Earnings & Finances',
      description: '$245.50 today',
      icon: DollarSign,
      color: 'gradient-warning',
      action: onNavigateToEarnings || (() => console.log('View earnings'))
    },
    {
      title: 'Provider Milestones',
      description: 'View achievements',
      icon: Award,
      color: 'bg-purple-500',
      action: () => console.log('View milestones')
    },
    {
      title: 'Safety Toolkit',
      description: 'Emergency & safety features',
      icon: Shield,
      color: 'bg-red-500',
      action: onNavigateToSafety || (() => console.log('Open safety toolkit'))
    },
    {
      title: 'Notifications',
      description: '3 new updates',
      icon: Bell,
      color: 'bg-indigo-500',
      action: onNavigateToNotifications || (() => console.log('View notifications'))
    }
  ];

  return (
    <div className="h-full flex flex-col relative">
      {/* Map Section */}
      <div className="relative h-full bg-gradient-to-br from-blue-100 to-green-100">
        {/* Header */}
        <div className="absolute top-0 left-0 right-0 z-10 bg-white/90 backdrop-blur-sm border-b border-gray-200">
          <div className="flex items-center justify-between p-4">
            <div>
              <h1 className="text-xl font-bold text-gray-900">Good Morning, John</h1>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Online • Ready for rides</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="text-right">
                <div className="text-lg font-bold text-green-600">$245.50</div>
                <div className="text-xs text-gray-500">Today's earnings</div>
              </div>
            </div>
          </div>
        </div>

        {/* Mock Map */}
        <div className="h-full flex items-center justify-center pt-20">
          <div className="text-center">
            <div className="w-24 h-24 gradient-navi rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="h-12 w-12 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">You're in Downtown</h3>
            <p className="text-gray-600">Tap the expand button below to access your dashboard</p>
          </div>
        </div>

        {/* Current Status Card */}
        <div className="absolute bottom-20 left-4 right-4 z-10">
          <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <div>
                    <p className="font-medium text-gray-900">Available for rides</p>
                    <p className="text-sm text-gray-500">No active bookings</p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-blue-600 border-blue-200 hover:bg-blue-50"
                  onClick={onNavigateToBookings}
                >
                  Go to Current Bookings
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Expand Button */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:shadow-xl transition-shadow"
        >
          <ChevronUp className={`h-6 w-6 text-gray-600 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
        </button>
      </div>

      {/* Expandable Dashboard */}
      <div className={`absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-2xl transition-transform duration-300 z-30 ${
        isExpanded ? 'transform translate-y-0' : 'transform translate-y-full'
      }`}>
        <div className="h-screen overflow-y-auto">
          {/* Handle */}
          <div className="flex justify-center py-3">
            <div className="w-12 h-1 bg-gray-300 rounded-full"></div>
          </div>

          {/* Dashboard Content */}
          <div className="px-4 pb-24">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Driver Dashboard</h2>
              <p className="text-gray-600">Quick access to all your tools</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-blue-600 mb-1">4.9</div>
                  <div className="text-sm text-gray-600">Rating</div>
                  <div className="flex justify-center mt-1">
                    {Array.from({ length: 5 }, (_, i) => (
                      <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-green-600 mb-1">127</div>
                  <div className="text-sm text-gray-600">Trips This Month</div>
                  <div className="text-xs text-green-600 mt-1">+15% from last month</div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions Grid */}
            <div className="grid grid-cols-2 gap-4">
              {quickActions.map((action, index) => (
                <Card 
                  key={index}
                  className="hover:shadow-md transition-shadow cursor-pointer"
                  onClick={action.action}
                >
                  <CardContent className="p-4">
                    <div className={`w-12 h-12 ${action.color} rounded-lg flex items-center justify-center mb-3`}>
                      <action.icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-1">{action.title}</h3>
                    <p className="text-sm text-gray-600">{action.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Recent Activity */}
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
              <div className="space-y-3">
                {[
                  { time: '2 hours ago', event: 'Completed trip to Airport', amount: '+$45.50' },
                  { time: '4 hours ago', event: 'Completed trip to Downtown', amount: '+$28.75' },
                  { time: '6 hours ago', event: 'Completed trip to Mall', amount: '+$15.25' }
                ].map((activity, index) => (
                  <Card key={index}>
                    <CardContent className="p-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-900">{activity.event}</p>
                          <p className="text-sm text-gray-500">{activity.time}</p>
                        </div>
                        <div className="text-green-600 font-semibold">{activity.amount}</div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DriverHome;
