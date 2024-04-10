import { LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import React from "react";

function TimeField({ elem }) {
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <TimePicker
          defaultValue={dayjs(elem.date) || null}
          // value={dayjs(elem.date) || null}
          // onChange={handleChange}
          // renderInput={(params) => <TextField {...params} />}
          required={elem.requiredfield}
          disabled={!elem.editable || elem.disabled}
          openTo="hours"
          format="HH:mm"
        />
      </LocalizationProvider>
    </>
  );
}

export default TimeField;
