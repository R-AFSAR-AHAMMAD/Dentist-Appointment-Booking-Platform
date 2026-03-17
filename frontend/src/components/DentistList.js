import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserDoctor,
  faStar,
  faLocationDot,
  faHospital,
  faClock,
} from "@fortawesome/free-solid-svg-icons";
import BookAppointment from "./BookAppointment";

const DentistList = () => {
  const [dentists, setDentists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDentist, setSelectedDentist] = useState(null);

  useEffect(() => {
    getDentists();
  }, []);

  const getDentists = () => {
    axios
      .get("http://localhost:5000/api/dentists")
      .then(function (response) {
        setDentists(response.data);
        setLoading(false);
      })
      .catch(function (error) {
        console.log(error);
        setError("Failed to load dentists. Please try again.");
        setLoading(false);
      });
  };

  const handleBookClick = (dentist) => {
    setSelectedDentist(dentist);
  };

  const handleClose = () => {
    setSelectedDentist(null);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-blue-600 text-xl font-semibold">
          Loading dentists...
        </p>
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
      <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
        <FontAwesomeIcon icon={faUserDoctor} className="mr-2" />
        Our Dentists
      </h2>

      {dentists.length === 0 ? (
        <p className="text-center text-gray-500">No dentists found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dentists.map(function (dentist) {
            return (
              <div
                key={dentist._id}
                className="bg-white rounded-xl shadow-md overflow-hidden"
              >
                {/* Dentist Photo */}
                <img
                  src={
                    dentist.photo ||
                    "https://via.placeholder.com/300x200?text=No+Photo"
                  }
                  alt={dentist.name}
                  className="w-full h-48 object-contain bg-gray-100"
                />

                {/* dentist details */}
                <div className="p-4">
                  <h3 className="text-lg font-bold text-gray-800">
                    <FontAwesomeIcon
                      icon={faUserDoctor}
                      className="mr-2 text-blue-500"
                    />
                    {dentist.name}
                  </h3>

                  <p className="text-sm text-gray-500 mt-1">
                    <FontAwesomeIcon
                      icon={faStar}
                      className="mr-1 text-yellow-400"
                    />
                    {dentist.qualification}
                  </p>

                  <p className="text-sm text-gray-500 mt-1">
                    <FontAwesomeIcon
                      icon={faClock}
                      className="mr-1 text-blue-400"
                    />
                    {dentist.yearsOfExperience} years of experience
                  </p>

                  <p className="text-sm text-gray-500 mt-1">
                    <FontAwesomeIcon
                      icon={faHospital}
                      className="mr-1 text-green-500"
                    />
                    {dentist.clinicName}
                  </p>

                  <p className="text-sm text-gray-500 mt-1">
                    <FontAwesomeIcon
                      icon={faLocationDot}
                      className="mr-1 text-red-400"
                    />
                    {dentist.address}, {dentist.location}
                  </p>

                  {/* Book Appointment Button */}
                  <button
                    onClick={() => handleBookClick(dentist)}
                    className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                  >
                    Book Appointment
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* show booking when dentist is selected */}
      {selectedDentist && (
        <BookAppointment dentist={selectedDentist} onClose={handleClose} />
      )}
    </div>
  );
};

export default DentistList;
