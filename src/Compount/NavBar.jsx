import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate(); // Initialize navigate hook

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
  };

  const handleHomeClick = () => {
    navigate("/"); // Navigate to the home page ("/")
  };

  return (
    <nav className="bg-white dark:bg-gray-800 shadow p-4 flex flex-row justify-evenly">
      {/* Job Listings as Button */}
      <button
        onClick={handleHomeClick}
        className="text-xl font-bold bg-transparent border-none cursor-pointer mb-4"
      >
        Job Listings
      </button>

      {/* Welcome text and description */}
      <div className="text-center mb-4">
        <h1 className="text-2xl font-bold mb-2">Welcome to Job Listings</h1>
        <p className="text-xl text-gray-600">Browse through our available job opportunities</p>
      </div>

      {/* Dark Mode Toggle Button */}
      <button onClick={toggleDarkMode} className="p-2 bg-gray-300 dark:bg-gray-700 rounded">
        {darkMode ? "Light Mode" : "Dark Mode"}
      </button>
    </nav>
  );
};

export default Navbar;
