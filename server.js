// Simple Express server for managing courses with CORS enabled
const express = require("express");
const app = express();

// Importing CORS middleware to handle Cross-Origin Resource Sharing
const cors = require("cors");

// Middleware to parse JSON request bodies
app.use(express.json());

// Middleware to enable CORS (Cross-Origin Resource Sharing)
app.use(cors());

// Server configuration
const PORT = 4000;
const HOSTNAME = "127.0.0.1";

/**
 * In-memory data store (mock database)
 * Note: Data will reset when server restarts
 */
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

/**
 * Course Model (ES6 Class)
 * Represents a course entity with utility methods
 */
class Course {
  constructor({ title, category, instructor }) {
    this.id = Date.now(); // Simple unique ID (not ideal for production)
    this.title = title;
    this.category = category;
    this.instructor = instructor;
    this.createdAt = new Date();
  }

  /**
   * Save course instance to the data store
   */
  save() {
    courses.push(this);
  }

  /**
   * Find a course by ID
   * @param {number|string} id
   * @returns {object|undefined}
   */
  static findById(id) {
    return courses.find((course) => course.id === Number(id));
  }

  /**
   * Search courses by title (case-insensitive)
   * @param {string} title
   * @returns {Array}
   */
  static findByTitle(title = "") {
    return courses.filter((course) =>
      course.title.toLowerCase().includes(title.toLowerCase()),
    );
  }
}

/**
 * GET /courses
 * Retrieve all courses
 */
app.get("/courses", (req, res) => {
  // res.header("Access-Control-Allow-Origin", "*");
  return res.status(200).json(courses);
});

// GET UI from Backend
app.get("/ui", (req, res) => { 
  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Courses UI</title>
      </head>
      <body>
        <h2>Listing Courses</h2>
        <button onclick="handleClick()">fetch courses</button>
        <ul id="list"></ul>

        <script>
          const ulTag = document.querySelector("#list"); 

          function handleClick(){
            const xhr = new XMLHttpRequest(); 
            xhr.open("GET", "http://localhost:4000/courses"); 
            xhr.send(); 

            xhr.onload = function(){
              ulTag.innerHTML = "";
              const result = xhr.responseText;
              const courses = JSON.parse(result);

              for(let course of courses) {
                const liTag = document.createElement('li');
                liTag.textContent = course.title;
                ulTag.appendChild(liTag);
              }
            }

            xhr.onerror = function(){
              console.log("Error fetching courses");
            }
          }
        </script>
      </body>
    </html>
  `);
});


/**
 * POST /courses
 * Create a new course
 */
app.post("/courses", (req, res) => {
  const { title, category, instructor } = req.body;

  // Basic validation
  if (!title || !category || !instructor) {
    return res.status(400).json({
      error: "title, category, and instructor are required",
    });
  }

  const newCourse = new Course({ title, category, instructor });
  newCourse.save();

  return res.status(201).json(newCourse);
});

/**
 * GET /courses/search?title=xyz
 * Search courses by title
 */
app.get("/courses/search", (req, res) => {
  const { title = "" } = req.query;

  const results = Course.findByTitle(title);

  return res.status(200).json(results);
});

/**
 * GET /courses/:id
 * Retrieve a course by ID
 */
app.get("/courses/:id", (req, res) => {
  const { id } = req.params;

  const course = Course.findById(id);

  // Handle not found case
  if (!course) {
    return res.status(404).json({
      error: `Course not found with id: ${id}`,
    });
  }

  return res.status(200).json(course);
});

/**
 * Start server
 */
app.listen(PORT, HOSTNAME, () => {
  console.log(`Server running at http://${HOSTNAME}:${PORT}`);
});
