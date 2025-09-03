import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Zap, MapPin, Clock, DollarSign, Star, Battery, Filter } from 'lucide-react';
import { Button } from './button';
import { Badge } from './badge';
import { Card } from './card';
import { Switch } from './switch';
import { Slider } from './slider';

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyFilters: (filters: FilterState) => void;
  currentFilters: FilterState;
}

export interface FilterState {
  distance: number[];
  price: number[];
  rating: number;
  availability: 'all' | 'available' | 'fast-charging';
  chargingType: string[];
  features: string[];
  isOpen24Hours: boolean;
}

const chargingTypes = [
  { id: 'dc-fast', label: 'DC Fast', icon: Zap, color: 'bg-blue-100 text-blue-700' },
  { id: 'ac-standard', label: 'AC Standard', icon: Battery, color: 'bg-green-100 text-green-700' },
  { id: 'ultra-fast', label: 'Ultra Fast', icon: Zap, color: 'bg-purple-100 text-purple-700' },
];

const features = [
  { id: 'parking', label: 'Free Parking', icon: MapPin },
  { id: 'cafe', label: 'Café Nearby', icon: MapPin },
  { id: 'restroom', label: 'Restroom', icon: MapPin },
  { id: 'wifi', label: 'Free WiFi', icon: MapPin },
  { id: 'covered', label: 'Covered Parking', icon: MapPin },
  { id: 'security', label: '24/7 Security', icon: MapPin },
];

export function FilterModal({ isOpen, onClose, onApplyFilters, currentFilters }: FilterModalProps) {
  const [filters, setFilters] = useState<FilterState>(currentFilters);

  const handleApply = () => {
    onApplyFilters(filters);
    onClose();
  };

  const handleReset = () => {
    const resetFilters: FilterState = {
      distance: [0, 50],
      price: [0, 20],
      rating: 0,
      availability: 'all',
      chargingType: [],
      features: [],
      isOpen24Hours: false,
    };
    setFilters(resetFilters);
  };

  const toggleChargingType = (type: string) => {
    setFilters(prev => ({
      ...prev,
      chargingType: prev.chargingType.includes(type)
        ? prev.chargingType.filter(t => t !== type)
        : [...prev.chargingType, type]
    }));
  };

  const toggleFeature = (feature: string) => {
    setFilters(prev => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter(f => f !== feature)
        : [...prev.features, feature]
    }));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: '100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed inset-x-0 bottom-0 z-50 bg-white rounded-t-3xl max-h-[85vh] overflow-hidden"
          >
            {/* Header */}
            <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-primary/10 rounded-xl">
                  <Filter className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold">Filter Stations</h2>
                  <p className="text-sm text-muted-foreground">Find your perfect charging spot</p>
                </div>
              </div>
              <Button variant="ghost" size="sm" onClick={onClose}>
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-8 overflow-y-auto max-h-[calc(85vh-140px)]">
              {/* Distance Range */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">Distance Range</h3>
                  <Badge variant="secondary">{filters.distance[0]}-{filters.distance[1]} km</Badge>
                </div>
                <Slider
                  value={filters.distance}
                  onValueChange={(value) => setFilters(prev => ({ ...prev, distance: value }))}
                  max={50}
                  step={1}
                  className="w-full"
                />
              </div>

              {/* Price Range */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">Price Range</h3>
                  <Badge variant="secondary">₹{filters.price[0]}-₹{filters.price[1]}/kWh</Badge>
                </div>
                <Slider
                  value={filters.price}
                  onValueChange={(value) => setFilters(prev => ({ ...prev, price: value }))}
                  max={25}
                  step={1}
                  className="w-full"
                />
              </div>

              {/* Rating */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">Minimum Rating</h3>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-medium">{filters.rating}+</span>
                  </div>
                </div>
                <Slider
                  value={[filters.rating]}
                  onValueChange={(value) => setFilters(prev => ({ ...prev, rating: value[0] }))}
                  max={5}
                  step={0.5}
                  className="w-full"
                />
              </div>

              {/* Availability */}
              <div className="space-y-4">
                <h3 className="font-medium">Availability</h3>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { value: 'all', label: 'All Stations' },
                    { value: 'available', label: 'Available Now' },
                    { value: 'fast-charging', label: 'Fast Charging' },
                  ].map((option) => (
                    <Card
                      key={option.value}
                      className={`p-3 cursor-pointer transition-all ${
                        filters.availability === option.value 
                          ? 'ring-2 ring-primary bg-primary/5' 
                          : 'hover:bg-gray-50'
                      }`}
                      onClick={() => setFilters(prev => ({ ...prev, availability: option.value as any }))}
                    >
                      <div className="text-center">
                        <div className="text-sm font-medium">{option.label}</div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Charging Types */}
              <div className="space-y-4">
                <h3 className="font-medium">Charging Types</h3>
                <div className="grid grid-cols-2 gap-3">
                  {chargingTypes.map((type) => {
                    const Icon = type.icon;
                    const isSelected = filters.chargingType.includes(type.id);
                    return (
                      <Card
                        key={type.id}
                        className={`p-4 cursor-pointer transition-all ${
                          isSelected ? 'ring-2 ring-primary bg-primary/5' : 'hover:bg-gray-50'
                        }`}
                        onClick={() => toggleChargingType(type.id)}
                      >
                        <div className="flex items-center space-x-3">
                          <div className={`p-2 rounded-lg ${type.color}`}>
                            <Icon className="w-4 h-4" />
                          </div>
                          <span className="text-sm font-medium">{type.label}</span>
                        </div>
                      </Card>
                    );
                  })}
                </div>
              </div>

              {/* Features */}
              <div className="space-y-4">
                <h3 className="font-medium">Features & Amenities</h3>
                <div className="grid grid-cols-2 gap-3">
                  {features.map((feature) => {
                    const Icon = feature.icon;
                    const isSelected = filters.features.includes(feature.id);
                    return (
                      <Card
                        key={feature.id}
                        className={`p-3 cursor-pointer transition-all ${
                          isSelected ? 'ring-2 ring-primary bg-primary/5' : 'hover:bg-gray-50'
                        }`}
                        onClick={() => toggleFeature(feature.id)}
                      >
                        <div className="flex items-center space-x-2">
                          <Icon className="w-4 h-4 text-gray-600" />
                          <span className="text-sm">{feature.label}</span>
                        </div>
                      </Card>
                    );
                  })}
                </div>
              </div>

              {/* 24/7 Operations */}
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">24/7 Operations</h3>
                  <p className="text-sm text-muted-foreground">Only show stations open 24 hours</p>
                </div>
                <Switch
                  checked={filters.isOpen24Hours}
                  onCheckedChange={(checked) => setFilters(prev => ({ ...prev, isOpen24Hours: checked }))}
                />
              </div>
            </div>

            {/* Footer */}
            <div className="sticky bottom-0 bg-white border-t border-gray-100 px-6 py-4 flex space-x-3">
              <Button variant="outline" onClick={handleReset} className="flex-1">
                Reset
              </Button>
              <Button onClick={handleApply} className="flex-1 bg-gradient-primary">
                Apply Filters
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}