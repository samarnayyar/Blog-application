import { createContext, useContext, useState, useEffect } from 'react';

const BlogContext = createContext();
export const useBlogs = () => useContext(BlogContext);

// Provider component to fetche data and provide state
export const BlogProvider = ({ children }) => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() =>{
    fetch('/api/blogs')
      .then(res =>{
        if (!res.ok) throw new Error('Failed to fetch blogs');
        return res.json();
      })
      .then(data =>{
        setBlogs(data);
        setLoading(false);
      })
      .catch(err =>{
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return( 
    <BlogContext.Provider value={{ blogs, loading, error, setBlogs }}> {children} </BlogContext.Provider>
  );
};
