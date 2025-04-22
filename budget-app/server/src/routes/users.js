const express = require('express');
const db = require('../db/setup');
const router = express.Router();

// Registro
router.post('/register', (req, res) => {
  const { email, password } = req.body;
  db.run(
    'INSERT INTO users (email, password) VALUES (?, ?)',
    [email, password],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ id: this.lastID, email });
    },
  );
});

// Login
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  db.get(
    'SELECT * FROM users WHERE email = ? AND password = ?',
    [email, password],
    (err, row) => {
      if (err) return res.status(500).json({ error: err.message });
      if (!row) return res.status(401).json({ error: 'Invalid credentials' });
      res.json({ id: row.id, email: row.email });
    },
  );
});

module.exports = router;