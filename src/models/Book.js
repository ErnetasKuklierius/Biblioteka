const mongoose = require('mongoose');

const book = new mongoose.Schema({
    title: { type: String },
    authorName: { type: mongoose.Schema.Types.ObjectId, ref: 'Author' },
    releaseDate: { type: String },
    isbn: { type: String}
})

module.exports = mongoose.model('Book', book)