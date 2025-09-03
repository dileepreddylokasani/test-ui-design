import { useState } from 'react';
import { motion } from 'motion/react';
import { Smartphone, ArrowRight, Wifi, WifiOff } from 'lucide-react';
import { Button } from '../ui/button';

interface LoginScreenProps {
  onLogin: (phoneNumber: string) => void;
}

export function LoginScreen({ onLogin }: LoginScreenProps) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  const validatePhoneNumber = (phone: string) => {
    const phoneRegex = /^[6-9]\d{9}$/;
    return phoneRegex.test(phone);
  };

  const handleSubmit = async () => {
    setError('');
    
    if (!isOnline) {
      setError('No internet connection. Please check your network.');
      return;
    }

    if (!validatePhoneNumber(phoneNumber)) {
      setError('Please enter a valid 10-digit phone number');
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      onLogin(phoneNumber);
    }, 1500);
  };

  const handlePhoneChange = (value: string) => {
    const cleanValue = value.replace(/\D/g, '').slice(0, 10);
    setPhoneNumber(cleanValue);
    if (error) setError('');
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center px-6">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{ duration: 6, repeat: Infinity }}
          className="absolute top-1/4 right-1/4 w-40 h-40 bg-primary/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ 
            scale: [1.1, 1, 1.1],
            opacity: [0.1, 0.3, 0.1]
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute bottom-1/3 left-1/4 w-32 h-32 bg-accent-blue/20 rounded-full blur-3xl"
        />
      </div>

      <div className="relative z-10 w-full max-w-sm">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          {/* Logo */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="w-20 h-20 mx-auto mb-6 bg-surface-card border border-border rounded-2xl flex items-center justify-center shadow-xl"
          >
            <svg
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              className="text-primary"
            >
              <path
                d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"
                fill="currentColor"
              />
            </svg>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
            <p className="text-foreground-muted">Sign in to access your EV charging network</p>
          </motion.div>
        </motion.div>

        {/* Network Status */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
          className="flex items-center justify-center mb-8"
        >
          <div className={`flex items-center space-x-2 px-3 py-1 rounded-lg text-xs ${
            isOnline 
              ? 'bg-accent-green/20 text-accent-green' 
              : 'bg-accent-red/20 text-accent-red'
          }`}>
            {isOnline ? <Wifi className="w-3 h-3" /> : <WifiOff className="w-3 h-3" />}
            <span>{isOnline ? 'Connected' : 'No Connection'}</span>
          </div>
        </motion.div>

        {/* Phone Input */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mb-6"
        >
          <label className="block text-sm font-medium text-foreground-muted mb-3">
            Phone Number
          </label>
          <div className="relative">
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
              <Smartphone className="w-4 h-4 text-foreground-subtle" />
              <span className="text-foreground-muted text-sm">+91</span>
            </div>
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => handlePhoneChange(e.target.value)}
              placeholder="Enter your phone number"
              className={`w-full h-14 pl-16 pr-4 bg-surface-card border rounded-xl text-foreground placeholder-foreground-subtle focus:outline-none focus:border-primary transition-all ${
                error ? 'border-accent-red' : 'border-border'
              }`}
              maxLength={10}
            />
          </div>
          {error && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-accent-red text-sm mt-2 flex items-center space-x-1"
            >
              <span>⚠️</span>
              <span>{error}</span>
            </motion.p>
          )}
        </motion.div>

        {/* Submit Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          <Button
            onClick={handleSubmit}
            disabled={!phoneNumber || phoneNumber.length !== 10 || isLoading || !isOnline}
            className="w-full h-14 bg-primary hover:bg-primary-dark text-primary-foreground font-semibold rounded-xl transition-all flex items-center justify-center space-x-2 group disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full"
              />
            ) : (
              <>
                <span>Send OTP</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </Button>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-8 text-center"
        >
          <p className="text-foreground-subtle text-xs leading-relaxed">
            By continuing, you agree to our Terms of Service and Privacy Policy. 
            We'll send you a verification code via SMS.
          </p>
        </motion.div>

        {/* Debug Info in Development */}
        {process.env.NODE_ENV === 'development' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
            className="mt-6 p-3 bg-surface-elevated border border-border rounded-lg"
          >
            <p className="text-foreground-subtle text-xs mb-1">Development Mode:</p>
            <p className="text-foreground-muted text-xs">Use any 10-digit number starting with 6-9</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}