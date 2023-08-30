import React, { useState, useEffect } from "react";
import "./Logo.scss";
import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

function Logo() {
  const theme = useTheme();
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    // Check if the font is loaded
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => {
        setFontLoaded(true);
      });
    } else {
      // If the browser doesn't support document.fonts.ready, assume font is loaded
      setFontLoaded(true);
    }
  }, []);
  return (
    <Box
      bgcolor={theme.palette.background.default}
      className="sectionContainer"
    >
      {fontLoaded && (
        <h1 data-aos="fade-up" data-aos-easing="ease-in-back">
          KarnaInk
        </h1>
      )}

      <img
        data-aos="fade-up"
        data-aos-easing="ease-in-back"
        className="logo"
        src="src/images/log.png"
        alt="logo"
      />
    </Box>
  );
}

export default Logo;