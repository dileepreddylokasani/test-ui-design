import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { AlertTriangle, Battery, Phone, Clock, Zap, DollarSign } from 'lucide-react';
import { Button } from '../ui/button';

interface LiveChargingScreenProps {
  sessionData: any;
  onStopCharging: (sessionData: any) => void;
}

export function LiveChargingScreen({ sessionData, onStopCharging }: LiveChargingScreenProps) {
  const [currentPower, setCurrentPower] = useState(45.2);
  const [totalEnergy, setTotalEnergy] = useState(0);
  const [currentCost, setCurrentCost] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [batteryLevel, setBatteryLevel] = useState(25);

  useEffect(() => {
    const interval = setInterval(() => {
      setElapsedTime(prev => prev + 1);
      setTotalEnergy(prev => prev + (currentPower / 3600)); // Convert to kWh
      setCurrentCost(prev => prev + (currentPower * 18 / 3600)); // Price per kWh
      setBatteryLevel(prev => Math.min(100, prev + 0.1));
      
      // Simulate power fluctuations
      setCurrentPower(prev => Math.max(30, Math.min(50, prev + (Math.random() - 0.5) * 2)));
    }, 1000);

    return () => clearInterval(interval);
  }, [currentPower]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStopSession = () => {
    const finalSessionData = {
      id: Date.now().toString(),
      duration: elapsedTime,
      energyDelivered: totalEnergy,
      finalCost: currentCost,
      batteryLevel,
      stationId: sessionData.stationId,
    };
    onStopCharging(finalSessionData);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="pt-12 pb-6 px-6 bg-surface-card border-b border-border">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="flex items-center justify-center space-x-2 mb-2">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-3 h-3 bg-accent-green rounded-full"
            />
            <h1 className="text-xl font-bold">Charging Active</h1>
          </div>
          <p className="text-foreground-muted text-sm">Port: {sessionData.portId}</p>
        </motion.div>
      </div>

      <div className="p-6">
        {/* Main Power Display */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-surface-card border border-border rounded-2xl p-8 mb-6 text-center"
        >
          <div className="relative">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
              className="w-32 h-32 mx-auto mb-4 relative"
            >
              <div className="absolute inset-0 border-4 border-surface-elevated rounded-full"></div>
              <div 
                className="absolute inset-0 border-4 border-primary rounded-full"
                style={{
                  background: `conic-gradient(var(--primary) 0deg, var(--primary) ${(batteryLevel / 100) * 360}deg, transparent ${(batteryLevel / 100) * 360}deg)`
                }}
              ></div>
              <div className="absolute inset-4 bg-surface-card rounded-full flex items-center justify-center">
                <Battery className="w-8 h-8 text-primary" />
              </div>
            </motion.div>
            
            <div className="space-y-2">
              <div className="text-4xl font-bold text-primary">{currentPower.toFixed(1)}</div>
              <div className="text-foreground-muted">kW</div>
              <div className="text-lg font-semibold">{batteryLevel.toFixed(1)}%</div>
            </div>
          </div>
        </motion.div>

        {/* Live Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-3 gap-4 mb-6"
        >
          <div className="bg-surface-card border border-border rounded-xl p-4 text-center">
            <Clock className="w-6 h-6 text-accent-blue mx-auto mb-2" />
            <div className="text-xl font-bold">{formatTime(elapsedTime)}</div>
            <div className="text-xs text-foreground-subtle">Elapsed</div>
          </div>
          
          <div className="bg-surface-card border border-border rounded-xl p-4 text-center">
            <Zap className="w-6 h-6 text-accent-green mx-auto mb-2" />
            <div className="text-xl font-bold">{totalEnergy.toFixed(2)}</div>
            <div className="text-xs text-foreground-subtle">kWh</div>
          </div>
          
          <div className="bg-surface-card border border-border rounded-xl p-4 text-center">
            <DollarSign className="w-6 h-6 text-accent-orange mx-auto mb-2" />
            <div className="text-xl font-bold">₹{currentCost.toFixed(0)}</div>
            <div className="text-xs text-foreground-subtle">Cost</div>
          </div>
        </motion.div>

        {/* Status Messages */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-surface-card border border-border rounded-xl p-4 mb-6"
        >
          <h4 className="font-semibold mb-3">Session Status</h4>
          <div className="space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-foreground-muted">Connection</span>
              <span className="text-accent-green font-medium">Stable</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-foreground-muted">Temperature</span>
              <span className="text-foreground font-medium">Normal</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-foreground-muted">Estimated Completion</span>
              <span className="text-primary font-medium">45 min</span>
            </div>
          </div>
        </motion.div>

        {/* Emergency Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-4"
        >
          <Button
            onClick={handleStopSession}
            variant="outline"
            className="w-full h-14 border-accent-red text-accent-red hover:bg-accent-red hover:text-white"
          >
            Stop Charging Session
          </Button>
          
          <Button
            variant="outline"
            className="w-full h-12 border-border"
          >
            <Phone className="w-4 h-4 mr-2" />
            Emergency Contact
          </Button>
        </motion.div>

        {/* Connection Alert (if any) */}
        {false && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="fixed bottom-20 left-4 right-4 bg-accent-red/20 border border-accent-red/30 rounded-xl p-4"
          >
            <div className="flex items-center space-x-3">
              <AlertTriangle className="w-5 h-5 text-accent-red" />
              <div>
                <p className="font-medium text-accent-red">Charging Interrupted!</p>
                <p className="text-accent-red/80 text-sm">Connection lost. Please check the cable.</p>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}