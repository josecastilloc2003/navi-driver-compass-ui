
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft, 
  MapPin, 
  Navigation, 
  Phone, 
  Clock, 
  DollarSign,
  Car
} from 'lucide-react';

interface OrderDetailsProps {
  onBack: () => void;
}

const OrderDetails = ({ onBack }: OrderDetailsProps) => {
  // Mock order data - in real app this would come from props or API
  const orderData = {
    id: '6',
    service: 'Premium Ride',
    customerFirstName: 'David',
    pickup: '123 Main St, Downtown',
    dropoff: '789 Oak Ave, Eastside',
    duration: '25 mins',
    estimatedEarnings: '$38.00',
    status: 'in-progress',
    startTime: '1:30 PM',
    estimatedArrival: '1:55 PM'
  };

  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-4">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Order Details</h1>
            <p className="text-gray-600">Booking #{orderData.id}</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* Map Section */}
        <div className="h-64 bg-gradient-to-br from-blue-100 to-green-100 relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Route Map</h3>
              <p className="text-gray-600">Interactive map will be shown here</p>
            </div>
          </div>
        </div>

        {/* Order Information */}
        <div className="p-4 space-y-4">
          {/* Status Card */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Car className="h-5 w-5" />
                  {orderData.service}
                </CardTitle>
                <Badge className="bg-orange-100 text-orange-800">
                  In Progress
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Customer</span>
                <span className="font-medium">{orderData.customerFirstName}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Start Time</span>
                <span className="font-medium">{orderData.startTime}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Est. Arrival</span>
                <span className="font-medium">{orderData.estimatedArrival}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Duration</span>
                <span className="font-medium">{orderData.duration}</span>
              </div>
            </CardContent>
          </Card>

          {/* Route Information */}
          <Card>
            <CardHeader>
              <CardTitle>Route Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full mt-1.5"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">Pickup Location</p>
                    <p className="text-sm text-gray-600">{orderData.pickup}</p>
                  </div>
                </div>
                <div className="ml-2 w-px h-6 bg-gray-300"></div>
                <div className="flex items-start gap-3">
                  <div className="w-3 h-3 bg-red-500 rounded-full mt-1.5"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">Dropoff Location</p>
                    <p className="text-sm text-gray-600">{orderData.dropoff}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Earnings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-green-600" />
                Earnings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {orderData.estimatedEarnings}
                <span className="text-sm font-normal text-gray-500 ml-2">(estimated)</span>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="space-y-3 pb-6">
            <Button className="w-full gradient-navi text-white">
              <Navigation className="h-4 w-4 mr-2" />
              Start Navigation
            </Button>
            <Button variant="outline" className="w-full">
              <Phone className="h-4 w-4 mr-2" />
              Contact Customer
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
