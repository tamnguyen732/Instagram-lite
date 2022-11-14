import { nanoid } from 'nanoid';
import { Dispatch, SetStateAction, useState } from 'react';

interface Toast {
  id?: string;
  message: string;
  type: string;
}
type ReturnProp = () => {
  getToasts: () => Toast[];
  deleteToast: (id: string) => void;
  addToast: ({ message, type }: Toast) => void;
};
const useToast: ReturnProp = () => {
  let setToastsState: Dispatch<SetStateAction<Toast[]>> = () => {};
  const addToast = ({ message, type }: Toast) => {
    setToastsState((prev) => [
      ...prev,
      {
        id: nanoid(10),
        message,
        type
      }
    ]);
  };

  const useGetToasts = () => {
    const [toasts, setToasts] = useState<Toast[]>([]);

    setToastsState = setToasts;

    return toasts;
  };
  const deleteToast = (toastId: string) =>
    setToastsState((prevToast) => prevToast.filter((toast) => toast.id !== toastId));

  return { getToasts: useGetToasts, deleteToast, addToast };
};

export const { getToasts, deleteToast, addToast } = useToast();
