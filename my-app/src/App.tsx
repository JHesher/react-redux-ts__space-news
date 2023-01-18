import React from 'react';
import './App.scss';
import { Routes, Route } from 'react-router-dom';
import { ArticlePage } from './pages/ArticlePage';
import { NewsListPage } from './pages/NewsListPage/NewsListPage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={ <NewsListPage /> }/>
        <Route path="article-page/:id" element={ <ArticlePage /> }/>
      </Routes>
    </div>
  );
};

export default App;
