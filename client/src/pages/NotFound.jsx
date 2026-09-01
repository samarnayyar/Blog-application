import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="h-screen flex flex-col items-center justify-center text-center p-8 bg-transparent">
      <div className=" bg-black opacity-75">
        <h1 className="text-6xl font-bold text-red-600 mb-4">404</h1>
        <p className="text-xl text-gray-700 mb-6">Oops! The page you're looking for doesn't exist.</p>
        <Link to="/" className="text-blue-600 underline hover:text-blue-800 ">
          Go back home
        </Link>
      </div>
    </div>
  );
}
