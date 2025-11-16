// Import the sqlite3 package
const sqlite3 = require('sqlite3').verbose();


// Connect to the sqlite3 database 
// called university.db that you defined and created in setup.js

const db = new sqlite3.Database('./university.db', (err) => {
    if (err) {
        console.error("Error connecting to database:", err.message);   
    } else {
        console.log("Connected to university.db database.");
    }
});

// Use SQL INSERT statements to insert the following courses into your database.
db.serialize(() => {
    const courses = 
    `
    INSERT INTO courses (courseCode, title, credits, description, semester)
    VALUES
    ('CS101', 'Intro Programming', 3, 'Learning Python basics', 'Fall 2024'),
    ('BIO120', 'General Biology', 3, 'Introduction to biological principles', 'Fall 2024'),
    ('MATH150', 'Calculus I', 4, 'Basic calculus', 'Fall 2024'),
    ('ENG101', 'English Composition', 3, 'Academic writing and critical thinking', 'Spring 2025'),
    ('ME210', 'Thermodynamics', 3, 'Principles of thermodynamics and heat transfer', 'Spring 2025'),
    ('CS301', 'Database Systems', 3, 'Design and implementation of database systems', 'Fall 2024'),
    ('PHYS201', 'Physics II', 4, 'Electricity, magnetism and modern physics', 'Spring 2025'),
    ('CS201', 'Data Structures', 4, 'Study of fundamental data structures and algorithms', 'Spring 2025');
    `;

    db.run(courses, (err) => {
        if (err) console.error("Insert error:", err.message);
        else console.log("All courses inserted successfully!");

        // Close database after insertion
        db.close((err) => {
            if (err) console.error("Error closing database:", err.message);
            else console.log("Database connection closed.");
        });
    });
});