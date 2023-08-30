import React, { useState, useEffect, Suspense } from "react";
import { checkAuthToken, handleLogout } from "../../utils/auth"; // Update with the actual path
import { Box, Button, Paper, Snackbar } from "@mui/material";
import { useTheme } from "@emotion/react";
import DatePicker from "../../modules/Datepicker/Datepicker";
import ClearIcon from "@mui/icons-material/Clear";
import Searchbar, {
  filterStringsBySubstring,
} from "../../modules/Searchbar/Searchbar";
import "./Dashboard.scss";
import dayjs from "dayjs";
import instance from "/src/axiosConfig.js";
import MuiAlert from "@mui/material/Alert";
import Nonauth from "../../modules/Nonauth/Nonauth";
import { loadTimes, deleteTime } from "../../utils/api";
import CircularProgress from "@mui/material/CircularProgress";

function Dashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [timesArray, setTimesArray] = useState([]);
  const [displayedTimesArray, setDisplayedTimesArray] = useState([]); // Add this line
  const [dateTime, setDateTime] = useState(dayjs().add(1, "day"));
  const [search, setSearch] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState({
    state: false,
    message: "",
  });
  const theme = useTheme();
  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackbarOpen({ state: false, message: "" });
  };
  const handleSubmit = () => {
    instance
      .post(
        "/add_times/",
        { timesArray },
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
        console.log(err);
      });
  };

  const handleDelte = (timeObject) => {
    setTimesArray(
      timesArray.filter((time, index) => time.value !== timeObject.value)
    );
    timeObject.isNew ? null : deleteTime(timeObject);
  };

  const performAuthCheck = async () => {
    const isAuth = await checkAuthToken();
    setIsAuthenticated(isAuth);
  };

  const addTime = () => {
    const formattedDateTime = dateTime.format("DD.MM.YYYY HH:00");

    if (timesArray.some((obj) => obj.value === formattedDateTime)) {
      setSnackbarOpen({
        state: true,
        message: `${formattedDateTime} už bol pridaný! 💀`,
      });
      return;
    } else if (dateTime.isBefore(dayjs())) {
      setSnackbarOpen({
        state: true,
        message: `Nieje možné pridať čas z minulosti! 👴`,
      });
      return;
    } else if (dateTime.isAfter(dayjs().add(10, "year"))) {
      setSnackbarOpen({
        state: true,
        message: `Maxímálne 10 rokov dopredu!😢`,
      });
      return;
    }
    setTimesArray([
      ...timesArray,
      { isNew: true, value: formattedDateTime, isAvailable: true },
    ]);
  };

  useEffect(() => {
    performAuthCheck().then((res) => {
      setLoading(true);
      loadTimes()
        .then((res) => {
          setLoading(false);
          setTimesArray(res);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  }, []);

  // searchbar

  useEffect(() => {
    const updatedList = [...timesArray];
    const result = filterStringsBySubstring(updatedList, search);
    setDisplayedTimesArray(result);
  }, [timesArray, search]);

  return isAuthenticated ? (
    <Box
      className="sectionContainer"
      sx={{ bgcolor: theme.palette.background.default }}
    >
      <Box className="dashboardContainer">
        <Box>
          <Searchbar onSearch={(value) => setSearch(value)} />
        </Box>
        <Box>
          <DatePicker
            onAccept={(date) => setDateTime(date)}
            isDashboard={true}
          />
          <Button
            onClick={() => addTime()}
            sx={{ minHeight: "60px" }}
            variant="contained"
          >
            Pridať
          </Button>
        </Box>

        <Box className="timeContainer">
          {loading ? (
            <CircularProgress />
          ) : (
            displayedTimesArray.map((timeDisplayed, id) => (
              <Paper
                key={id}
                className={`dashboardPaper`}
                sx={
                  timeDisplayed.isNew && {
                    bgcolor: theme.palette.attention.light,
                  }
                }
                variant="outlined"
              >
                {timeDisplayed.value}

                <ClearIcon
                  onClick={() => handleDelte(timeDisplayed)}
                  color={"error"}
                  className="removeIcon"
                />
              </Paper>
            ))
          )}
        </Box>

        <Button
          onClick={() => handleSubmit()}
          variant="contained"
          type="submit"
        >
          Uložiť časy{" "}
        </Button>

        <Snackbar
          open={snackbarOpen.state}
          autoHideDuration={6000}
          onClose={handleClose}
        >
          <MuiAlert
            onClose={handleClose}
            severity="error"
            sx={{ width: "100%" }}
          >
            {snackbarOpen.message}
          </MuiAlert>
        </Snackbar>
      </Box>
      <Box className="logutButton">
        <Button variant="contained" onClick={handleLogout}>
          Logout
        </Button>
      </Box>
    </Box>
  ) : (
    <Nonauth />
  );
}

export default Dashboard;
