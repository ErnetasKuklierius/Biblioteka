import { useEffect, useState } from 'react'
import API from "../api";

export const Authors = () => {
  const [authors, setAuthors] = useState([]);
  const [editAuthorId, setEditAuthorId] = useState(null);
  const [form, setForm] = useState({ name: "" });
  const [newAuthorName, setNewAuthorName] = useState("");
  const isAuth = !!localStorage.getItem("token");

  const loadAuthors = () => {
    API.get("/authors").then((res) => setAuthors(res.data))
  }

    useEffect(() => {
        loadAuthors();
    }, [])

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this author?")) return;
    await API.delete(`/authors/${id}`);
    loadAuthors();
  };

  const handleEdit = (author) => {
    setEditAuthorId(author._id);
    setForm({ name: author.name });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    await API.put(`/authors/${editAuthorId}`, form);
    setEditAuthorId(null);
    loadAuthors();
  };

  const handleAddAuthor = async () => {
    if (!newAuthorName.trim()) return;
    await API.post("/authors", { name: newAuthorName });
    setNewAuthorName("");
    loadAuthors();
  };
  return (
    <>
    <h1>Authors</h1>

      {isAuth && (
        <div style={{ marginBottom: "1rem" }}>
          <input
            placeholder="New author name"
            value={newAuthorName}
            onChange={(e) => setNewAuthorName(e.target.value)}
          />
          <button onClick={handleAddAuthor}>Add Author</button>
        </div>
      )}

      <ul>
        {authors.map((a) => (
          <li key={a._id}>
            {editAuthorId === a._id ? (
              <form onSubmit={handleEditSubmit} style={{ display: "inline" }}>
                <input
                  value={form.name}
                  onChange={(e) => setForm({ name: e.target.value })}
                />
                <button type="submit">Save</button>
                <button type="button" onClick={() => setEditAuthorId(null)}>
                  Cancel
                </button>
              </form>
            ) : (
              <>
                <strong>{a.name}</strong> — Books:{" "}
                {a.books.map((b) => b.title).join(", ")}
                {isAuth && (
                  <>
                    <button onClick={() => handleEdit(a)}>Edit</button>
                    <button onClick={() => handleDelete(a._id)}>Delete</button>
                  </>
                )}
              </>
            )}
          </li>
        ))}
      </ul>
    </>
  )
}
