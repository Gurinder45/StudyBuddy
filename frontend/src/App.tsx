import React from 'react';
import logo from './logo.svg';
import './App.css';
import {useState} from 'react'

function App() {

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

  return (
    <div>
      <p> Hello {uname}</p>
      <form onSubmit={registerUser}>
        <input value={uname} type="text" name="uname" onChange={(e)=>{setName(e.target.value)}} placeholder='username' />
        <input value={password} type="password" name="password" onChange={(e)=>{setPassword(e.target.value)}} placeholder='password'/>
        <input type="submit" value="sign-in" />
      </form>
    </div>
  );
}

export default App;
