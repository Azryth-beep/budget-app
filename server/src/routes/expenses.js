const express = require('express');
const db = require('../db/setup');
const authMiddleware = require('../middleware/auth');
const router = express.Router();

// Listar gastos del usuario autenticado
router.get('/', authMiddleware, (req, res) => {
  const userId = req.user.id; // Correcto, per Tarea 4
  db.all('SELECT * FROM expenses WHERE user_id = ?', [userId], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Crear gasto
router.post('/', authMiddleware, (req, res) => {
  const { category, amount, date, payment_method, notes } = req.body;
  const userId = req.user.id; // Correcto, per Tarea 4
  db.run(
    'INSERT INTO expenses (user_id, category, amount, date, payment_method, notes) VALUES (?, ?, ?, ?, ?, ?)',
    [userId, category, amount, date, payment_method, notes],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ id: this.lastID });
    },
  );
});

module.exports = router;