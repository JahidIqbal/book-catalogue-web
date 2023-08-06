// App.tsx
import React from 'react'; // Add this line to import React
import Header from './components/Header';
import Footer from './components/Footer';
import BookList from './components/BookList';

function App() {
  return (
    <div className="App">
      <Header />
      <BookList />
      <Footer />
    </div>
  );
}

export default App;
