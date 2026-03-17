import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserShield, faCalendarDays, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import Login from './Login';

const AdminPanel = () => {

  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      setIsLoggedIn(true);
      getAppointments(token);
    } else {
      setLoading(false);
    }
  }, []);

  const getAppointments = (token) => {
    axios.get('http://localhost:5000/api/appointments', {
      headers: {
        authorization: token
      }
    })
      .then(function(response) {
        setAppointments(response.data);
        setLoading(false);
      })
      .catch(function(error) {
        console.log(error);
        setError('Failed to load appointments. Please try again.');
        setLoading(false);
      });
  }

  const handleLogin = () => {
    const token = localStorage.getItem('adminToken');
    setIsLoggedIn(true);
    setLoading(true);
    getAppointments(token);
  }

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setIsLoggedIn(false);
    setAppointments([]);
  }

  // Show login page if not logged in
  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-blue-600 text-xl font-semibold">Loading appointments...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-red-500 text-xl font-semibold">{error}</p>
      </div>
    );
  }

  return (
    <div className="p-6">

      {/* Heading */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-blue-600">
          <FontAwesomeIcon icon={faUserShield} className="mr-2" />
          Admin Panel
        </h2>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
        >
          <FontAwesomeIcon icon={faRightFromBracket} className="mr-2" />
          Logout
        </button>
      </div>

      {appointments.length === 0 ? (
        <p className="text-center text-gray-500">No appointments found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-xl shadow-md">

            {/* Table Head */}
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="py-3 px-4 text-left">Patient Name</th>
                <th className="py-3 px-4 text-left">Age</th>
                <th className="py-3 px-4 text-left">Gender</th>
                <th className="py-3 px-4 text-left">Appointment Date</th>
                <th className="py-3 px-4 text-left">Dentist Name</th>
                <th className="py-3 px-4 text-left">Clinic Name</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {appointments.map(function(appointment, index) {
                return (
                  <tr key={appointment._id} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                    <td className="py-3 px-4">
                      <FontAwesomeIcon icon={faCalendarDays} className="mr-2 text-blue-400" />
                      {appointment.patientName}
                    </td>
                    <td className="py-3 px-4">{appointment.age}</td>
                    <td className="py-3 px-4">{appointment.gender}</td>
                    <td className="py-3 px-4">{appointment.appointmentDate}</td>
                    <td className="py-3 px-4">{appointment.dentistId.name}</td>
                    <td className="py-3 px-4">{appointment.dentistId.clinicName}</td>
                  </tr>
                );
              })}
            </tbody>

          </table>
        </div>
      )}

    </div>
  );
}

export default AdminPanel;