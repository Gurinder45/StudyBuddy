import React, { useEffect } from 'react';
import './App.css';
import {
  Route,
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Navigate
} from "react-router-dom";

import LoginPage from './Login/LoginPage';
import RootPage, { checkLoggedIn } from './Root/RootPage';
import SignupPage from './Signup/SignupPage';

function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route
      >
        <Route path="/welcome" element = {<RootPage/>} loader = {checkLoggedIn}/>

        <Route path="/login" element={<LoginPage />} loader = {checkLoggedIn}/>

        <Route path="/signup" element={<SignupPage />} loader = {checkLoggedIn}/>

        <Route path="*" element={<Navigate to="/welcome" replace />} />
        
      </Route>
      
    )
  )
  return (
    <RouterProvider router={router} />
  );
}

export default App;
