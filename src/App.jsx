import React, { useEffect, useState } from 'react';
import './App.css';
import Home from './components/Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Updates from './components/Updates';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Updates/>} />
       
      </Routes>
    </Router>
  );
}

export default App;