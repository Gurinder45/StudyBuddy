import React, { useEffect, useState } from 'react';
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import './LoginPage.css';

function LoginPage() {
  const navigate = useNavigate();
  const data:any = useLoaderData();
 
  useEffect(() => {
    if (data.loggedIn) {
      setTimeout(() => navigate('/welcome'), 0);
    }
  }, [data.loggedIn]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const response = await fetch('/users/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    });

    console.log(response)

    if (response.ok) {
      // Login successful
      navigate("/welcome")
      console.log('Login successful');
    } else {
      // Login failed
      console.log('Login failed');
    }
  };

  return (
    <><form onSubmit={handleSubmit}>
      <div>
        <label>
          Username:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        {username.length < 3 && (
            <p style={{ color: 'red' }}>
                Username must be at least 3 characters long
            </p>
          )}
      </div>
      <div>
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        {username.length < 4 && (
            <p style={{ color: 'red' }}>
                Password must be at least 4 characters long
            </p>
          )}
      </div>
      <button type="submit">Login</button>
    </form>
    <div>
        <Link to="/signup">
          <button>Sign Up</button>
        </Link>
    </div></>
    
  );
}

export default LoginPage;