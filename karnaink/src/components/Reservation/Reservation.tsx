import React, { useEffect, useState } from "react";
import { Box, Button, Typography, TextField } from "@mui/material";
import { useTheme } from "@emotion/react";
import { checkAuthToken } from "../../utils/auth";
import Nonauth from "../../modules/Nonauth/Nonauth";
import dayjs from "dayjs";
import instance from "../../axiosConfig.js";

function Reservation() {
  const theme = useTheme() as any;
  const url = window.location.href;
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [price, setPrice] = useState(0);
  const [advancePrice, setAdvancePrice] = useState(0);

  const handleSubmit = (e) => {
    const { reservation_id, email, date, time } =
      extractNumberAndEmailFromUrl(url);

    const formattedDate = dayjs(date, "YYYY-MM-DD").format("DD.MM.YYYY");
    instance
      .post(
        "/send_price/",
        {
          reservation_id,
          email,
          date: formattedDate,
          time,
          total_price: price,
          advance_price: advancePrice,
        },
        {
          withCredentials: true,
          headers: {
            Authorization: `Token ${localStorage.getItem("authToken")} `,
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.warn(err);
      });
  };

  function extractNumberAndEmailFromUrl(url) {
    // Regular expression to match the number and email
    const regex =
      /\/reservation\/(\d+)\/(\d{4}-\d{2}-\d{2})\/(\d{2}:\d{2}:\d{2})\/([^/]+)@([^/]+)/;
    const match = url.match(regex);
    console.log(match);
    if (match) {
      const reservation_id = match[1];
      const date = match[2];
      const time = match[3];
      const email = `${match[4]}@${match[5]}`;

      return { reservation_id, email, date, time };
    } else {
      // Return null or handle the case where the URL doesn't match the expected format
      return null;
    }
  }

  const performAuthCheck = async () => {
    const isAuth = await checkAuthToken();
    setIsAuthenticated(isAuth);
  };
  useEffect(() => {
    performAuthCheck();
  }, []);
  return isAuthenticated ? (
    <Box
      sx={{
        position: "absolute",
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        bgcolor: theme.palette.background.default,
      }}
    >
      <Typography variant="h4" component="div" gutterBottom>
        Odoslať cenu
      </Typography>
      <Typography variant="h5" component="div" gutterBottom>
        <b>Email</b>: {extractNumberAndEmailFromUrl(url).email}
      </Typography>
      <Typography variant="h5" component="div" gutterBottom>
        <b>Č. Rezervácie</b>: {extractNumberAndEmailFromUrl(url).reservation_id}
      </Typography>
      <Typography variant="h5" component="div" gutterBottom>
        <b>Dátum</b>:
        {dayjs(extractNumberAndEmailFromUrl(url).date, "YYYY-MM-DD").format(
          "DD.MM.YYYY"
        )}
      </Typography>
      <Typography variant="h5" component="div" gutterBottom>
        <b>Čas</b>: {extractNumberAndEmailFromUrl(url).time}
      </Typography>

      <TextField
        label="Celková cena"
        placeholder="Cena(euro)"
        type="number"
        onChange={(e) => setPrice(parseFloat(e.target.value))}
        value={price}
      />
      <TextField
        sx={{ marginTop: "20px" }}
        label="Záloha"
        placeholder="Záloha(euro)"
        type="number"
        onChange={(e) => setAdvancePrice(parseFloat(e.target.value))}
        value={advancePrice}
      />
      <Button
        sx={{ marginTop: "20px" }}
        variant="contained"
        onClick={handleSubmit}
      >
        Odoslať cenu
      </Button>
    </Box>
  ) : (
    <Nonauth />
  );
}

export default Reservation;
