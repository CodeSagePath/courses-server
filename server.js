const express = require("express");
const app = express();

const PORT = 4000;
const HOSTNAME = "127.0.0.1";

const courses = [
  {
    id: 1,
    title: "React Fundamentals",
    category: "Frontend",
    instructor: "Arjun",
  },
  {
    id: 2,
    title: "Node.js and Express Basics",
    category: "Backend",
    instructor: "Meera",
  },
  {
    id: 3,
    title: "MongoDB Essentials",
    category: "Database",
    instructor: "Ravi",
  },
  {
    id: 4,
    title: "Advanced JavaScript Concepts",
    category: "Frontend",
    instructor: "Sneha",
  },
  {
    id: 5,
    title: "REST API Development with Express",
    category: "Backend",
    instructor: "Kiran",
  },
];

// GET all courses
app.get("/courses", (req, res) => {
  res.status(200).json(courses);
});

// GET course by ID
// Named Route Parameter - ":id" -- Read as a string
app.get("/courses/:id", (req, res) => {
  const id = req.params.id;
  const course = courses.find(ele => ele.id === Number(id));
  
  // Error-first syntax (preferred)
  if (!course) {// course will be "undefined", if not found, so Falsy value 
    res.status(404).json({ "error": `Course not found with id: ${id}` });
  }
  res.status(200).json(course);
});

app.listen(PORT, HOSTNAME, () => {
  console.log(`Courses server is up and running at http://${HOSTNAME}:${PORT}`);
});
