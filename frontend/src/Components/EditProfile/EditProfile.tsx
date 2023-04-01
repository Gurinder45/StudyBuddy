import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, FormGroup, Row } from "react-bootstrap";
import { useLoaderData, useNavigate } from "react-router-dom";
import RootNavbar from "../Root/RootNavbar";
import "./EditProfile.css"

const EditProfile = () => {
  const navigate = useNavigate();
  const data: any = useLoaderData();
  const [university, setUniversity] = useState("");
  const [courses, setCourses] = useState("");
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (!data.loggedIn) {
      setTimeout(() => navigate("/login"), 0);
    } else {
      const fetchUserData = async () => {
        const response = await fetch("/users/info");
        const data = await response.json();
        setUniversity(data.university);
        setCourses(data.courses.join(", "));
        setImage(data.image);
      };
      fetchUserData();
    }
  }, [data.loggedIn, navigate]);

  // console.log(image);
  const logout = async (event: any) => {
    event.preventDefault();

    const response = await fetch("/users/logout");
    const data = await response.json();
    if (data.loggedOut) {
      setTimeout(() => navigate("/login"), 0);
    }
  };

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
        image
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
        <Form onSubmit={handleSubmit} encType = "multipart/form-data">

        {/* <FormGroup className='mb-3' controlId='formImage'>
            <Form.Label>Profile Picture:</Form.Label>
            <Form.Control 
                type="file"
                value={image || '' }
                onChange={(e:React.ChangeEvent<HTMLInputElement>) => {
                  const file = e.target.files && e.target.files[0];
                  if (file){
                    setImage(file)
                  }
                }}
                required />
          </FormGroup> */}

          {/* <FormGroup className='mb-3' controlId='formImage' style={{display:'inline-block', justifyContent:'centre', alignItems: 'center'}}> */}

            <div style={{display:'inline-block', justifyContent:'centre', alignItems: 'center',margin:'auto', paddingLeft:'25%'}}>
              {image && (
              <div style={{ width: '150px', height: '150px', borderRadius: '50%', border: '2px solid black', overflow: 'hidden', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <img src={image} alt="Uploaded file" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              )}
            </div>
           {/* </FormGroup>  */}

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