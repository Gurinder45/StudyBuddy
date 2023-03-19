// RootPage.tsx
import React, { useEffect } from 'react';
import {useLoaderData,useNavigate, redirect } from "react-router-dom";
import ShowBuddies from '../ShowBuddies/ShowBuddies';
export default function RootPage() {
  const navigate = useNavigate();
  const data:any = useLoaderData();
 
  useEffect(() => {
    if (!data.loggedIn) {
      setTimeout(() => navigate('/login'), 0);
    }
  }, [data.loggedIn]);

  const logout = async (event: any)=>{
    event.preventDefault();

    const response = await fetch('/users/logout');
    const data = await response.json();
    if(data.loggedOut){
      setTimeout(() => navigate('/login'), 0);
    }

  }

  return (
    <><div>
      <h2>Welcome</h2>
      <button onClick={logout}>
        Log Out
      </button>
    </div>
    <ShowBuddies /></>
  );
}

export const checkLoggedIn = async()=> {
  const response = await fetch('/users/check-logged-in');
  const data = await response.json(); 
  const response1 = await fetch('/users/get-users')
  const data1 = await response1.json();
  const mergedObject = { ...data, ...data1};
  console.log(mergedObject)
  return mergedObject;
}
