import React from "react";
import { Box, Button } from "@mui/material";
import { useTheme } from "@emotion/react";
function Nonauth() {
  const theme = useTheme() as any;
  return (
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
      <h2>Not Authorized</h2>
      <Button href="/admin">Login</Button>
    </Box>
  );
}

export default Nonauth;
