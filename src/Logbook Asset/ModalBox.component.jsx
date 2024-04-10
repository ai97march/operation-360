import {
  Box,
  Button,
  Checkbox,
  Chip,
  FormControl,
  FormControlLabel,
  IconButton,
  InputLabel,
  ListItemText,
  MenuItem,
  Modal,
  OutlinedInput,
  Select,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React, { useEffect, useState } from "react";
import { getAllDepartments } from "./LogbookAssetApi";
import { getAllFormInfo } from "../Logbook/LogbookApi";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  // width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "10px",
};

const handleModalOpen = (setOpen) => {
  setOpen(true);
};

const handleModalClose = (e, reason, setOpen) => {
  if (reason !== "backdropClick") {
    setOpen(false);
  }
};

const onAtuogenIdChange = (e, setAutogenId, setAssetId) => {
  const id = `A${new Date()
    .toISOString()
    .replace(/[-:T.Z]/g, "")
    .slice(0, 19)}`;

  if (e.target.checked) {
    setAssetId(id);
  } else {
    setAssetId("");
  }
  setAutogenId(e.target.checked);
};

const handleDepartmentFilter = async (
  e,
  setDepartmentChecked,
  setGroupChecked,
  setDepartmentList
) => {
  setDepartmentChecked(e.target.checked);
  setGroupChecked(false);
  let getAllDepartment = await getAllDepartments();
  setDepartmentList(getAllDepartment);
};

const handleGroupFilter = (e, setDepartmentChecked, setGroupChecked) => {
  setGroupChecked(e.target.checked);
  setDepartmentChecked(false);
};

const handleLogBook = (event, setLogbook) => {
  const {
    target: { value },
  } = event;
  setLogbook(
    // On autofill we get a stringified value.
    typeof value === "string" ? value.split(",") : value
  );
};

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(itm, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(itm) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const findAndAddChildNode = (node, targetNodeId, childNode) => {
  if (node.id === targetNodeId) {
    node.children.push(childNode);
  } else if (Array.isArray(node.children)) {
    node.children.forEach((child) =>
      findAndAddChildNode(child, targetNodeId, childNode)
    );
  }
};

const handleChildNodeAdd = (
  //   childNodeName,
  selectedNode,
  setData,
  model,
  setModel,
  //   setChildNodeName,
  handleModalClose,
  setOpen,
  setAssetId,
  assetId,
  assetName,
  category,
  icon,
  users,
  logbook,
  location,
  manufacturer,
  serialno,
  description,
  unit,
  capacity,
  setAutogenId,
  setAssetName,
  setCategory,
  setIcon,
  setLogbook,
  setLocation,
  setManufacturer,
  setSerialNo,
  setDescription,
  setUnit,
  setCapacity,
  setDepartmentChecked,
  setGroupChecked,
  setUsers,
  setDepartmentList
) => {
  if (assetId.trim() !== "" && selectedNode) {
    // console.log("ChildNode", childNodeName, selectedNode);
    const newChildNode = {
      id: assetId,
      label: assetId + " (" + assetName + ")",
      node_level: selectedNode.node_level + 1, // Calculate child nodeLevel
      assetName: assetName,
      category: category,
      icon: icon,
      users: users,
      logbook: logbook,
      location: location,
      manufacturer: manufacturer,
      model: model,
      serialno: serialno,
      description: description,
      unit: unit,
      capacity: capacity,
      children: [],

      // checked: false,
      // image: null,
      // assetGroup: null,
      // posX: null,
      // posY: null,
    };

    // let dataLocal;
    setData((prevData) => {
      const updatedData = JSON.parse(JSON.stringify(prevData));
      findAndAddChildNode(updatedData, selectedNode.id, newChildNode);
      // dataLocal = updatedData;
      return updatedData;
    });

    // Clear input fields after adding a child node
    // setChildNodeName("");
    setAssetId("");
    setModel("");
    // setgroupNameState] = useState(false);
    // setGroupRootNodeName] = useState("");
    // setSelectedNode] = useState(null);
    // setRootNodeName] = useState("");
    setAutogenId(false);
    setAssetName("");
    setCategory("");
    setIcon("");
    setLogbook([]);
    setLocation("");
    setManufacturer("");
    setSerialNo("");
    setDescription("");
    setUnit("");
    setCapacity("");
    setDepartmentChecked(false);
    setGroupChecked(false);
    setUsers("");
    setDepartmentList([]);
    // console.log("dataLocal ", JSON.stringify(dataLocal));
    // handlePostData(dataLocal);
    setOpen(false);
  }
};

const ModalBox = ({ open, setOpen, setData, selectedNode }) => {
  const theme = useTheme();
  // const [groupNameState, setgroupNameState] = useState(false);
  // const [groupRootNodeName, setGroupRootNodeName] = useState("");
  // const [data, setData] = useState(null);
  // const [selectedNode, setSelectedNode] = useState(null);
  // const [rootNodeName, setRootNodeName] = useState("");
  // const [childNodeName, setChildNodeName] = useState("");
  const [model, setModel] = useState("");
  const [assetId, setAssetId] = useState("");
  const [autogenId, setAutogenId] = useState(false);
  const [assetName, setAssetName] = useState("");
  const [category, setCategory] = useState("");
  const [icon, setIcon] = useState("");
  const [logbook, setLogbook] = useState([]);
  const [location, setLocation] = useState("");
  const [manufacturer, setManufacturer] = useState("");
  const [serialno, setSerialNo] = useState("");
  const [description, setDescription] = useState("");
  const [unit, setUnit] = useState("");
  const [capacity, setCapacity] = useState("");
  const [departmentChecked, setDepartmentChecked] = useState(false);
  const [groupChecked, setGroupChecked] = useState(false);
  const [users, setUsers] = useState("");
  const [departmentList, setDepartmentList] = useState([]);
  const [logbookList, setLogbookList] = useState([]);

  useEffect(() => {
    async function fetchLogBookList() {
      let data = await getAllFormInfo();
      const set = new Set();
      data.forEach((form) => {
        set.add(form.formName);
      });
      setLogbookList([...set]);
    }
    fetchLogBookList();
  }, []);

  return (
    <Modal
      open={open}
      onClose={(e, reason) => handleModalClose(e, reason, setOpen)}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      disableEscapeKeyDown
      disableScrollLock
    >
      <Box sx={style}>
        <Box
          sx={{
            //   display: "flex",
            //   justifyContent: "space-between",
            maxHeight: "500px",
            width: "800px",
            overflow: "auto",
            p: 2,
          }}
        >
          <IconButton
            aria-label="close"
            onClick={() => setOpen(false)}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
          <Box>
            <Box sx={{ display: "flex", marginY: 2 }}>
              <Typography
                variant="h6"
                component="h4"
                minWidth="200px"
                alignSelf="center"
                //   align="center"
              >
                Asset Id
              </Typography>
              <Box width="100%">
                <TextField
                  required
                  className="textInput"
                  label="Asset Id"
                  variant="outlined"
                  fullWidth
                  value={assetId}
                  onChange={(e) => setAssetId(e.target.value)}
                />
                <Checkbox
                  title={"Auto Generated Id"}
                  checked={autogenId}
                  onChange={(e) =>
                    onAtuogenIdChange(e, setAutogenId, setAssetId)
                  }
                />
              </Box>
            </Box>
            <Box sx={{ display: "flex", marginY: 2 }}>
              <Typography
                variant="h6"
                component="h4"
                minWidth="200px"
                alignSelf="center"
              >
                Asset Name
              </Typography>
              <TextField
                label="Asset Name"
                variant="outlined"
                fullWidth
                value={assetName}
                onChange={(e) => setAssetName(e.target.value)}
              />
            </Box>
            <Box sx={{ display: "flex", marginY: 2 }}>
              <Typography
                variant="h6"
                component="h4"
                minWidth="200px"
                alignSelf="center"
              >
                Category
              </Typography>
              <TextField
                label="Category"
                variant="outlined"
                fullWidth
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </Box>
            <Box sx={{ display: "flex", marginY: 2 }}>
              <Typography
                variant="h6"
                component="h4"
                minWidth="200px"
                alignSelf="center"
              >
                Icon
              </Typography>
              <FormControl fullWidth>
                <InputLabel id="select-icon">Select icon</InputLabel>
                <Select
                  labelId="select-icon"
                  value={icon}
                  onChange={(e) => setIcon(e.target.value)}
                  label="Select icon"
                  // disabled={elem.disabled}
                  // required={elem.requiredfield}
                  // displayEmpty={elem.displayEmpty}
                >
                  <MenuItem value="" disabled>
                    Test
                  </MenuItem>
                  {/* {elem.drpItems.map((itm, index) => (
          <MenuItem key={index} value={itm.itemValue}>
            {itm.itemLabel}
          </MenuItem>
        ))} */}
                </Select>
              </FormControl>
            </Box>
            <Box sx={{ display: "flex", marginY: 2 }}>
              <Typography
                variant="h6"
                component="h4"
                minWidth="200px"
                alignSelf="center"
              >
                Filter By
              </Typography>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={departmentChecked}
                    onChange={(e) =>
                      handleDepartmentFilter(
                        e,
                        setDepartmentChecked,
                        setGroupChecked,
                        setDepartmentList
                      )
                    }
                  />
                }
                label="Department"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={groupChecked}
                    onChange={(e) =>
                      handleGroupFilter(
                        e,
                        setDepartmentChecked,
                        setGroupChecked
                      )
                    }
                  />
                }
                label="Groups"
              />
            </Box>
            <Box sx={{ display: "flex", marginY: 2 }}>
              <Typography
                variant="h6"
                component="h4"
                minWidth="200px"
                alignSelf="center"
              >
                Select Users
              </Typography>
              <FormControl fullWidth>
                <InputLabel id="select-users">Select Users</InputLabel>
                <Select
                  labelId="select-users"
                  label="Select Users"
                  value={users}
                  onChange={(e) => setUsers(e.target.value)}
                >
                  <MenuItem value="" disabled>
                    Select
                  </MenuItem>
                  {departmentList.map((itm, index) => (
                    <MenuItem key={index} value={itm}>
                      {itm}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            <Box sx={{ display: "flex", marginY: 2 }}>
              <Typography
                variant="h6"
                component="h4"
                minWidth="200px"
                alignSelf="center"
              >
                Select Logbook
              </Typography>
              <FormControl fullWidth>
                <InputLabel id="select-logbook">Select Logbook</InputLabel>
                <Select
                  labelId="select-logbook"
                  label="Select Logbook"
                  multiple
                  value={logbook}
                  onChange={(e) => handleLogBook(e, setLogbook)}
                  input={
                    <OutlinedInput
                      id="select-multiple-chip"
                      label="Select Logbook"
                    />
                  }
                  renderValue={(selected) => (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value} label={value} />
                      ))}
                    </Box>
                  )}
                  MenuProps={MenuProps}
                >
                  {/* <MenuItem value="" disabled>
                      Test
                    </MenuItem> */}
                  {logbookList.map((itm, index) => (
                    <MenuItem
                      key={itm}
                      value={itm}
                      style={getStyles(itm, logbook, theme)}
                    >
                      <Checkbox checked={logbook.indexOf(itm) > -1} />
                      <ListItemText primary={itm} />
                      {/* {itm} */}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            <Box sx={{ display: "flex", marginY: 2 }}>
              <Typography
                variant="h6"
                component="h4"
                minWidth="200px"
                alignSelf="center"
              >
                Location
              </Typography>
              <TextField
                label="Location"
                variant="outlined"
                fullWidth
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </Box>
            <Box sx={{ display: "flex", marginY: 2 }}>
              <Typography
                variant="h6"
                component="h4"
                minWidth="200px"
                alignSelf="center"
              >
                Manufacturer
              </Typography>
              <TextField
                label="Manufacturer"
                variant="outlined"
                fullWidth
                value={manufacturer}
                onChange={(e) => setManufacturer(e.target.value)}
              />
            </Box>
            <Box sx={{ display: "flex", marginY: 2 }}>
              <Typography
                variant="h6"
                component="h4"
                minWidth="200px"
                alignSelf="center"
              >
                Enter Model
              </Typography>
              <TextField
                label="Enter Model"
                variant="outlined"
                fullWidth
                value={model}
                onChange={(e) => setModel(e.target.value)}
              />
            </Box>
            <Box sx={{ display: "flex", marginY: 2 }}>
              <Typography
                variant="h6"
                component="h4"
                minWidth="200px"
                alignSelf="center"
              >
                Serial No
              </Typography>
              <TextField
                label="Serial No"
                variant="outlined"
                fullWidth
                value={serialno}
                onChange={(e) => setSerialNo(e.target.value)}
              />
            </Box>
            <Box sx={{ display: "flex", marginY: 2 }}>
              <Typography
                variant="h6"
                component="h4"
                minWidth="200px"
                alignSelf="center"
              >
                Description
              </Typography>
              <TextField
                label="Description"
                variant="outlined"
                fullWidth
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Box>
            <Box sx={{ display: "flex", marginY: 2 }}>
              <Typography
                variant="h6"
                component="h4"
                minWidth="200px"
                alignSelf="center"
              >
                Unit Of measurement
              </Typography>
              <FormControl fullWidth>
                <InputLabel id="select-unit-of-measurement">
                  Select unit Of measurement
                </InputLabel>
                <Select
                  labelId="select-unit-of-measurement"
                  label="Select unit Of measurement"
                  value={unit}
                  onChange={(e) => setUnit(e.target.value)}
                >
                  <MenuItem key="1" value="Kg">
                    Kg
                  </MenuItem>
                  <MenuItem key="2" value="Litre">
                    Litre
                  </MenuItem>
                  <MenuItem key="3" value="Length">
                    Length
                  </MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box sx={{ display: "flex", marginY: 2 }}>
              <Typography
                variant="h6"
                component="h4"
                minWidth="200px"
                alignSelf="center"
              >
                Capacity
              </Typography>
              <TextField
                label="Capacity"
                variant="outlined"
                fullWidth
                value={capacity}
                onChange={(e) => setCapacity(e.target.value)}
              />
            </Box>
            {/* <Box sx={{ display: "flex", marginY: 2 }}>
                <Typography
                  variant="h6"
                  component="h4"
                  minWidth="200px"
                  alignSelf="center"
                >
                  Enter Child Node
                </Typography>
                <TextField
                  required
                  className="textInput"
                  label="Enter Child Node"
                  variant="outlined"
                  fullWidth
                  value={childNodeName}
                  onChange={(e) => setChildNodeName(e.target.value)}
                />
              </Box> */}
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Button
              className="button"
              variant="contained"
              color="primary"
              onClick={() =>
                handleChildNodeAdd(
                  // childNodeName,
                  selectedNode,
                  setData,
                  model,
                  setModel,
                  // setChildNodeName,
                  handleModalClose,
                  setOpen,
                  setAssetId,
                  assetId,
                  assetName,
                  category,
                  icon,
                  users,
                  logbook,
                  location,
                  manufacturer,
                  serialno,
                  description,
                  unit,
                  capacity,
                  setAutogenId,
                  setAssetName,
                  setCategory,
                  setIcon,
                  setLogbook,
                  setLocation,
                  setManufacturer,
                  setSerialNo,
                  setDescription,
                  setUnit,
                  setCapacity,
                  setDepartmentChecked,
                  setGroupChecked,
                  setUsers,
                  setDepartmentList
                )
              }
            >
              Add Node
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default ModalBox;
