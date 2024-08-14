import css from './SearchBar.module.css';
import { sendNotifyEmptyField } from '../../toster';

function SearchBar({ onSearch }) {
  const handleSubmit = event => {
    event.preventDefault();

    const form = event.target;
    const queryValue = form.elements.query.value.trim();

    if (queryValue === '') {
      sendNotifyEmptyField();
      return;
    }

    onSearch(queryValue);

    form.reset();
  };


  return (
    <header className={css.header}>
      <form onSubmit={handleSubmit} className={css.form}>
        <input
          className={css.input}
          type="text"
          name="query"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
        <button type="submit" className={css.button}>
          Search
        </button>
      </form>
    </header>
  );
}

export default SearchBar;
