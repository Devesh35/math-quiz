import clsx from 'clsx';
import React from 'react';
import { useToast } from './ToastProvider';

const ToastContainer: React.FC = () => {
  const { toasts } = useToast();

  return (
    <div className="fixed top-4 right-4 space-y-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={clsx(
            'px-4 py-2 rounded shadow-lg',
            {
              'bg-green-500': toast.type === 'success',
              'bg-red-500': toast.type === 'error',
              'bg-yellow-500': toast.type === 'warning',
              'bg-blue-500': toast.type === 'info',
            },
            {
              'text-white': toast.type !== 'warning',
              'text-black': toast.type === 'warning',
            },
          )}
        >
          {toast.message}
        </div>
      ))}
    </div>
  );
};

export default ToastContainer;
