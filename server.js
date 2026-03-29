
require('dotenv').config();
const express   = require('express');
const cors      = require('cors');
const connectDB = require('./db');
const reports   = require('./routes/reports');
const auth      = require('./routes/auth');

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log(`📥 ${req.method} ${req.path}`);
  next();
});

app.use('/api/auth',    auth);
app.use('/api/reports', reports);

app.get('/', (req, res) => res.send('AI Interview Pro backend running'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));