import { useState} from 'react'
import API from "../api";

export const Search = ( { onResults }) => {
 const [query, setQuery] = useState("");

  const handleSearch = async () => {
    const res = await API.get(`/books/search/${query}`);
    onResults(res.data);
  };

  return (
    <div>
      <input placeholder="Search by title, title or author" value={query} onChange={(e) => setQuery(e.target.value)} />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
}
