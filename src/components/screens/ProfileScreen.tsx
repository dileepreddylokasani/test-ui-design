import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Edit3, Car, History, Settings, Bell, Shield, HelpCircle, LogOut, 
  ChevronRight, MapPin, Palette, Zap, Crown, Trophy, Target, Calendar,
  Users, Award, Bookmark, CreditCard
} from 'lucide-react';
import { Button } from '../ui/button';
import { ThemeToggle } from '../ui/ThemeToggle';

const profileData = {
  name: 'Rajesh Kumar',
  email: 'rajesh.kumar@email.com',
  location: 'Bangalore, Karnataka',
  memberSince: 'Aug 2023',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
  tier: 'Gold Member',
  stats: {
    totalSessions: 47,
    totalEnergy: 1240,
    avgRating: 4.8,
    carbonSaved: 520,
    favoriteStations: 8,
    achievements: 12
  }
};

const menuSections = [
  {
    title: 'Vehicle & Usage',
    items: [
      {
        id: 'vehicles',
        label: 'My Vehicles',
        description: 'Manage your electric vehicles',
        icon: Car,
        iconBg: 'bg-accent-blue/20',
        iconColor: 'text-accent-blue',
        badge: '2 vehicles'
      },
      {
        id: 'history',
        label: 'Charging History',
        description: 'View past charging sessions',
        icon: History,
        iconBg: 'bg-accent-green/20',
        iconColor: 'text-accent-green',
        badge: '47 sessions'
      },
    ]
  },
  {
    title: 'Account & Preferences',
    items: [
      {
        id: 'wallet',
        label: 'Wallet & Payments',
        description: 'Manage payment methods',
        icon: CreditCard,
        iconBg: 'bg-accent-purple/20',
        iconColor: 'text-accent-purple',
        badge: '₹1,245'
      },
      {
        id: 'theme',
        label: 'Appearance',
        description: 'Light or dark mode',
        icon: Palette,
        iconBg: 'bg-accent-indigo/20',
        iconColor: 'text-accent-indigo',
        isToggle: true,
      },
      {
        id: 'settings',
        label: 'Settings',
        description: 'App preferences and account',
        icon: Settings,
        iconBg: 'bg-foreground-subtle/20',
        iconColor: 'text-foreground-subtle',
      },
      {
        id: 'notifications',
        label: 'Notifications',
        description: 'Manage alerts and reminders',
        icon: Bell,
        iconBg: 'bg-accent-orange/20',
        iconColor: 'text-accent-orange',
        badge: '3 new'
      },
    ]
  },
  {
    title: 'Support & Security',
    items: [
      {
        id: 'privacy',
        label: 'Privacy & Security',
        description: 'Control your data and security',
        icon: Shield,
        iconBg: 'bg-accent-red/20',
        iconColor: 'text-accent-red',
      },
      {
        id: 'help',
        label: 'Help & Support',
        description: '24/7 customer support',
        icon: HelpCircle,
        iconBg: 'bg-primary/20',
        iconColor: 'text-primary',
      },
    ]
  }
];

const quickStats = [
  {
    label: 'Sessions',
    value: profileData.stats.totalSessions,
    icon: Zap,
    color: 'text-accent-blue',
    bgColor: 'bg-accent-blue/10'
  },
  {
    label: 'Energy',
    value: `${profileData.stats.totalEnergy} kWh`,
    icon: Target,
    color: 'text-accent-green',
    bgColor: 'bg-accent-green/10'
  },
  {
    label: 'Rating',
    value: profileData.stats.avgRating,
    icon: Trophy,
    color: 'text-accent-orange',
    bgColor: 'bg-accent-orange/10'
  },
  {
    label: 'CO₂ Saved',
    value: `${profileData.stats.carbonSaved} kg`,
    icon: Award,
    color: 'text-accent-teal',
    bgColor: 'bg-accent-teal/10'
  }
];

interface ProfileScreenProps {
  onNavigateToHistory?: () => void;
  onNavigateToNotifications?: () => void;
  onNavigateToSupport?: () => void;
  onNavigateToAccountDeletion?: () => void;
  onLogout?: () => void;
}

export function ProfileScreen({ 
  onNavigateToHistory, 
  onNavigateToNotifications, 
  onNavigateToSupport, 
  onNavigateToAccountDeletion, 
  onLogout 
}: ProfileScreenProps) {
  const [activeView, setActiveView] = useState<string | null>(null);

  const handleMenuItemClick = (itemId: string) => {
    switch (itemId) {
      case 'history':
        onNavigateToHistory?.();
        break;
      case 'notifications':
        onNavigateToNotifications?.();
        break;
      case 'help':
        onNavigateToSupport?.();
        break;
      case 'privacy':
        onNavigateToAccountDeletion?.();
        break;
      default:
        setActiveView(itemId);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground pb-20">
      {/* Header */}
      <div className="pt-12 pb-4 px-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-6"
        >
          <div>
            <h1 className="text-title-large mb-1">Profile</h1>
            <p className="text-muted text-body-small">Manage your account and preferences</p>
          </div>
          <Button variant="ghost" size="sm" className="text-primary">
            <Edit3 className="w-4 h-4 mr-2" />
            Edit
          </Button>
        </motion.div>

        {/* Hero Profile Card - Google Play Style */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card-hero p-6 mb-6"
        >
          <div className="flex items-start space-x-4 mb-6">
            <div className="relative">
              <img 
                src={profileData.avatar} 
                alt={profileData.name}
                className="w-20 h-20 rounded-2xl object-cover border-2 border-primary/20"
              />
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <Crown className="w-4 h-4 text-white" />
              </div>
            </div>
            <div className="flex-1">
              <h2 className="text-title font-semibold text-foreground mb-1">{profileData.name}</h2>
              <p className="text-muted text-body-small mb-2">{profileData.email}</p>
              <div className="flex items-center space-x-4 text-body-small">
                <div className="flex items-center text-primary">
                  <MapPin className="w-3 h-3 mr-1" />
                  <span>{profileData.location}</span>
                </div>
                <div className="text-muted">
                  <Calendar className="w-3 h-3 mr-1 inline" />
                  Member since {profileData.memberSince}
                </div>
              </div>
            </div>
          </div>

          {/* Member Tier Badge */}
          <div className="bg-gradient-primary text-white px-4 py-2 rounded-lg inline-flex items-center space-x-2 mb-4">
            <Crown className="w-4 h-4" />
            <span className="text-body-small font-medium">{profileData.tier}</span>
          </div>
        </motion.div>

        {/* Quick Stats Grid - Pinterest Style */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 gap-4 mb-8"
        >
          {quickStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="card-stats group cursor-pointer"
            >
              <div className={`w-12 h-12 ${stat.bgColor} rounded-xl flex items-center justify-center mb-3 mx-auto icon-container`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <div className="text-title-small font-semibold text-foreground mb-1">
                {stat.value}
              </div>
              <div className="text-caption text-muted">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Menu Sections - Trello Style Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-6 mb-8"
        >
          {menuSections.map((section, sectionIndex) => (
            <div key={section.title} className="card-stack">
              <h4 className="text-overline text-muted mb-4 px-2">
                {section.title}
              </h4>
              <div className="space-y-3">
                {section.items.map((item, index) => {
                  const Icon = item.icon;
                  const globalIndex = sectionIndex * 10 + index;
                  
                  return (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + (globalIndex * 0.05) }}
                      className="card-modern p-4 group cursor-pointer"
                      onClick={() => !item.isToggle && handleMenuItemClick(item.id)}
                    >
                      <div className="flex items-center space-x-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${item.iconBg} icon-container`}>
                          <Icon className={`w-6 h-6 ${item.iconColor}`} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="font-medium text-foreground group-hover:text-primary transition-colors">
                              {item.label}
                            </span>
                            {item.badge && (
                              <span className="bg-primary/10 text-primary text-caption px-2 py-1 rounded-full">
                                {item.badge}
                              </span>
                            )}
                          </div>
                          <div className="text-body-small text-muted">{item.description}</div>
                        </div>
                        
                        {item.isToggle ? (
                          <ThemeToggle size="sm" />
                        ) : (
                          <motion.div
                            whileHover={{ x: 2 }}
                            className="p-2 hover:bg-surface-elevated rounded-lg transition-all"
                          >
                            <ChevronRight className="w-5 h-5 text-muted group-hover:text-primary transition-colors" />
                          </motion.div>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Logout Card - Wander Style */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="card-modern p-4 group cursor-pointer hover:bg-error-subtle hover:border-error/30 mb-8"
          onClick={onLogout}
        >
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-accent-red/20 rounded-xl flex items-center justify-center icon-container">
              <LogOut className="w-6 h-6 text-accent-red" />
            </div>
            <div className="flex-1">
              <div className="font-medium text-accent-red mb-1">Sign Out</div>
              <div className="text-body-small text-muted">End your session securely</div>
            </div>
            <ChevronRight className="w-5 h-5 text-accent-red group-hover:translate-x-1 transition-transform" />
          </div>
        </motion.div>

        {/* App Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center"
        >
          <div className="flex items-center justify-center space-x-2 mb-2">
            <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center">
              <Zap className="w-3 h-3 text-primary" />
            </div>
            <span className="text-body-small font-medium text-foreground">ChargePro</span>
          </div>
          <p className="text-caption text-muted">Version 2.4.1 • Build 2024.09.01</p>
        </motion.div>
      </div>
    </div>
  );
}