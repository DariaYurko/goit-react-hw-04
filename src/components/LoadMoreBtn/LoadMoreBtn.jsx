import css from './LoadMoreBtn.module.css';

function LoadMoreBtn({ onLoadMore }) {
  
  const handleClick = () => {
    onLoadMore()
  };

  return (
    <button onClick={handleClick} className={css.button} type="button">
      Load more content
    </button>
  );
}

export default LoadMoreBtn;