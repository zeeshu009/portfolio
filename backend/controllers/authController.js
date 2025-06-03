const bcrypt = require('bcrypt');
const { User, Doctor } = require('../models');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );
    res.json({ token, role: user.role }); // Return role
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Register function remains unchanged
exports.register = async (req, res) => {
  const {
    name,
    email,
    password,
    role,
    education,
    specialization,
    licenseNumber,
    experienceYears
  } = req.body;

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({ name, email, password: hashedPassword, role });

    if (role === 'doctor') {
      await Doctor.create({
        userId: user.id,
        name,
        education,
        specialization,
        licenseNumber,
        experienceYears,
        status: 'pending'
      });
      res.status(201).json({ message: 'Registration submitted. Awaiting admin approval.' });
    } else {
      res.status(201).json({ message: 'Registration successful.' });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};