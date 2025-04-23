const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:'); // Cambiar a archivo en producción

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE,
      password TEXT
    )
  `);
  db.run(`
    CREATE TABLE IF NOT EXISTS incomes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      description TEXT,
      amount REAL,
      date TEXT,
      category TEXT,
      notes TEXT,
      source TEXT
    )
  `);
  db.run(`
    CREATE TABLE IF NOT EXISTS expenses (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      category TEXT,
      amount REAL,
      date TEXT,
      payment_method TEXT,
      notes TEXT
    )
  `);
  db.run(`
    CREATE TABLE IF NOT EXISTS categories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      type TEXT,
      name TEXT
    )
  `);
  db.run('INSERT OR IGNORE INTO categories (type, name) VALUES (?, ?)', ['income', 'Salario']);
  db.run('INSERT OR IGNORE INTO categories (type, name) VALUES (?, ?)', ['income', 'Freelancing']);
  db.run('INSERT OR IGNORE INTO categories (type, name) VALUES (?, ?)', ['expense', 'Alojamiento']);
  db.run('INSERT OR IGNORE INTO categories (type, name) VALUES (?, ?)', ['expense', 'Transporte']);
});

module.exports = db;