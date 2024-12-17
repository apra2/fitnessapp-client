import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Banner({ data }) {
    const { title, content, destination, buttonLabel } = data;

    return (
        <Row
            className="justify-content-center align-items-center text-center p-5"
            style={{
                background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
                color: "#ffffff",
                borderRadius: "20px",
                boxShadow: "0 10px 20px rgba(0, 0, 0, 0.3)",
            }}
        >
            <Col md={8}>
                {/* Title */}
                <h1
                    className="display-3 fw-bold mb-4"
                    style={{
                        fontFamily: "'Poppins', sans-serif",
                        textShadow: "2px 2px 5px rgba(0, 0, 0, 0.3)",
                    }}
                >
                    {title}
                </h1>

                {/* Content */}
                <p
                    className="lead mb-4"
                    style={{
                        fontSize: "1.2rem",
                        fontFamily: "'Roboto', sans-serif",
                        lineHeight: "1.8",
                    }}
                >
                    {content}
                </p>

                {/* Button */}
                <Link
                    to={destination} // This should redirect to '/login' as expected
                    className="btn btn-lg"
                    style={{
                        background: "linear-gradient(90deg, #ff9966, #ff5e62)",
                        color: "#fff",
                        borderRadius: "50px",
                        padding: "10px 30px",
                        fontSize: "1.2rem",
                        fontWeight: "600",
                        textShadow: "1px 1px 2px rgba(0, 0, 0, 0.2)",
                        boxShadow: "0 5px 15px rgba(0, 0, 0, 0.3)",
                        transition: "all 0.3s ease",
                        textDecoration: "none",
                    }}
                    onMouseOver={(e) => {
                        e.target.style.transform = "scale(1.05)";
                        e.target.style.boxShadow = "0 8px 20px rgba(0, 0, 0, 0.4)";
                    }}
                    onMouseOut={(e) => {
                        e.target.style.transform = "scale(1)";
                        e.target.style.boxShadow = "0 5px 15px rgba(0, 0, 0, 0.3)";
                    }}
                >
                    {buttonLabel}
                </Link>
            </Col>
        </Row>
    );
}
