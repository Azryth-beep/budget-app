const express = require('express');
const healthRouter = require('./routes/health');

const app = express();
app.use(express.json());
app.use('/api/health', healthRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));