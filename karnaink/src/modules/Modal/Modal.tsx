import React, { useState, useEffect } from "react";
import {
  IconButton,
  Dialog,
  DialogActions,
  Button,
  DialogContent,
  DialogTitle,
  Card,
  CardActionArea,
  CardMedia,
  Typography,
  Link,
  Box,
} from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
const ModalComponent = (props) => {
  const handleOpen = () => {
    props.setOpen(!props.open);
  };
  const [isScaled, setIsScaled] = useState(false);
  const handleImageClick = () => {
    setIsScaled((prevIsScaled) => !prevIsScaled);
  };
  const handleClose = () => {
    props.setOpen(!props.open);
  };

  useEffect(() => {
    setIsScaled(false);
  }, []);

  return (
    <Dialog open={props.open} onClose={handleClose}>
      <Box
        sx={{
          marginTop: "1rem",
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Link
          sx={{ display: "flex", alignItems: "center" }}
          target="_blank"
          rel="noreferrer noopener"
          href="https://www.instagram.com/karnaink_tattoo/"
        >
          <InstagramIcon fontSize="large" />
        </Link>
        <Link
          target="_blank"
          rel="noreferrer noopener"
          href="https://www.instagram.com/karnaink_tattoo/"
        >
          <Typography
            fontWeight="fontWeightBold"
            fontFamily={
              "-apple-system,BlinkMacSystemFont,Roboto,Open Sans,Helvetica Neue,sans-serif;"
            }
            color="text.primary"
          >
            @karna_ink
          </Typography>
        </Link>

        <Button
          sx={{ display: { xs: "none", sm: "block" } }}
          target="_blank"
          rel="noreferrer noopener"
          href="https://www.instagram.com/karnaink_tattoo/"
          variant="contained"
        >
          Sledovať
        </Button>

        <IconButton
          sx={{ display: { xs: "block", sm: "none" } }}
          target="_blank"
          rel="noreferrer noopener"
          href="https://www.instagram.com/karnaink_tattoo/"
          // variant="contained"
          color="primary"
        >
          <PersonAddIcon />
        </IconButton>
      </Box>
      <DialogContent>
        <Card>
          <CardActionArea>
            <CardMedia
              sx={{
                width: "100%",
                objectFit: "contain",
                transition: "transform .2s",
                transform: isScaled ? "scale(1.5)" : "scale(1)",
                transformOrigin: "center",
              }}
              component="img"
              image={props.imageSrc}
              onClick={handleImageClick}
            />
          </CardActionArea>
        </Card>
      </DialogContent>
    </Dialog>
  );
};

export default ModalComponent;
