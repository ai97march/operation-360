import React, { useEffect, useState } from "react";
import {
  Button,
  Checkbox,
  Container,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { getAssetGroupsList } from "../Logbook Asset/LogbookAssetApi";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

// assetGroup,
// assetGroupList,
// selectedOption,
// task,
// taskList,
// name,
// approver,
// approverList,
// weekdays,
// fromdate,
// todate,
// priority,
// priorityList,
// tag

const handleSelectedOption = (event, setSelectedOption) => {
  setSelectedOption(event.target.value);
  if (event.target.value === "Individuals") {
  }
};

const JobDetailForModal = ({
  assetGroup,
  assetGroupList,
  selectedOption,
  task,
  taskList,
  name,
  approver,
  approverList,
  weekdays,
  fromdate,
  todate,
  priority,
  priorityList,
  tag,
  setAssetGroup,
  setAssetGroupList,
  setSelectedOption,
  setTask,
  setTaskList,
  setName,
  setApprover,
  setApproverList,
  setWeekdays,
  setFromdate,
  setTodate,
  setPriority,
  setPriorityList,
  setTag,
}) => {
  // const [assetGroup, setAssetGroup] = useState("");
  // // const [assetGroupList, setAssetGroupList] = useState(["a", "b", "c"]);
  // const [assetGroupList, setAssetGroupList] = useState([]);
  // const [selectedOption, setSelectedOption] = useState("");
  // const [task, setTask] = useState("");
  // const [taskList, setTaskList] = useState(["a", "b", "c"]);
  // const [name, setName] = useState("");
  // const [approver, setApprover] = useState("");
  // const [approverList, setApproverList] = useState(["a", "b", "c"]);
  // const [weekdays, setWeekdays] = useState("6");
  // const [fromdate, setFromdate] = useState(dayjs("2024-04-17T15:30"));
  // const [todate, setTodate] = useState(dayjs("2024-04-19T15:30"));
  // const [priority, setPriority] = useState("");
  // const [priorityList, setPriorityList] = useState([
  //   "Critical",
  //   "Normal",
  //   "Low",
  // ]);
  // const [tag, setTag] = useState("");

  const handleReset = () => {
    setAssetGroup("");
    setAssetGroupList(["a", "b", "c"]);
    setSelectedOption("");
    setTask("");
    setTaskList(["a", "b", "c"]);
    setName("");
    setApprover("");
    setApproverList(["a", "b", "c"]);
    setWeekdays("6");
    setFromdate(dayjs("2024-04-17T15:30"));
    setTodate(dayjs("2024-04-19T15:30"));
    setPriority("");
    setPriorityList("");
    setTag("");
  };

  useEffect(() => {
    async function fetchData() {
      let assetGroupData = await getAssetGroupsList();
      assetGroupData = assetGroupData.map((item, index) => {
        return item.groupName;
      });
      setAssetGroupList(assetGroupData);
    }
    fetchData();
  }, []);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography>Your details</Typography>
      </Grid>

      <Grid item xs={12}>
        <FormControl required fullWidth>
          <InputLabel id="demo-simple-select-required-label">
            Asset Group
          </InputLabel>
          <Select
            labelId="demo-simple-select-required-label"
            id="demo-simple-select-required"
            label="Asset Group"
            value={assetGroup}
            onChange={(event) => setAssetGroup(event.target.value)}
            title="Asset Group"
            //   disabled={elem.disabled}
            required={true}
            // error={true}
          >
            {assetGroupList.map((itm, index) => (
              <MenuItem key={index} value={itm}>
                {itm}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={12}>
        <FormControl required disabled={assetGroup === ""}>
          <FormLabel id="demo-controlled-radio-buttons-group">
            Assign By
          </FormLabel>
          <RadioGroup
            row
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
            value={selectedOption}
            onChange={(event) => handleSelectedOption(event, setSelectedOption)}
          >
            <FormControlLabel
              value="UserGroup"
              control={<Radio />}
              label="User Group"
            />
            <FormControlLabel
              value="Department"
              control={<Radio />}
              label="Department"
            />
            <FormControlLabel
              value="Individuals"
              control={<Radio />}
              label="Individuals"
            />
          </RadioGroup>
        </FormControl>
      </Grid>

      <Grid item xs={12}>
        <FormControl required fullWidth>
          <InputLabel id="demo-simple-select-required-label">Task</InputLabel>
          <Select
            labelId="demo-simple-select-required-label"
            id="demo-simple-select-required"
            label="Task"
            value={task}
            onChange={(event) => setTask(event.target.value)}
            title="Task"
            //   disabled={elem.disabled}
            required={true}
          >
            {taskList.map((itm, index) => (
              <MenuItem key={index} value={itm}>
                {itm}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          // onBlur={() => onCellValueChange(col)}
          required={true}
        />
      </Grid>

      <Grid item xs={12}>
        <FormControl required fullWidth>
          <InputLabel id="demo-simple-select-required-label">
            Approver
          </InputLabel>
          <Select
            labelId="demo-simple-select-required-label"
            id="demo-simple-select-required"
            label="Approver"
            value={approver}
            onChange={(event) => setApprover(event.target.value)}
            title="Approver"
            //   disabled={elem.disabled}
            required={true}
          >
            {approverList.map((itm, index) => (
              <MenuItem key={index} value={itm}>
                {itm}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={12}>
        <FormControl>
          <FormLabel id="demo-controlled-radio-buttons-group">
            Weekdays
          </FormLabel>
          <RadioGroup
            row
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
            value={weekdays}
            onChange={(event) => setWeekdays(event.target.value)}
          >
            <FormControlLabel
              value="5"
              control={<Radio />}
              label="Exclude Sat-Sun"
            />
            <FormControlLabel
              value="6"
              control={<Radio />}
              label="Exclude Sunday"
            />
            <FormControlLabel value="7" control={<Radio />} label="All" />
          </RadioGroup>
        </FormControl>
      </Grid>

      <Grid item xs={6}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateTimePicker
            //   defaultValue={dayjs(elem.date) || null}
            label="From Date"
            value={fromdate}
            onChange={(newValue) => setFromdate(newValue)}
            // renderInput={(params) => <TextField {...params} />}
            //   disabled={!elem.editable || elem.disabled}
            openTo="year"
            format="DD-MM-YYYY HH:mm:ss"
            sx={{ width: "100%" }}
          />
        </LocalizationProvider>
      </Grid>

      <Grid item xs={6}>
        <>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
              //   defaultValue={dayjs(elem.date) || null}
              label="To Date"
              value={todate}
              onChange={(newValue) => setTodate(newValue)}
              // renderInput={(params) => <TextField {...params} />}
              //   disabled={!elem.editable || elem.disabled}
              openTo="year"
              format="DD-MM-YYYY HH:mm:ss"
              sx={{ width: "100%" }}
            />
          </LocalizationProvider>
        </>
      </Grid>

      <Grid item xs={12}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-required-label">
            Priority
          </InputLabel>
          <Select
            labelId="demo-simple-select-required-label"
            id="demo-simple-select-required"
            label="Priority"
            // value={priority}
            defaultValue={priority || "Critical"}
            onChange={(event) => setPriority(event.target.value)}
            title="Asset Group"
            //   disabled={elem.disabled}
          >
            {priorityList.map((itm, index) => (
              <MenuItem key={index} value={itm}>
                {itm}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={12}>
        <TextField
          fullWidth
          label="TAG"
          value={tag}
          onChange={(event) => setTag(event.target.value)}
          // onBlur={() => onCellValueChange(col)}
        />
      </Grid>
    </Grid>
  );
};

export default JobDetailForModal;
