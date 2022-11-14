import { nanoid } from 'nanoid';
import { useState } from 'react';

interface Toast {
  id?: string;
  message: string;
  type: string;
}
const useToast = ({ message, type }: Toast) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  setToasts((prev) => [
    ...prev,
    {
      id: nanoid(10),
      message,
      type
    }
  ]);

  const deleteToast = (id: string) => {
    const newToasts = toasts.filter((toast) => toast.id !== id);
    setToasts(newToasts);
  };

  return { toasts, deleteToast };
};

export default useToast;
