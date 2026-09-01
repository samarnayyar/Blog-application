require('dotenv').config();
const express  = require('express');
const mongoose = require('mongoose');
const morgan   = require('morgan');
const cors     = require('cors');

const Blog = require('./models/blog');
const app = express();

const PORT = process.env.PORT || 3000;
const CLIENT_URL = process.env.CLIENT_URL;

//middlewares
app.use(cors({
  origin: CLIENT_URL ? [CLIENT_URL, 'http://localhost:5173', 'http://127.0.0.1:5173'] : '*'
}));
app.use(express.json());
app.use(morgan('dev'));

//connecting
const dbURI = process.env.MONGO_URI;

if (!dbURI) {
  console.error('ERROR: MONGO_URI is not defined in environment variables (.env)');
}

mongoose
  .connect(dbURI)
  .then(() => {
    console.log('MongoDB database connected successfully');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}: http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('Could not connect to MongoDB, connection error!!', err);
  });


// health checking
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

//GET all blogs
app.get('/api/blogs', async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//view counting
app.get('/api/blogs/:id', async (req, res) => {
  try {
    const shouldIncrement = req.query.increment === 'true';

    const blog = shouldIncrement
      ? await Blog.findByIdAndUpdate(
          req.params.id,
          { $inc: { views: 1 } },
          { new: true }
        )
      : await Blog.findById(req.params.id);

    if (!blog) 
      return res.status(404).json({ error: 'Blog not found' });
    res.json(blog);
  } catch (err) {
    console.error('Error fetching blog:', err);
    res.status(500).json({ error: 'Server error' });
  }
});


//POST create blog
app.post('/api/blogs', async (req, res) => {
  try {
    const { title, body, image, author } = req.body;

    const newBlog = new Blog({
      title,
      body,
      image,
      author
    });

    await newBlog.save();
    res.status(201).json(newBlog);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create blog' });
  }
});


//POST comments on blog
app.post('/api/blogs/:id/comments', async (req, res) => {
  const { text, author } = req.body;
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ error: 'Blog not found' });

    blog.comments.push({ text, author });
    await blog.save();

    res.status(201).json(blog);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//PUT Updating the blog
app.put('/api/blogs/:id', async (req, res) => {
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        body: req.body.body,
        author: req.body.author,
        image: req.body.image,
      },
      { new: true }
    );
    res.json(updatedBlog);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


//DELETE blog
app.delete('/api/blogs/:id', async (req, res) => {
  try {
    console.log("DELETE called for ID:", req.params.id);
    await Blog.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


//404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});
