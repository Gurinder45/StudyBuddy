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

    const handleUsernameChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setUsername(event.target.value);
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
            />
            </label>
            <br />
            <label>
            Password:
            <input
                type="password"
                value={password}
                onChange={handlePasswordChange}
            />
            </label>
            <br />
            <label>
            University:
            <input
                type="text"
                value={university}
                onChange={handleUniversityChange}
            />
            </label>
            <br />
            <label>
                Courses (comma-separated):
                <input type="text" value={courses.join(',')} onChange={handleCoursesChange} />
            </label>
            <br />
            <button type="submit">Submit</button>
        </form>
        </div>
    );
}

export default SignupPage;
