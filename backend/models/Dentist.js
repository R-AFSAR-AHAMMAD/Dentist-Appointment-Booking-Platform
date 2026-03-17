const mongoose = require("mongoose");

const dentistSchema = new mongoose.Schema(
  {
    photo: {
      type: String,
      default: "",
    },
    name: {
      type: String,
      required: true,
    },
    qualification: {
      type: String,
      required: true,
    },
    yearsOfExperience: {
      type: Number,
      required: true,
    },
    clinicName: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
  },
  { timestamp: true },
);

module.exports = mongoose.model('Dentist',dentistSchema)
