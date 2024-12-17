import { useState, useEffect, useContext } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import { useNavigate, Navigate } from 'react-router-dom';
import UserContext from '../context/UserContext';
import { Notyf } from 'notyf';

export default function Login() {
    const notyf = new Notyf();
    const navigate = useNavigate();
    const { user, setUser } = useContext(UserContext);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        if (email !== '' && password !== '') {
            setIsActive(true);
        } else {
            setIsActive(false);
        }
    }, [email, password]);

    const authenticate = (e) => {
        e.preventDefault();
        fetch('https://fitnessapp-api-ln8u.onrender.com/users/login', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        })
        .then(res => res.json())
        .then(data => {
            if (data.access !== undefined) {
                console.log(data.access);
                localStorage.setItem('token', data.access);
                setUser({ id: 'dummyUserId' }); // Update user context
                setEmail('');
                setPassword('');
                notyf.success('Successful Login');
                navigate('/'); // Navigate to home page
            } else if (data.message === "Incorrect email or password") {
                notyf.error('Incorrect Credentials. Try Again');
            } else {
                notyf.error('User Not Found. Try Again.');
            }
        })
        .catch(err => {
            console.error('Error:', err);
            notyf.error('Something went wrong. Please try again');
        });
    };

    if (user && user.id) {
        return <Navigate to="/" />;
    }

    return (
        <div>
             <h2>Login Page</h2>

       
        <Card className="justify-content-center mx-auto my-5" style={{ maxWidth: '600px' }}>
            <Card.Header>
                <h5 className="my-4 text-center">Login</h5>
            </Card.Header>
            <Card.Body>
                <Form onSubmit={authenticate}>
                    <Form.Group>
                        <Form.Label>Email address</Form.Label>
                        <Form.Control 
                            type="email" 
                            placeholder="Enter email" 
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control 
                            type="password" 
                            placeholder="Password" 
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit" id="loginBtn" disabled={!isActive}>
                        Login
                    </Button>
                </Form>   
            </Card.Body>
            <Card.Footer>
                <p>Don't have an account? Click here to <a href='/Register'> Register </a> </p>
            </Card.Footer>
        </Card>
        </div>
    );
    
}
