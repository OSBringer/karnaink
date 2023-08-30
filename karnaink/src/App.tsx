import React, { useRef, useEffect, createContext, useState } from "react";

import { Toolbar } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import "./App.scss";
import Navbar from "./components/Navbar/Navbar";
import Logo from "./components/Logo/Logo";
import Footer from "./components/Footer/Footer";
import Portfolio from "./components/Portfolio/Portfolio";
import Form from "./components/Form/Form";
import About from "./components/About/About";
import Loader from "./modules/Loader/Loader";
export const LoaderContext = createContext();
function App() {
  const [loaderState, setLoaderState] = useState(false);
  const theme = useTheme();
  const ref = useRef(null);
  return (
    <LoaderContext.Provider value={{ loaderState, setLoaderState }}>
      <div className="mainContainer" style={{ backgroundColor: "#fff" }}>
        <Navbar innerRef={ref} />
        <Toolbar />
        <Logo />
        <Portfolio innerRef={ref} />

        <Form />
        <About />

        <Footer />
        <Loader />
      </div>
    </LoaderContext.Provider>
  );
}

export default App;
