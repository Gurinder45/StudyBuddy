import { response } from "express";
import React, { useContext, useEffect, useState } from "react";
import { Button, ListGroup } from "react-bootstrap";
import { MatchContext, MatchContextType } from "./MatchContext";
import './MatchUsersList.css';

function MatchUsersList() {

  const matchContext = useContext(MatchContext) as MatchContextType;

  const candidateList = matchContext.candidates ?
  matchContext.candidates.map((c) => 
    <ListGroup.Item key={c.username} className="d-flex justify-content-between align-items-start">
      { c.username }
      <Button onClick={async () => {
        const response = await fetch('/matches/match', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ username: c.username })
        });

        if (response.ok) {
          // All good, update the match context
          matchContext.updateContext();
        } else {
          console.log(response.status);
        }
      }}>
        Match
      </Button>
    </ListGroup.Item>
  ) 
  : null;

  return (
    <>
      <h3>Matchable Users:</h3>
      <ListGroup>
        {candidateList}
      </ListGroup>
    </>
  );
}

export default MatchUsersList;