import * as React from "react";
import { motion } from 'motion/react';
import { cn } from "./utils";

interface FilterChipProps {
  children: React.ReactNode;
  icon?: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
  className?: string;
}

export function FilterChip({ 
  children, 
  icon, 
  active = false, 
  onClick, 
  className 
}: FilterChipProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={cn(
        "filter-chip",
        active ? "filter-chip-active" : "filter-chip-inactive",
        className
      )}
    >
      {icon && <span className="w-4 h-4">{icon}</span>}
      <span>{children}</span>
    </motion.button>
  );
}