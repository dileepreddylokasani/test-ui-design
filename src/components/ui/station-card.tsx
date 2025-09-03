import * as React from "react";
import { motion } from 'motion/react';
import { MapPin, Star, Clock, Zap, Car, Bookmark, Navigation } from 'lucide-react';
import { Button } from './button';
import { cn } from "./utils";

interface StationCardProps {
  id: string;
  name: string;
  address: string;
  operator: string;
  rating: number;
  distance: string;
  eta: string;
  available: number;
  total: number;
  power: string;
  price: string;
  isBookmarked?: boolean;
  onBookmark?: () => void;
  onNavigate?: () => void;
  className?: string;
}

export function StationCard({
  name,
  address,
  operator,
  rating,
  distance,
  eta,
  available,
  total,
  power,
  price,
  isBookmarked = false,
  onBookmark,
  onNavigate,
  className
}: StationCardProps) {
  const getAvailabilityStatus = () => {
    if (available === 0) return { color: 'text-error', bgColor: 'bg-error-subtle' };
    if (available / total <= 0.3) return { color: 'text-warning', bgColor: 'bg-warning-subtle' };
    return { color: 'text-success', bgColor: 'bg-success-subtle' };
  };

  const availabilityStatus = getAvailabilityStatus();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn("card-professional interactive-professional", className)}
    >
      {/* Drag Handle */}
      <div className="flex justify-center pt-3 pb-2">
        <div className="w-10 h-1 bg-divider rounded-full" />
      </div>

      <div className="px-6 pb-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="text-title mb-1">{name}</h3>
            <div className="flex items-center text-tertiary text-body-small mb-1">
              <MapPin className="w-4 h-4 mr-1" />
              <span className="truncate">{address}</span>
            </div>
            <p className="text-body-small font-medium text-secondary">{operator}</p>
          </div>
          
          <div className="flex items-center space-x-3 ml-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={onBookmark}
              className="p-2"
            >
              <Bookmark 
                className={cn(
                  "w-5 h-5",
                  isBookmarked ? "text-primary fill-primary" : "text-tertiary"
                )}
              />
            </motion.button>
            
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 text-warning fill-warning" />
              <span className="text-body-small font-medium">{rating}</span>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-divider mb-4" />

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="text-center">
            <div className={cn("text-title-small font-semibold", availabilityStatus.color)}>
              {String(available).padStart(2, '0')}/{String(total).padStart(2, '0')}
            </div>
            <div className="text-caption text-quaternary">Available</div>
          </div>
          <div className="text-center">
            <div className="text-title-small font-semibold text-primary">{power}</div>
            <div className="text-caption text-quaternary">Fast Charger</div>
          </div>
          <div className="text-center">
            <div className="text-title-small font-semibold">{price}</div>
            <div className="text-caption text-quaternary">/ kWh</div>
          </div>
        </div>

        {/* Distance & ETA */}
        <div className="flex items-center justify-center space-x-4 mb-6 text-body-small text-secondary">
          <div className="flex items-center space-x-1">
            <Car className="w-4 h-4" />
            <span>{distance}</span>
          </div>
          <div className="w-1 h-1 bg-tertiary rounded-full" />
          <div className="flex items-center space-x-1">
            <Clock className="w-4 h-4" />
            <span>{eta}</span>
          </div>
        </div>

        {/* Navigate Button */}
        <Button
          onClick={onNavigate}
          className="w-full"
          disabled={available === 0}
        >
          <Navigation className="w-4 h-4 mr-2" />
          {available === 0 ? 'Full' : 'Navigate'}
        </Button>
      </div>
    </motion.div>
  );
}