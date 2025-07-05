"use client";
import { useState, useEffect } from "react";
import { CheckCircle, XCircle, AlertCircle, Info, X } from "lucide-react";

interface AlertProps {
  type: "success" | "error" | "warning" | "info";
  title?: string;
  message: string;
  onClose?: () => void;
  autoClose?: boolean;
  duration?: number;
}

export default function Alert({ 
  type, 
  title, 
  message, 
  onClose, 
  autoClose = true, 
  duration = 5000 
}: AlertProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (autoClose) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(() => onClose?.(), 300);
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [autoClose, duration, onClose]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => onClose?.(), 300);
  };

  const getIcon = () => {
    switch (type) {
      case "success":
        return <CheckCircle className="w-5 h-5" />;
      case "error":
        return <XCircle className="w-5 h-5" />;
      case "warning":
        return <AlertCircle className="w-5 h-5" />;
      case "info":
        return <Info className="w-5 h-5" />;
    }
  };

  const getStyles = () => {
    switch (type) {
      case "success":
        return "bg-green-900/50 border-green-600 text-green-100";
      case "error":
        return "bg-red-900/50 border-red-600 text-red-100";
      case "warning":
        return "bg-yellow-900/50 border-yellow-600 text-yellow-100";
      case "info":
        return "bg-blue-900/50 border-blue-600 text-blue-100";
    }
  };

  const getIconColor = () => {
    switch (type) {
      case "success":
        return "text-green-400";
      case "error":
        return "text-red-400";
      case "warning":
        return "text-yellow-400";
      case "info":
        return "text-blue-400";
    }
  };

  if (!isVisible) return null;

  return (
    <div 
      className={`
        ${getStyles()}
        border rounded-xl p-4 mb-4 relative
        transition-all duration-300 ease-in-out
        ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}
      `}
    >
      <div className="flex items-start gap-3">
        <div className={`${getIconColor()} mt-0.5`}>
          {getIcon()}
        </div>
        
        <div className="flex-1 min-w-0">
          {title && (
            <h4 className="font-semibold mb-1">{title}</h4>
          )}
          <p className="text-sm opacity-90">{message}</p>
        </div>

        <button
          onClick={handleClose}
          className="text-slate-400 hover:text-slate-200 transition-colors p-1"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

// Hook para gerenciar alertas
export function useAlert() {
  const [alerts, setAlerts] = useState<Array<AlertProps & { id: string }>>([]);

  const addAlert = (alert: Omit<AlertProps, "onClose">) => {
    const id = Math.random().toString(36).substr(2, 9);
    setAlerts(prev => [...prev, { ...alert, id, onClose: () => removeAlert(id) }]);
  };

  const removeAlert = (id: string) => {
    setAlerts(prev => prev.filter(alert => alert.id !== id));
  };

  const clearAlerts = () => {
    setAlerts([]);
  };

  return {
    alerts,
    addAlert,
    removeAlert,
    clearAlerts,
    success: (message: string, title?: string) => 
      addAlert({ type: "success", message, title }),
    error: (message: string, title?: string) => 
      addAlert({ type: "error", message, title }),
    warning: (message: string, title?: string) => 
      addAlert({ type: "warning", message, title }),
    info: (message: string, title?: string) => 
      addAlert({ type: "info", message, title }),
  };
}

// Componente para renderizar lista de alertas
export function AlertContainer({ alerts }: { alerts: Array<AlertProps & { id: string }> }) {
  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 max-w-md">
      {alerts.map(alert => (
        <Alert key={alert.id} {...alert} />
      ))}
    </div>
  );
}
