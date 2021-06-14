const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
  longUrl: String,
  shortUrl: String,
  shortUrlId: String,
  expiryDate: { type: Date },
  user: String,
  password: String
});

module.exports = mongoose.model('Url', urlSchema);