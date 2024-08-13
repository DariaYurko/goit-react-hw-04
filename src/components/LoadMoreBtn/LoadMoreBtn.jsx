import css from './LoadMoreBtn.module.css';

function LoadMoreBtn({
  currentPage,
  setCurrentPage,
  onLoadMore
}) {
  
  const handleClick = () => {
    setCurrentPage(currentPage + 1);
    onLoadMore()
  };

  return (
    <button onClick={handleClick} className={css.button} type="button">
      Load more content
    </button>
  );
}

export default LoadMoreBtn;