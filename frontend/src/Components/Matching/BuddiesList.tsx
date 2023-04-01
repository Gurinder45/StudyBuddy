import React, { useContext, useEffect, useState } from "react";
import { Button, ListGroup } from "react-bootstrap";
import { Link, Path } from "react-router-dom";
import { MatchContext, MatchContextType } from "./MatchContext";

interface MyTo extends Partial<Path>{
  state?:any;
}
function BuddiesList() {

  //this function will be callsed to add the selected buddy name
  //into the user schema whenever the view button is pressed
  const handleAddBuddy = async(busername: string)=>{
    const response = await fetch('/users/addsinglebuddy', {
      method:'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({buddyname: busername})
    });
    if(response.ok){
      console.log('added before going to new page')
    }
    else{
      console.log(response.status)
    }
  }


  // This component will the current buddies of the current user
  const matchContext = useContext(MatchContext) as MatchContextType;

  const buddiesList = matchContext.buddies ?
  matchContext.buddies.map((b) => 
    <ListGroup.Item key={b.username} className="d-flex justify-content-between align-items-start">
      { b.username }
      <Button variant="danger" onClick={async () => {
        const response = await fetch('/matches/unmatch', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ username: b.username })
        });
        if (response.ok) {
          // All good, update the match context
          matchContext.updateContext();
        } else {
          console.log(response.status);
        }
      }}>
        Unmatch
      </Button>

      {/* this button is to go to the user profile page */}
      <Link 
        to={"/buddyprofile"} 
        state = {{buddyusername:b.username}}
        className="btn btn-primary"
        // variant="info" 
        onClick={async () => {
          // setBuddyprofile(b.username)
          await handleAddBuddy(b.username)
        //   const response = await fetch('/users/addsinglebuddy', {
        //     method: 'POST',
        //     headers: {
        //       'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({ buddyname: b.username })
        //   });
        //   if (response.ok) {
        //     // All good, update the match context
        //     console.log("OK")
        //   } else {
        //     console.log(response.status);
        //   }
        }}
        >
        View
      </Link>

    </ListGroup.Item>
  )
  : null;

  return (
    <>
      <h3>Your Buddies:</h3>
      <ListGroup>
        {buddiesList}
      </ListGroup>
    </>
  );
}

export default BuddiesList;