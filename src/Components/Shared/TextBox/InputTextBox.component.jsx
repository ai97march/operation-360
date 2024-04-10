import { TextField } from "@mui/material";
import React from "react";

function InputTextBox({ label, value, disabled, required }) {
  return (
    <>
      <TextField
        fullWidth
        label={label}
        // value={elem.value ? elem.value : ""}
        defaultValue={value ? value : ""}
        // onChange={(e) => onTextValueChange(e, elem)}
        // onBlur={() => onCellValueChange(col)}
        type="text"
        disabled={disabled}
        required={required}
      />
    </>
  );
}

export default InputTextBox;
