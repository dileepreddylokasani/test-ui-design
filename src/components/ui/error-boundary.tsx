import * as React from "react";
import { motion } from "motion/react";
import { AlertTriangle, RefreshCw, Home, Bug } from "lucide-react";
import { Button } from "./button";
import { EnhancedCard } from "./enhanced-card";

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<{ error: Error; resetError: () => void }>;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.setState({
      error,
      errorInfo,
    });

    // Call optional error reporting callback
    this.props.onError?.(error, errorInfo);
    
    // Log error in development
    if (process.env.NODE_ENV === 'development') {
      console.error('ErrorBoundary caught an error:', error, errorInfo);
    }
  }

  resetError = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        const FallbackComponent = this.props.fallback;
        return <FallbackComponent error={this.state.error!} resetError={this.resetError} />;
      }

      return <DefaultErrorFallback error={this.state.error!} resetError={this.resetError} />;
    }

    return this.props.children;
  }
}

interface ErrorFallbackProps {
  error: Error;
  resetError: () => void;
}

export const DefaultErrorFallback: React.FC<ErrorFallbackProps> = ({ error, resetError }) => {
  const [showDetails, setShowDetails] = React.useState(false);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-md"
      >
        <EnhancedCard variant="elevated" className="text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.1, type: "spring", stiffness: 300 }}
            className="w-16 h-16 mx-auto mb-6 bg-error/20 rounded-full flex items-center justify-center"
          >
            <AlertTriangle className="w-8 h-8 text-error" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl font-semibold text-foreground mb-3"
          >
            Something went wrong
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-foreground-muted mb-6"
          >
            We encountered an unexpected error. Don't worry, your data is safe.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-4"
          >
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                onClick={resetError}
                variant="default"
                className="flex-1"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Try Again
              </Button>
              
              <Button
                onClick={() => window.location.href = '/'}
                variant="outline"
                className="flex-1"
              >
                <Home className="w-4 h-4 mr-2" />
                Go Home
              </Button>
            </div>

            <Button
              onClick={() => setShowDetails(!showDetails)}
              variant="ghost"
              size="sm"
              className="w-full text-foreground-subtle"
            >
              <Bug className="w-4 h-4 mr-2" />
              {showDetails ? 'Hide' : 'Show'} Error Details
            </Button>

            {showDetails && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-4 p-4 bg-surface-elevated rounded-lg text-left overflow-hidden"
              >
                <h4 className="text-sm font-medium text-foreground mb-2">Error Details:</h4>
                <pre className="text-xs text-foreground-muted overflow-x-auto whitespace-pre-wrap">
                  {error.name}: {error.message}
                  {error.stack && `\n\nStack trace:\n${error.stack}`}
                </pre>
              </motion.div>
            )}
          </motion.div>
        </EnhancedCard>
      </motion.div>
    </div>
  );
};

// Hook for handling async errors
export const useErrorHandler = () => {
  const [error, setError] = React.useState<Error | null>(null);

  const resetError = React.useCallback(() => {
    setError(null);
  }, []);

  const captureError = React.useCallback((error: Error) => {
    setError(error);
  }, []);

  // Re-throw error to be caught by ErrorBoundary
  React.useEffect(() => {
    if (error) {
      throw error;
    }
  }, [error]);

  return { captureError, resetError };
};

// Component for displaying inline errors
interface InlineErrorProps {
  error?: string | null;
  className?: string;
}

export const InlineError: React.FC<InlineErrorProps> = ({ error, className }) => {
  if (!error) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className={`flex items-center gap-2 text-sm text-error bg-error/10 border border-error/20 rounded-md p-3 ${className}`}
    >
      <AlertTriangle className="w-4 h-4 flex-shrink-0" />
      <span>{error}</span>
    </motion.div>
  );
};