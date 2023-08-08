import React, { useEffect, useState } from "react";

interface Book {
  title: string;
  Author: string;
  Genre: string;
  PublicationDate: string;
  Reviews: number;
}

const BookList = () => {
  const [data, setData] = useState<Book[]>([]);

  useEffect(() => {
    fetch("/data.json") // Updated the fetch call to use the correct file path
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  // Conditional rendering
  if (!data || data.length === 0) {
    return <div>Loading...</div>; // Display a loading message
  }

  return (
    <div className="row">
      {data.map((book, index) => (
        <div className="col-sm-6 col-md-4 col-lg-3 mb-4" key={index}>
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">{book.title}</h5>
              <p className="card-text">
                <strong>Author:</strong> {book.Author}
              </p>
              <p className="card-text">
                <strong>Genre:</strong> {book.Genre}
              </p>
              <p className="card-text">
                <strong>Publication Date:</strong> {book.PublicationDate}
              </p>
              <p className="card-text">
                <strong>Reviews:</strong> {book.Reviews}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BookList;


/*
import React, { useState } from 'react';
import { useGetBooksQuery } from '../redux/api/booksApi';

const BookList: React.FC = () => {
  const { data: books } = useGetBooksQuery();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [selectedYear, setSelectedYear] = useState<number | ''>('');

  const filteredBooks = books?.filter((book) =>
    book.title.includes(searchTerm) &&
    (selectedGenre === '' || book.genre === selectedGenre) &&
    (selectedYear === '' || book.publicationYear === selectedYear)
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Search by title, author, or genre"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <select
        value={selectedGenre}
        onChange={(e) => setSelectedGenre(e.target.value)}
      >
        <option value="">All Genres</option>
        </select>
        <input
          type="number"
          placeholder="Publication Year"
          value={selectedYear}
          onChange={(e) => setSelectedYear(Number(e.target.value) || '')}
        />
        <div className="row">
          {filteredBooks?.map((book, index) => (
            <div className="col-sm-6 col-md-4 col-lg-3 mb-4" key={index}>
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{book.title}</h5>
                  <p className="card-text">
                    <strong>Author:</strong> {book.author}
                  </p>
                  <p className="card-text">
                    <strong>Genre:</strong> {book.genre}
                  </p>
                  <p className="card-text">
                    <strong>Publication Date:</strong> {book.publicationYear}
                  </p>
                  <p className="card-text">
                    <strong>Reviews:</strong> {book.Reviews}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default BookList;
  

*/