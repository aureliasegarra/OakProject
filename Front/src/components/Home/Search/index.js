// == Import npm
import React from 'react';

// == Import
import './styles.scss';
import { FaSearch } from 'react-icons/fa';

// == Composant
const Search = () => (
  <section className="home-search">
    <form action="" className="home-search__form">
      <input className="home-search__input" type="text" name="search" id="search" placeholder="Recherchez un livre" />
      <button className="home-search__button" type="submit">
        <FaSearch className="home-search__icon" />
      </button>
    </form>
  </section>
);

// == Export
export default Search;
