
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Clock, 
  MapPin, 
  User, 
  Car, 
  Calendar, 
  DollarSign,
  Star,
  Navigation,
  Phone
} from 'lucide-react';

const DriverBookings = () => {
  const [activeTab, setActiveTab] = useState('pending');

  const bookings = {
    past: [
      {
        id: '1',
        service: 'Standard Ride',
        customer: 'Sarah Johnson',
        rating: 5,
        date: '2024-01-15',
        time: '2:30 PM',
        pickup: '123 Main St, Downtown',
        dropoff: 'Airport Terminal 1',
        duration: '45 mins',
        earnings: '$45.50',
        status: 'completed'
      },
      {
        id: '2',
        service: 'Premium Ride',
        customer: 'Michael Chen',
        rating: 4,
        date: '2024-01-15',
        time: '10:15 AM',
        pickup: '456 Oak Ave, Midtown',
        dropoff: '789 Pine St, Downtown',
        duration: '25 mins',
        earnings: '$28.75',
        status: 'completed'
      }
    ],
    pending: [
      {
        id: '3',
        service: 'Standard Ride',
        customer: 'Emma Wilson',
        date: '2024-01-16',
        time: '3:00 PM',
        pickup: '321 Elm St, Uptown',
        dropoff: '654 Maple Ave, Suburbs',
        duration: '30 mins',
        estimatedEarnings: '$32.00',
        status: 'confirmed'
      }
    ],
    current: [],
    future: [
      {
        id: '4',
        service: 'Premium Ride',
        customer: 'David Brown',
        date: '2024-01-17',
        time: '9:00 AM',
        pickup: '987 Cedar Blvd, West Side',
        dropoff: 'Business District Plaza',
        duration: '40 mins',
        estimatedEarnings: '$55.00',
        status: 'scheduled'
      },
      {
        id: '5',
        service: 'Standard Ride',
        customer: 'Lisa Martinez',
        date: '2024-01-17',
        time: '2:15 PM',
        pickup: 'University Campus',
        dropoff: '159 Valley Road',
        duration: '20 mins',
        estimatedEarnings: '$24.50',
        status: 'scheduled'
      },
      {
        id: '6',
        service: 'Premium Ride',
        customer: 'Robert Wilson',
        date: '2024-01-18',
        time: '8:30 AM',
        pickup: 'Hotel Grand Plaza',
        dropoff: 'International Airport',
        duration: '50 mins',
        estimatedEarnings: '$65.00',
        status: 'scheduled'
      },
      {
        id: '7',
        service: 'Standard Ride',
        customer: 'Jennifer Lee',
        date: '2024-01-19',
        time: '5:45 PM',
        pickup: 'Shopping Mall',
        dropoff: 'Residential Area',
        duration: '35 mins',
        estimatedEarnings: '$38.00',
        status: 'scheduled'
      }
    ]
  };

  const tabs = [
    { id: 'past', label: 'Past Bookings' },
    { id: 'pending', label: 'Pending', badge: bookings.pending.length },
    { id: 'current', label: 'Current', badge: bookings.current.length },
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

  const renderBookingCard = (booking: any) => (
    <Card key={booking.id} className="mb-4 hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <User className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <CardTitle className="text-lg">{booking.customer}</CardTitle>
              <CardDescription className="flex items-center gap-2">
                <Car className="h-4 w-4" />
                {booking.service}
              </CardDescription>
            </div>
          </div>
          <Badge className={getStatusColor(booking.status)}>
            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
          </Badge>
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

        {/* Locations */}
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

        {/* Earnings and Rating */}
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
          
          {booking.rating && (
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium">{booking.rating}.0</span>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        {activeTab === 'pending' && (
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
        
        {activeTab === 'future' && (
          <div className="flex gap-2 pt-2">
            <Button size="sm" variant="outline" className="flex-1">
              View Details
            </Button>
            <Button size="sm" variant="outline" className="text-red-600 border-red-200 hover:bg-red-50">
              Cancel
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );

  const getCurrentBookings = () => {
    return bookings[activeTab as keyof typeof bookings] || [];
  };

  const getEmptyMessage = () => {
    switch (activeTab) {
      case 'current':
        return "You don't have any active rides right now.";
      case 'pending':
        return "No pending ride requests at the moment.";
      case 'future':
        return "No upcoming rides scheduled.";
      case 'past':
        return "No completed rides to show.";
      default:
        return "No bookings to display.";
    }
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
        {getCurrentBookings().length > 0 ? (
          <div className="space-y-4">
            {getCurrentBookings().map(renderBookingCard)}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-64 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <Calendar className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No {activeTab} bookings
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
