import React from 'react'

export const BookList = ({ books }) => {
  return (
    <div>
      <h2>Books</h2>
      <ul>
        {books.map((book) => (
          <li key={book._id}>
            <strong>{book.title}</strong> — Authors:{" "}
            {book.authors.map((a) => a.name).join(", ")} — ISBN: {book.isbn}
          </li>
        ))}
      </ul>
    </div>
  );
}
