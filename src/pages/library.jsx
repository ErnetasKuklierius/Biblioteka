import React, { useState} from 'react'
import axios from 'axios'

export const Library = () => {

    const [query, setQuery] = useState("");
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null)

    const handleSearch = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        
        try {
            const res = await axios.get(
                `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}`
            );
            setBooks(res.data.docs);
        } catch (err) {
            setError("Failed to get books")
        } finally {
            setLoading(false)
        }
    };
    
    return (
        <>
        <form onSubmit={handleSearch}>
        <input
        type="text"
        placeholder="Enter book title or author"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Search</button>
        </form>
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        
        <ul>
            {books.slice(0, 10).map((book) => (
                <li key={book.key}>
                    <strong>{book.title}</strong>
                    by{" "} {book.author_name ? book.author_name.join(", ") : "Unknown Author"}
                    {book.cover_i && (
                        <div>
                            <img 
                            src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
                            alt={book.title}
                            style={{width:"100px"}}
                            />
                            </div>
                    )}
                </li>
            ))}
        </ul>
        </>
    )

}

