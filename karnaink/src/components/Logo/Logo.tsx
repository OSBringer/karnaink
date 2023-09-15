import React, { useState, useEffect } from "react";
import "./Logo.scss";
import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import logoImage from "../../images/log.png";
function Logo() {
  const theme = useTheme() as any;
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
        <div className="logoText">
          <h1
            className="mainText"
            data-aos="fade-up"
            data-aos-easing="ease-in-back"
            data-aos-duration="500"
          >
            KarnaInk
          </h1>
          <Typography
            className="subText"
            data-aos-duration="500"
            data-aos-delay="500"
            data-aos="zoom-in top-center"
            data-aos-easing="ease-in-back"
            sx={{ fontSize: { sm: "1.5rem", md: "2.5rem", lg: "2.5rem" } }}
            component="div"
          >
            Tattoo Studio
          </Typography>
        </div>
      )}

      <img
        data-aos="fade-up"
        data-aos-easing="ease-in-back"
        className="logo"
        src={logoImage}
        alt="logo"
      />
    </Box>
  );
}

export default Logo;
