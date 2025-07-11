const mongoose = require('mongoose');

const author = new mongoose.Schema({
  name: { type: String },
});

module.exports = mongoose.model('Author', author);
