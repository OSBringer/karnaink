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
import { loadTimes, deleteTime, deletePastTimes } from "../../utils/api";
import CircularProgress from "@mui/material/CircularProgress";
import DashboardDialog from "./DashboardDialog";
function Dashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dialogState, setDialogState] = useState({
    open: false,
    state: false,
    timeObject: null,
  }); // Add this line
  const [timesArray, setTimesArray] = useState([]);
  const [displayedTimesArray, setDisplayedTimesArray] = useState([]); // Add this line
  const [dateTime, setDateTime] = useState(dayjs().add(1, "day"));
  const [search, setSearch] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [snackbarState, setSnackbarState] = useState({
    state: false,
    severity: "error",
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

    setSnackbarState({ state: false, severity: "error", message: "" });
  };

  const handleSubmit = () => {
    setLoading(true);
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
        const updatedArray = displayedTimesArray.map((item) => ({
          ...item,
          isNew: false,
        }));
        setTimesArray(updatedArray);
        setSnackbarState({
          state: true,
          severity: "success",
          message: "Časy boli úspešne uložené! 🎉",
        });
        setLoading(false);
      })
      .catch((err) => {
        console.warn(err);
        setLoading(false);
      });
  };

  const handleDelte = (timeObject) => {
    setDialogState({ open: true, state: false, timeObject: timeObject });
  };

  const handleDeletePastTimes = () => {
    setLoading(true);
    deletePastTimes()
      .then((res) => {
        setRefresh(!refresh);
        setSnackbarState({
          state: true,
          severity: "success",
          message: "Časy boli úspešne zmazané! ✅",
        });
      })
      .catch((err) => {
        setRefresh(!refresh);
        setSnackbarState({
          state: true,
          severity: "error",
          message: "Časy sa nepodarilo zmazať! 😢",
        });
        console.warn(err);
      });
  };

  const performAuthCheck = async () => {
    const isAuth = await checkAuthToken();
    setIsAuthenticated(isAuth);
  };

  const addTime = () => {
    const formattedDateTime = dateTime.format("DD.MM.YYYY HH:00");
    if (timesArray.some((obj) => obj.value === formattedDateTime)) {
      setSnackbarState({
        state: true,
        severity: "error",
        message: `${formattedDateTime} už bol pridaný! 💀`,
      });
      return;
    } else if (dateTime.isBefore(dayjs())) {
      setSnackbarState({
        state: true,
        severity: "error",
        message: `Nieje možné pridať čas z minulosti! 👴`,
      });
      return;
    } else if (dateTime.isAfter(dayjs().add(10, "year"))) {
      setSnackbarState({
        state: true,
        severity: "error",
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
          console.warn(err);
        });
    });
  }, [refresh]);

  // searchbar
  useEffect(() => {
    if (dialogState.state === true) {
      setTimesArray(
        timesArray.filter(
          (time, index) => time.value !== dialogState.timeObject.value
        )
      );
      dialogState.timeObject.isNew ? null : deleteTime(dialogState.timeObject);
    }
  }, [dialogState]);

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
            sx={{ minHeight: "60px", width: "100%" }}
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
                sx={{
                  ...(timeDisplayed.isNew && {
                    bgcolor: theme.palette.attention.light,
                  }),
                  ...(!timeDisplayed.isAvailable && {
                    bgcolor: theme.palette.success.light,
                  }),
                }}
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

        <Button
          sx={{
            marginTop: "20px",
          }}
          variant="contained"
          onClick={handleDeletePastTimes}
        >
          Zmazať časy z minulosti
        </Button>

        <Snackbar
          open={snackbarState.state}
          autoHideDuration={6000}
          onClose={handleClose}
        >
          <MuiAlert
            onClose={handleClose}
            severity={snackbarState.severity}
            sx={{ width: "100%" }}
          >
            {snackbarState.message}
          </MuiAlert>
        </Snackbar>
      </Box>
      <Box className="logutButton">
        <Button variant="contained" onClick={handleLogout}>
          Logout
        </Button>
      </Box>
      <DashboardDialog state={dialogState} setState={setDialogState} />
    </Box>
  ) : (
    <Nonauth />
  );
}

export default Dashboard;
