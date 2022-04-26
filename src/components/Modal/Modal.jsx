import { useEffect } from 'react';
import { ModalOverlay, ModalContent } from './Modal.styled';
import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#modal-root');

export default function Modal({ onClose, child }) {
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
  });
  const handleKeyDown = e => {
    if (e.code === 'Escape') {
      removeListener();
      onClose();
    }
  };
  const removeListener = e => {
    return window.removeEventListener('keydown', handleKeyDown);
  };
  return createPortal(
    <ModalOverlay>
      <ModalContent>{child}</ModalContent>
    </ModalOverlay>,
    modalRoot
  );
}
