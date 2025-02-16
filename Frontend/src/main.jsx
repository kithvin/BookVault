// Importing necessary libraries and components
import React from "react"; // Importing React library
import ReactDOM from "react-dom/client"; // Importing ReactDOM for rendering the app
import App from "./App.jsx"; // Importing the main App component
import "./index.css"; // Importing the main CSS file for styling
import { RouterProvider } from "react-router-dom"; // Importing RouterProvider for routing
import router from "./routers/router.jsx"; // Importing the router configuration

// Rendering the application to the DOM
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* Enabling StrictMode for highlighting potential problems */}
    <RouterProvider router={router} />{" "}
    {/* Providing the router to the application */}
  </React.StrictMode>
);
