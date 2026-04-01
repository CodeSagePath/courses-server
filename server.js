const express = require("express");
const app = express();
app.use(express.json());

const PORT = 4000;
const HOSTNAME = "127.0.0.1";

const courses = [];

/// ES 5 Syntax
/**
 Constructor Function - Course
 function Course({ title, category, instructor }) {
   this.id = Date.now(); // Simple ID ==> courses.length + 1
   this.title = title;
   this.category = category;
   this.instructor = instructor;
   this.createdAt = new Date();

   this.save = function () {
     courses.push(this);
   };
 }
 */

/// ES6 Syntax
class Course {
  constructor({ title, category, instructor }) {
    this.id = Date.now();
    this.title = title;
    this.category = category;
    this.instructor = instructor;
    this.createdAt = new Date();
  }

  // Instance Method
  save() {
    courses.push(this);
  }

  // Static Method
  static findById(id) {
    return courses.find((ele) => ele.id === Number(id));
  }

  // // Create can also be done via static "create" method but instance method is preferred.
  // static create({ title, category, instructor }) {
  // }
}

// GET all courses
app.get("/courses", (req, res) => {
  res.status(200).json(courses);
});

// GET course by ID
// Named Route Parameter - ":id" -- Read as a string
app.get("/courses/:id", (req, res) => {
  const id = req.params.id;
  const course = Course.findById(id);

  // Error-first syntax (preferred) -- Handle error first
  if (!course) {
    // course will be "undefined", if not found in data, so Falsy value
    res.status(404).json({ error: `Course not found with id: ${id}` });
  }
  res.status(200).json(course);
});

app.post("/create-course", (req, res) => {
  console.log("Body: \t", req.body); // Request Body
  
  /// const course = Course.create();
  
  const course = new Course(req.body);
  course.save();
  res.status(201).json(course);
});

app.listen(PORT, HOSTNAME, () => {
  console.log(`Courses server is up and running at http://${HOSTNAME}:${PORT}`);
});
