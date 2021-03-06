const db = require('../database');

const listHasbookMapper = {
  addBookToList: async (newBook) => {
    try {
      const { id, list_id, user_id } = newBook;
      const queryList = ` INSERT INTO public.list_has_book (book_id, list_id)
                      VALUES ($1::integer, $2::integer)
                      returning id;`;
      const dataList = [id, list_id];
      await db.query(queryList, dataList);
      const queryBookPosition = ` INSERT INTO public.book_position ("position", book_id, user_id)
                                  VALUES ('0'::integer, $1::integer, $2::integer)
                                  returning id;`;
      const dataBookPosition = [id, user_id];
      await db.query(queryBookPosition, dataBookPosition);
    } catch (error) {
      throw new Error(error);
    }
  },
  deleteBookFromList: async (list_has_book) => {
    const { book_id, list_id, user_id } = list_has_book;
    try {
      // We delete the book from the list
      const queryListHasBook = ` DELETE FROM list_has_book
                            WHERE book_id = $1 AND list_id = $2;`;
      // We delete the book position
      const queryBookPosition = ` DELETE FROM book_position
                                  WHERE book_id = $1 AND user_id = $2;`;
      const dataListHasBook = [book_id, list_id];
      const dataBookPosition = [book_id, user_id];
      await db.query(queryListHasBook, dataListHasBook);
      await db.query(queryBookPosition, dataBookPosition);
    } catch (error) {
      throw new Error(error);
    }
  },
  moveBookToAnotherList: async (list_has_book) => {
    const { book_id, list_id, user_id } = list_has_book;
    try {
      // First we need to find the origin list_id
      const queryToFindOriginListId = `SELECT id
                                      FROM list
                                      WHERE user_id = $1 AND id IN (
                                        SELECT list_id
                                        FROM list_has_book
                                        WHERE book_id IN (
                                          SELECT id
                                          FROM book
                                          WHERE book.id = $2));`;
      const dataToFindOriginListId = [user_id, book_id];
      const { rows } = await db.query(
        queryToFindOriginListId,
        dataToFindOriginListId
      );
      const origin_list_id = rows[0].id;
      // We update the list_id for the book
      const queryListHasBook = ` UPDATE public.list_has_book SET
                                list_id = $3::integer
                                WHERE book_id = $1 AND list_id = $2;`;
      // We reset the book position
      const queryBookPosition = ` UPDATE public.book_position SET
                                  "position" = '0'::integer WHERE
                                  book_id = $1 AND user_id = $2;`;
      const dataListHasBook = [book_id, origin_list_id, list_id];
      const dataBookPosition = [book_id, user_id];
      await db.query(queryListHasBook, dataListHasBook);
      await db.query(queryBookPosition, dataBookPosition);
    } catch (error) {
      throw new Error(error);
    }
  },
  checkIfListBelongsToUser: async (list_has_book) => {
    const { list_id, user_id } = list_has_book;
    try {
      const query = ` SELECT * FROM list WHERE id = $1 AND user_id = $2;`;

      const data = [list_id, user_id];
      const { rows } = await db.query(query, data);
      return rows[0];
    } catch (error) {
      throw new Error(error);
    }
  },
  checkIfBookAlreadyInList: async (list_has_book) => {
    const { list_id, book_id } = list_has_book;
    try {
      const query = ` SELECT *
                      FROM list_has_book
                      WHERE list_id = $1 AND book_id = $2;`;

      const data = [list_id, book_id];
      const { rows } = await db.query(query, data);
      return rows[0];
    } catch (error) {
      throw new Error(error);
    }
  },
};

module.exports = listHasbookMapper;
