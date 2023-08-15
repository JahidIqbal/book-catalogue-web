// src/components/BookList.tsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useGetBooksQuery } from '../redux/api/booksApi';
import { setSearch } from '../redux/features/searchSlice';
import { setGenreFilter, setPublicationYearFilter } from '../redux/features/filterSlice';
import { RootState } from '../redux/store';
import Book from './Book';
import { IBook } from '../types/globalTypes';

const BookList: React.FC = () => {
  const { data: books, isLoading, isError } = useGetBooksQuery();
  const search = useSelector((state: RootState) => state.search);
  const filter = useSelector((state: RootState) => state.filter);
  const dispatch = useDispatch();
  
  const filteredBooks = books?.filter((book: IBook) => {
    const titleMatch = book.title.toLowerCase().includes(search.toLowerCase());
    const authorMatch = book.Author.toLowerCase().includes(search.toLowerCase());
    const genreMatch = filter.genre === '' || book.Genre.toLowerCase() === filter.genre.toLowerCase();
    const publicationYearMatch =
      filter.publicationYear === '' ||
      book.PublicationDate.includes(filter.publicationYear);

    return (titleMatch || authorMatch) && genreMatch && publicationYearMatch;
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading books.</div>;
  }

  return (
    <div className="book-list">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by title or author..."
          value={search}
          onChange={(e) => dispatch(setSearch(e.target.value))}
        />
        <select
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
          placeholder="Publication Year"
          value={filter.publicationYear}
          onChange={(e) => dispatch(setPublicationYearFilter(e.target.value))}
        />
      </div>
      {filteredBooks?.map((book: IBook) => (
        <Book
          key={book._id}
          title={book.title}
          author={book.Author}
          genre={book.Genre}
          publicationDate={book.PublicationDate}
        />
      ))}
    </div>
  );
};

export default BookList;
