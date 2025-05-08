const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();
const port = 5000;

// Enable CORS to allow your Vue app to communicate with this backend
app.use(cors());

// Parse JSON data in request bodies
app.use(express.json());

// Set up your database connection
const db = mysql.createConnection({
  host: 'localhost',       // Your database host
  user: 'root',   // Your database username
  password: '', // Your database password
  database: 'honey_bee' // Your database name
});

// Test the database connection
db.connect((err) => {
  if (err) {
    console.error('Database connection error:', err);
    return;
  }
  console.log('Connected to the database!');
});

// API route to get data from your table
app.get('/a', (req, res) => {
  const query = 'SELECT * FROM dati';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Query error:', err);
      res.status(500).send('Error querying the database');
      return;
    }
    res.json(results);
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
