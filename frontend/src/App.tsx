import React from 'react';
import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import LoginPage from './LoginPage';
import RootPage from './RootPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login">
          <LoginPage />
        </Route>
        <Route path="/">
          <RootPage />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
