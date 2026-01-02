from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import os

app = Flask(__name__)
CORS(app)

# ✅ Correct path for Vercel
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_FILE = os.path.join(BASE_DIR, "students.json")


def read_students():
    if not os.path.exists(DATA_FILE):
        return []
    with open(DATA_FILE, "r") as f:
        return json.load(f)


def write_students(data):
    with open(DATA_FILE, "w") as f:
        json.dump(data, f, indent=2)


# ✅ Root route (to avoid 404 on /)
@app.route("/")
def home():
    return jsonify({
        "message": "Student Manager API is running 🚀"
    })


@app.route("/students", methods=["GET"])
def get_students():
    return jsonify(read_students())


@app.route("/students", methods=["POST"])
def add_student():
    students = read_students()
    new_student = request.json
    new_student["id"] = len(students) + 1
    students.append(new_student)
    write_students(students)
    return jsonify(new_student), 201


@app.route("/students/<int:id>", methods=["DELETE"])
def delete_student(id):
    students = read_students()
    students = [s for s in students if s["id"] != id]
    write_students(students)
    return jsonify({"message": "Student deleted"})


@app.route("/students/<int:id>", methods=["PUT"])
def update_student(id):
    students = read_students()
    for s in students:
        if s["id"] == id:
            s.update(request.json)
            write_students(students)
            return jsonify(s)
    return jsonify({"message": "Student not found"}), 404
