import { useEffect, useState, useCallback } from "react"; // Added useCallback
import { Button, Card, Badge, Container, Row, Col, ListGroup, Ratio } from "react-bootstrap";
import { FaCode, FaCheckCircle, FaExternalLinkAlt, FaPlayCircle, FaListUl } from "react-icons/fa"; // Removed FaYoutube
import API from "../services/api";

function CodingPractice() {
  const [problems, setProblems] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState("All");
  const [completed, setCompleted] = useState(false);
  const userId = localStorage.getItem("userId");

  const platformTheme = { LeetCode: { bg: "#fff3e0", color: "#ffa116" }, CodeChef: { bg: "#efebe9", color: "#5b4638" }, HackerRank: { bg: "#e8f5e9", color: "#2ec866" }, All: { bg: "#e3f2fd", color: "#0d6efd" } };

  // Wrapped checkCompleted in useCallback
  const checkCompleted = useCallback(async (problemId) => {
    try {
      const res = await API.get(`/progress/coding/check/${userId}/${problemId}`);
      setCompleted(res.data.completed);
    } catch { setCompleted(false); }
  }, [userId]);

  // Wrapped fetchProblems in useCallback
  const fetchProblems = useCallback(async () => {
    try {
      const res = await API.get("/problems");
      setProblems(res.data);
      setFiltered(res.data);
      setSelected(res.data[0]);
      if (res.data[0]) checkCompleted(res.data[0]._id);
    } catch (err) { console.error(err); }
  }, [checkCompleted]);

  useEffect(() => {
    fetchProblems();
  }, [fetchProblems]); // Added to dependency array

  const handleFilter = (platform) => {
    setFilter(platform);
    const list = platform === "All" ? problems : problems.filter((p) => p.platform === platform);
    setFiltered(list);
    setSelected(list[0]);
    if (list[0]) checkCompleted(list[0]._id);
  };

  const markAsCompleted = async () => {
    try {
      await API.post("/progress/coding", { userId, problemId: selected._id, platform: selected.platform });
      setCompleted(true);
    } catch (err) { alert(err.message); }
  };

  const getYoutubeId = (url) => {
    if (!url) return "";
    const clean = url.split("?")[0];
    if (clean.includes("youtu.be/")) return clean.split("youtu.be/")[1];
    if (clean.includes("watch?v=")) return clean.split("watch?v=")[1];
    return "";
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f8f9fa", paddingBottom: "50px" }}>
      <Container className="pt-4">
        <div className="mb-4 d-flex align-items-center justify-content-between">
          <div><h2 className="fw-bold mb-1">Coding Practice</h2><p className="text-muted mb-0">Solve problems across platforms.</p></div>
        </div>

        <Card className="border-0 shadow-sm mb-4"><Card.Body className="p-2"><div className="d-flex flex-wrap gap-2 justify-content-center">{["All", "LeetCode", "CodeChef", "HackerRank"].map((p) => (<Button key={p} variant={filter === p ? "primary" : "outline-light"} className={`rounded-pill px-4 fw-bold ${filter !== p ? 'text-dark border-0' : ''}`} onClick={() => handleFilter(p)}>{p}</Button>))}</div></Card.Body></Card>

        <Row className="g-4">
          <Col lg={4}><Card className="border-0 shadow-sm overflow-hidden h-100"><div className="p-3 border-bottom bg-white sticky-top"><h6 className="mb-0 fw-bold d-flex align-items-center gap-2"><FaListUl className="text-primary" /> Problem List</h6></div><div style={{ maxHeight: "600px", overflowY: "auto" }}><ListGroup variant="flush">{filtered.map((p) => (<ListGroup.Item key={p._id} action className={`py-3 px-4 border-start border-4 ${selected?._id === p._id ? "bg-light border-primary" : "border-transparent"}`} onClick={() => { setSelected(p); checkCompleted(p._id); }}><div className="d-flex justify-content-between align-items-center"><div className="fw-bold text-truncate" style={{ maxWidth: '80%', color: selected?._id === p._id ? '#0d6efd' : '#2d3436' }}>{p.title}</div><small className="text-muted" style={{fontSize: '0.7rem'}}>{p.platform}</small></div></ListGroup.Item>))}</ListGroup></div></Card></Col>
          <Col lg={8}>{selected ? (<Card className="border-0 shadow-sm h-100"><Card.Body className="p-4"><div className="d-flex flex-wrap justify-content-between align-items-start mb-4 gap-2"><div><Badge className="mb-2 px-3 py-2 rounded-pill border" style={{ background: platformTheme[selected.platform]?.bg, color: platformTheme[selected.platform]?.color }}>{selected.platform}</Badge><h3 className="fw-bold mb-1">{selected.title}</h3><p className="text-muted mb-0">{selected.description}</p></div>{completed && (<Badge bg="success" className="p-2 px-3 rounded-pill"><FaCheckCircle className="me-2" /> Completed</Badge>)}</div>{selected.youtubeUrl && getYoutubeId(selected.youtubeUrl) ? (<div className="mb-4 rounded-4 overflow-hidden shadow-sm"><Ratio aspectRatio="16x9"><iframe src={`https://www.youtube.com/embed/${getYoutubeId(selected.youtubeUrl)}`} title="Video" allowFullScreen /></Ratio></div>) : (<div className="mb-4 bg-light rounded-4 d-flex flex-column align-items-center justify-content-center p-5 text-muted border border-dashed"><FaPlayCircle size={40} className="mb-2 opacity-25" /><p className="mb-0 small">No video explanation.</p></div>)}<div className="d-flex flex-wrap gap-3 mt-auto"><a href={selected.problemUrl} target="_blank" rel="noreferrer" className="flex-grow-1 text-decoration-none"><Button variant="primary" className="w-100 py-2 fw-bold d-flex align-items-center justify-content-center gap-2"><FaCode /> Solve on {selected.platform} <FaExternalLinkAlt size={12} /></Button></a><Button variant={completed ? "outline-secondary" : "success"} className="px-4 fw-bold shadow-sm" disabled={completed} onClick={markAsCompleted}>{completed ? "Finished" : "Mark as Completed"}</Button></div></Card.Body></Card>) : <div className="p-5 text-center">Select a problem.</div>}</Col>
        </Row>
      </Container>
    </div>
  );
}

export default CodingPractice;