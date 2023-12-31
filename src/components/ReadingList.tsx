import React, { useState, useEffect } from "react";

const FinishedBooks: React.FC = () => {
  const [finishedBooks, setFinishedBooks] = useState<string[]>([]);
  const [newBook, setNewBook] = useState<string>("");
  const [showAlert, setShowAlert] = useState<boolean>(false);

  useEffect(() => {
    const savedFinishedBooks = localStorage.getItem("finishedBooks");
    if (savedFinishedBooks) {
      setFinishedBooks(JSON.parse(savedFinishedBooks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("finishedBooks", JSON.stringify(finishedBooks));
  }, [finishedBooks]);

  const addFinishedBook = () => {
    if (newBook.trim() !== "") {
      setFinishedBooks([...finishedBooks, newBook]);
      setNewBook("");
      setShowAlert(false);
    }
  };

  const markBookAsFinished = (index: number) => {
    const updatedFinishedBooks = [...finishedBooks];
    updatedFinishedBooks[index] = `${finishedBooks[index]} (Finished)`;
    setFinishedBooks(updatedFinishedBooks);
  };

  const removeBook = (index: number) => {
    const updatedFinishedBooks = finishedBooks.filter((_, i) => i !== index);
    setFinishedBooks(updatedFinishedBooks);
    setShowAlert(true);
  };

  return (
    <div className="container py-5">
      <div className="card p-4 shadow">
        <h2 className="card-title mb-4">Books in Progress & Completed</h2>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Add a book title"
            value={newBook}
            onChange={(e) => setNewBook(e.target.value)}
          />
          <button
            className="btn btn-primary"
            type="button"
            onClick={addFinishedBook}
          >
            Add to Reading List
          </button>
        </div>
        {showAlert && (
          <div className="alert alert-success alert-dismissible fade show" role="alert">
            Book removed successfully!
            <button type="button" className="btn-close" onClick={() => setShowAlert(false)}></button>
          </div>
        )}
        <ul className="list-group mt-4">
          {finishedBooks.map((bookTitle, index) => (
            <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
              <span>{bookTitle}</span>{" "}
              {bookTitle.endsWith(" (Finished)") ? (
                <button className="btn btn-danger btn-sm" onClick={() => removeBook(index)}>Remove</button>
              ) : (
                <>
                  <button className="btn btn-success btn-sm me-2" onClick={() => markBookAsFinished(index)}>Mark Finished</button>{" "}
                  <button className="btn btn-danger btn-sm" onClick={() => removeBook(index)}>Remove</button>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FinishedBooks;
