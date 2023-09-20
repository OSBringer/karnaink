import { ThemeOptions } from "@mui/material/styles";
import { lighten } from "@mui/system";

// Define a custom type for your additional palette options
interface CustomPaletteOptions {
  attention: {
    main: string;
    light: string;
  };
}

// Merge the custom palette options with the existing ThemeOptions
const themeOptions: ThemeOptions & { palette: CustomPaletteOptions } = {
  palette: {
    mode: "light",
    primary: {
      main: "#73513d",
    },
    secondary: {
      main: "#efbb93",
    },
    info: {
      main: "#e2a57e",
    },
    success: {
      main: "#2e7d32",
      light: lighten("#2e7d32", 0.5),
    },
    background: {
      default: "#eaccc3",
    },
    error: {
      main: "#b71c1c",
    },
    attention: {
      main: "#ff9800",
      light: lighten("#ff9800", 0.5),
    },
  },
  typography: {
    fontFamily: "Playfair Display",
    fontSize: 16,
  },
};

export default themeOptions;
