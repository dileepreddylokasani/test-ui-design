import * as React from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "./utils";

interface NotificationBadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  count?: number;
  maxCount?: number;
  showZero?: boolean;
  variant?: "primary" | "success" | "warning" | "error";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
  offset?: { x: number; y: number };
}

const variantStyles = {
  primary: "bg-primary text-primary-foreground",
  success: "bg-success text-white",
  warning: "bg-warning text-white", 
  error: "bg-error text-white"
};

const sizeStyles = {
  sm: "h-4 min-w-4 text-xs px-1",
  md: "h-5 min-w-5 text-xs px-1.5",
  lg: "h-6 min-w-6 text-sm px-2"
};

export const NotificationBadge = React.forwardRef<HTMLDivElement, NotificationBadgeProps>(
  ({ 
    className,
    count = 0,
    maxCount = 99,
    showZero = false,
    variant = "primary",
    size = "md",
    children,
    offset = { x: 0, y: 0 },
    ...props 
  }, ref) => {
    const displayCount = count > maxCount ? `${maxCount}+` : count.toString();
    const shouldShow = showZero || count > 0;

    return (
      <div ref={ref} className={cn("relative inline-block", className)} {...props}>
        {children}
        
        <AnimatePresence>
          {shouldShow && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              className={cn(
                "absolute flex items-center justify-center rounded-full font-medium",
                "shadow-lg border border-background/20",
                variantStyles[variant],
                sizeStyles[size]
              )}
              style={{
                top: offset.y,
                right: offset.x,
                transform: "translate(50%, -50%)"
              }}
            >
              <motion.span
                key={displayCount}
                initial={{ scale: 0.5 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 600, damping: 25 }}
              >
                {displayCount}
              </motion.span>
              
              {/* Pulse animation for new notifications */}
              {count > 0 && (
                <motion.div
                  className={cn(
                    "absolute inset-0 rounded-full opacity-40",
                    variantStyles[variant]
                  )}
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
                />
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }
);

NotificationBadge.displayName = "NotificationBadge";

// Simple dot indicator variant
export const DotIndicator = React.forwardRef<HTMLDivElement, 
  Omit<NotificationBadgeProps, "count" | "maxCount" | "showZero"> & { show?: boolean }
>(({ 
  className,
  show = false,
  variant = "primary", 
  size = "sm",
  children,
  offset = { x: 0, y: 0 },
  ...props 
}, ref) => {
  const dotSizes = {
    sm: "w-2 h-2",
    md: "w-3 h-3",
    lg: "w-4 h-4"
  };

  return (
    <div ref={ref} className={cn("relative inline-block", className)} {...props}>
      {children}
      
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
            className={cn(
              "absolute rounded-full",
              variantStyles[variant],
              dotSizes[size]
            )}
            style={{
              top: offset.y,
              right: offset.x,
              transform: "translate(50%, -50%)"
            }}
          >
            {/* Pulse animation */}
            <motion.div
              className={cn(
                "absolute inset-0 rounded-full opacity-40",
                variantStyles[variant]
              )}
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});

DotIndicator.displayName = "DotIndicator";