import React, { useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faCalendarCheck } from '@fortawesome/free-solid-svg-icons';

const BookAppointment = (props) => {

  const { dentist, onClose } = props;

  const [patientName, setPatientName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [appointmentDate, setAppointmentDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Validation errors
  const [nameError, setNameError] = useState('');
  const [ageError, setAgeError] = useState('');
  const [genderError, setGenderError] = useState('');
  const [dateError, setDateError] = useState('');

  const validateForm = () => {
    let isValid = true;

    // Validate name
    if (patientName.trim() === '') {
      setNameError('Patient name is required');
      isValid = false;
    } else if (patientName.trim().length < 3) {
      setNameError('Name must be at least 3 characters');
      isValid = false;
    } else {
      setNameError('');
    }

    // Validate age
    if (age === '') {
      setAgeError('Age is required');
      isValid = false;
    } else if (age < 1 || age > 120) {
      setAgeError('Age must be between 1 and 120');
      isValid = false;
    } else {
      setAgeError('');
    }

    // Validate gender
    if (gender === '') {
      setGenderError('Please select a gender');
      isValid = false;
    } else {
      setGenderError('');
    }

    // Validate date
    if (appointmentDate === '') {
      setDateError('Appointment date is required');
      isValid = false;
    } else {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const selectedDate = new Date(appointmentDate);
      if (selectedDate < today) {
        setDateError('Appointment date cannot be in the past');
        isValid = false;
      } else {
        setDateError('');
      }
    }

    return isValid;
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    // Run validation first
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setError(null);

    const appointmentData = {
      patientName: patientName,
      age: age,
      gender: gender,
      appointmentDate: appointmentDate,
      dentistId: dentist._id
    };

    axios.post('http://localhost:5000/api/appointments', appointmentData)
      .then((response) => {
        console.log('Appointment booked:', response.data);
        setSuccess(true);
        setLoading(false);
      })
      .catch((error) => {
        console.log('Error:', error);
        setError('Failed to book appointment. Please try again.');
        setLoading(false);
      });
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">

        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-blue-600">
            <FontAwesomeIcon icon={faCalendarCheck} className="mr-2" />
            Book Appointment
          </h2>
          <button onClick={onClose}>
            <FontAwesomeIcon icon={faXmark} className="text-gray-500 text-xl hover:text-red-500" />
          </button>
        </div>

        {/* Dentist Info */}
        <p className="text-gray-600 mb-4">
          Booking with <span className="font-semibold text-blue-600">{dentist.name}</span> at {dentist.clinicName}
        </p>

        {/* Success Message */}
        {success ? (
          <div className="text-center py-6">
            <p className="text-green-600 text-lg font-semibold">
              ✅ Appointment booked successfully!
            </p>
            <button
              onClick={onClose}
              className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>

            {/* Patient Name */}
            <div className="mb-3">
              <label className="block text-sm font-medium text-gray-700 mb-1">Patient Name</label>
              <input
                type="text"
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                placeholder="Enter patient name"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
              />
              {nameError && <p className="text-red-500 text-xs mt-1">{nameError}</p>}
            </div>

            {/* Age */}
            <div className="mb-3">
              <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="Enter age"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
              />
              {ageError && <p className="text-red-500 text-xs mt-1">{ageError}</p>}
            </div>

            {/* Gender */}
            <div className="mb-3">
              <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
              >
                <option value="">Select gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
              {genderError && <p className="text-red-500 text-xs mt-1">{genderError}</p>}
            </div>

            {/* Appointment Date */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Appointment Date</label>
              <input
                type="date"
                value={appointmentDate}
                onChange={(e) => setAppointmentDate(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
              />
              {dateError && <p className="text-red-500 text-xs mt-1">{dateError}</p>}
            </div>

            {/* Error Message */}
            {error && (
              <p className="text-red-500 text-sm mb-3">{error}</p>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
            >
              {loading ? 'Booking...' : 'Confirm Appointment'}
            </button>

          </form>
        )}

      </div>
    </div>
  );
}

export default BookAppointment;