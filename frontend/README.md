# Dentist Appointment Booking - Frontend

This is the frontend of the Dentist Appointment Booking Platform built with React and Tailwind CSS.

## Setup

Go into the frontend folder and run npm install to install all dependencies. Then run npm start to start the app on port 3000. Make sure the backend server is running on port 5000 before starting the frontend.

## Components

DentistList shows all dentists in a card format with a search bar and pagination. BookAppointment is a modal form that opens when the user clicks Book Appointment on a dentist card. AdminPanel shows all appointments in a table with status management and pagination. Login is the admin login page that appears when visiting the admin panel without a token.

## Environment

The app connects to the backend at http://localhost:5000. Change this to your deployed backend URL before deploying the frontend.
