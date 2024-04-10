// import { styled } from "@mui/material/styles";
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell, { tableCellClasses } from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TableRow from "@mui/material/TableRow";
// import TableSortLabel from "@mui/material/TableSortLabel";
// import Paper from "@mui/material/Paper";
// import { useState } from "react";

// const StyledTableCell = styled(TableCell)(({ theme }) => ({
//   [`&.${tableCellClasses.head}`]: {
//     backgroundColor: theme.palette.common.black,
//     color: theme.palette.common.white,
//   },
//   [`&.${tableCellClasses.body}`]: {
//     fontSize: 14,
//   },
// }));

// const StyledTableRow = styled(TableRow)(({ theme }) => ({
//   "&:nth-of-type(odd)": {
//     backgroundColor: theme.palette.action.hover,
//   },
//   // hide last border
//   "&:last-child td, &:last-child th": {
//     border: 0,
//   },
// }));

// function createData(name, calories, fat, carbs, protein) {
//   return { name, calories, fat, carbs, protein };
// }

// const rows = [
//   createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
//   createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
//   createData("Eclair", 262, 16.0, 24, 6.0),
//   createData("Cupcake", 305, 3.7, 67, 4.3),
//   createData("Gingerbread", 356, 16.0, 49, 3.9),
// ];

// // Function to handle sorting
// const handleSortRequest = (property, order, setOrder, orderBy, setOrderBy) => {
//   const isAscending = orderBy === property && order === "asc";
//   setOrder(isAscending ? "desc" : "asc");
//   setOrderBy(property);
// };

// // Modify the TableHead component to use the TableSortLabel component
// // and handle the sorting when the label is clicked
// export default function CustomizedTables() {
//   // Add state to keep track of the current sorting order
//   const [order, setOrder] = useState("asc");
//   const [orderBy, setOrderBy] = useState("calories");

//   return (
//     <TableContainer component={Paper}>
//       <Table sx={{ minWidth: 700 }} aria-label="customized table">
//         <TableHead>
//           <TableRow>
//             <StyledTableCell>
//               <TableSortLabel
//                 active={orderBy === "name"}
//                 direction={order}
//                 onClick={() =>
//                   handleSortRequest(
//                     "name",
//                     order,
//                     setOrder,
//                     orderBy,
//                     setOrderBy
//                   )
//                 }
//               >
//                 Dessert (100g serving)
//               </TableSortLabel>
//             </StyledTableCell>
//             <StyledTableCell
//               align="right"
//               sortDirection={orderBy === "calories" ? order : false}
//             >
//               <TableSortLabel
//                 active={orderBy === "calories"}
//                 direction={order}
//                 onClick={() =>
//                   handleSortRequest(
//                     "calories",
//                     order,
//                     setOrder,
//                     orderBy,
//                     setOrderBy
//                   )
//                 }
//               >
//                 Calories
//               </TableSortLabel>
//             </StyledTableCell>
//             <StyledTableCell
//               align="right"
//               sortDirection={orderBy === "fat" ? order : false}
//             >
//               <TableSortLabel
//                 active={orderBy === "fat"}
//                 direction={order}
//                 onClick={() =>
//                   handleSortRequest("fat", order, setOrder, orderBy, setOrderBy)
//                 }
//               >
//                 Fat
//               </TableSortLabel>
//             </StyledTableCell>
//             <StyledTableCell
//               align="right"
//               sortDirection={orderBy === "carbs" ? order : false}
//             >
//               <TableSortLabel
//                 active={orderBy === "carbs"}
//                 direction={order}
//                 onClick={() =>
//                   handleSortRequest(
//                     "carbs",
//                     order,
//                     setOrder,
//                     orderBy,
//                     setOrderBy
//                   )
//                 }
//               >
//                 Carbs
//               </TableSortLabel>
//             </StyledTableCell>
//             <StyledTableCell
//               align="right"
//               sortDirection={orderBy === "protein" ? order : false}
//             >
//               <TableSortLabel
//                 active={orderBy === "protein"}
//                 direction={order}
//                 onClick={() =>
//                   handleSortRequest(
//                     "protein",
//                     order,
//                     setOrder,
//                     orderBy,
//                     setOrderBy
//                   )
//                 }
//               >
//                 Protein&nbsp;(g)
//               </TableSortLabel>
//             </StyledTableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {rows
//             .slice()
//             .sort((a, b) =>
//               order === "asc"
//                 ? a[orderBy] > b[orderBy]
//                   ? 1
//                   : -1
//                 : b[orderBy] > a[orderBy]
//                 ? 1
//                 : -1
//             )
//             .map((row) => (
//               <StyledTableRow key={row.name}>
//                 <StyledTableCell component="th" scope="row">
//                   {row.name}
//                 </StyledTableCell>
//                 <StyledTableCell align="right">{row.calories}</StyledTableCell>
//                 <StyledTableCell align="right">{row.fat}</StyledTableCell>
//                 <StyledTableCell align="right">{row.carbs}</StyledTableCell>
//                 <StyledTableCell align="right">{row.protein}</StyledTableCell>
//               </StyledTableRow>
//             ))}
//         </TableBody>
//       </Table>
//     </TableContainer>
//   );
// }

import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import { RichTreeView } from "@mui/x-tree-view/RichTreeView";
import { TreeItem, treeItemClasses } from "@mui/x-tree-view/TreeItem";
import { Button, Stack, Typography } from "@mui/material";
import { useState } from "react";

const ITEMS = [
  {
    id: "1",
    label: "Main",
    children: [
      { id: "2", label: "Hello" },
      {
        id: "3",
        label: "Subtree with children",
        children: [
          { id: "6", label: "Hello" },
          {
            id: "7",
            label: "Sub-subtree with children",
            children: [
              { id: "9", label: "Child 1" },
              { id: "10", label: "Child 2" },
              { id: "11", label: "Child 3" },
            ],
          },
          { id: "8", label: "Hello" },
        ],
      },
      { id: "4", label: "World" },
      { id: "5", label: "Something something" },
    ],
  },
];

const StyledTreeItem = styled(TreeItem)(({ theme }) => ({
  color:
    theme.palette.mode === "light"
      ? theme.palette.grey[800]
      : theme.palette.grey[200],
  [`& .${treeItemClasses.content}`]: {
    borderRadius: theme.spacing(0.5),
    padding: theme.spacing(0.5, 1),
    margin: theme.spacing(0.2, 0),
    [`& .${treeItemClasses.label}`]: {
      fontSize: "0.8rem",
      fontWeight: 500,
    },
  },
  [`& .${treeItemClasses.iconContainer}`]: {
    borderRadius: "50%",
    backgroundColor:
      theme.palette.mode === "light"
        ? alpha(theme.palette.primary.main, 0.25)
        : theme.palette.primary.dark,
    color: theme.palette.mode === "dark" && theme.palette.primary.contrastText,
    padding: theme.spacing(0, 1.2),
  },
  [`& .${treeItemClasses.groupTransition}`]: {
    marginLeft: 15,
    paddingLeft: 18,
    borderLeft: `1px dashed ${alpha(theme.palette.text.primary, 0.4)}`,
  },
}));

export default function CustomStyling() {
  const [data, setData] = useState(ITEMS);
  const [lastSelectedItem, setLastSelectedItem] = useState(null);

  const handleItemSelectionToggle = (event, itemId, isSelected) => {
    if (isSelected) {
      setLastSelectedItem(itemId);
    }
  };

  const handleChildNodeAdd = () => {
    const newChildNode = {
      id: Math.random(),
      name: "Label" + Math.random(),
      children: [],
    };

    setData((prevData) => {
      const updatedData = JSON.parse(JSON.stringify(prevData));
      findAndAddChildNode(updatedData, lastSelectedItem, newChildNode);
      // dataLocal = updatedData;
      return updatedData;
    });
  };

  console.log(data);

  const findAndAddChildNode = (node, targetNodeId, childNode) => {
    if (node.id === targetNodeId) {
      node.children.push(childNode);
    } else if (Array.isArray(node.children)) {
      node.children.forEach((child) =>
        findAndAddChildNode(child, targetNodeId, childNode)
      );
    }
  };
  return (
    <Stack spacing={2}>
      <Button
        className="button"
        variant="contained"
        color="primary"
        onClick={() => handleChildNodeAdd()}
      >
        Add Node
      </Button>
      <Typography>
        {lastSelectedItem == null
          ? "No item selection recorded"
          : `Last selected item: ${lastSelectedItem}`}
      </Typography>

      <RichTreeView
        aria-label="customized"
        // defaultExpandedItems={["1"]}
        sx={{ overflowX: "hidden", minHeight: 270, flexGrow: 1, maxWidth: 300 }}
        slots={{ item: StyledTreeItem }}
        items={ITEMS}
        onItemSelectionToggle={handleItemSelectionToggle}
      />
    </Stack>
  );
}
