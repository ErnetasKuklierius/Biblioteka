import { useState } from 'react'
import API from "../api";
import { EditBook } from "./editBook"

export const BookList = ({ books, refresh }) => {
  const [editBookId, setEditBookId] = useState(null);
  const isAuth = !!localStorage.getItem("token");

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this book?")) return;
    await API.delete(`/books/${id}`)
    refresh();
  }
  return (
    <>
      <h1>Books</h1>
      <ul>
        {books.map((book) => (
          <li key={book._id}>
            {editBookId === book._id ? (
              <EditBook
                book={book}
                onClose={() => setEditBookId(null)}
                onSave={refresh}
              />
            ) : (
              <>
                <strong>{book.title}</strong> — Authors:{" "}
                {book.authors.map((a) => a.name).join(", ")} — ISBN: {book.isbn}
                {isAuth && (
                  <>
                    <button onClick={() => setEditBookId(book._id)}>Edit</button>
                    <button onClick={() => handleDelete(book._id)}>Delete</button>
                  </>
                )}
              </>
            )}
          </li>
        ))}
      </ul>
    </>
  );
}
