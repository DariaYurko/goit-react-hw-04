import ImageCard from '../ImageCard/ImageCard';
import css from './ImageGallery.module.css'

function ImageGallery({ pictures, onOpenModal, setImageProps }) {
  return (
    <ul className={css.gallaryList}>
      {pictures.map(picture => {
        return (
          <li
            key={picture.id}
            className={css.gallaryItem}
          >
            <ImageCard
              picture={picture}
              onOpenModal={onOpenModal}
              setImageProps={setImageProps}
            />
          </li>
        );
      })}
    </ul>
  );
}

export default ImageGallery;
