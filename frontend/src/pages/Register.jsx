import { useState } from "react";
import { Form, Button, Container, Card, InputGroup, Spinner } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock, FaRocket, FaUserPlus } from "react-icons/fa";
import API from "../services/api";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await API.post("/auth/register", { name, email, password });
      alert("Registered Successfully");
      navigate("/login"); // Navigate to login after success
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      minHeight: "100vh", 
      background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)", 
      display: "flex", 
      alignItems: "center",
      padding: "20px 0"
    }}>
      <Container className="d-flex justify-content-center">
        <Card className="border-0 shadow-lg rounded-4 overflow-hidden" style={{ maxWidth: "450px", width: "100%" }}>
          <Card.Body className="p-5">
            
            {/* Header section */}
            <div className="text-center mb-4">
              <div className="p-3 rounded-circle bg-primary bg-opacity-10 d-inline-block mb-3">
                <FaRocket size={30} className="text-primary" />
              </div>
              <h3 className="fw-bold text-dark mb-1">Create Account</h3>
              <p className="text-muted small">Join us to start your interview preparation.</p>
            </div>

            <Form onSubmit={handleSubmit}>
              {/* Name Input */}
              <Form.Group className="mb-3">
                <Form.Label className="small fw-bold text-muted">Full Name</Form.Label>
                <InputGroup className="bg-light rounded-3 overflow-hidden border">
                  <InputGroup.Text className="bg-white border-0">
                    <FaUser className="text-muted" size={14} />
                  </InputGroup.Text>
                  <Form.Control
                    className="border-0 shadow-none py-2"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </InputGroup>
              </Form.Group>

              {/* Email Input */}
              <Form.Group className="mb-3">
                <Form.Label className="small fw-bold text-muted">Email Address</Form.Label>
                <InputGroup className="bg-light rounded-3 overflow-hidden border">
                  <InputGroup.Text className="bg-white border-0">
                    <FaEnvelope className="text-muted" size={14} />
                  </InputGroup.Text>
                  <Form.Control
                    className="border-0 shadow-none py-2"
                    type="email"
                    placeholder="john@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </InputGroup>
              </Form.Group>

              {/* Password Input */}
              <Form.Group className="mb-4">
                <Form.Label className="small fw-bold text-muted">Password</Form.Label>
                <InputGroup className="bg-light rounded-3 overflow-hidden border">
                  <InputGroup.Text className="bg-white border-0">
                    <FaLock className="text-muted" size={14} />
                  </InputGroup.Text>
                  <Form.Control
                    className="border-0 shadow-none py-2"
                    type="password"
                    placeholder="Create a strong password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </InputGroup>
              </Form.Group>

              {/* Submit Button */}
              <Button 
                type="submit" 
                variant="primary" 
                className="w-100 py-2 fw-bold rounded-pill shadow-sm d-flex align-items-center justify-content-center gap-2"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Spinner size="sm" animation="border" /> Creating Account...
                  </>
                ) : (
                  <>
                    Register <FaUserPlus size={14} />
                  </>
                )}
              </Button>
            </Form>

            {/* Footer link */}
            <div className="mt-4 text-center">
              <p className="small text-muted mb-0">
                Already have an account? <Link to="/login" className="text-primary fw-bold text-decoration-none">Login here</Link>
              </p>
            </div>
          </Card.Body>
        </Card>
      </Container>

      {/* Reusing the focus styles for consistency */}
      <style>{`
        .form-control:focus {
          background-color: #fff;
        }
        .input-group:focus-within {
          border-color: #0d6efd !important;
          box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.1);
        }
        .fw-bold { font-weight: 700 !important; }
      `}</style>
    </div>
  );
}

export default Register;