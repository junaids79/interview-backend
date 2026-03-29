const mongoose = require('mongoose');

const ReportSchema = new mongoose.Schema({
  sessionMode: {
    type: String,
    enum: ['technical', 'behavioral', 'system-design'],
    required: true,
  },
  question: {
    type: String,
    required: true,
  },
  transcript: {
    type: String,
    required: true,
  },
  scores: {
    confidence: { type: Number, min: 0, max: 10 },
    clarity:    { type: Number, min: 0, max: 10 },
    technical:  { type: Number, min: 0, max: 10 },
    overall:    { type: Number, min: 0, max: 10 },
  },
  feedback:   { type: String },
  strengths:  { type: String },
  weaknesses: { type: String },
  createdAt:  { type: Date, default: Date.now },
});

module.exports = mongoose.model('Report', ReportSchema);