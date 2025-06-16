
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Car, User, MapPin } from 'lucide-react';

interface EntryPageProps {
  onNavigate: (page: 'driver-signup' | 'driver-signin' | 'user-signup' | 'user-signin') => void;
}

const EntryPage = ({ onNavigate }: EntryPageProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <div className="gradient-navi text-white py-8 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <MapPin className="h-8 w-8" />
            <h1 className="text-4xl font-bold">Navi</h1>
          </div>
          <p className="text-xl text-blue-100">Your trusted ride companion</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Welcome Section */}
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Welcome to Navi</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Join thousands of drivers earning money on their schedule, or book reliable rides with trusted drivers in your community.
            </p>
          </div>

          {/* Action Cards */}
          <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {/* Driver Section */}
            <Card className="hover:shadow-lg transition-shadow duration-300 border-2 border-transparent hover:border-blue-200">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 gradient-navi rounded-full flex items-center justify-center mx-auto mb-4">
                  <Car className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl">Drive with Navi</CardTitle>
                <CardDescription>Start earning money as a driver today</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  onClick={() => onNavigate('driver-signup')}
                  className="w-full gradient-navi text-white hover:opacity-90 transition-opacity"
                  size="lg"
                >
                  Create Driver Account
                </Button>
                <Button 
                  onClick={() => onNavigate('driver-signin')}
                  variant="outline" 
                  className="w-full border-blue-200 text-blue-600 hover:bg-blue-50"
                  size="lg"
                >
                  Sign In as Driver
                </Button>
              </CardContent>
            </Card>

            {/* User Section */}
            <Card className="hover:shadow-lg transition-shadow duration-300 border-2 border-transparent hover:border-green-200">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 gradient-success rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl">Ride with Navi</CardTitle>
                <CardDescription>Book reliable rides in your area</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  onClick={() => onNavigate('user-signup')}
                  className="w-full gradient-success text-white hover:opacity-90 transition-opacity"
                  size="lg"
                >
                  Create User Account
                </Button>
                <Button 
                  onClick={() => onNavigate('user-signin')}
                  variant="outline" 
                  className="w-full border-green-200 text-green-600 hover:bg-green-50"
                  size="lg"
                >
                  Sign In as User
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <MapPin className="h-6 w-6" />
            <span className="text-xl font-semibold">Navi</span>
          </div>
          <p className="text-gray-400">Connecting drivers and riders safely and efficiently</p>
        </div>
      </footer>
    </div>
  );
};

export default EntryPage;
