import React from 'react';
import './App.css';
import Home from './components/Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Updates from './components/Updates';
import MainPage from './components/MainPage';
import Profile from './components/Profile';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path='/home' element={<MainPage/>} />
        <Route path="/explore" element={<Updates />} />
        <Route path='/profile' element={<Profile/>}/>
      </Routes>
    </Router>
  );
}

export default App;