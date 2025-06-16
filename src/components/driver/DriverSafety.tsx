
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  ArrowLeft, 
  Shield, 
  MapPin, 
  Phone, 
  AlertTriangle, 
  Users, 
  MessageSquare,
  Navigation,
  Clock
} from 'lucide-react';

interface DriverSafetyProps {
  onBack: () => void;
}

const DriverSafety = ({ onBack }: DriverSafetyProps) => {
  const [isLocationSharing, setIsLocationSharing] = useState(false);
  const [emergencyContact, setEmergencyContact] = useState('');

  const handleShareLocation = () => {
    setIsLocationSharing(!isLocationSharing);
    // In a real app, this would trigger actual location sharing
    console.log(isLocationSharing ? 'Stopped sharing location' : 'Started sharing location');
  };

  const handleEmergencyReport = (type: 'support' | 'police') => {
    // In a real app, this would trigger emergency protocols
    console.log(`Emergency report to ${type}`);
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
            <h1 className="text-2xl font-bold text-gray-900">Safety Toolkit</h1>
            <p className="text-gray-600">Your safety is our priority</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Emergency Alert */}
        <Alert className="border-red-200 bg-red-50">
          <AlertTriangle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800">
            <strong>Emergency?</strong> If you're in immediate danger, call 911 or your local emergency number directly.
          </AlertDescription>
        </Alert>

        {/* Live Location Sharing */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Live Location Sharing
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-600 text-sm">
              Share your live location with trusted friends and family during rides for added security.
            </p>
            
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Emergency Contact Phone
                </label>
                <input
                  type="tel"
                  value={emergencyContact}
                  onChange={(e) => setEmergencyContact(e.target.value)}
                  placeholder="+1 (555) 123-4567"
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <Button
                onClick={handleShareLocation}
                className={`w-full ${
                  isLocationSharing 
                    ? 'bg-red-500 hover:bg-red-600 text-white' 
                    : 'gradient-navi text-white'
                }`}
              >
                <Navigation className="h-4 w-4 mr-2" />
                {isLocationSharing ? 'Stop Sharing Location' : 'Start Sharing Location'}
              </Button>

              {isLocationSharing && (
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center gap-2 text-green-800">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium">Location sharing active</span>
                  </div>
                  <p className="text-xs text-green-700 mt-1">
                    Your trusted contacts can see your location
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Quick Emergency Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Phone className="h-5 w-5" />
              Emergency Reporting
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-600 text-sm">
              Report incidents or concerns quickly to get help when you need it.
            </p>

            <div className="grid grid-cols-1 gap-3">
              <Button
                onClick={() => handleEmergencyReport('support')}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white justify-start"
              >
                <MessageSquare className="h-4 w-4 mr-3" />
                <div className="text-left">
                  <div className="font-medium">Contact Navi Support</div>
                  <div className="text-xs opacity-90">Report safety concerns or get assistance</div>
                </div>
              </Button>

              <Button
                onClick={() => handleEmergencyReport('police')}
                className="w-full bg-red-500 hover:bg-red-600 text-white justify-start"
              >
                <AlertTriangle className="h-4 w-4 mr-3" />
                <div className="text-left">
                  <div className="font-medium">Contact Local Authorities</div>
                  <div className="text-xs opacity-90">Report to police or emergency services</div>
                </div>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Safety Features */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Safety Features
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 border rounded-lg">
                <Users className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-gray-900">Trusted Contacts</h4>
                  <p className="text-sm text-gray-600">
                    Add up to 5 trusted contacts who can receive your location and trip updates
                  </p>
                  <Button variant="outline" size="sm" className="mt-2">
                    Manage Contacts
                  </Button>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 border rounded-lg">
                <Clock className="h-5 w-5 text-green-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-gray-900">Trip Monitoring</h4>
                  <p className="text-sm text-gray-600">
                    All trips are monitored by our safety team for unusual patterns or routes
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 border rounded-lg">
                <Shield className="h-5 w-5 text-purple-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-gray-900">24/7 Support</h4>
                  <p className="text-sm text-gray-600">
                    Our safety team is available around the clock to assist with any concerns
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Safety Tips */}
        <Card className="border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle className="text-blue-900">Safety Tips</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-blue-800">
              <li>• Always verify passenger identity before starting the trip</li>
              <li>• Trust your instincts - cancel trips if something feels wrong</li>
              <li>• Keep your phone charged and accessible</li>
              <li>• Follow the GPS route and avoid shortcuts through isolated areas</li>
              <li>• Keep car doors locked until you verify the passenger</li>
              <li>• Report any suspicious behavior immediately</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DriverSafety;
