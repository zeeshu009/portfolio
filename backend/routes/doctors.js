const express = require('express');
const router = express.Router();
const doctorController = require('../controllers/doctorController');
const auth = require('../middleware/auth');

router.get('/', auth(['patient']), doctorController.getDoctors);
router.post('/approve/:id', auth(['admin']), doctorController.approveDoctor);
router.post('/reject/:id', auth(['admin']), doctorController.rejectDoctor);
router.get('/pending', auth(['admin']), doctorController.getPendingDoctors);

module.exports = router;