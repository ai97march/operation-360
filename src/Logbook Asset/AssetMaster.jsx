import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
// import { styled } from "@mui/material/styles";
import {
  Box,
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
  Paper,
  Select,
  Typography,
} from "@mui/material";
import { TreeView } from "@mui/x-tree-view/TreeView";
import { TreeItem } from "@mui/x-tree-view/TreeItem";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { getAllDepartments } from "./LogbookAssetApi";
import Barcode from "react-barcode";
import { getAllFormInfo } from "../Logbook/LogbookApi";
import { useTheme } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";

// const handleSubmit = (event, groupName) => {
//   event.preventDefault();
//   // Handle form submission here
//   console.log(`Creating group "${groupName}"`);
// };

const handleGroupNameRoot = (
  rootNodeName,
  setData,
  setRootNodeName,
  createInitialData,
  setgroupNameState
) => {
  const rootName = rootNodeName.trim();
  if (rootName !== "") {
    setData(createInitialData(rootName));
    setRootNodeName("");
    setgroupNameState(true);
  }
};

// const handleRootNodeCreate = (
//   rootNodeName,
//   setData,
//   setRootNodeName,
//   createInitialData
// ) => {
//   const rootName = rootNodeName.trim();
//   if (rootName !== "") {
//     setData(createInitialData(rootName));
//     setRootNodeName("");
//   }
// };

const plantId = "plant Azarul";

const createInitialData = (rootName, level = 0) => ({
  id: `M${new Date()
    .toISOString()
    .replace(/[-:T.Z]/g, "")
    .slice(0, 19)}`,
  name: `M${new Date()
    .toISOString()
    .replace(/[-:T.Z]/g, "")
    .slice(0, 19)} (${rootName})`,
  node_level: level,
  children: [],
});

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
      name: assetId + " (" + assetName + ")",
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
    };

    let dataLocal;
    setData((prevData) => {
      const updatedData = JSON.parse(JSON.stringify(prevData));
      findAndAddChildNode(updatedData, selectedNode.id, newChildNode);
      dataLocal = updatedData;
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
    console.log("dataLocal ", JSON.stringify(dataLocal));
    // handlePostData(dataLocal);
    setOpen(false);
  }
};

const handleSaveAssetTree = async (data) => {
  console.log(data);
  window.location.reload();
  // handlePostData(dataLocal);
};

const handlePostData = async (dataLocal) => {
  try {
    const response = await fetch(
      "http://192.168.7.4:9999/saveTree/" + plantId,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataLocal),
      }
    );

    // if (response.ok) {
    //   setPostDataStatus("Data successfully posted!");
    //   console.log("post completed");
    // } else {
    //   setPostDataStatus("Error posting data. Please try again.");
    // }
    console.log(response.status);
  } catch (error) {
    console.error("Error posting data:", error);
    // setPostDataStatus("Error posting data. Please try again.");
  }
};

const findAndAddChildNode = (node, targetNodeId, childNode) => {
  if (node.id === targetNodeId) {
    node.children.push(childNode);
  } else if (Array.isArray(node.children)) {
    node.children.forEach((child) =>
      findAndAddChildNode(child, targetNodeId, childNode)
    );
  }
};

const handleDeleteNode = (
  selectedNode,
  setData,
  setSelectedNode,
  setgroupNameState
) => {
  if (selectedNode && selectedNode.id.split("")[0] === "M") {
    // If the selected node is the root, clear all data and hide the right panel
    setData(null);
    setSelectedNode(null);
    setgroupNameState(false);
  } else if (selectedNode) {
    // For other nodes, delete the selected node
    setData((prevData) => {
      const updatedData = JSON.parse(JSON.stringify(prevData));
      findAndDeleteNode(updatedData, selectedNode.id);
      return updatedData;
    });
    setSelectedNode(null);
  }
};

const findAndDeleteNode = (node, targetNodeId) => {
  if (node.children) {
    node.children = node.children.filter((child) => child.id !== targetNodeId);
    node.children.forEach((child) => findAndDeleteNode(child, targetNodeId));
  }
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

const handleViewItemClick = (setViewItemModalOpen) => {
  setViewItemModalOpen(true);
};

const handleViewItemModalClose = (setViewItemModalOpen) => {
  setViewItemModalOpen(false);
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

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const handleLogBook = (event, setLogbook) => {
  const {
    target: { value },
  } = event;
  setLogbook(
    // On autofill we get a stringified value.
    typeof value === "string" ? value.split(",") : value
  );
};

const AssetMaster = () => {
  //   const classes = useStyles();
  const theme = useTheme();
  const [groupNameState, setgroupNameState] = useState(false);
  const [groupRootNodeName, setGroupRootNodeName] = useState("");
  const [data, setData] = useState(null);
  const [selectedNode, setSelectedNode] = useState(null);
  const [rootNodeName, setRootNodeName] = useState("");
  //   const [childNodeName, setChildNodeName] = useState("");
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

  const [open, setOpen] = useState(false);
  const [viewItemModalOpen, setViewItemModalOpen] = useState(false);

  useEffect(() => {
    console.log("useEffect called ");
    console.log("Data => ", data);
    // Recursively update the nodeLevel in the data
    const updateNodeLevel = (node, level) => {
      node.node_level = level;
      if (Array.isArray(node.children)) {
        node.children.forEach((child) => updateNodeLevel(child, level + 1));
      }
    };

    if (data) {
      updateNodeLevel(data, 0);
    }
  }, [data]);

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

  const renderTree = (nodes) => (
    <TreeItem
      key={nodes.id}
      nodeId={nodes.id}
      label={nodes.name}
      onClick={() => handleNodeClick(nodes)}
    >
      {Array.isArray(nodes.children)
        ? nodes.children.map((node) => renderTree(node))
        : null}
    </TreeItem>
  );

  const handleNodeClick = (node) => {
    setSelectedNode(node);
  };

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

  const style1 = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    borderRadius: "10px",
    boxShadow: 24,
    p: 4,
  };

  return (
    <>
      <Box sx={{ m: "2rem 10rem" }}>
        <Paper sx={{ display: "flex" }}>
          <Box width="50%" sx={{ m: "1rem" }}>
            {/* <form onSubmit={(e) => handleSubmit(e, groupName)}> */}
            <Typography>Enter Group Name</Typography>
            <TextField
              label="Enter Group Name"
              value={groupRootNodeName}
              onChange={(e) => setGroupRootNodeName(e.target.value)}
              //   value={groupName}
              //   onChange={(event) => setGroupName(event.target.value)}
              margin="normal"
              fullWidth
              disabled={groupNameState}
            />
            <Button
              // type="submit"
              variant="contained"
              color="primary"
              fullWidth
              onClick={() =>
                handleGroupNameRoot(
                  groupRootNodeName,
                  setData,
                  setRootNodeName,
                  createInitialData,
                  setgroupNameState
                )
              }
              disabled={groupNameState}
            >
              Create Group
            </Button>
            {/* </form> */}
          </Box>
          <Box
            width="50%"
            sx={{ m: "1rem", border: "1px solid grey", borderRadius: "5px" }}
          >
            <img
              src="./6213287.jpg"
              alt=""
              style={{
                width: "100%",
                height: "150px",
                objectFit: "contain",
              }}
            />
          </Box>
        </Paper>
      </Box>
      <Box sx={{ m: "2rem 10rem" }}>
        <Paper sx={{ display: "flex" }}>
          <Box width="50%" sx={{ m: "1rem" }}>
            {data && (
              <div className="treeViewContainer">
                <Typography>Asset Tree: </Typography>
                <TreeView
                  sx={{
                    borderRadius: "12px",
                    overflow: "hidden",
                    transition: "box-shadow 0.3s ease-in-out",
                  }}
                  aria-label="rich object"
                  defaultCollapseIcon={<ExpandMoreIcon />}
                  defaultExpanded={["root"]}
                  defaultExpandIcon={<ChevronRightIcon />}
                >
                  {renderTree(data, setSelectedNode)}
                </TreeView>
                <br />
              </div>
            )}
            {data && data.children.length > 0 && (
              <Box>
                <Button
                  className="button"
                  variant="contained"
                  color="warning" // Use secondary color for delete button
                  onClick={() => handleSaveAssetTree(data)}
                >
                  Save
                </Button>
              </Box>
            )}
          </Box>
          <Box width="50%" sx={{ m: "1rem" }}>
            {/* {data && (
              <>
                <TextField
                  className="textInput"
                  label="Enter Parent Node Name"
                  variant="outlined"
                  fullWidth
                  value={rootNodeName}
                  onChange={(e) => setRootNodeName(e.target.value)}
                />
                <Button
                  className="button"
                  variant="contained"
                  color="primary"
                  onClick={() =>
                    handleRootNodeCreate(
                      rootNodeName,
                      setData,
                      setRootNodeName,
                      createInitialData
                    )
                  }
                >
                  Create Root Node
                </Button>
              </>
            )} */}
            {data && (
              <>
                {selectedNode && (
                  <Box
                    sx={{
                      //   display: "flex",
                      //   justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Typography variant="button">
                        {`Node Selected: ${selectedNode.name}`}
                      </Typography>
                      <Button
                        className="button"
                        variant="contained"
                        color="secondary" // Use secondary color for delete button
                        onClick={() =>
                          handleDeleteNode(
                            selectedNode,
                            setData,
                            setSelectedNode,
                            setgroupNameState
                          )
                        }
                      >
                        Delete Node
                      </Button>
                    </Box>
                    <br />
                    <br />
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Button
                        className="button"
                        variant="contained"
                        color="primary" // Use secondary color for delete button
                        onClick={() => handleModalOpen(setOpen)}
                      >
                        Add Item
                      </Button>
                      <Button
                        className="button"
                        variant="contained"
                        color="primary" // Use secondary color for delete button
                        onClick={() =>
                          handleViewItemClick(setViewItemModalOpen)
                        }
                      >
                        View Item
                      </Button>
                    </Box>
                  </Box>
                )}
                <Box>
                  {/*
            <br></br>
            <div>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>
            <br></br>
            {selectedImage && (
              <div className="image-preview">
                Preview:
                <br></br>
                <img
                  src={selectedImage}
                  height="100px"
                  width="200px"
                  alt="Preview"
                />
              </div>
            )}
            */}
                  {/* <Button
              className="button"
              variant="contained"
              color="primary"
              onClick={handlePrintJson}
            >
              Print JSON
            </Button> */}
                  {/* <Button
              className="button"
              variant="contained"
              color="primary"
              onClick={handlePostData}
            >
              Save
            </Button> */}

                  {/* <p>
              {selectedImageBytes && (
                <p>Selected Image Bytes: {selectedImageBytes.join(", ")}</p>
              )}
            </p> */}
                </Box>
              </>
            )}
          </Box>
        </Paper>
      </Box>
      <Modal
        open={open}
        onClose={(e, reason) => handleModalClose(e, reason, setOpen)}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        disableEscapeKeyDown
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
      <Modal open={viewItemModalOpen} onClose={handleViewItemModalClose}>
        <Box sx={style1}>
          <Typography variant="h6" component="h2" gutterBottom>
            Asset Details
          </Typography>
          {/* {selectedAsset && ( */}
          <>
            <Typography variant="body1" gutterBottom>
              Group ID: "Group ID"
            </Typography>
            <Typography variant="body1" gutterBottom>
              Asset ID: <BarcodeGenerator value={groupRootNodeName} />
            </Typography>
            <Typography variant="body1" gutterBottom>
              Asset Name: Asset Name:
            </Typography>
            <Typography variant="body1" gutterBottom>
              Category: Category:
            </Typography>
            <Typography variant="body1" gutterBottom>
              Icon: Icon:
            </Typography>
            <Typography variant="body1" gutterBottom>
              Logbook: Logbook:
            </Typography>
            <Typography variant="body1" gutterBottom>
              Location: Location:
            </Typography>
            <Typography variant="body1" gutterBottom>
              Manufacturer: Manufacturer:
            </Typography>
            <Typography variant="body1" gutterBottom>
              Serial Number: Serial Number:
            </Typography>
            <Typography variant="body1" gutterBottom>
              Description: Description:
            </Typography>
            <Typography variant="body1" gutterBottom>
              Unit: Unit:
            </Typography>
            <Typography variant="body1" gutterBottom>
              Capacity: Capacity:
            </Typography>
          </>
          {/* )} */}
        </Box>
      </Modal>
    </>
  );
};

export default AssetMaster;

const BarcodeGenerator = ({ value, width = 2, height = 50, fontSize = 18 }) => {
  return (
    <Barcode value={value} width={width} height={height} fontSize={fontSize} />
  );
};
