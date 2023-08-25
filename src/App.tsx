import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import BookList from './components/BookList';
import Login from './pages/Login';
import Registration from './pages/Registration';
import AddBookForm from './components/AddNewBook';
import BookDetailPage from './components/BookDetails';
import EditBookForm from './components/EditBookForm';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<BookList />} />
        <Route path="/allbooks" element={<BookList />} />
        <Route path="/addnewbook" element={<AddBookForm />} />
        <Route path="/books/:id" element={<BookDetailPage />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/signup" element={<Registration />} />
        <Route path="/books/:id/edit" element={<EditBookForm />} /> {/* Add this route */}
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
