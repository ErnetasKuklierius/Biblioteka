import { useState, useEffect } from "react";
import API from "../api";
import { Search } from "../components/search";
import { BookList } from "../components/bookList";
import { AddBook } from "../components/addBook";

export const Home = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => { 
        API.get("/books").then(res => setBooks(res.data));
    }, [])
  return (
    <>
    <div>
      <h1>Books </h1>
      <Search onResults={setBooks} />
      <BookList books={books} />
      {localStorage.getItem("token") && <AddBook />}
    </div>
    </>
  )
}
