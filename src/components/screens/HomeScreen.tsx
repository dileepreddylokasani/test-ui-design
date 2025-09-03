import { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { 
  Zap, 
  MapPin, 
  Filter, 
  Bookmark, 
  QrCode, 
  LocateFixed,
  Clock,
  Banknote
} from 'lucide-react';
import { FilterChip } from '../ui/filter-chip';
import { FloatingActionButton } from '../ui/floating-action-button';
import { StationCard } from '../ui/station-card';

// Mock station data matching the prompt requirements
const mockStations = [
  {
    id: '1',
    name: 'Tesla Supercharger',
    address: 'MG Road, Bangalore',
    operator: 'Tesla Motors',
    rating: 4.8,
    distance: '1.2 km',
    eta: '5 mins',
    available: 3,
    total: 8,
    power: '60 kW',
    price: '₹18.50',
  },
  {
    id: '2',
    name: 'Ather Grid Station',
    address: 'Indiranagar, Bangalore',
    operator: 'Ather Energy',
    rating: 4.5,
    distance: '2.1 km',
    eta: '8 mins',
    available: 1,
    total: 4,
    power: '22 kW',
    price: '₹15.00',
  },
  {
    id: '3',
    name: 'BPCL FastCharge',
    address: 'Koramangala, Bangalore',
    operator: 'BPCL',
    rating: 4.2,
    distance: '3.5 km',
    eta: '12 mins',
    available: 0,
    total: 6,
    power: '50 kW',
    price: '₹16.75',
  },
  {
    id: '4',
    name: 'Shell Recharge Hub',
    address: 'HSR Layout, Bangalore',
    operator: 'Shell India',
    rating: 4.6,
    distance: '4.2 km',
    eta: '15 mins',
    available: 5,
    total: 8,
    power: '150 kW',
    price: '₹20.00',
  },
];

const filterOptions = [
  { id: 'fast', label: 'Fast', icon: <Zap className="w-4 h-4" />, active: true },
  { id: 'free', label: 'Free', icon: <Banknote className="w-4 h-4" /> },
  { id: 'available', label: 'Available', icon: <div className="w-2 h-2 bg-success rounded-full" /> },
  { id: 'open24', label: 'Open 24/7', icon: <Clock className="w-4 h-4" /> },
  { id: 'nearby', label: 'Nearby', icon: <MapPin className="w-4 h-4" /> },
];

interface HomeScreenProps {
  onBookmarkStation: (stationId: string) => void;
  bookmarkedStations: string[];
  onNavigateToStation: (stationId: string) => void;
}

export function HomeScreen({ 
  onBookmarkStation, 
  bookmarkedStations, 
  onNavigateToStation 
}: HomeScreenProps) {
  const [activeFilters, setActiveFilters] = useState<string[]>(['fast']);
  const [currentStationIndex, setCurrentStationIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const toggleFilter = (filterId: string) => {
    setActiveFilters(prev => 
      prev.includes(filterId) 
        ? prev.filter(id => id !== filterId)
        : [...prev, filterId]
    );
  };

  const handleStationScroll = () => {
    if (scrollRef.current) {
      const scrollLeft = scrollRef.current.scrollLeft;
      const cardWidth = scrollRef.current.clientWidth * 0.95; // 95% width cards
      const newIndex = Math.round(scrollLeft / cardWidth);
      setCurrentStationIndex(newIndex);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Dynamic Island Simulation */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-50">
        <div className="w-30 h-9 bg-black rounded-full" />
      </div>

      {/* Map Background with Pattern */}
      <div className="absolute inset-0 map-pattern">
        {/* Central Map Pin */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="relative"
          >
            <MapPin className="w-8 h-8 text-secondary drop-shadow-sm" />
            <div className="absolute -top-1 -left-1 w-10 h-10 bg-primary/20 rounded-full animate-ping" />
          </motion.div>
        </div>
      </div>

      {/* Top Filter Chips */}
      <div className="absolute top-20 left-0 right-0 z-40">
        <div className="px-4">
          <div className="flex space-x-3 overflow-x-auto hide-scrollbar pb-2">
            {filterOptions.map((filter) => (
              <FilterChip
                key={filter.id}
                icon={filter.icon}
                active={activeFilters.includes(filter.id)}
                onClick={() => toggleFilter(filter.id)}
              >
                {filter.label}
              </FilterChip>
            ))}
          </div>
        </div>
      </div>

      {/* Floating Action Buttons */}
      <div className="absolute right-4 top-1/2 transform -translate-y-1/2 z-40">
        <div className="flex flex-col space-y-3">
          <FloatingActionButton>
            <Filter className="w-5 h-5 text-secondary" />
          </FloatingActionButton>
          <FloatingActionButton>
            <Bookmark className="w-5 h-5 text-secondary" />
          </FloatingActionButton>
          <FloatingActionButton>
            <QrCode className="w-5 h-5 text-secondary" />
          </FloatingActionButton>
          <FloatingActionButton variant="primary">
            <LocateFixed className="w-5 h-5" />
          </FloatingActionButton>
        </div>
      </div>

      {/* Bottom Station Cards Carousel */}
      <div className="absolute bottom-24 left-0 right-0 z-40">
        <div 
          ref={scrollRef}
          className="flex space-x-4 overflow-x-auto hide-scrollbar px-4 snap-x snap-mandatory"
          onScroll={handleStationScroll}
        >
          {mockStations.map((station, index) => (
            <div 
              key={station.id}
              className="flex-shrink-0 w-[95%] snap-center"
            >
              <StationCard
                {...station}
                isBookmarked={bookmarkedStations.includes(station.id)}
                onBookmark={() => onBookmarkStation(station.id)}
                onNavigate={() => onNavigateToStation(station.id)}
                className="fade-in-professional"
                style={{ animationDelay: `${index * 0.1}s` }}
              />
            </div>
          ))}
        </div>

        {/* Carousel Indicators */}
        <div className="flex justify-center mt-4 space-x-2">
          {mockStations.map((_, index) => (
            <motion.div
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentStationIndex ? 'bg-primary w-6' : 'bg-quaternary'
              }`}
              animate={{
                scale: index === currentStationIndex ? 1.2 : 1
              }}
            />
          ))}
        </div>
      </div>

      {/* Bottom Navigation Space */}
      <div className="h-32" />
    </div>
  );
}