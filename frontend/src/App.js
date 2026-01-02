// import { useEffect, useState } from "react";


// const API_BASE_URL = window.location.hostname === "localhost" 
//   ? "http://127.0.0.1:5000/students" 
//   : "https://student-manager-five.vercel.app/students";

// function App() {
//   const [students, setStudents] = useState([]);
//   const [name, setName] = useState("");
//   const [age, setAge] = useState("");
//   const [course, setCourse] = useState("");
//   const [editId, setEditId] = useState(null);


//   const fetchStudents = async () => {
//     try {
//       const res = await fetch(API_BASE_URL);
//       if (!res.ok) throw new Error("Failed to fetch students");
//       const data = await res.json();
//       setStudents(Array.isArray(data) ? data : []);
//     } catch (err) {
//       console.error("Backend connection error:", err.message);
//     }
//   };

//   useEffect(() => {
//     fetchStudents();
//   }, []);

 
//   const addStudent = async () => {
//     if (!name || !age || !course) return;

//     try {
//       const res = await fetch(API_BASE_URL, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ name, age, course }),
//       });

//       if (res.ok) {
//         setName("");
//         setAge("");
//         setCourse("");
//         fetchStudents();
//       } else {
//         alert("Server error while adding student.");
//       }
//     } catch (err) {
//       alert("Cannot connect to server. Is your Flask backend running?");
//     }
//   };


//   const deleteStudent = async (id) => {
//     try {
//       const res = await fetch(`${API_BASE_URL}/${id}`, {
//         method: "DELETE",
//       });
//       if (res.ok) fetchStudents();
//     } catch (err) {
//       console.error("Delete failed:", err);
//     }
//   };


//   const editStudent = (student) => {
//     setEditId(student.id);
//     setName(student.name);
//     setAge(student.age);
//     setCourse(student.course);
//   };

 
//   const updateStudent = async () => {
//     try {
//       const res = await fetch(`${API_BASE_URL}/${editId}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ name, age, course }),
//       });

//       if (res.ok) {
//         setEditId(null);
//         setName("");
//         setAge("");
//         setCourse("");
//         fetchStudents();
//       }
//     } catch (err) {
//       console.error("Update failed:", err);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-200 flex flex-col items-center py-10 px-4">
      
//       <h1 className="text-4xl font-extrabold text-indigo-700 mb-10 text-center">
//         🎓 Student Manager App
//       </h1>

//       <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl p-8 mb-10">
//         <h2 className="text-2xl font-semibold text-gray-700 mb-6 text-center">
//           {editId ? "Edit Student Details" : "Add Student Details"}
//         </h2>

//         <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
//           <input
//             className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400 outline-none"
//             placeholder="Student Name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//           />

//           <input
//             className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400 outline-none"
//             placeholder="Age"
//             type="number"
//             value={age}
//             onChange={(e) => setAge(e.target.value)}
//           />

//           <input
//             className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400 outline-none"
//             placeholder="Course"
//             value={course}
//             onChange={(e) => setCourse(e.target.value)}
//           />

//           <button
//             type="button"
//             onClick={editId ? updateStudent : addStudent}
//             className={`w-full py-2 rounded-lg text-white font-semibold transition ${
//               editId
//                 ? "bg-green-500 hover:bg-green-600"
//                 : "bg-indigo-500 hover:bg-indigo-600"
//             }`}
//           >
//             {editId ? "Update Student" : "Add Student"}
//           </button>
//         </form>
//       </div>

//       <div className="w-full max-w-5xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//         {students.length === 0 ? (
//           <p className="col-span-full text-center text-gray-600">
//             No students added yet 🚫
//           </p>
//         ) : (
//           students.map((s) => (
//             <div
//               key={s.id}
//               className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition"
//             >
//               <h3 className="text-xl font-bold text-indigo-600 mb-1">
//                 {s.name}
//               </h3>
//               <p className="text-gray-600 mb-4">
//                 🎂 {s.age} years <br />
//                 📘 {s.course}
//               </p>
//               <div className="flex justify-between">
//                 <button
//                   onClick={() => editStudent(s)}
//                   className="px-4 py-1 rounded-lg bg-yellow-400 text-white hover:bg-yellow-500"
//                 >
//                   Edit
//                 </button>
//                 <button
//                   onClick={() => deleteStudent(s.id)}
//                   className="px-4 py-1 rounded-lg bg-red-500 text-white hover:bg-red-600"
//                 >
//                   Delete
//                 </button>
//               </div>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// }

// export default App;



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