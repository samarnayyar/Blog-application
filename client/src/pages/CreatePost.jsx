import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CreatePost() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [image, setImage] = useState('');
  const [author, setAuthor] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const blog = { title, body, image, author };

    const res = await fetch('/api/blogs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(blog),
    });

    if (!res.ok) {
      alert('Failed to create blog');
    } else {
      alert('Blog created successfully!');
      navigate('/');
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-transparent overflow-y-auto">
      <div className="w-full max-w-xl p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Create a New Blog Post</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            className="w-full border p-2 rounded"
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <textarea
            className="w-full border p-2 rounded h-40"
            placeholder="Body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
          ></textarea>

          <input
            className="w-full border p-2 rounded"
            type="text"
            placeholder="Image URL (optional)"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />

          <input
            className="w-full border p-2 rounded"
            type="text"
            placeholder="Author name"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />

          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full" type="submit">
            Submit
          </button>
          
        </form>
      </div>
    </div>
  );
}
