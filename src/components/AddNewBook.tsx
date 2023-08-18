import React, { useState } from 'react';
import { useAddBookMutation, useGetBooksQuery } from '../redux/api/booksApi';

const AddBookForm = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [genre, setGenre] = useState('');
  const [publicationDate, setPublicationDate] = useState('');

  const { refetch } = useGetBooksQuery();
  const [addBookMutation,{isLoading}] = useAddBookMutation();

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    const newBook = {
      title: title,
      Author: author,
      Genre: genre,
      PublicationDate: publicationDate,
    };

    try {
      await addBookMutation(newBook);

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
        <div>
            <h2>Add a New Book</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Author"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Genre"
                    value={genre}
                    onChange={(e) => setGenre(e.target.value)}
                    required
                />
                <input
                    type="date"
                    value={publicationDate}
                    onChange={(e) => setPublicationDate(e.target.value)}
                    required
                />
                <button type="submit" disabled={isLoading}>
                    {isLoading ? 'Adding...' : 'Add Book'}
                </button>
            </form>
        </div>
    );
};

export default AddBookForm;
