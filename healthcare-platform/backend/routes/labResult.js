const express = require('express');
const router = express.Router();
const LabResult = require('../models/LabResult');
const { authenticate, restrictTo } = require('../middleware/auth');

// Create a lab result (Nurse only, assuming upload and AI analysis happens here)
router.post('/', authenticate, restrictTo('Nurse'), async (req, res) => {
  try {
    const labResult = await LabResult.create(req.body);
    res.status(201).json(labResult);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all lab results for a patient (Doctor and Nurse)
router.get('/:patientId', authenticate, restrictTo('Doctor', 'Nurse'), async (req, res) => {
  try {
    const labResults = await LabResult.findAll({
      where: { patientId: req.params.patientId },
    });
    res.status(200).json(labResults);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a lab result (Nurse only, e.g., update AI analysis)
router.put('/:id', authenticate, restrictTo('Nurse'), async (req, res) => {
  try {
    const labResult = await LabResult.findByPk(req.params.id);
    if (!labResult) return res.status(404).json({ error: 'Lab result not found' });
    await labResult.update(req.body);
    res.status(200).json(labResult);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a lab result (Nurse only)
router.delete('/:id', authenticate, restrictTo('Nurse'), async (req, res) => {
  try {
    const labResult = await LabResult.findByPk(req.params.id);
    if (!labResult) return res.status(404).json({ error: 'Lab result not found' });
    await labResult.destroy();
    res.status(204).json();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;