import { useState, useEffect } from "react";
import API from "../api";
import { Search } from "../components/search";
import { BookList } from "../components/bookList";
import { AddBook } from "../components/addBook";

export const Home = () => {
    const [books, setBooks] = useState([]);

    const loadBooks = () => {
      API.get("/books").then(res => setBooks(res.data));
    }

    useEffect(() => { 
        loadBooks();
    }, [])
  return (
    <>
    <div>
      <h1>Library </h1>
      <Search onResults={setBooks} />
      <BookList books={books} refresh={loadBooks} />
      {localStorage.getItem("token") && <AddBook />}
    </div>
    </>
  )
}
