// RootPage.tsx
import React, { useEffect } from 'react';
import {useLoaderData,useNavigate, redirect } from "react-router-dom";
import MatchUsersList from '../MatchUsers/MatchUsersList';
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
    data.loggedIn ?
    <>
      <div>
        <h2>Welcome</h2>
        <button onClick={logout}>
          Log Out
        </button>
      </div>
      <ShowBuddies />
      <MatchUsersList />
    </>
    : null
  );
}

export const checkLoggedIn = async()=> {
  const response = await fetch('/users/check-logged-in');
  const data = await response.json();
  return data;
}
