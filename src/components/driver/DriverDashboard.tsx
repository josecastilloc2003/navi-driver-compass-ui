
import { useState } from 'react';
import DriverHome from './DriverHome';
import DriverBookings from './DriverBookings';
import DriverAccount from './DriverAccount';
import DriverCalendar from './DriverCalendar';
import DriverEarnings from './DriverEarnings';
import DriverSafety from './DriverSafety';
import DriverNotifications from './DriverNotifications';
import { Home, Calendar, User } from 'lucide-react';

type DashboardView = 'home' | 'bookings' | 'account' | 'calendar' | 'earnings' | 'safety' | 'notifications';

const DriverDashboard = () => {
  const [activeTab, setActiveTab] = useState<DashboardView>('home');

  const navigateToBookings = (tab?: string) => {
    setActiveTab('bookings');
    // Could pass tab parameter to bookings component if needed
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <DriverHome 
            onNavigateToBookings={() => navigateToBookings('current')}
            onNavigateToCalendar={() => setActiveTab('calendar')}
            onNavigateToEarnings={() => setActiveTab('earnings')}
            onNavigateToSafety={() => setActiveTab('safety')}
            onNavigateToNotifications={() => setActiveTab('notifications')}
          />
        );
      case 'bookings':
        return <DriverBookings />;
      case 'account':
        return <DriverAccount />;
      case 'calendar':
        return <DriverCalendar onBack={() => setActiveTab('home')} />;
      case 'earnings':
        return <DriverEarnings onBack={() => setActiveTab('home')} />;
      case 'safety':
        return <DriverSafety onBack={() => setActiveTab('home')} />;
      case 'notifications':
        return <DriverNotifications onBack={() => setActiveTab('home')} />;
      default:
        return <DriverHome />;
    }
  };

  const showBottomNav = !['calendar', 'earnings', 'safety', 'notifications'].includes(activeTab);

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        {renderContent()}
      </div>

      {/* Bottom Navigation - only show for main tabs */}
      {showBottomNav && (
        <div className="bg-white border-t border-gray-200 px-4 py-2">
          <div className="flex justify-around">
            {[
              { id: 'home', label: 'Home', icon: Home },
              { id: 'bookings', label: 'Bookings', icon: Calendar },
              { id: 'account', label: 'Account', icon: User }
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id as DashboardView)}
                className={`flex flex-col items-center justify-center py-2 px-4 rounded-lg transition-colors ${
                  activeTab === id
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Icon className="h-5 w-5 mb-1" />
                <span className="text-xs font-medium">{label}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DriverDashboard;
