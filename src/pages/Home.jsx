import BlogCard from '../components/BlogCard';
import { useBlogs } from '../context/BlogContext';

const Home = () => {
  const blogs = useBlogs();


  return (
    <div className="grid grid-cols-1 gap-6 max-w-4xl mx-auto p-4">
      {blogs.map((blog) => (
        <BlogCard key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default Home;
