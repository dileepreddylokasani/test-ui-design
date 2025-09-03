import { motion, AnimatePresence } from 'motion/react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface ThemeToggleProps {
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export function ThemeToggle({ showLabel = false, size = 'md' }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();

  const sizes = {
    sm: {
      container: 'w-12 h-6',
      toggle: 'w-5 h-5',
      icon: 'w-3 h-3',
      translate: 'translate-x-6'
    },
    md: {
      container: 'w-14 h-7',
      toggle: 'w-6 h-6',
      icon: 'w-4 h-4',
      translate: 'translate-x-7'
    },
    lg: {
      container: 'w-16 h-8',
      toggle: 'w-7 h-7',
      icon: 'w-5 h-5',
      translate: 'translate-x-8'
    }
  };

  const currentSize = sizes[size];
  const isDark = theme === 'dark';

  return (
    <div className={`flex items-center ${showLabel ? 'space-x-3' : ''}`}>
      {showLabel && (
        <span className="text-sm font-medium text-foreground">
          {isDark ? 'Dark' : 'Light'} Mode
        </span>
      )}
      
      <motion.button
        onClick={toggleTheme}
        className={`relative ${currentSize.container} bg-surface-elevated border border-border rounded-full p-1 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background transition-colors`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Background gradient */}
        <div
          className={`absolute inset-0 rounded-full transition-all duration-300 ${
            isDark 
              ? 'bg-gradient-to-r from-surface-elevated to-accent-purple/20' 
              : 'bg-gradient-to-r from-accent-orange/20 to-surface-elevated'
          }`}
        />
        
        {/* Toggle circle */}
        <motion.div
          className={`relative ${currentSize.toggle} bg-surface-card border border-border rounded-full flex items-center justify-center shadow-md`}
          animate={{
            x: isDark ? currentSize.translate.replace('translate-x-', '') : 0,
          }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={theme}
              initial={{ opacity: 0, rotate: -180, scale: 0.5 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: 180, scale: 0.5 }}
              transition={{ duration: 0.2 }}
              className="flex items-center justify-center"
            >
              {isDark ? (
                <Moon className={`${currentSize.icon} text-accent-purple`} />
              ) : (
                <Sun className={`${currentSize.icon} text-accent-orange`} />
              )}
            </motion.div>
          </AnimatePresence>
        </motion.div>
        
        {/* Icons in background */}
        <div className="absolute inset-0 flex items-center justify-between px-2 pointer-events-none">
          <motion.div
            animate={{ opacity: isDark ? 0.3 : 0.7 }}
            transition={{ duration: 0.2 }}
          >
            <Sun className={`${currentSize.icon} text-accent-orange`} />
          </motion.div>
          <motion.div
            animate={{ opacity: isDark ? 0.7 : 0.3 }}
            transition={{ duration: 0.2 }}
          >
            <Moon className={`${currentSize.icon} text-accent-purple`} />
          </motion.div>
        </div>
      </motion.button>
    </div>
  );
}