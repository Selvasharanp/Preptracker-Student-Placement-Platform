import { useEffect, useState, useCallback } from "react"; // Added useCallback
import API from "../services/api";
import { Card, Button, Modal, Form, Badge, Container, Row, Col, Ratio } from "react-bootstrap";
import { FaBrain, FaCheckCircle, FaFileAlt, FaTrophy, FaChevronRight } from "react-icons/fa";

function AptitudePractice() {
  const [topics, setTopics] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [scores, setScores] = useState({});
  const [showTest, setShowTest] = useState(false);
  const [currentTopic, setCurrentTopic] = useState(null);
  const [answers, setAnswers] = useState({});
  const userId = localStorage.getItem("userId");

  // Wrapped fetchTopics in useCallback
  const fetchTopics = useCallback(async () => {
    try {
      const res = await API.get("/aptitude");
      setTopics(res.data);
    } catch (err) { console.error(err); }
  }, []);

  // Wrapped fetchProgress in useCallback
  const fetchProgress = useCallback(async () => {
    if (!userId) return;
    try {
      const res = await API.get(`/aptitude/progress/${userId}`);
      const completedIds = res.data.map(p => p.aptitudeId);
      const scoreMap = {};
      res.data.forEach(p => scoreMap[p.aptitudeId] = p.score);
      setCompleted(completedIds);
      setScores(scoreMap);
    } catch (err) { console.error(err); }
  }, [userId]);

  useEffect(() => {
    fetchTopics();
    fetchProgress();
  }, [fetchTopics, fetchProgress]); // Added to dependency array

  const startTest = (topic) => { setCurrentTopic(topic); setAnswers({}); setShowTest(true); };
  const handleOptionChange = (qIndex, optIndex) => setAnswers({ ...answers, [qIndex]: optIndex });

  const submitTest = async () => {
    let score = 0;
    currentTopic.questions.forEach((q, i) => { if (answers[i] === q.answer) score++; });
    try {
      await API.post("/aptitude/submit", { userId, aptitudeId: currentTopic._id, score });
      setCompleted((prev) => [...prev, currentTopic._id]);
      setScores((prev) => ({ ...prev, [currentTopic._id]: score }));
      setShowTest(false);
    } catch (err) { alert("Submission failed"); }
  };

  const getYoutubeId = (url) => {
    if (!url) return "";
    const clean = url.split("?")[0];
    if (clean.includes("youtu.be/")) return clean.split("youtu.be/")[1];
    if (clean.includes("watch?v=")) return clean.split("watch?v=")[1];
    return "";
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f8f9fa", paddingBottom: "60px" }}>
      <Container className="pt-4">
        <div className="mb-5"><h2 className="fw-bold mb-1">Aptitude Practice</h2><p className="text-muted fs-5">Enhance logical and quantitative skills.</p></div>
        <Row className="justify-content-center"><Col lg={10}>{topics.filter((t) => t.questions?.length > 0).map((t) => (<Card key={t._id} className="border-0 shadow-sm mb-4 overflow-hidden"><Card.Body className="p-4"><div className="d-flex justify-content-between align-items-start mb-3"><div><h4 className="fw-bold mb-1">{t.title}</h4><div className="d-flex align-items-center gap-2 mt-1"><Badge bg="light" text="primary" className="border px-3 py-2 rounded-pill fw-bold"><FaBrain className="me-1" /> {t.topic}</Badge><small className="text-muted fw-bold ms-2"><FaFileAlt className="me-1" /> {t.questions.length} Questions</small></div></div>{completed.includes(t._id) && (<Badge bg="success" className="p-2 px-3 rounded-pill"><FaCheckCircle className="me-1" /> Completed</Badge>)}</div>{t.youtubeUrl && (<div className="my-4 rounded-4 overflow-hidden shadow-sm mx-auto" style={{ maxWidth: "800px" }}><Ratio aspectRatio="16x9"><iframe src={`https://www.youtube.com/embed/${getYoutubeId(t.youtubeUrl)}`} title="Tutorial" allowFullScreen /></Ratio></div>)}<hr className="my-4 opacity-10" /><div className="d-flex justify-content-between align-items-center"><div>{completed.includes(t._id) ? (<div className="d-flex align-items-center gap-2 px-3 py-2 rounded-3" style={{ background: "#fdf2f2", color: "#dc3545", border: "1px solid #fecaca" }}><FaTrophy /> <span className="fw-bold">Your Score: {scores[t._id]}/{t.questions.length}</span></div>) : (<span className="text-muted small italic">Watch then start.</span>)}</div><Button variant={completed.includes(t._id) ? "outline-secondary" : "primary"} className="px-4 py-2 fw-bold rounded-pill" onClick={() => startTest(t)}>{completed.includes(t._id) ? "Retake Test" : "Start Assessment"} <FaChevronRight size={12} /></Button></div></Card.Body></Card>))}</Col></Row>
      </Container>

      <Modal show={showTest} onHide={() => setShowTest(false)} size="lg" centered backdrop="static">
        <Modal.Header closeButton className="border-0 px-4 pt-4"><Modal.Title className="fw-bold">Assessment: {currentTopic?.title}</Modal.Title></Modal.Header>
        <Modal.Body className="px-4 pb-4"><p className="text-muted mb-4 border-bottom pb-2">Answer all questions.</p>{currentTopic?.questions.map((q, i) => (<div key={i} className="mb-4 p-4 rounded-3 border bg-light"><h6 className="fw-bold mb-3"><span className="text-primary">Q{i + 1}.</span> {q.question}</h6><div className="ps-4">{q.options.map((opt, idx) => (<Form.Check key={idx} type="radio" id={`q-${i}-${idx}`} name={`q-${i}`} label={opt} checked={answers[i] === idx} onChange={() => handleOptionChange(i, idx)} className="mb-2" />))}</div></div>))}</Modal.Body>
        <Modal.Footer className="border-0 px-4 pb-4"><Button variant="light" onClick={() => setShowTest(false)}>Cancel</Button><Button variant="success" onClick={submitTest} disabled={Object.keys(answers).length < currentTopic?.questions.length}>Submit Assessment</Button></Modal.Footer>
      </Modal>
    </div>
  );
}

export default AptitudePractice;