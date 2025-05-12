//used to create a server that connect to a MYSQL database and save ride information 
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const db = require('./db');
const path = require('path');


const authRoutes = require('./authroutes');

// Using Express to create a server
const app = express();
const port = 3000;

// Middlewarem ensuring that the server can accept requests from different origins
app.use(cors());
app.use(express.json());

// Use the auth routes
app.use('/api/auth', authRoutes);

// If there is an error connecting to the database
db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the MySQL database.');
});

// API Endpoint to Fetch Only User ID
app.get('/api/user', (req, res) => {
    const { email } = req.query; // Expecting email as a query parameter
  
    if (!email) {
      return res.status(400).send('Email is required to fetch user ID.');
    }
  
    const selectQuery = `
      SELECT user_id FROM users WHERE email = ?
    `;x
  
    db.query(selectQuery, [email], (err, results) => {
      if (err) {
        console.error('Error fetching user ID from database:', err);
        return res.status(500).send('Error fetching user ID.');
      }
  
      if (results.length === 0) {
        return res.status(404).send('User not found.');
      }
  
      // Return only the user_id
      res.status(200).json({ user_id: results[0].user_id });
    });
  });

// API Endpoint to Save Ride
app.post('/api/rides', (req, res) => {
    const { user_id, pickup_location, dropoff_location, ride_date, ride_time, passengers } = req.body;
  
    // Insert the new ride (ride_id will be auto-generated based on the amount of rides the user already has in the database)
    const insertQuery = `
      INSERT INTO rides (user_id, pickup_location, dropoff_location, ride_date, ride_time, passengers)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
  
    db.query(
      insertQuery,
      [user_id, pickup_location, dropoff_location, ride_date, ride_time, passengers],
      (err, result) => {
        if (err) {
          console.error('Error inserting ride into database:', err);
          res.status(500).send('Error saving ride.');
          return;
        }
        res.status(200).send('Ride saved successfully.');
      }
    );
  });

// Start Server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

app.use('/calendar', express.static(path.join(__dirname, 'build')));

app.get('/calendar', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Connect to your rides database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Babygabo1231$',
  database: 'polarExpress'
});

// API endpoint to get rides
app.get('/api/rides', (req, res) => {
  connection.query('SELECT * FROM rides', (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).send('Error retrieving rides');
    }
    res.json(results);
  });
});

