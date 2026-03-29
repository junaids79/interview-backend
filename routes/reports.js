const express = require('express');
const router  = express.Router();
const Report  = require('../models/Report');

router.post('/', async (req, res) => {
  try {
    const { sessionMode, question, transcript, scores, feedback, strengths, weaknesses } = req.body;

    const report = new Report({
      sessionMode,
      question,
      transcript,
      scores,
      feedback,
      strengths,
      weaknesses,
    });

    const saved = await report.save();
    res.status(201).json({ success: true, id: saved._id });
  } catch (err) {
    console.error('Save error:', err);
    res.status(500).json({ success: false, message: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const reports = await Report.find().sort({ createdAt: -1 }).limit(50);
    res.json(reports);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const report = await Report.findById(req.params.id);
    if (!report) return res.status(404).json({ message: 'Not found' });
    res.json(report);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;