// File: src/App.jsx
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ArticlePage from './pages/ArticlePage';
import YCPPage from './pages/YCPPage';
import AwardsPage from './pages/AwardsPage';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [currentArticle, setCurrentArticle] = useState(null);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage setCurrentPage={setCurrentPage} setCurrentArticle={setCurrentArticle} />;
      case 'article':
        return <ArticlePage article={currentArticle} setCurrentPage={setCurrentPage} setCurrentArticle={setCurrentArticle} />;
      case 'ycp':
        return <YCPPage />;
      case 'awards':
        return <AwardsPage />;
      default:
        return <HomePage setCurrentPage={setCurrentPage} setCurrentArticle={setCurrentArticle} />;
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      {renderPage()}
      <Footer />
    </div>
  );
}

export default App;