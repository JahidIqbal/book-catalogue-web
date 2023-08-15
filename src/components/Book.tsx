import React from 'react';

interface BookProps {
  title: string;
  author: string;
  genre: string;
  publicationDate: string;
}

const Book: React.FC<BookProps> = ({
  title,
  author,
  genre,
  publicationDate,
}) => {
  return (
    <div className="col-md-4 mb-4">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">Author: {author}</p>
          <p className="card-text">Genre: {genre}</p>
          <p className="card-text">Publication Date: {publicationDate}</p>
        </div>
      </div>
    </div>
  );
};

export default Book;
