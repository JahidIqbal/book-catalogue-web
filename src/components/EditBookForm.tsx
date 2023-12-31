import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetSingleBookQuery, useEditBookMutation, useGetBooksQuery } from '../redux/api/booksApi';

const EditBookForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: bookDetails, refetch: refetchBookDetails, isLoading, isError } = useGetSingleBookQuery(id!);
  const { refetch: refetchBooks } = useGetBooksQuery();


  const [editBookMutation] = useEditBookMutation();

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [genre, setGenre] = useState('');
  const [publicationDate, setPublicationDate] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (bookDetails) {
      setTitle(bookDetails.title);
      setAuthor(bookDetails.Author);
      setGenre(bookDetails.Genre);
      setPublicationDate(bookDetails.PublicationDate);
    }
  }, [bookDetails]);

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !author || !genre || !publicationDate) {
      return;
    }

    try {
      setIsSubmitting(true);
      await editBookMutation({
        id: id!,
        updatedBook: {
          title,
          Author: author,
          Genre: genre,
          PublicationDate: publicationDate,
        },
      });
      setIsSubmitting(false);
      alert('Book updated successfully!');

      // Refetch the book details after a successful update
      refetchBookDetails();
      refetchBooks(); 
      navigate(`/books/${id}`);
    } catch (error) {
      console.error('Failed to update book', error);
      setIsSubmitting(false);
      alert('Error updating book. Please try again.');
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !bookDetails) {
    return <div>Error loading book details.</div>;
  }

  return (
    <div className="container mt-5">
      <h2>Edit Book</h2>
      <form onSubmit={handleEditSubmit}>
        <div className="mb-3">
          <label className="form-label">Title:</label>
          <input type="text" className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div className="mb-3">
          <label className="form-label">Author:</label>
          <input type="text" className="form-control" value={author} onChange={(e) => setAuthor(e.target.value)} />
        </div>
        <div className="mb-3">
          <label className="form-label">Genre:</label>
          <input type="text" className="form-control" value={genre} onChange={(e) => setGenre(e.target.value)} />
        </div>
        <div className="mb-3">
          <label className="form-label">Publication Date:</label>
          <input
            type="text"
            className="form-control"
            value={publicationDate}
            onChange={(e) => setPublicationDate(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
          {isSubmitting ? 'Updating...' : 'Update Book'}
        </button>
      </form>
    </div>
  );
};

export default EditBookForm;
