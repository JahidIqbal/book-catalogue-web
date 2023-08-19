import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetSingleBookQuery } from '../redux/api/booksApi';

const BookDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const { data: bookDetails, isLoading, isError } = useGetSingleBookQuery(id!);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !bookDetails) {
    return <div>Error loading book details.</div>;
  }

  return (
    <div>
      <h2>Book Details</h2>
      <div>
        <h3>Title: {bookDetails.title}</h3>
        <p>Author: {bookDetails.Author}</p>
        <p>Genre: {bookDetails.Genre}</p>
        <p>Publication Date: {bookDetails.PublicationDate}</p>
      </div>
      <div>
        <button>Edit</button>
        <button>Delete</button>
      </div>
    </div>
  );
};

export default BookDetailPage;
