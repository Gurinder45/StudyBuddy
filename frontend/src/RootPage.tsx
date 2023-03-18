// RootPage.tsx
import React from 'react';
import { redirect } from "react-router-dom";
export default function RootPage() {
  return (
    <div>
      <h2>Welcome</h2>
      {/* Add your main app UI elements here */}
    </div>
  );
}

export const checkLoggedIn = async()=> {
  
  const response = await fetch('/users/check-logged-in');
  console.log(response)
  const data = response.json();
  
  /*
  if(!data.loggedIn){
    return redirect("/login");
  }
*/
  return null;
}
