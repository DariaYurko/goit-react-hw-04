import ImageCard from '../ImageCard/ImageCard';
import css from './ImageGallery.module.css'

function ImageGallery({ pictures, openModal, setImageProps }) {
  return (
    <ul className={css.gallaryList}>
      {pictures.map(picture => {
        return (
          <li key={picture.id} className={css.gallaryItem}>
            <ImageCard
              picture={picture}
              openModal={openModal}
              setImageProps={setImageProps}
            />
          </li>
        );
      })}
    </ul>
  );
}

export default ImageGallery;
