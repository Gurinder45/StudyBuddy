import React, { useEffect, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";

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
      }),
    });
    const data = await response.json();
    if(data) {
        alert(
            `University set to: ${data.university} \nCourses set to ${data.courses}`)
    }
  };

  return data.loggedIn ? (
    <>
    <h2>Edit Profile</h2>
      <form onSubmit={handleSubmit}>
        <label>
          University:
          <input
            type="text"
            required
            value={university || ""}
            onChange={(e) => setUniversity(e.target.value)}
          />
        </label>
        <br />
        <label>
          Courses (comma-separated):
          <input
            type="text"
            required
            value={courses || ""}
            onChange={(e) => setCourses(e.target.value)}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </>
  ) : null;
};

export default EditProfile;
export {};