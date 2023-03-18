import React, { useEffect } from 'react';
import './App.css';
import {
  Route,
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements
} from "react-router-dom";

import LoginPage from './LoginPage';
import RootPage, { checkLoggedIn } from './RootPage';

function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path = "/" element = {<RootPage />}>
        <Route 
        index 
        element = {<RootPage/>}
        loader = {checkLoggedIn}
        />

        <Route path="login" element={<LoginPage />} />
        
      </Route>
    )
  )
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
  <Route path="/"
          element={loggedIn ?(<Navigate replace to="/welcome" />): (<Navigate replace to="/login" />)}
          />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/welcome"  element={<RootPage />}/>
*/
  return (
    <RouterProvider router={router} />
  );
}

export default App;
