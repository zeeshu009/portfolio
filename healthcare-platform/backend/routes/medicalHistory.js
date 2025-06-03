const express = require('express');
const router = express.Router();
const MedicalHistory = require('../models/MedicalHistory');
const { authenticate, restrictTo } = require('../middleware/auth');

// Create a medical history entry (Doctor only)
router.post('/', authenticate, restrictTo('Doctor'), async (req, res) => {
  try {
    const medicalHistory = await MedicalHistory.create(req.body);
    res.status(201).json(medicalHistory);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all medical history for a patient (Doctor and Nurse)
router.get('/:patientId', authenticate, restrictTo('Doctor', 'Nurse'), async (req, res) => {
  try {
    const medicalHistory = await MedicalHistory.findAll({
      where: { patientId: req.params.patientId },
    });
    res.status(200).json(medicalHistory);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a medical history entry (Doctor only)
router.put('/:id', authenticate, restrictTo('Doctor'), async (req, res) => {
  try {
    const medicalHistory = await MedicalHistory.findByPk(req.params.id);
    if (!medicalHistory) return res.status(404).json({ error: 'Medical history not found' });
    await medicalHistory.update(req.body);
    res.status(200).json(medicalHistory);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a medical history entry (Doctor only)
router.delete('/:id', authenticate, restrictTo('Doctor'), async (req, res) => {
  try {
    const medicalHistory = await MedicalHistory.findByPk(req.params.id);
    if (!medicalHistory) return res.status(404).json({ error: 'Medical history not found' });
    await medicalHistory.destroy();
    res.status(204).json();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;