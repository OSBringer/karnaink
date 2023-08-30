import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { Card, Box, useTheme } from "@mui/material";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import "./About.scss";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

const About = () => {
  const theme = useTheme();
  return (
    <Box className="sectionContainer">
      <Box className="aboutWrapper">
        <h1 id="about">O mne</h1>
        <Box className="aboutContainer">
          <Card sx={{ width: "100%" }}>
            <CardActionArea>
              <CardMedia
                sx={{ width: "100%" }}
                component="img"
                src="src/images/about.jpg"
              />
            </CardActionArea>
          </Card>
          <Card
            sx={{
              bgcolor: theme.palette.primary.main,
              color: theme.palette.primary.contrastText,
              padding: "1rem",
            }}
          >
            <Typography
              variant="body1"
              className="aboutText"
              sx={{ fontSize: { sm: "1.2rem", md: "1.3rem", lg: "1.5rem" } }}
            >
              Volám sa <b>Michaela</b> a mám 23 rokov👵🏻 kresleniu sa venujem
              odmalička a preto som sa rozhodla tetovať. <u>Milujem</u>{" "}
              trblietky, prírodné a lesné prostredie a malé zlaté baby
              zvieratká. Zároveň milujem všetko magické a energetické, temné,
              tmavé a kriminálne 😂🖤
              <br />
              Mám rada horkú čokoládu, tulipány a črepníkové rastliny a kryštály
              *wink wink*. Tetujem linkované lesné a prírodne motívy, kvietky,
              zvieratká a rozvíjať sa chcem najmä v oblasti blackworku. Počas
              tetovania u mňa budeš počuť hudbu najmä žánru rock a metal. Sem
              tam mi tam skočí nejaký dubstep, country alebo Jaro Nohavica 😄{" "}
              <br />
              <br /> Teším sa na vás 🖤
            </Typography>
          </Card>
        </Box>
      </Box>
    </Box>
  );
};
export default About;
