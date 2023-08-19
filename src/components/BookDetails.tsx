import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetSingleBookQuery, useDeleteBookMutation } from '../redux/api/booksApi';

const BookDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: bookDetails, isLoading, isError } = useGetSingleBookQuery(id!);

  const [deleteBookMutation] = useDeleteBookMutation(); // Get the mutation function

  const handleEditClick = () => {
    navigate(`/edit-book/${id}`);
  };

  const handleDeleteClick = async () => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      try {
        await deleteBookMutation(id!); // Call the deleteBook mutation
        navigate('/book-list');
      } catch (error) {
        console.error('Failed to delete book', error);
      }
    }
  };

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
        <button onClick={handleEditClick}>Edit</button>
        <button onClick={handleDeleteClick}>Delete</button>
      </div>
    </div>
  );
};

export default BookDetailPage;
