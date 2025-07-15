import { useState } from "react";
import API from "../api";

export const EditBook = ( { book, onClose, onSave }) => {
    const [form, setForm] = useState({ 
        title: book.title,
        publishedDate: book.publishedDate,
        isbn: book.isbn,
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        await API.put(`/books/${book._id}`, form)
        onSave();
        onClose();
    }
  return (
    <>
    <form onSubmit={handleSubmit} style={{ border: "1px solid #ccc", padding: "1rem", margin: "1rem 0" }}>
      <h3>Edit Book: {book.title}</h3>
      <input
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
        placeholder="Title"
      />
      <input
        value={form.publishedDate}
        onChange={(e) => setForm({ ...form, publishedDate: e.target.value })}
        placeholder="Published Date"
      />
      <input
        value={form.isbn}
        onChange={(e) => setForm({ ...form, isbn: e.target.value })}
        placeholder="ISBN"
      />
      <div>
        <button type="submit">Save</button>
        <button type="button" onClick={onClose}>Cancel</button>
      </div>
    </form>
    </>
  )
}
