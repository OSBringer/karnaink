import React from "react";
import PropTypes from "prop-types";
import { Box, Typography, useTheme, Link } from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CopyrightIcon from "@mui/icons-material/Copyright";
import "./Footer.scss";
import dayjs from "dayjs";

function Footer(props: any) {
  const theme = useTheme() as any;
  return (
    <>
      <Box className="footerMain" bgcolor={theme.palette.primary.main}>
        <Box id="contact" className="footerContainer">
          <Box className="iconContainer" sx={{ gridRow: 1 }}>
            <InstagramIcon />

            <Typography fontWeight={"bold"}>
              <Link
                target="_blank"
                href="https://www.instagram.com/karnaink_tattoo/"
                sx={{ color: "inherit" }}
              >
                @karnaink_tattoo
              </Link>
            </Typography>
          </Box>
          <Box className="iconContainer" sx={{ gridRow: 2 }}>
            <PhoneIcon />

            <Typography fontWeight={"bold"}>
              <Link href="tel+421123456789" sx={{ color: "inherit" }}>
                +421123456789{" "}
              </Link>
            </Typography>
          </Box>
          <Box className="iconContainer" sx={{ gridRow: 3 }}>
            <EmailIcon />
            <Typography fontWeight={"bold"}>
              <Link href="mailto: karnaink@gmail.com" sx={{ color: "inherit" }}>
                karnaink@gmail.com
              </Link>
            </Typography>
          </Box>
          <Box className="iconContainer" sx={{ gridRow: 4 }}>
            <LocationOnIcon />
            <Typography fontWeight={"bold"} sx={{ overflow: "auto" }}>
              Tattoo Lines Studio Národná 3, 010 01 Žilina
            </Typography>
          </Box>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d10422.735241570635!2d18.743128!3d49.2255233!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47145d4854a2d045%3A0xbf6d4605569feef8!2sLines%20Tattoo%20Studio%20%C5%BDilina!5e0!3m2!1ssk!2scz!4v1693212861860!5m2!1ssk!2scz"
            style={{ border: 0 }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="map"
          ></iframe>
        </Box>
        {/* <Map /> */}
        <Box className="footerBottom">
          © {dayjs().format("YYYY")} Copyright | Karna Ink
        </Box>
        <Box>Created by Boris Hlavienka</Box>
      </Box>
    </>
  );
}

Footer.propTypes = {};

export default Footer;
