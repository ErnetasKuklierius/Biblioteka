const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: String,
  authors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Author' }],
  publishedDate: String,
  isbn: String
});

module.exports = mongoose.model('Book', bookSchema);
