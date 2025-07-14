import { useState } from "react";
import API from "../api";

export const AddBook = () => {
  const [form, setForm] = useState({ title: "", authors: [], publishedDate: "", isbn: "" });
  const [authorName, setAuthorName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await API.post("/authors", { name: authorName });
    const authorId = res.data._id;

    await API.post("/books", { ...form, authors: [authorId] });
    alert("Book added");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Book</h2>
      <input placeholder="Title" onChange={(e) => setForm({ ...form, title: e.target.value })} />
      <input placeholder="Author Name" onChange={(e) => setAuthorName(e.target.value)} />
      <input placeholder="Published Date" onChange={(e) => setForm({ ...form, publishedDate: e.target.value })} />
      <input placeholder="ISBN" onChange={(e) => setForm({ ...form, isbn: e.target.value })} />
      <button>Add</button>
    </form>
  );
}