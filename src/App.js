import { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AppNavbar from './components/AppNavbar.js';
import { UserProvider } from './context/UserContext.js';
import 'notyf/notyf.min.css';

import Register from './pages/Register.js';
import Home from './pages/Home.js';
import Login from './pages/Login.js';
import AddWorkout from './pages/AddWorkout.js';
import Workout from './pages/Workout.js';
import Logout from './pages/Logout.js';

function App() {
    const [user, setUser] = useState({
        id: null,
    });

    // Function to unset the user, which clears localStorage and resets user state
    function unsetUser() {
        localStorage.clear();
        setUser({
            id: null,
        });
    }

    // Checking for the token in localStorage and setting the user accordingly
    useEffect(() => {
        const token = localStorage.getItem('token');
        console.log("Token from localStorage:", token);

        if (!token) {
            setUser({
                id: null,
            });
            return;
        }

        // If the token exists, we set a dummy user ID or your actual user ID logic here
        setUser({
            id: 'dummyUserId', // Replace this with actual user ID once you implement login
        });
    }, []);

    return (
        <UserProvider value={{ user, setUser, unsetUser }}>
            <Router>
                <AppNavbar />
                <Container>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/addWorkout" element={<AddWorkout />} />
                        <Route path="/workouts" element={<Workout />} />
                        <Route path="/logout" element={<Logout />} />
                    </Routes>
                </Container>
            </Router>
        </UserProvider>
    );
}

export default App;
