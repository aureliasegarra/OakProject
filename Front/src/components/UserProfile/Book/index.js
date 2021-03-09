// == Import npm
import React from 'react';
import PropTypes from 'prop-types';

// == Import
import './styles.scss';

import { TiDelete as DeleteBookIcon } from 'react-icons/ti';

// == Composant
const Book = ({
  title, id, deleteBook,
}) => {
  const handleClick = () => {
    deleteBook(id);
  };

  return (
    <div className="userprofile-list__bookcard">
      <p>{title}</p>
      <DeleteBookIcon onClick={handleClick} />
    </div>
  );
};

Book.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  deleteBook: PropTypes.func,
};

Book.defaultProps = {
  deleteBook: () => {},
};

// == Export
export default Book;