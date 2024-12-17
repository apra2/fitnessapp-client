import { useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import UserContext from '../context/UserContext.js';

export default function AppNavbar() {
    const { user } = useContext(UserContext);

    if (process.env.NODE_ENV === "development") {
        console.log("User context:", JSON.stringify(user, null, 2));
    }

    return (
        <Navbar expand="lg" style={navbarStyles}>
            <Container>
                <Navbar.Brand as={NavLink} to="/" style={navbarBrandStyles}>
                    Zuit Workout
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" style={navbarToggleStyles} />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <Nav.Link as={NavLink} to="/" exact="true" style={navItemStyles}>
                            Home
                        </Nav.Link>
                        {user && user.id ? (
                            <>
                                <Nav.Link as={NavLink} to="/workouts" exact="true" style={navItemStyles}>
                                    Workout
                                </Nav.Link>
                                <Nav.Link as={NavLink} to="/addWorkout" exact="true" style={navItemStyles}>
                                    Add Workout
                                </Nav.Link>
                                <Nav.Link as={NavLink} to="/logout" exact="true" style={navItemStyles}>
                                    Logout
                                </Nav.Link>
                            </>
                        ) : (
                            <>
                                <Nav.Link as={NavLink} to="/login" exact="true" style={navItemStyles}>
                                    Login
                                </Nav.Link>
                                <Nav.Link as={NavLink} to="/register" exact="true" style={navItemStyles}>
                                    Register
                                </Nav.Link>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

// Inline CSS styles
const navbarStyles = {
    background: 'linear-gradient(120deg, #6a11cb 0%, #2575fc 100%)',
    borderRadius: '5px',
    boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)',
};

const navbarBrandStyles = {
    color: 'white',
    fontFamily: "'Poppins', sans-serif",
    fontWeight: '600',
    fontSize: '1.6rem',
    transition: 'color 0.3s ease',
};

const navbarToggleStyles = {
    backgroundColor: 'white',
    borderRadius: '50%',
};

const navItemStyles = {
    color: 'white',
    fontFamily: "'Roboto', sans-serif",
    fontSize: '1.1rem',
    fontWeight: '500',
    padding: '10px 15px',
    borderRadius: '30px',
    transition: 'all 0.3s ease',
};

// Hover Effect Styles for Navbar Links
const navItemHoverStyles = {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    color: '#f8f9fa',
};
