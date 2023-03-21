import React, { useContext, useEffect, useState } from "react";
import { Button, ListGroup } from "react-bootstrap";
import { MatchContext, MatchContextType } from "./MatchContext";

function BuddiesList() {

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