# from flask import Flask, request, jsonify
# from flask_cors import CORS
# import json
# import os

# app = Flask(__name__)
# CORS(app)


# BASE_DIR = os.path.dirname(os.path.abspath(__file__))
# DATA_FILE = os.path.join(BASE_DIR, "students.json")

# def read_students():
#     try:
#         if not os.path.exists(DATA_FILE):
#             return []
#         with open(DATA_FILE, "r") as f:
#             content = f.read()
#             if not content:
#                 return []
#             return json.loads(content)
#     except Exception as e:
#         print(f"Error reading file: {e}")
#         return []

# def write_students(data):
#     try:
#         with open(DATA_FILE, "w") as f:
#             json.dump(data, f, indent=2)
#     except Exception as e:
#         print(f"Write failed (Normal on Vercel): {e}")

# @app.route("/")
# def home():
#     return jsonify({
#         "status": "online",
#         "message": "Student Manager API is running 🚀"
#     })

# @app.route("/students", methods=["GET"])
# def get_students():
#     return jsonify(read_students())

# @app.route("/students", methods=["POST"])
# def add_student():
#     students = read_students()
#     new_student = request.json
    
#     new_id = max([s.get('id', 0) for s in students], default=0) + 1
#     new_student["id"] = new_id
    
#     students.append(new_student)
#     write_students(students)
#     return jsonify(new_student), 201

# @app.route("/students/<int:id>", methods=["DELETE"])
# def delete_student(id):
#     students = read_students()
#     updated_students = [s for s in students if s.get("id") != id]
#     write_students(updated_students)
#     return jsonify({"message": "Student deleted", "id": id})

# @app.route("/students/<int:id>", methods=["PUT"])
# def update_student(id):
#     students = read_students()
#     for s in students:
#         if s.get("id") == id:
#             s.update(request.json)
#             write_students(students)
#             return jsonify(s)
#     return jsonify({"message": "Student not found"}), 404


# if __name__ == "__main__":
#     app.run(host="127.0.0.1", port=5000, debug=True)



from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from bson.objectid import ObjectId
import os

app = Flask(__name__)
CORS(app)

# --- MongoDB Setup ---
MONGO_URI = "mongodb+srv://mahima23_db_user:Mahima123@cluster0.oy3zzvg.mongodb.net/?appName=Cluster0"
client = MongoClient(MONGO_URI)
db = client['student_db']
collection = db['students']

def format_student(student):
    return {
        "id": str(student["_id"]),
        "name": student.get("name"),
        "age": student.get("age"),
        "course": student.get("course")
    }

@app.route("/")
def home():
    return jsonify({"status": "online", "message": "MongoDB Connected 🚀"})

@app.route("/students", methods=["GET"])
def get_students():
    students = [format_student(s) for s in collection.find()]
    return jsonify(students)

@app.route("/students", methods=["POST"])
def add_student():
    data = request.json
    result = collection.insert_one({
        "name": data.get("name"),
        "age": data.get("age"),
        "course": data.get("course")
    })
    new_student = format_student(collection.find_one({"_id": result.inserted_id}))
    return jsonify(new_student), 201

@app.route("/students/<id>", methods=["DELETE"])
def delete_student(id):
    try:
        collection.delete_one({"_id": ObjectId(id)})
        return jsonify({"message": "Deleted", "id": id})
    except:
        return jsonify({"message": "Invalid ID"}), 400

@app.route("/students/<id>", methods=["PUT"])
def update_student(id):
    try:
        data = request.json
        collection.update_one(
            {"_id": ObjectId(id)},
            {"$set": {
                "name": data.get("name"),
                "age": data.get("age"),
                "course": data.get("course")
            }}
        )
        return jsonify({"message": "Updated", "id": id})
    except:
        return jsonify({"message": "Update failed"}), 400

if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5000, debug=True)