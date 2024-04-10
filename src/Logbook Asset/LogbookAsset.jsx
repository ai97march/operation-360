import React, { useEffect } from "react";
import { getAssetGroupTree, getAssetGroupsList } from "./LogbookAssetApi";
import DataTable from "../Components/Shared/DataTable/DataTable";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  Chip,
  Fab,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Paper,
  Select,
  TextField,
  Typography,
  Zoom,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import { TreeView } from "@mui/x-tree-view/TreeView";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { TreeItem } from "@mui/x-tree-view/TreeItem";
import Barcode from "react-barcode";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import QRCode from "react-qr-code";
import { useTheme } from "@mui/material/styles";
import { getAllFormInfo } from "../Logbook/LogbookApi";
import ModalBox from "./ModalBox.component";

const handleAddAsset = (navigate) => {
  navigate("/AssetMaster");
};

const handleDelete = (row, setAssetGroupList, assetGroupList) => {
  //   setAssetGroupList((prevAssetGroupList) => {
  //     prevAssetGroupList.filter((item) => item.id !== row.id);
  //   });
  setAssetGroupList(assetGroupList.filter((item) => item.id !== row.id));
};

const handleOnCellClick = async (params, setShow, setData) => {
  if (params.field === "groupId") {
    let assetGroupTreeData = await getAssetGroupTree(params.value);
    setData(assetGroupTreeData[0]);
    console.log(assetGroupTreeData[0]);
    setShow(false);
  }
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

const LogbookAsset = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [assetGroupList, setAssetGroupList] = useState([]);
  const [show, setShow] = useState(true);
  const [selectedNode, setSelectedNode] = useState(null);
  const [editAsset, setEditAsset] = useState(false);
  const [assetName, setAssetName] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [manufacturer, setManufacturer] = useState("");
  const [model, setModel] = useState("");
  const [serialno, setSerialNo] = useState("");
  const [description, setDescription] = useState("");
  const [unit, setUnit] = useState("");
  const [capacity, setCapacity] = useState("");
  const [logbookList, setLogbookList] = useState([]);
  const [logbook, setLogbook] = useState([]);
  const [open, setOpen] = useState(false);

  const [data, setData] = useState({
    id: "M20240318192438726",
    name: "M20240318192438726 (Hello)",
    node_level: 0,
    children: [
      {
        id: "A20240318192445171",
        name: "A20240318192445171 (Asset-1)",
        node_level: 1,
        assetName: "Asset-1",
        category: "Cat-1",
        icon: "",
        users: "Software  ",
        logbook: [
          "Fiama Fresh with essential oil ",
          "Fiama Fresh Essential Oil Demo",
          "Fiama L&J Smooth Skin SG Bulk",
        ],
        location: "India",
        manufacturer: "ITC",
        model: "M-1234",
        serialno: "S-1234",
        description: "Desc",
        unit: "Length",
        capacity: "90KM",
        children: [
          {
            id: "A20240318192546244",
            name: "A20240318192546244 (Sub Asset - 1)",
            node_level: 2,
            assetName: "Sub Asset - 1",
            category: "Sub Cat - 1",
            icon: "",
            users: "Software  ",
            logbook: [
              "Fiama Fresh with essential oil ",
              "Fiama L&J Smooth Skin SG Bulk",
            ],
            location: "GHY",
            manufacturer: "ITC",
            model: "M-12",
            serialno: "S-13",
            description: "HIGH",
            unit: "Litre",
            capacity: "100L",
            children: [],
          },
        ],
      },
      {
        id: "A20240318192652332",
        name: "A20240318192652332 (Asset - 2)",
        node_level: 1,
        assetName: "Asset - 2",
        category: "Cat - 2",
        icon: "",
        users: "Software  ",
        logbook: [
          "Fiama Fresh Essential Oil Demo",
          "Fiama L&J Smooth Skin SG Bulk",
        ],
        location: "KOL",
        manufacturer: "KCG",
        model: "M-123456",
        serialno: "S-123456",
        description: "asdf",
        unit: "Length",
        capacity: "20Km",
        children: [],
      },
    ],
  });

  // const [data, setData] = useState({
  //   children: [
  //     {
  //       id: "SD",
  //       assetName: "Somnath Deshmukh",
  //       checked: false,
  //       name: "Somnath Deshmukh",
  //       icon: "fas fa-heading",
  //       category: null,
  //       image: null,
  //       users: [""],
  //       logbook: [17, 327],
  //       location: null,
  //       manufacturer: null,
  //       model: null,
  //       serialno: null,
  //       description: null,
  //       unit: null,
  //       capacity: 0,
  //       assetGroup: null,
  //       posX: null,
  //       posY: null,
  //       children: [
  //         {
  //           id: "SK",
  //           assetName: "Somnath Karan",
  //           checked: false,
  //           name: "Somnath Karan",
  //           icon: "fas fa-archive",
  //           category: null,
  //           image: null,
  //           users: [
  //             "kisoloy.roy@greenwave.co.in",
  //             "munazir.aslam@greenwave.co.in",
  //           ],
  //           logbook: [17, 327],
  //           location: null,
  //           manufacturer: null,
  //           model: null,
  //           serialno: null,
  //           description: null,
  //           unit: null,
  //           capacity: 0,
  //           assetGroup: null,
  //           posX: null,
  //           posY: null,
  //           children: null,
  //         },
  //         {
  //           id: "Kashif",
  //           assetName: "Kashif Ahmad",
  //           checked: false,
  //           name: "Kashif Ahmad",
  //           icon: "fas fa-angry",
  //           category: null,
  //           image: null,
  //           users: [
  //             "azarul.islam@greenwave.co.in",
  //             "kisoloy.roy@greenwave.co.in",
  //             "munazir.aslam@greenwave.co.in",
  //             "tarun.gantait@greenwave.co.in",
  //           ],
  //           logbook: [327],
  //           location: null,
  //           manufacturer: null,
  //           model: null,
  //           serialno: null,
  //           description: null,
  //           unit: null,
  //           capacity: 0,
  //           assetGroup: null,
  //           posX: null,
  //           posY: null,
  //           children: null,
  //         },
  //         {
  //           id: "Bimalendu",
  //           assetName: "Bimalendu",
  //           checked: false,
  //           name: "Bimalendu",
  //           icon: "fas fa-paint-brush",
  //           category: null,
  //           image: null,
  //           users: [""],
  //           logbook: [327],
  //           location: null,
  //           manufacturer: null,
  //           model: null,
  //           serialno: null,
  //           description: null,
  //           unit: null,
  //           capacity: 0,
  //           assetGroup: null,
  //           posX: null,
  //           posY: null,
  //           children: null,
  //         },
  //       ],
  //     },
  //     {
  //       id: "M28022023114853253",
  //       assetName: "M28022023114853253",
  //       checked: false,
  //       name: "M28022023114853253",
  //       icon: null,
  //       category: null,
  //       image: null,
  //       users: null,
  //       logbook: null,
  //       location: null,
  //       manufacturer: null,
  //       model: null,
  //       serialno: null,
  //       description: null,
  //       unit: null,
  //       capacity: 0,
  //       assetGroup: null,
  //       posX: null,
  //       posY: null,
  //       children: [
  //         {
  //           id: "Avrajit",
  //           assetName: "Avrajit",
  //           checked: false,
  //           name: "Avrajit",
  //           icon: "fas fa-heading",
  //           category: "",
  //           image: null,
  //           users: [""],
  //           logbook: [17],
  //           location: "",
  //           manufacturer: "",
  //           model: "",
  //           serialno: "",
  //           description: "",
  //           unit: "",
  //           capacity: 0,
  //           assetGroup: null,
  //           posX: null,
  //           posY: null,
  //           children: null,
  //         },
  //         {
  //           id: "SD",
  //           assetName: "Somnath Deshmukh",
  //           checked: false,
  //           name: "Somnath Deshmukh",
  //           icon: "fas fa-heading",
  //           category: null,
  //           image: null,
  //           users: [""],
  //           logbook: [17, 327],
  //           location: null,
  //           manufacturer: null,
  //           model: null,
  //           serialno: null,
  //           description: null,
  //           unit: null,
  //           capacity: 0,
  //           assetGroup: null,
  //           posX: null,
  //           posY: null,
  //           children: null,
  //         },
  //       ],
  //     },
  //     {
  //       id: "TG",
  //       assetName: "Tarun Gantait",
  //       checked: false,
  //       name: "Tarun Gantait",
  //       icon: "fas fa-archive",
  //       category: null,
  //       image: null,
  //       users: [
  //         "kashif.ahmad@greenwave.co.in",
  //         "kisoloy.roy@greenwave.co.in",
  //         "munazir.aslam@greenwave.co.in",
  //         "pranab.quila@greenwave.co.in",
  //       ],
  //       logbook: [17, 327],
  //       location: null,
  //       manufacturer: null,
  //       model: null,
  //       serialno: null,
  //       description: null,
  //       unit: null,
  //       capacity: 0,
  //       assetGroup: null,
  //       posX: null,
  //       posY: null,
  //       children: [
  //         {
  //           id: "Pranab",
  //           assetName: "Pranab Quila",
  //           checked: false,
  //           name: "Pranab Quila",
  //           icon: "fas fa-code",
  //           category: null,
  //           image: null,
  //           users: [
  //             "kisoloy.roy@greenwave.co.in",
  //             "munazir.aslam@greenwave.co.in",
  //           ],
  //           logbook: [327],
  //           location: null,
  //           manufacturer: null,
  //           model: null,
  //           serialno: null,
  //           description: null,
  //           unit: null,
  //           capacity: 0,
  //           assetGroup: null,
  //           posX: null,
  //           posY: null,
  //           children: null,
  //         },
  //       ],
  //     },
  //     {
  //       id: "Bimalendu",
  //       assetName: "Bimalendu",
  //       checked: false,
  //       name: "Bimalendu",
  //       icon: "fas fa-paint-brush",
  //       category: null,
  //       image: null,
  //       users: [""],
  //       logbook: [327],
  //       location: null,
  //       manufacturer: null,
  //       model: null,
  //       serialno: null,
  //       description: null,
  //       unit: null,
  //       capacity: 0,
  //       assetGroup: null,
  //       posX: null,
  //       posY: null,
  //       children: [
  //         {
  //           id: "PranabQ",
  //           assetName: "Pranab",
  //           checked: false,
  //           name: "Pranab",
  //           icon: "fas fa-paint-brush",
  //           category: null,
  //           image: null,
  //           users: [
  //             "kisoloy.roy@greenwave.co.in",
  //             "munazir.aslam@greenwave.co.in",
  //           ],
  //           logbook: [17, 327],
  //           location: null,
  //           manufacturer: null,
  //           model: null,
  //           serialno: null,
  //           description: null,
  //           unit: null,
  //           capacity: 0,
  //           assetGroup: null,
  //           posX: null,
  //           posY: null,
  //           children: null,
  //         },
  //       ],
  //     },
  //     {
  //       id: "Avrajit",
  //       assetName: "Avrajit",
  //       checked: false,
  //       name: "Avrajit",
  //       icon: "fas fa-heading",
  //       category: "",
  //       image: null,
  //       users: [""],
  //       logbook: [17],
  //       location: null,
  //       manufacturer: null,
  //       model: null,
  //       serialno: null,
  //       description: null,
  //       unit: null,
  //       capacity: 0,
  //       assetGroup: null,
  //       posX: null,
  //       posY: null,
  //       children: [
  //         {
  //           id: "Azarul",
  //           assetName: "Azarul Islam",
  //           checked: false,
  //           name: "Azarul Islam",
  //           icon: "fas fa-archive",
  //           category: null,
  //           image: null,
  //           users: [""],
  //           logbook: [],
  //           location: null,
  //           manufacturer: null,
  //           model: null,
  //           serialno: null,
  //           description: null,
  //           unit: null,
  //           capacity: 0,
  //           assetGroup: null,
  //           posX: null,
  //           posY: null,
  //           children: null,
  //         },
  //         {
  //           id: "TG",
  //           assetName: "Tarun Gantait",
  //           checked: false,
  //           name: "Tarun Gantait",
  //           icon: "fas fa-archive",
  //           category: null,
  //           image: null,
  //           users: [
  //             "kashif.ahmad@greenwave.co.in",
  //             "kisoloy.roy@greenwave.co.in",
  //             "munazir.aslam@greenwave.co.in",
  //             "pranab.quila@greenwave.co.in",
  //           ],
  //           logbook: [17, 327],
  //           location: null,
  //           manufacturer: null,
  //           model: null,
  //           serialno: null,
  //           description: null,
  //           unit: null,
  //           capacity: 0,
  //           assetGroup: null,
  //           posX: null,
  //           posY: null,
  //           children: null,
  //         },
  //       ],
  //     },
  //     {
  //       id: "SK",
  //       assetName: "Somnath Karan",
  //       checked: false,
  //       name: "Somnath Karan",
  //       icon: "fas fa-archive",
  //       category: null,
  //       image: null,
  //       users: ["kisoloy.roy@greenwave.co.in", "munazir.aslam@greenwave.co.in"],
  //       logbook: [17, 327],
  //       location: null,
  //       manufacturer: null,
  //       model: null,
  //       serialno: null,
  //       description: null,
  //       unit: null,
  //       capacity: 0,
  //       assetGroup: null,
  //       posX: null,
  //       posY: null,
  //       children: [
  //         {
  //           id: "Koushik",
  //           assetName: "Koushik Mondol",
  //           checked: false,
  //           name: "Koushik Mondol",
  //           icon: "fas fa-trash-alt",
  //           category: null,
  //           image: null,
  //           users: [
  //             "kisoloy.roy@greenwave.co.in",
  //             "munazir.aslam@greenwave.co.in",
  //             "tarun.gantait@greenwave.co.in",
  //           ],
  //           logbook: [17],
  //           location: null,
  //           manufacturer: null,
  //           model: null,
  //           serialno: null,
  //           description: null,
  //           unit: null,
  //           capacity: 0,
  //           assetGroup: null,
  //           posX: null,
  //           posY: null,
  //           children: null,
  //         },
  //         {
  //           id: "MunazirA",
  //           assetName: "Munazir Aslam",
  //           checked: false,
  //           name: "Munazir Aslam",
  //           icon: "fas fa-code",
  //           category: null,
  //           image: null,
  //           users: [
  //             "azarul.islam@greenwave.co.in",
  //             "kisoloy.roy@greenwave.co.in",
  //             "munazir.aslam@greenwave.co.in",
  //           ],
  //           logbook: [327],
  //           location: null,
  //           manufacturer: null,
  //           model: null,
  //           serialno: null,
  //           description: null,
  //           unit: null,
  //           capacity: 0,
  //           assetGroup: null,
  //           posX: null,
  //           posY: null,
  //           children: null,
  //         },
  //       ],
  //     },
  //     {
  //       id: "Kashif",
  //       assetName: "Kashif Ahmad",
  //       checked: false,
  //       name: "Kashif Ahmad",
  //       icon: "fas fa-angry",
  //       category: null,
  //       image: null,
  //       users: [
  //         "azarul.islam@greenwave.co.in",
  //         "kisoloy.roy@greenwave.co.in",
  //         "munazir.aslam@greenwave.co.in",
  //         "tarun.gantait@greenwave.co.in",
  //       ],
  //       logbook: [327],
  //       location: null,
  //       manufacturer: null,
  //       model: null,
  //       serialno: null,
  //       description: null,
  //       unit: null,
  //       capacity: 0,
  //       assetGroup: null,
  //       posX: null,
  //       posY: null,
  //       children: [
  //         {
  //           id: "Sohome",
  //           assetName: "Sohome Sarkar",
  //           checked: false,
  //           name: "Sohome Sarkar",
  //           icon: "fas fa-code",
  //           category: null,
  //           image: null,
  //           users: ["kisoloy.roy@greenwave.co.in"],
  //           logbook: [327],
  //           location: null,
  //           manufacturer: null,
  //           model: null,
  //           serialno: null,
  //           description: null,
  //           unit: null,
  //           capacity: 0,
  //           assetGroup: null,
  //           posX: null,
  //           posY: null,
  //           children: null,
  //         },
  //         {
  //           id: "KisoloyR",
  //           assetName: "KisoloyR",
  //           checked: false,
  //           name: "KisoloyR",
  //           icon: "fas fa-code",
  //           category: null,
  //           image: null,
  //           users: [
  //             "munazir.aslam@greenwave.co.in",
  //             "tarun.gantait@greenwave.co.in",
  //           ],
  //           logbook: [17, 327],
  //           location: null,
  //           manufacturer: null,
  //           model: null,
  //           serialno: null,
  //           description: null,
  //           unit: null,
  //           capacity: 0,
  //           assetGroup: null,
  //           posX: null,
  //           posY: null,
  //           children: null,
  //         },
  //       ],
  //     },
  //   ],
  //   name: "Software4321",
  //   id: "root",
  // });

  const columns = [
    { field: "groupId", headerName: "Group ID", flex: 1 },
    { field: "groupName", headerName: "Group Name", flex: 1 },
    {
      field: "createdBy",
      headerName: "Created/Mofified by",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "createdOn",
      headerName: "Created/Mofified on",
      flex: 1,
    },
    {
      field: "delete",
      headerName: "",
      flex: 0.5,
      renderCell: (params) => (
        <DeleteIcon
          onClick={() =>
            handleDelete(params.row, setAssetGroupList, assetGroupList)
          }
        />
      ),
    },
    // {
    //   field: "age",
    //   headerName: "Age",
    //   type: "number",
    //   headerAlign: "left",
    //   align: "left",
    // },
    // {
    //   field: "phone",
    //   headerName: "Phone Number",
    //   flex: 1,
    // },
  ];

  useEffect(() => {
    async function fetchData() {
      let assetGroupData = await getAssetGroupsList();
      assetGroupData = assetGroupData.map((item, index) => {
        return { ...item, id: index };
      });
      setAssetGroupList(assetGroupData);
    }
    fetchData();
  }, []);

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

  const property = {
    assetGroupList: assetGroupList,
    columns: columns,
    handleOnCellClick: (params) => handleOnCellClick(params, setShow, setData),
  };

  const renderTree = (nodes) => (
    <TreeItem
      key={nodes.id}
      nodeId={nodes.id}
      label={nodes.label}
      onClick={() => handleNodeClick(nodes, setEditAsset)}
    >
      {Array.isArray(nodes.children)
        ? nodes.children.map((node) => renderTree(node))
        : null}
    </TreeItem>
  );

  const handleNodeClick = (node, setEditAsset) => {
    // console.log(node.logbook);
    setEditAsset(false);
    setData((prevData) => {
      findAndAddChildNode(prevData, node.id);
      return prevData;
    });
    setSelectedNode(node);
  };

  const findAndAddChildNode = (node, targetNodeId) => {
    if (node.id === targetNodeId) {
      console.log("targetNode", targetNodeId);
      // node.children.push(childNode);
    } else if (Array.isArray(node.children)) {
      node.children.forEach((child) =>
        findAndAddChildNode(child, targetNodeId)
      );
    }
  };

  const findAndEditChildNode = (
    node,
    targetNodeId,
    data,
    selectedNode,
    assetName,
    category,
    logbook,
    location,
    manufacturer,
    model,
    serialno,
    description,
    unit,
    capacity
  ) => {
    if (node.id === targetNodeId) {
      node.assetName = assetName || node.assetName;
      node.category = category || node.category;
      node.logbook = logbook.length > 0 || node.logbook;
      node.location = location || node.location;
      node.manufacturer = manufacturer || node.manufacturer;
      node.model = model || node.model;
      node.serialno = serialno || node.serialno;
      node.description = description || node.description;
      node.unit = unit || node.unit;
      node.capacity = capacity || node.capacity;
    } else if (Array.isArray(node.children)) {
      node.children.forEach((child) =>
        findAndEditChildNode(
          child,
          targetNodeId,
          data,
          selectedNode,
          assetName,
          category,
          logbook,
          location,
          manufacturer,
          model,
          serialno,
          description,
          unit,
          capacity
        )
      );
    }
  };

  const handleEditNode = (
    data,
    selectedNode,
    assetName,
    category,
    logbook,
    // logbookList,
    location,
    manufacturer,
    model,
    serialno,
    description,
    unit,
    capacity
  ) => {
    setData((prevData) => {
      findAndEditChildNode(
        prevData,
        selectedNode.id,
        data,
        selectedNode,
        assetName,
        category,
        logbook,
        location,
        manufacturer,
        model,
        serialno,
        description,
        unit,
        capacity
      );
      return prevData;
    });
  };

  const handleDeleteNode = (selectedNode, setData, setSelectedNode) => {
    // if (selectedNode && selectedNode.id.split("")[0] === "M") {
    //   // If the selected node is the root, clear all data and hide the right panel
    //   setData(null);
    //   setSelectedNode(null);
    // } else
    if (selectedNode) {
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
      node.children = node.children.filter(
        (child) => child.id !== targetNodeId
      );
      node.children.forEach((child) => findAndDeleteNode(child, targetNodeId));
    }
  };

  const handleModalOpen = (setOpen) => {
    setOpen(true);
  };

  return (
    <>
      <Box>
        {/* <Zoom
          key={fab.color}
          in={value === index}
          timeout={transitionDuration}
          style={{
            transitionDelay: `${
              value === index ? transitionDuration.exit : 0
            }ms`,
          }}
          unmountOnExit
        > */}
        {show ? (
          <Fab
            sx={{
              position: "absolute",
              bottom: 16,
              right: 16,
              backgroundColor: "Green",
            }}
            aria-label="Add"
            onClick={() => handleAddAsset(navigate)}
          >
            <AddIcon />
          </Fab>
        ) : (
          <Fab
            sx={{
              position: "absolute",
              bottom: 16,
              right: 16,
              backgroundColor: "Green",
            }}
            aria-label="Arrow"
            onClick={() => setShow(true)}
          >
            <ArrowBackIcon />
          </Fab>
        )}
        {/* </Zoom> */}
      </Box>
      {show ? (
        <DataTable property={property} />
      ) : (
        <Box sx={{ m: "2rem 10rem" }}>
          <Paper sx={{ display: "flex" }}>
            <Box width="50%" sx={{ m: "1rem" }}>
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
            </Box>
            {selectedNode && (
              <Box width="50%" sx={{ m: "1rem" }}>
                <Box>
                  <Box
                    sx={{
                      display: "flex",
                      marginY: 2,
                      justifyContent: "space-between",
                    }}
                  >
                    <Button
                      className="button"
                      variant="contained"
                      color="secondary"
                      onClick={
                        () => setEditAsset((bool) => !bool)
                        // handleEditNode(
                        //   data,
                        //   selectedNode
                        //   // setData,
                        //   // setSelectedNode,
                        //   // setgroupNameState
                        // )
                      }
                    >
                      {!editAsset ? "Edit This Asset" : "Preview this Asset"}
                    </Button>
                    <Button
                      className="button"
                      variant="contained"
                      color="secondary" // Use secondary color for delete button
                      onClick={() =>
                        handleDeleteNode(
                          selectedNode,
                          setData,
                          setSelectedNode
                          // setgroupNameState
                        )
                      }
                    >
                      Delete Node
                    </Button>
                  </Box>
                  <Box sx={{ display: "flex", marginY: 2 }}>
                    <Typography
                      // variant="h6"
                      // component="h4"
                      minWidth="200px"
                      alignSelf="center"
                      //   align="center"
                    >
                      Asset Id
                    </Typography>
                    <Box
                      style={{
                        height: "auto",
                        // margin: "0 auto",
                        maxWidth: 64,
                        width: "100%",
                      }}
                    >
                      <QRcodeGenerator value={selectedNode.id} />
                      <Typography
                        // variant="h6"
                        // component="h4"
                        // minWidth="200px"
                        alignSelf="center"
                        // align="center"
                      >
                        {selectedNode.id}
                      </Typography>
                    </Box>
                  </Box>
                  <Box sx={{ display: "flex", marginY: 2 }}>
                    <Typography
                      // variant="h6"
                      // component="h4"
                      minWidth="200px"
                      alignSelf="center"
                    >
                      Asset Name
                    </Typography>
                    {!editAsset ? (
                      <Typography alignSelf="center">
                        {selectedNode.assetName}
                      </Typography>
                    ) : (
                      <TextField
                        label="Asset Name"
                        variant="outlined"
                        fullWidth
                        defaultValue={selectedNode.assetName}
                        // value={assetName}
                        onChange={(e) => setAssetName(e.target.value)}
                      />
                    )}
                  </Box>
                  <Box sx={{ display: "flex", marginY: 2 }}>
                    <Typography
                      // variant="h6"
                      // component="h4"
                      minWidth="200px"
                      alignSelf="center"
                    >
                      Category
                    </Typography>
                    {!editAsset ? (
                      <Typography alignSelf="center">
                        {selectedNode.category}
                      </Typography>
                    ) : (
                      <TextField
                        label="Category"
                        variant="outlined"
                        fullWidth
                        defaultValue={selectedNode.category}
                        // value={category}
                        onChange={(e) => setCategory(e.target.value)}
                      />
                    )}
                  </Box>
                  <Box sx={{ display: "flex", marginY: 2 }}>
                    <Typography
                      // variant="h6"
                      // component="h4"
                      minWidth="200px"
                      alignSelf="center"
                    >
                      Filter By
                    </Typography>
                    {/* <FormControlLabel
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
                /> */}
                  </Box>
                  <Box sx={{ display: "flex", marginY: 2 }}>
                    <Typography
                      // variant="h6"
                      // component="h4"
                      minWidth="200px"
                      alignSelf="center"
                    >
                      Select Users
                    </Typography>
                    {/* <FormControl fullWidth>
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
                </FormControl> */}
                    <Typography alignSelf="center">
                      {selectedNode.users}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", marginY: 2 }}>
                    <Typography
                      // variant="h6"
                      // component="h4"
                      minWidth="200px"
                      alignSelf="center"
                    >
                      Select Logbook
                    </Typography>
                    {!editAsset ? (
                      <Typography alignSelf="center">
                        {selectedNode.logbook}
                      </Typography>
                    ) : (
                      <FormControl fullWidth>
                        <InputLabel id="select-logbook">
                          Select Logbook
                        </InputLabel>
                        <Select
                          labelId="select-logbook"
                          label="Select Logbook"
                          multiple
                          default
                          defaultValue={selectedNode.logbook}
                          // value={selectedNode.logbook}
                          // value={logbook}
                          onChange={(e) => handleLogBook(e, setLogbook)}
                          input={
                            <OutlinedInput
                              id="select-multiple-chip"
                              label="Select Logbook"
                            />
                          }
                          renderValue={(selected) => (
                            <Box
                              sx={{
                                display: "flex",
                                flexWrap: "wrap",
                                gap: 0.5,
                              }}
                            >
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
                              style={getStyles(
                                itm,
                                selectedNode.logbook,
                                theme
                              )}
                            >
                              <Checkbox
                                checked={selectedNode.logbook.indexOf(itm) > -1}
                              />
                              <ListItemText primary={itm} />
                              {/* {itm} */}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    )}
                  </Box>
                  <Box sx={{ display: "flex", marginY: 2 }}>
                    <Typography
                      // variant="h6"
                      // component="h4"
                      minWidth="200px"
                      alignSelf="center"
                    >
                      Location
                    </Typography>
                    {!editAsset ? (
                      <Typography alignSelf="center">
                        {selectedNode.location}
                      </Typography>
                    ) : (
                      <TextField
                        label="Location"
                        variant="outlined"
                        fullWidth
                        defaultValue={selectedNode.location}
                        // value={location}
                        onChange={(e) => setLocation(e.target.value)}
                      />
                    )}
                  </Box>
                  <Box sx={{ display: "flex", marginY: 2 }}>
                    <Typography
                      // variant="h6"
                      // component="h4"
                      minWidth="200px"
                      alignSelf="center"
                    >
                      Manufacturer
                    </Typography>
                    {!editAsset ? (
                      <Typography alignSelf="center">
                        {selectedNode.manufacturer}
                      </Typography>
                    ) : (
                      <TextField
                        label="Manufacturer"
                        variant="outlined"
                        fullWidth
                        defaultValue={selectedNode.manufacturer}
                        // value={manufacturer}
                        onChange={(e) => setManufacturer(e.target.value)}
                      />
                    )}
                  </Box>
                  <Box sx={{ display: "flex", marginY: 2 }}>
                    <Typography
                      // variant="h6"
                      // component="h4"
                      minWidth="200px"
                      alignSelf="center"
                    >
                      Enter Model
                    </Typography>
                    {!editAsset ? (
                      <Typography alignSelf="center">
                        {selectedNode.model}
                      </Typography>
                    ) : (
                      <TextField
                        label="Enter Model"
                        variant="outlined"
                        fullWidth
                        defaultValue={selectedNode.model}
                        // value={model}
                        onChange={(e) => setModel(e.target.value)}
                      />
                    )}
                  </Box>
                  <Box sx={{ display: "flex", marginY: 2 }}>
                    <Typography
                      // variant="h6"
                      // component="h4"
                      minWidth="200px"
                      alignSelf="center"
                    >
                      Serial No
                    </Typography>
                    {!editAsset ? (
                      <Typography alignSelf="center">
                        {selectedNode.serialno}
                      </Typography>
                    ) : (
                      <TextField
                        label="Serial No"
                        variant="outlined"
                        fullWidth
                        defaultValue={selectedNode.serialno}
                        // value={serialno}
                        onChange={(e) => setSerialNo(e.target.value)}
                      />
                    )}
                  </Box>
                  <Box sx={{ display: "flex", marginY: 2 }}>
                    <Typography
                      // variant="h6"
                      // component="h4"
                      minWidth="200px"
                      alignSelf="center"
                    >
                      Description
                    </Typography>
                    {!editAsset ? (
                      <Typography alignSelf="center">
                        {selectedNode.description}
                      </Typography>
                    ) : (
                      <TextField
                        label="Description"
                        variant="outlined"
                        fullWidth
                        defaultValue={selectedNode.description}
                        // value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      />
                    )}
                  </Box>
                  <Box sx={{ display: "flex", marginY: 2 }}>
                    <Typography
                      // variant="h6"
                      // component="h4"
                      minWidth="200px"
                      alignSelf="center"
                    >
                      Unit Of measurement
                    </Typography>
                    {/* <FormControl fullWidth>
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
                </FormControl> */}
                    {!editAsset ? (
                      <Typography alignSelf="center">
                        {selectedNode.unit}
                      </Typography>
                    ) : (
                      <FormControl fullWidth>
                        <InputLabel id="select-unit-of-measurement">
                          Select unit Of measurement
                        </InputLabel>
                        <Select
                          labelId="select-unit-of-measurement"
                          label="Select unit Of measurement"
                          defaultValue={selectedNode.unit}
                          // value={unit}
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
                    )}
                  </Box>
                  <Box sx={{ display: "flex", marginY: 2 }}>
                    <Typography
                      // variant="h6"
                      // component="h4"
                      minWidth="200px"
                      alignSelf="center"
                    >
                      Capacity
                    </Typography>
                    {!editAsset ? (
                      <Typography alignSelf="center">
                        {selectedNode.capacity}
                      </Typography>
                    ) : (
                      <TextField
                        label="Capacity"
                        variant="outlined"
                        fullWidth
                        defaultValue={selectedNode.capacity}
                        // value={capacity}
                        onChange={(e) => setCapacity(e.target.value)}
                      />
                    )}
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      marginY: 2,
                      justifyContent: "space-between",
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
                    {editAsset && (
                      <Button
                        className="button"
                        variant="contained"
                        color="warning" // Use secondary color for delete button
                        onClick={
                          () =>
                            handleEditNode(
                              data,
                              selectedNode,
                              assetName,
                              category,
                              logbook,
                              // logbookList,
                              location,
                              manufacturer,
                              model,
                              serialno,
                              description,
                              unit,
                              capacity
                            )
                          // handleEditNode(
                          //   data,
                          //   selectedNode
                          //   // setData,
                          //   // setSelectedNode,
                          //   // setgroupNameState
                          // )
                        }
                      >
                        Save This Asset
                      </Button>
                    )}
                  </Box>
                </Box>
              </Box>
            )}
          </Paper>
        </Box>
      )}
      <ModalBox
        open={open}
        setOpen={setOpen}
        setData={setData}
        selectedNode={selectedNode}
      />
    </>
  );
};

export default LogbookAsset;

const QRcodeGenerator = ({ value, size = 100 }) => {
  return (
    <QRCode
      title={value}
      // value={value}
      // // level="level"
      size={256}
      style={{ height: "auto", maxWidth: "100%", width: "100%" }}
      value={value}
      viewBox={`0 0 256 256`}
    />
  );
};

const BarcodeGenerator = ({ value, width = 1, height = 50, fontSize = 18 }) => {
  return (
    <Barcode value={value} width={width} height={height} fontSize={fontSize} />
  );
};
