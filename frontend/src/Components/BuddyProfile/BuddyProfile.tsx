import { Data } from "@react-google-maps/api";
import { response } from "express";
import React, { useContext, useEffect, useState } from "react";
import { Button, Container, ListGroup, Card, ListGroupItem } from 'react-bootstrap';
import { useNavigate, useLocation } from "react-router-dom";

const BuddyProfile = () => {
  const navigate = useNavigate();
  // const data: any = useLoaderData();
  const location = useLocation();
  console.log(location);
  const [buddyprofile, setBuddyprofile] = useState<any>();
  const [buddyUniversity, setbuddyUniversity] = useState<any>();
  const [buddyCourses, setbuddyCourses] = useState<any>([]);


  useEffect(()=>{
    async function fetchdata(){

      //PUT THE BUDDY INTO THE USERS BUDDY SCHEMA!! done when button clicked
      //now i need to get the buddy's schema
      const singlebuddy = await fetch('/users/matchedbuddyinfo')
      const data = await singlebuddy.json()
      setbuddyCourses(data[0].courses);
      setbuddyUniversity(data[0].university);
      setBuddyprofile(location.state.buddyusername);
    }
    fetchdata();
  }, []);
  
  if(!buddyprofile){
    return <p>Loading...</p>;
  }

  return (
    <>
    <Button variant="secondary" onClick={() => navigate(-1)}>
        Back
    </Button>
    <Container>
      <Card style={{ width: '18rem' }}>
        {/* <Card.Img variant="top" src={user.image} /> */}
        <Card.Body>
          <Card.Title>{buddyprofile}</Card.Title>
          {/* <Card.Text>
            {user.description}
          </Card.Text> */}
        </Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroupItem>University: {buddyUniversity}</ListGroupItem>
          <ListGroupItem>Courses: {buddyCourses}</ListGroupItem>
        </ListGroup>
      </Card>
        {/* <h3>User Profile</h3>
        <h4>Name: </h4> {buddyprofile}
        <h4>University: </h4> {buddyUniversity}
        <h4>Courses: </h4>{buddyCourses} */}
    </Container>
    </>
  );
};

export default BuddyProfile;
