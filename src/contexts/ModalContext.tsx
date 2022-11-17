import { useState, createContext, ReactNode, useContext, SetStateAction, Dispatch } from 'react';
import Message from '~/components/Message';
import RootModal from '~/components/modals';
import PostModal from '~/components/modals/PostModal';

export const MODAL_TYPES = {
  POST_CREATOR: 'POST_CREATOR',
  NEW_MESSAGE: 'NEW_MESSAGE'
} as const;

export type ModalType = keyof typeof MODAL_TYPES;

const MODALS = {
  [MODAL_TYPES.POST_CREATOR]: <PostModal key={MODAL_TYPES.POST_CREATOR} />,
  [MODAL_TYPES.NEW_MESSAGE]: <Message key={MODAL_TYPES.NEW_MESSAGE} />
} as const;

interface ModalContextTypes {
  modalsTypes: ModalType[];
  showModal: (modalType: ModalType) => void;
  hideModal: (modalType: ModalType) => void;
  isShow: boolean;
  setIsShow: Dispatch<SetStateAction<boolean>>;
}

interface ModalProviderProp {
  children: ReactNode;
}

const ModalContext = createContext<ModalContextTypes>({
  modalsTypes: [],
  showModal: () => null,
  hideModal: () => null,
  isShow: false,
  setIsShow: () => null
});

const ModalProvider = ({ children }: ModalProviderProp) => {
  const [modalTypes, setModalTypes] = useState<ModalType[]>([]);

  const [isShow, setIsShow] = useState<boolean>(false);

  const showModal = (modalType: ModalType) => {
    setModalTypes([...modalTypes, modalType]);
    setIsShow(!isShow);
  };

  const hideModal = (modalType: ModalType) => {
    setModalTypes(modalTypes.filter((type) => type !== modalType));
    setIsShow(false);
  };

  const modalsTypes = [...new Set(modalTypes)];
  return (
    <ModalContext.Provider value={{ isShow, setIsShow, modalsTypes, showModal, hideModal }}>
      <RootModal>{modalsTypes.map((modalType) => MODALS[modalType])}</RootModal>
      {children}
    </ModalContext.Provider>
  );
};

export const useModalContext = () => useContext(ModalContext);

export default ModalProvider;
