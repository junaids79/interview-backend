require('dotenv').config();
const express   = require('express');
const cors      = require('cors');
const connectDB = require('./db');
const reports   = require('./routes/reports');
const auth      = require('./routes/auth');

const app = express();

connectDB();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://interview-frontend-wine.vercel.app');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');
  if (req.method === 'OPTIONS') return res.sendStatus(200);
  next();
});

app.use(cors({
  origin: 'https://interview-frontend-wine.vercel.app',
  credentials: true
}));
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