
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ArrowLeft, ArrowRight, Calendar as CalendarIcon, Car, Upload, FileText } from 'lucide-react';
import { format, addDays, startOfDay } from 'date-fns';
import { cn } from '@/lib/utils';

interface DriverSignupProps {
  onNavigate: (page: 'entry' | 'driver-signin') => void;
  onComplete: () => void;
}

const DriverSignup = ({ onNavigate, onComplete }: DriverSignupProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
    address: '',
    dateOfBirth: undefined as Date | undefined,
    hasCar: false,
    carMake: '',
    carModel: '',
    carYear: '',
    carColor: '',
    licensePlate: '',
    vehicleType: '',
    seats: '',
    transmission: '',
    hasAC: false,
    termsAccepted: false,
    selectedDates: {} as {[key: string]: {start: string, end: string}}
  });

  const totalSteps = 6; // Added one more step for completion

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      onNavigate('entry');
    }
  };

  const timeSlots = Array.from({ length: 24 }, (_, i) => {
    const hour = i.toString().padStart(2, '0');
    return `${hour}:00`;
  });

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Personal Information</h2>
              <p className="text-gray-600">Let's start with your basic details</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  className="mt-1"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="mt-1"
                placeholder="+1 (555) 123-4567"
              />
            </div>

            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="mt-1"
              />
            </div>

            <div>
              <Label>Date of Birth</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal mt-1",
                      !formData.dateOfBirth && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.dateOfBirth ? format(formData.dateOfBirth, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={formData.dateOfBirth}
                    onSelect={(date) => setFormData({ ...formData, dateOfBirth: date })}
                    disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                    initialFocus
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Vehicle Information</h2>
              <p className="text-gray-600">Tell us about your vehicle</p>
            </div>

            <div className="flex items-center space-x-2 p-4 bg-blue-50 rounded-lg">
              <Checkbox
                id="hasCar"
                checked={formData.hasCar}
                onCheckedChange={(checked) => setFormData({ ...formData, hasCar: !!checked })}
              />
              <Label htmlFor="hasCar" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                I have a car available for driving
              </Label>
            </div>

            {formData.hasCar && (
              <div className="space-y-4 animate-fade-in">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="carMake">Car Make</Label>
                    <Input
                      id="carMake"
                      value={formData.carMake}
                      onChange={(e) => setFormData({ ...formData, carMake: e.target.value })}
                      className="mt-1"
                      placeholder="e.g., Toyota"
                    />
                  </div>
                  <div>
                    <Label htmlFor="carModel">Car Model</Label>
                    <Input
                      id="carModel"
                      value={formData.carModel}
                      onChange={(e) => setFormData({ ...formData, carModel: e.target.value })}
                      className="mt-1"
                      placeholder="e.g., Camry"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="carYear">Year</Label>
                    <Input
                      id="carYear"
                      value={formData.carYear}
                      onChange={(e) => setFormData({ ...formData, carYear: e.target.value })}
                      className="mt-1"
                      placeholder="e.g., 2020"
                    />
                  </div>
                  <div>
                    <Label htmlFor="carColor">Color</Label>
                    <Input
                      id="carColor"
                      value={formData.carColor}
                      onChange={(e) => setFormData({ ...formData, carColor: e.target.value })}
                      className="mt-1"
                      placeholder="e.g., Blue"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="licensePlate">License Plate</Label>
                  <Input
                    id="licensePlate"
                    value={formData.licensePlate}
                    onChange={(e) => setFormData({ ...formData, licensePlate: e.target.value })}
                    className="mt-1"
                    placeholder="e.g., ABC-123"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="vehicleType">Vehicle Type</Label>
                    <Select value={formData.vehicleType} onValueChange={(value) => setFormData({ ...formData, vehicleType: value })}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sedan">Sedan</SelectItem>
                        <SelectItem value="suv">SUV</SelectItem>
                        <SelectItem value="pickup">Pickup</SelectItem>
                        <SelectItem value="hatchback">Hatchback</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="seats">Number of Seats</Label>
                    <Select value={formData.seats} onValueChange={(value) => setFormData({ ...formData, seats: value })}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select seats" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2">2 seats</SelectItem>
                        <SelectItem value="4">4 seats</SelectItem>
                        <SelectItem value="5">5 seats</SelectItem>
                        <SelectItem value="7">7 seats</SelectItem>
                        <SelectItem value="8">8+ seats</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="transmission">Transmission Type</Label>
                  <Select value={formData.transmission} onValueChange={(value) => setFormData({ ...formData, transmission: value })}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select transmission" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="automatic">Automatic</SelectItem>
                      <SelectItem value="manual">Manual</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="hasAC"
                    checked={formData.hasAC}
                    onCheckedChange={(checked) => setFormData({ ...formData, hasAC: !!checked })}
                  />
                  <Label htmlFor="hasAC">Air Conditioning Available</Label>
                </div>
              </div>
            )}
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Set Your Availability</h2>
              <p className="text-gray-600">Choose your preferred working schedule for the next 2 weeks</p>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-amber-800">
                <strong>Important:</strong> You can change your availability later in settings (up to 3 days before), but you must honor any bookings scheduled during the set availability.
              </p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Select Available Days & Times</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Calendar
                  mode="multiple"
                  selected={Object.keys(formData.selectedDates).map(dateStr => new Date(dateStr))}
                  onSelect={(dates) => {
                    const newSelectedDates: {[key: string]: {start: string, end: string}} = {};
                    dates?.forEach(date => {
                      const dateKey = format(date, 'yyyy-MM-dd');
                      newSelectedDates[dateKey] = formData.selectedDates[dateKey] || { start: '09:00', end: '17:00' };
                    });
                    setFormData({ ...formData, selectedDates: newSelectedDates });
                  }}
                  disabled={(date) => date < new Date() || date > addDays(new Date(), 14)}
                  className="rounded-md border pointer-events-auto"
                />
                
                {Object.keys(formData.selectedDates).length > 0 && (
                  <div className="space-y-2">
                    <Label>Set hours for selected days:</Label>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Start Time</Label>
                        <Select 
                          value={Object.values(formData.selectedDates)[0]?.start || '09:00'}
                          onValueChange={(value) => {
                            const updatedDates = { ...formData.selectedDates };
                            Object.keys(updatedDates).forEach(key => {
                              updatedDates[key] = { ...updatedDates[key], start: value };
                            });
                            setFormData({ ...formData, selectedDates: updatedDates });
                          }}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {timeSlots.map(time => (
                              <SelectItem key={time} value={time}>{time}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>End Time</Label>
                        <Select 
                          value={Object.values(formData.selectedDates)[0]?.end || '17:00'}
                          onValueChange={(value) => {
                            const updatedDates = { ...formData.selectedDates };
                            Object.keys(updatedDates).forEach(key => {
                              updatedDates[key] = { ...updatedDates[key], end: value };
                            });
                            setFormData({ ...formData, selectedDates: updatedDates });
                          }}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {timeSlots.map(time => (
                              <SelectItem key={time} value={time}>{time}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Document Upload</h2>
              <p className="text-gray-600">Upload required documents for verification</p>
            </div>

            <div className="space-y-4">
              {[
                { id: 'identity', label: 'Identity', required: true },
                { id: 'license', label: 'License', required: true }
              ].map((doc) => (
                <div key={doc.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <Label className="font-medium">{doc.label}</Label>
                    {doc.required && <span className="text-xs text-red-500">Required</span>}
                  </div>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-300 transition-colors cursor-pointer">
                    <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
                    <p className="text-xs text-gray-400 mt-1">PDF, JPG, PNG up to 10MB</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Terms and Conditions</h2>
              <p className="text-gray-600">Please review and accept our terms</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6 max-h-64 overflow-y-auto">
              <h3 className="font-semibold mb-2">Driver Agreement</h3>
              <div className="text-sm text-gray-600 space-y-2">
                <p>By creating a driver account with Navi, you agree to:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Provide safe and reliable transportation services</li>
                  <li>Maintain valid driver's license and insurance</li>
                  <li>Keep your vehicle in good working condition</li>
                  <li>Honor all confirmed bookings during your set availability</li>
                  <li>Treat all passengers with respect and professionalism</li>
                  <li>Follow all local traffic laws and regulations</li>
                  <li>Complete background checks and document verification</li>
                </ul>
                <p className="mt-4">You understand that Navi reserves the right to deactivate accounts that violate these terms.</p>
              </div>
            </div>

            <div className="flex items-start space-x-2 p-4 bg-blue-50 rounded-lg">
              <Checkbox
                id="terms"
                checked={formData.termsAccepted}
                onCheckedChange={(checked) => setFormData({ ...formData, termsAccepted: !!checked })}
              />
              <Label htmlFor="terms" className="text-sm leading-5">
                I have read and agree to the Terms and Conditions, Privacy Policy, and Driver Agreement. I understand that I must maintain professional standards and honor all confirmed bookings.
              </Label>
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Registration Complete!</h2>
              <p className="text-gray-600 mt-2">Thank you for joining Navi as a driver</p>
            </div>

            <Card>
              <CardContent className="p-6 text-center">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">What's Next?</h3>
                <div className="space-y-3 text-left">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-sm text-gray-700">We'll send you a WhatsApp message with next steps</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-sm text-gray-700">Check your email for verification instructions</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-sm text-gray-700">Our team will review your documents within 24-48 hours</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Button
              onClick={() => onNavigate('entry')}
              className="w-full gradient-navi text-white"
            >
              Return to Sign In
            </Button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Join Navi as a Driver</h1>
          <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
            <span>Step {currentStep} of {totalSteps}</span>
            <div className="flex gap-1">
              {Array.from({ length: totalSteps }, (_, i) => (
                <div
                  key={i}
                  className={`w-2 h-2 rounded-full ${
                    i + 1 <= currentStep ? 'bg-blue-500' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Form Card */}
        <Card className="animate-fade-in">
          <CardContent className="p-6">
            {renderStep()}
          </CardContent>
        </Card>

        {/* Navigation */}
        {currentStep < 6 && (
          <div className="flex justify-between mt-6">
            <Button
              variant="outline"
              onClick={handleBack}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              {currentStep === 1 ? 'Back to Home' : 'Previous'}
            </Button>
            
            <Button
              onClick={handleNext}
              disabled={currentStep === 5 && !formData.termsAccepted}
              className="flex items-center gap-2 gradient-navi text-white"
            >
              {currentStep === totalSteps - 1 ? 'Complete Registration' : 'Next'}
              {currentStep < totalSteps - 1 && <ArrowRight className="h-4 w-4" />}
            </Button>
          </div>
        )}

        {/* Sign In Link */}
        {currentStep < 6 && (
          <div className="text-center mt-6">
            <p className="text-sm text-gray-600">
              Already have a driver account?{' '}
              <button
                onClick={() => onNavigate('driver-signin')}
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Sign in here
              </button>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DriverSignup;
