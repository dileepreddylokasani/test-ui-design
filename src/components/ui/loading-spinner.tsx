import * as React from "react";
import { motion } from "motion/react";
import { cn } from "./utils";

interface LoadingSpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg" | "xl";
  variant?: "primary" | "secondary" | "accent";
  text?: string;
  centered?: boolean;
}

const sizeVariants = {
  sm: "w-4 h-4",
  md: "w-6 h-6",
  lg: "w-8 h-8",
  xl: "w-12 h-12"
};

const colorVariants = {
  primary: "border-primary/30 border-t-primary",
  secondary: "border-foreground-subtle/30 border-t-foreground-subtle",
  accent: "border-accent-blue/30 border-t-accent-blue"
};

export const LoadingSpinner = React.forwardRef<HTMLDivElement, LoadingSpinnerProps>(
  ({ 
    className, 
    size = "md", 
    variant = "primary",
    text,
    centered = false,
    ...props 
  }, ref) => {
    const spinner = (
      <motion.div
        ref={ref}
        className={cn(
          "border-2 rounded-full flex-shrink-0",
          sizeVariants[size],
          colorVariants[variant],
          className
        )}
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        {...props}
      />
    );

    if (text) {
      return (
        <div className={cn(
          "flex items-center gap-3",
          centered && "justify-center"
        )}>
          {spinner}
          <span className="text-sm text-foreground-muted animate-pulse-soft">
            {text}
          </span>
        </div>
      );
    }

    if (centered) {
      return (
        <div className="flex items-center justify-center">
          {spinner}
        </div>
      );
    }

    return spinner;
  }
);

LoadingSpinner.displayName = "LoadingSpinner";

// Skeleton Loading Components
export const SkeletonLoader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("skeleton rounded-md", className)}
      {...props}
    />
  )
);

SkeletonLoader.displayName = "SkeletonLoader";

export const SkeletonText = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & {
  lines?: number;
  className?: string;
}>(
  ({ className, lines = 3, ...props }, ref) => (
    <div ref={ref} className={cn("space-y-2", className)} {...props}>
      {Array.from({ length: lines }, (_, i) => (
        <div
          key={i}
          className={cn(
            "skeleton h-4 rounded",
            i === lines - 1 ? "w-3/4" : "w-full"
          )}
        />
      ))}
    </div>
  )
);

SkeletonText.displayName = "SkeletonText";

export const SkeletonCard = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("p-4 space-y-4 border rounded-lg", className)} {...props}>
      <div className="flex items-center space-x-3">
        <div className="skeleton w-10 h-10 rounded-full" />
        <div className="space-y-2 flex-1">
          <div className="skeleton h-4 w-3/4 rounded" />
          <div className="skeleton h-3 w-1/2 rounded" />
        </div>
      </div>
      <div className="space-y-2">
        <div className="skeleton h-4 w-full rounded" />
        <div className="skeleton h-4 w-full rounded" />
        <div className="skeleton h-4 w-2/3 rounded" />
      </div>
    </div>
  )
);

SkeletonCard.displayName = "SkeletonCard";