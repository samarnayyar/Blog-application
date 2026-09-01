import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function EditPost() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [author, setAuthor] = useState('');
  const [image, setImage] = useState('');

  useEffect(() => {
    // Fetching current blog details
    fetch(`/api/blogs/${id}`)
      .then(res => res.json())
      .then(data => {
        setTitle(data.title || '');
        setBody(data.body || '');
        setAuthor(data.author || '');
        setImage(data.image || '');
      });
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(`/api/blogs/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, body, author, image }),
    });

    if (res.ok) {
      navigate(`/blogs/${id}`);
    } else {
      alert('Failed to update post');
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 md:p-8 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl my-6 border border-white/50">
      <h2 className="text-3xl font-bold mb-4">Edit Blog Post</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        
        <input
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Title"
          className="w-full border p-2 rounded"
          required
        />

        <input
          type="text"
          value={author}
          onChange={e => setAuthor(e.target.value)}
          placeholder="Author"
          className="w-full border p-2 rounded"
          required
        />

        <input
          type="text"
          value={image}
          onChange={e => setImage(e.target.value)}
          placeholder="Image URL (optional)"
          className="w-full border p-2 rounded"
        />

        <textarea
          value={body}
          onChange={e => setBody(e.target.value)}
          placeholder="Blog Content"
          className="w-full border p-2 rounded min-h-[150px]"
          required
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Update Post
        </button>
        
      </form>
    </div>
  );
}
