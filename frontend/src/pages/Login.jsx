import { useState } from "react";
import { Form, Button, Container, Card, InputGroup, Spinner } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import { FaEnvelope, FaLock, FaRocket, FaSignInAlt } from "react-icons/fa";
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
      background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)", 
      display: "flex", 
      alignItems: "center" 
    }}>
      <Container className="d-flex justify-content-center">
        <Card className="border-0 shadow-lg rounded-4 overflow-hidden" style={{ maxWidth: "400px", width: "100%" }}>
          <Card.Body className="p-5">
            
            {/* Logo and Welcome Text */}
            <div className="text-center mb-4">
              <div className="p-3 rounded-circle bg-primary bg-opacity-10 d-inline-block mb-3">
                <FaRocket size={30} className="text-primary" />
              </div>
              <h3 className="fw-bold text-dark mb-1">Welcome Back!</h3>
              <p className="text-muted small">Sign in to continue your preparation path.</p>
            </div>

            <Form onSubmit={handleSubmit}>
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
                    placeholder="name@company.com"
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
                    placeholder="Enter your password"
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
                    <Spinner size="sm" animation="border" /> Logging in...
                  </>
                ) : (
                  <>
                    Login <FaSignInAlt size={14} />
                  </>
                )}
              </Button>
            </Form>

            {/* Footer */}
            <div className="mt-4 text-center">
              <p className="small text-muted mb-0">
                New user? <Link to="/register" className="text-primary fw-bold text-decoration-none">Create an account</Link>
              </p>
            </div>
          </Card.Body>
        </Card>
      </Container>
      
      {/* Global Style overrides */}
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

export default Login;