import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ThemeProvider } from './components/context/ThemeContext';
import { BottomNavigation } from './components/BottomNavigation';

// Authentication Screens
import { LoginScreen } from './components/screens/LoginScreen';
import { OTPScreen } from './components/screens/OTPScreen';

// Main App Screens
import { HomeScreen } from './components/screens/HomeScreen';
import { ChargerDetailsScreen } from './components/screens/ChargerDetailsScreen';
import { NavigationScreen } from './components/screens/NavigationScreen';
import { PlugInScreen } from './components/screens/PlugInScreen';
import { ChargingConfigScreen } from './components/screens/ChargingConfigScreen';
import { LiveChargingScreen } from './components/screens/LiveChargingScreen';
import { SessionCompletionScreen } from './components/screens/SessionCompletionScreen';
import { ReviewSubmissionScreen } from './components/screens/ReviewSubmissionScreen';
import { BookmarksScreen } from './components/screens/BookmarksScreen';
import { WalletScreen } from './components/screens/WalletScreen';
import { ProfileScreen } from './components/screens/ProfileScreen';
import { HistoryScreen } from './components/screens/HistoryScreen';
import { NotificationsScreen } from './components/screens/NotificationsScreen';
import { SupportScreen } from './components/screens/SupportScreen';
import { AccountDeletionScreen } from './components/screens/AccountDeletionScreen';

export default function App() {
  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentAuthScreen, setCurrentAuthScreen] = useState<'login' | 'otp'>('login');
  const [phoneNumber, setPhoneNumber] = useState('');
  
  // App state
  const [activeTab, setActiveTab] = useState('home');
  const [currentScreen, setCurrentScreen] = useState('home');
  const [screenParams, setScreenParams] = useState<any>({});
  const [bookmarkedStations, setBookmarkedStations] = useState<string[]>(['1', '4']);
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  useEffect(() => {
    // Simulate app initialization - faster loading
    const timer = setTimeout(() => {
      setIsInitialLoading(false);
    }, 1800);
    return () => clearTimeout(timer);
  }, []);

  // Navigation handlers
  const navigateToScreen = (screen: string, params: any = {}) => {
    setCurrentScreen(screen);
    setScreenParams(params);
    
    // Update active tab for bottom navigation
    const screenToTabMap: { [key: string]: string } = {
      'home': 'home',
      'bookmarks': 'bookmarks', 
      'wallet': 'wallet',
      'profile': 'profile',
      'history': 'profile',
      'notifications': 'profile',
      'support': 'profile'
    };
    
    const newTab = screenToTabMap[screen] || activeTab;
    if (newTab !== activeTab) {
      setActiveTab(newTab);
    }
  };

  const handleBookmarkStation = (stationId: string) => {
    setBookmarkedStations(prev => 
      prev.includes(stationId)
        ? prev.filter(id => id !== stationId)
        : [...prev, stationId]
    );
  };

  const handleTabChange = (tab: string) => {
    if (tab !== activeTab) {
      setActiveTab(tab);
      setCurrentScreen(tab);
      setScreenParams({});
    }
  };

  // Authentication handlers
  const handleLogin = (phone: string) => {
    setPhoneNumber(phone);
    setCurrentAuthScreen('otp');
  };

  const handleOTPVerify = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentAuthScreen('login');
    setActiveTab('home');
    setCurrentScreen('home');
    setPhoneNumber('');
  };

  const renderActiveScreen = () => {
    // Authentication screens
    if (!isAuthenticated) {
      switch (currentAuthScreen) {
        case 'login':
          return <LoginScreen onLogin={handleLogin} />;
        case 'otp':
          return <OTPScreen phoneNumber={phoneNumber} onVerify={handleOTPVerify} onBack={() => setCurrentAuthScreen('login')} />;
        default:
          return <LoginScreen onLogin={handleLogin} />;
      }
    }

    // Main app screens
    switch (currentScreen) {
      case 'home':
        return (
          <HomeScreen 
            onBookmarkStation={handleBookmarkStation}
            bookmarkedStations={bookmarkedStations}
            onNavigateToStation={(stationId) => navigateToScreen('charger-details', { stationId })}
          />
        );
      case 'charger-details':
        return (
          <ChargerDetailsScreen 
            stationId={screenParams.stationId}
            onBack={() => navigateToScreen('home')}
            onNavigate={(stationId) => navigateToScreen('navigation', { stationId })}
            onStartCharging={(stationId) => navigateToScreen('plug-in', { stationId })}
            onBookmark={handleBookmarkStation}
            isBookmarked={bookmarkedStations.includes(screenParams.stationId)}
          />
        );
      case 'navigation':
        return (
          <NavigationScreen 
            stationId={screenParams.stationId}
            onBack={() => navigateToScreen('charger-details', { stationId: screenParams.stationId })}
            onArrived={() => navigateToScreen('plug-in', { stationId: screenParams.stationId })}
          />
        );
      case 'plug-in':
        return (
          <PlugInScreen 
            stationId={screenParams.stationId}
            onBack={() => navigateToScreen('charger-details', { stationId: screenParams.stationId })}
            onContinue={(portId) => navigateToScreen('charging-config', { stationId: screenParams.stationId, portId })}
          />
        );
      case 'charging-config':
        return (
          <ChargingConfigScreen 
            stationId={screenParams.stationId}
            portId={screenParams.portId}
            onBack={() => navigateToScreen('plug-in', { stationId: screenParams.stationId })}
            onStartCharging={(config) => navigateToScreen('live-charging', { ...screenParams, config })}
          />
        );
      case 'live-charging':
        return (
          <LiveChargingScreen 
            sessionData={screenParams}
            onStopCharging={(sessionData) => navigateToScreen('session-completion', { sessionData })}
          />
        );
      case 'session-completion':
        return (
          <SessionCompletionScreen 
            sessionData={screenParams.sessionData}
            onReviewStation={() => navigateToScreen('review-submission', { stationId: screenParams.sessionData.stationId })}
            onDone={() => navigateToScreen('home')}
          />
        );
      case 'review-submission':
        return (
          <ReviewSubmissionScreen 
            stationId={screenParams.stationId}
            onBack={() => navigateToScreen('session-completion', screenParams)}
            onSubmit={() => navigateToScreen('home')}
          />
        );
      case 'bookmarks':
        return (
          <BookmarksScreen 
            onBookmarkStation={handleBookmarkStation}
            bookmarkedStations={bookmarkedStations}
            onNavigateToStation={(stationId) => navigateToScreen('charger-details', { stationId })}
          />
        );
      case 'wallet':
        return <WalletScreen onNavigateToHistory={() => navigateToScreen('history')} />;
      case 'history':
        return <HistoryScreen onBack={() => navigateToScreen('wallet')} onViewSession={(sessionId) => navigateToScreen('session-completion', { sessionData: { id: sessionId } })} />;
      case 'notifications':
        return <NotificationsScreen onBack={() => navigateToScreen('profile')} />;
      case 'support':
        return <SupportScreen onBack={() => navigateToScreen('profile')} />;
      case 'account-deletion':
        return <AccountDeletionScreen onBack={() => navigateToScreen('profile')} onConfirmDelete={handleLogout} />;
      case 'profile':
        return (
          <ProfileScreen 
            onNavigateToHistory={() => navigateToScreen('history')}
            onNavigateToNotifications={() => navigateToScreen('notifications')}
            onNavigateToSupport={() => navigateToScreen('support')}
            onNavigateToAccountDeletion={() => navigateToScreen('account-deletion')}
            onLogout={handleLogout}
          />
        );
      default:
        return (
          <HomeScreen 
            onBookmarkStation={handleBookmarkStation}
            bookmarkedStations={bookmarkedStations}
            onNavigateToStation={(stationId) => navigateToScreen('charger-details', { stationId })}
          />
        );
    }
  };

  // Professional loading screen
  if (isInitialLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          {/* Clean, professional logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="mb-8"
          >
            <div className="w-16 h-16 mx-auto bg-surface-card rounded-xl flex items-center justify-center shadow-professional-sm border border-border">
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                className="text-primary"
              >
                <path
                  d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"
                  fill="currentColor"
                />
              </svg>
            </div>
          </motion.div>

          {/* Professional branding */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.3 }}
          >
            <h1 className="text-title-large mb-2">ChargePro</h1>
            <p className="text-body text-tertiary mb-8">Professional EV Charging Network</p>
          </motion.div>

          {/* Simple, clean loading indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex justify-center space-x-1"
          >
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-2 h-2 bg-primary rounded-full"
                animate={{ 
                  opacity: [0.3, 1, 0.3],
                  scale: [1, 1.2, 1]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeInOut"
                }}
              />
            ))}
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background overflow-hidden">
        <div className="max-w-md mx-auto bg-background min-h-screen relative">
          {/* Screen Content with Smooth Transitions */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.15, ease: 'easeInOut' }}
              className="relative z-10"
            >
              {renderActiveScreen()}
            </motion.div>
          </AnimatePresence>

          {/* Bottom Navigation - Only show when authenticated */}
          {isAuthenticated && (
            <BottomNavigation 
              activeTab={activeTab} 
              onTabChange={handleTabChange} 
            />
          )}
        </div>
      </div>
    </ThemeProvider>
  );
}