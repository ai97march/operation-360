import {
  Alert,
  Checkbox,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Snackbar,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  styled,
  tableCellClasses,
} from "@mui/material";
import React, { useState } from "react";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const handleSnackBarClose = (event, reason, setOpenSnack) => {
  if (reason === "clickaway") {
    return;
  }

  setOpenSnack(false);
};

const ActivityDetails = ({ selectedOption = "Department" }) => {
  const [openSnack, setOpenSnack] = useState(false);
  const [copytoallperformer, setCopytoallperformer] = useState(false);
  const [performer, setPerformer] = useState("");
  const [performerList, setPerformerList] = useState(["a", "b", "c"]);
  const [asset, setAsset] = useState("");
  const [assetList, setAssetList] = useState(["a", "b", "c"]);
  const [approver, setApprover] = useState("");
  const [approverList, setApproverList] = useState(["a", "b", "c"]);
  const [checked, setChecked] = useState(true);

  return (
    <>
      <Snackbar
        open={openSnack}
        // autoHideDuration={6000}
        onClose={(event, reason) =>
          handleSnackBarClose(event, reason, setOpenSnack)
        }
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={(event, reason) =>
            handleSnackBarClose(event, reason, setOpenSnack)
          }
          severity="warning"
          variant="filled"
          sx={{ width: "100%", alignItems: "center" }}
        >
          <Typography variant="h6">Invalid Date Selection</Typography>
          <Typography variant="body1">
            Job can't be assigned in past.
          </Typography>
        </Alert>
      </Snackbar>
      <Typography sx={{ mt: 2, mb: 1 }}>
        Copy to All Performer
        <Checkbox
          checked={copytoallperformer}
          onChange={(event) => {
            event.target.checked === true
              ? setOpenSnack(true)
              : setOpenSnack(false);
            setCopytoallperformer(event.target.checked);
          }}
          inputProps={{ "aria-label": "controlled" }}
        />
      </Typography>
      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">Sequence</StyledTableCell>
              <StyledTableCell align="center">Name</StyledTableCell>
              <StyledTableCell align="center">User Available?</StyledTableCell>
              <StyledTableCell align="center">Performer</StyledTableCell>
              <StyledTableCell align="center">Apporover</StyledTableCell>
              {selectedOption === "UserGroup" ? (
                <StyledTableCell align="center">User Group</StyledTableCell>
              ) : null}
              {selectedOption === "Department" ? (
                <StyledTableCell align="center">Department</StyledTableCell>
              ) : null}
              <StyledTableCell align="center">Asset Available?</StyledTableCell>
              <StyledTableCell align="center">Asset</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* {cellChanges.map((row) => ( */}
            <StyledTableRow
              key="1"
              //   {row.cellId}
            >
              <StyledTableCell align="center" component="th" scope="row">
                1
              </StyledTableCell>
              <StyledTableCell align="center">act 1</StyledTableCell>
              <StyledTableCell align="center">User Available?</StyledTableCell>
              <StyledTableCell align="center">
                <FormControl required fullWidth>
                  <InputLabel id="demo-simple-select-required-label">
                    Select Performer
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-required-label"
                    id="demo-simple-select-required"
                    label="Select performer"
                    value={performer}
                    onChange={(event) => setPerformer(event.target.value)}
                    title="Select performer"
                    //   disabled={elem.disabled}
                    required={true}
                    fullWidth
                  >
                    {performerList.map((itm, index) => (
                      <MenuItem key={index} value={itm}>
                        {itm}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </StyledTableCell>
              <StyledTableCell align="center">
                <FormControl required fullWidth>
                  <InputLabel id="demo-simple-select-required-label">
                    Select Approver
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-required-label"
                    id="demo-simple-select-required"
                    label="Select Approver"
                    value={approver}
                    onChange={(event) => setApprover(event.target.value)}
                    title="Select Approver"
                    //   disabled={elem.disabled}
                    required={true}
                    fullWidth
                  >
                    {approverList.map((itm, index) => (
                      <MenuItem key={index} value={itm}>
                        {itm}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </StyledTableCell>
              {selectedOption === "UserGroup" ? (
                <StyledTableCell align="center">
                  <Switch
                    checked={checked}
                    onChange={(event) => setChecked(event.target.checked)}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                </StyledTableCell>
              ) : null}
              {selectedOption === "Department" ? (
                <StyledTableCell align="center">
                  <Switch
                    checked={checked}
                    onChange={(event) => setChecked(event.target.checked)}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                </StyledTableCell>
              ) : null}
              <StyledTableCell align="center">Asset Available?</StyledTableCell>
              <StyledTableCell align="center">
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-required-label">
                    Select Asset
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-required-label"
                    id="demo-simple-select-required"
                    label="Select Asset"
                    value={asset}
                    onChange={(event) => setAsset(event.target.value)}
                    title="Select Asset"
                    //   disabled={elem.disabled}
                    fullWidth
                  >
                    {assetList.map((itm, index) => (
                      <MenuItem key={index} value={itm}>
                        {itm}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </StyledTableCell>
            </StyledTableRow>
            {/* ))} */}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default ActivityDetails;
