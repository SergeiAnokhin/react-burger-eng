/* eslint-disable no-unused-vars */
import React from 'react';
import styles from './modal-overlay.module.css';

type TCloseModal = {
  closeModal: (e: React.MouseEvent) => void;
};

const ModalOverlay = ({ closeModal }: TCloseModal) => (
  <div className={styles.overlay} onClick={closeModal} />
);

export default ModalOverlay;
