import { TextField } from "@mui/material";
import React from "react";

function NumberBox({ label, value, disabled, required, max, min }) {
  return (
    <>
      <TextField
        fullWidth
        label={label}
        type="number" // Use type "text" to allow input of numbers and decimals
        defaultValue={value}
        // value={elem.numVal ? elem.numVal : ""}
        // onChange={handleInputChange}
        // onBlur={() => onCellValueChange(col)}
        disabled={disabled}
        required={required}
        InputProps={{
          inputProps: {
            max: max,
            min: min,
          },
        }}
      />
    </>
  );
}

export default NumberBox;
