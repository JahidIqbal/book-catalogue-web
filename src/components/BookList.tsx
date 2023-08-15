// src/components/BookList.tsx
import React from 'react';
import { useGetBooksQuery } from '../redux/api/booksApi';
import Book from './Book';

const BookList: React.FC = () => {
  const { data: books, isLoading, isError } = useGetBooksQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading books.</div>;
  }

  return (
    <div className="row">
      {books ? (
        books.map((book) => (
          <Book
            key={book._id}
            title={book.title}
            author={book.Author}
            genre={book.Genre}
            publicationDate={book.PublicationDate}
          />
        ))
      ) : (
        <div>No books available.</div>
      )}
    </div>
  );
};

export default BookList;
