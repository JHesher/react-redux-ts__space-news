import React from 'react';
import './App.scss';
import { Routes, Route } from 'react-router-dom';
import { CityListPage } from './pages/CityListPage';
import { Sidebar } from './components/Sidebar';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CityPage } from './pages/CityPage';

function App() {
  return (
    <div className="App">
      <div className="App__header">
        <div className="App__title">
          GET WEATHER
        </div>
      </div>
      <div className="App__main">
        <div className="App__sidebar">
          <Sidebar />
        </div>
        <div className="App__pages">
        <Routes>
          <Route path="/" element={ <CityListPage /> }/>
          <Route path="/city-page" element={ <CityPage /> }/>
        </Routes>
        </div>
      </div>
      <ToastContainer  autoClose={2000} theme="colored"/>
    </div>


    // <div className="App">
    //   <Search/>
    //   {/* <CityListPage/> */}
    // </div>
  );
};

export default App;
