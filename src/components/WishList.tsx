import React, { useState, useEffect } from "react";

const Wishlist: React.FC = () => {
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [newBook, setNewBook] = useState<string>("");

  // Load wishlist from local storage on component mount
  useEffect(() => {
    const savedWishlist = localStorage.getItem("wishlist");
    if (savedWishlist) {
      setWishlist(JSON.parse(savedWishlist));
    }
  }, []);

  // Save wishlist to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  const addToWishlist = () => {
    if (newBook.trim() !== "") {
      setWishlist([...wishlist, newBook]);
      setNewBook("");
    }
  };

  return (
    <div className="container py-5">
      <div className="card p-4 shadow">
        <h2 className="card-title mb-4">My Wishlist</h2>
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
            onClick={addToWishlist}
          >
            Add to Wishlist
          </button>
        </div>
        <ul className="list-group mt-4">
          {wishlist.map((bookTitle, index) => (
            <li key={index} className="list-group-item">
              {bookTitle}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Wishlist;
