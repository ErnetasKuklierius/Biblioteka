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

module.exports = router;
