import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Alert } from 'react-bootstrap';

export default function AddWorkout() {
    const [name, setName] = useState('');
    const [duration, setDuration] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Clear any previous errors
        setError('');
        setSuccess(false);

        // Validate inputs
        if (!name || !duration) {
            setError('Please fill in both fields');
            return;
        }

        const workoutData = { name, duration };
        const token = localStorage.getItem('token');

        try {
            const response = await fetch('https://fitnessapp-api-ln8u.onrender.com/workouts/addWorkout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(workoutData),
            });

            if (response.ok) {
                setSuccess(true);
                setError('');
                setTimeout(() => navigate('/workouts'), 1000); // Delay navigation for 1 second
            } else {
                const data = await response.json();
                setError(data.message || 'Failed to add workout');
            }
        } catch (error) {
            console.error('Error adding workout:', error);
            setError('An error occurred. Please try again.');
        }
    };

    return (
        <Container>
            <h2 className="my-4">Add Workout</h2>

            {/* Display success message */}
            {success && <Alert variant="success">Workout added successfully!</Alert>}

            {/* Display error message */}
            {error && <Alert variant="danger">{error}</Alert>}

            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="workoutName">
                    <Form.Label>Workout Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter workout name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="workoutDuration" className="mt-3">
                    <Form.Label>Duration (minutes)</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="Enter workout duration"
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                        required
                    />
                </Form.Group>

                <Button variant="primary" type="submit" className="mt-3">
                    Add Workout
                </Button>
            </Form>
        </Container>
    );
}
