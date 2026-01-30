import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Added useNavigate
import { Container, Row, Col, Card, ListGroup, Button, Badge } from "react-bootstrap";
import { 
  FaBrain, FaCode, FaUserTie, FaExternalLinkAlt, 
  FaChevronRight, FaArrowLeft // Added FaArrowLeft
} from "react-icons/fa";
import API from "../services/api";

function CompanyDetails() {
  const { id } = useParams();
  const navigate = useNavigate(); // Initialize navigate
  const [company, setCompany] = useState(null);

  useEffect(() => {
    API.get(`/companies/${id}`)
      .then(res => setCompany(res.data))
      .catch(err => console.log(err));
  }, [id]);

  if (!company) return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: "80vh" }}>
      <div className="spinner-border text-primary" role="status"></div>
    </div>
  );

  return (
    <div style={{ minHeight: "100vh", background: "#f8f9fa", paddingBottom: "60px" }}>
      <Container className="pt-4">
        
        {/* --- BACK BUTTON --- */}
        <Button 
          variant="link" 
          className="text-decoration-none text-secondary d-flex align-items-center gap-2 mb-4 p-0 fw-bold back-btn"
          onClick={() => navigate("/companies")}
        >
          <FaArrowLeft size={14} /> Back to Companies
        </Button>

        {/* Header Section */}
        <div className="text-center mb-5">
          <Badge bg="primary" className="mb-2 px-3 py-2 rounded-pill shadow-sm" style={{ fontSize: '0.8rem' }}>
            Preparation Guide
          </Badge>
          <h1 className="fw-bold text-dark display-5">{company.name} Preparation</h1>
          <p className="text-muted fs-5">Everything you need to crack the {company.name} interview process.</p>
        </div>

        <Row className="justify-content-center g-4">
          <Col lg={10}>
            
            {/* ✅ Aptitude Section */}
            <Card className="border-0 shadow-sm mb-4 overflow-hidden rounded-4">
              <Card.Header className="bg-white border-bottom-0 pt-4 px-4 d-flex align-items-center gap-3">
                <div className="p-2 rounded-3 bg-primary bg-opacity-10 text-primary">
                  <FaBrain size={24} />
                </div>
                <h4 className="fw-bold mb-0">Aptitude Topics</h4>
              </Card.Header>
              <Card.Body className="px-4 pb-4">
                <Row>
                  <Col md={7}>
                    <ListGroup variant="flush" className="mb-3">
                      {company.aptitude?.topics.map((t, i) => (
                        <ListGroup.Item key={i} className="border-0 px-0 d-flex align-items-center gap-2 text-secondary">
                          <FaChevronRight size={10} className="text-primary opacity-50" /> {t}
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  </Col>
                  <Col md={5} className="border-start ps-4">
                    <p className="small fw-bold text-uppercase text-muted mb-2">Useful Resources</p>
                    {company.aptitude?.links.map((l, i) => (
                      <Button 
                        key={i} 
                        href={l.url} 
                        target="_blank" 
                        variant="outline-primary" 
                        className="w-100 mb-2 text-start d-flex justify-content-between align-items-center py-2"
                      >
                        <span className="text-truncate" style={{maxWidth: '85%'}}>{l.title}</span>
                        <FaExternalLinkAlt size={12} />
                      </Button>
                    ))}
                  </Col>
                </Row>
              </Card.Body>
            </Card>

            {/* ✅ Coding Section */}
            <Card className="border-0 shadow-sm mb-4 overflow-hidden rounded-4">
              <Card.Header className="bg-white border-bottom-0 pt-4 px-4 d-flex align-items-center gap-3">
                <div className="p-2 rounded-3 bg-success bg-opacity-10 text-success">
                  <FaCode size={24} />
                </div>
                <h4 className="fw-bold mb-0">Coding Preparation</h4>
              </Card.Header>
              <Card.Body className="px-4 pb-4">
                <Row>
                  <Col md={7}>
                    <ListGroup variant="flush" className="mb-3">
                      {company.coding?.topics.map((t, i) => (
                        <ListGroup.Item key={i} className="border-0 px-0 d-flex align-items-center gap-2 text-secondary">
                          <FaChevronRight size={10} className="text-success opacity-50" /> {t}
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  </Col>
                  <Col md={5} className="border-start ps-4">
                    <p className="small fw-bold text-uppercase text-muted mb-2">Practice Platforms</p>
                    {company.coding?.links.map((l, i) => (
                      <Button 
                        key={i} 
                        href={l.url} 
                        target="_blank" 
                        variant="outline-success" 
                        className="w-100 mb-2 text-start d-flex justify-content-between align-items-center py-2"
                      >
                        <span className="text-truncate" style={{maxWidth: '85%'}}>{l.title}</span>
                        <FaExternalLinkAlt size={12} />
                      </Button>
                    ))}
                  </Col>
                </Row>
              </Card.Body>
            </Card>

            {/* ✅ HR Section */}
            <Card className="border-0 shadow-sm overflow-hidden rounded-4">
              <Card.Header className="bg-white border-bottom-0 pt-4 px-4 d-flex align-items-center gap-3">
                <div className="p-2 rounded-3 bg-warning bg-opacity-10 text-dark">
                  <FaUserTie size={24} />
                </div>
                <h4 className="fw-bold mb-0">HR Interview</h4>
              </Card.Header>
              <Card.Body className="px-4 pb-4">
                <p className="text-muted mb-3">Prepare for behavioral questions and cultural fit assessments.</p>
                <Row className="g-2">
                  {company.hr?.links.map((l, i) => (
                    <Col md={6} key={i}>
                      <a 
                        href={l.url} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="text-decoration-none d-block p-3 border rounded-3 resource-link"
                      >
                        <div className="d-flex justify-content-between align-items-center">
                          <span className="fw-bold text-dark">{l.title}</span>
                          <FaExternalLinkAlt size={12} className="text-muted" />
                        </div>
                      </a>
                    </Col>
                  ))}
                </Row>
              </Card.Body>
            </Card>

          </Col>
        </Row>
      </Container>

      <style>{`
        .back-btn {
          transition: transform 0.2s ease;
        }
        .back-btn:hover {
          transform: translateX(-5px);
          color: #0d6efd !important;
        }
        .resource-link {
          transition: all 0.2s ease;
          background: #fff;
        }
        .resource-link:hover {
          background: #f1f5f9;
          border-color: #cbd5e1 !important;
          transform: translateX(5px);
        }
        .rounded-4 { border-radius: 1rem !important; }
        .fw-bold { font-weight: 700 !important; }
      `}</style>
    </div>
  );
}

export default CompanyDetails;