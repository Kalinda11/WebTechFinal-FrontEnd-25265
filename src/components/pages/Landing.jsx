import { Link } from "react-router-dom";

const Landing = () => {
  const backgroundImage =
    "https://images.pexels.com/photos/2324837/pexels-photo-2324837.jpeg?auto=compress&cs=tinysrgb&w=1600"; // Hospital-related image URL
  const fallbackImage =
    "https://images.pexels.com/photos/361977/pexels-photo-361977.jpeg?auto=compress&cs=tinysrgb&w=1600"; // Medical symbols image URL

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-blue-700 bg-opacity-70"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Invisible img tag for preloading and handling errors */}
      <img
        src={backgroundImage}
        alt="background"
        onError={(e) => {
          e.target.src = fallbackImage; // Replace with fallback image
          e.target.style.display = "none"; // Hide this img tag
          document.querySelector(".background").style.backgroundImage = `url(${fallbackImage})`;
        }}
        className="hidden"
      />

      <div className="text-center p-10 bg-white bg-opacity-80 rounded-2xl shadow-2xl backdrop-blur-md max-w-sm mx-auto">
        <h1 className="text-2xl font-semibold text-blue-900 mb-6">
          Hospital Management System
        </h1>
        <p className="text-lg text-gray-800 mb-6 font-medium">
          Welcome to the Hospital Management System. Your solution for managing
          patient data efficiently and securely.
        </p>
        <Link
          to="/login"
          className="px-8 py-2 text-white bg-blue-800 hover:bg-blue-900 rounded-full transition duration-300 shadow-md hover:shadow-lg"
        >
          Login
        </Link>
      </div>
    </div>
  );
};

export default Landing;
