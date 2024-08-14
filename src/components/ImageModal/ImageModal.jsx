import css from './ImageModal.module.css';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const customStyles = {
  content: {
    width: '70%',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    transform: 'translate(-50%, -50%)',
    background: 'rgba(38, 40, 49, 0.968)',
    border: 'none',
    boxShadow: '0px 0px 3px 0px rgba(243, 241, 241, 0.402)',
  },
  overlay: {
    background: 'rgba(38, 40, 49, 0.968)',
  },
};

function ImageModal({ modalIsOpen, closeModal, imageProps }) {
  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <img className={css.picture} src={imageProps.url} alt={imageProps.alt} />
    </Modal>
  );
}

export default ImageModal;
