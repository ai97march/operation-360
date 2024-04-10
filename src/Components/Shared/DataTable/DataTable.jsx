import React from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Box, Typography } from "@mui/material";

const DataTable = ({ property }) => {
  return (
    <Box m="20px">
      <Box mb="30px">
        <Typography
          variant="h3"
          color="Black"
          fontWeight="bold"
          sx={{ m: "0 0 5px 0", display: "flex", justifyContent: "center" }}
        >
          Asset
        </Typography>
      </Box>
      <Box
        m="20px 0 0 0"
        // height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
            color: "white !important",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: "#94e2cd",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "#3e4396",
            color: "White",
            borderBottom: "none",
          },
          "& .MuiDataGrid-withBorderColor": {
            backgroundColor: "#3e4396",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: "#1F2A40",
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: "#3e4396",
          },
          "& .MuiCheckbox-root": {
            color: "#b7ebde !important",
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: "#e0e0e0 !important",
          },
        }}
      >
        <DataGrid
          rows={property.assetGroupList || []}
          columns={property.columns}
          // slots={{
          //   toolbar: GridToolbar,
          // }}
          onCellClick={property.handleOnCellClick}
        ></DataGrid>
      </Box>
    </Box>
  );
};

export default DataTable;
