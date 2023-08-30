import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  IconButton,
  makeStyles,
  Container,
  MenuItem,
  Menu,
  Slide,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Create from "@mui/icons-material/Create";
import { useTheme } from "@mui/material/styles";
import useScrollTrigger from "@mui/material/useScrollTrigger";

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  innerRef: React.RefObject<HTMLDivElement>;
  window?: () => Window;
  children: React.ReactElement;
}
const pages = [
  { name: "Portfolio", id: "portfolio" },
  { name: "O mne", id: "about" },
  { name: "Kontakt", id: "contact" },
];
function HideOnScroll(props: Props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

export default function Navbar(props: Props) {
  const theme = useTheme();
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  return (
    <HideOnScroll {...props}>
      <AppBar component="nav">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Box sx={{ display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pages.map((page) => (
                  <MenuItem
                    key={page.id}
                    onClick={() => {
                      handleCloseNavMenu();
                      document
                        ?.getElementById(`${page.id}`)
                        ?.scrollIntoView({ behavior: "smooth" });
                    }}
                  >
                    <Typography textAlign="center">{page.name}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <Box sx={{ flexGrow: { xs: 1, md: 0 } }}>
              <Typography
                sx={{
                  display: { xs: "flex", md: "none" },
                  fontFamily: "Dancing Script",
                  fontWeight: 400,
                  letterSpacing: ".1rem",
                }}
                variant="h5"
              >
                Karna Ink
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignContent: "center",
              }}
            >
              <Typography
                sx={{
                  display: { xs: "none", md: "flex" },
                  fontFamily: "Dancing Script",
                  fontWeight: 400,
                  letterSpacing: ".1rem",
                }}
                variant="h4"
              >
                Karna Ink
              </Typography>
              <Typography
                sx={{
                  display: { xs: "none", md: "block" },
                  fontSize: ".8rem",
                  marginBlockStart: 0,
                  marginBlockEnd: 0,
                  textAlign: "end",
                  letterSpacing: "1.5rem",
                  marginRight: "-.9rem",
                  color: theme.palette.secondary.main,
                }}
              >
                tattoo
              </Typography>
            </Box>
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "none", md: "flex" },
                justifyContent: "space-evenly",
                mr: 5,
                ml: 5,
              }}
            >
              <Button
                onClick={() =>
                  document
                    ?.getElementById("portfolio")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                variant={"outlined"}
                color="secondary"
              >
                Portfolio
              </Button>
              <Button
                onClick={() =>
                  document
                    ?.getElementById("about")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                variant={"outlined"}
                color="secondary"
              >
                O mne
              </Button>
              <Button
                onClick={() =>
                  document
                    ?.getElementById("contact")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                variant={"outlined"}
                color="secondary"
              >
                Kontakt
              </Button>
            </Box>
            <Box>
              <Button
                onClick={() =>
                  document
                    ?.getElementById("form")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                variant="contained"
                color="secondary"
                sx={{
                  mr: 1,
                  ":hover": {
                    backgroundColor: theme.palette.secondary.light,
                  },
                }}
              >
                Rezervovať
                <Create fontSize="small" />
              </Button>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </HideOnScroll>
  );
}
