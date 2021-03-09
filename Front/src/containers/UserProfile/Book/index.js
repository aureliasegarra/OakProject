import { connect } from 'react-redux';
import Book from 'src/components/UserProfile/Book';
import { deleteBook } from 'src/actions/userProfile';

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => ({
  deleteBook: (bookId) => dispatch(deleteBook(bookId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Book);
