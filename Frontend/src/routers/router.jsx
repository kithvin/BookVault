// Importing necessary functions and components from react-router-dom
import {
  createBrowserRouter, // Function to create a browser-based router.  This creates the router instance that will manage navigation.
  RouterProvider, // Component to provide the router to the application. This component makes the router available to all components within it.
} from "react-router-dom";

// Importing the main App component
import App from "../App"; // Imports the main application component.  This is likely the root component that provides the basic layout.
import Home from "../pages/Home"; // Imports the Home page component.
import Shop from "../pages/Shop"; // Imports the Shop page component.
import About from "../components/About"; // Imports the About page component.
import Blog from "../components/Blog"; // Imports the Blog page component.

// Defining the router configuration
const router = createBrowserRouter([
  {
    path: "/", // The root path of the application.  This is the base URL for the application.
    element: <App />, // The component to render when the user visits the root path.  The App component likely acts as a layout, with nested routes rendered inside.
    children: [
      // Defines nested routes within the App layout. These routes will be rendered within the <Outlet> component, which should be present in App component.
      {
        path: "/", // The path for the Home page, relative to the parent route ("/"). So the full path is "/"
        element: <Home />, // The component to render when the user navigates to the home path.
      },

      {
        path: "/shop", // The path for the Shop page, relative to the parent route ("/"). So the full path is "/shop"
        element: <Shop />, // The component to render when the user navigates to the shop path.
      },

      {
        path: "/about", // The path for the About page, relative to the parent route ("/"). So the full path is "/about"
        element: <About />, // The component to render when the user navigates to the about path.
      },

      {
        path: "/blog", // The path for the Blog page, relative to the parent route ("/"). So the full path is "/blog"
        element: <Blog />, // The component to render when the user navigates to the blog path.
      },
    ],
  },
]);

export default router; // Exporting the router so it can be imported and used in other parts of the application, typically in the root index.js or App.js to provide routing functionality.
