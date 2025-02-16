// Frontend (React.js)
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [books, setBooks] = useState([]);
  const [newBook, setNewBook] = useState({ title: '', author: '', isbn: '', available: true });

  useEffect(() => {
    axios.get('http://localhost:5000/books').then((response) => {
      setBooks(response.data);
    });
  }, []);

  const addBook = () => {
    axios.post('http://localhost:5000/books', newBook).then((response) => {
      setBooks([...books, response.data]);
    });
  };

  const deleteBook = (id) => {
    axios.delete(`http://localhost:5000/books/${id}`).then(() => {
      setBooks(books.filter((book) => book._id !== id));
    });
  };

  return (
    <div>
      <h1>Library Management System</h1>
      <input placeholder="Title" onChange={(e) => setNewBook({ ...newBook, title: e.target.value })} />
      <input placeholder="Author" onChange={(e) => setNewBook({ ...newBook, author: e.target.value })} />
      <input placeholder="ISBN" onChange={(e) => setNewBook({ ...newBook, isbn: e.target.value })} />
      <button onClick={addBook}>Add Book</button>
      <ul>
        {books.map((book) => (
          <li key={book._id}>
            {book.title} by {book.author} ({book.isbn})
            <button onClick={() => deleteBook(book._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
