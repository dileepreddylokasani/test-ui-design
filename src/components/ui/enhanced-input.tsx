import * as React from "react";
import { motion } from "motion/react";
import { cn } from "./utils";

export interface EnhancedInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: "default" | "elevated" | "ghost";
  inputSize?: "sm" | "md" | "lg";
  isLoading?: boolean;
  error?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const inputVariants = {
  default: "bg-surface-card border border-border focus:border-primary",
  elevated: "input-enhanced shadow-sm",
  ghost: "bg-transparent border-border-subtle focus:bg-surface-card"
};

const sizeVariants = {
  sm: "h-8 px-3 text-sm rounded-md",
  md: "h-10 px-4 text-sm rounded-md",
  lg: "h-12 px-4 text-base rounded-lg"
};

export const EnhancedInput = React.forwardRef<HTMLInputElement, EnhancedInputProps>(
  ({ 
    className, 
    type, 
    variant = "default",
    inputSize = "md",
    isLoading = false,
    error = false,
    leftIcon,
    rightIcon,
    ...props 
  }, ref) => {
    const [isFocused, setIsFocused] = React.useState(false);
    
    const inputClasses = cn(
      "flex w-full transition-all duration-150 ease-out",
      "text-foreground placeholder:text-foreground-subtle",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
      "disabled:cursor-not-allowed disabled:opacity-50",
      inputVariants[variant],
      sizeVariants[inputSize],
      error && "border-error focus:border-error focus-visible:ring-error/50",
      leftIcon && "pl-10",
      rightIcon && "pr-10",
      className
    );

    const containerClasses = cn(
      "relative",
      isFocused && "transform-gpu scale-[1.01]",
      "transition-transform duration-150 ease-out"
    );

    return (
      <div className={containerClasses}>
        {leftIcon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground-subtle">
            {leftIcon}
          </div>
        )}
        
        <motion.input
          type={type}
          className={inputClasses}
          ref={ref}
          onFocus={(e) => {
            setIsFocused(true);
            props.onFocus?.(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            props.onBlur?.(e);
          }}
          whileFocus={{ scale: 1.005 }}
          transition={{ duration: 0.1 }}
          {...props}
        />
        
        {rightIcon && !isLoading && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground-subtle">
            {rightIcon}
          </div>
        )}
        
        {isLoading && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <motion.div
              className="w-4 h-4 border-2 border-primary/30 border-t-primary rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
          </div>
        )}
      </div>
    );
  }
);

EnhancedInput.displayName = "EnhancedInput";