import { useState } from 'react';
import PropTypes from 'prop-types';
import { ToastContainer, toast } from 'react-toastify';
import c from './Searchbar.module.css';

function Searchbar({ onSubmit }) {
  const [keyword, setKeyword] = useState('');

  const inputHandler = (event) => {
    setKeyword(event.target.value.toLowerCase());
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (keyword.trim() === '') {
      return toast('Введите запрос');
    }

    onSubmit(keyword);
    setKeyword('');
  };

  return (
    <>
      <header className={c.Searchbar}>
        <form className={c.SearchForm} onSubmit={handleSubmit}>
          <button type="submit" className={c.SearchFormButton}>
            <span className={c.SearchFormButtonLabel}>Search</span>
          </button>
          <input
            className={c.SearchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={inputHandler}
            value={keyword}
          />
        </form>
      </header>
      <ToastContainer />
    </>
  );
}
Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
export default Searchbar;
