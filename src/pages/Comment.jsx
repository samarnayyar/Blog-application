import { useBlogs } from '../context/BlogContext';
import { useState } from 'react';
import CommentBox from '../components/CommentBox'; 

const Comment = () => {
  const blogs = useBlogs();
  const [comments, setComments] = useState({});

  const handleComment = (blogId, username, text) => {
    if (!username || !text) return;
    const newComment = { username, text };
    setComments((prev) => ({
      ...prev,
      [blogId]: [...(prev[blogId] || []), newComment]
    }));
  };

  return (
    <div className="max-w-5xl mx-auto p-4 space-y-12">
      {blogs.map((blog) => (
        <div key={blog.id} className="bg-white shadow-lg rounded-lg p-3">
          <img src={blog.image} alt={blog.title} className="w-full h-64 object-cover rounded" />
          <h2 className="text-2xl font-bold mt-4">{blog.title}</h2>
          <p className="text-gray-700 mt-2">{blog.description}</p>

          <div className="mt-6">
            <h4 className="text-lg font-semibold mb-2">Add a Comment</h4>
            <CommentBox onAddComment={(username, text) => handleComment(blog.id, username, text)} />
          </div>

          <div className="mt-6">
            <h4 className="font-bold mb-2">Comments:</h4>
            {(comments[blog.id] || []).map((c, i) => (
              <div key={i} className="bg-gray-100 rounded p-2 mb-2">
                <p className="font-semibold">{c.username}</p>
                <p>{c.text}</p>
              </div>
            ))}
            {(comments[blog.id] || []).length === 0 && (
              <p className="text-gray-500">No comments yet.</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Comment;
