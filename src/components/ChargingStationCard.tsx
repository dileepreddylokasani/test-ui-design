import { motion } from 'motion/react';
import { MapPin, Star, Bookmark, Clock, Zap, Navigation, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ChargingStationCardProps {
  id: string;
  name: string;
  address: string;
  distance: number;
  availableSlots: number;
  totalSlots: number;
  pricePerUnit: number;
  rating: number;
  chargingSpeed: string;
  isOpen: boolean;
  estimatedTime: string;
  image: string;
  onBookmark: () => void;
  isBookmarked: boolean;
  onNavigateToStation?: () => void;
}

export function ChargingStationCard({
  name,
  address,
  distance,
  availableSlots,
  totalSlots,
  pricePerUnit,
  rating,
  chargingSpeed,
  isOpen,
  estimatedTime,
  image,
  onBookmark,
  isBookmarked,
  onNavigateToStation,
}: ChargingStationCardProps) {
  const availabilityPercentage = (availableSlots / totalSlots) * 100;
  
  const getStatusColor = () => {
    if (!isOpen) return 'text-quaternary';
    if (availableSlots === 0) return 'text-error';
    if (availabilityPercentage <= 25) return 'text-warning';
    return 'text-success';
  };

  const getStatusText = () => {
    if (!isOpen) return 'Closed';
    if (availableSlots === 0) return 'Full';
    return `${availableSlots} available`;
  };

  return (
    <Card className="interactive-professional overflow-hidden">
      {/* Image Header */}
      <div className="relative h-32">
        <ImageWithFallback
          src={image}
          alt={name}
          className="w-full h-full object-cover"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        
        {/* Top Row - Status & Bookmark */}
        <div className="absolute top-3 left-3 right-3 flex justify-between items-start">
          <div className="flex items-center space-x-2">
            <span className={`px-2 py-1 rounded-md text-caption font-medium glass-professional ${
              isOpen && availableSlots > 0 
                ? 'text-success' 
                : 'text-quaternary'
            }`}>
              {getStatusText()}
            </span>
            <span className="px-2 py-1 rounded-md text-caption font-medium glass-professional text-white">
              {distance.toFixed(1)} km
            </span>
          </div>
          
          <button
            onClick={onBookmark}
            className="p-2 glass-professional rounded-full transition-professional hover:bg-surface-overlay"
          >
            <Bookmark
              className={`w-4 h-4 ${
                isBookmarked 
                  ? 'text-primary fill-primary' 
                  : 'text-white'
              }`}
            />
          </button>
        </div>

        {/* Bottom Row - Rating & Time */}
        <div className="absolute bottom-3 left-3 right-3">
          <div className="flex items-center justify-between text-white">
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 text-warning fill-warning" />
              <span className="text-body-small font-medium">{rating}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span className="text-body-small">{estimatedTime}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <CardContent className="p-4">
        {/* Header */}
        <div className="mb-4">
          <h3 className="text-title-small mb-1">{name}</h3>
          <div className="flex items-center text-tertiary">
            <MapPin className="w-4 h-4 mr-1 flex-shrink-0" />
            <span className="text-body-small truncate">{address}</span>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="text-center">
            <div className="text-title-small">{availableSlots}/{totalSlots}</div>
            <div className="text-caption text-quaternary">Slots</div>
          </div>
          <div className="text-center">
            <div className="text-title-small text-primary">₹{pricePerUnit}</div>
            <div className="text-caption text-quaternary">per kWh</div>
          </div>
          <div className="text-center">
            <div className="text-title-small">{chargingSpeed}</div>
            <div className="text-caption text-quaternary">Speed</div>
          </div>
        </div>

        {/* Availability Bar */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-caption text-tertiary">Availability</span>
            <span className={`text-caption font-medium ${getStatusColor()}`}>
              {Math.round(availabilityPercentage)}%
            </span>
          </div>
          <div className="w-full bg-surface rounded-full h-1.5 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${availabilityPercentage}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className={`h-1.5 rounded-full ${
                availabilityPercentage > 50 ? 'bg-success' :
                availabilityPercentage > 25 ? 'bg-warning' : 'bg-error'
              }`}
            />
          </div>
        </div>

        {/* Action Button */}
        <Button
          onClick={onNavigateToStation}
          variant={isOpen && availableSlots > 0 ? "default" : "secondary"}
          disabled={!isOpen || availableSlots === 0}
          className="w-full"
        >
          {!isOpen ? 'Closed' : availableSlots === 0 ? 'Full' : 'View Details'}
          {isOpen && availableSlots > 0 && <ChevronRight className="w-4 h-4 ml-1" />}
        </Button>
      </CardContent>
    </Card>
  );
}