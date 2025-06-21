import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Clock, 
  MapPin, 
  Car, 
  Calendar, 
  DollarSign,
  Navigation,
  Phone,
  ArrowRight,
  AlertTriangle
} from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import OrderDetails from './OrderDetails';

const DriverBookings = () => {
  const [activeTab, setActiveTab] = useState('pending-current');
  const [cancelReason, setCancelReason] = useState('');
  const [showOrderDetails, setShowOrderDetails] = useState(false);

  const bookings = {
    past: [
      {
        id: '1',
        service: 'Standard Ride',
        date: '2024-01-15',
        time: '2:30 PM',
        customerFirstName: 'Sarah',
        duration: '45 mins',
        earnings: '$45.50',
        status: 'completed'
      },
      {
        id: '2',
        service: 'Premium Ride', 
        date: '2024-01-15',
        time: '10:15 AM',
        customerFirstName: 'Michael',
        duration: '25 mins',
        earnings: '$28.75',
        status: 'completed'
      }
    ],
    pending: [
      {
        id: '3',
        service: 'Standard Ride',
        date: '2024-01-16',
        time: '3:00 PM',
        customerFirstName: 'Emma',
        pickup: '321 Elm St, Uptown',
        dropoff: '654 Maple Ave, Suburbs',
        duration: '30 mins',
        estimatedEarnings: '$32.00',
        status: 'confirmed'
      }
    ],
    current: [
      {
        id: '6',
        service: 'Premium Ride',
        date: '2024-01-16',
        time: '1:30 PM',
        customerFirstName: 'David',
        pickup: '123 Main St, Downtown',
        dropoff: '789 Oak Ave, Eastside',
        duration: '25 mins',
        estimatedEarnings: '$38.00',
        status: 'in-progress'
      }
    ],
    future: [
      {
        id: '4',
        service: 'Premium Ride',
        date: '2024-01-17',
        time: '9:00 AM',
        customerFirstName: 'Jessica',
        pickup: '987 Cedar Blvd, West Side',
        dropoff: 'Business District Plaza',
        duration: '40 mins',
        estimatedEarnings: '$55.00',
        status: 'scheduled'
      },
      {
        id: '5',
        service: 'Standard Ride',
        date: '2024-01-17',
        time: '2:15 PM',
        customerFirstName: 'Robert',
        pickup: 'University Campus',
        dropoff: '159 Valley Road',
        duration: '20 mins',
        estimatedEarnings: '$24.50',
        status: 'scheduled'
      }
    ]
  };

  if (showOrderDetails) {
    return <OrderDetails onBack={() => setShowOrderDetails(false)} />;
  }

  const tabs = [
    { id: 'past', label: 'Past Bookings' },
    { id: 'pending-current', label: 'Pending/Current', badge: bookings.pending.length + bookings.current.length },
    { id: 'future', label: 'Future', badge: bookings.future.length }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'confirmed':
        return 'bg-blue-100 text-blue-800';
      case 'scheduled':
        return 'bg-purple-100 text-purple-800';
      case 'in-progress':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const navigateToOrderDetails = (bookingId: string) => {
    console.log('Navigate to order details for booking:', bookingId);
    setShowOrderDetails(true);
  };

  const handleCancelOrder = (bookingId: string, reason: string) => {
    console.log('Cancel order:', bookingId, 'Reason:', reason);
    // Handle order cancellation logic here
  };

  const renderBookingCard = (booking: any, showCurrentButton = false) => (
    <Card key={booking.id} className="mb-4 hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <Car className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <CardTitle className="text-lg">{booking.customerFirstName}</CardTitle>
              <CardDescription>Booking #{booking.id}</CardDescription>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge className={getStatusColor(booking.status)}>
              {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
            </Badge>
            {showCurrentButton && (
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => navigateToOrderDetails(booking.id)}
              >
                <ArrowRight className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Date and Time */}
        <div className="flex items-center gap-2 text-gray-600">
          <Calendar className="h-4 w-4" />
          <span>{booking.date} at {booking.time}</span>
          <Clock className="h-4 w-4 ml-2" />
          <span>{booking.duration}</span>
        </div>

        {/* Locations - Only show for non-past bookings */}
        {activeTab !== 'past' && booking.pickup && booking.dropoff && (
          <div className="space-y-2">
            <div className="flex items-start gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full mt-1.5"></div>
              <div>
                <p className="text-sm font-medium text-gray-900">Pickup</p>
                <p className="text-sm text-gray-600">{booking.pickup}</p>
              </div>
            </div>
            <div className="ml-2 w-px h-4 bg-gray-300"></div>
            <div className="flex items-start gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full mt-1.5"></div>
              <div>
                <p className="text-sm font-medium text-gray-900">Dropoff</p>
                <p className="text-sm text-gray-600">{booking.dropoff}</p>
              </div>
            </div>
          </div>
        )}

        {/* Earnings */}
        <div className="flex items-center justify-between pt-2 border-t">
          <div className="flex items-center gap-2">
            <DollarSign className="h-4 w-4 text-green-600" />
            <span className="font-semibold text-green-600">
              {booking.earnings || booking.estimatedEarnings}
            </span>
            {booking.estimatedEarnings && (
              <span className="text-xs text-gray-500">(estimated)</span>
            )}
          </div>
        </div>

        {/* Action Buttons - Only for current orders */}
        {activeTab === 'pending-current' && booking.status === 'in-progress' && (
          <div className="flex gap-2 pt-2">
            <Button size="sm" className="flex-1 gradient-navi text-white">
              <Navigation className="h-4 w-4 mr-1" />
              Navigate
            </Button>
            <Button size="sm" variant="outline">
              <Phone className="h-4 w-4 mr-1" />
              Contact
            </Button>
          </div>
        )}
        
        {/* Action Buttons for Future Orders */}
        {activeTab === 'future' && (
          <div className="flex gap-2 pt-2">
            <Button size="sm" variant="outline" className="flex-1">
              View Details
            </Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button size="sm" variant="outline" className="text-red-600 border-red-200 hover:bg-red-50">
                  Cancel
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-red-600" />
                    Cancel Order
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you unable to complete your order? Please let us know why:
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <div className="py-4">
                  <textarea
                    value={cancelReason}
                    onChange={(e) => setCancelReason(e.target.value)}
                    placeholder="Please explain why you need to cancel this order..."
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-[100px]"
                  />
                </div>
                <AlertDialogFooter>
                  <AlertDialogCancel onClick={() => setCancelReason('')}>
                    Keep Order
                  </AlertDialogCancel>
                  <AlertDialogAction 
                    onClick={() => {
                      handleCancelOrder(booking.id, cancelReason);
                      setCancelReason('');
                    }}
                    className="bg-red-600 hover:bg-red-700"
                  >
                    Cancel Order
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        )}
      </CardContent>
    </Card>
  );

  const getCurrentBookings = () => {
    if (activeTab === 'pending-current') {
      return [...bookings.pending, ...bookings.current];
    }
    return bookings[activeTab as keyof typeof bookings] || [];
  };

  const getEmptyMessage = () => {
    switch (activeTab) {
      case 'pending-current':
        return "No pending or current rides at the moment.";
      case 'future':
        return "No upcoming rides scheduled.";
      case 'past':
        return "No completed rides to show.";
      default:
        return "No bookings to display.";
    }
  };

  const renderPendingCurrentContent = () => {
    const pendingBookings = bookings.pending;
    const currentBookings = bookings.current;
    
    return (
      <div className="space-y-6">
        {/* Pending Orders Section */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-3">Pending Orders</h3>
          {pendingBookings.length > 0 ? (
            <div className="space-y-4">
              {pendingBookings.map(booking => renderBookingCard(booking))}
            </div>
          ) : (
            <Card>
              <CardContent className="p-6 text-center">
                <p className="text-gray-500">No pending orders at the moment</p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Current Orders Section */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-3">Current Orders</h3>
          {currentBookings.length > 0 ? (
            <div className="space-y-4">
              {currentBookings.map(booking => renderBookingCard(booking, true))}
            </div>
          ) : (
            <Card>
              <CardContent className="p-6 text-center">
                <p className="text-gray-500">No current orders</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-4">
        <h1 className="text-2xl font-bold text-gray-900">My Bookings</h1>
        <p className="text-gray-600">Manage your ride requests</p>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200 px-4">
        <div className="flex space-x-1 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.label}
              {tab.badge !== undefined && tab.badge > 0 && (
                <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                  {tab.badge}
                </Badge>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {activeTab === 'pending-current' ? (
          renderPendingCurrentContent()
        ) : getCurrentBookings().length > 0 ? (
          <div className="space-y-4">
            {getCurrentBookings().map(booking => renderBookingCard(booking))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-64 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <Calendar className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No {activeTab === 'pending-current' ? 'pending/current' : activeTab} bookings
            </h3>
            <p className="text-gray-500 max-w-sm">
              {getEmptyMessage()}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DriverBookings;
