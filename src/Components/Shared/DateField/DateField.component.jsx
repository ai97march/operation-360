import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import React from "react";

function DateField({ elem, onDateChange }) {
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="Date picker"
          defaultValue={dayjs(elem.date)}
          // value={dayjs(elem.date) || null}
          onChange={onDateChange}
          // renderInput={(params) => (
          //   <TextField {...params} required={elem.requiredfield} />
          // )}
          disabled={!elem.editable || elem.disabled}
          format={
            elem.datepattern.trim() === ""
              ? "DD-MM-YYYY"
              : elem.datepattern.replaceAll("/", "-").toUpperCase()
          }
          openTo="day"
        />
      </LocalizationProvider>
      {/* // <Calendar
  //   value={elem.date}
  //   onChange={(e) =>
  //     onDateChange(e, elem, gridDataTest, setGridDataTest)
  //   }
  //   showIcon
  // /> */}
    </>
  );
}

export default DateField;
