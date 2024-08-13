import css from './ImageCard.module.css'

function ImageCard({ picture, setImageProps, onOpenModal }) {
  
  function handleClick() {
    onOpenModal();

    setImageProps({
      url: picture.urls.regular,
      alt: picture.alt_description,
    });
  }

  return (
    <div className={css.pictureThumb} onClick={handleClick}>
      <img
        src={picture.urls.small}
        alt={picture.alt_description}
        className={css.picture}
      />
    </div>
  );
}

export default ImageCard;
