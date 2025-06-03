const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');
const { authenticate, restrictTo } = require('../middleware/auth');

// Create an appointment (Nurse or Doctor)
router.post('/', authenticate, restrictTo('Nurse', 'Doctor'), async (req, res) => {
  try {
    const appointment = await Appointment.create(req.body);
    res.status(201).json(appointment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all appointments for a patient (Doctor and Nurse)
router.get('/:patientId', authenticate, restrictTo('Doctor', 'Nurse'), async (req, res) => {
  try {
    const appointments = await Appointment.findAll({
      where: { patientId: req.params.patientId },
    });
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update an appointment (Nurse or Doctor)
router.put('/:id', authenticate, restrictTo('Nurse', 'Doctor'), async (req, res) => {
  try {
    const appointment = await Appointment.findByPk(req.params.id);
    if (!appointment) return res.status(404).json({ error: 'Appointment not found' });
    await appointment.update(req.body);
    res.status(200).json(appointment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete an appointment (Nurse or Doctor)
router.delete('/:id', authenticate, restrictTo('Nurse', 'Doctor'), async (req, res) => {
  try {
    const appointment = await Appointment.findByPk(req.params.id);
    if (!appointment) return res.status(404).json({ error: 'Appointment not found' });
    await appointment.destroy();
    res.status(204).json();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;