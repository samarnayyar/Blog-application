import { useEffect, useState } from 'react';
import Blogcard from '../components/Blogcard';

export default function Home() {
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState(null);
  const [viewType, setViewType] = useState('grid');

  useEffect(() => {
    fetch('/api/blogs')
      .then(res => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      })
      .then(data => {
        setBlogs(data);
      })
      .catch(err => {
        setError(err.message);
      });
  }, []);

  if (error) 
    return <p className="text-center mt-8 text-red-500 font-medium">Error: {error}</p>;

  return (
    <div className="p-6">
      <div className="flex justify-end mb-4">
        {/* grid list switch */}
        <button
          onClick={() => setViewType(viewType === 'grid' ? 'list' : 'grid')}
          className="fixed top-20 right-2 z-50 bg-blue-400 text-white px-4 py-2 rounded-full shadow-lg hover:bg-blue-700 transition duration-200"
        >
          Switch to {viewType === 'grid' ? 'List' : 'Grid'} View
        </button>
      </div>

      {/* Layout switch*/}
      <div
        className={
          viewType === 'grid'
            ? 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4'
            : 'flex flex-col gap-4 max-w-4xl mx-auto'
        }
      >
        {blogs.map(blog => (
          <Blogcard key={blog._id} blog={blog} view={viewType} />
        ))}
      </div>
    </div>
  );
}
