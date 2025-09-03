import * as React from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, CheckCircle, AlertCircle, AlertTriangle, Info } from "lucide-react";
import { cn } from "./utils";

export interface Toast {
  id: string;
  title?: string;
  description?: string;
  variant?: "default" | "success" | "error" | "warning" | "info";
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

interface ToastContextType {
  toasts: Toast[];
  toast: (toast: Omit<Toast, "id">) => void;
  dismiss: (toastId: string) => void;
  dismissAll: () => void;
}

const ToastContext = React.createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = React.useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

interface ToastProviderProps {
  children: React.ReactNode;
  maxToasts?: number;
}

export const ToastProvider: React.FC<ToastProviderProps> = ({ 
  children, 
  maxToasts = 5 
}) => {
  const [toasts, setToasts] = React.useState<Toast[]>([]);

  const toast = React.useCallback((toast: Omit<Toast, "id">) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newToast: Toast = {
      ...toast,
      id,
      duration: toast.duration ?? 5000,
    };

    setToasts((prev) => {
      const newToasts = [newToast, ...prev];
      return newToasts.slice(0, maxToasts);
    });

    // Auto dismiss
    if (newToast.duration && newToast.duration > 0) {
      setTimeout(() => {
        dismiss(id);
      }, newToast.duration);
    }
  }, [maxToasts]);

  const dismiss = React.useCallback((toastId: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== toastId));
  }, []);

  const dismissAll = React.useCallback(() => {
    setToasts([]);
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, toast, dismiss, dismissAll }}>
      {children}
      <ToastViewport />
    </ToastContext.Provider>
  );
};

const ToastViewport: React.FC = () => {
  const { toasts, dismiss } = useToast();

  return (
    <div className="fixed top-0 right-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:right-0 sm:top-0 sm:flex-col md:max-w-[420px]">
      <AnimatePresence>
        {toasts.map((toast) => (
          <ToastComponent
            key={toast.id}
            toast={toast}
            onDismiss={() => dismiss(toast.id)}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

interface ToastComponentProps {
  toast: Toast;
  onDismiss: () => void;
}

const variantConfig = {
  default: {
    icon: Info,
    className: "bg-surface-card border-border",
    iconColor: "text-primary"
  },
  success: {
    icon: CheckCircle,
    className: "bg-success/10 border-success/20",
    iconColor: "text-success"
  },
  error: {
    icon: AlertCircle,
    className: "bg-error/10 border-error/20",
    iconColor: "text-error"
  },
  warning: {
    icon: AlertTriangle,
    className: "bg-warning/10 border-warning/20",
    iconColor: "text-warning"
  },
  info: {
    icon: Info,
    className: "bg-accent-blue/10 border-accent-blue/20",
    iconColor: "text-accent-blue"
  }
};

const ToastComponent: React.FC<ToastComponentProps> = ({ toast, onDismiss }) => {
  const config = variantConfig[toast.variant || "default"];
  const Icon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, x: 100, scale: 0.95 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 100, scale: 0.95 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      layout
      className={cn(
        "group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-lg border p-4 shadow-lg transition-all",
        config.className
      )}
    >
      <div className="flex items-start space-x-3 flex-1">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.1, type: "spring", stiffness: 400 }}
        >
          <Icon className={cn("w-5 h-5 flex-shrink-0 mt-0.5", config.iconColor)} />
        </motion.div>
        
        <div className="flex-1 min-w-0">
          {toast.title && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="font-medium text-foreground"
            >
              {toast.title}
            </motion.div>
          )}
          
          {toast.description && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-1 text-sm text-foreground-muted"
            >
              {toast.description}
            </motion.div>
          )}
        </div>
      </div>

      <div className="flex items-center space-x-2">
        {toast.action && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            onClick={toast.action.onClick}
            className="px-3 py-1 text-sm font-medium text-primary hover:text-primary-dark transition-colors rounded-md hover:bg-primary/10"
          >
            {toast.action.label}
          </motion.button>
        )}
        
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.25 }}
          onClick={onDismiss}
          className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-surface-elevated rounded-md"
        >
          <X className="w-4 h-4 text-foreground-muted" />
        </motion.button>
      </div>

      {/* Progress bar for auto-dismiss */}
      {toast.duration && toast.duration > 0 && (
        <motion.div
          className="absolute bottom-0 left-0 h-1 bg-primary/30 rounded-b-lg"
          initial={{ width: "100%" }}
          animate={{ width: "0%" }}
          transition={{ duration: toast.duration / 1000, ease: "linear" }}
        />
      )}
    </motion.div>
  );
};

// Convenience functions
export const toast = {
  success: (message: string, options?: Partial<Toast>) => ({
    title: "Success",
    description: message,
    variant: "success" as const,
    ...options,
  }),
  
  error: (message: string, options?: Partial<Toast>) => ({
    title: "Error",
    description: message,
    variant: "error" as const,
    ...options,
  }),
  
  warning: (message: string, options?: Partial<Toast>) => ({
    title: "Warning",
    description: message,
    variant: "warning" as const,
    ...options,
  }),
  
  info: (message: string, options?: Partial<Toast>) => ({
    title: "Info",
    description: message,
    variant: "info" as const,
    ...options,
  }),
};