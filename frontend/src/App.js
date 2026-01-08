import { useEffect, useState } from "react";

const API_BASE_URL = window.location.hostname === "localhost" 
  ? "http://127.0.0.1:5000/students" 
  : "https://student-manager-five.vercel.app/students";

function App() {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [course, setCourse] = useState("");
  const [editId, setEditId] = useState(null);

  const fetchStudents = async () => {
    try {
      const res = await fetch(API_BASE_URL);
      const data = await res.json();
      setStudents(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  useEffect(() => { fetchStudents(); }, []);

  const addStudent = async () => {
    if (!name || !age || !course) return;
    const res = await fetch(API_BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, age, course }),
    });
    if (res.ok) {
      setName(""); setAge(""); setCourse("");
      fetchStudents();
    }
  };

  const deleteStudent = async (id) => {
    const res = await fetch(`${API_BASE_URL}/${id}`, { method: "DELETE" });
    if (res.ok) fetchStudents();
  };

  const editStudent = (student) => {
    setEditId(student.id);
    setName(student.name);
    setAge(student.age);
    setCourse(student.course);
  };

  const updateStudent = async () => {
    const res = await fetch(`${API_BASE_URL}/${editId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, age, course }),
    });
    if (res.ok) {
      setEditId(null); setName(""); setAge(""); setCourse("");
      fetchStudents();
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 p-10 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6">🎓 Student Manager</h1>
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md mb-8">
        <input className="w-full border mb-2 p-2" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <input className="w-full border mb-2 p-2" placeholder="Age" type="number" value={age} onChange={(e) => setAge(e.target.value)} />
        <input className="w-full border mb-2 p-2" placeholder="Course" value={course} onChange={(e) => setCourse(e.target.value)} />
        <button onClick={editId ? updateStudent : addStudent} className="w-full bg-blue-500 text-white p-2 rounded">
          {editId ? "Update" : "Add"} Student
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-4xl">
        {students.map((s) => (
          <div key={s.id} className="bg-white p-4 rounded shadow">
            <h3 className="font-bold">{s.name}</h3>
            <p>{s.age} yrs - {s.course}</p>
            <div className="mt-4 flex gap-2">
              <button onClick={() => editStudent(s)} className="bg-yellow-400 px-3 py-1 rounded text-sm">Edit</button>
              <button onClick={() => deleteStudent(s.id)} className="bg-red-500 text-white px-3 py-1 rounded text-sm">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;