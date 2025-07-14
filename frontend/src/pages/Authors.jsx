import { useEffect, useState } from 'react'
import API from "../api";

export const Authors = () => {
    const [authors, setAuthors] = useState([]);

    useEffect(() => {
        API.get("/authors").then(res => setAuthors(res.data));
    }, [])
  return (
    <>
    <h1>Authors</h1>
      <ul>
        {authors.map(a => (
          <li key={a._id}>
            <strong>{a.name}</strong> — Books: {a.books.map(b => b.title).join(", ")}
          </li>
        ))}
      </ul>

    </>
  )
}
