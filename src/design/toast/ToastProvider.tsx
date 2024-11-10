'use client';

import { createContext, useContext, useState } from 'react';
import ToastContainer from './ToastContainer';

type ToastType = 'success' | 'error' | 'warning' | 'info';

type Toast = {
  id: number;
  message: string;
  type?: ToastType;
};

type ToastContextType = {
  showToast: (message: string, type?: ToastType) => void;
  toasts: Toast[];
};

const ToastDisplayTime = 5000;

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = (message: string, type: ToastType = 'info') => {
    const id = Date.now();
    const newToast = { id, message, type };
    setToasts((prevToasts) => [newToast, ...prevToasts]);

    setTimeout(() => {
      setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
    }, ToastDisplayTime);
  };

  return (
    <ToastContext.Provider value={{ showToast, toasts }}>
      {children}
      <ToastContainer />
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (context === undefined)
    throw new Error('useToast must be used within a ToastProvider');

  return context;
};
