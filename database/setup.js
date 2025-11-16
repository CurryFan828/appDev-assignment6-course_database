// Import sqlite3 and enable verbose mode for more helpful debug output.
const sqlite3 = require('sqlite3').verbose();

// Create/Open the SQLite database file 'university.db'.
// The callback runs once the DB is opened (or if opening fails).
const db = new sqlite3.Database('./university.db', (err) => {
    if (err) {
        // If opening/creating the DB fails, log the error message.
        console.error("Error opening database:", err.message);
    } else {
        // Successfully connected to (or created) the database file.
        console.log("Connected to university.db");
    }
});

// Use serialize to ensure the following statements execute in order.
db.serialize(() => {
    // Run the SQL command to create the 'courses' table if it doesn't exist.
    // Define the courses table with CREATE TABLE
    db.run(`
        CREATE TABLE IF NOT EXISTS courses (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            courseCode TEXT NOT NULL,
            title TEXT NOT NULL,
            credits INTEGER NOT NULL,
            description TEXT,
            semester TEXT NOT NULL
        );
    `, (err) => {
        if (err) {
            // If the CREATE TABLE failed, log the error.
            console.error("Error creating courses table:", err.message);
        } else {
            // Table created (or already existed).
            console.log("Courses table created successfully!");
        }

        // Close the database connection after the CREATE TABLE callback finishes.
        // Doing this here ensures the DB doesn't close while creating the DB is still pending.
        db.close((closeErr) => {
            if (closeErr) {
                console.error("Error closing database:", closeErr.message);
            } else {
                console.log("Closed the database connection.");
            }
        });
    });
});
