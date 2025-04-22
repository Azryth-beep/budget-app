const express = require('express');
const db = require('../db/setup');
const router = express.Router();

// Listar ingresos
router.get('/', (req, res) => {
  db.all('SELECT * FROM incomes', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Crear ingreso
router.post('/', (req, res) => {
  const { description, amount, date, category, notes, source, user_id } = req.body;
  db.run(
    'INSERT INTO incomes (user_id, description, amount, date, category, notes, source) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [user_id, description, amount, date, category, notes, source],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ id: this.lastID });
    },
  );
});

module.exports = router;