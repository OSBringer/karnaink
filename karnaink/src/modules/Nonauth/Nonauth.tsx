import React from "react";
import { Box, Button } from "@mui/material";
import { useTheme } from "@emotion/react";
function Nonauth() {
  const theme = useTheme();
  return (
    <Box
      sx={{
        position: "absolute",
        bgcolor: theme.palette.background.default,
      }}
    >
      <h1>Not Authorized</h1>
      <Button href="/admin">Login</Button>
    </Box>
  );
}

export default Nonauth;
