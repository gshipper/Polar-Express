const express = require('express');
const bcrypt = require('bcrypt');
const db = require('./db');

const router = express.Router();

// Register route
router.post('/register', async (req, res) => {
  const { email, first_name, last_name, password } = req.body;

  if (!email || !first_name || !last_name || !password) {
    return res.status(400).send('All fields are required.');
  }
   const userID = email.split('@')[0];
  try {

    //learned this in ethics class so wanted to encrypt the passwords
    const hashedPassword = await bcrypt.hash(password, 10);
    const query = `INSERT INTO users (user_id, email, password, first_name, last_name) VALUES (?, ?, ?, ?,?)`;
    db.query(query, [userID, email, hashedPassword, first_name, last_name], (err) => {
      if (err) {
        console.error('Database error:', err);
        if (err.code === 'ER_DUP_ENTRY') {
          return res.status(400).json({error: 'Email already exists.'});
        }
        return res.status(500).json({error: 'Database error.'});
      }
      res.status(201).json({message: 'User registered successfully.'});
    });
  } catch (error) {
    res.status(500).send('Server error.');
  }
});

// Login route
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required.' });
  }

  const query = `SELECT * FROM users WHERE email = ?`;
  db.query(query, [email], async (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Database error.' });
    }

    if (results.length === 0) {
      return res.status(400).json({ error: 'Invalid email or password.' });
    }

    const user = results[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid email or password.' });
    }

    res.status(200).json({ message: 'Login successful.' });
  });
});

module.exports = router;