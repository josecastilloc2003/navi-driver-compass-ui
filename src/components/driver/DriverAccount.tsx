import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { 
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { 
  User, 
  Camera, 
  CreditCard, 
  Car, 
  Plus, 
  FileText, 
  Users, 
  Info, 
  LogOut,
  DollarSign,
  Calendar,
  Clock,
  MapPin,
  Star,
  TrendingUp,
  Menu,
  MessageCircle,
  Phone,
  Mail,
  ExternalLink
} from 'lucide-react';

const DriverAccount = () => {
  const [activeSection, setActiveSection] = useState('profile');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const menuItems = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'bank', label: 'Bank Information', icon: CreditCard },
    { id: 'vehicles', label: 'Car Wallet', icon: Car },
    { id: 'earnings', label: 'Earnings Activity', icon: DollarSign },
    { id: 'documents', label: 'Documents', icon: FileText },
    { id: 'refer', label: 'Refer Friends', icon: Users },
    { id: 'support', label: 'Provider Support', icon: MessageCircle },
    { id: 'about', label: 'About Navi', icon: Info },
  ];

  const handleMenuItemClick = (itemId: string) => {
    setActiveSection(itemId);
    setIsDrawerOpen(false);
  };

  const getCurrentSectionTitle = () => {
    const currentItem = menuItems.find(item => item.id === activeSection);
    return currentItem ? currentItem.label : 'Profile';
  };

  const renderProfileSection = () => (
    <div className="space-y-6">
      <div className="text-center">
        <div className="relative inline-block">
          <Avatar className="w-24 h-24">
            <AvatarImage src="/placeholder.svg" />
            <AvatarFallback className="text-2xl">JD</AvatarFallback>
          </Avatar>
          <button className="absolute bottom-0 right-0 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white hover:bg-blue-600">
            <Camera className="h-4 w-4" />
          </button>
        </div>
        <h2 className="text-xl font-bold text-gray-900 mt-3">John Doe</h2>
        <p className="text-gray-600">Driver since Jan 2023</p>
        <div className="flex items-center justify-center gap-1 mt-2">
          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          <span className="font-semibold">4.9</span>
          <span className="text-gray-500">(127 rides)</span>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstName">First Name</Label>
              <Input id="firstName" defaultValue="John" className="mt-1" />
            </div>
            <div>
              <Label htmlFor="lastName">Last Name</Label>
              <Input id="lastName" defaultValue="Doe" className="mt-1" />
            </div>
          </div>
          <div>
            <Label htmlFor="email">Email Address</Label>
            <Input id="email" type="email" defaultValue="john.doe@email.com" className="mt-1" />
          </div>
          <div>
            <Label htmlFor="phone">Phone Number</Label>
            <Input id="phone" defaultValue="+1 (555) 123-4567" className="mt-1" />
          </div>
          <div>
            <Label htmlFor="address">Address</Label>
            <Input id="address" defaultValue="123 Main St, City, State 12345" className="mt-1" />
          </div>
          <Button className="w-full gradient-navi text-white">Update Profile</Button>
        </CardContent>
      </Card>
    </div>
  );

  const renderBankSection = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Current Balance</CardTitle>
          <CardDescription>Available earnings in your Navi account</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-4">
            <div className="text-3xl font-bold text-green-600">$1,245.75</div>
            <p className="text-gray-600 mt-1">Available for withdrawal</p>
          </div>
          <Button className="w-full gradient-success text-white">
            Withdraw Funds
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Linked Bank Accounts</CardTitle>
          <CardDescription>Manage your payment methods</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-3 border rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <CreditCard className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="font-medium">Chase Bank</p>
                <p className="text-sm text-gray-600">****1234</p>
              </div>
            </div>
            <Badge>Primary</Badge>
          </div>
          <Button variant="outline" className="w-full">
            <Plus className="h-4 w-4 mr-2" />
            Add Bank Account
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Withdrawal Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-800">
              <strong>Note:</strong> Withdrawals typically take 1-3 business days to process. 
              Minimum withdrawal amount is $10.00.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderVehiclesSection = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Your Vehicles</CardTitle>
          <CardDescription>Manage your registered vehicles</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="border rounded-lg p-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                <Car className="h-8 w-8 text-gray-400" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">2020 Toyota Camry</h3>
                <p className="text-gray-600">Blue • ABC-123 • 5 seats</p>
                <div className="flex gap-2 mt-2">
                  <Badge variant="secondary">Sedan</Badge>
                  <Badge variant="secondary">AC Available</Badge>
                  <Badge className="bg-green-100 text-green-800">Active</Badge>
                </div>
              </div>
            </div>
          </div>
          
          <Button variant="outline" className="w-full">
            <Plus className="h-4 w-4 mr-2" />
            Add Vehicle
          </Button>
        </CardContent>
      </Card>
    </div>
  );

  const renderEarningsSection = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <TrendingUp className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-green-600">$2,450</div>
            <p className="text-sm text-gray-600">This Month</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Calendar className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-blue-600">45</div>
            <p className="text-sm text-gray-600">Trips Completed</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Trips</CardTitle>
          <CardDescription>Your earning history</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {[
            { date: 'Jan 15, 2024', time: '2:30 PM', duration: '45 min', from: 'Downtown', to: 'Airport', earnings: '$45.50' },
            { date: 'Jan 15, 2024', time: '10:15 AM', duration: '25 min', from: 'Midtown', to: 'Downtown', earnings: '$28.75' },
            { date: 'Jan 14, 2024', time: '6:45 PM', duration: '30 min', from: 'Mall', to: 'Suburbs', earnings: '$32.00' }
          ].map((trip, index) => (
            <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <MapPin className="h-4 w-4 text-gray-400" />
                  <span className="text-sm font-medium">{trip.from} → {trip.to}</span>
                </div>
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <span>{trip.date} • {trip.time}</span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {trip.duration}
                  </span>
                </div>
              </div>
              <div className="text-green-600 font-semibold">{trip.earnings}</div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );

  const renderDocumentsSection = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Document Status</CardTitle>
          <CardDescription>Keep your documents up to date</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {[
            { name: 'Driver\'s License', status: 'verified', expires: '2026-03-15' },
            { name: 'Vehicle Registration', status: 'verified', expires: '2025-08-20' },
            { name: 'Insurance Certificate', status: 'pending', expires: '2024-12-31' },
            { name: 'Background Check', status: 'verified', expires: '2024-06-15' }
          ].map((doc, index) => (
            <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <p className="font-medium text-gray-900">{doc.name}</p>
                <p className="text-sm text-gray-600">Expires: {doc.expires}</p>
              </div>
              <Badge className={doc.status === 'verified' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                {doc.status === 'verified' ? 'Verified' : 'Pending'}
              </Badge>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );

  const renderReferSection = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Refer Friends</CardTitle>
          <CardDescription>Earn money by inviting new drivers</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg">
            <div className="text-4xl font-bold text-blue-600 mb-2">$100</div>
            <p className="text-gray-700 mb-4">Earn for each successful referral</p>
            <p className="text-sm text-gray-600">Your friend gets $50 bonus too!</p>
          </div>
          
          <div>
            <Label>Your Referral Code</Label>
            <div className="flex gap-2 mt-1">
              <Input value="JOHNDOE2024" readOnly className="flex-1" />
              <Button variant="outline">Copy</Button>
            </div>
          </div>
          
          <Button className="w-full gradient-navi text-white">
            Share Referral Link
          </Button>
        </CardContent>
      </Card>
    </div>
  );

  const renderSupportSection = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Contact Navi Support</CardTitle>
          <CardDescription>Get help from our support team</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <Phone className="h-5 w-5 text-blue-600" />
                  <h3 className="font-semibold">Phone Support</h3>
                </div>
                <p className="text-sm text-gray-600 mb-3">Call us for immediate assistance</p>
                <p className="font-medium text-blue-600">+1 (555) 123-NAVI</p>
                <p className="text-xs text-gray-500 mt-1">Available 24/7</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <Mail className="h-5 w-5 text-green-600" />
                  <h3 className="font-semibold">Email Support</h3>
                </div>
                <p className="text-sm text-gray-600 mb-3">Send us an email for detailed help</p>
                <p className="font-medium text-green-600">drivers@navi.com</p>
                <p className="text-xs text-gray-500 mt-1">Response within 2 hours</p>
              </CardContent>
            </Card>
          </div>

          <div className="flex gap-2">
            <Button className="flex-1" variant="outline">
              <Phone className="h-4 w-4 mr-2" />
              Call Now
            </Button>
            <Button className="flex-1" variant="outline">
              <Mail className="h-4 w-4 mr-2" />
              Send Email
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Live Chat Support</CardTitle>
          <CardDescription>Chat with our support team in real-time</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-gray-50 rounded-lg p-6 text-center">
            <MessageCircle className="h-12 w-12 text-gray-400 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">Chat Support Coming Soon</h3>
            <p className="text-gray-600 text-sm mb-4">
              We're working on bringing you real-time chat support. For now, please use phone or email support.
            </p>
            <Button disabled className="bg-gray-300 text-gray-500 cursor-not-allowed">
              <MessageCircle className="h-4 w-4 mr-2" />
              Chat Not Available Yet
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Quick Links</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button variant="outline" className="w-full justify-start">
            <ExternalLink className="h-4 w-4 mr-2" />
            Driver Help Center
          </Button>
          <Button variant="outline" className="w-full justify-start">
            <ExternalLink className="h-4 w-4 mr-2" />
            Safety Guidelines
          </Button>
          <Button variant="outline" className="w-full justify-start">
            <ExternalLink className="h-4 w-4 mr-2" />
            Report an Issue
          </Button>
          <Button variant="outline" className="w-full justify-start">
            <ExternalLink className="h-4 w-4 mr-2" />
            Community Forum
          </Button>
        </CardContent>
      </Card>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'profile':
        return renderProfileSection();
      case 'bank':
        return renderBankSection();
      case 'vehicles':
        return renderVehiclesSection();
      case 'earnings':
        return renderEarningsSection();
      case 'documents':
        return renderDocumentsSection();
      case 'refer':
        return renderReferSection();
      case 'support':
        return renderSupportSection();
      case 'about':
        return (
          <Card>
            <CardHeader>
              <CardTitle>About Navi</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 text-center">
                <div className="text-6xl mb-4">🗺️</div>
                <h3 className="text-xl font-bold">Navi Driver App</h3>
                <p className="text-gray-600">Version 2.1.0</p>
                <p className="text-sm text-gray-500">
                  Your trusted ride companion for drivers and passengers
                </p>
                <div className="space-y-2 pt-4">
                  <Button variant="outline" className="w-full">Terms of Service</Button>
                  <Button variant="outline" className="w-full">Privacy Policy</Button>
                  <Button variant="outline" className="w-full">Support Center</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      default:
        return renderProfileSection();
    }
  };

  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Account Settings</h1>
          <p className="text-gray-600 hidden sm:block">Manage your driver profile and preferences</p>
        </div>
        
        {/* Mobile Menu Trigger */}
        <div className="md:hidden">
          <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
            <DrawerTrigger asChild>
              <Button variant="outline" size="sm">
                <Menu className="h-4 w-4 mr-2" />
                {getCurrentSectionTitle()}
              </Button>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>Account Settings</DrawerTitle>
              </DrawerHeader>
              <div className="p-4 space-y-2">
                {menuItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleMenuItemClick(item.id)}
                    className={`w-full flex items-center gap-3 px-3 py-3 text-left rounded-lg transition-colors ${
                      activeSection === item.id
                        ? 'bg-blue-50 text-blue-700 border border-blue-200'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <item.icon className="h-5 w-5" />
                    <span className="font-medium">{item.label}</span>
                  </button>
                ))}
                
                <hr className="my-4" />
                
                <button className="w-full flex items-center gap-3 px-3 py-3 text-left rounded-lg text-red-600 hover:bg-red-50">
                  <LogOut className="h-5 w-5" />
                  <span className="font-medium">Sign Out</span>
                </button>
              </div>
            </DrawerContent>
          </Drawer>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Desktop Sidebar */}
        <div className="hidden md:block w-64 bg-white border-r border-gray-200 overflow-y-auto">
          <div className="p-4 space-y-2">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2 text-left rounded-lg transition-colors ${
                  activeSection === item.id
                    ? 'bg-blue-50 text-blue-700 border border-blue-200'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <item.icon className="h-5 w-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
            
            <hr className="my-4" />
            
            <button className="w-full flex items-center gap-3 px-3 py-2 text-left rounded-lg text-red-600 hover:bg-red-50">
              <LogOut className="h-5 w-5" />
              <span className="font-medium">Sign Out</span>
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default DriverAccount;
