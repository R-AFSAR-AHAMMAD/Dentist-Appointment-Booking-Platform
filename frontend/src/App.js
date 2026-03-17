import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTooth, faHouse, faUserShield } from "@fortawesome/free-solid-svg-icons";
import DentistList from "./components/DentistList";
import AdminPanel from "./components/AdminPanel";

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">

        {/* Navbar */}
        <nav className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center">
          
          {/* Logo */}
          <h1 className="text-xl font-bold">
            <FontAwesomeIcon icon={faTooth} className="mr-2" />
            DentCare
          </h1>

          {/* Nav Links */}
          <div className="flex gap-6">
            <Link to="/" className="hover:underline">
              <FontAwesomeIcon icon={faHouse} className="mr-1" />
              Home
            </Link>
            <Link to="/admin" className="hover:underline">
              <FontAwesomeIcon icon={faUserShield} className="mr-1" />
              Admin Panel
            </Link>
          </div>

        </nav>

        {/* Pages */}
        <Routes>
          <Route path="/" element={<DentistList />} />
          <Route path="/admin" element={<AdminPanel />} />
        </Routes>

      </div>
    </Router>
  );
}

export default App;