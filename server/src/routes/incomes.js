const express = require('express');
const db = require('../db/setup');
const router = express.Router();
const authMiddleware = require('../middleware/auth'); // Asegúrate de que la ruta sea correcta

// Listar ingresos
router.get('/', authMiddleware, (req, res) => {
	const userId = req.user.id; // Desde JWT
	
	db.all('SELECT * FROM incomes WHERE user_id = ?', [userId], (err, rows) => {
		if (err) return res.status(500).json({ error: err.message });
		res.json(rows);
	});
});

// Crear ingreso
router.post('/', authMiddleware, (req, res) => {
	const { description, amount, date, category, notes, source } = req.body;
	const userId = req.user.id; // Desde JWT
	db.run(
		'INSERT INTO incomes (user_id, description, amount, date, category, notes, source) VALUES (?, ?, ?, ?, ?, ?, ?)',
		[userId, description, amount, date, category, notes, source],
		function (err) {
			if (err) return res.status(500).json({ error: err.message });
			res.status(201).json({ id: this.lastID });
		},
	);	
});

module.exports = router;
