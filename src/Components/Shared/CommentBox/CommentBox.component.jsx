import { TextField } from "@mui/material";
import React from "react";

function CommentBox({ label, value, onCommentChange, required }) {
  return (
    <>
      <TextField
        fullWidth
        label={label}
        multiline
        rows={4} // Adjust the number of rows as needed
        defaultValue={value ? value : ""}
        // value={elem.value ? elem.value : ""}
        onChange={onCommentChange}
        // onBlur={() => onCellValueChange(col)}
        required={required}
      />
    </>
  );
}

export default CommentBox;
