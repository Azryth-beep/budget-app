const express = require('express');
const db = require('../db/setup');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const SECRET_KEY = process.env.JWT_SECRET || 'my_secret_key';
// const TOKEN_EXPIRATION = '1h'; // Token expiration time
const SALT_ROUNDS = 10;

// Registro anterior
// router.post('/register', (req, res) => {
//   const { email, password } = req.body;
//   db.run(
//     'INSERT INTO users (email, password) VALUES (?, ?)',
//     [email, password],
//     function (err) {
//       if (err) return res.status(500).json({ error: err.message });
//       res.status(201).json({ id: this.lastID, email });
//     },
//   );
// });

// Registro
router.post('/register', async (req, res) => {
  const { email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    db.run(
      'INSERT INTO users (email, password) VALUES (?, ?)',
      [email, hashedPassword],
      function (err) {
        if (err) return res.status(400).json({ error: 'Email already exists' });
        res.status(201).json({ id: this.lastID, email });
      },
    );
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Login anterior
// router.post('/login', (req, res) => {
//   const { email, password } = req.body;
//   db.get(
//     'SELECT * FROM users WHERE email = ? AND password = ?',
//     [email, password],
//     (err, row) => {
//       if (err) return res.status(500).json({ error: err.message });
//       if (!row) return res.status(401).json({ error: 'Invalid credentials' });
//       res.json({ id: row.id, email: row.email });
//     },
//   );
// });

// Login
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  db.get('SELECT * FROM users WHERE email = ?', [email], async (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(401).json({ error: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, row.password);
    if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ id: row.id, email: row.email }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ id: row.id, email: row.email, token });
  });
});

// Get all users
router.get('/all', (req, res) => {
  db.all('SELECT id, email FROM users', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
    console.log(rows);
    
  });  
});



module.exports = router;