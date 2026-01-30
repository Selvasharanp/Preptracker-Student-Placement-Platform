import { useEffect, useState, useCallback } from "react"; // Added useCallback
import { useParams, useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, ProgressBar, Button, Badge } from "react-bootstrap";
import { FaArrowLeft, FaCheckCircle, FaPlayCircle, FaListUl, FaGraduationCap, FaExternalLinkAlt } from "react-icons/fa"; // Removed FaBookOpen
import API from "../services/api";
import TopicNotes from "../Components/TopicNotes";

function LearningDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  const [course, setCourse] = useState(null);
  const [completed, setCompleted] = useState([]);
  const [percent, setPercent] = useState(0);

  // Wrapped fetchCourse in useCallback
  const fetchCourse = useCallback(async () => {
    try {
      const res = await API.get(`/learning/${id}`);
      setCourse(res.data);
    } catch (err) { console.error(err); }
  }, [id]);

  // Wrapped fetchProgress in useCallback
  const fetchProgress = useCallback(async () => {
    try {
      const res = await API.get(`/learning/progress/${id}/${userId}`);
      setPercent(res.data.percent);
      setCompleted(res.data.completedTopics);
    } catch (err) { console.error(err); }
  }, [id, userId]);

  useEffect(() => {
    fetchCourse();
    fetchProgress();
  }, [fetchCourse, fetchProgress]); // Added to dependency array

  const markComplete = async (topicId) => {
    try {
      await API.post("/learning/complete", { userId, topicId, courseId: id });
      setCompleted((prev) => [...prev, topicId]);
      fetchProgress();
    } catch (err) { console.error(err); }
  };

  if (!course) return <div className="d-flex h-100vh justify-content-center align-items-center"><div className="spinner-border text-primary" role="status"></div></div>;

  return (
    <div style={{ minHeight: "100vh", background: "#f8f9fa", paddingBottom: "60px" }}>
      <Container className="pt-4">
        <div className="mb-4"><Button variant="link" className="text-decoration-none p-0 d-flex align-items-center gap-2 text-dark fw-bold" onClick={() => navigate("/learning")}><div className="shadow-sm bg-white rounded-circle p-2"><FaArrowLeft size={14} /></div> Back</Button></div>
        <Card className="border-0 shadow-sm mb-5 rounded-4"><Card.Body className="p-5"><Row className="align-items-center"><Col md={8}><div className="d-flex align-items-center gap-2 mb-3"><Badge bg="primary" className="bg-opacity-10 text-primary p-2"><FaGraduationCap size={20} /></Badge><span className="text-uppercase fw-bold text-muted small">Course Curriculum</span></div><h1 className="fw-bold mb-3">{course.category}</h1><p className="text-muted fs-5">Step-by-step roadmap.</p></Col><Col md={4}><div className="p-4 rounded-4 bg-white border"><div className="d-flex justify-content-between mb-2"><span className="fw-bold small">Progress</span><Badge bg={percent === 100 ? "success" : "primary"}>{percent}%</Badge></div><ProgressBar now={percent} variant={percent === 100 ? "success" : "primary"} style={{ height: '8px' }} /><div className="text-center mt-2 small muted fw-bold">{completed.length} of {course.topics.length} Done</div></div></Col></Row></Card.Body></Card>
        <div className="d-flex align-items-center gap-2 mb-4 ms-2"><FaListUl className="text-primary" /> <h4 className="fw-bold mb-0">Learning Modules</h4></div>
        <Row className="justify-content-center"><Col lg={11}>{course.topics.map((topic, index) => { const isDone = completed.includes(topic._id); return (<Card key={topic._id} className={`border-0 shadow-sm mb-4 ${isDone ? 'opacity-75' : ''}`} style={{ borderRadius: '16px' }}><Card.Body className="p-4"><Row><Col xs="auto" className="d-flex flex-column align-items-center"><div className={`p-2 rounded-circle shadow-sm ${isDone ? 'bg-success' : 'bg-white border text-primary fw-bold'}`} style={{width:'32px', height:'32px', display:'flex', alignItems:'center', justifyContent:'center'}}>{isDone ? <FaCheckCircle size={16} color="white" /> : index + 1}</div>{index !== course.topics.length - 1 && <div style={{width:'2px', background:'#dee2e6', height:'60px'}}></div>}</Col><Col className="ps-3"><div className="d-flex justify-content-between align-items-start mb-4"><div><h5 className="fw-bold text-dark">{topic.title}</h5><span className="text-muted small">Lesson {index + 1}</span></div><div className="d-flex gap-2"><Button href={topic.url} target="_blank" variant="outline-primary" className="rounded-pill px-4 fw-bold"><FaPlayCircle className="me-2" /> Click here to learn <FaExternalLinkAlt size={10} /></Button>{isDone ? (<Badge bg="success" className="bg-opacity-10 text-success border border-success p-2 px-4 rounded-pill fw-bold">Mastered</Badge>) : (<Button variant="primary" className="px-4 rounded-pill fw-bold" onClick={() => markComplete(topic._id)}>Complete</Button>)}</div></div><div className="p-3 bg-light border-start border-3 border-primary shadow-sm rounded"><TopicNotes topicId={topic._id} /></div></Col></Row></Card.Body></Card>); })}</Col></Row>
      </Container>
    </div>
  );
}

export default LearningDetails;