const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const Book = require('../models/Book');
const Author = require('../models/Author');
const axios = require('axios');

router.get('/', async (req, res) => {
  const books = await Book.find().populate('authors');
  res.json(books);
});

router.get('/:id', async (req, res) => {
  const book = await Book.findById(req.params.id).populate('authors');
  if (!book) return res.status(404).json({ message: 'Book not found' });
  res.json(book);
});

router.get('/search/:query', async (req, res) => {
  const query = req.params.query;
  let books = await Book.find({ $or: [{ title: new RegExp(query, 'i') }, { isbn: query }] }).populate('authors');
  if (books.length === 0) {
    const olRes = await axios.get(`https://openlibrary.org/search.json?q=${query}`);
    const docs = olRes.data.docs.slice(0, 1);
    if (docs.length === 0) return res.status(404).json({ message: 'Not found' });

    const doc = docs[0];
    const authorName = doc.author_name?.[0] || "Unknown";
    let author = await Author.findOne({ name: authorName });
    if (!author) {
      author = new Author({ name: authorName });
      await author.save();
    }

    const newBook = new Book({
      title: doc.title,
      authors: [author._id],
      publishedDate: doc.first_publish_year,
      isbn: doc.isbn?.[0] || ""
    });
    await newBook.save();

    author.books.push(newBook._id);
    await author.save();

    books = [await Book.findById(newBook._id).populate('authors')];
  }
  res.json(books);
});

router.post('/', auth, async (req, res) => {
  const { title, authors, publishedDate, isbn } = req.body;
  const book = new Book({ title, authors, publishedDate, isbn });
  await book.save();
  res.json(book);
});

router.put('/:id', auth, async (req, res) => {
  const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(book);
});


router.delete('/:id', auth, async (req, res) => {
  await Book.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
});

module.exports = router;
