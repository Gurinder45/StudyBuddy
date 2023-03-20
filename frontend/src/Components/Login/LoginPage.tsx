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
    data.loggedIn?<><form onSubmit={handleSubmit}>
      <div>
        <label>
          Username:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
      </div>
      <div>
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
      </div>
      <button type="submit">Login</button>
    </form>
    <div>
        <Link to="/signup">
          <button>Sign Up</button>
        </Link>
    </div></>
    :null
    
  );
}

export default LoginPage;
