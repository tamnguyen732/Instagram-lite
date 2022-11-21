import { useState, createContext, ReactNode, useContext, SetStateAction, Dispatch } from 'react';
import Message from '~/components/Message';
import RootModal from '~/components/modals';
import PostModal from '~/components/modals/PostModal';
import WarningModal from '~/components/modals/WarningModal';

export const MODAL_TYPES = {
  POST_CREATOR: 'POST_CREATOR',
  NEW_MESSAGE: 'NEW_MESSAGE',
  WARNING_USER: 'WARNING_USER'
} as const;

export type ModalType = keyof typeof MODAL_TYPES;

const MODALS = {
  [MODAL_TYPES.POST_CREATOR]: <PostModal key={MODAL_TYPES.POST_CREATOR} />,
  [MODAL_TYPES.NEW_MESSAGE]: <Message key={MODAL_TYPES.NEW_MESSAGE} />,
  [MODAL_TYPES.WARNING_USER]: <WarningModal key={MODAL_TYPES.WARNING_USER} />
} as const;

interface ModalContextTypes {
  modalsType: ModalType[];
  showModal: (modalType: ModalType) => void;
  hideModal: (modalType: ModalType | ModalType[]) => void;
}

interface ModalProviderProp {
  children: ReactNode;
}

const ModalContext = createContext<ModalContextTypes>({
  modalsType: [],
  showModal: () => null,
  hideModal: () => null
});

const ModalProvider = ({ children }: ModalProviderProp) => {
  const [modalTypes, setModalTypes] = useState<ModalType[]>([]);

  const showModal = (modalType: ModalType) => {
    setModalTypes([...modalTypes, modalType]);
  };

  const hideModal = (modalType: ModalType | ModalType[]) => {
    if (Array.isArray(modalType)) {
      setModalTypes(modalTypes.splice(0, modalType.length));
    }
    setModalTypes(modalTypes.filter((modal) => modal !== modalType));
  };

  const modalsType = [...new Set(modalTypes)];
  return (
    <ModalContext.Provider value={{ modalsType, showModal, hideModal }}>
      <RootModal>{modalsType.map((modal) => MODALS[modal])}</RootModal>
      {children}
    </ModalContext.Provider>
  );
};

export const useModalContext = () => useContext(ModalContext);

export default ModalProvider;
