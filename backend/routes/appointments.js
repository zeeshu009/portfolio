const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointmentController');
const auth = require('../middleware/auth');

router.post('/', auth(['patient']), appointmentController.createAppointment);
router.get('/', auth(['doctor']), appointmentController.getAppointments);
router.get('/available/:doctorId', auth(['patient']), appointmentController.getAvailableTimeSlots);
router.get('/history', auth(['doctor']), appointmentController.getDoctorHistory);
router.get('/visit-count', auth(['patient']), appointmentController.getPatientVisitCount);
router.get('/timeline', auth(['patient']), appointmentController.getPatientTimeline);
router.get('/patient-history/:patientId', auth(['doctor']), appointmentController.getPatientHistoryForDoctor);
router.post('/complete/:id', auth(['doctor']), appointmentController.completeAppointment);
router.get('/visit-count', auth(['patient']), appointmentController.getPatientVisitCount);
router.get('/timeline', auth(['patient']), appointmentController.getPatientTimeline);
module.exports = router;