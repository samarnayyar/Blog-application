import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';

export default function BlogDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [comment, setComment] = useState('');
  const [commentAuthor, setCommentAuthor] = useState('');

  const hasFetched = useRef(false);

  useEffect(() => {
    if (!hasFetched.current) { 
      fetch(`/api/blogs/${id}?increment=true`)
        .then(res => {
          if (!res.ok) throw new Error('Failed to fetch the blog');
          return res.json();
        })
        .then(data => {
          setBlog(data);
          setLoading(false);
          window.scrollTo(0, 0);
        })
        .catch(err => {
          console.error(err);
          setError(err.message);
          setLoading(false);
        });

      hasFetched.current = true;
    }
  }, [id]);

  const handleDelete = () => {
    fetch(`/api/blogs/${id}`, { method: 'DELETE' })
      .then(res => {
        if (!res.ok) throw new Error('Failed to delete the blog');
        navigate('/');
      })
      .catch(err => setError(err.message));
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(`/api/blogs/${id}/comments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text: comment,
        author: commentAuthor || 'Anonymous'
      })
    });

    if (res.ok){
      const updatedBlog = await res.json();
      setBlog(updatedBlog); // Refreshing with new comment
      setComment('');
      setCommentAuthor('');
    } else {
      const errData = await res.json();
      setError(errData.error || 'Failed to post comment');
    }
  };

  if (loading) return <p className="text-center mt-8 text-white">Loading...</p>;
  if (error) return <p className="text-red-500 text-center mt-8">{error}</p>;
  if (!blog) return <p className="text-center mt-8 text-white">Blog not found.</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 md:p-8 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl my-6 border border-white/50">
      <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>
      <div className="flex items-center gap-1.5 text-sm text-gray-500 mb-4">
        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
        <span>{blog.views} views</span>
      </div>

      {blog.image && ( <img src={blog.image} alt="Blog Visual" className="w-full h-96 object-cover rounded mb-4"/>)}

      <p className="text-gray-700 text-lg whitespace-pre-line mb-4">{blog.body}</p>
      <p className="text-sm text-right text-gray-500 mb-6">By {blog.author}</p>

      <button onClick={handleDelete} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 mb-6"> Delete Post</button>
      <hr className="my-6" />
      <h2 className="text-xl font-semibold mb-2">Comments</h2>

      {blog.comments?.length > 0 ? (
        blog.comments.map((c, i) => (
          <div key={i} className="mb-4 border-b pb-2">

            <p>{c.text}</p>
            <p className="text-sm text-gray-500">— {c.author || 'Anonymous'}</p>

          </div>
          ))) : (<p className="text-gray-500">No comments yet.</p>
      )}

      <form onSubmit={handleCommentSubmit} className="mt-4">
        <input
          type="text"
          value={commentAuthor}
          onChange={(e) => setCommentAuthor(e.target.value)}
          placeholder="Your name (optional)"
          className="w-full p-2 mb-2 border border-gray-300 rounded"/>

        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write your comment here..."
          required
          className="w-full p-2 mb-2 border border-gray-300 rounded"/>
        
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 ">
          Post Comment
        </button>
      </form>
    </div>
  );
}
