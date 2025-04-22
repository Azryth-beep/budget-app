const express = require('express');
const healthRouter = require('./routes/health');
const incomesRouter = require('./routes/incomes');
const expensesRouter = require('./routes/expenses');
const usersRouter = require('./routes/users');
const cors = require('cors');

require('dotenv').config();


const app = express();

// Con opciones adicionales
app.use(cors({
    origin: '*', // Permite cualquier origen
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }));

app.use(express.json());
app.use('/api/health', healthRouter);
app.use('/api/incomes', incomesRouter);
app.use('/api/expenses', expensesRouter);
app.use('/api/users', usersRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
