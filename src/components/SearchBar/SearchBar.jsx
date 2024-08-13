import css from './SearchBar.module.css';
import { sendNotifyEmptyField } from '../../toster';
import { useEffect } from 'react';

function SearchBar({ setQuery, setCurrentPage, onSearch, pictures }) {
  const handleSubmit = event => {
    event.preventDefault();

    const form = event.target;
    const queryValue = form.elements.query.value.trim();

    if (queryValue === '') {
      sendNotifyEmptyField();
      return;
    }

    setQuery(queryValue);
    setCurrentPage(1);
    onSearch();

    form.reset();
  };


  return (
    <header>
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
