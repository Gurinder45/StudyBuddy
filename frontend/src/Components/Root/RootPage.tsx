// RootPage.tsx
import React, { useEffect } from 'react';
import { Button, Col, Container, Nav, Navbar, Row, Spinner } from 'react-bootstrap';
import {useLoaderData,useNavigate, redirect } from "react-router-dom";
import BuddiesList from '../Matching/BuddiesList';
import { MatchContextProvider } from '../Matching/MatchContext';
import MatchUsersList from '../Matching/MatchUsersList';
import ShowBuddies from '../ShowBuddies/ShowBuddies';
import RootNavbar from './RootNavbar';


export default function RootPage() {
  const navigate = useNavigate();
  const data:any = useLoaderData();
 
  useEffect(() => {
    if (!data.loggedIn) {
      setTimeout(() => navigate('/login'), 0);
    }
  }, [data.loggedIn]);



  return (
    data.loggedIn ?
    <>
      <MatchContextProvider>
        <RootNavbar loggedIn={data.loggedIn} />
        <Container>
          <Row>
            <Col sm={0} md={1}></Col>
            <Col sm={12} md={10}>
              <h2 className='mb-2'>Welcome, {data.username}</h2>
              <ShowBuddies />
              <BuddiesList />
              <MatchUsersList />
            </Col>
            <Col sm={0} md={1}></Col>
          </Row>
        </Container>
      </MatchContextProvider>
    </>
    : <div className='d-flex justify-content-center align-items-center my-auto vh-100'>
        <Spinner animation="border" variant='primary' style={{ width:'100px', height:'100px' }} />
      </div>
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
