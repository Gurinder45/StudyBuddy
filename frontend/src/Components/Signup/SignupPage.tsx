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
    const [bio, setBio] = useState("");
    const [image, setImage] = useState(null);

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

    const handleImageChange = (event:any) =>{
        const selectedFile = event.target.files[0];
        console.log("HERE IS THE IMAGEEE", selectedFile)
        if (selectedFile){
            setImage(selectedFile)
        }
        else{
            setImage(null)
        }
    }

    const handleBioChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        if(usernameError === "Username is already taken."){
            setUsername('');
        }
        setBio(event.target.value);
    };

    const handleSubmit = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        if(username === '' || password === '' || university === '' || courses.length === 0 || !image || bio ===''){
            setUsername('')
            setPassword('')
            setUniversity('')
            setCourses([])
            setImage(null)
            setBio('')
        }
        else{
            const formData = new FormData();
            formData.append("username", username);
            formData.append("password", password);
            formData.append("university", university);
            formData.append("courses", JSON.stringify(courses));
            formData.append("bio", bio);
            
            if(image){
                formData.append("image", image);
            }

            console.log("HERE______________________________",image);

            const response = await fetch('/users/signup', {
                method: "POST",
                body: formData
            });
            if (response.ok) {
            // Login successful
            navigate("/welcome");
            } else {
            // Login failed
            console.log("Signup failed");
            }
        }
    }
        

    return ( 
        <>
    <RootNavbar loggedIn={data.loggedIn} />
    <Container>
      <Row>
        <Col sm={2} md={3} lg={4}></Col>
        <Col sm={8} md={6} lg={4}>
        <h2>Signup</h2>
        <Form onSubmit={handleSubmit} encType = "multipart/form-data">
          <FormGroup className='mb-3' controlId='formImage'>
            <Form.Label>Profile Picture:</Form.Label>
            <Form.Control 
                type="file"
                name="image"
                onChange={(event) => handleImageChange(event)}
                required />
            {!image && (
            <p style={{ color: 'red' }}>
                Image needed
            </p>
            )}
          </FormGroup>


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

          <FormGroup className='mb-3' controlId='formBio'>
            <Form.Label>Please enter a short bio about yourself:</Form.Label>
            <Form.Control as="textarea" 
                rows={3}
                cols={10}
                value={bio}
                onChange={handleBioChange}
                required />
            {bio.length<50 && (
            <p style={{ color: 'red' }}>Bio requires a minimum of 50 characters</p>
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



