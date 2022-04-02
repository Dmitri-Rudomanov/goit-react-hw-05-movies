import { useState } from 'react';
import PropTypes from 'prop-types';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import s from './SearchBar.module.css';

export default function MoviesPage({ onHandleSubmit }) {
  const [query, setQuery] = useState('');

  const changeQuery = e => {
    e.preventDefault();
    setQuery(e.currentTarget.value.toLowerCase());
  };
  const handleSubmit = e => {
    e.preventDefault();

    if (query.trim() === '') {
      toast.info('Please enter your search query');
      return;
    }
    onHandleSubmit(query);
    setQuery('');
  };

  return (
    <>
      <form onSubmit={handleSubmit} className={s.form__group}>
        <input
          onChange={changeQuery}
          type="text"
          id="name"
          className={s.form__input}
          value={query}
          autoComplete="off"
          autoFocus
          placeholder="Enter movie name..."
        />

        <button type="submit" className={s.search}>
          Search
        </button>
      </form>
      <ToastContainer autoClose={2000} />
    </>
  );
}

MoviesPage.propTypes = {
  onHandleSubmit: PropTypes.func.isRequired,
};
