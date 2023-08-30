import React from "react";
import { Box, Button } from "@mui/material";
import { useTheme } from "@emotion/react";
import { useNavigate } from "react-router-dom";

function ErrorPage() {
  const navigate = useNavigate();
  const theme = useTheme();
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
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "end",
          textAlign: "end",
        }}
      >
        <h2 style={{ marginLeft: "20px" }}>oops niečo sa pokazilo...</h2>

        <img
          src="/src/images/fallback.png"
          alt="error"
          style={{
            width: 250,
            position: "fixed",
            top: "35%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            margin: "auto",
          }}
        />
      </Box>

      <Button variant="contained" onClick={() => navigate("/")}>
        naspäť
      </Button>
    </Box>
  );
}

export default ErrorPage;
