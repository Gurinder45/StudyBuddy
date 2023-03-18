// RootPage.tsx
import React, { useEffect } from 'react';
import {useLoaderData,useNavigate, redirect } from "react-router-dom";
export default function RootPage() {
  const navigate = useNavigate();
  const data:any = useLoaderData();
 
  useEffect(() => {
    if (!data.loggedIn) {
      setTimeout(() => navigate('/login'), 0);
    }
  }, [data.loggedIn]);
  return (
    <div>
      <h2>Welcome</h2>
      {/* Add your main app UI elements here */}
    </div>
  );
}

export const checkLoggedIn = async()=> {
  const response = await fetch('http://localhost:8080/users/check-logged-in');
  console.log(response)
  const data = await response.json();
  return data;
}
