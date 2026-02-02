import { useState } from "react";
import { Form, Button, Container, Card, InputGroup, Spinner, Row, Col } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import { FaEnvelope, FaLock, FaArrowRight } from "react-icons/fa";
import { HiOutlineSparkles } from "react-icons/hi2"; // Optional: if you have heroicons, otherwise FaRocket is fine
import API from "../services/api";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await API.post("/auth/login", {
        email,
        password
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userId", res.data.user.id);
      localStorage.setItem("userName", res.data.user.name);

      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      minHeight: "100vh", 
      background: "radial-gradient(circle at top right, #6366f1, #4f46e5 10%, #111827 40%)",
      display: "flex", 
      alignItems: "center",
      fontFamily: "'Inter', sans-serif"
    }}>
      <Container>
        <Row className="justify-content-center">
          <Col md={8} lg={5} xl={4}>
            <Card className="border-0 shadow-2xl" style={{ 
              background: "rgba(255, 255, 255, 0.95)", 
              backdropFilter: "blur(10px)",
              borderRadius: "24px" 
            }}>
              <Card.Body className="p-4 p-md-5">
                
                {/* Header Section */}
                <div className="text-center mb-5">
                  <div style={{
                    width: "60px",
                    height: "60px",
                    background: "linear-gradient(135deg, #6366f1 0%, #a855f7 100%)",
                    borderRadius: "16px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 20px shadow-lg"
                  }} className="shadow-primary">
                    <HiOutlineSparkles size={30} color="white" />
                  </div>
                  <h2 className="fw-black text-dark mb-2" style={{ letterSpacing: "-1px" }}>Welcome Back</h2>
                  <p className="text-secondary small">Enter your credentials to access your account</p>
                </div>

                <Form onSubmit={handleSubmit}>
                  {/* Email Field */}
                  <Form.Group className="mb-3">
                    <Form.Label className="small fw-semibold text-uppercase text-muted mb-2" style={{ fontSize: '10px', letterSpacing: '1px' }}>Email Address</Form.Label>
                    <InputGroup className="custom-input-group">
                      <InputGroup.Text className="bg-transparent border-end-0 ps-3">
                        <FaEnvelope className="text-muted" />
                      </InputGroup.Text>
                      <Form.Control
                        className="border-start-0 ps-0"
                        type="email"
                        placeholder="example@mail.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        style={{ height: '50px', borderRadius: '0 12px 12px 0' }}
                      />
                    </InputGroup>
                  </Form.Group>

                  {/* Password Field */}
                  <Form.Group className="mb-4">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <Form.Label className="small fw-semibold text-uppercase text-muted mb-0" style={{ fontSize: '10px', letterSpacing: '1px' }}>Password</Form.Label>
                    </div>
                    <InputGroup className="custom-input-group">
                      <InputGroup.Text className="bg-transparent border-end-0 ps-3">
                        <FaLock className="text-muted" />
                      </InputGroup.Text>
                      <Form.Control
                        className="border-start-0 ps-0"
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={{ height: '50px', borderRadius: '0 12px 12px 0' }}
                      />
                    </InputGroup>
                  </Form.Group>

                  {/* Submit Button */}
                  <Button 
                    type="submit" 
                    disabled={loading}
                    className="w-100 border-0 shadow-sm transition-all d-flex align-items-center justify-content-center"
                    style={{ 
                      background: "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)",
                      height: "52px",
                      borderRadius: "12px",
                      fontWeight: "600",
                      fontSize: "1rem"
                    }}
                  >
                    {loading ? (
                      <Spinner size="sm" animation="border" />
                    ) : (
                      <>
                        Sign In <FaArrowRight size={14} className="ms-2" />
                      </>
                    )}
                  </Button>
                </Form>

                <div className="mt-5 text-center">
                  <span className="text-muted small">Don't have an account? </span>
                  <Link to="/register" className="text-decoration-none fw-bold" style={{ color: '#6366f1' }}>
                    Create Account
                  </Link>
                </div>
              </Card.Body>
            </Card>
            
            <p className="text-center mt-4 text-white-50 small">
              &copy; 2026 Preptracker. All rights reserved.
            </p>
          </Col>
        </Row>
      </Container>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;900&display=swap');

        .custom-input-group {
          background: #f8fafc;
          border-radius: 12px;
          border: 1px solid #e2e8f0;
          transition: all 0.2s ease;
        }

        .custom-input-group:focus-within {
          border-color: #6366f1;
          background: #fff;
          box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.1);
        }

        .form-control {
          background: transparent !important;
          border: none !important;
          box-shadow: none !important;
          font-size: 0.95rem;
        }

        .input-group-text {
          border: none !important;
        }

        .transition-all {
          transition: all 0.3s ease;
        }

        .transition-all:hover {
          transform: translateY(-2px);
          filter: brightness(1.1);
          box-shadow: 0 10px 20px -5px rgba(79, 70, 229, 0.4) !important;
        }

        .fw-black { font-weight: 900; }
        
        .shadow-primary {
          box-shadow: 0 8px 20px rgba(99, 102, 241, 0.3);
        }
      `}</style>
    </div>
  );
}

export default Login;