require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./db');

const app = express();

connectDB();

app.use(cors({ origin: '*' }));
app.use(express.json());

app.get('/', (req, res) => res.send('AI Interview Pro backend running'));

app.use('/api/auth', require('./routes/auth'));
app.use('/api/reports', require('./routes/reports'));

app.use((req, res) => {
  res.status(404).json({ message: `Route ${req.method} ${req.path} not found` });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));