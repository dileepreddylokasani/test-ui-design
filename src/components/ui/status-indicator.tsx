import * as React from "react";
import { motion } from "motion/react";
import { cn } from "./utils";

interface StatusIndicatorProps extends React.HTMLAttributes<HTMLDivElement> {
  status: "online" | "offline" | "busy" | "away";
  size?: "sm" | "md" | "lg";
  animated?: boolean;
  withLabel?: boolean;
  label?: string;
}

const statusConfig = {
  online: {
    className: "status-online",
    label: "Online"
  },
  offline: {
    className: "status-offline", 
    label: "Offline"
  },
  busy: {
    className: "status-busy",
    label: "Busy"
  },
  away: {
    className: "status-away",
    label: "Away"
  }
};

const sizeVariants = {
  sm: "w-2 h-2",
  md: "w-3 h-3", 
  lg: "w-4 h-4"
};

export const StatusIndicator = React.forwardRef<HTMLDivElement, StatusIndicatorProps>(
  ({ 
    className, 
    status, 
    size = "md", 
    animated = true, 
    withLabel = false,
    label,
    ...props 
  }, ref) => {
    const config = statusConfig[status];
    const displayLabel = label || config.label;
    
    const indicator = (
      <motion.div
        ref={ref}
        className={cn(
          "rounded-full flex-shrink-0",
          config.className,
          sizeVariants[size],
          className
        )}
        initial={animated ? { scale: 0.8, opacity: 0 } : false}
        animate={animated ? { scale: 1, opacity: 1 } : false}
        transition={{ duration: 0.2, ease: "easeOut" }}
        {...props}
      >
        {animated && status === "online" && (
          <motion.div
            className="w-full h-full rounded-full bg-current opacity-30"
            animate={{ scale: [1, 1.5, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        )}
      </motion.div>
    );
    
    if (withLabel) {
      return (
        <div className="flex items-center gap-2">
          {indicator}
          <span className="text-sm text-foreground-muted">{displayLabel}</span>
        </div>
      );
    }
    
    return indicator;
  }
);

StatusIndicator.displayName = "StatusIndicator";