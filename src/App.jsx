import React, { useEffect } from 'react';
import './App.css';
import Home from './components/Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Updates from './components/Updates';
import MainPage from './components/MainPage';
import Profile from './components/Profile';
import axios from 'axios';
import { response } from 'express';


function App() {
  const [message, setMessage] = useState('');
  const [dataResponse, setDataResponse] = useState(null);


    useEffect(()=>{
      axios.get('http://localhost:3009/')
      .then(response => {
        setMessage(response.data.message);
      })
      .catch(console.error()
      )
    },[]);

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