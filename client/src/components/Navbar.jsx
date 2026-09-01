import { Link } from 'react-router-dom';

const Navbar = () => {
  return(
    <nav className="fixed top-0 w-full bg-black text-white shadow-md z-50 p-5 flex justify-between">
      <Link to="/"className="text-xl font-bold">Nature Blogs</Link>

      <div className="space-x-4">

        <Link to="/" className="mr-4">Home</Link>
        <Link to="/create">Create Post</Link> 
        
      </div>
    </nav>
  );
};

export default Navbar;