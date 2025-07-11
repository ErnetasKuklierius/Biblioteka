const router = require('express').Router();
const Book = require('../models/Book');
const Author = require('../models/Authors');
const axios = require('axios');

router.get('/books/search', async (req, res) => {
  const { query } = req.query;

  let book = await Book.findOne({ $or: [{ title: query }, { isbn: query }] }).populate('authors');

  if (!book) {
    const response = await axios.get(`https://openlibrary.org/search.json?query=${encodeURIComponent(query)}`);
    if (response.data.docs.length === 0) return res.status(404).json({ message: 'Not found' });

    const doc = response.data.docs[0];
    const authorName = doc.author_name ? doc.author_name[0] : 'Unknown';
    let author = await Author.findOne({ name: authorName });
    if (!author) author = await Author.create({ name: authorName });

    book = await Book.create({
      title: doc.title,
      authors: [author._id],
      releaseDate: doc.first_publish_year || '',
      isbn: doc.isbn ? doc.isbn[0] : ''
    });

    author.books.push(book._id);
    await author.save();

    book = await Book.findById(book._id).populate('authors');
  }

  res.json(book);
});

module.exports = router;
