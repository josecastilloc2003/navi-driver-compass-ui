
import { useState } from 'react';
import EntryPage from '@/components/EntryPage';
import DriverSignup from '@/components/driver/DriverSignup';
import DriverSignin from '@/components/driver/DriverSignin';
import DriverDashboard from '@/components/driver/DriverDashboard';

type AppState = 'entry' | 'driver-signup' | 'driver-signin' | 'user-signup' | 'user-signin' | 'driver-dashboard';

const Index = () => {
  const [currentPage, setCurrentPage] = useState<AppState>('entry');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleNavigation = (page: AppState) => {
    setCurrentPage(page);
  };

  const handleAuthentication = () => {
    setIsAuthenticated(true);
    setCurrentPage('driver-dashboard');
  };

  if (isAuthenticated && currentPage === 'driver-dashboard') {
    return <DriverDashboard />;
  }

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'entry':
        return <EntryPage onNavigate={handleNavigation} />;
      case 'driver-signup':
        return <DriverSignup onNavigate={handleNavigation} onComplete={handleAuthentication} />;
      case 'driver-signin':
        return <DriverSignin onNavigate={handleNavigation} onComplete={handleAuthentication} />;
      default:
        return <EntryPage onNavigate={handleNavigation} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {renderCurrentPage()}
    </div>
  );
};

export default Index;
