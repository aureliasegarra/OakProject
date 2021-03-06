/* eslint-disable jsx-a11y/label-has-associated-control */
// == Import npm
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// == Import
import './styles.scss';

import { TiDelete as DeleteBookIcon, TiEye as SeeDetailsIcon } from 'react-icons/ti';
import { CgMoveTask } from 'react-icons/cg';

// == Composant
const Book = ({
  title,
  id,
  publicApiId,
  deleteBook,
  moveBook,
  lists,
  listId,
}) => {
  const [isMovingModalOpen, setIsMovingModalOpen] = useState(false);

  const handleClick = () => {
    deleteBook(id, listId);
  };

  const handleModalClick = () => {
    setIsMovingModalOpen(!isMovingModalOpen);
  };

  const handleChange = (event) => {
    moveBook(id, event.target.value);
    setIsMovingModalOpen(!isMovingModalOpen);
  };

  return (
    <div className="userprofile-list__bookcard">
      <p>{title.split('').splice(0, 28).join('')}...</p>
      <div className="book-button__container">
        {!isMovingModalOpen && (
          <CgMoveTask className="book-button" onClick={handleModalClick} />
        )}
        {isMovingModalOpen && (
          <form>
            <label htmlFor="listes">Choisir une liste</label>
            <select className="input-select-list" onChange={handleChange} name="listes">
              <option>...</option>
              {lists.map((list) => (
                <option
                  key={list.id}
                  id={list.id}
                  value={list.id}
                >
                  {list.label}
                </option>
              ))}
            </select>
          </form>
        )}
        <Link to={`/book/${publicApiId}`}>
          <SeeDetailsIcon className="book-button" />
        </Link>
        <DeleteBookIcon className="book-button" onClick={handleClick} />
      </div>
    </div>
  );
};

Book.propTypes = {
  id: PropTypes.number.isRequired,
  publicApiId: PropTypes.string.isRequired,
  listId: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  lists: PropTypes.array,
  deleteBook: PropTypes.func,
  moveBook: PropTypes.func,
};

Book.defaultProps = {
  deleteBook: () => {},
  moveBook: () => {},
  lists: [],
};

// == Export
export default Book;
