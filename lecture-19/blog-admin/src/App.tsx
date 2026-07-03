import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { BlogProvider } from './context/BlogContext';
import { HomePage } from './pages/HomePage';
import { PostDetailPage } from './pages/PostDetailPage';

function App() {
  return (
    <BrowserRouter>
      <BlogProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/post/:id" element={<PostDetailPage />} />
        </Routes>
      </BlogProvider>
    </BrowserRouter>
  );
}

export default App;
