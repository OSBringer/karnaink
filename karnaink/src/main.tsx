import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";

import "./index.scss";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { themeOptions } from "./theme.tsx";
import AOS from "aos";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "aos/dist/aos.css";
import ErrorPage from "./components/ErrorPage/ErrorPage.tsx";
import Login from "./components/Login/Login.tsx";
import ErrorBoundary from "./modules/ErrorBoundary/ErrorBoundary.tsx"; // Import the error boundary component
import Dashboard from "./components/Dashboard/Dashboard.tsx";
AOS.init();

// import instance from "/src/axiosConfig";.defaults.baseURL = import.meta.env.REACT_APP_BACKEND_URL;
// import instance from "/src/axiosConfig";.defaults.xsrfCookieName = "csrftoken";
// import instance from "/src/axiosConfig";.defaults.xsrfHeaderName = "X-CSRFToken";
// import instance from "/src/axiosConfig";.defaults.headers.post["Content-Type"] = "x-www-form-urlencoded";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/admin",
    element: <Login />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <ErrorBoundary>
    {/* Wrap your main component with the error boundary */}
    <ThemeProvider theme={createTheme(themeOptions)}>
      <React.StrictMode>
        <RouterProvider router={router} />
      </React.StrictMode>
    </ThemeProvider>
  </ErrorBoundary>
);
