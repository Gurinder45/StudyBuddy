import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, FormGroup, Row } from "react-bootstrap";
import { useLoaderData, useNavigate } from "react-router-dom";
import RootNavbar from "../Root/RootNavbar";

const EditProfile = () => {
  const navigate = useNavigate();
  const data: any = useLoaderData();
  const [university, setUniversity] = useState("");
  const [courses, setCourses] = useState("");

  useEffect(() => {
    if (!data.loggedIn) {
      setTimeout(() => navigate("/login"), 0);
    } else {
      const fetchUserData = async () => {
        const response = await fetch("/users/info");
        const data = await response.json();
        setUniversity(data.university);
        setCourses(data.courses.join(", "));
      };
      fetchUserData();
    }
  }, [data.loggedIn, navigate]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const coursesArray = courses.split(",").map((course: string) => course.trim());
    const response = await fetch("/users/edit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        university,
        courses: coursesArray,
      }),
    });
    const data = await response.json();
    if(data) {
        alert(
            `University set to: ${data.university} \nCourses set to ${data.courses}`)
        navigate('/welcome')
    }
  };

  return data.loggedIn ? (
    <>
    <RootNavbar loggedIn={data.loggedIn} />
    <Container>
      <Row>
        <Col sm={2} md={3} lg={4}></Col>
        <Col sm={8} md={6} lg={4}>
        <h2>Edit Profile</h2>
        <Form onSubmit={handleSubmit}>
          <FormGroup className='mb-3' controlId='formUniversity'>
            <Form.Label>University:</Form.Label>
            <Form.Control type="text"
              required
              value={university || ""}
              onChange={(e) => setUniversity(e.target.value)} />
          </FormGroup>
          <FormGroup className='mb-3' controlId='formCourses'>
            <Form.Label>Courses (comma-separated):</Form.Label>
            <Form.Control type="text"
              required
              value={courses || ""}
              onChange={(e) => setCourses(e.target.value)} />
          </FormGroup>
          <div className="d-flex justify-content-evenly">
            <Button variant='primary' type="submit">Submit</Button>
          </div>
        </Form>
        </Col>
        <Col sm={2} md={3} lg={4}></Col>
      </Row>
    </Container>
    </>
  ) : null;
};

export default EditProfile;