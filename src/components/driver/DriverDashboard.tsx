
import { useState } from 'react';
import DriverHome from './DriverHome';
import DriverBookings from './DriverBookings';
import DriverAccount from './DriverAccount';
import { Home, Calendar, User } from 'lucide-react';

const DriverDashboard = () => {
  const [activeTab, setActiveTab] = useState('home');

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <DriverHome />;
      case 'bookings':
        return <DriverBookings />;
      case 'account':
        return <DriverAccount />;
      default:
        return <DriverHome />;
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        {renderContent()}
      </div>

      {/* Bottom Navigation */}
      <div className="bg-white border-t border-gray-200 px-4 py-2">
        <div className="flex justify-around">
          {[
            { id: 'home', label: 'Home', icon: Home },
            { id: 'bookings', label: 'Bookings', icon: Calendar },
            { id: 'account', label: 'Account', icon: User }
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
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
    </div>
  );
};

export default DriverDashboard;
