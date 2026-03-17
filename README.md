# Dentist Appointment Booking Platform

This is a full stack web application that allows users to view dentists and book appointments. The admin can log in to view and manage all appointments.

## Tech Stack

The frontend is built with React and styled using Tailwind CSS. API calls are made using Axios. The backend uses Node.js with Express framework and MongoDB as the database with Mongoose for schema management. Authentication is handled using JWT tokens.

## Project Structure

The project has two main folders. The backend folder contains the Express server, Mongoose models for Dentist, Appointment and Admin, and the API routes. The frontend folder is a React application with components for the dentist listing page, booking form, admin panel and login page.

## Features

Users can view all available dentists with their details and book an appointment by filling a simple form. The admin can log in securely and view all appointments in a table. The admin can also update the status of each appointment to Booked, Completed or Cancelled. The dentist listing page has a search bar to filter dentists by name, location or clinic. Both the dentist listing and admin panel have pagination.

## Setup Instructions

First clone the repository and open it in your code editor.

For the backend, go into the backend folder and run npm install to install all dependencies. Create a .env file and add your MongoDB Atlas connection string as MONGO_URI and a JWT secret as JWT_SECRET. Then run node server.js to start the backend server on port 5000.

For the frontend, go into the frontend folder and run npm install. Then run npm start to start the React app on port 3000.

## API Endpoints

GET /api/dentists fetches all dentists. POST /api/dentists adds a new dentist. POST /api/appointments creates a new appointment. GET /api/admin/appointments fetches all appointments and requires admin token. PUT /api/admin/appointments/:id updates appointment status and requires admin token. POST /api/auth/login logs in the admin. POST /api/auth/register creates the admin account.

## Admin Credentials

Username is admin and password is password. You can register the admin by sending a POST request to /api/auth/register with these credentials before logging in.

## Deployment

The backend is deployed on Render and the frontend is deployed on Netlify.
