import { useEffect, useState } from "react";
import API from "../services/api";

function TopicNotes({ topicId }) {
  const userId = localStorage.getItem("userId");

  const [notes, setNotes] = useState([]);
  const [text, setText] = useState("");
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    const fetchNotes = async () => {
      const res = await API.get(`/notes/${topicId}/${userId}`);
      setNotes(res.data);
    };

    fetchNotes();
  }, [topicId, userId]);


  const saveNote = async () => {
    if (!text.trim()) return;

    if (editingId) {
      await API.put(`/notes/${editingId}`, { text });
    } else {
      await API.post("/notes", {
        text,
        user: userId,
        topic: topicId
      });
    }

    setText("");
    setEditingId(null);

    const res = await API.get(`/notes/${topicId}/${userId}`);
    setNotes(res.data);
  };


  const deleteNote = async (id) => {
    await API.delete(`/notes/${id}`);

    const res = await API.get(`/notes/${topicId}/${userId}`);
    setNotes(res.data);
  };


  const startEdit = (note) => {
    setText(note.text);
    setEditingId(note._id);
  };


  return (
    <div className="mt-2">

      <div className="d-flex gap-2 mb-2">
        <input
          className="form-control form-control-sm"
          placeholder="Add note..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <button
          className="btn btn-sm btn-secondary"
          onClick={saveNote}
        >
          {editingId ? "Update" : "Add"}
        </button>
      </div>

      {notes.map((note) => (
        <div key={note._id} className="small d-flex justify-content-between mb-1">
          <span>{note.text}</span>

          <div>
            <button
              className="btn btn-sm btn-outline-warning me-1"
              onClick={() => startEdit(note)}
            >
              ✏
            </button>

            <button
              className="btn btn-sm btn-outline-danger"
              onClick={() => deleteNote(note._id)}
            >
              🗑
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TopicNotes;