import { ReactNode, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../modal-overlay/modal-overlay';
import styles from './modal.module.css';

const modalsContainer = document.querySelector('#modals') as HTMLElement;

type TProps = {
  title: string;
  closeModal: () => void;
  children?: ReactNode;
};

const Modal = (props: TProps) => {
  const { closeModal } = props;

  useEffect(() => {
    const onEscKeydown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeModal();
      }
    };
    document.addEventListener('keydown', onEscKeydown);

    return () => {
      document.removeEventListener('keydown', onEscKeydown);
    };
  }, []);

  return ReactDOM.createPortal(
    <>
      <div className={`${styles.modal} p-10`}>
        <h3 className={styles.title}>{props.title}</h3>
        {props.children}
        <div className={styles.closeIcon} onClick={closeModal}>
          <CloseIcon type="primary" />
        </div>
      </div>
      <ModalOverlay closeModal={closeModal} />
    </>,
    modalsContainer
  );
};

export default Modal;
