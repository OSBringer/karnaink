import React, { useState, useEffect } from "react";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
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
  const [date, setDate] = useState<dayjs.Dayjs | null>(dayjs().add(1, "day"));

  useEffect(() => {
    let tmpArray = [];
    loadTimes().then((res) => {
      res.forEach((datetime) => {
        if (datetime.isAvailable) tmpArray.push(datetime.value);
      });

      setDate(dayjs(tmpArray[0], "DD.MM.YYYY HH:00"));
      props?.onAccept(dayjs(tmpArray[0], "DD.MM.YYYY HH:00"));
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
        shouldDisableTime={disableTime}
        shouldDisableDate={disableDates}
        defaultValue={dayjs().add(1, "day")}
      />
    </LocalizationProvider>
  );
}

export default Datepicker;
