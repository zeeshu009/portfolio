const express = require('express');
const router = express.Router();
const Visit = require('../models/Visit');
const { authenticate, restrictTo } = require('../middleware/auth');

// Create a visit (Nurse only)
router.post('/', authenticate, restrictTo('Nurse'), async (req, res) => {
  try {
    const visit = await Visit.create(req.body);
    res.status(201).json(visit);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all visits for a patient (Doctor and Nurse)
router.get('/:patientId', authenticate, restrictTo('Doctor', 'Nurse'), async (req, res) => {
  try {
    const visits = await Visit.findAll({
      where: { patientId: req.params.patientId },
    });
    res.status(200).json(visits);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a visit (Nurse only)
router.put('/:id', authenticate, restrictTo('Nurse'), async (req, res) => {
  try {
    const visit = await Visit.findByPk(req.params.id);
    if (!visit) return res.status(404).json({ error: 'Visit not found' });
    await visit.update(req.body);
    res.status(200).json(visit);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a visit (Nurse only)
router.delete('/:id', authenticate, restrictTo('Nurse'), async (req, res) => {
  try {
    const visit = await Visit.findByPk(req.params.id);
    if (!visit) return res.status(404).json({ error: 'Visit not found' });
    await visit.destroy();
    res.status(204).json();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;