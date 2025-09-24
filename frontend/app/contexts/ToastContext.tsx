// ToastContext.tsx
import React, { createContext, useRef, useContext } from 'react';
import { Toast } from 'primereact/toast';
import { Toast as ToastType } from 'primereact/toast';

type ToastContextType = {
  showToast: (summary: string, detail: string, severity?: 'success' | 'info' | 'warn' | 'error', life?: number) => void;
};

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const toast = useRef<ToastType>(null);

  const showToast = (
    summary: string,
    detail: string,
    severity: 'success' | 'info' | 'warn' | 'error' = 'info',
    life: number = 3000
  ) => {
    toast.current?.show({ severity, summary, detail, life });
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      <Toast ref={toast} position='bottom-center' />
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

