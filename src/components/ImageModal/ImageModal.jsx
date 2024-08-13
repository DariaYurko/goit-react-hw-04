import css from './ImageModal.module.css';
import { useEffect } from 'react';

const ImageModal = ({ onCloseModal, imageProps }) => {
  //
  // ----------- Actions by key 'Escape'------------------------
  useEffect(() => {
    const handleKeyDown = event => {
      if (event.code === 'Escape') {
        onCloseModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onCloseModal]);
  // ------------------------------------------------------------
  //
  //
  // ----------- Actions by click on backdrop--------------------
  const handleBackdropClick = event => {
    if (event.target === event.currentTarget) {
      onCloseModal();
    }
  };
  // ------------------------------------------------------------
  //
  //
  return (
    <div onClick={handleBackdropClick} className={css.backdrop}>
      <div className={css.modal}>
        <img src={imageProps.url} alt={imageProps.alt} className={css.image} />
      </div>
    </div>
  );
};

export default ImageModal;
