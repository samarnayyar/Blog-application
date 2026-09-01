import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full bg-black text-white shadow-md z-50 p-5 flex justify-between">
      <h1 className="text-xl font-bold">Nature Blogs</h1>
      <div className="space-x-4">
        <Link to="/">Home</Link>
        <Link to="/comment">Comment</Link>
      </div>
    </nav>
  );
};

export default Navbar;