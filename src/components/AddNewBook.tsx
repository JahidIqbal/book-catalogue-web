import React, { useState } from 'react';
import { useAddBookMutation, useGetBooksQuery } from '../redux/api/booksApi';
import { IBook } from '../types/globalTypes';

interface NewBook {
  title: string;
  Author: string;
  Genre: string;
  PublicationDate: string;
}

const AddBookForm = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [genre, setGenre] = useState('');
  const [publicationDate, setPublicationDate] = useState('');

  const { refetch } = useGetBooksQuery();
  const [addBookMutation, { isLoading }] = useAddBookMutation();

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const newBook: NewBook = {
      title: title,
      Author: author,
      Genre: genre,
      PublicationDate: publicationDate,
    };

    try {
      await addBookMutation(newBook as IBook); // Type assertion to IBook

      setTitle('');
      setAuthor('');
      setGenre('');
      setPublicationDate('');

      // Show a simple alert notification
      alert('Book added successfully!');

      refetch();
    } catch (error) {
      // Show an error alert notification
      alert('Failed to add book.');
    }
  };

  return (
    <div className="container">
      <h2 className="mb-4">Add a New Book</h2>
      <form onSubmit={handleSubmit} className="row g-3">
        <div className="col-md-6 mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="col-md-6 mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />
        </div>
        <div className="col-md-6 mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Genre"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            required
          />
        </div>
        <div className="col-md-6 mb-3">
          <input
            type="date"
            className="form-control"
            value={publicationDate}
            onChange={(e) => setPublicationDate(e.target.value)}
            required
          />
        </div>
        <div className="col-12">
          <button type="submit" className="btn btn-primary" disabled={isLoading}>
            {isLoading ? 'Adding...' : 'Add Book'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBookForm;
