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

  const { data: bookDetails, isLoading: bookLoading, isError: bookError } = useGetSingleBookQuery(id!);
  const [deleteBookMutation] = useDeleteBookMutation();
  const [addReviewMutation] = useAddReviewMutation();
  const { data: reviews, refetch: refetchReviews, isLoading: reviewsLoading } = useGetReviewsQuery(id!);

  const [review, setReview] = useState('');
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);

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
      setIsSubmittingReview(true); // Set loading state
      await addReviewMutation({ bookId: id!, review: review });
      setReview('');
      setIsSubmittingReview(false); // Clear loading state
      alert('Review submitted successfully!');

      // After adding the review, refetch the reviews to include the new review
      refetchReviews();
    } catch (error) {
      console.error('Failed to submit review', error);
      setIsSubmittingReview(false); // Clear loading state on error
    }
  };

  if (bookLoading) {
    return <div>Loading...</div>;
  }

  if (bookError || !bookDetails) {
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
          {reviewsLoading ? (
            <div>Loading reviews...</div>
          ) : (
            <ul>
              {reviews?.map((review: string, index: number) => (
                <li key={index}>{review}</li>
              ))}
            </ul>
          )}
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
          <button type="submit" disabled={isSubmittingReview}>
            {isSubmittingReview ? 'Submitting...' : 'Submit Review'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookDetailPage;
