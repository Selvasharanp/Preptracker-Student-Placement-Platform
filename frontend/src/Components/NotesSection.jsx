import { useEffect, useState, useCallback } from "react"; // Added useCallback
import API from "../services/api";
import { Form, Button } from "react-bootstrap";
import { FaEdit, FaSave } from "react-icons/fa";

function NotesSection({ topicId }) {
  const [note, setNote] = useState("");
  const [editing, setEditing] = useState(false);
  const userId = localStorage.getItem("userId");

  /* =========================================
     FETCH NOTES (Wrapped in useCallback)
  ========================================= */
  const fetchNotes = useCallback(async () => {
    if (!userId || !topicId) return;
    try {
      const res = await API.get(`/learning/notes/${userId}/${topicId}`);
      if (res.data) {
        setNote(res.data.content);
      }
    } catch (err) {
      console.error("Error fetching notes:", err);
    }
  }, [userId, topicId]); // Dependencies for the function

  /* =========================================
     USEEFFECT (Dependency included)
  ========================================= */
  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]); // Error is fixed here

  /* =========================================
     SAVE NOTES
  ========================================= */
  const handleSave = async () => {
    try {
      await API.post("/learning/notes", {
        userId,
        topicId,
        content: note,
      });
      setEditing(false);
    } catch (err) {
      console.error("Error saving notes:", err);
    }
  };

  return (
    <div className="notes-section mt-3">
      <div className="d-flex justify-content-between align-items-center mb-2">
        <span className="fw-bold small text-muted">My Private Notes</span>
        <div>
          {editing ? (
            <Button size="sm" variant="success" className="py-0 px-2" onClick={handleSave}>
              <FaSave size={12} className="me-1" /> Save
            </Button>
          ) : (
            <Button size="sm" variant="link" className="p-0 text-decoration-none" onClick={() => setEditing(true)}>
              <FaEdit size={14} /> Edit
            </Button>
          )}
        </div>
      </div>

      {editing ? (
        <Form.Control
          as="textarea"
          rows={3}
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="small border-0 shadow-none bg-white p-2"
          placeholder="Write your notes here..."
          autoFocus
        />
      ) : (
        <div 
          className="p-2 rounded bg-white bg-opacity-50" 
          style={{ minHeight: "40px", cursor: "pointer" }}
          onClick={() => setEditing(true)}
        >
          <p className="small mb-0 text-secondary" style={{ fontStyle: note ? "normal" : "italic" }}>
            {note || "Click edit to add your personal notes for this topic..."}
          </p>
        </div>
      )}
    </div>
  );
}

export default NotesSection;