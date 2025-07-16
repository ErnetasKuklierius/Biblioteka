const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const Author = require('../models/Author');

router.get('/', async (req, res) => {
  const authors = await Author.find().populate('books');
  res.json(authors);
});

router.get('/:id', async (req, res) => {
  const author = await Author.findById(req.params.id).populate('books');
  res.json(author);
});

router.post('/', auth, async (req, res) => {
  const author = new Author(req.body);
  await author.save();
  res.json(author);
});

router.put('/:id', auth, async (req, res) => {
  const author = await Author.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(author);
});

router.delete('/:id', auth, async (req, res) => {
  await Author.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
});

router.get("/search/:query", async (req, res) => {
  const query = req.params.query;

  try {
    const authors = await Author.find({
      name: new RegExp(query, "i"), 
    }).populate("books");

    if (authors.length === 0) {
      return res.status(404).json({ message: "No authors found" });
    }

    res.json(authors);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
