import React, { useState, useEffect } from "react";
import instance from "/src/axiosConfig";
import {
  Box,
  TextField,
  InputAdornment,
  IconButton,
  Button,
} from "@mui/material";
// Required imports from the example.
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useTheme } from "@emotion/react";
import { checkAuthToken } from "../../utils/auth"; // Update with the actual path
import "./Login.scss";
function Login() {
  const theme = useTheme();
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  const [username, setUsername] = useState("");

  const [ip, setIP] = useState("");

  const handleSubmit = (e: any) => {
    console.log(instance.defaults);
    e.preventDefault();

    instance
      .post(
        "/login/",
        { username, password },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      )
      .then((res) => {
        localStorage.setItem("authToken", res.data.token);
        res.status === 200
          ? (window.location.href = "/dashboard")
          : console.log("Not authentificated");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getData = async () => {
    const res = await instance.get("https://api.ipify.org/?format=json");
    setIP(res.data.ip);
  };

  useEffect(() => {
    //passing getData method to the lifecycle method
    getData();
  }, []);
  return (
    <Box
      sx={{
        bgcolor: theme.palette.background.default,
      }}
    >
      <form className="sectionContainer" style={{ flexDirection: "column" }}>
        <h3 style={{ color: theme.palette.error.main }}>
          AUTHORIZED PERSONNEL ONLY!
        </h3>
        <h4> IP: {ip}</h4>
        <TextField
          label="Username"
          type="text"
          id="username"
          name="username"
          className="loginField"
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          label="Password"
          variant="outlined"
          className="loginField"
          onChange={(e) => setPassword(e.target.value)}
          type={showPassword ? "text" : "password"} // <-- This is where the magic happens
          //   onChange={someChangeHandler}
          InputProps={{
            // <-- This is where the toggle button is added.
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Button
          type="submit"
          onClick={handleSubmit}
          variant="contained"
          value="Submit"
        >
          Login
        </Button>
      </form>
    </Box>
  );
}

export default Login;
