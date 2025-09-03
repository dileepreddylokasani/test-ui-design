import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bookmark, Star, MapPin, Search, Heart, Navigation, SortAsc, Zap, Timer, DollarSign } from 'lucide-react';
import { ChargingStationCard } from '../ChargingStationCard';
import { Button } from '../ui/button';
import { ImageWithFallback } from '../figma/ImageWithFallback';

const mockStations = [
  {
    id: '1',
    name: 'Tesla Supercharger',
    address: 'MG Road, Bangalore',
    distance: 0.5,
    availableSlots: 8,
    totalSlots: 12,
    pricePerUnit: 18,
    rating: 4.8,
    chargingSpeed: '250kW',
    isOpen: true,
    estimatedTime: '25min',
    image: 'https://images.unsplash.com/photo-1694266475815-19ded81303fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZXNsYSUyMHN1cGVyY2hhcmdlciUyMHN0YXRpb258ZW58MXx8fHwxNzU2ODEwMjA2fDA&ixlib=rb-4.1.0&q=80&w=1080',
    lastVisited: '2 days ago',
    totalVisits: 12,
    operator: 'Tesla Motors',
    amenities: ['WiFi', 'Restroom', 'Cafe']
  },
  {
    id: '2',
    name: 'Ather Grid Station',
    address: 'Indiranagar, Bangalore',
    distance: 1.2,
    availableSlots: 3,
    totalSlots: 6,
    pricePerUnit: 15,
    rating: 4.5,
    chargingSpeed: '22kW',
    isOpen: true,
    estimatedTime: '45min',
    image: 'https://images.unsplash.com/photo-1751355356724-7df0dda28b2b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJpYyUyMHZlaGljbGUlMjBjaGFyZ2luZyUyMHN0YXRpb24lMjBtb2Rlcm58ZW58MXx8fHwxNzU2ODgzNDE2fDA&ixlib=rb-4.1.0&q=80&w=1080',
    lastVisited: '1 week ago',
    totalVisits: 8,
    operator: 'Ather Energy',
    amenities: ['WiFi', 'Parking']
  },
  {
    id: '4',
    name: 'Shell Recharge Hub',
    address: 'HSR Layout, Bangalore',
    distance: 3.5,
    availableSlots: 2,
    totalSlots: 8,
    pricePerUnit: 17,
    rating: 4.0,
    chargingSpeed: '150kW',
    isOpen: true,
    estimatedTime: '30min',
    image: 'https://images.unsplash.com/photo-1680079271723-8cae84e712a5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBjaGFyZ2luZyUyMHN0YXRpb24lMjBlbGVjdHJpYyUyMGNhcnxlbnwxfHx8fDE3NTY5MTQ4ODZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    lastVisited: '3 days ago',
    totalVisits: 15,
    operator: 'Shell India',
    amenities: ['Restroom', 'Convenience Store', 'ATM']
  },
];

interface BookmarksScreenProps {
  onBookmarkStation: (stationId: string) => void;
  bookmarkedStations: string[];
  onNavigateToStation: (stationId: string) => void;
}

export function BookmarksScreen({ onBookmarkStation, bookmarkedStations, onNavigateToStation }: BookmarksScreenProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'recent' | 'distance' | 'rating' | 'visits'>('recent');
  
  const bookmarkedStationData = mockStations.filter(station => 
    bookmarkedStations.includes(station.id)
  );

  const filteredStations = bookmarkedStationData
    .filter(station => 
      station.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      station.address.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'distance':
          return a.distance - b.distance;
        case 'rating':
          return b.rating - a.rating;
        case 'visits':
          return b.totalVisits - a.totalVisits;
        default:
          return 0; // Keep original order for 'recent'
      }
    });

  const totalVisits = bookmarkedStationData.reduce((sum, station) => sum + station.totalVisits, 0);
  const avgRating = bookmarkedStationData.length > 0 
    ? bookmarkedStationData.reduce((sum, station) => sum + station.rating, 0) / bookmarkedStationData.length
    : 0;

  const getAvailabilityColor = (available: number, total: number) => {
    const ratio = available / total;
    if (ratio > 0.6) return 'text-accent-green';
    if (ratio > 0.3) return 'text-accent-orange';
    return 'text-accent-red';
  };

  const getAvailabilityBgColor = (available: number, total: number) => {
    const ratio = available / total;
    if (ratio > 0.6) return 'bg-accent-green/10';
    if (ratio > 0.3) return 'bg-accent-orange/10';
    return 'bg-accent-red/10';
  };

  return (
    <div className="min-h-screen bg-background text-foreground pb-20">
      {/* Header */}
      <div className="pt-12 pb-4 px-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-6"
        >
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center">
              <Bookmark className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-title-large mb-1">Saved Stations</h1>
              <p className="text-muted text-body-small">Your favorite charging locations</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" className="text-primary">
            <Navigation className="w-4 h-4 mr-2" />
            Route
          </Button>
        </motion.div>

        {bookmarkedStationData.length > 0 ? (
          <>
            {/* Stats Cards - Pinterest Style */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="grid grid-cols-3 gap-4 mb-6"
            >
              <div className="card-stats">
                <div className="w-10 h-10 mx-auto mb-2 bg-primary/20 rounded-xl flex items-center justify-center">
                  <Heart className="w-5 h-5 text-primary" />
                </div>
                <div className="text-title-small font-semibold text-foreground">{bookmarkedStationData.length}</div>
                <div className="text-caption text-muted">Saved</div>
              </div>
              
              <div className="card-stats">
                <div className="w-10 h-10 mx-auto mb-2 bg-accent-blue/20 rounded-xl flex items-center justify-center">
                  <Navigation className="w-5 h-5 text-accent-blue" />
                </div>
                <div className="text-title-small font-semibold text-foreground">{totalVisits}</div>
                <div className="text-caption text-muted">Visits</div>
              </div>
              
              <div className="card-stats">
                <div className="w-10 h-10 mx-auto mb-2 bg-accent-orange/20 rounded-xl flex items-center justify-center">
                  <Star className="w-5 h-5 text-accent-orange" />
                </div>
                <div className="text-title-small font-semibold text-foreground">{avgRating.toFixed(1)}</div>
                <div className="text-caption text-muted">Rating</div>
              </div>
            </motion.div>

            {/* Search and Sort */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-6"
            >
              <div className="flex space-x-3 mb-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted" />
                  <input
                    type="text"
                    placeholder="Search saved stations..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full h-12 pl-12 pr-4 card-modern border-border rounded-xl text-foreground placeholder-muted focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
                <Button variant="ghost" size="sm" className="h-12 px-4 text-muted">
                  <SortAsc className="w-4 h-4" />
                </Button>
              </div>

              {/* Sort Options */}
              <div className="flex space-x-2 overflow-x-auto hide-scrollbar pb-2">
                {[
                  { value: 'recent', label: 'Recent' },
                  { value: 'distance', label: 'Distance' },
                  { value: 'rating', label: 'Rating' },
                  { value: 'visits', label: 'Visits' },
                ].map((option) => (
                  <motion.button
                    key={option.value}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSortBy(option.value as any)}
                    className={`px-4 py-2 rounded-lg text-body-small font-medium transition-all whitespace-nowrap ${
                      sortBy === option.value
                        ? 'bg-primary text-white'
                        : 'card-modern text-muted hover:bg-surface-elevated'
                    }`}
                  >
                    {option.label}
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Stations List - Google Play Style Cards */}
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-title font-semibold text-foreground">Your Stations</h3>
                <span className="text-body-small text-muted">{filteredStations.length} station{filteredStations.length !== 1 ? 's' : ''}</span>
              </div>

              <AnimatePresence mode="wait">
                {filteredStations.length > 0 ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-4"
                  >
                    {filteredStations.map((station, index) => (
                      <motion.div
                        key={station.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="card-modern overflow-hidden group cursor-pointer"
                        onClick={() => onNavigateToStation(station.id)}
                      >
                        {/* Station Image */}
                        <div className="relative h-48 overflow-hidden">
                          <ImageWithFallback
                            src={station.image}
                            alt={station.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute top-4 right-4">
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={(e) => {
                                e.stopPropagation();
                                onBookmarkStation(station.id);
                              }}
                              className="w-10 h-10 bg-surface-card/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md"
                            >
                              <Bookmark className="w-5 h-5 text-primary fill-primary" />
                            </motion.button>
                          </div>
                          <div className="absolute bottom-4 left-4">
                            <div className="flex items-center space-x-2">
                              <div className={`px-2 py-1 rounded-lg text-caption font-medium ${getAvailabilityBgColor(station.availableSlots, station.totalSlots)} ${getAvailabilityColor(station.availableSlots, station.totalSlots)}`}>
                                {station.availableSlots}/{station.totalSlots} Available
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Station Info */}
                        <div className="p-4">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex-1">
                              <h3 className="text-title font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                                {station.name}
                              </h3>
                              <div className="flex items-center text-muted text-body-small mb-2">
                                <MapPin className="w-3 h-3 mr-1" />
                                <span>{station.address}</span>
                              </div>
                              <p className="text-body-small text-muted">{station.operator}</p>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Star className="w-4 h-4 text-accent-orange fill-accent-orange" />
                              <span className="text-body-small font-medium">{station.rating}</span>
                            </div>
                          </div>

                          {/* Station Stats */}
                          <div className="grid grid-cols-3 gap-4 mb-4">
                            <div className="text-center">
                              <div className="flex items-center justify-center mb-1">
                                <Zap className="w-4 h-4 text-accent-blue mr-1" />
                                <span className="text-body-small font-medium">{station.chargingSpeed}</span>
                              </div>
                              <span className="text-caption text-muted">Power</span>
                            </div>
                            <div className="text-center">
                              <div className="flex items-center justify-center mb-1">
                                <Timer className="w-4 h-4 text-accent-green mr-1" />
                                <span className="text-body-small font-medium">{station.estimatedTime}</span>
                              </div>
                              <span className="text-caption text-muted">Time</span>
                            </div>
                            <div className="text-center">
                              <div className="flex items-center justify-center mb-1">
                                <DollarSign className="w-4 h-4 text-accent-orange mr-1" />
                                <span className="text-body-small font-medium">₹{station.pricePerUnit}</span>
                              </div>
                              <span className="text-caption text-muted">Per kWh</span>
                            </div>
                          </div>

                          {/* Visit Info */}
                          <div className="flex justify-between items-center text-caption text-muted">
                            <span>Last visited: {station.lastVisited}</span>
                            <span>{station.totalVisits} visits</span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8"
                  >
                    <Search className="w-12 h-12 text-muted mx-auto mb-3" />
                    <h3 className="text-title font-semibold text-foreground mb-1">No stations found</h3>
                    <p className="text-muted text-body-small">Try adjusting your search terms</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </>
        ) : (
          /* Enhanced Empty State */
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="text-center py-16"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-24 h-24 mx-auto mb-8 card-modern rounded-2xl flex items-center justify-center"
            >
              <Bookmark className="w-12 h-12 text-muted" />
            </motion.div>
            <h3 className="text-headline font-semibold text-foreground mb-3">No Bookmarks Yet</h3>
            <p className="text-muted text-body max-w-md mx-auto mb-8">
              Save your favorite charging stations to access them quickly
            </p>
            
            <div className="card-modern p-6 max-w-sm mx-auto">
              <h4 className="font-semibold text-foreground mb-4">How to bookmark stations:</h4>
              <div className="space-y-3 text-body-small text-muted text-left">
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-primary font-bold text-caption">1</span>
                  </div>
                  <span>Find a charging station you like</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-primary font-bold text-caption">2</span>
                  </div>
                  <span>Tap the bookmark icon</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-primary font-bold text-caption">3</span>
                  </div>
                  <span>Access it anytime from here</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}