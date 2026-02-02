import { useEffect, useState, useCallback } from "react"; // Added useCallback
import { useNavigate } from "react-router-dom";
import { Card, Container, Row, Col, ProgressBar, Button, Badge } from "react-bootstrap";
import { Bar, Doughnut } from "react-chartjs-2";
import { FaCode, FaBrain, FaBookOpen, FaChartLine, FaLightbulb, FaArrowRight } from "react-icons/fa";
import API from "../services/api";

import {
  Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

function Dashboard() {
  const navigate = useNavigate();
  const [summary, setSummary] = useState(null);
  const [learningPercent, setLearningPercent] = useState(0);
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  const userName = localStorage.getItem("userName") || "User";

  // Wrapped in useCallback
 const fetchSummary = useCallback(async () => {
  try {
    if (!token) return;
    const res = await API.get(`/progress/summary/${userId}`);
    setSummary(res.data);
    const learningRes = await API.get(`/learning/overall/${userId}`);
    setLearningPercent(learningRes.data.percent);
  } catch (err) {
    console.error(err);
  }
}, [userId, token]);

  useEffect(() => {
  if (!token) {
    navigate("/login");
  }
}, [token, navigate]);

  useEffect(() => {
    fetchSummary();
  }, [fetchSummary]); // Added to dependency array

  if (!summary) return <div className="d-flex justify-content-center align-items-center" style={{height: '100vh'}}><div className="spinner-border text-primary" role="status"></div></div>;

  const getFeedback = (score) => {
    if (score < 30) return { variant: "danger", title: "Needs Improvement", message: "Focus on foundations.", action: "Go to Aptitude", link: "/aptitude-practice" };
    if (score < 60) return { variant: "warning", title: "Good Progress", message: "Push more medium problems.", action: "Practice Coding", link: "/coding-practice" };
    return { variant: "success", title: "Interview Ready!", message: "Keep practicing!", action: "View Companies", link: "/companies" };
  };

  const feedback = getFeedback(summary.overall);
  const chartOptions = { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom' } } };

  return (
    <div style={{ minHeight: "100vh", background: "#f0f2f5", paddingBottom: "40px" }}>
      <Container className="pt-4">
        <div className="mb-4">
          <Row className="align-items-center">
            <Col md={8}>
              <h2 className="fw-bold mb-1">Hello, {userName}! </h2>
              <p className="text-muted fs-5 mb-0">Track your interview readiness.</p>
            </Col>
            <Col md={4} className="text-md-end">
              <div className="d-inline-block text-start p-3 bg-white rounded-3 shadow-sm border-start border-primary border-4">
                <small className="text-uppercase fw-bold text-muted small">Overall Score</small>
                <div className="d-flex align-items-center gap-2">
                  <h2 className="mb-0 fw-bold text-primary">{summary.overall}%</h2>
                  <div style={{ width: '100px' }}><ProgressBar now={summary.overall} variant="primary" style={{ height: '8px' }} /></div>
                </div>
              </div>
            </Col>
          </Row>
        </div>

        <Row className="mb-4">
          <Col md={12}>
            <Card className={`border-0 shadow-sm bg-opacity-10 bg-${feedback.variant}`} style={{ borderLeft: `5px solid var(--bs-${feedback.variant})` }}>
              <Card.Body className="p-4 d-flex flex-wrap align-items-center justify-content-between gap-3">
                <div className="d-flex align-items-center gap-3">
                  <div className={`p-3 rounded-circle bg-${feedback.variant} text-white d-flex align-items-center justify-content-center shadow-sm`}><FaLightbulb size={24} /></div>
                  <div><h5 className={`fw-bold mb-1 text-${feedback.variant}`}>{feedback.title}</h5><p className="mb-0 text-dark opacity-75">{feedback.message}</p></div>
                </div>
                <Button variant={feedback.variant} className="fw-bold px-4 rounded-pill d-flex align-items-center gap-2" onClick={() => navigate(feedback.link)}>{feedback.action} <FaArrowRight size={12} /></Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row className="g-4">
          <StatCard title="Coding Problems" value={summary.codingCount} icon={<FaCode size={22} color="#0d6efd" />} color="#e7f1ff" />
          <StatCard title="Aptitude Tests" value={summary.aptitudeCount} icon={<FaBrain size={22} color="#198754" />} color="#e6f4ea" />
          <StatCard title="Learning Path" value={`${learningPercent}%`} icon={<FaBookOpen size={22} color="#ffc107" />} color="#fff9e6" />
          <StatCard title="Performance" value={`${summary.overall}%`} icon={<FaChartLine size={22} color="#dc3545" />} color="#fdf2f2" isProgress={true} />
        </Row>

        <Row className="mt-4 g-4">
          <Col lg={7}><Card className="border-0 shadow-sm h-100"><Card.Body className="p-4"><h5 className="fw-bold mb-4">Platform Wise Progress</h5><div style={{ height: "300px" }}><Bar data={{ labels: summary.codingByPlatform.map(p => p._id), datasets: [{ label: "Solved", data: summary.codingByPlatform.map(p => p.count), backgroundColor: "rgba(13, 110, 253, 0.8)", borderRadius: 8 }] }} options={chartOptions} /></div></Card.Body></Card></Col>
          <Col lg={5}><Card className="border-0 shadow-sm h-100"><Card.Body className="p-4 text-center"><h5 className="fw-bold mb-4">Aptitude Readiness</h5><div style={{ height: "250px" }}><Doughnut data={{ labels: ["Completed", "Remaining"], datasets: [{ data: [summary.aptitudeCount, 30 - summary.aptitudeCount], backgroundColor: ["#198754", "#e9ecef"], borderWidth: 0 }] }} options={chartOptions} /></div><div className="mt-3"><Badge bg="light" text="dark" className="border px-3 py-2">Goal: 30 Tests</Badge></div></Card.Body></Card></Col>
        </Row>
      </Container>
    </div>
  );
}

function StatCard({ title, value, icon, color, isProgress }) {
  return (
    <Col md={3}><Card className="border-0 shadow-sm h-100 card-hover"><Card.Body className="d-flex align-items-center p-4"><div className="p-3 rounded-3 me-3 d-flex align-items-center justify-content-center" style={{ background: color, width: "52px", height: "52px" }}>{icon}</div><div className="flex-grow-1"><p className="text-muted mb-0 small fw-bold text-uppercase">{title}</p><h3 className="mb-0 fw-bold">{value}</h3>{isProgress && <ProgressBar now={parseInt(value)} variant="danger" className="mt-2" style={{height: '5px'}} />}</div></Card.Body></Card></Col>
  );
}

export default Dashboard;