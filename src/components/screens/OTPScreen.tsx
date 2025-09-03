import { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, RotateCcw, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '../ui/button';

interface OTPScreenProps {
  phoneNumber: string;
  onVerify: () => void;
  onBack: () => void;
}

export function OTPScreen({ phoneNumber, onVerify, onBack }: OTPScreenProps) {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [resendTimer, setResendTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    // Auto-focus first input
    inputRefs.current[0]?.focus();
  }, []);

  useEffect(() => {
    // Countdown timer for resend
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [resendTimer]);

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return; // Prevent multiple characters
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError('');

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto-verify when all fields are filled
    if (newOtp.every(digit => digit !== '') && newOtp.join('').length === 6) {
      handleVerify(newOtp.join(''));
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async (otpValue: string = otp.join('')) => {
    setError('');
    setIsLoading(true);

    // Simulate OTP verification
    setTimeout(() => {
      setIsLoading(false);
      
      // For demo, accept any 6-digit OTP or specific test OTP
      if (otpValue.length === 6 && (otpValue === '123456' || /^\d{6}$/.test(otpValue))) {
        onVerify();
      } else {
        setError('Invalid OTP. Please try again.');
        setOtp(['', '', '', '', '', '']);
        inputRefs.current[0]?.focus();
      }
    }, 1500);
  };

  const handleResend = () => {
    setCanResend(false);
    setResendTimer(30);
    setOtp(['', '', '', '', '', '']);
    setError('');
    inputRefs.current[0]?.focus();
  };

  const formatPhoneNumber = (phone: string) => {
    return `+91 ${phone.slice(0, 3)} ${phone.slice(3, 6)} ${phone.slice(6)}`;
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
          className="absolute top-1/4 right-1/4 w-40 h-40 bg-accent-green/20 rounded-full blur-3xl"
        />
      </div>

      <div className="relative z-10 w-full max-w-sm">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="mb-6 text-foreground-muted hover:text-foreground"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          
          <div className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="w-16 h-16 mx-auto mb-6 bg-surface-card border border-border rounded-2xl flex items-center justify-center"
            >
              <CheckCircle className="w-8 h-8 text-accent-green" />
            </motion.div>
            
            <h1 className="text-2xl font-bold mb-2">Verify Your Number</h1>
            <p className="text-foreground-muted text-sm">
              We've sent a 6-digit code to
            </p>
            <p className="text-foreground font-medium">
              {formatPhoneNumber(phoneNumber)}
            </p>
          </div>
        </motion.div>

        {/* OTP Input */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-6"
        >
          <div className="flex space-x-3 justify-center">
            {otp.map((digit, index) => (
              <motion.input
                key={index}
                ref={(el) => inputRefs.current[index] = el}
                type="text"
                inputMode="numeric"
                pattern="\d*"
                maxLength={1}
                value={digit}
                onChange={(e) => handleOtpChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className={`w-12 h-14 text-center text-xl font-bold bg-surface-card border rounded-xl focus:outline-none focus:border-primary transition-all ${
                  error ? 'border-accent-red' : 'border-border'
                } ${digit ? 'text-foreground' : 'text-foreground-subtle'}`}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.5 + (index * 0.1) }}
              />
            ))}
          </div>
          
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-center space-x-2 mt-4 text-accent-red text-sm"
            >
              <AlertCircle className="w-4 h-4" />
              <span>{error}</span>
            </motion.div>
          )}
        </motion.div>

        {/* Verify Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mb-6"
        >
          <Button
            onClick={() => handleVerify()}
            disabled={otp.some(digit => !digit) || isLoading}
            className="w-full h-14 bg-primary hover:bg-primary-dark text-primary-foreground font-semibold rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full"
              />
            ) : (
              'Verify OTP'
            )}
          </Button>
        </motion.div>

        {/* Resend Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-center"
        >
          {canResend ? (
            <Button
              variant="ghost"
              onClick={handleResend}
              className="text-primary hover:text-primary-dark font-medium"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Resend OTP
            </Button>
          ) : (
            <p className="text-foreground-subtle text-sm">
              Resend OTP in {resendTimer}s
            </p>
          )}
        </motion.div>

        {/* OTP not received */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-8 text-center"
        >
          <p className="text-foreground-subtle text-xs mb-2">Didn't receive the code?</p>
          <div className="space-y-1">
            <p className="text-foreground-muted text-xs">• Check your SMS inbox</p>
            <p className="text-foreground-muted text-xs">• Ensure you have network coverage</p>
            <p className="text-foreground-muted text-xs">• Try requesting a new code</p>
          </div>
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
            <p className="text-foreground-muted text-xs">Use OTP: 123456 or any 6-digit number</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}