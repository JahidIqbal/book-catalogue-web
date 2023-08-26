import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useGetBooksQuery } from '../redux/api/booksApi';
import { setSearch } from '../redux/features/searchSlice';
import { setGenreFilter, setPublicationYearFilter } from '../redux/features/filterSlice';
import { RootState } from '../redux/store';
import { IBook } from '../types/globalTypes';
import { Link } from 'react-router-dom';

const BookList: React.FC = () => {
  const { data: books, isLoading, isError } = useGetBooksQuery();
  const search = useSelector((state: RootState) => state.search);
  const filter = useSelector((state: RootState) => state.filter);
  const dispatch = useDispatch();

  const filteredBooks = books?.filter((book: IBook) => {
    const titleMatch = book.title && book.title.toLowerCase().includes(search.toLowerCase());
    const authorMatch = book.Author && book.Author.toLowerCase().includes(search.toLowerCase());
    const genreMatch = filter.genre === '' || (book.Genre && book.Genre.toLowerCase() === filter.genre.toLowerCase());
    const publicationYearMatch =
      filter.publicationYear === '' ||
      (book.PublicationDate && book.PublicationDate.includes(filter.publicationYear));

    return (titleMatch || authorMatch) && genreMatch && publicationYearMatch;
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading books.</div>;
  }

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col">
          <div className="search-bar mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by title or author..."
              value={search}
              onChange={(e) => dispatch(setSearch(e.target.value))}
            />
            <select
              className="form-select mt-2"
              value={filter.genre}
              onChange={(e) => dispatch(setGenreFilter(e.target.value))}
            >
              <option value="">All Genres</option>
              <option value="Fiction">Fiction</option>
              <option value="Dystopian">Dystopian</option>
              <option value="Romance">Romance</option>
              <option value="Fantasy">Fantasy</option>
            </select>
            <input
              type="text"
              className="form-control mt-2"
              placeholder="Publication Year"
              value={filter.publicationYear}
              onChange={(e) => dispatch(setPublicationYearFilter(e.target.value))}
            />
          </div>
          <div className="book-table">
            <table className="table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Author</th>
                  <th>Genre</th>
                  <th>Publication Date</th>
                  <th>Details</th>
                </tr>
              </thead>
              <tbody>
                {filteredBooks?.slice(0, 10).map((book: IBook) => (
                  <tr key={book._id}>
                    <td>{book.title}</td>
                    <td>{book.Author}</td>
                    <td>{book.Genre}</td>
                    <td>{book.PublicationDate}</td>
                    <td>
                      <Link to={`/books/${book._id}`} className="btn btn-primary">
                        See Details
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookList;
