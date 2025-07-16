import { useState } from "react";
import API from "../api"

export const AuthorSearch = () => {
const [query, setQuery] = useState("");
const [results, setResults] = useState([]);
const [loading, setLoading] = useState(false);
const [error, setError] = useState("");

const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError("");
    setResults([]);

    try {
      const res = await API.get(`/authors/search/${query}`);
      setResults(res.data);
    } catch (err) {
      console.error(err);
      setError("No authors found");
    } finally {
      setLoading(false);
    }
};

return (
    <>
      <h2>Search Authors</h2>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Author name"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {loading && <p>Loading…</p>}
      {error && <p>{error}</p>}

      {results.length > 0 && (
        <ul>
          {results.map((author) => (
            <li key={author._id}>
              <strong>{author.name}</strong>
              <ul>
                {author.books.map((book) => (
                  <li key={book._id}>{book.title} (ISBN: {book.isbn})</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}