import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Dashboard from "./pages/Dashboard"; // Adjust the path based on your project structure
import './tailwind.css';

function App() {
  return (
    <Router>
      <div>
        <header className="text-center p-4">
          <h1 className="text-3xl font-bold">My App</h1>
        </header>
        <main className="container mx-auto p-4">
          {/* Navigation Button */}
          <Link to="/dashboard">
            <button className="bg-blue-500 text-white px-4 py-2 rounded">
              Go to Dashboard
            </button>
          </Link>
        </main>

        {/* Routes */}
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
