import { useStoreSelector } from './store';

export const useAuthSelector = () => useStoreSelector((state) => state);
