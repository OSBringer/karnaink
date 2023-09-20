import React from "react";
import { Box, Button } from "@mui/material";
import { useTheme } from "@emotion/react";
import { useNavigate } from "react-router-dom";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
function Confirmation() {
  const navigate = useNavigate();
  const theme = useTheme() as any;
  return (
    <Box
      sx={{
        bgcolor: theme.palette.background.default,
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <CheckCircleIcon
        sx={{ fontSize: 300, color: theme.palette.success.main }}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "end",
          textAlign: "center",
        }}
      >
        <h2 style={{}}>
          Zaslanie rezervácie prebehlo úspešne <br />
          Vašu rezerváciu spracujem čo najskôr a budem Vás kontaktovať.
        </h2>
      </Box>

      <Button variant="contained" onClick={() => navigate("/")}>
        naspäť
      </Button>
    </Box>
  );
}

export default Confirmation;
