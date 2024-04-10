import { Typography } from "@mui/material";
import React, { useEffect, useRef } from "react";

// creating the custom useInterval hook
function useInterval(callback, delay) {
  // Creating a ref
  const savedCallback = useRef();

  // To remember the latest callback .
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // combining the setInterval and
  //clearInterval methods based on delay.
  useEffect(() => {
    function func() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(func, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

function Label({
  elem,
  pollObj,
  setPollObj,
  gridDataTest,
  setGridDataTest,
  findSQL,
  getQueryResultForGlobalCellUpdate,
}) {
  let cellObj = pollObj.find((item) => elem.cellId === item.cell.cellId);
  if (cellObj === undefined)
    cellObj = {
      autoRefresh: false,
      refreshInterval: null,
      cell: null,
    };

  useInterval(
    async () => {
      let sql = await findSQL(cellObj.cell.depSql, cellObj.cell, gridDataTest);
      let sqlRes = await getQueryResultForGlobalCellUpdate(sql);
      // console.log("sql res", sqlRes);
      setGridDataTest((prevArray) => {
        return prevArray.map((item) => ({
          ...item,
          cellData: item.cellData.map((cell) => {
            if (cell.cellId === cellObj.cell.cellId) {
              return {
                ...cell,
                value: Object.values(sqlRes)[0],
              };
            }
            return cell;
          }),
        }));
      });
    },
    // Passing in the delay parameter. null stops the counter.
    cellObj.autoRefresh ? cellObj.refreshInterval * 1000 : null
  );

  return (
    <>
      <Typography title={elem.aliasId} variant="h6">
        {/* {elem.dependent || elem.pollable ? elem.value : elem.aliasId} */}
        {elem.value ? elem.value : elem.aliasId}
      </Typography>
    </>
  );
}

export default Label;
