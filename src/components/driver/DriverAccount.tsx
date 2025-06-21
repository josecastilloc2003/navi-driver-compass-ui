
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  User, 
  CreditCard, 
  Car, 
  DollarSign, 
  Bell, 
  Shield, 
  Settings, 
  LogOut, 
  ChevronRight,
  Menu,
  X,
  Phone,
  Mail,
  MessageCircle,
  ArrowLeft
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

type AccountSection = 'profile' | 'bank' | 'vehicle' | 'earnings' | 'notifications' | 'safety' | 'settings' | 'support';

const DriverAccount = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<AccountSection>('profile');

  const menuItems = [
    { id: 'profile' as AccountSection, label: 'Profile', icon: User, badge: null },
    { id: 'bank' as AccountSection, label: 'Bank Information', icon: CreditCard, badge: null },
    { id: 'vehicle' as AccountSection, label: 'Car Wallet', icon: Car, badge: null },
    { id: 'earnings' as AccountSection, label: 'Earnings Activity', icon: DollarSign, badge: null },
    { id: 'notifications' as AccountSection, label: 'Notifications', icon: Bell, badge: '3' },
    { id: 'safety' as AccountSection, label: 'Safety', icon: Shield, badge: null },
    { id: 'settings' as AccountSection, label: 'Settings', icon: Settings, badge: null },
    { id: 'support' as AccountSection, label: 'Provider Support', icon: Phone, badge: null }
  ];

  const handleSectionSelect = (section: AccountSection) => {
    setActiveSection(section);
    setSidebarOpen(false);
  };

  const handleSignOut = () => {
    console.log('Redirecting to sign in/create account page');
    // This would typically handle the actual sign out logic
  };

  const renderSectionContent = () => {
    switch (activeSection) {
      case 'profile':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Full Name</label>
                    <p className="text-gray-900">John Smith</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Email</label>
                    <p className="text-gray-900">john.smith@email.com</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Phone</label>
                    <p className="text-gray-900">+1 (555) 123-4567</p>
                  </div>
                  <Button variant="outline" size="sm">Edit Profile</Button>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Account Status</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Verification</span>
                    <Badge className="bg-green-100 text-green-800">Verified</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Background Check</span>
                    <Badge className="bg-green-100 text-green-800">Approved</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Documents</span>
                    <Badge className="bg-green-100 text-green-800">Complete</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );
      
      case 'support':
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Contact Navi Support</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 p-4 border rounded-lg">
                    <Phone className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="font-medium">Phone Support</p>
                      <p className="text-sm text-gray-600">+1 (800) NAVI-HELP</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 border rounded-lg">
                    <Mail className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="font-medium">Email Support</p>
                      <p className="text-sm text-gray-600">support@navi.com</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="h-5 w-5" />
                  Live Chat Support
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-100 rounded-lg p-8 text-center">
                  <MessageCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-4">Chat support is currently unavailable</p>
                  <p className="text-sm text-gray-500">We're working on bringing you live chat support soon!</p>
                </div>
              </CardContent>
            </Card>
          </div>
        );
      
      default:
        return (
          <div className="flex flex-col items-center justify-center h-64 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <Settings className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {menuItems.find(item => item.id === activeSection)?.label}
            </h3>
            <p className="text-gray-500">This section is under development</p>
          </div>
        );
    }
  };

  return (
    <div className="h-full flex bg-gray-50">
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-20 bg-white border-b border-gray-200 px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-bold text-gray-900">Account Settings</h1>
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div className={`${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0 fixed lg:relative z-30 lg:z-0 w-80 h-full bg-white border-r border-gray-200 transition-transform duration-300 ease-in-out`}>
        
        {/* Sidebar Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Account Settings</h2>
            <Button 
              variant="ghost" 
              size="sm" 
              className="lg:hidden"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Menu Items */}
        <div className="p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => handleSectionSelect(item.id)}
                className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition-colors ${
                  activeSection === item.id
                    ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-500'
                    : 'hover:bg-gray-50 text-gray-700'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{item.label}</span>
                </div>
                <div className="flex items-center gap-2">
                  {item.badge && (
                    <Badge variant="secondary" className="bg-red-100 text-red-800">
                      {item.badge}
                    </Badge>
                  )}
                  <ChevronRight className="h-4 w-4" />
                </div>
              </button>
            );
          })}
        </div>

        {/* Sign Out Button */}
        <div className="absolute bottom-4 left-4 right-4">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button 
                variant="outline" 
                className="w-full text-red-600 border-red-200 hover:bg-red-50"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  You will be signed out of your account and redirected to the sign-in page.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>No</AlertDialogCancel>
                <AlertDialogAction onClick={handleSignOut}>
                  Yes, Sign Out
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-20"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 lg:ml-0">
        {/* Desktop Header */}
        <div className="hidden lg:block bg-white border-b border-gray-200 px-6 py-4">
          <h1 className="text-2xl font-bold text-gray-900">
            {menuItems.find(item => item.id === activeSection)?.label}
          </h1>
        </div>

        {/* Content */}
        <div className="p-4 lg:p-6 pt-20 lg:pt-6">
          {renderSectionContent()}
        </div>
      </div>
    </div>
  );
};

export default DriverAccount;
