import * as React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";

interface Props {
  date: Dayjs | null;
  setDate: (value: Dayjs | null) => void;
}

export default function BasicDatePicker({ date, setDate }: Props) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label="Date"
        disablePast
        format="DD/MM/YYYY"
        defaultValue={date}
        onChange={(value) => setDate(value)}
      />
    </LocalizationProvider>
  );
}
