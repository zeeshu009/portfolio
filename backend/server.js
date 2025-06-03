require('dotenv').config();
const express = require('express');
console.log('JWT_SECRET:', process.env.JWT_SECRET)
const cors = require('cors');
const { sequelize } = require('./config/database');
const authRoutes = require('./routes/auth');
const doctorRoutes = require('./routes/doctors');
const appointmentRoutes = require('./routes/appointments');
const userRoutes = require('./routes/users');

const bcrypt = require('bcrypt');
const { User } = require('./models'); // Adjust the path if needed

// async function createDefaultAdmin() {
//   try {
//     await sequelize.sync();
//     const hashedPassword = await bcrypt.hash('admin123', 10);
//     await User.create({
//       name: 'Admin',
//       email: 'admin@example.com',
//       password: hashedPassword,
//       role: 'admin',
//     });
//     console.log('Default admin created');
//   } catch (err) {
//     console.error('Error creating default admin:', err);
//   }
// }

const app = express();
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/doctors', doctorRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/users', userRoutes);

// Sync database and create default admin if needed
// sequelize.sync({ alter: true }).then(() => {
//   console.log('Database synced');
// });


app.listen(process.env.PORT || 5000, async () => {
  console.log(`Server running on port ${process.env.PORT || 5000}`);
  // await createDefaultAdmin(); // Uncomment to create default admin on server start
  try {
    await sequelize.authenticate();
    console.log('Database connected successfully');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
});
