const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');
const Dentist = require('../models/Dentist');

// POST create appointment
router.post('/', async (req, res) => {
  try {
    const appointment = new Appointment(req.body);
    const savedAppointment = await appointment.save();
    res.status(201).json(savedAppointment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// GET all appointments with dentist details
router.get('/', async (req, res) => {
  try {
    const appointments = await Appointment.find().populate('dentistId', 'name clinicName');
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUT update appointment status
router.put('/:id', async (req, res) => {
  try {
    const updatedAppointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    res.json(updatedAppointment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;