import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Badge, Form, InputGroup } from "react-bootstrap";
import { 
  FaLayerGroup, FaMicrochip, FaCloud, FaChevronRight, 
  FaSearch, FaGraduationCap, FaBookReader 
} from "react-icons/fa";
import API from "../services/api";

function Learning() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    API.get("/learning").then((res) => {
      setData(res.data);
    });
  }, []);

  // Helper to get icons based on category name
  const getCategoryIcon = (category) => {
    const name = category.toLowerCase();
    if (name.includes("full stack") || name.includes("web")) return <FaLayerGroup size={30} />;
    if (name.includes("machine") || name.includes("data") || name.includes("ai")) return <FaMicrochip size={30} />;
    if (name.includes("cloud")) return <FaCloud size={30} />;
    return <FaBookReader size={30} />;
  };

  const filteredData = data.filter(cat => 
    cat.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ minHeight: "100vh", background: "#f8f9fa", paddingBottom: "60px" }}>
      <Container className="pt-5">
        
        {/* Header Section */}
        <Row className="mb-5 align-items-center">
          <Col md={8}>
            <div className="d-flex align-items-center gap-2 mb-2">
              <FaGraduationCap className="text-primary" size={24} />
              <Badge bg="primary" className="bg-opacity-10 text-primary px-3 py-2 rounded-pill">
                Educational Content
              </Badge>
            </div>
            <h1 className="fw-bold text-dark display-5">Learning Resources</h1>
            <p className="text-muted fs-5">
              Structured paths to help you master modern technologies and crack technical interviews.
            </p>
          </Col>
          <Col md={4}>
            <InputGroup className="shadow-sm border rounded-3 overflow-hidden bg-white mt-3">
              <InputGroup.Text className="bg-transparent border-0 px-3">
                <FaSearch className="text-muted" />
              </InputGroup.Text>
              <Form.Control
                className="border-0 shadow-none py-2"
                placeholder="Search topics..."
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </InputGroup>
          </Col>
        </Row>

        {/* Categories Grid */}
        <Row className="g-4">
          {filteredData.length > 0 ? (
            filteredData.map((cat) => (
              <Col key={cat._id} lg={4} md={6}>
                <Card 
                  className="learning-card border-0 shadow-sm h-100"
                  onClick={() => navigate(`/learning/${cat._id}`)}
                >
                  <Card.Body className="p-4 d-flex flex-column h-100">
                    <div className="icon-wrapper mb-4">
                      {getCategoryIcon(cat.category)}
                    </div>
                    
                    <h4 className="fw-bold mb-2 text-dark">{cat.category}</h4>
                    <p className="text-muted small mb-4 flex-grow-1">
                      Deep dive into {cat.category} with structured roadmaps, interview questions, and project ideas.
                    </p>
                    
                    <div className="d-flex align-items-center justify-content-between mt-auto pt-3 border-top">
                      <span className="text-primary fw-bold small">Explore Path</span>
                      <div className="arrow-btn">
                        <FaChevronRight size={12} />
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <Col className="text-center mt-5">
              <div className="opacity-50 mb-3">
                <FaBookReader size={60} />
              </div>
              <p className="text-muted fs-5">No learning paths found matching your search.</p>
            </Col>
          )}
        </Row>
      </Container>

      {/* Internal Custom Styles */}
      <style>{`
        .learning-card {
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
          border-radius: 20px;
          background: #ffffff;
          position: relative;
          top: 0;
        }

        .learning-card:hover {
          top: -10px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.06) !important;
        }

        .icon-wrapper {
          width: 60px;
          height: 60px;
          background: #e7f1ff;
          color: #0d6efd;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 14px;
          transition: 0.3s;
        }

        .learning-card:hover .icon-wrapper {
          background: #0d6efd;
          color: #ffffff;
          transform: scale(1.1);
        }

        .arrow-btn {
          width: 32px;
          height: 32px;
          background: #f8f9fa;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: 0.3s;
          color: #adb5bd;
        }

        .learning-card:hover .arrow-btn {
          background: #0d6efd;
          color: #ffffff;
        }

        .fw-bold { font-weight: 700 !important; }
      `}</style>
    </div>
  );
}

export default Learning;