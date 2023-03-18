import React, { useState } from "react";

function SignupPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [university, setUniversity] = useState("");
  const [courses, setCourses] = useState("");

  const handleUsernameChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setPassword(event.target.value);
  };

  const handleUniversityChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setUniversity(event.target.value);
  };

  const handleCoursesChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setCourses(event.target.value);
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
    const data = await response.json();
    console.log(data);
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
          Courses:
          <input type="text" value={courses} onChange={handleCoursesChange} />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default SignupPage;
