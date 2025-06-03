const { body, validationResult } = require('express-validator');

exports.registerValidator = [
  body('name').notEmpty().withMessage('Name is required').isString().withMessage('Name must be a string'),
  body('email').isEmail().withMessage('Invalid email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('role').isIn(['patient', 'doctor', 'admin']).withMessage('Invalid role'),

  // Conditionally required doctor fields
  body('education').custom((value, { req }) => {
    if (req.body.role === 'doctor' && !value) {
      throw new Error('Education is required for doctors');
    }
    return true;
  }),
  body('specialization').custom((value, { req }) => {
    if (req.body.role === 'doctor' && !value) {
      throw new Error('Specialization is required for doctors');
    }
    return true;
  }),
  body('licenseNumber').custom((value, { req }) => {
    if (req.body.role === 'doctor' && !value) {
      throw new Error('License number is required for doctors');
    }
    return true;
  }),
  body('experienceYears').custom((value, { req }) => {
    if (req.body.role === 'doctor') {
      if (value === undefined) throw new Error('Experience years is required for doctors');
      // if (!Number.isInteger(value) || value < 0) throw new Error('Experience years must be a positive integer');
    }
    return true;
  }),

  // Final validation check
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];