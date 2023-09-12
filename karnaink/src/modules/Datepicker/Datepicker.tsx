import React, { useState, useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { Box, Typography } from "@mui/material";
import dayjs from "dayjs";
import "dayjs/locale/sk";
import "dayjs/locale/en";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { loadTimes } from "../../utils/api";
const locales = ["sk", "en"];

type LocaleKey = (typeof locales)[number];

interface DatepickerProps {
  isDashboard?: boolean;
  onAccept?: (date: dayjs.Dayjs) => void;
}

function Datepicker(props: DatepickerProps) {
  const [enabledDatetimes, setEnabledDatetimes] = useState<string[]>([]);
  const [locale, setLocale] = useState<LocaleKey>("sk");
  const [loading, setLoading] = useState(true);
  const [date, setDate] = useState<dayjs.Dayjs | null>(dayjs().add(1, "day"));

  useEffect(() => {
    let tmpArray = [];
    setLoading(true);
    loadTimes().then((res) => {
      res.forEach((datetime) => {
        if (datetime.isAvailable) tmpArray.push(datetime.value);
      });
      // set to first available time if not in dashboard

      if (!props.isDashboard && tmpArray.length > 0) {
        setDate(dayjs(tmpArray[0], "DD.MM.YYYY HH:00"));
        props?.onAccept(dayjs(tmpArray[0], "DD.MM.YYYY HH:00"));
      }
      setLoading(false);
    });
    setEnabledDatetimes(tmpArray);
  }, []);

  //disable date if not in enabledDatetimes
  const disableDates = (date: dayjs.Dayjs) => {
    if (props.isDashboard) {
      return false;
    }
    const formattedDate = date.format("DD.MM.YYYY");
    const enabledDates = enabledDatetimes.map(
      (datetime) => datetime.split(" ")[0]
    );
    return !enabledDates.includes(formattedDate);
  };

  //disable time if not in enabledDatetimes
  const disableTime = (date: dayjs.Dayjs) => {
    if (props.isDashboard) {
      return false;
    }
    const formattedTime = date.format("DD.MM.YYYY HH:00");
    if (enabledDatetimes.includes(formattedTime)) {
      return false;
    }

    return true;
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={locale}>
      {loading ? (
        <CircularProgress color="inherit" sx={{ margin: "auto" }} />
      ) : (
        <Box>
          <DateTimePicker
            value={date}
            disablePast
            skipDisabled
            onAccept={(d) => {
              props?.onAccept(d);
              setDate(d);
            }}
            onChange={(d) => {
              props?.onAccept(d);
              setDate(d);
            }}
            label="Termín tetovania"
            ampm={false}
            minutesStep={60}
            disabled={
              (enabledDatetimes.length === 0 ||
                enabledDatetimes === undefined) &&
              !props.isDashboard
            }
            shouldDisableTime={disableTime}
            shouldDisableDate={disableDates}
            defaultValue={dayjs().add(1, "day")}
          />
          {(enabledDatetimes.length === 0 || enabledDatetimes === undefined) &&
          !props.isDashboard ? (
            <Box>
              <Typography color="red">
                {" "}
                Momentálne niesu volné žiadné termíny
              </Typography>
            </Box>
          ) : null}
        </Box>
      )}
    </LocalizationProvider>
  );
}

export default Datepicker;
