import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layout/MainLayout';
import Home from './pages/Home';
import Comment from './pages/Comment';

function App() {

  return (
    <div className="w-full min-h-screen bg-fixed bg-center bg-cover bg-no-repeat bg-[url('https://www.clubmahindra.com/blog/media/section_images/naturephot-ec32e94608f809e.webp')]">
      <Router>
        <MainLayout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/comment" element={<Comment />} />
          </Routes>
        </MainLayout>
      </Router>
    </div>
  );
}

export default App;
