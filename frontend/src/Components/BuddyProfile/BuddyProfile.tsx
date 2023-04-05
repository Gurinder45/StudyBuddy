import { Data } from "@react-google-maps/api";
import { response } from "express";
import React, { useContext, useEffect, useState } from "react";
import { Button, Container, ListGroup, Card, ListGroupItem } from 'react-bootstrap';
import { useNavigate, useLocation } from "react-router-dom";
import "./BuddyProfile.css"
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { FaArrowCircleLeft, FaArrowCircleRight } from 'react-icons/fa';


const BuddyProfile = () => {
  const navigate = useNavigate();
  // const data: any = useLoaderData();
  const location = useLocation();
  console.log(location);
  const [buddyprofile, setBuddyprofile] = useState<any>();
  const [buddyUniversity, setbuddyUniversity] = useState<any>();
  const [buddyCourses, setbuddyCourses] = useState<any>([]);
  const [buddyBio, setbuddyBio] = useState<any>();
  const [buddyReview, setbuddyReview] = useState<any>([]);


  useEffect(()=>{
    async function fetchdata(){

      //PUT THE BUDDY INTO THE USERS BUDDY SCHEMA!! done when button clicked
      //now i need to get the buddy's schema
      const singlebuddy = await fetch('/users/matchedbuddyinfo')
      const data = await singlebuddy.json()
      setbuddyCourses(data[0].courses);
      setbuddyUniversity(data[0].university);
      setBuddyprofile(location.state.buddyusername);
      setbuddyBio(data[0].bio);
      setbuddyReview(data[0].reviews);
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
          <ListGroupItem>Bio: {buddyBio}</ListGroupItem>
          <ListGroupItem>Study Buddy Reviews: 
            <Carousel axis="horizontal"
  showStatus={false}
  className="relative"
  renderArrowPrev={(clickHandler, hasPrev) => {
    return (
      <div
        className={`${
          hasPrev ? 'absolute' : 'hidden'
        } top-0 bottom-0 left-0 flex justify-center items-center p-3 opacity-30 hover:opacity-100 cursor-pointer z-20`}
        onClick={clickHandler}
      >
        <FaArrowCircleLeft className="w-9 h-9 text-white carousel-arrow prev" />
      </div>
    );
  }}
  renderArrowNext={(clickHandler, hasNext) => {
    return (
      <div
        className={`${
          hasNext ? 'absolute' : 'hidden'
        } top-0 bottom-0 right-0 flex justify-center items-center p-3 opacity-30 hover:opacity-100 cursor-pointer z-20`}
        onClick={clickHandler}
      >
        <FaArrowCircleRight className="w-9 h-9 text-white carousel-arrow next" />
      </div>
    );
  }}
>
              {buddyReview.map((oneReview:any, index:any)=>(
              <div key={index} className="buddyreviews">
                {oneReview}
              </div>
              ))}
            </Carousel>
              </ListGroupItem>

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
