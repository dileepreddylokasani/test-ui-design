import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  ArrowLeft, Navigation, MapPin, Clock, TrendingUp, Phone, 
  AlertTriangle, Zap, ArrowRight, RotateCcw, Volume2, VolumeX
} from 'lucide-react';
import { Button } from '../ui/button';

interface NavigationScreenProps {
  stationId: string;
  onBack: () => void;
  onArrived: () => void;
}

export function NavigationScreen({ stationId, onBack, onArrived }: NavigationScreenProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [eta, setEta] = useState('12 min');
  const [distance, setDistance] = useState('2.3 km');
  const [isMuted, setIsMuted] = useState(false);
  const [isRouteLoading, setIsRouteLoading] = useState(false);

  // Mock navigation data
  const mockRoute = {
    steps: [
      { instruction: 'Head northeast on MG Road', distance: '500 m', icon: ArrowRight },
      { instruction: 'Turn right onto Brigade Road', distance: '1.2 km', icon: ArrowRight },
      { instruction: 'Turn left onto Commercial Street', distance: '400 m', icon: ArrowRight },
      { instruction: 'Your destination Tesla Supercharger will be on the right', distance: '200 m', icon: MapPin }
    ],
    trafficCondition: 'moderate', // light, moderate, heavy
    hasAlternateRoute: true
  };

  useEffect(() => {
    // Simulate real-time navigation updates
    const interval = setInterval(() => {
      const etaMinutes = parseInt(eta.split(' ')[0]);
      if (etaMinutes > 1) {
        setEta(`${etaMinutes - 1} min`);
      } else if (etaMinutes === 1) {
        setEta('Arriving');
      }
    }, 10000); // Update every 10 seconds for demo

    return () => clearInterval(interval);
  }, [eta]);

  const getTrafficColor = (condition: string) => {
    switch (condition) {
      case 'light': return 'text-accent-green';
      case 'moderate': return 'text-accent-orange';
      case 'heavy': return 'text-accent-red';
      default: return 'text-foreground-subtle';
    }
  };

  const handleRecalculate = () => {
    setIsRouteLoading(true);
    setTimeout(() => {
      setIsRouteLoading(false);
      setEta('10 min');
      setDistance('2.1 km');
    }, 2000);
  };

  const handleExternalMap = () => {
    // In a real app, this would open external navigation apps
    const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=12.9716,77.5946`;
    window.open(googleMapsUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="relative">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between p-4 pt-12 bg-surface-card border-b border-border"
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
          
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMuted(!isMuted)}
              className="text-foreground-muted hover:text-foreground"
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={handleExternalMap}
              className="text-foreground-muted hover:text-foreground"
            >
              <Navigation className="w-4 h-4" />
            </Button>
          </div>
        </motion.div>

        {/* Navigation Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="p-6 bg-surface-card"
        >
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold mb-2">Tesla Supercharger</h1>
            <p className="text-foreground-muted flex items-center justify-center">
              <MapPin className="w-4 h-4 mr-1" />
              MG Road, Bangalore
            </p>
          </div>

          {/* ETA Display */}
          <div className="flex items-center justify-center space-x-6 mb-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">{eta}</div>
              <div className="text-foreground-subtle text-sm">ETA</div>
            </div>
            
            <div className="w-px h-12 bg-border"></div>
            
            <div className="text-center">
              <div className="text-3xl font-bold text-foreground">{distance}</div>
              <div className="text-foreground-subtle text-sm">Distance</div>
            </div>
          </div>

          {/* Traffic Status */}
          <div className="flex items-center justify-center space-x-2 mb-4">
            <TrendingUp className={`w-4 h-4 ${getTrafficColor(mockRoute.trafficCondition)}`} />
            <span className={`text-sm font-medium ${getTrafficColor(mockRoute.trafficCondition)}`}>
              {mockRoute.trafficCondition.charAt(0).toUpperCase() + mockRoute.trafficCondition.slice(1)} traffic
            </span>
          </div>

          {/* Route Actions */}
          <div className="flex space-x-3">
            <Button
              variant="outline"
              onClick={handleRecalculate}
              disabled={isRouteLoading}
              className="flex-1 flex items-center justify-center space-x-2"
            >
              {isRouteLoading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                >
                  <RotateCcw className="w-4 h-4" />
                </motion.div>
              ) : (
                <RotateCcw className="w-4 h-4" />
              )}
              <span>Recalculate</span>
            </Button>
            
            <Button
              onClick={onArrived}
              className="flex-1 bg-primary hover:bg-primary-dark text-primary-foreground"
            >
              I've Arrived
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Map Placeholder */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="h-64 m-6 bg-surface-elevated border border-border rounded-xl relative overflow-hidden"
      >
        {/* Map Simulation */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent-blue/20">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <Navigation className="w-12 h-12 text-primary mx-auto mb-2" />
              <p className="text-foreground-muted text-sm">Interactive Map</p>
              <p className="text-foreground-subtle text-xs">Turn-by-turn navigation</p>
            </div>
          </div>
          
          {/* Route Line Simulation */}
          <motion.div
            animate={{
              x: [0, 100, 200, 150, 50],
              y: [0, -50, -20, -80, -100]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: 'linear'
            }}
            className="absolute top-1/2 left-4 w-2 h-2 bg-primary rounded-full"
          />
        </div>

        {/* Current Location Indicator */}
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-4 left-4 w-4 h-4 bg-accent-blue rounded-full border-2 border-white shadow-lg"
        />

        {/* Destination Indicator */}
        <div className="absolute top-4 right-4 w-6 h-6 bg-accent-green rounded-full border-2 border-white shadow-lg flex items-center justify-center">
          <Zap className="w-3 h-3 text-white" />
        </div>
      </motion.div>

      {/* Turn-by-Turn Directions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="px-6 pb-6"
      >
        <h3 className="font-semibold mb-4 flex items-center">
          <Navigation className="w-5 h-5 mr-2 text-primary" />
          Directions
        </h3>
        
        <div className="space-y-3">
          {mockRoute.steps.map((step, index) => {
            const StepIcon = step.icon;
            const isCurrentStep = index === currentStep;
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + (index * 0.1) }}
                className={`flex items-center space-x-3 p-3 rounded-xl border transition-all ${
                  isCurrentStep 
                    ? 'bg-primary/10 border-primary/30' 
                    : 'bg-surface-card border-border'
                }`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  isCurrentStep ? 'bg-primary text-primary-foreground' : 'bg-surface-elevated text-foreground-subtle'
                }`}>
                  <StepIcon className="w-4 h-4" />
                </div>
                
                <div className="flex-1">
                  <p className={`font-medium ${isCurrentStep ? 'text-foreground' : 'text-foreground-muted'}`}>
                    {step.instruction}
                  </p>
                  <p className="text-foreground-subtle text-sm">{step.distance}</p>
                </div>
                
                {isCurrentStep && (
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="w-2 h-2 bg-primary rounded-full"
                  />
                )}
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Route Unavailable Error */}
      {isRouteLoading && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-4 left-4 right-4 bg-surface-card border border-border rounded-xl p-4 shadow-xl"
        >
          <div className="flex items-center space-x-3">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full"
            />
            <div>
              <p className="font-medium text-foreground">Recalculating route...</p>
              <p className="text-foreground-muted text-sm">Finding the best path</p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Emergency Contact */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="fixed bottom-4 right-4"
      >
        <Button
          variant="outline"
          size="sm"
          className="w-12 h-12 rounded-full bg-surface-card border-border hover:bg-surface-elevated"
        >
          <Phone className="w-4 h-4" />
        </Button>
      </motion.div>

      {/* GPS Signal Lost Warning */}
      {false && ( // Simulated condition
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed top-20 left-4 right-4 bg-accent-orange/20 border border-accent-orange/30 rounded-xl p-3 backdrop-blur-sm"
        >
          <div className="flex items-center space-x-2">
            <AlertTriangle className="w-4 h-4 text-accent-orange flex-shrink-0" />
            <p className="text-accent-orange text-sm font-medium">GPS signal lost</p>
          </div>
        </motion.div>
      )}
    </div>
  );
}