import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React from "react";

function Dropdown({ elem, onCellValueChange }) {
  return (
    <>
      {/* <FormControl fullWidth={elem.fullWidth}>
        <InputLabel>Select One</InputLabel>
        <Select
          value={elem.value || ""} // Make sure to handle null values appropriately
          label="Select One"
          onChange={onCellValueChange}
          title={elem.aliasId}
          disabled={elem.disabled}
          required={elem.requiredfield}
          autoWidth={elem.autoWidth}
          displayEmpty={elem.displayEmpty}
          // onClick={() => test(elem, setGridDataTest)}
        >
          <MenuItem value="" disabled>
            Select One
          </MenuItem>
          {elem.drpItems.map((itm) => (
            <MenuItem key={itm.itemValue} value={itm.itemValue}>
              {itm.itemLabel}
            </MenuItem>
          ))}
        </Select>
      </FormControl> */}
      <Select
        value={elem.value || ""}
        onChange={onCellValueChange}
        title={elem.aliasId}
        disabled={elem.disabled}
        required={elem.requiredfield}
        autoWidth={elem.autoWidth}
        displayEmpty={elem.displayEmpty}
      >
        {elem.show && (
          <MenuItem value="" disabled>
            {elem.labelStr}
          </MenuItem>
        )}
        {elem.drpItems.map((itm, index) => (
          <MenuItem key={index} value={itm.itemValue}>
            {itm.itemLabel}
          </MenuItem>
        ))}
      </Select>
    </>
  );
}

export default Dropdown;
