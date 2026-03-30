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

// Get all courses
app.get("/courses", (req, res) => {
  res.status(200).json(courses);
});

app.listen(PORT, HOSTNAME, () => {
  console.log(`Courses server is up and running at http://127.0.0.1:${PORT}`);
});
