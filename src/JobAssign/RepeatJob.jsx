import { Checkbox, Grid, TextField, Typography } from "@mui/material";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import React, { useState } from "react";

const RepeatJob = () => {
  const [date, setDate] = useState(dayjs("2024-04-17T15:30"));
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography sx={{ mt: 2, mb: 1 }}>Repeat?</Typography>
        <Checkbox
          title="Repeat?"
          // checked={elem.tickVal || false}
          // onChange={(e) =>
          //   onBooleanChange(e, elem, gridDataTest, setGridDataTest)
          // }
          // required={elem.requiredfield}
          // disabled={!elem.editable || elem.disabled}
        />
      </Grid>

      <Grid item xs={12}>
        <Typography>Repeat Interval</Typography>
      </Grid>

      <Grid item xs={4}>
        <TextField
          fullWidth
          label="Day"
          type="number" // Use type "text" to allow input of numbers and decimals
          defaultValue="0"
          // value={elem.numVal ? elem.numVal : ""}
          // onChange={handleInputChange}
          // onBlur={() => onCellValueChange(col)}
          required={true}
          InputProps={{
            inputProps: {
              max: "9999999999999",
              min: "0",
            },
          }}
        />
      </Grid>

      <Grid item xs={4}>
        <TextField
          fullWidth
          label="Hour"
          type="number" // Use type "text" to allow input of numbers and decimals
          defaultValue="0"
          // value={elem.numVal ? elem.numVal : ""}
          // onChange={handleInputChange}
          // onBlur={() => onCellValueChange(col)}
          required={true}
          InputProps={{
            inputProps: {
              max: "9999999999",
              min: "0",
            },
          }}
        />
      </Grid>

      <Grid item xs={4}>
        <TextField
          fullWidth
          label="Minutes"
          type="number" // Use type "text" to allow input of numbers and decimals
          defaultValue="0"
          // value={elem.numVal ? elem.numVal : ""}
          // onChange={handleInputChange}
          // onBlur={() => onCellValueChange(col)}
          required={true}
          InputProps={{
            inputProps: {
              max: "9999999999",
              min: "0",
            },
          }}
        />
      </Grid>

      <Grid item xs={12}>
        <Typography>Repeat Till</Typography>
      </Grid>

      <Grid item xs={12}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateTimePicker
            //   defaultValue={dayjs(elem.date) || null}
            label="From Date"
            value={date}
            onChange={(newValue) => setDate(newValue)}
            // renderInput={(params) => <TextField {...params} />}
            //   disabled={!elem.editable || elem.disabled}
            openTo="year"
            format="DD-MM-YYYY HH:mm:ss"
            sx={{ width: "100%" }}
          />
        </LocalizationProvider>
      </Grid>
    </Grid>
  );
};

export default RepeatJob;
