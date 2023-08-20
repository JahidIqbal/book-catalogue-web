import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  useGetSingleBookQuery,
  useDeleteBookMutation,
  useAddReviewMutation,
  useGetReviewsQuery,
} from '../redux/api/booksApi';

const BookDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: bookDetails, isLoading, isError } = useGetSingleBookQuery(id!);
  const [deleteBookMutation] = useDeleteBookMutation();
  const [addReviewMutation] = useAddReviewMutation();
  const { data: reviews } = useGetReviewsQuery(id!);

  const [review, setReview] = useState('');

  const handleEditClick = () => {
    navigate(`/edit-book/${id}`);
  };

  const handleDeleteClick = async () => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      try {
        await deleteBookMutation(id!);
        navigate('/book-list');
      } catch (error) {
        console.error('Failed to delete book', error);
      }
    }
  };

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (review.trim() === '') {
      return;
    }

    try {
      await addReviewMutation({ bookId: id!, review: review });
      setReview('');
      alert('Review submitted successfully!');
    } catch (error) {
      console.error('Failed to submit review', error);
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
        <div>
        <h3>Reviews</h3>
        <ul>
          {reviews?.map((review: string, index: number) => (
            <li key={index}>{review}</li>
          ))}
        </ul>
      </div>
      </div>
      <div>
        <button onClick={handleEditClick}>Edit</button>
        <button onClick={handleDeleteClick}>Delete</button>
      </div>
      <div>
        <h3>Leave a Review</h3>
        <form onSubmit={handleReviewSubmit}>
          <textarea
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder="Write your review..."
          />
          <button type="submit">Submit Review</button>
        </form>
      </div>
    </div>
  );
};

export default BookDetailPage;
