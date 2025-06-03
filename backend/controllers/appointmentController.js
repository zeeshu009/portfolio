const db = require('../models');
const { Appointment, VisitLog, User, Doctor } = db;

exports.createAppointment = async (req, res) => {
  const { doctorId, timeSlot } = req.body;
  try {
    const doctor = await Doctor.findOne({ where: { id: doctorId, status: 'approved' } });
    if (!doctor) return res.status(400).json({ error: 'Doctor not found or not approved' });

    const appointmentCount = await Appointment.count({
      where: { doctorId, status: 'approved' },
    });
    if (appointmentCount >= 5) return res.status(400).json({ error: 'Doctor fully booked' });

    const existingAppointment = await Appointment.findOne({
      where: { doctorId, timeSlot, status: 'approved' },
    });
    if (existingAppointment) return res.status(400).json({ error: 'Time slot already booked' });

    const appointment = await Appointment.create({
      patientId: req.user.id,
      doctorId,
      timeSlot,
      status: 'approved',
    });

    res.status(201).json({ message: 'Appointment booked successfully', appointment });
  } catch (err) {
    console.error('Error in createAppointment:', err);
    res.status(500).json({ error: err.message });
  }
};

exports.getAppointments = async (req, res) => {
  try {
    const doctor = await Doctor.findOne({ where: { userId: req.user.id } });
    if (!doctor) return res.status(404).json({ error: 'Doctor not found for this user' });

    const appointments = await Appointment.findAll({
      where: { doctorId: doctor.id, status: ['approved', 'completed'] },
      include: [
        { model: User, as: 'Patient', attributes: ['id', 'name', 'email'] },
      ],
      attributes: ['id', 'timeSlot', 'status', 'createdAt'],
    });
    res.json(appointments);
  } catch (err) {
    console.error('Error in getAppointments:', err);
    res.status(500).json({ error: err.message });
  }
};

exports.getAvailableTimeSlots = async (req, res) => {
  const { doctorId } = req.params;
  try {
    const doctor = await Doctor.findOne({ where: { id: doctorId, status: 'approved' } });
    if (!doctor) return res.status(400).json({ error: 'Doctor not found or not approved' });

    const defaultTimeSlots = [
      '10:00-10:30',
      '10:30-11:00',
      '11:00-11:30',
      '11:30-12:00',
      '12:00-12:30',
    ];

    const bookedAppointments = await Appointment.findAll({
      where: { doctorId, status: 'approved' },
      attributes: ['timeSlot'],
    });

    const bookedTimeSlots = bookedAppointments.map(apt => apt.timeSlot);
    const availableTimeSlots = defaultTimeSlots.filter(slot => !bookedTimeSlots.includes(slot));

    res.json({ availableTimeSlots });
  } catch (err) {
    console.error('Error in getAvailableTimeSlots:', err);
    res.status(500).json({ error: err.message });
  }
};

exports.getDoctorHistory = async (req, res) => {
  try {
    const doctor = await Doctor.findOne({ where: { userId: req.user.id } });
    if (!doctor) return res.status(404).json({ error: 'Doctor not found for this user' });

    const totalPatientsChecked = await VisitLog.count({
      where: { doctorId: doctor.id },
    });

    const appointments = await Appointment.findAll({
      where: { doctorId: doctor.id, status: ['approved', 'completed'] },
      include: [
        { model: User, as: 'Patient', attributes: ['id', 'name', 'email'] },
      ],
      attributes: ['timeSlot', 'status', 'createdAt'],
    });

    const maxAppointments = 5;
    const currentAppointments = await Appointment.count({
      where: { doctorId: doctor.id, status: 'approved' },
    });
    const remainingAppointments = maxAppointments - currentAppointments;

    const patientDetails = appointments.map(apt => ({
      patientName: apt.Patient.name,
      patientEmail: apt.Patient.email,
      timeSlot: apt.timeSlot,
      status: apt.status,
      appointmentDate: apt.createdAt,
    }));

    res.json({
      totalPatientsChecked,
      patientDetails,
      remainingAppointments,
    });
  } catch (err) {
    console.error('Error in getDoctorHistory:', err);
    res.status(500).json({ error: err.message });
  }
};

exports.getPatientVisitCount = async (req, res) => {
  try {
    const visitCount = await VisitLog.count({
      where: { patientId: req.user.id },
    });
    res.json({ visitCount });
  } catch (err) {
    console.error('Error in getPatientVisitCount:', err);
    res.status(500).json({ error: err.message });
  }
};

exports.getPatientTimeline = async (req, res) => {
  try {
    const visitLogs = await VisitLog.findAll({
      where: { patientId: req.user.id },
      include: [
        { model: Doctor, as: 'Doctor', attributes: ['id', 'name', 'specialization'], include: [
          { model: User, as: 'User', attributes: ['email'] },
        ]},
        { model: Appointment, as: 'Appointment', attributes: ['timeSlot'], where: { status: ['approved', 'completed'] }, required: false },
      ],
      order: [['visitDate', 'DESC']],
    });

    const timeline = visitLogs.map(log => ({
      visitDate: log.visitDate,
      doctorName: log.Doctor?.name || 'N/A',
      doctorEmail: log.Doctor?.User?.email || 'N/A',
      specialization: log.Doctor?.specialization || 'N/A',
      timeSlot: log.Appointment?.timeSlot || 'N/A',
    }));

    res.json({ timeline });
  } catch (err) {
    console.error('Error in getPatientTimeline:', err);
    res.status(500).json({ error: err.message });
  }
};

exports.getPatientHistoryForDoctor = async (req, res) => {
  const { patientId } = req.params;
  try {
    if (isNaN(patientId)) return res.status(400).json({ error: 'Invalid patient ID' });
    const doctor = await Doctor.findOne({ where: { userId: req.user.id } });
    if (!doctor) return res.status(404).json({ error: 'Doctor not found' });
    const visitLogs = await VisitLog.findAll({
      where: { patientId, doctorId: doctor.id },
      include: [
        {
          model: Doctor,
          as: 'Doctor',
          attributes: ['name', 'specialization'],
          include: [{ model: User, as: 'User', attributes: ['email'] }],
        },
        {
          model: Appointment,
          as: 'Appointment',
          attributes: ['timeSlot'],
          where: { status: ['approved', 'completed'] },
          required: false,
        },
      ],
      order: [['visitDate', 'DESC']],
    });
    const timeline = visitLogs.map(log => ({
      visitDate: log.visitDate,
      doctorName: log.Doctor?.name || 'N/A',
      doctorEmail: log.Doctor?.User?.email || 'N/A',
      specialization: log.Doctor?.specialization || 'N/A',
      timeSlot: log.Appointment?.timeSlot || 'N/A',
    }));
    res.json({ timeline });
  } catch (err) {
    console.error('Error in getPatientHistoryForDoctor:', err);
    res.status(500).json({ error: err.message });
  }
};

exports.completeAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    if (isNaN(id)) return res.status(400).json({ error: 'Invalid appointment ID' });
    const doctor = await Doctor.findOne({ where: { userId: req.user.id } });
    if (!doctor) return res.status(404).json({ error: 'Doctor not found' });
    const appointment = await Appointment.findOne({
      where: { id, doctorId: doctor.id, status: 'approved' },
    });
    if (!appointment) return res.status(404).json({ error: 'Appointment not found or not approved' });
    await appointment.update({ status: 'completed' });
    await VisitLog.create({
      patientId: appointment.patientId,
      doctorId: doctor.id,
      visitDate: new Date(),
    });
    res.json({ message: 'Appointment completed successfully' });
  } catch (err) {
    console.error('Error in completeAppointment:', err);
    res.status(500).json({ error: err.message });
  }
};

exports.getPatientTimeline = async (req, res) => {
  try {
    const visitLogs = await VisitLog.findAll({
      where: { patientId: req.user.id },
      include: [
        { model: Doctor, as: 'Doctor', attributes: ['id', 'name', 'specialization'], include: [
          { model: User, as: 'User', attributes: ['email'] },
        ]},
        { model: Appointment, as: 'Appointment', attributes: ['timeSlot'], where: { status: ['approved', 'completed'] }, required: false },
      ],
      order: [['visitDate', 'DESC']],
    });

    const timeline = visitLogs.map(log => ({
      visitDate: log.visitDate,
      doctorName: log.Doctor?.name || 'N/A',
      doctorEmail: log.Doctor?.User?.email || 'N/A',
      specialization: log.Doctor?.specialization || 'N/A',
      timeSlot: log.Appointment?.timeSlot || 'N/A',
    }));

    res.json({ timeline });
  } catch (err) {
    console.error('Error in getPatientTimeline:', err);
    res.status(500).json({ error: err.message });
  }
};

exports.getPatientVisitCount = async (req, res) => {
  try {
    const visitCount = await VisitLog.count({
      where: { patientId: req.user.id },
    });
    res.json({ visitCount });
  } catch (err) {
    console.error('Error in getPatientVisitCount:', err);
    res.status(500).json({ error: err.message });
  }
};