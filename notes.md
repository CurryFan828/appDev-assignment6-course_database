# How to Create a Database Schema with SQL (Step-by-Step Guide)

## 1. Import the sqlite3 Package

```js
const sqlite3 = require('sqlite3').verbose();
```

## 2. Create/Open a Database

```js
const db = new sqlite3.Database('./myDatabase.db', (err) => {
    if (err) console.error(err.message);
    else console.log("Connected to DB");
});
```

## 3. Create a Table Using SQL

### SQL Structure Template

```sql
CREATE TABLE IF NOT EXISTS tableName (
    name_of_column1 datatype constraints,
    name_of_column2 datatype constraints,
    name_of_column3 datatype constraints,
    name_of_column4 datatype constraints
    -- add more columns as needed
);
```

### Example Table

```sql
CREATE TABLE IF NOT EXISTS students (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    gradeLevel INTEGER NOT NULL
);
```

## 4. Run the SQL in Node.js

```js
db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS students (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            gradeLevel INTEGER NOT NULL
        );
    `, (err) => {
        if (err) console.error(err.message);
        else console.log("Table created!");
    });
});
```

## 5. Close the Database

```js
db.close();
```

---

# How to Design a Table From Scratch

### 1. What is this table supposed to store?

Examples: `Courses`, `Students`, `Orders`, `Products`

### 2. What fields does each row need?

Example for a **product**:

* name
* price
* quantity
* category

### 3. Choose a data type for each field

* **name → TEXT**
* **price → REAL**
* **quantity → INTEGER**
* **category → TEXT**

### 4. Decide if any fields need constraints

* `id` → PRIMARY KEY AUTOINCREMENT
* `name` → NOT NULL
* `price` → NOT NULL
* `name` → maybe UNIQUE

### 5. Write the CREATE TABLE SQL

```sql
CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    quantity INTEGER NOT NULL,
    category TEXT
);
```
