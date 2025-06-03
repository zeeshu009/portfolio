const express = require('express');
const dotenv = require('dotenv');
const sequelize = require('./config/database');
const bcrypt = require('bcryptjs');

// Import models
const Patient = require('./models/Patient');
const MedicalHistory = require('./models/MedicalHistory');
const Visit = require('./models/Visit');
const Appointment = require('./models/Appointment');
const LabResult = require('./models/LabResult');
const User = require('./models/Users');

// Import routes
const patientRoutes = require('./routes/patient');
const medicalHistoryRoutes = require('./routes/medicalHistory');
const visitRoutes = require('./routes/visit');
const appointmentRoutes = require('./routes/appointment');
const labResultRoutes = require('./routes/labResult');
const authRoutes = require('./routes/auth');

dotenv.config();
const app = express();

app.use(express.json()); // This line must be present and correct

// Define relationships after all models are imported
Patient.hasMany(MedicalHistory, { foreignKey: 'patientId' });
MedicalHistory.belongsTo(Patient, { foreignKey: 'patientId' });

Patient.hasMany(Visit, { foreignKey: 'patientId' });
Visit.belongsTo(Patient, { foreignKey: 'patientId' });
User.hasMany(Visit, { foreignKey: 'doctorId' });
Visit.belongsTo(User, { foreignKey: 'doctorId' });

Patient.hasMany(Appointment, { foreignKey: 'patientId' });
Appointment.belongsTo(Patient, { foreignKey: 'patientId' });
User.hasMany(Appointment, { foreignKey: 'doctorId' });
Appointment.belongsTo(User, { foreignKey: 'doctorId' });

Patient.hasMany(LabResult, { foreignKey: 'patientId' });
LabResult.belongsTo(Patient, { foreignKey: 'patientId' });

// Use routes
app.use('/api/patients', patientRoutes);
app.use('/api/medical-history', medicalHistoryRoutes);
app.use('/api/visits', visitRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/lab-results', labResultRoutes);
app.use('/api/auth', authRoutes);

// Test database connection
sequelize.authenticate()
  .then(() => console.log('Database connected at', new Date().toLocaleString('en-US', { timeZone: 'Asia/Karachi' })))
  .catch(err => console.error('Database connection error:', err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT} at`, new Date().toLocaleString('en-US', { timeZone: 'Asia/Karachi' })));