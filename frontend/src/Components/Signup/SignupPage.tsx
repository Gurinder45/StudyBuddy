import React, { useEffect, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { Button, ButtonGroup, Col, Container, Form, FormGroup, Row, Stack } from 'react-bootstrap';
import RootNavbar from '../Root/RootNavbar';
import './SignupPage.css';
function SignupPage() {
    const navigate = useNavigate();
    const data:any = useLoaderData();
    const [users, setUsers] = useState<any>([]);
    useEffect(() => {
        if (data.loggedIn) {
        setTimeout(() => navigate('/welcome'), 0);
        }
        let usernames: any[] = [];
        for (let key in data) {
            if (!isNaN(parseInt(key))) { // Check if the key is a number
              usernames.push(data[key].username);
            }
          }
        setUsers(usernames);
    }, [data.loggedIn]);
    
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [university, setUniversity] = useState("");
    const [courses, setCourses] = useState([]);
    const [usernameError, setUsernameError] = useState('');

    const handleUsernameChange = async (event: { target: { value: React.SetStateAction<string>; }; }) => {
        const newUsername = event.target.value;
        setUsername(newUsername);
        if(newUsername.length >0){
            for(let i =0;i<users.length;i++){
                if(newUsername === users[i]){
                    setUsernameError('Username is already taken.');
                    break
                }
            
                else{
                    setUsernameError('');
                   
                }
            }
           
        }
        
    };

    const handlePasswordChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        if(usernameError === "Username is already taken."){
            setUsername('');
        }
        setPassword(event.target.value);
    };

    const handleUniversityChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        if(usernameError === "Username is already taken."){
            setUsername('');
        }
        setUniversity(event.target.value);
    };

    const handleCoursesChange = (event:any) => {
        if(usernameError === "Username is already taken."){
            setUsername('');
        }
        setCourses(event.target.value.split(','));
    };

    const handleSubmit = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        if(username === '' || password === '' || university === '' || courses.length === 0){
            setUsername('')
            setPassword('')
            setUniversity('')
            setCourses([])
        }
        else{
            const response = await fetch("/users/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username,
                    password,
                    university,
                    courses,
                }),
                });
        
                if (response.ok) {
                    // Login successful
                    navigate("/welcome")
                    console.log('Signup successful');
                } 
                else {
                    // Login failed
                    console.log('Signup failed');
                }
        }
        
    };

    return (
        <>
    <RootNavbar loggedIn={data.loggedIn} />
    <Container>
      <Row>
        <Col sm={2} md={3} lg={4}></Col>
        <Col sm={8} md={6} lg={4}>
        <h2>Signup</h2>
        <Form onSubmit={handleSubmit}>
          <FormGroup className='mb-3' controlId='formUsername'>
            <Form.Label>Username:</Form.Label>
            <Form.Control type="text"
                value={username}
                onChange={handleUsernameChange}
                required
                minLength={3} />
            {username.length < 3 && (
            <p style={{ color: 'red' }}>
                Username must be at least 3 characters long
            </p>
            )}
            {usernameError && (
            <p style={{ color: 'red' }}>
                {usernameError}
            </p>
            )}
          </FormGroup>
          <FormGroup className='mb-3' controlId='formPassword'>
            <Form.Label>Password:</Form.Label>
            <Form.Control type="password"
                value={password}
                onChange={handlePasswordChange}
                required
                minLength={4} />
            {password.length < 4 && (
            <p style={{ color: 'red' }}>
                Password must be at least 4 characters long
            </p>
            )}
          </FormGroup>
          <FormGroup className='mb-3' controlId='formUniversity'>
            <Form.Label>University:</Form.Label>
            <Form.Control type="text"
                value={university}
                onChange={handleUniversityChange}
                required />
            {!university && (
            <p style={{ color: 'red' }}>University field cannot be empty</p>
            )}
          </FormGroup>
          <FormGroup className='mb-3' controlId='formCourses'>
            <Form.Label>Courses (comma-separated):</Form.Label>
            <Form.Control type="text"
                value={courses.join(',')}
                onChange={handleCoursesChange}
                required />
            {courses.length === 0 && (
            <p style={{ color: 'red' }}>At least one course is required</p>
            )}
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
        
    );
}

export default SignupPage;
