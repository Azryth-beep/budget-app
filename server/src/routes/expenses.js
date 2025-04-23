const express = require('express');
const db = require('../db/setup');
const router = express.Router();

// Listar gastos
router.get('/', (req, res) => {
  db.all('SELECT * FROM expenses', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Crear gasto
router.post('/', (req, res) => {
  const { category, amount, date, payment_method, notes, user_id } = req.body;
  db.run(
    'INSERT INTO expenses (user_id, category, amount, date, payment_method, notes) VALUES (?, ?, ?, ?, ?, ?)',
    [user_id, category, amount, date, payment_method, notes],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ id: this.lastID });
    },
  );
});

module.exports = router;