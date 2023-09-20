import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import CssBaseline from "@mui/material/CssBaseline";
import "./index.scss";
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@mui/material";
import themeOptions from "./theme.tsx";
import AOS from "aos";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "aos/dist/aos.css";
import ErrorPage from "./components/ErrorPage/ErrorPage.tsx";
import Login from "./components/Login/Login.tsx";
import ErrorBoundary from "./modules/ErrorBoundary/ErrorBoundary.tsx"; // Import the error boundary component
import Dashboard from "./components/Dashboard/Dashboard.tsx";
import Reservation from "./components/Reservation/Reservation.tsx";
import Confirmation from "./components/Confirmation/Confirmation.tsx";
AOS.init();

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
  {
    path: "/dashboard/reservation/*", // Specific route should come before the /dashboard route
    element: <Reservation />,
  },
  {
    path: "/confirmation_success/*",
    element: <Confirmation />,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <ErrorBoundary>
    <ThemeProvider theme={createTheme(themeOptions)}>
      <React.StrictMode>
        <RouterProvider router={router} />
      </React.StrictMode>
    </ThemeProvider>
  </ErrorBoundary>
);
