import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import c from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

function Modal({ onCloseModal, largeImageURL }) {
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  });

  const handleKeyDown = (e) => {
    if (e.code === 'Escape') {
      onCloseModal();
    }
  };

  const handleBackdropClick = (event) => {
    if (event.currentTarget === event.target) {
      onCloseModal();
    }
  };

  return createPortal(
    <div className={c.Overlay} onClick={handleBackdropClick}>
      <div className={c.Modal}>
        <img src={largeImageURL} alt="" />
      </div>
    </div>,
    modalRoot
  );
}

Modal.propTypes = {
  onCloseModal: PropTypes.func.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};

export default Modal;
