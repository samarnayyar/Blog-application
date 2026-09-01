import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layout/MainLayout';
import Home from './pages/Home';
import BlogDetails from './pages/BlogDetails';
import CreatePost from './pages/CreatePost'; 
import NotFound from './pages/NotFound';
import EditPost from './pages/EditPost';




function App() {
  return (
    <div className="relative min-h-screen text-slate-900 antialiased">
      {/* Hardware-accelerated fixed background layer to eliminate scroll lag */}
      <div 
        className="fixed inset-0 pointer-events-none -z-10 bg-center bg-cover bg-no-repeat"
        style={{ 
          backgroundImage: `url('https://www.clubmahindra.com/blog/media/section_images/naturephot-ec32e94608f809e.webp')`,
          transform: 'translateZ(0)',
          willChange: 'transform'
        }}
      />
      <Router>
        <MainLayout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<CreatePost />} />
            <Route path="/blogs/:id" element={<BlogDetails />} />
            <Route path="/edit/:id" element={<EditPost />} />
            <Route path="*" element={<NotFound />} />  {/* 404 */}
          </Routes>
        </MainLayout>
      </Router>
    </div>
  );
}

export default App;
