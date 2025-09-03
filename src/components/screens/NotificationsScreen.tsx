import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Bell, BellOff, Zap, DollarSign, MapPin, Shield } from 'lucide-react';
import { Button } from '../ui/button';
import { Switch } from '../ui/switch';

interface NotificationsScreenProps {
  onBack: () => void;
}

export function NotificationsScreen({ onBack }: NotificationsScreenProps) {
  const [pushEnabled, setPushEnabled] = useState(true);
  const [settings, setSettings] = useState({
    chargingAlerts: true,
    paymentUpdates: true,
    promotions: false,
    stationUpdates: true,
    securityAlerts: true,
    maintenanceNotices: false,
  });
  const [testNotificationSent, setTestNotificationSent] = useState(false);

  const handleSettingChange = (key: string, value: boolean) => {
    setSettings(prev => ({ ...prev, [key]: value }));
    // Simulate saving settings
    setTimeout(() => {
      console.log(`${key} setting updated to ${value}`);
    }, 100);
  };

  const handleTestNotification = () => {
    if (pushEnabled) {
      setTestNotificationSent(true);
      // Simulate test notification
      alert('Test notification sent! Check your notification panel.');
      setTimeout(() => {
        setTestNotificationSent(false);
      }, 3000);
    }
  };

  const handleEnablePushNotifications = () => {
    // Simulate requesting notification permissions
    alert('Please allow notifications in your browser/device settings to enable this feature.');
    // In a real app, this would request actual permissions
    setPushEnabled(true);
  };

  const notificationCategories = [
    {
      key: 'chargingAlerts',
      title: 'Charging Alerts',
      description: 'Session start, completion, and interruption notifications',
      icon: Zap,
      color: 'text-accent-green',
      bgColor: 'bg-accent-green/20',
    },
    {
      key: 'paymentUpdates',
      title: 'Payment Updates',
      description: 'Transaction confirmations and wallet updates',
      icon: DollarSign,
      color: 'text-primary',
      bgColor: 'bg-primary/20',
    },
    {
      key: 'promotions',
      title: 'Promotions & Offers',
      description: 'Special deals and discount notifications',
      icon: Bell,
      color: 'text-accent-orange',
      bgColor: 'bg-accent-orange/20',
    },
    {
      key: 'stationUpdates',
      title: 'Station Updates',
      description: 'New stations, closures, and availability alerts',
      icon: MapPin,
      color: 'text-accent-blue',
      bgColor: 'bg-accent-blue/20',
    },
    {
      key: 'securityAlerts',
      title: 'Security Alerts',
      description: 'Account security and login notifications',
      icon: Shield,
      color: 'text-accent-red',
      bgColor: 'bg-accent-red/20',
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground pb-20">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between p-6 pt-12 border-b border-border bg-surface-card"
      >
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <div className="text-center">
          <h1 className="font-semibold">Notifications</h1>
          <p className="text-foreground-muted text-sm">Manage your alerts</p>
        </div>
        <div className="w-16"></div>
      </motion.div>

      <div className="p-6">
        {/* Push Notifications Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className={`p-4 rounded-xl border mb-6 ${
            pushEnabled 
              ? 'bg-accent-green/10 border-accent-green/30' 
              : 'bg-accent-red/10 border-accent-red/30'
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {pushEnabled ? (
                <Bell className="w-5 h-5 text-accent-green" />
              ) : (
                <BellOff className="w-5 h-5 text-accent-red" />
              )}
              <div>
                <h3 className={`font-medium ${pushEnabled ? 'text-accent-green' : 'text-accent-red'}`}>
                  Push Notifications {pushEnabled ? 'Enabled' : 'Disabled'}
                </h3>
                <p className={`text-sm ${pushEnabled ? 'text-accent-green/80' : 'text-accent-red/80'}`}>
                  {pushEnabled 
                    ? 'You\'ll receive important updates' 
                    : 'Enable in device settings to receive alerts'
                  }
                </p>
              </div>
            </div>
            {!pushEnabled && (
              <Button 
                variant="outline" 
                size="sm"
                className="border-accent-red text-accent-red hover:bg-accent-red/10"
                onClick={handleEnablePushNotifications}
              >
                Enable
              </Button>
            )}
          </div>
        </motion.div>

        {/* Notification Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-4"
        >
          <h3 className="font-semibold mb-4">Notification Preferences</h3>
          
          {notificationCategories.map((category, index) => {
            const Icon = category.icon;
            const isEnabled = settings[category.key as keyof typeof settings];
            
            return (
              <motion.div
                key={category.key}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + (index * 0.1) }}
                className="bg-surface-card border border-border rounded-xl p-4"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 flex-1">
                    <div className={`w-12 h-12 ${category.bgColor} rounded-full flex items-center justify-center`}>
                      <Icon className={`w-6 h-6 ${category.color}`} />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-foreground">{category.title}</h4>
                      <p className="text-foreground-muted text-sm">{category.description}</p>
                    </div>
                  </div>
                  <Switch
                    checked={isEnabled}
                    onCheckedChange={(checked) => handleSettingChange(category.key, checked)}
                    disabled={!pushEnabled}
                    className={`${!pushEnabled ? 'opacity-50' : ''}`}
                  />
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Advanced Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-8 bg-surface-card border border-border rounded-xl p-4"
        >
          <h4 className="font-semibold mb-4">Advanced Settings</h4>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-foreground">Quiet Hours</div>
                <div className="text-foreground-muted text-sm">Limit notifications between 10 PM - 7 AM</div>
              </div>
              <Switch defaultChecked={false} disabled={!pushEnabled} />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-foreground">Group Similar Notifications</div>
                <div className="text-foreground-muted text-sm">Bundle notifications from the same category</div>
              </div>
              <Switch defaultChecked={true} disabled={!pushEnabled} />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-foreground">Emergency Override</div>
                <div className="text-foreground-muted text-sm">Always show critical alerts</div>
              </div>
              <Switch defaultChecked={true} disabled={!pushEnabled} />
            </div>
          </div>
        </motion.div>

        {/* Test Notification */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-6"
        >
          <Button
            variant="outline"
            className="w-full"
            disabled={!pushEnabled || testNotificationSent}
            onClick={handleTestNotification}
          >
            <Bell className="w-4 h-4 mr-2" />
            {testNotificationSent ? 'Test Sent!' : 'Send Test Notification'}
          </Button>
        </motion.div>

        {/* Help Text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-8 bg-surface-elevated border border-border rounded-xl p-4"
        >
          <h4 className="font-semibold mb-3">About Notifications</h4>
          <div className="space-y-2 text-sm text-foreground-muted">
            <p>• Notifications help you stay informed about your charging sessions</p>
            <p>• You can customize which types of alerts you receive</p>
            <p>• Critical security alerts cannot be disabled</p>
            <p>• Changes take effect immediately</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}