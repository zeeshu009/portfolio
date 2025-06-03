const express = require('express');
const router = express.Router();
const Patient = require('../models/Patient');
const bcrypt = require('bcryptjs');
const { authenticate, restrictTo } = require('../middleware/auth');

// Create a patient
router.post('/',authenticate, restrictTo('Admin'), async (req, res) => {
  try {
    const patient = await Patient.create(req.body);
    res.status(201).json(patient);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all patients
router.get('/',authenticate, async (req, res) => {
  try {
    const patients = await Patient.findAll();
    res.status(200).json(patients);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a patient
router.put('/:id', async (req, res) => {
  try {
    const patient = await Patient.findByPk(req.params.id);
    if (!patient) return res.status(404).json({ error: 'Patient not found' });
    await patient.update(req.body);
    res.status(200).json(patient);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a patient
router.delete('/:id', async (req, res) => {
  try {
    const patient = await Patient.findByPk(req.params.id);
    if (!patient) return res.status(404).json({ error: 'Patient not found' });
    await patient.destroy();
    res.status(204).json();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;