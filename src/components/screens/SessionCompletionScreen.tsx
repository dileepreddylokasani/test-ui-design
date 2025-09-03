import { motion } from 'motion/react';
import { CheckCircle, Star, Home, Receipt, Clock, Zap, DollarSign } from 'lucide-react';
import { Button } from '../ui/button';

interface SessionCompletionScreenProps {
  sessionData: any;
  onReviewStation: () => void;
  onDone: () => void;
}

export function SessionCompletionScreen({ sessionData, onReviewStation, onDone }: SessionCompletionScreenProps) {
  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  return (
    <div className="min-h-screen bg-background text-foreground pb-20">
      <div className="p-6 pt-12">
        {/* Success Header */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', stiffness: 200 }}
          className="text-center mb-8"
        >
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-20 h-20 bg-accent-green/20 rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <CheckCircle className="w-12 h-12 text-accent-green" />
          </motion.div>
          <h1 className="text-2xl font-bold mb-2">Charging Complete!</h1>
          <p className="text-foreground-muted">Your session has finished successfully</p>
        </motion.div>

        {/* Session Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-surface-card border border-border rounded-xl p-6 mb-6"
        >
          <h3 className="font-semibold mb-4 flex items-center">
            <Receipt className="w-5 h-5 mr-2 text-primary" />
            Session Summary
          </h3>
          
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-accent-green/20 rounded-full flex items-center justify-center mx-auto mb-2">
                <Zap className="w-6 h-6 text-accent-green" />
              </div>
              <div className="text-2xl font-bold text-foreground">{sessionData.energyDelivered?.toFixed(1) || '12.5'} kWh</div>
              <div className="text-foreground-muted text-sm">Energy Delivered</div>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-accent-blue/20 rounded-full flex items-center justify-center mx-auto mb-2">
                <Clock className="w-6 h-6 text-accent-blue" />
              </div>
              <div className="text-2xl font-bold text-foreground">{formatTime(sessionData.duration || 1800)}</div>
              <div className="text-foreground-muted text-sm">Duration</div>
            </div>
          </div>

          <div className="bg-surface-elevated rounded-xl p-4 mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-foreground-muted">Energy Cost</span>
              <span className="font-medium">₹{Math.round(sessionData.finalCost || 225)}</span>
            </div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-foreground-muted">Service Fee</span>
              <span className="font-medium">₹10</span>
            </div>
            <div className="border-t border-border pt-2 mt-2">
              <div className="flex items-center justify-between">
                <span className="font-semibold">Total Amount</span>
                <span className="text-xl font-bold text-primary">₹{Math.round(sessionData.finalCost || 225) + 10}</span>
              </div>
            </div>
          </div>

          <div className="text-center text-sm text-foreground-muted">
            Payment charged to your wallet
          </div>
        </motion.div>

        {/* Battery Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-surface-card border border-border rounded-xl p-6 mb-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold">Battery Level</h4>
            <span className="text-2xl font-bold text-accent-green">{Math.round(sessionData.batteryLevel || 85)}%</span>
          </div>
          
          <div className="w-full bg-surface rounded-full h-3 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${sessionData.batteryLevel || 85}%` }}
              transition={{ duration: 2, delay: 0.5 }}
              className="h-3 bg-gradient-to-r from-accent-green to-accent-blue rounded-full"
            />
          </div>
          
          <div className="flex justify-between text-sm text-foreground-muted mt-2">
            <span>Estimated Range: 320 km</span>
            <span>Next charge in ~2 days</span>
          </div>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-4"
        >
          <Button
            onClick={onReviewStation}
            variant="outline"
            className="w-full h-12 flex items-center justify-center space-x-2"
          >
            <Star className="w-4 h-4" />
            <span>Rate This Station</span>
          </Button>
          
          <Button
            onClick={onDone}
            className="w-full h-14 bg-primary hover:bg-primary-dark text-primary-foreground font-semibold"
          >
            <Home className="w-5 h-5 mr-2" />
            Done
          </Button>
        </motion.div>

        {/* Receipt */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-8 text-center"
        >
          <Button variant="ghost" className="text-primary">
            <Receipt className="w-4 h-4 mr-2" />
            Download Receipt
          </Button>
        </motion.div>
      </div>
    </div>
  );
}