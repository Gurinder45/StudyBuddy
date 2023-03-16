import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import LoginPage from './LoginPage';
import RootPage from './RootPage';
import {useState} from 'react'

function App() {
/*
  const [uname, setName] = useState('')
  const [password, setPassword] = useState('')

  async function registerUser(event:any){
    event.preventDefault()
    const response = await fetch('http://localhost:1234/sendLogin', {
      method:'POST',
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        uname: uname.trim(),
        password: password.trim()
      })
    });

    const data = await response.json()

    console.log(" THIS IS THE DATA", data)
    setName(data.uname)
  }
*/
  return (
    
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/welcome"  element={<RootPage />}/>
      </Routes>
    </Router>
    
  );
}

export default App;
