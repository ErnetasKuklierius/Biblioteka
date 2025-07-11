import { useState } from 'react';
import api from '../api';

export const Books = () => {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState(null);

  const handleSearch = async () => {
    const res = await api.get(`/books/search?q=${query}`);
    setResult(res.data);
  };

  return (
    <div>
      <input value={query} onChange={e => setQuery(e.target.value)}/>
      <button onClick={handleSearch}>Search</button>
      {result && (
        <div>
          <h3>{result.title}</h3>
          <p>Authors: {result.authors.map(a => a.name).join(', ')}</p>
          <p>ISBN: {result.isbn}</p>
        </div>
      )}
    </div>
  );
}
