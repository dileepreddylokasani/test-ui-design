import { ArrowLeft, Moon, Bell, Globe, Shield, Smartphone, MapPin, Zap } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Switch } from '../ui/switch';
import { motion } from 'motion/react';

interface SettingsPageProps {
  onBack: () => void;
}

const settingsGroups = [
  {
    title: 'Preferences',
    icon: Smartphone,
    settings: [
      {
        id: 'darkMode',
        label: 'Dark Mode',
        description: 'Use dark theme for better battery life',
        type: 'toggle',
        value: false,
        icon: Moon,
      },
      {
        id: 'language',
        label: 'Language',
        description: 'English (US)',
        type: 'select',
        icon: Globe,
      },
    ],
  },
  {
    title: 'Notifications',
    icon: Bell,
    settings: [
      {
        id: 'chargingAlerts',
        label: 'Charging Alerts',
        description: 'Notify when charging is complete',
        type: 'toggle',
        value: true,
        icon: Zap,
      },
      {
        id: 'lowBattery',
        label: 'Low Battery Warnings',
        description: 'Alert when battery is below 20%',
        type: 'toggle',
        value: true,
        icon: Shield,
      },
      {
        id: 'nearbyStations',
        label: 'Nearby Stations',
        description: 'Show notifications for nearby charging stations',
        type: 'toggle',
        value: false,
        icon: MapPin,
      },
    ],
  },
  {
    title: 'Privacy & Security',
    icon: Shield,
    settings: [
      {
        id: 'locationSharing',
        label: 'Location Sharing',
        description: 'Share location for better recommendations',
        type: 'toggle',
        value: true,
        icon: MapPin,
      },
      {
        id: 'analytics',
        label: 'Usage Analytics',
        description: 'Help improve the app with anonymous data',
        type: 'toggle',
        value: true,
        icon: Smartphone,
      },
    ],
  },
];

export function SettingsPage({ onBack }: SettingsPageProps) {
  return (
    <div className="pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 text-white px-4 py-6">
        <div className="flex items-center mb-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onBack}
            className="mr-3 p-2 rounded-full hover:bg-white/10 transition-colors"
          >
            <ArrowLeft size={20} />
          </motion.button>
          <h1 className="text-xl font-semibold">Settings</h1>
        </div>
        <p className="text-indigo-100 text-sm">Customize your app experience and preferences</p>
      </div>

      <div className="px-4 py-4 space-y-6">
        {settingsGroups.map((group, groupIndex) => {
          const GroupIcon = group.icon;
          return (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: groupIndex * 0.1 }}
            >
              <div className="mb-3">
                <div className="flex items-center mb-2">
                  <motion.div
                    whileHover={{ rotate: 5 }}
                    className="bg-gray-100 p-2 rounded-lg mr-3"
                  >
                    <GroupIcon size={18} className="text-gray-600" />
                  </motion.div>
                  <h2 className="font-semibold text-gray-900">{group.title}</h2>
                </div>
              </div>
              
              <Card className="border border-gray-200 overflow-hidden">
                {group.settings.map((setting, settingIndex) => {
                  const SettingIcon = setting.icon;
                  return (
                    <motion.div
                      key={setting.id}
                      whileHover={{ backgroundColor: 'rgba(0,0,0,0.02)' }}
                      className={`p-4 flex items-center justify-between ${
                        settingIndex < group.settings.length - 1 ? 'border-b border-gray-100' : ''
                      }`}
                    >
                      <div className="flex items-center flex-1">
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          className="bg-gray-50 p-2 rounded-lg mr-3"
                        >
                          <SettingIcon size={16} className="text-gray-600" />
                        </motion.div>
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900">{setting.label}</h3>
                          <p className="text-sm text-gray-600">{setting.description}</p>
                        </div>
                      </div>
                      
                      <div className="ml-4">
                        {setting.type === 'toggle' && (
                          <Switch
                            checked={setting.value}
                            className="data-[state=checked]:bg-blue-600"
                          />
                        )}
                        {setting.type === 'select' && (
                          <Button variant="ghost" size="sm" className="text-gray-600">
                            Change
                          </Button>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </Card>
            </motion.div>
          );
        })}

        {/* App Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="p-4 border border-gray-200 bg-gradient-to-br from-gray-50 to-gray-100">
            <div className="text-center">
              <h3 className="font-medium text-gray-900 mb-1">EV Charging App</h3>
              <p className="text-sm text-gray-600 mb-2">Version 2.1.0</p>
              <div className="flex justify-center space-x-4 text-xs text-gray-500">
                <button className="hover:text-blue-600 transition-colors">Privacy Policy</button>
                <button className="hover:text-blue-600 transition-colors">Terms of Service</button>
                <button className="hover:text-blue-600 transition-colors">About</button>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}