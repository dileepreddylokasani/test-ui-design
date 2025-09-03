import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Battery, Clock, DollarSign, Zap, AlertTriangle, CreditCard, Smartphone, Wallet } from 'lucide-react';
import { Button } from '../ui/button';

interface ChargingConfigScreenProps {
  stationId: string;
  portId: string;
  onBack: () => void;
  onStartCharging: (config: any) => void;
}

export function ChargingConfigScreen({ stationId, portId, onBack, onStartCharging }: ChargingConfigScreenProps) {
  const [limitType, setLimitType] = useState<'percentage' | 'time' | 'money'>('percentage');
  const [percentage, setPercentage] = useState(80);
  const [timeHours, setTimeHours] = useState(1);
  const [timeMinutes, setTimeMinutes] = useState(30);
  const [moneyAmount, setMoneyAmount] = useState(500);
  const [paymentMethod, setPaymentMethod] = useState<'wallet' | 'googlepay' | 'card'>('wallet');

  const mockData = {
    currentBattery: 25,
    vehicleCapacity: 75, // kWh
    chargingSpeed: 250, // kW
    pricePerUnit: 18,
  };

  const calculateEstimates = () => {
    const energyNeeded = ((percentage - mockData.currentBattery) / 100) * mockData.vehicleCapacity;
    const timeNeeded = energyNeeded / (mockData.chargingSpeed / 60); // in minutes
    const cost = energyNeeded * mockData.pricePerUnit;

    return {
      energyNeeded: Math.max(0, energyNeeded),
      timeNeeded: Math.max(0, timeNeeded),
      cost: Math.max(0, cost),
    };
  };

  const estimates = calculateEstimates();

  const handleStartCharging = () => {
    const config = {
      limitType,
      targetPercentage: limitType === 'percentage' ? percentage : null,
      timeLimit: limitType === 'time' ? { hours: timeHours, minutes: timeMinutes } : null,
      moneyLimit: limitType === 'money' ? moneyAmount : null,
      paymentMethod,
      estimates,
    };
    onStartCharging(config);
  };

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
          <h1 className="font-semibold">Charging Configuration</h1>
          <p className="text-foreground-muted text-sm">Port: {portId}</p>
        </div>
        <div className="w-16"></div>
      </motion.div>

      <div className="p-6">
        {/* Current Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-surface-card border border-border rounded-xl p-6 mb-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                <Battery className="w-6 h-6 text-primary" />
              </div>
              <div>
                <div className="text-2xl font-bold">{mockData.currentBattery}%</div>
                <div className="text-foreground-muted text-sm">Current Battery</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-lg font-semibold text-accent-blue">{mockData.chargingSpeed}kW</div>
              <div className="text-foreground-muted text-sm">Max Speed</div>
            </div>
          </div>
          
          <div className="w-full bg-surface rounded-full h-3 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${mockData.currentBattery}%` }}
              transition={{ duration: 1, delay: 0.3 }}
              className="h-3 bg-gradient-to-r from-accent-red via-accent-orange to-accent-green rounded-full"
            />
          </div>
        </motion.div>

        {/* Charging Configuration */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-6"
        >
          <h3 className="font-semibold mb-4">Charging Configuration</h3>
          
          {/* Single Card with All Options */}
          <div className="bg-surface-card border border-border rounded-xl p-6">
            {/* Charging Options */}
            <div className="mb-6">
              <h4 className="font-medium mb-4 text-foreground-muted">Charging Limit</h4>
              <div className="grid grid-cols-3 gap-3 mb-6">
                {[
                  { key: 'percentage', icon: Battery, label: 'Battery %' },
                  { key: 'time', icon: Clock, label: 'Duration' },
                  { key: 'money', icon: DollarSign, label: 'Amount' },
                ].map((option) => {
                  const Icon = option.icon;
                  return (
                    <motion.button
                      key={option.key}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setLimitType(option.key as any)}
                      className={`p-3 rounded-lg border text-center transition-all ${
                        limitType === option.key
                          ? 'border-primary bg-primary/10 text-primary'
                          : 'border-border hover:bg-surface-elevated'
                      }`}
                    >
                      <Icon className={`w-5 h-5 mx-auto mb-1 ${
                        limitType === option.key ? 'text-primary' : 'text-foreground-subtle'
                      }`} />
                      <div className="text-sm font-medium">{option.label}</div>
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Configuration Controls */}
            <div className="mb-6">
              {limitType === 'percentage' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Target Battery Level</span>
                    <span className="text-2xl font-bold text-primary">{percentage}%</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    step="5"
                    value={percentage}
                    onChange={(e) => setPercentage(Number(e.target.value))}
                    className="w-full h-2 bg-surface rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div className="flex justify-between text-sm text-foreground-muted">
                    <span>10%</span>
                    <span>50%</span>
                    <span>100%</span>
                  </div>
                </div>
              )}

              {limitType === 'time' && (
                <div className="space-y-4">
                  <div className="text-center">
                    <span className="text-2xl font-bold text-primary">
                      {timeHours}h {timeMinutes}m
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Hours</label>
                      <input
                        type="number"
                        min="0"
                        max="8"
                        value={timeHours}
                        onChange={(e) => setTimeHours(Number(e.target.value))}
                        className="w-full h-12 px-4 bg-surface-elevated border border-border rounded-xl"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Minutes</label>
                      <input
                        type="number"
                        min="0"
                        max="59"
                        step="15"
                        value={timeMinutes}
                        onChange={(e) => setTimeMinutes(Number(e.target.value))}
                        className="w-full h-12 px-4 bg-surface-elevated border border-border rounded-xl"
                      />
                    </div>
                  </div>
                </div>
              )}

              {limitType === 'money' && (
                <div className="space-y-4">
                  <div className="text-center">
                    <span className="text-2xl font-bold text-primary">₹{moneyAmount}</span>
                  </div>
                  <input
                    type="range"
                    min="100"
                    max="2000"
                    step="50"
                    value={moneyAmount}
                    onChange={(e) => setMoneyAmount(Number(e.target.value))}
                    className="w-full h-2 bg-surface rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div className="flex justify-between text-sm text-foreground-muted">
                    <span>₹100</span>
                    <span>₹1000</span>
                    <span>₹2000</span>
                  </div>
                </div>
              )}
            </div>

            {/* Payment Method */}
            <div className="border-t border-border pt-6">
              <h4 className="font-medium mb-4 text-foreground-muted">Payment Method</h4>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { key: 'wallet', icon: Wallet, label: 'Wallet' },
                  { key: 'googlepay', icon: Smartphone, label: 'Google Pay' },
                  { key: 'card', icon: CreditCard, label: 'Card' },
                ].map((method) => {
                  const Icon = method.icon;
                  return (
                    <motion.button
                      key={method.key}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setPaymentMethod(method.key as any)}
                      className={`p-3 rounded-lg border text-center transition-all ${
                        paymentMethod === method.key
                          ? 'border-primary bg-primary/10 text-primary'
                          : 'border-border hover:bg-surface-elevated'
                      }`}
                    >
                      <Icon className={`w-5 h-5 mx-auto mb-1 ${
                        paymentMethod === method.key ? 'text-primary' : 'text-foreground-subtle'
                      }`} />
                      <div className="text-sm font-medium">{method.label}</div>
                    </motion.button>
                  );
                })}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Estimates */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-surface-card border border-border rounded-xl p-6 mb-6"
        >
          <h4 className="font-semibold mb-4">Charging Estimates</h4>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-lg font-semibold text-accent-green">{estimates.energyNeeded.toFixed(1)} kWh</div>
              <div className="text-xs text-foreground-subtle">Energy</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-semibold text-accent-blue">{Math.round(estimates.timeNeeded)}min</div>
              <div className="text-xs text-foreground-subtle">Time</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-semibold text-primary">₹{Math.round(estimates.cost)}</div>
              <div className="text-xs text-foreground-subtle">Cost</div>
            </div>
          </div>
        </motion.div>

        {/* Start Charging Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Button
            onClick={handleStartCharging}
            className="w-full h-14 bg-primary hover:bg-primary-dark text-primary-foreground font-semibold"
          >
            <Zap className="w-5 h-5 mr-2" />
            {paymentMethod === 'googlepay' ? 'Pay with Google Pay' : 
             paymentMethod === 'card' ? 'Pay with Card' : 
             'Start Charging Session'}
          </Button>
        </motion.div>

        {/* Safety Note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-6 p-4 bg-accent-orange/20 border border-accent-orange/30 rounded-xl"
        >
          <div className="flex items-start space-x-3">
            <AlertTriangle className="w-5 h-5 text-accent-orange flex-shrink-0 mt-0.5" />
            <div>
              <h5 className="font-medium text-accent-orange mb-1">Safety Reminder</h5>
              <p className="text-accent-orange/80 text-sm">
                Ensure your vehicle is properly connected before starting. The session will begin automatically once confirmed.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// Custom slider styles
const sliderStyles = `
  .slider::-webkit-slider-thumb {
    appearance: none;
    height: 20px;
    width: 20px;
    border-radius: 50%;
    background: var(--primary);
    cursor: pointer;
    border: 2px solid var(--background);
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  }
  
  .slider::-webkit-slider-track {
    background: var(--surface-elevated);
    border-radius: 5px;
  }
`;