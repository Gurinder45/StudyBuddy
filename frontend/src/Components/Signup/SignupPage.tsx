import React, { useEffect, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import './SignupPage.css';
function SignupPage() {
    const navigate = useNavigate();
    const data:any = useLoaderData();
    
    useEffect(() => {
        if (data.loggedIn) {
        setTimeout(() => navigate('/welcome'), 0);
        }
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
            try {
                const response = await fetch(`/users/check-username/${newUsername}`);
                const data  = await response.json();
                if (data.exists) {
                    setUsernameError('Username is already taken.');
                } else {
                    setUsernameError('');
                }
            } catch (error) {
                console.error(error);
                setUsernameError('Error checking username availability.');
            }
        }
        
    };

    const handlePasswordChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setPassword(event.target.value);
    };

    const handleUniversityChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setUniversity(event.target.value);
    };

    const handleCoursesChange = (event:any) => {
        setCourses(event.target.value.split(','));
    };

    const handleSubmit = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();
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
    };

    return (
        <div>
        <h2>Signup Page</h2>
        <form onSubmit={handleSubmit}>
            <label>
            Username:
            <input
                type="text"
                value={username}
                onChange={handleUsernameChange}
                required
                minLength={3}
            />
            </label>
            {username.length < 3 && (
            <p style={{ color: 'red' }}>
                Username must be at least 3 characters long
            </p>
            )}
            {username.length === 0 &&usernameError && (
            <p style={{ color: 'red' }}>
                {usernameError}
            </p>
            )}

            <br />
            <label>
            Password:
            <input
                type="password"
                value={password}
                onChange={handlePasswordChange}
                required
                minLength={8}
            />
            </label>
            {password.length < 4 && (
            <p style={{ color: 'red' }}>
                Password must be at least 4 characters long
            </p>
            )}
            <br />
            <label>
            University:
            <input
                type="text"
                value={university}
                onChange={handleUniversityChange}
                required
            />
            </label>
            {!university && (
            <p style={{ color: 'red' }}>University field cannot be empty</p>
            )}
            <br />
            <label>
            Courses (comma-separated):
            <input
                type="text"
                value={courses.join(',')}
                onChange={handleCoursesChange}
                required
            />
            </label>
            {courses.length === 0 && (
            <p style={{ color: 'red' }}>At least one course is required</p>
            )}
            <br />
            <button type="submit">Submit</button>
        </form>
        </div>

    );
}

export default SignupPage;