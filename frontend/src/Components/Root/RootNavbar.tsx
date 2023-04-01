import React from "react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

interface RootNavbarProps {
    loggedIn: Boolean
}

function RootNavbar({ loggedIn }: RootNavbarProps) {
    const navigate = useNavigate();

    const logout = async (event: any) => {
        event.preventDefault();

        const response = await fetch('/users/logout');
        const data = await response.json();
        if (data.loggedOut) {
            setTimeout(() => navigate('/login'), 0);
        }
    }

    return (
        <Navbar>
            <Container>
                <Navbar.Brand as={Link} to="/welcome">
                    StudyBuddy
                </Navbar.Brand>
                <Navbar.Toggle />
                {loggedIn ?
                    <Navbar.Collapse className="justify-content-between">
                        <Nav>
                            <Nav.Link onClick={() => {navigate('/profile')}}>Edit Profile</Nav.Link>
                            <Nav.Link onClick={() => {navigate('/chats')}}>Chat</Nav.Link>
                        </Nav>
                        <Navbar.Text>
                            <Button variant='danger' onClick={logout}>Logout</Button>
                        </Navbar.Text>
                    </Navbar.Collapse>
                : null
                }
            </Container>
        </Navbar>
    )
}

export default RootNavbar;