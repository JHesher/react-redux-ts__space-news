import React from 'react';
import './App.scss';
import { Routes, Route } from 'react-router-dom';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ArticlePage } from './pages/ArticlePage';
import { NewsListPage } from './pages/NewsListPage/NewsListPage';

function App() {
  return (
    <div className="App">
      {/* <div className="App__main"> */}
        <Routes>
          <Route path="/" element={ <NewsListPage /> }/>
          <Route path="article-page/:id" element={ <ArticlePage /> }/>
        </Routes>
      {/* </div> */}
    </div>
  );
};

export default App;
