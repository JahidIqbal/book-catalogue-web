// import React, { useState } from 'react';
// import { useAddBookMutation } from '../redux/api/booksApi';

// const AddNewBook: React.FC = () => {
//   const [title, setTitle] = useState('');
//   const [author, setAuthor] = useState('');
//   const [genre, setGenre] = useState('');
//   const [publicationYear, setPublicationYear] = useState<number | ''>('');

//   const [addBook, { isLoading }] = useAddBookMutation();

//   const handleSubmit = () => {
//     addBook({
//       title,
//       author,
//       genre,
//       publicationYear,
//     });
//   };

//   return (
//     <div>
//       <input
//         type="text"
//         placeholder="Title"
//         value={title}
//         onChange={(e) => setTitle(e.target.value)}
//       />
//       {/* Other input fields for author, genre, publicationYear */}
//       <button onClick={handleSubmit} disabled={isLoading}>
//         Add New Book
//       </button>
//     </div>
//   );
// };

// export default AddNewBook;
