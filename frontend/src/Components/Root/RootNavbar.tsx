import React from "react";
import { Container, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

interface RootNavbarProps {
    children: React.ReactNode
}

function RootNavbar({ children }: RootNavbarProps) {
    return (
        <Navbar>
            <Container>
                <Navbar.Brand as={Link} to="/">
                    StudyBuddy
                </Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    {children}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default RootNavbar;