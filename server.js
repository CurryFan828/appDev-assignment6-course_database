// Import packages
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const PORT = 3000;

// Middleware to parse JSON request bodies
app.use(express.json());

// Connect to SQLite database
const db = new sqlite3.Database('./database/university.db', (err) => {
    if (err) console.error("Error connecting to database:", err.message);
    else console.log("Connected to university.db database.");
});

// GET /api/courses - get all courses
app.get('/api/courses', (req, res) => {
    const sql = 'SELECT * FROM courses';
    db.all(sql, [], (err, rows) => {
        if (err) res.status(500).json({ error: err.message });
        else res.json({ courses: rows });
    });
});


// GET /api/courses/:id - get course by ID
app.get('/api/courses/:id', (req, res) => {
    const sql = 'SELECT * FROM courses WHERE ID = ?';
    const id = req.params.id;

    db.get(sql, [id], (err, row) => {
        if (err) res.status(500).json({ error: err.message });
        else if (!row) res.status(404).json({ message: 'Course not found' });
        else res.json(row);
    });
});

// POST /api/courses - add a new course
app.post('/api/courses', (req, res) => {
    const { courseCode, title, credits, description, semester } = req.body;
    const sql = `INSERT INTO courses (courseCode, title, credits, description, semester)
                 VALUES (?, ?, ?, ?, ?)`;
    const params = [courseCode, title, credits, description, semester];

    db.run(sql, params, function(err) {
        if (err) res.status(400).json({ error: err.message });
        else res.json({ message: 'Course added', courseID: this.lastID });
    });
});

// PUT /api/courses/:id - update a course
app.put('/api/courses/:id', (req, res) => {
    const { courseCode, title, credits, description, semester } = req.body;
    const sql = `UPDATE courses
                 SET courseCode = ?, title = ?, credits = ?, description = ?, semester = ?
                 WHERE ID = ?`;
    const params = [courseCode, title, credits, description, semester, req.params.id];

    db.run(sql, params, function(err) {
        if (err) res.status(400).json({ error: err.message });
        else res.json({ message: 'Course updated', changes: this.changes });
    });
});

// DELETE /api/courses/:id - delete a course
app.delete('/api/courses/:id', (req, res) => {
    const sql = 'DELETE FROM courses WHERE ID = ?';
    db.run(sql, req.params.id, function(err) {
        if (err) res.status(400).json({ error: err.message });
        else res.json({ message: 'Course deleted', changes: this.changes });
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
