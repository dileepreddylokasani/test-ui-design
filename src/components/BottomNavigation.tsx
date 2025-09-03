import { motion } from 'motion/react';
import { Home, Bookmark, Wallet, User } from 'lucide-react';
import { cn } from './ui/utils';

interface BottomNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const tabs = [
  {
    id: 'home',
    label: 'Home',
    icon: Home,
  },
  {
    id: 'bookmarks',
    label: 'Saved',
    icon: Bookmark,
  },
  {
    id: 'wallet',
    label: 'Wallet',
    icon: Wallet,
  },
  {
    id: 'profile',
    label: 'Profile',
    icon: User,
  },
];

export function BottomNavigation({ activeTab, onTabChange }: BottomNavigationProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50">
      <div className="max-w-md mx-auto">
        <div className="glass-professional mx-4 mb-6 rounded-xl shadow-professional-lg">
          <div className="grid grid-cols-4">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              
              return (
                <button
                  key={tab.id}
                  onClick={() => onTabChange(tab.id)}
                  className="relative flex flex-col items-center justify-center py-3 px-4 transition-professional"
                >
                  {/* Active indicator */}
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-primary-subtle rounded-xl"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}

                  {/* Icon */}
                  <div className="relative z-10 mb-1">
                    <Icon
                      className={cn(
                        "w-5 h-5 transition-professional",
                        isActive ? "text-primary" : "text-quaternary"
                      )}
                    />
                  </div>

                  {/* Label */}
                  <span
                    className={cn(
                      "text-caption relative z-10 transition-professional",
                      isActive ? "text-primary font-medium" : "text-quaternary"
                    )}
                  >
                    {tab.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}