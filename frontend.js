// Frontend (React.js)
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [books, setBooks] = useState([]);
  const [newBook, setNewBook] = useState({ title: '', author: '', isbn: '', available: true });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/books')
      .then((response) => {
        setBooks(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError('Error fetching books');
        setLoading(false);
      });
  }, []);

  const addBook = () => {
    if (!newBook.title || !newBook.author || !newBook.isbn) {
      alert('All fields are required!');
      return;
    }
    axios.post('http://localhost:5000/books', newBook)
      .then((response) => {
        setBooks([...books, response.data]);
      })
      .catch((err) => {
        setError('Error adding book');
      });
  };

  const deleteBook = (id) => {
    axios.delete(`http://localhost:5000/books/${id}`)
      .then(() => {
        setBooks(books.filter((book) => book._id !== id));
      })
      .catch((err) => {
        setError('Error deleting book');
      });
  };

  if (loading) return <p>Loading books...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Library Management System</h1>
      <input placeholder="Title" value={newBook.title} onChange={(e) => setNewBook({ ...newBook, title: e.target.value })} />
      <input placeholder="Author" value={newBook.author} onChange={(e) => setNewBook({ ...newBook, author: e.target.value })} />
      <input placeholder="ISBN" value={newBook.isbn} onChange={(e) => setNewBook({ ...newBook, isbn: e.target.value })} />
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
