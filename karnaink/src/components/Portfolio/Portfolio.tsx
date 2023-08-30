import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { Box, Card, Button, Link } from "@mui/material";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import "./Portfolio.scss";
import Typography from "@mui/material/Typography";
import { CardActionArea, useTheme } from "@mui/material";
import loadAndSetRandomImages from "../../utils/staticLoader";
import ModalComponent from "../../modules/Modal/Modal";
const url = `/instagram/`;

interface Props {
  innerRef: React.RefObject<HTMLDivElement>;
}

const Portfolio = (props: Props) => {
  const theme = useTheme();
  const [images, setImages] = useState([]);
  const [open, setOpen] = useState(false);
  const [imageSrc, setImageSrc] = useState("");
  useEffect(() => {
    loadAndSetRandomImages((array: string[]) => setImages(array));
  }, []);

  return (
    <Box
      className="sectionContainer"
      bgcolor={theme.palette.background.default}
      id="portfolio"
    >
      <Box className="portfolioContainer">
        <Box
          data-aos="fade-down"
          data-aos-once="true"
          data-aos-anchor-placement="bottom-bottom"
          ref={props.innerRef}
          className="portfolioTitle"
        >
          <Link
            target="_blank"
            rel="noreferrer noopener"
            href="https://www.instagram.com/karnaink_tattoo/"
          >
            <Card sx={{ borderRadius: "55%" }}>
              <CardActionArea>
                <CardMedia
                  sx={{ borderRadius: "50%", height: "50px", width: "50px" }}
                  className="circleImage"
                  component="img"
                />
              </CardActionArea>
            </Card>
          </Link>
          <Typography
            variant="h6"
            fontWeight="fontWeightBold"
            fontFamily={
              "-apple-system,BlinkMacSystemFont,Roboto,Open Sans,Helvetica Neue,sans-serif;"
            }
            color="text.primary"
          >
            @karna_ink
          </Typography>
          <Button
            target="_blank"
            rel="noreferrer noopener"
            href="https://www.instagram.com/karnaink_tattoo/"
            variant="contained"
          >
            Sledovať
          </Button>
        </Box>
        <Box className="cardContainer">
          {images.map((base64Image, index) => (
            <Card
              data-aos="fade-zoom-in"
              data-aos-once="true"
              data-aos-delay={index * 50}
              data-aos-offset="0"
              key={index}
              rel="noreferrer noopener"
              onClick={() => {
                setOpen(true);
                setImageSrc(base64Image);
              }}
            >
              <CardActionArea>
                <CardMedia
                  key={index}
                  component="img"
                  src={base64Image}
                  alt="tattoo"
                  className="cardImage"
                  sx={{ width: 280, height: 360 }}
                  //src={`data:image/jpeg;base64, ${base64Image}`}
                />
              </CardActionArea>
            </Card>
          ))}
          <ModalComponent setOpen={setOpen} open={open} imageSrc={imageSrc} />
        </Box>
      </Box>
    </Box>
  );
};
export default Portfolio;

// import React from "react";
// import PropTypes from "prop-types";
// import { Box } from "@mui/material";
// import { useTheme } from "@mui/material/styles";
// function Portfolio(props: any) {
//   const theme = useTheme();
//   return (
//     <Box
//       bgcolor={theme.palette.background.default}
//       className="sectionContainer"
//     >

//     </Box>
//   );
// }

// Portfolio.propTypes = {};

// export default Portfolio;
