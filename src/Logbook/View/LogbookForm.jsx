import {
  Box,
  Button,
  Checkbox,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Modal,
  Paper,
  Select,
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
// import {
//   DatePicker,
//   DateTimePicker,
//   LocalizationProvider,
//   TimePicker,
// } from "@mui/x-date-pickers";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import React, { useEffect } from "react";
import { useState } from "react";
import { Calendar } from "primereact/calendar";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { useRef } from "react";
import {
  SaveTransaction,
  getAllCellInfoByFormNameAndVersion,
  getCellEditHistory,
  getQueryResult,
  getQueryResultForGlobalCellUpdate,
} from "../LogbookApi";
import Image from "../../Components/Shared/Image/Image.component";
import InputTextBox from "../../Components/Shared/TextBox/InputTextBox.component";
import TextBox from "../../Components/Shared/Label/Label.component";
import Dropdown from "../../Components/Shared/Dropdown/Dropdown.component";
import DateField from "../../Components/Shared/DateField/DateField.component";
import DateTimeField from "../../Components/Shared/DateField/DateTimeField.component";
import TimeField from "../../Components/Shared/DateField/TimeField.component";
import Label from "../../Components/Shared/Label/Label.component";
import CommentBox from "../../Components/Shared/CommentBox/CommentBox.component";
import NumberBox from "../../Components/Shared/NumberBox/NumberBox.component";
import { useLocation } from "react-router-dom";

// // creating the custom useInterval hook
// function useInterval(callback, delay) {
//   // Creating a ref
//   const savedCallback = useRef();

//   // To remember the latest callback .
//   useEffect(() => {
//     savedCallback.current = callback;
//   }, [callback]);

//   // combining the setInterval and
//   //clearInterval methods based on delay.
//   useEffect(() => {
//     function func() {
//       savedCallback.current();
//     }
//     if (delay !== null) {
//       let id = setInterval(func, delay);
//       return () => clearInterval(id);
//     }
//   }, [delay]);
// }

const onBooleanChange = (e, elem, gridDataTest, setGridDataTest) => {
  setGridDataTest((prevArray) => {
    return prevArray.map((item) => ({
      ...item,
      cellData: item.cellData.map((cell) => {
        if (cell.cellId === elem.cellId) {
          return {
            ...cell,
            tickVal: e.target.checked,
          };
        }
        return cell;
      }),
    }));
  });
};

const onDateChange = (e, elem, gridDataTest, setGridDataTest) => {
  // console.log("date picker event - ", e);
  // console.log("date picker event - ", e["$D"], e["$M"], e["$y"]);

  // Extract year, month, day, hours, minutes, and seconds components
  const year = String(e["$y"]);
  const month = String(e["$M"] + 1); // Months are zero-based
  const day = String(e["$D"]);
  // const hours = String(value.getHours()).padStart(2, "0");
  // const minutes = String(value.getMinutes()).padStart(2, "0");
  // const seconds = String(value.getSeconds()).padStart(2, "0");

  // Format the date components
  let formattedDate = "";
  if (elem.fieldType === "Date") {
    // Format the components into 'yyyy-MM-dd' format
    formattedDate = `${year}-${month}-${day}`;
  }

  setGridDataTest((prevArray) => {
    return prevArray.map((item) => ({
      ...item,
      cellData: item.cellData.map((cell) => {
        if (cell.cellId === elem.cellId) {
          return {
            ...cell,
            value: formattedDate,
          };
        }
        return cell;
      }),
    }));
  });
};

const onCommentChange = (e, elem, gridDataTest, setGridDataTest) => {
  setGridDataTest((prevArray) => {
    return prevArray.map((item) => ({
      ...item,
      cellData: item.cellData.map((cell) => {
        if (cell.cellId === elem.cellId) {
          return {
            ...cell,
            value: e.target.value,
          };
        }
        return cell;
      }),
    }));
  });
};

const onCellValueChange2 = async (e, elem, gridDataTest, setGridDataTest) => {
  // Update the cell value in the gridDataTest
  if (elem.fieldType === "Dropdown") {
    let updatedGridDataTest = gridDataTest.map((item) => ({
      ...item,
      cellData: item.cellData.map((cell) => {
        if (cell.cellId === elem.cellId) {
          return {
            ...cell,
            value: e.target.value,
          };
        }
        return cell;
      }),
    }));
    setGridDataTest(updatedGridDataTest);

    if (elem.globalSql) {
      // Get SQL query result
      const sql = await findSQL(elem.globalSql, elem, updatedGridDataTest);
      const sqltest = await getQueryResultForGlobalCellUpdate(sql);
      // console.log(sqltest);

      // Update cell values based on SQL test result
      updatedGridDataTest = updatedGridDataTest.map((item) => ({
        ...item,
        cellData: item.cellData.map((cell) => {
          if (
            sqltest.hasOwnProperty(cell.cellId) ||
            sqltest.hasOwnProperty(cell.aliasId)
          ) {
            return {
              ...cell,
              value:
                sqltest[cell.cellId] !== undefined
                  ? sqltest[cell.cellId]
                  : sqltest[cell.aliasId],
            };
          }
          return cell;
        }),
      }));
      setGridDataTest(updatedGridDataTest);
    }
    if (elem.dependentFields) {
      elem.dependentFields.map(async (item, index) => {
        if (item.depSql) {
          const sql = await findSQL(item.depSql, item, updatedGridDataTest);
          const sqlres = await getQueryResultForGlobalCellUpdate(sql);
          updatedGridDataTest = updatedGridDataTest.map((i) => ({
            ...i,
            cellData: i.cellData.map((cell) => {
              if (cell.cellId === item.cellId) {
                return {
                  ...cell,
                  value: Object.values(sqlres)[0],
                };
              }
              return cell;
            }),
          }));
          setGridDataTest(updatedGridDataTest);
        }
      });
    }
  }
};

const onCellValueChange = async (
  e,
  elem,
  gridDataTest,
  setGridDataTest,
  pollObj,
  setPollObj
) => {
  // Update the cell value in the gridDataTest
  let updatedGridDataTest = gridDataTest.map((item) => ({
    ...item,
    cellData: item.cellData.map((cell) => {
      if (cell.cellId === elem.cellId) {
        return {
          ...cell,
          value: e.target.value,
        };
      }
      return cell;
    }),
  }));
  setGridDataTest(updatedGridDataTest);

  if (elem.globalSql) {
    // Get SQL query result
    const sql = await findSQL(elem.globalSql, elem, updatedGridDataTest);
    const sqltest = await getQueryResultForGlobalCellUpdate(sql);
    // console.log(sqltest);

    // Update cell values based on SQL test result
    updatedGridDataTest = updatedGridDataTest.map((item) => ({
      ...item,
      cellData: item.cellData.map((cell) => {
        if (
          sqltest.hasOwnProperty(cell.cellId) ||
          sqltest.hasOwnProperty(cell.aliasId)
        ) {
          return {
            ...cell,
            value:
              sqltest[cell.cellId] !== undefined
                ? sqltest[cell.cellId]
                : sqltest[cell.aliasId],
          };
        }
        return cell;
      }),
    }));
    setGridDataTest(updatedGridDataTest);
  }
  if (elem.dependentFields) {
    elem.dependentFields.map(async (item, index) => {
      if (item.depSql) {
        const sql = await findSQL(item.depSql, item, updatedGridDataTest);
        const sqlres =
          item.fieldType === "Dropdown"
            ? await getQueryResult(sql)
            : await getQueryResultForGlobalCellUpdate(sql);
        // if (sqlres === null) {
        //   console.log("fieldType", item.fieldType);
        //   console.log("sql", sql);
        //   console.log("sqlres", sqlres);
        // }
        updatedGridDataTest = updatedGridDataTest.map((i) => ({
          ...i,
          cellData: i.cellData.map((cell) => {
            if (cell.cellId === item.cellId) {
              if (item.fieldType === "Dropdown") {
                return {
                  ...cell,
                  drpItems: sqlres,
                };
              } else {
                return {
                  ...cell,
                  value: sqlres === null ? " " : Object.values(sqlres)[0],
                };
              }
            }
            return cell;
          }),
        }));
        setGridDataTest(updatedGridDataTest);
      }
    });
  }

  pollObj.forEach(async (item, index) => {
    if (item.cell && item.cell.pollStartExpType) {
      let startExp = await findSQL(
        item.cell.pollStartExpression,
        item.cell,
        updatedGridDataTest
      );
      let stopExp = await findSQL(
        item.cell.pollStopExpression,
        item.cell,
        updatedGridDataTest
      );

      if (eval(startExp)) {
        setPollObj((prevPollObj) =>
          prevPollObj.map((poll) => {
            if (poll.cell.cellId === item.cell.cellId) {
              return {
                ...poll,
                autoRefresh: true,
                refreshInterval: poll.cell.refreshInterval,
              };
            }
            return poll;
          })
        );
        // setPollObj((prevPollObj) => ({
        //   ...prevPollObj,
        //   autoRefresh: true,
        //   refreshInterval: pollObj.cell.refreshInterval,
        //   // cell: element,
        // }));
      }
      if (eval(stopExp)) {
        setPollObj((prevPollObj) =>
          prevPollObj.map((poll) => {
            if (poll.cell.cellId === item.cell.cellId)
              return {
                ...poll,
                autoRefresh: false,
              };
            return poll;
          })
        );
        // setPollObj((prevPollObj) => ({
        //   ...prevPollObj,
        //   autoRefresh: false,
        //   // refreshInterval: pollObj.cell.refreshInterval,
        //   // cell: element,
        // }));
      }
    }
  });
};

const test = async (elem, setGridDataTest) => {
  if (elem.depSql !== "" && elem.depSql !== null) {
    // const res = await getQueryResult(elem.depSql.replace(/\n(?!\n)/g, " "));
    const res = await getQueryResult(elem.depSql);

    setGridDataTest((prevArray) => {
      return prevArray.map((item) => ({
        ...item,
        cellData: item.cellData.map((cell) => {
          if (cell.cellId === elem.cellId) {
            return {
              ...cell,
              drpItems: res,
            };
          }
          return cell;
        }),
      }));
    });

    console.log(res);
    // console.log(elem.drpItems);

    // setGridDataTest((prevArray) => {
    //   return prevArray.map((item) => ({
    //     ...item,
    //     cellData: item.cellData.map((cell) => {
    //       if (cell.cellId === elem.cellId) {
    //         return {
    //           ...cell,
    //           value: e.target.value,
    //         };
    //       }
    //       return cell;
    //     }),
    //   }));
    // });

    // updatedGridDataTest.map((i) => {
    //   i.cellData.map((j) => {
    //     if (
    //       sqltest.hasOwnProperty(j.cellId) ||
    //       sqltest.hasOwnProperty(j.aliasId)
    //     ) {
    //       let value =
    //         sqltest[j.cellId] !== undefined
    //           ? sqltest[j.cellId]
    //           : sqltest[j.aliasId];
    //       console.log(value);
    //     }
    //   });
    // });
  }
};

async function findSQL(sql, elem, gridData) {
  try {
    while (sql.includes("{{")) {
      let firstIndex = sql.indexOf("{{") + 2;
      let lastIndex = sql.indexOf("}}");
      //console.log(sql,'--',firstIndex,lastIndex);
      let cellId = sql.substring(firstIndex, lastIndex);
      //console.log(cellId);
      let cellValue = await findCellValue(cellId, elem, gridData);
      sql = sql
        .replace(cellId, cellValue === "'" + null + "'" ? "''" : cellValue)
        .replace("{{", "")
        .replace("}}", "");
    }
    console.log(elem.cellId + " final sql is:" + sql);
    return sql;
  } catch (error) {
    console.error("Error fetching SQL:", error);
    return "";
  }
}

function findCellValue(cellId, elem, gridData) {
  for (let rowNum = 0; rowNum < gridData.length; rowNum++) {
    let rowData = gridData[rowNum];

    for (let colNum = 0; colNum < rowData.cellData.length; colNum++) {
      let cid = rowData.cellData[colNum].cellId;
      if (cid === cellId) {
        if (rowData.cellData[colNum].fieldType === "Number") {
          return rowData.cellData[colNum].value;
        } else {
          return "'" + rowData.cellData[colNum].value + "'";
        }
      }
    }
  }
}

const handleSave = (
  e,
  gridDataTest,
  setRemarkDiag,
  transactionData,
  setCellChanges,
  setNewTransacData
  // gridDataCopy
) => {
  e.preventDefault();

  const newCellObj = {};
  gridDataTest.forEach((item) => {
    item.cellData.forEach((cell) => {
      if (cell.cellId !== null) {
        newCellObj[cell.cellId] = {
          ...(newCellObj[cell.cellId] || {}),
          remarks: cell.remarks || "NA",
          value: cell.value,
        };
      }
    });
  });
  // console.log("newCellObj", newCellObj);

  const newCellObjKeys = Object.keys(newCellObj);
  // console.log(newCellObjKeys);

  const cellValChanges = {};
  newCellObjKeys.forEach((item, index) => {
    if (
      newCellObj[item].value &&
      transactionData.logbookData[item].value !== newCellObj[item].value
    ) {
      cellValChanges[item] = {
        ...(cellValChanges[item] || {}),
        oldValue: transactionData.logbookData[item].value,
        newValue: newCellObj[item].value,
        remarks: "NA",
      };
    }
  });
  // console.log(cellValChanges);

  let rows = [];
  Object.keys(cellValChanges).forEach((item) => {
    rows.push(
      createCellChangesData(
        item,
        cellValChanges[item].oldValue,
        cellValChanges[item].newValue,
        cellValChanges[item].remarks
      )
    );
  });
  console.log(rows);
  setCellChanges(rows);
  setNewTransacData(newCellObj);
  // console.log(transactionData);
  setRemarkDiag(true);
  // Add code here to save newObject to the server or update the local state
};

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

function createData(transactionId, timestamp, userid, value, reason) {
  return { transactionId, timestamp, userid, value, reason };
}

const handleOpen = async (
  e,
  setOpen,
  setCellObj,
  elem,
  setCellHistoryRows,
  jobId,
  activityId
) => {
  setOpen(true);
  setCellObj(elem);
  let cell_history = await getCellEditHistory(elem.cellId, jobId, activityId);
  let rows = [];
  cell_history.forEach((item, index) => {
    rows.push(
      createData(
        item.transactionId,
        item.timestamp,
        item.userid,
        item.value,
        item.reason
      )
    );
  });
  setCellHistoryRows(rows);
  // console.log(rows);
};
const handleClose = (e, setOpen) => {
  setOpen(false);
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  // width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const onRemarksChange = (e, row, setCellChanges) => {
  setCellChanges((prevArray) => {
    return prevArray.map((item) => {
      if (item.cellId === row.cellId) {
        return { ...item, remarks: e.target.value };
      }
      return item;
    });
  });
};

const handleRemarkClose = (e, setRemarkDiag) => {
  setRemarkDiag(false);
};

function createCellChangesData(cellId, oldValue, newValue, remarks) {
  return { cellId, oldValue, newValue, remarks };
}

const handleSaveClose = async (
  e,
  cellChanges,
  setRemarkDiag,
  jobId,
  activityId,
  formName,
  versionNumber,
  userId,
  newTransacData
) => {
  // console.log(cellChanges);
  const tId = `T${new Date()
    .toISOString()
    .replace(/[-:T.Z]/g, "")
    .slice(0, 19)}`;
  // console.log(tId);

  // console.log(cellChanges);
  // console.log(newTransacData);

  cellChanges.forEach((key) => {
    newTransacData[key.cellId].remarks = key.remarks;
  });
  // console.log(newTransacData);

  const userRemarks = cellChanges.reduce(
    (acc, { cellId, oldValue, newValue }) => {
      if (!oldValue && newValue !== null)
        return acc + `You have entered ${newValue} in cell id ${cellId} `;
      else if (oldValue !== newValue)
        return (
          acc +
          `data updated from ${oldValue} to ${newValue} in cell id ${cellId} `
        );
      else return "please check";
    },
    ""
  );
  console.log(userRemarks);

  const obj = {
    transactionId: tId,
    jobId: jobId,
    activityId: activityId,
    formName: formName,
    formversion: versionNumber,
    logbookData: newTransacData,
    // jsonInfo: newTransacData,
    userId: userId,
    role: "NA",
    // remarks: "string",
    transactionTimestamp: new Date(),
    // cellAliasId: "string",
    userRemarks: userRemarks,
  };

  setRemarkDiag(false);
  const status = await SaveTransaction(obj);
  console.log(status);
};

// function LogbookForm({
//   jobId,
//   activityId,
//   userId,
//   formName,
//   versionNumber,
//   transactionData,
// }) {
function LogbookForm() {
  const { state } = useLocation();

  const jobId = state.jobId;
  const activityId = state.activityId;
  const userId = state.userId;
  const formName = state.formName;
  const versionNumber = state.versionNumber;
  const transactionData = state.transactionData;

  const [gridDataTest, setGridDataTest] = useState([]);
  const [colTot, setColTot] = useState();
  const [open, setOpen] = useState(false);
  const [cellObj, setCellObj] = useState({});
  const [remarkDiag, setRemarkDiag] = useState(false);
  const [cellHistoryRows, setCellHistoryRows] = useState([]);
  const [cellChanges, setCellChanges] = useState([]);
  const [newTransacData, setNewTransacData] = useState({});
  // const [pollObj, setPollObj] = useState([
  // {
  //   autoRefresh: false,
  //   refreshInterval: null,
  //   cell: null,
  // },
  // ]);
  const [pollObj, setPollObj] = useState([]);

  useEffect(() => {
    async function fetchData() {
      let data = await getAllCellInfoByFormNameAndVersion(
        formName,
        versionNumber
      );

      // Create an array of promises
      const promises = data.map(async (item) => {
        await Promise.all(
          item.cellData.map(async (element) => {
            if (
              element.dependent ||
              (element.depSql !== null && element.depSql.trim() !== "")
            ) {
              if (element.fieldType !== "API") {
                // console.log("element.depSql", element.depSql);
                let sql = await findSQL(element.depSql, element, data);
                if (sql) {
                  if (element.fieldType === "Dropdown") {
                    // console.log("cellId", element.cellId);
                    // console.log("dependent", element.dependent);
                    // console.log("element.depSql", element.depSql);
                    let sqlRes = await getQueryResult(sql);
                    element.drpItems = sqlRes;
                  } else if (element.fieldType === "Number") {
                    let sqlRes = await getQueryResultForGlobalCellUpdate(sql);
                    element.value = Object.values(sqlRes)[0];
                    // element.value = "45";
                    // if (sqlRes.length > 0) {
                    //   element.setNumVal(parseFloat(element.value));
                    // } else {
                    //   element.setNumVal(0.0);
                    // }
                  } else {
                    let sqlRes = await getQueryResultForGlobalCellUpdate(sql);
                    if (element.isExpression) {
                      let val = await findCellValue(
                        element.cellId,
                        element,
                        gridDataTest
                      );
                      element.value = eval(val);
                    } else {
                      if (sqlRes) {
                        element.value = Object.values(sqlRes)[0];
                      } else {
                        element.value = "123";
                      }
                      // console.log(
                      //   "Object.values(sqlRes)[0]",
                      //   Object.values(sqlRes)[0]
                      // );
                    }
                  }
                }
              } else {
                // String api = formCell.getApiUrl();
                // if(formCell.getApiUrl().contains("{{")) {
                // 	api = replaceBracWithValueforAPI(formCell.getApiUrl(), formModel);
                // }
                // formCell.setValue(getRestData(api, formCell.getApiBody(), formCell.getApiMethod()));
              }
              if (element.autoRefresh) {
                let newPollObj = element.pollStartExpType
                  ? {
                      autoRefresh: false,
                      refreshInterval: null,
                      cell: element,
                    }
                  : {
                      autoRefresh: true,
                      refreshInterval: element.refreshInterval,
                      cell: element,
                    };
                setPollObj((prevPollObj) => [...prevPollObj, newPollObj]);
                // setPollObj((prevPollObj) => ({
                //   ...prevPollObj,
                //   // autoRefresh: true,
                //   // refreshInterval: element.refreshInterval,
                //   cell: element,
                // }));
              }
            }
          })
        );
      });

      // // Wait for all promises to complete before updating state
      await Promise.all(promises);

      // for (const item of data) {
      //   for (const element of item.cellData) {
      //     if (element.depSql !== "" && element.depSql !== null) {
      //       let res = await getQueryResult(element.depSql);
      //       element.drpItems = res;
      //     }
      //   }
      // }
      // console.log("transactionData", transactionData);
      if (transactionData) {
        data = data.map((item) => ({
          ...item,
          cellData: item.cellData.map((cell) => {
            if (transactionData.logbookData.hasOwnProperty(cell.cellId)) {
              if (transactionData.logbookData[cell.cellId].value) {
                return {
                  ...cell,
                  value: transactionData.logbookData[cell.cellId].value,
                };
              }
            }
            return cell;
          }),
        }));
      }
      // data.forEach((item) => {
      //   item.cellData.forEach((cell) => {
      //     if (transactionData.jsonInfo.hasOwnProperty(cell.cellId)) {
      //       if (transactionData.jsonInfo[cell.cellId].value) {
      //         console.log(transactionData.jsonInfo[cell.cellId].value);
      //       }
      //     }
      //   });
      // });
      setGridDataTest(data);
      // setGridDataCopy(data);
      setColTot(() =>
        data[0].cellData.reduce((sum, elem) => sum + elem.colsSpan, 0)
      );
    }
    fetchData();
  }, []);

  // useInterval(
  //   async () => {
  //     let sql = await findSQL(pollObj.cell.depSql, pollObj.cell, gridDataTest);
  //     let sqlRes = await getQueryResultForGlobalCellUpdate(sql);
  //     // console.log("sql res", sqlRes);
  //     setGridDataTest((prevArray) => {
  //       return prevArray.map((item) => ({
  //         ...item,
  //         cellData: item.cellData.map((cell) => {
  //           if (cell.cellId === pollObj.cell.cellId) {
  //             return {
  //               ...cell,
  //               value: Object.values(sqlRes)[0],
  //             };
  //           }
  //           return cell;
  //         }),
  //       }));
  //     });
  //   },
  //   // Passing in the delay parameter. null stops the counter.
  //   pollObj.autoRefresh ? pollObj.refreshInterval * 1000 : null
  // );

  console.log(gridDataTest);

  const containerStyle = {
    display: "grid",
    gridTemplateColumns: `repeat(${colTot}, 1fr)`,
    gap: "2px",
    position: "relative",
    height: "100px", // Set an appropriate height
  };

  const convertCssStringToMuiStyles = (cssString) => {
    if (!cssString) {
      return {};
    }
    const cssArray = cssString.split(";").map((style) => style.trim());
    const muiStyles = {};

    cssArray.forEach((style) => {
      const [property, value] = style.split(":").map((part) => part.trim());
      if (property && value) {
        const camelCaseProperty = property.replace(
          /-([a-z])/g,
          (match, letter) => letter.toUpperCase()
        );
        muiStyles[camelCaseProperty] = value;
      }
    });

    return muiStyles;
  };

  // const cssString =
  //   "text-align:center; background:#0e508a ; font-weight:bold;color:white";
  // const muiStyles = convertCssStringToMuiStyles(cssString);

  // // Now muiStyles contains the converted styles
  // console.log(muiStyles);

  return (
    <>
      <Grid style={containerStyle}>
        {gridDataTest.map((item, index) =>
          item.cellData.map((elem, ind) => (
            <Paper
              key={elem.cellId}
              style={{
                padding: "20px",
                gridColumn: `span ${elem.colsSpan}`,
                gridRow: `span ${elem.rowSpan}`,
                ...convertCssStringToMuiStyles(elem.cellCss),
              }}
            >
              {transactionData && elem.editable && (
                <AccessTimeIcon
                  onClick={(e) =>
                    handleOpen(
                      e,
                      setOpen,
                      setCellObj,
                      elem,
                      setCellHistoryRows,
                      jobId,
                      activityId
                    )
                  }
                />
              )}
              {elem.fieldType === "Image" && (
                // <img
                //   // src={`/resources/logbookImages/${elem.imagePath}`}
                //   src="D:/ReactSideBar/my-sidebar/public/logo512.png"
                //   height={elem.imgHeight}
                //   width={elem.imgWidth}
                //   alt="NA"
                //   style={{ display: "block" }}
                // />
                <Image height={elem.imgHeight} width={elem.imgWidth} />
              )}
              {!elem.editable && elem.fieldType !== "Image" && (
                // <Typography title={elem.aliasId} variant="h6">
                //   {/* {elem.dependent || elem.pollable ? elem.value : elem.aliasId} */}
                //   {elem.value ? elem.value : elem.aliasId}
                // </Typography>
                <Label
                  // title={elem.aliasId}
                  // value={elem.value}
                  elem={elem}
                  pollObj={pollObj}
                  setPollObj={setPollObj}
                  gridDataTest={gridDataTest}
                  setGridDataTest={setGridDataTest}
                  findSQL={findSQL}
                  getQueryResultForGlobalCellUpdate={
                    getQueryResultForGlobalCellUpdate
                  }
                />
              )}
              {elem.fieldType === "API" && (
                <Typography title={elem.aliasId} variant="h6">
                  {elem.value}
                </Typography>
              )}
              {elem.editable && elem.fieldType === "Text" && (
                // <TextField
                //   fullWidth
                //   label={elem.aliasId}
                //   // value={elem.value ? elem.value : ""}
                //   defaultValue={elem.value ? elem.value : ""}
                //   // onChange={(e) => onTextValueChange(e, elem)}
                //   // onBlur={() => onCellValueChange(col)}
                //   type="text"
                //   disabled={elem.disabled}
                //   required={elem.requiredfield}
                // />
                <InputTextBox
                  label={elem.aliasId}
                  value={elem.value}
                  disabled={elem.disabled}
                  required={elem.requiredfield}
                />
              )}
              {elem.editable && elem.fieldType === "CommentBox" && (
                // <TextField
                //   fullWidth
                //   label={elem.aliasId}
                //   multiline
                //   rows={4} // Adjust the number of rows as needed
                //   defaultValue={elem.value ? elem.value : ""}
                //   // value={elem.value ? elem.value : ""}
                //   onChange={(e) =>
                //     onCommentChange(e, elem, gridDataTest, setGridDataTest)
                //   }
                //   // onBlur={() => onCellValueChange(col)}
                //   required={elem.requiredfield}
                // />
                <CommentBox
                  label={elem.aliasId}
                  value={elem.value}
                  onCommentChange={(e) =>
                    onCommentChange(e, elem, gridDataTest, setGridDataTest)
                  }
                  required={elem.requiredfield}
                />
              )}
              {elem.editable && elem.fieldType === "Number" && (
                // <TextField
                //   fullWidth
                //   label={elem.aliasId}
                //   type="number" // Use type "text" to allow input of numbers and decimals
                //   defaultValue={elem.value ? elem.value : ""}
                //   // value={elem.numVal ? elem.numVal : ""}
                //   // onChange={handleInputChange}
                //   // onBlur={() => onCellValueChange(col)}
                //   disabled={elem.disabled}
                //   required={elem.requiredfield}
                //   InputProps={{
                //     inputProps: {
                //       max: elem.maxVal,
                //       min: elem.minVal,
                //     },
                //   }}
                // />
                <NumberBox
                  label={elem.aliasId}
                  value={elem.value}
                  disabled={elem.disabled}
                  required={elem.requiredfield}
                  max={elem.maxVal}
                  min={elem.minVal}
                />
              )}
              {elem.editable && elem.fieldType === "Dropdown" && (
                // <FormControl fullWidth>
                //   <InputLabel>Select One</InputLabel>
                //   <Select
                //     value={elem.value || ""} // Make sure to handle null values appropriately
                //     label="Select One"
                //     onChange={(e) =>
                //       onCellValueChange(
                //         e,
                //         elem,
                //         gridDataTest,
                //         setGridDataTest,
                //         pollObj,
                //         setPollObj
                //       )
                //     }
                //     title={elem.aliasId}
                //     disabled={elem.disabled}
                //     required={elem.requiredfield}
                //     autoWidth
                //     // onClick={() => test(elem, setGridDataTest)}
                //   >
                //     {/* <MenuItem value="" disabled>
                //       Select One
                //     </MenuItem> */}
                //     {elem.drpItems.map((itm) => (
                //       <MenuItem key={itm.itemValue} value={itm.itemValue}>
                //         {itm.itemLabel}
                //       </MenuItem>
                //     ))}
                //   </Select>
                // </FormControl>
                <Dropdown
                  elem={elem}
                  onCellValueChange={(e) =>
                    onCellValueChange(
                      e,
                      elem,
                      gridDataTest,
                      setGridDataTest,
                      pollObj,
                      setPollObj
                    )
                  }
                />
              )}
              {elem.editable && elem.fieldType === "Date" && (
                // <LocalizationProvider dateAdapter={AdapterDayjs}>
                //   <DatePicker
                //     label="Date picker"
                //     defaultValue={dayjs(elem.date)}
                //     // value={dayjs(elem.date) || null}
                //     onChange={(e) =>
                //       onDateChange(e, elem, gridDataTest, setGridDataTest)
                //     }
                //     // renderInput={(params) => (
                //     //   <TextField {...params} required={elem.requiredfield} />
                //     // )}
                //     disabled={!elem.editable || elem.disabled}
                //     format={
                //       elem.datepattern.trim() === ""
                //         ? "DD-MM-YYYY"
                //         : elem.datepattern.replaceAll("/", "-").toUpperCase()
                //     }
                //     openTo="day"
                //   />
                // </LocalizationProvider>
                // // <Calendar
                // //   value={elem.date}
                // //   onChange={(e) =>
                // //     onDateChange(e, elem, gridDataTest, setGridDataTest)
                // //   }
                // //   showIcon
                // // />
                <DateField
                  elem={elem}
                  onDateChange={(e) =>
                    onDateChange(e, elem, gridDataTest, setGridDataTest)
                  }
                />
              )}
              {elem.editable && elem.fieldType === "DateTime" && (
                // <LocalizationProvider dateAdapter={AdapterDayjs}>
                //   <DateTimePicker
                //     defaultValue={dayjs(elem.date) || null}
                //     label="Date picker"
                //     // value={dayjs(elem.date) || null}
                //     // onChange={handleChange}
                //     // renderInput={(params) => <TextField {...params} />}
                //     required={elem.requiredfield}
                //     disabled={!elem.editable || elem.disabled}
                //     openTo="year"
                //     format={
                //       elem.datepattern.trim() === ""
                //         ? "DD-MM-YYYY HH:mm:ss"
                //         : elem.datepattern
                //             .split(" ")[0]
                //             .toUpperCase()
                //             .replaceAll("/", "-")
                //             .concat(" HH:mm:ss")
                //     }
                //   />
                // </LocalizationProvider>
                <DateTimeField elem={elem} />
              )}
              {elem.fieldType === "Time" && (
                // <LocalizationProvider dateAdapter={AdapterDayjs}>
                //   <TimePicker
                //     defaultValue={dayjs(elem.date) || null}
                //     // value={dayjs(elem.date) || null}
                //     // onChange={handleChange}
                //     // renderInput={(params) => <TextField {...params} />}
                //     required={elem.requiredfield}
                //     disabled={!elem.editable || elem.disabled}
                //     openTo="hours"
                //     format="HH:mm"
                //   />
                // </LocalizationProvider>
                <TimeField elem={elem} />
              )}

              {elem.editable && elem.fieldType === "Boolean" && (
                <Checkbox
                  title={elem.aliasId}
                  checked={elem.tickVal || false}
                  onChange={(e) =>
                    onBooleanChange(e, elem, gridDataTest, setGridDataTest)
                  }
                  required={elem.requiredfield}
                  // disabled={!elem.editable || elem.disabled}
                />
              )}
            </Paper>
          ))
        )}
        <div style={{ margin: "20px" }}>
          <Button
            variant="contained"
            color="primary"
            // endIcon={values.isPlay ? <PauseIcon /> : <PlayArrowIcon />}
            onClick={(e) =>
              handleSave(
                e,
                gridDataTest,
                setRemarkDiag,
                transactionData,
                setCellChanges,
                setNewTransacData
                // gridDataCopy
              )
            }
          >
            Save
          </Button>
        </div>
      </Grid>
      <Modal
        open={open}
        onClose={(e) => handleClose(e, setOpen)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        disableScrollLock={true}
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Change History for {cellObj.aliasId} {cellObj.cellId}
          </Typography>
          {/* <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </Typography> */}
          <TableContainer component={Paper} sx={{ mt: 2 }}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>TransactionId</StyledTableCell>
                  <StyledTableCell align="right">Timestamp</StyledTableCell>
                  <StyledTableCell align="right">User</StyledTableCell>
                  <StyledTableCell align="right">Value</StyledTableCell>
                  <StyledTableCell align="right">Change Reason</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cellHistoryRows.map((row) => (
                  <StyledTableRow key={row.transactionId}>
                    <StyledTableCell component="th" scope="row">
                      {row.transactionId}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {row.timestamp}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {row.userid}
                    </StyledTableCell>
                    <StyledTableCell align="right">{row.value}</StyledTableCell>
                    <StyledTableCell align="right">
                      {row.reason}
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Modal>
      <Modal
        open={remarkDiag}
        onClose={(e) => handleRemarkClose(e, setRemarkDiag)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        disableScrollLock={true}
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Confirm Changes
          </Typography>
          {/* <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </Typography> */}
          <TableContainer component={Paper} sx={{ mt: 2 }}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Cell Id</StyledTableCell>
                  <StyledTableCell align="right">Old Value</StyledTableCell>
                  <StyledTableCell align="right">New Value</StyledTableCell>
                  <StyledTableCell align="right">Remarks</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cellChanges.map((row) => (
                  <StyledTableRow key={row.cellId}>
                    <StyledTableCell component="th" scope="row">
                      {row.cellId}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {row.oldValue}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {row.newValue}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      <TextField
                        label="Enter Remarks" //{elem.aliasId}
                        // value={elem.value ? elem.value : ""}
                        defaultValue={row.remarks ? row.remarks : ""}
                        multiline
                        rows={1}
                        variant="outlined"
                        onChange={(e) =>
                          onRemarksChange(e, row, setCellChanges)
                        }
                        // onBlur={() => onCellValueChange(col)}
                        type="text"
                        //   disabled={elem.disabled}
                        //   required={elem.requiredfield}
                      />
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
            <Button
              variant="contained"
              color="primary"
              // endIcon={values.isPlay ? <PauseIcon /> : <PlayArrowIcon />}
              onClick={(e) =>
                handleSaveClose(
                  e,
                  // gridDataTest,
                  // setRemarkDiag,
                  // transactionData,
                  // setCellChanges
                  cellChanges,
                  setRemarkDiag,
                  jobId,
                  activityId,
                  formName,
                  versionNumber,
                  userId,
                  newTransacData
                  // gridDataCopy
                )
              }
            >
              Save & Close
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
}

export default LogbookForm;
