import * as React from "react";
import { motion } from 'motion/react';
import { cn } from "./utils";

interface FloatingActionButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: 'default' | 'primary';
}

export function FloatingActionButton({ 
  children, 
  onClick, 
  className,
  variant = 'default'
}: FloatingActionButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={cn(
        "fab",
        variant === 'primary' && "bg-primary text-white border-primary",
        className
      )}
    >
      {children}
    </motion.button>
  );
}