import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaSignOutAlt, FaRocket } from "react-icons/fa";

function TopNav() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  // Helper to check if a link is active
  const isActive = (path) => location.pathname === path;

  return (
    <Navbar bg="white" expand="lg" className="shadow-sm sticky-top mb-4 py-3">
      <Container>
        <Navbar.Brand 
          as={Link} 
          to="/dashboard" 
          className="fw-bold text-primary d-flex align-items-center gap-2"
        >
          <FaRocket /> PrepTracker
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto me-4">
            <Nav.Link 
              as={Link} 
              to="/dashboard" 
              className={`px-3 fw-500 ${isActive("/dashboard") ? "text-primary fw-bold" : ""}`}
            >
              Dashboard
            </Nav.Link>
            <Nav.Link 
              as={Link} 
              to="/coding-practice" 
              className={`px-3 fw-500 ${isActive("/coding-practice") ? "text-primary fw-bold" : ""}`}
            >
              Coding Practice
            </Nav.Link>
            <Nav.Link 
              as={Link} 
              to="/aptitude-practice" 
              className={`px-3 fw-500 ${isActive("/aptitude-practice") ? "text-primary fw-bold" : ""}`}
            >
              Aptitude
            </Nav.Link>
            <Nav.Link 
              as={Link} 
              to="/companies" 
              className={`px-3 fw-500 ${isActive("/companies") ? "text-primary fw-bold" : ""}`}
            >
              Companies
            </Nav.Link>
            <Nav.Link 
              as={Link} 
              to="/learning" 
              className={`px-3 fw-500 ${isActive("/learning") ? "text-primary fw-bold" : ""}`}
            >
              Learning Resources
            </Nav.Link>
          </Nav>
          
          <Button 
            variant="outline-danger" 
            size="sm" 
            className="d-flex align-items-center gap-2 px-3 rounded-pill"
            onClick={handleLogout}
          >
            <FaSignOutAlt /> Logout
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default TopNav;