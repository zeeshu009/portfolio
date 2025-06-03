const { User, Doctor, Appointment } = require('../models');
const { sequelize } = require('../config/database'); // Import sequelize

exports.getDoctors = async (req, res) => {
  console.log('getDoctors called'); // Debug log
  try {
    const doctors = await Doctor.findAll({
      where: { status: 'approved' },
      include: [
        { model: User, attributes: ['id', 'name', 'email'] },
      ],
      attributes: {
        include: [
          [
            sequelize.literal(`(
              SELECT COUNT(*)
              FROM "Appointments"
              WHERE "Appointments"."doctorId" = "Doctor"."id" AND "Appointments"."status" = 'approved'
            )`),
            'appointmentCount'
          ]
        ]
      }
    });
    res.json(doctors);
  } catch (err) {
    console.error('Error in getDoctors:', err);
    res.status(500).json({ error: err.message });
  }
};

exports.approveDoctor = async (req, res) => {
  console.log(`approveDoctor called with id: ${req.params.id}`); // Debug log
  try {
    const doctor = await Doctor.findByPk(req.params.id);
    if (!doctor) return res.status(404).json({ error: 'Doctor not found' });
    await doctor.update({ status: 'approved' });
    res.json({ message: 'Doctor approved' });
  } catch (err) {
    console.error('Error in approveDoctor:', err);
    res.status(500).json({ error: err.message });
  }
};

exports.rejectDoctor = async (req, res) => {
  console.log(`rejectDoctor called with id: ${req.params.id}`); // Debug log
  try {
    const doctor = await Doctor.findByPk(req.params.id);
    if (!doctor) return res.status(404).json({ error: 'Doctor not found' });
    await doctor.update({ status: 'rejected' });
    res.json({ message: 'Doctor rejected' });
  } catch (err) {
    console.error('Error in rejectDoctor:', err);
    res.status(500).json({ error: err.message });
  }
};

exports.getPendingDoctors = async (req, res) => {
  console.log('getPendingDoctors called'); // Debug log
  try {
    const doctors = await Doctor.findAll({
      where: { status: 'pending' },
      include: [{ model: User, attributes: ['id', 'name', 'email'] }],
    });
    res.json(doctors);
  } catch (err) {
    console.error('Error in getPendingDoctors:', err);
    res.status(500).json({ error: err.message });
  }
};