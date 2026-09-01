import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const BlogCard = ({ blog, view }) => {
  const navigate = useNavigate();
  const [showLockModal, setShowLockModal] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleCardClick = () => {
    navigate(`/blogs/${blog._id}`);
  };

  const handleEditClick = (e) => {
    e.stopPropagation(); // prevent triggering handleCardClick
    setPasscode('');
    setErrorMessage('');
    setShowLockModal(true);
  };

  const handleReadClick = (e) => {
    e.stopPropagation();
    navigate(`/blogs/${blog._id}`);
  };

  const handleUnlockSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();

    // Expected code: author name all lowercase with no spaces
    const expected = (blog.author || 'admin').toLowerCase().replace(/\s+/g, '');
    const entered = passcode.toLowerCase().replace(/\s+/g, '');

    if (entered === expected) {
      setShowLockModal(false);
      navigate(`/edit/${blog._id}`);
    } else {
      setErrorMessage('Incorrect passcode! Access denied.');
    }
  };

  const handleCloseModal = (e) => {
    e.stopPropagation();
    setShowLockModal(false);
    setErrorMessage('');
    setPasscode('');
  };

  return (
    <>
      <div
        onClick={handleCardClick}
        className={`group bg-white/95 backdrop-blur-sm shadow-sm hover:shadow-xl rounded-xl overflow-hidden flex flex-col justify-between cursor-pointer border border-gray-100 transition-all duration-300 hover:-translate-y-1 ${
          view === 'list' ? 'max-w-4xl mx-auto w-full md:flex-row mb-4' : 'w-full h-full'
        }`}
      >
        {/* Image container with subtle zoom effect */}
        <div className={`overflow-hidden relative ${view === 'list' ? 'w-full md:w-52 h-44 flex-shrink-0' : 'w-full h-36'}`}>
          {blog.image ? (
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full bg-slate-100 flex items-center justify-center text-xs font-medium text-slate-400">
              No Image
            </div>
          )}
          {blog.views !== undefined && (
            <span className="absolute top-2 right-2 bg-black/60 backdrop-blur-md text-white text-[10px] font-medium px-2 py-0.5 rounded-full flex items-center gap-1.5 shadow-sm">
              <svg className="w-3 h-3 text-slate-200" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              {blog.views}
            </span>
          )}
        </div>

        {/* Card Content */}
        <div className="p-3.5 flex flex-col flex-grow justify-between">
          <div>
            {blog.author && (
              <p className="text-[11px] font-medium text-blue-600 mb-1 tracking-wide uppercase">
                By {blog.author}
              </p>
            )}
            <h3
              className="text-sm font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-200 line-clamp-2 leading-snug mb-1.5"
              title={blog.title}
            >
              {blog.title}
            </h3>
            <p className="text-gray-600 text-xs line-clamp-3 leading-relaxed mb-3">
              {blog.body ? blog.body.split(' ').slice(0, 16).join(' ') + '...' : ''}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 pt-2.5 border-t border-gray-100 mt-auto">
            <button
              onClick={handleEditClick}
              className="flex-1 py-1.5 px-2.5 text-xs font-semibold rounded-lg text-white bg-amber-700 hover:bg-amber-800 shadow-sm transition-all duration-200 flex items-center justify-center gap-1.5"
              title="Protected edit - requires author unlock key"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              Edit
            </button>

            <button
              onClick={handleReadClick}
              className="flex-1 py-1.5 px-2.5 text-xs font-semibold rounded-lg text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-sm transition-all duration-200 flex items-center justify-center gap-1"
              title="Read full article"
            >
              Read
              <svg className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Lock Passcode Modal */}
      {showLockModal && (
        <div
          onClick={handleCloseModal}
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl border border-slate-100 text-center animate-in fade-in zoom-in-95 duration-200"
          >
            <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-3.5 shadow-inner">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>

            <h3 className="text-lg font-bold text-gray-900 mb-1">Author Verification</h3>
            <p className="text-xs text-gray-500 mb-4">
              Enter passcode to unlock and edit this post:
            </p>

            <form onSubmit={handleUnlockSubmit} className="space-y-3">
              <input
                type="password"
                autoFocus
                value={passcode}
                onChange={(e) => {
                  setPasscode(e.target.value);
                  setErrorMessage('');
                }}
                placeholder="Enter passcode..."
                className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition"
              />

              {errorMessage && (
                <p className="text-xs text-red-600 font-medium">{errorMessage}</p>
              )}

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="flex-1 py-2 px-3 text-xs font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 px-3 text-xs font-semibold text-white bg-amber-600 hover:bg-amber-700 rounded-lg shadow-sm transition"
                >
                  Unlock & Edit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default BlogCard;
