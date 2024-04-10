import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import React from "react";

function DateTimeField({ elem }) {
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateTimePicker
          defaultValue={dayjs(elem.date) || null}
          label="Date picker"
          // value={dayjs(elem.date) || null}
          // onChange={handleChange}
          // renderInput={(params) => <TextField {...params} />}
          required={elem.requiredfield}
          disabled={!elem.editable || elem.disabled}
          openTo="year"
          format={
            elem.datepattern.trim() === ""
              ? "DD-MM-YYYY HH:mm:ss"
              : elem.datepattern
                  .split(" ")[0]
                  .toUpperCase()
                  .replaceAll("/", "-")
                  .concat(" HH:mm:ss")
          }
        />
      </LocalizationProvider>
    </>
  );
}

export default DateTimeField;
