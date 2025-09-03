import { motion } from 'motion/react';
import { Loader2, Zap } from 'lucide-react';

interface LoadingProps {
  variant?: 'spinner' | 'pulse' | 'dots' | 'brand';
  size?: 'sm' | 'md' | 'lg';
  text?: string;
  className?: string;
}

export function Loading({ 
  variant = 'spinner', 
  size = 'md', 
  text, 
  className = '' 
}: LoadingProps) {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8'
  };

  if (variant === 'spinner') {
    return (
      <div className={`flex flex-col items-center justify-center space-y-2 ${className}`}>
        <Loader2 className={`animate-spin text-primary ${sizeClasses[size]}`} />
        {text && <p className="text-sm text-muted-foreground">{text}</p>}
      </div>
    );
  }

  if (variant === 'pulse') {
    return (
      <div className={`flex flex-col items-center justify-center space-y-2 ${className}`}>
        <motion.div
          className={`bg-primary rounded-full ${sizeClasses[size]}`}
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
        {text && <p className="text-sm text-muted-foreground">{text}</p>}
      </div>
    );
  }

  if (variant === 'dots') {
    return (
      <div className={`flex flex-col items-center justify-center space-y-4 ${className}`}>
        <div className="flex space-x-1">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 bg-primary rounded-full"
              animate={{ y: [0, -8, 0] }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                delay: i * 0.1
              }}
            />
          ))}
        </div>
        {text && <p className="text-sm text-muted-foreground">{text}</p>}
      </div>
    );
  }

  if (variant === 'brand') {
    return (
      <div className={`flex flex-col items-center justify-center space-y-4 ${className}`}>
        <motion.div
          className="relative"
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
        >
          <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center">
            <Zap className="w-6 h-6 text-white" />
          </div>
          <motion.div
            className="absolute inset-0 border-2 border-primary border-t-transparent rounded-full"
            animate={{ rotate: -360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
          />
        </motion.div>
        {text && <p className="text-sm font-medium text-foreground">{text}</p>}
      </div>
    );
  }

  return null;
}

export function SkeletonCard() {
  return (
    <div className="p-4 space-y-3 bg-white rounded-xl border animate-pulse">
      <div className="h-32 bg-gray-200 rounded-lg"></div>
      <div className="space-y-2">
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
      </div>
      <div className="flex space-x-2">
        <div className="h-6 bg-gray-200 rounded w-16"></div>
        <div className="h-6 bg-gray-200 rounded w-20"></div>
      </div>
    </div>
  );
}

export function SkeletonList({ count = 3 }: { count?: number }) {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}