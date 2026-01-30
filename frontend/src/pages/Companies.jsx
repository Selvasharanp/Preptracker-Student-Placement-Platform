import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Form, InputGroup } from "react-bootstrap";
import { FaSearch, FaArrowRight } from "react-icons/fa";
import API from "../services/api";

function Companies() {
  const [companies, setCompanies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  // 1. Wrapped fetch in useCallback to remove ESLint warnings
  const fetchCompanies = useCallback(async () => {
    try {
      const res = await API.get("/companies");
      setCompanies(res.data);
    } catch (err) {
      console.error("Error fetching companies:", err);
    }
  }, []);

  // 2. useEffect with proper dependency
  useEffect(() => {
    fetchCompanies();
  }, [fetchCompanies]);

  // 3. Filter logic
  const filteredCompanies = companies.filter((c) =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ minHeight: "100vh", background: "#f8f9fa", paddingBottom: "60px" }}>
      <Container className="pt-4">
        
        {/* Header Section */}
        <div className="text-center mb-5">
          <h2 className="fw-bold mb-2" style={{ color: "#2d3436", fontSize: "2.4rem" }}>
            Company Guides
          </h2>
          <p className="text-muted fs-5 mb-4">Master the interview patterns of top tech giants.</p>
          
          <Row className="justify-content-center">
            <Col md={6}>
              <InputGroup className="shadow-sm border rounded-pill overflow-hidden bg-white px-3 py-1">
                <InputGroup.Text className="bg-transparent border-0">
                  <FaSearch className="text-muted" />
                </InputGroup.Text>
                <Form.Control
                  className="border-0 shadow-none py-2"
                  placeholder="Search e.g. Amazon, Google..."
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </InputGroup>
            </Col>
          </Row>
        </div>

        {/* Grid Section */}
        <Row className="g-4">
          {filteredCompanies.length > 0 ? (
            filteredCompanies.map((company) => (
              <Col key={company._id} xs={12} sm={6} md={4} lg={3}>
                <Card 
                  className="company-custom-card border-0 h-100 shadow-sm text-center py-4 px-3"
                  onClick={() => navigate(`/companies/${company._id}`)}
                >
                  <Card.Body className="d-flex flex-column align-items-center justify-content-center">
                    {/* Circle Logo Placeholder */}
                    <div className="company-logo-circle mb-3">
                      {company.name.charAt(0)}
                    </div>
                    
                    <h5 className="fw-bold mb-2 text-dark">{company.name}</h5>
                    
                    <div className="hover-reveal-btn mt-2">
                      View Details <FaArrowRight size={10} className="ms-1" />
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <Col className="text-center mt-5 py-5 opacity-50">
              <FaSearch size={40} className="mb-3" />
              <p className="fs-5">No companies match your search.</p>
            </Col>
          )}
        </Row>
      </Container>

      {/* 4. CSS for Hover Effects & Warnings Fix */}
      <style>{`
        /* Card Base Style */
        .company-custom-card {
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
          border-radius: 20px;
          background: #ffffff;
          position: relative;
          top: 0;
        }

        /* Hover Interaction */
        .company-custom-card:hover {
          top: -10px; /* Lift effect */
          transform: scale(1.02);
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1) !important;
        }

        /* Logo Circle Style */
        .company-logo-circle {
          width: 65px;
          height: 65px;
          background: #f0f7ff;
          color: #0d6efd;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          font-weight: 800;
          font-size: 1.6rem;
          transition: 0.3s ease;
        }

        /* Change Logo Color on Hover */
        .company-custom-card:hover .company-logo-circle {
          background: #0d6efd;
          color: #ffffff;
          box-shadow: 0 4px 12px rgba(13, 110, 253, 0.3);
        }

        /* Reveal Button Animation */
        .hover-reveal-btn {
          font-size: 0.8rem;
          font-weight: 700;
          color: #0d6efd;
          opacity: 0.4;
          transition: 0.3s ease;
        }

        .company-custom-card:hover .hover-reveal-btn {
          opacity: 1;
          color: #0d6efd;
        }

        .fw-bold { font-weight: 700 !important; }
      `}</style>
    </div>
  );
}

export default Companies;