const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: String,
  body: String,
  image: String,
  author: String,
  views: { type: Number, default: 0 },
  comments: [
    {
      text: String,
      author: String,
      createdAt: { type: Date, default: Date.now }
    }
  ]
}, {timestamps: true});

module.exports = mongoose.model('Blog', blogSchema);

