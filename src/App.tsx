import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import BookList from './components/BookList';
import Login from './pages/Login';
import Registration from './pages/Registration';
import AddBookForm from './components/AddNewBook';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<BookList />} />
        <Route path="/allbooks" element={<BookList />} />
        <Route path="/addnewbook" element={<AddBookForm />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/signup" element={<Registration />} />
        {/* Add more routes here */}
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
