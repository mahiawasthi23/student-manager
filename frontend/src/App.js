import { useEffect, useState } from "react";

function App() {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [course, setCourse] = useState("");
  const [editId, setEditId] = useState(null);

  const fetchStudents = async () => {
    // const res = await fetch("http://127.0.0.1:5000/students");
    const res = await fetch("https://student-manager-five.vercel.app/students")
    const data = await res.json();
    setStudents(data);
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const addStudent = async () => {
    if (!name || !age || !course) return;

    // await fetch("http://127.0.0.1:5000/students", {
      await fetch("https://student-manager-five.vercel.app/students",{
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, age, course }),
    });

    setName("");
    setAge("");
    setCourse("");
    fetchStudents();
  };

  const deleteStudent = async (id) => {
    // await fetch(`http://127.0.0.1:5000/students/${id}`, {
    await fetch(`https://student-manager-five.vercel.app/students/${id}`, {
      method: "DELETE",
    });
    fetchStudents();
  };

  const editStudent = (student) => {
    setEditId(student.id);
    setName(student.name);
    setAge(student.age);
    setCourse(student.course);
  };

  const updateStudent = async () => {
    // await fetch(`http://127.0.0.1:5000/students/${editId}`, {
    await fetch(`https://student-manager-five.vercel.app/students/${editId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, age, course }),
    });

    setEditId(null);
    setName("");
    setAge("");
    setCourse("");
    fetchStudents();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-200 flex flex-col items-center py-10 px-4">
      
      <h1 className="text-4xl font-extrabold text-indigo-700 mb-10 text-center">
        🎓 Student Manager App
      </h1>

      <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl p-8 mb-10">
        <h2 className="text-2xl font-semibold text-gray-700 mb-6 text-center">
          {editId ? "Edit Student Details" : "Add Student Details"}
        </h2>

        <form className="space-y-4">
          <input
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400 outline-none"
            placeholder="Student Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400 outline-none"
            placeholder="Age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />

          <input
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400 outline-none"
            placeholder="Course"
            value={course}
            onChange={(e) => setCourse(e.target.value)}
          />

          <button
            type="button"
            onClick={editId ? updateStudent : addStudent}
            className={`w-full py-2 rounded-lg text-white font-semibold transition ${
              editId
                ? "bg-green-500 hover:bg-green-600"
                : "bg-indigo-500 hover:bg-indigo-600"
            }`}
          >
            {editId ? "Update Student" : "Add Student"}
          </button>
        </form>
      </div>

      <div className="w-full max-w-5xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {students.length === 0 && (
          <p className="col-span-full text-center text-gray-600">
            No students added yet 🚫
          </p>
        )}

        {students.map((s) => (
          <div
            key={s.id}
            className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition"
          >
            <h3 className="text-xl font-bold text-indigo-600 mb-1">
              {s.name}
            </h3>

            <p className="text-gray-600 mb-4">
              🎂 {s.age} years <br />
              📘 {s.course}
            </p>

            <div className="flex justify-between">
              <button
                onClick={() => editStudent(s)}
                className="px-4 py-1 rounded-lg bg-yellow-400 text-white hover:bg-yellow-500"
              >
                Edit
              </button>

              <button
                onClick={() => deleteStudent(s.id)}
                className="px-4 py-1 rounded-lg bg-red-500 text-white hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;

