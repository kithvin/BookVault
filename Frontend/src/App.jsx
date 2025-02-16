import React from "react"; // Importing the React library, which is essential for building React components.
import { Outlet } from "react-router-dom"; // Importing the Outlet component from react-router-dom. Outlet is used to render child routes.
import Navbar from "./components/Navbar"; // Importing the Navbar component from the components folder. This will likely serve site's navigation bar.

function App() {
  return (
    <>
      <Navbar/>
      {/* Rendering the Navbar component at the top of the application. This will be displayed on all pages. */}
      
      <Outlet />
      {/*  This is where the content of the child routes defined in router configuration will be rendered.  For example, the Home, Shop, About, or Blog components will appear here based on the current URL. */}
    </>
  );
}

export default App; // Exporting the App component so it can be used in other parts of the application, such as the main entry point (index.js).
