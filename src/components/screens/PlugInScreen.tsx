import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, QrCode, Zap, CreditCard, Wallet, AlertTriangle, 
  CheckCircle, Flashlight, Keyboard, Battery, Clock
} from 'lucide-react';
import { Button } from '../ui/button';

interface PlugInScreenProps {
  stationId: string;
  onBack: () => void;
  onContinue: (portId: string) => void;
}

export function PlugInScreen({ stationId, onBack, onContinue }: PlugInScreenProps) {
  const [scannedPortId, setScannedPortId] = useState('');
  const [manualPortId, setManualPortId] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [scanError, setScanError] = useState('');
  const [flashlightOn, setFlashlightOn] = useState(false);
  const [inputMethod, setInputMethod] = useState<'qr' | 'manual'>('qr');
  const [paymentMethod, setPaymentMethod] = useState<'wallet' | 'card'>('wallet');
  const [walletBalance] = useState(450); // Mock wallet balance
  const fileInputRef = useRef<HTMLInputElement>(null);

  const mockStation = {
    name: 'Tesla Supercharger',
    location: 'MG Road, Bangalore',
    pricePerUnit: 18,
    estimatedCost: 270, // For 15 kWh
  };

  const handleQRScan = () => {
    setIsScanning(true);
    setScanError('');
    
    // Simulate QR code scanning
    setTimeout(() => {
      setIsScanning(false);
      const randomSuccess = Math.random() > 0.3; // 70% success rate
      
      if (randomSuccess) {
        const portId = `PORT-${Math.floor(Math.random() * 12) + 1}`;
        setScannedPortId(portId);
      } else {
        setScanError('Unable to scan QR code. Please try again or enter port ID manually.');
      }
    }, 2000);
  };

  const handleManualSubmit = () => {
    if (manualPortId.length >= 4) {
      onContinue(manualPortId);
    }
  };

  const handleContinue = () => {
    const portId = inputMethod === 'qr' ? scannedPortId : manualPortId;
    if (portId && (!paymentMethod || paymentMethod === 'wallet' || walletBalance >= mockStation.estimatedCost)) {
      onContinue(portId);
    }
  };

  const isPortValid = inputMethod === 'qr' ? !!scannedPortId : manualPortId.length >= 4;
  const hasInsufficientFunds = paymentMethod === 'wallet' && walletBalance < mockStation.estimatedCost;

  return (
    <div className="min-h-screen bg-background text-foreground pb-20">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between p-6 pt-12 border-b border-border bg-surface-card"
      >
        <Button
          variant="ghost"
          size="sm"
          onClick={onBack}
          className="text-foreground-muted hover:text-foreground"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        
        <div className="text-center">
          <h1 className="font-semibold">Connect & Charge</h1>
          <p className="text-foreground-muted text-sm">{mockStation.name}</p>
        </div>
        
        <div className="w-16"></div> {/* Spacer for center alignment */}
      </motion.div>

      <div className="p-6">
        {/* Station Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-surface-card border border-border rounded-xl p-4 mb-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-foreground">{mockStation.name}</h3>
              <p className="text-foreground-muted text-sm">{mockStation.location}</p>
            </div>
            <div className="text-right">
              <div className="text-primary font-semibold">₹{mockStation.pricePerUnit}/kWh</div>
              <div className="text-foreground-muted text-sm">Est. ₹{mockStation.estimatedCost}</div>
            </div>
          </div>
        </motion.div>

        {/* Input Method Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-6"
        >
          <h3 className="font-semibold mb-4">Connect to Charging Port</h3>
          
          <div className="flex space-x-2 mb-4">
            <Button
              variant={inputMethod === 'qr' ? 'default' : 'outline'}
              onClick={() => setInputMethod('qr')}
              className="flex-1"
            >
              <QrCode className="w-4 h-4 mr-2" />
              Scan QR
            </Button>
            <Button
              variant={inputMethod === 'manual' ? 'default' : 'outline'}
              onClick={() => setInputMethod('manual')}
              className="flex-1"
            >
              <Keyboard className="w-4 h-4 mr-2" />
              Manual Entry
            </Button>
          </div>
        </motion.div>

        {/* QR Scanner */}
        <AnimatePresence mode="wait">
          {inputMethod === 'qr' && (
            <motion.div
              key="qr-scanner"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="mb-6"
            >
              <div className="bg-surface-card border border-border rounded-xl p-6">
                {!scannedPortId && !isScanning && (
                  <div className="text-center">
                    <motion.div
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="w-48 h-48 mx-auto mb-4 bg-surface-elevated border-2 border-dashed border-border rounded-xl flex items-center justify-center"
                    >
                      <QrCode className="w-16 h-16 text-foreground-subtle" />
                    </motion.div>
                    
                    <p className="text-foreground-muted mb-4">
                      Point your camera at the QR code on the charging port
                    </p>
                    
                    <div className="flex space-x-3">
                      <Button
                        onClick={handleQRScan}
                        className="flex-1 bg-primary hover:bg-primary-dark text-primary-foreground"
                      >
                        <QrCode className="w-4 h-4 mr-2" />
                        Start Scanning
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => setFlashlightOn(!flashlightOn)}
                        className={flashlightOn ? 'bg-accent-orange/20 border-accent-orange text-accent-orange' : ''}
                      >
                        <Flashlight className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                )}

                {isScanning && (
                  <div className="text-center">
                    <motion.div
                      animate={{ 
                        scale: [1, 1.1, 1],
                        borderColor: ['rgb(59, 130, 246)', 'rgb(16, 185, 129)', 'rgb(59, 130, 246)']
                      }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="w-48 h-48 mx-auto mb-4 bg-surface-elevated border-4 border-primary rounded-xl flex items-center justify-center relative overflow-hidden"
                    >
                      <QrCode className="w-16 h-16 text-primary" />
                      
                      {/* Scanning line animation */}
                      <motion.div
                        animate={{ y: [-100, 100] }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                        className="absolute w-full h-1 bg-primary/50"
                      />
                    </motion.div>
                    
                    <p className="text-primary font-medium mb-2">Scanning QR code...</p>
                    <p className="text-foreground-muted text-sm">Hold steady and ensure good lighting</p>
                  </div>
                )}

                {scannedPortId && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center"
                  >
                    <div className="w-16 h-16 mx-auto mb-4 bg-accent-green/20 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-8 h-8 text-accent-green" />
                    </div>
                    <h4 className="font-semibold text-foreground mb-2">Port Connected!</h4>
                    <p className="text-foreground-muted mb-1">Port ID: {scannedPortId}</p>
                    <p className="text-accent-green text-sm">Ready to configure charging</p>
                  </motion.div>
                )}

                {scanError && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 p-3 bg-accent-red/20 border border-accent-red/30 rounded-lg"
                  >
                    <div className="flex items-center space-x-2">
                      <AlertTriangle className="w-4 h-4 text-accent-red flex-shrink-0" />
                      <p className="text-accent-red text-sm">{scanError}</p>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}

          {/* Manual Entry */}
          {inputMethod === 'manual' && (
            <motion.div
              key="manual-entry"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="mb-6"
            >
              <div className="bg-surface-card border border-border rounded-xl p-6">
                <div className="text-center mb-4">
                  <div className="w-16 h-16 mx-auto mb-3 bg-surface-elevated rounded-full flex items-center justify-center">
                    <Keyboard className="w-8 h-8 text-primary" />
                  </div>
                  <h4 className="font-semibold mb-2">Enter Port ID</h4>
                  <p className="text-foreground-muted text-sm">
                    Find the port ID printed on the charging connector
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground-muted mb-2">
                      Port ID
                    </label>
                    <input
                      type="text"
                      value={manualPortId}
                      onChange={(e) => setManualPortId(e.target.value.toUpperCase())}
                      placeholder="e.g., PORT-5, CHG-A3"
                      className="w-full h-12 px-4 bg-surface-elevated border border-border rounded-xl text-foreground placeholder-foreground-subtle focus:outline-none focus:border-primary transition-colors"
                      maxLength={10}
                    />
                  </div>

                  {manualPortId.length >= 4 && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center space-x-2 text-accent-green text-sm"
                    >
                      <CheckCircle className="w-4 h-4" />
                      <span>Valid port ID format</span>
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Payment Method Selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-6"
        >
          <h3 className="font-semibold mb-4">Payment Method</h3>
          
          <div className="space-y-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setPaymentMethod('wallet')}
              className={`w-full p-4 rounded-xl border transition-all ${
                paymentMethod === 'wallet'
                  ? 'border-primary bg-primary/10'
                  : 'border-border bg-surface-card hover:bg-surface-elevated'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    paymentMethod === 'wallet' ? 'bg-primary/20' : 'bg-surface-elevated'
                  }`}>
                    <Wallet className={`w-5 h-5 ${
                      paymentMethod === 'wallet' ? 'text-primary' : 'text-foreground-subtle'
                    }`} />
                  </div>
                  <div className="text-left">
                    <div className="font-medium text-foreground">Wallet Balance</div>
                    <div className="text-foreground-muted text-sm">Fast & secure</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`font-semibold ${
                    walletBalance >= mockStation.estimatedCost ? 'text-accent-green' : 'text-accent-red'
                  }`}>
                    ₹{walletBalance}
                  </div>
                  {walletBalance < mockStation.estimatedCost && (
                    <div className="text-accent-red text-xs">Insufficient funds</div>
                  )}
                </div>
              </div>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setPaymentMethod('card')}
              className={`w-full p-4 rounded-xl border transition-all ${
                paymentMethod === 'card'
                  ? 'border-primary bg-primary/10'
                  : 'border-border bg-surface-card hover:bg-surface-elevated'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  paymentMethod === 'card' ? 'bg-primary/20' : 'bg-surface-elevated'
                }`}>
                  <CreditCard className={`w-5 h-5 ${
                    paymentMethod === 'card' ? 'text-primary' : 'text-foreground-subtle'
                  }`} />
                </div>
                <div className="text-left">
                  <div className="font-medium text-foreground">Credit/Debit Card</div>
                  <div className="text-foreground-muted text-sm">Pay directly</div>
                </div>
              </div>
            </motion.button>
          </div>
        </motion.div>

        {/* Continue Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Button
            onClick={handleContinue}
            disabled={!isPortValid || hasInsufficientFunds}
            className="w-full h-14 bg-primary hover:bg-primary-dark text-primary-foreground font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Zap className="w-5 h-5 mr-2" />
            Continue to Configuration
          </Button>

          {hasInsufficientFunds && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 p-3 bg-accent-red/20 border border-accent-red/30 rounded-lg"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="w-4 h-4 text-accent-red flex-shrink-0" />
                  <span className="text-accent-red text-sm">Insufficient wallet balance</span>
                </div>
                <Button variant="outline" size="sm" className="border-accent-red text-accent-red hover:bg-accent-red/10">
                  Add Money
                </Button>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Help Instructions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-8 bg-surface-elevated border border-border rounded-xl p-4"
        >
          <h4 className="font-semibold mb-3 flex items-center">
            <Battery className="w-5 h-5 mr-2 text-primary" />
            Connection Guide
          </h4>
          <div className="space-y-2 text-sm text-foreground-muted">
            <div className="flex items-center space-x-2">
              <span className="w-5 h-5 bg-primary/20 rounded-full flex items-center justify-center text-primary font-bold text-xs">1</span>
              <span>Park your vehicle near the charging port</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-5 h-5 bg-primary/20 rounded-full flex items-center justify-center text-primary font-bold text-xs">2</span>
              <span>Scan the QR code or enter the port ID</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-5 h-5 bg-primary/20 rounded-full flex items-center justify-center text-primary font-bold text-xs">3</span>
              <span>Connect the charging cable to your vehicle</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}