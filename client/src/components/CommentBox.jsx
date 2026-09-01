import { useState } from 'react';

const CommentBox = ({ onAddComment }) =>{
  const [username, setUsername] = useState('');
  const [text, setText] = useState('');

  const handleSubmit = () => {
    if (username.trim() && text.trim()){
      onAddComment(username, text);
      setUsername('');
      setText('');}
  };

  return(
    <div className="mt-4">
      
      <input className="w-full p-2 border rounded mb-2" placeholder="Your Name" value={username} onChange={(e) => setUsername(e.target.value)}/>
      <textarea className="w-full p-2 border rounded" placeholder="Write a comment" value={text}onChange={(e) => setText(e.target.value)}/>
      <button className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800" onClick={handleSubmit}>Post Comment</button>
      
    </div>
  );
};

export default CommentBox;
