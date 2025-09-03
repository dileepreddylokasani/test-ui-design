import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  ArrowLeft, Navigation, Bookmark, Star, MapPin, Clock, Zap, 
  Car, Wifi, Coffee, ShoppingCart, Car as CarIcon, Battery,
  AlertTriangle, CheckCircle, Users, Phone, Shield
} from 'lucide-react';
import { Button } from '../ui/button';
import { ImageWithFallback } from '../figma/ImageWithFallback';

const mockStationData = {
  '1': {
    id: '1',
    name: 'Tesla Supercharger',
    address: 'MG Road, Bangalore, Karnataka 560001',
    distance: 0.5,
    availableSlots: 8,
    totalSlots: 12,
    pricePerUnit: 18,
    rating: 4.8,
    reviewCount: 156,
    chargingSpeed: '250kW',
    isOpen: true,
    openingHours: '24/7',
    estimatedTime: '25min',
    image: 'https://images.unsplash.com/photo-1672542128826-5f0d578713d2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJpYyUyMHZlaGljbGUlMjBjaGFyZ2luZyUyMHN0YXRpb258ZW58MXx8fHwxNzU2NjI1ODM2fDA&ixlib=rb-4.1.0&q=80&w=1080',
    connectorTypes: ['CCS2', 'CHAdeMO', 'Type 2'],
    amenities: ['WiFi', 'Cafe', 'Restroom', 'Shopping'],
    operator: 'Tesla',
    phone: '+91 80 1234 5678',
    coordinates: { lat: 12.9716, lng: 77.5946 },
    status: 'operational', // offline, maintenance, operational
    reviews: [
      { id: 1, user: 'Arjun K.', rating: 5, comment: 'Super fast charging! Clean facility with good amenities.', date: '2 days ago' },
      { id: 2, user: 'Priya S.', rating: 4, comment: 'Great location, but can get crowded during peak hours.', date: '1 week ago' },
      { id: 3, user: 'Raj M.', rating: 5, comment: 'Reliable and fast. Love the cafe next door!', date: '2 weeks ago' }
    ]
  }
};

interface ChargerDetailsScreenProps {
  stationId: string;
  onBack: () => void;
  onNavigate: (stationId: string) => void;
  onStartCharging: (stationId: string) => void;
  onBookmark: (stationId: string) => void;
  isBookmarked: boolean;
}

export function ChargerDetailsScreen({ 
  stationId, 
  onBack, 
  onNavigate, 
  onStartCharging, 
  onBookmark, 
  isBookmarked 
}: ChargerDetailsScreenProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'reviews' | 'amenities'>('overview');
  const station = mockStationData[stationId as keyof typeof mockStationData] || mockStationData['1'];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'operational': return 'text-accent-green';
      case 'offline': return 'text-accent-red';
      case 'maintenance': return 'text-accent-orange';
      default: return 'text-foreground-subtle';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'operational': return CheckCircle;
      case 'offline': return AlertTriangle;
      case 'maintenance': return AlertTriangle;
      default: return Clock;
    }
  };

  const amenityIcons = {
    'WiFi': Wifi,
    'Cafe': Coffee,
    'Restroom': Users,
    'Shopping': ShoppingCart
  };

  const StatusIcon = getStatusIcon(station.status);

  return (
    <div className="min-h-screen bg-background text-foreground pb-20">
      {/* Header */}
      <div className="relative">
        {/* Station Image */}
        <div className="h-64 relative overflow-hidden">
          <ImageWithFallback
            src={station.image}
            alt={station.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          
          {/* Back Button */}
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={onBack}
            className="absolute top-12 left-4 w-10 h-10 bg-surface-card/90 backdrop-blur-sm border border-glass-border rounded-full flex items-center justify-center"
          >
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </motion.button>

          {/* Bookmark Button */}
          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => onBookmark(station.id)}
            className="absolute top-12 right-4 w-10 h-10 bg-surface-card/90 backdrop-blur-sm border border-glass-border rounded-full flex items-center justify-center"
          >
            <Bookmark className={`w-5 h-5 ${isBookmarked ? 'text-primary fill-current' : 'text-foreground'}`} />
          </motion.button>

          {/* Station Status Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="absolute bottom-4 left-4 flex items-center space-x-2 bg-surface-card/90 backdrop-blur-sm border border-glass-border rounded-lg px-3 py-2"
          >
            <StatusIcon className={`w-4 h-4 ${getStatusColor(station.status)}`} />
            <span className="text-sm font-medium text-foreground capitalize">{station.status}</span>
          </motion.div>
        </div>

        {/* Station Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="p-6 bg-surface-card border-t border-border"
        >
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h1 className="text-2xl font-bold mb-1">{station.name}</h1>
              <p className="text-foreground-muted text-sm flex items-center">
                <MapPin className="w-4 h-4 mr-1" />
                {station.address}
              </p>
            </div>
            <div className="text-right">
              <div className="flex items-center space-x-1 mb-1">
                <Star className="w-4 h-4 text-accent-orange fill-current" />
                <span className="font-semibold">{station.rating}</span>
                <span className="text-foreground-subtle text-sm">({station.reviewCount})</span>
              </div>
              <p className="text-foreground-muted text-sm">{station.distance} km away</p>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="text-center p-3 bg-surface-elevated rounded-lg">
              <div className="text-xl font-bold text-accent-green">{station.availableSlots}</div>
              <div className="text-xs text-foreground-subtle">Available</div>
            </div>
            <div className="text-center p-3 bg-surface-elevated rounded-lg">
              <div className="text-xl font-bold text-primary">₹{station.pricePerUnit}</div>
              <div className="text-xs text-foreground-subtle">per kWh</div>
            </div>
            <div className="text-center p-3 bg-surface-elevated rounded-lg">
              <div className="text-xl font-bold text-accent-blue">{station.chargingSpeed}</div>
              <div className="text-xs text-foreground-subtle">Max Speed</div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3">
            <Button
              onClick={() => onNavigate(station.id)}
              variant="outline"
              className="flex-1 h-12 flex items-center justify-center space-x-2"
            >
              <Navigation className="w-4 h-4" />
              <span>Navigate</span>
            </Button>
            <Button
              onClick={() => onStartCharging(station.id)}
              disabled={station.status !== 'operational' || station.availableSlots === 0}
              className="flex-1 h-12 flex items-center justify-center space-x-2 bg-primary hover:bg-primary-dark text-primary-foreground"
            >
              <Zap className="w-4 h-4" />
              <span>Start Charging</span>
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="px-6 mb-6"
      >
        <div className="flex space-x-1 bg-surface-elevated rounded-lg p-1">
          {['overview', 'reviews', 'amenities'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                activeTab === tab
                  ? 'bg-surface-card text-foreground shadow-sm'
                  : 'text-foreground-muted hover:text-foreground'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Tab Content */}
      <div className="px-6">
        {activeTab === 'overview' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Operating Hours */}
            <div className="bg-surface-card border border-border rounded-xl p-4">
              <h3 className="font-semibold mb-3 flex items-center">
                <Clock className="w-5 h-5 mr-2 text-primary" />
                Operating Hours
              </h3>
              <p className="text-foreground-muted">{station.openingHours}</p>
            </div>

            {/* Connector Types */}
            <div className="bg-surface-card border border-border rounded-xl p-4">
              <h3 className="font-semibold mb-3 flex items-center">
                <CarIcon className="w-5 h-5 mr-2 text-primary" />
                Connector Types
              </h3>
              <div className="flex flex-wrap gap-2">
                {station.connectorTypes.map((type) => (
                  <span
                    key={type}
                    className="px-3 py-1 bg-surface-elevated border border-border rounded-lg text-sm font-medium"
                  >
                    {type}
                  </span>
                ))}
              </div>
            </div>

            {/* Contact Info */}
            <div className="bg-surface-card border border-border rounded-xl p-4">
              <h3 className="font-semibold mb-3 flex items-center">
                <Phone className="w-5 h-5 mr-2 text-primary" />
                Contact Information
              </h3>
              <div className="space-y-2">
                <p className="text-foreground-muted">Operator: {station.operator}</p>
                <p className="text-foreground-muted">Phone: {station.phone}</p>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'reviews' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            {station.reviews.length > 0 ? (
              station.reviews.map((review, index) => (
                <motion.div
                  key={review.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-surface-card border border-border rounded-xl p-4"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-medium">{review.user}</h4>
                      <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3 h-3 ${
                              i < review.rating ? 'text-accent-orange fill-current' : 'text-foreground-subtle'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <span className="text-foreground-subtle text-xs">{review.date}</span>
                  </div>
                  <p className="text-foreground-muted text-sm">{review.comment}</p>
                </motion.div>
              ))
            ) : (
              <div className="text-center py-8">
                <Star className="w-12 h-12 text-foreground-subtle mx-auto mb-3" />
                <h3 className="font-semibold text-foreground mb-1">No Reviews Yet</h3>
                <p className="text-foreground-muted text-sm">Be the first to leave a review!</p>
              </div>
            )}
          </motion.div>
        )}

        {activeTab === 'amenities' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-2 gap-4"
          >
            {station.amenities.map((amenity, index) => {
              const IconComponent = amenityIcons[amenity as keyof typeof amenityIcons];
              return (
                <motion.div
                  key={amenity}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-surface-card border border-border rounded-xl p-4 text-center"
                >
                  {IconComponent && <IconComponent className="w-8 h-8 text-primary mx-auto mb-2" />}
                  <p className="font-medium">{amenity}</p>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </div>

      {/* Station Offline Banner */}
      {station.status === 'offline' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-20 left-4 right-4 bg-accent-red/20 border border-accent-red/30 rounded-xl p-4 backdrop-blur-sm"
        >
          <div className="flex items-center space-x-3">
            <AlertTriangle className="w-5 h-5 text-accent-red flex-shrink-0" />
            <div>
              <p className="font-medium text-accent-red">Station Offline</p>
              <p className="text-accent-red/80 text-sm">This station is currently offline. Please choose another location.</p>
            </div>
          </div>
        </motion.div>
      )}

      {/* All Ports Busy Banner */}
      {station.availableSlots === 0 && station.status === 'operational' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-20 left-4 right-4 bg-accent-orange/20 border border-accent-orange/30 rounded-xl p-4 backdrop-blur-sm"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Clock className="w-5 h-5 text-accent-orange flex-shrink-0" />
              <div>
                <p className="font-medium text-accent-orange">All Ports Busy</p>
                <p className="text-accent-orange/80 text-sm">Estimated wait time: 15-20 minutes</p>
              </div>
            </div>
            <Button variant="outline" size="sm" className="border-accent-orange text-accent-orange hover:bg-accent-orange/10">
              Notify Me
            </Button>
          </div>
        </motion.div>
      )}
    </div>
  );
}