import axios from "axios";

const username = "user123";
const password = "pass123";
const encoded = btoa(username + ":" + password);

export const getAllFormInfo = async () => {
  try {
    const response = await axios.get(
      "http://localhost:8081/logbook/forminfo",
      // "http://192.168.7.28:8081/logbook/forminfo/Employee/versions/1",
      // "http://192.168.7.28:8081/logbook/forminfo/Azarul_TestLogbook/versions/1",
      // "http://192.168.7.28:8081/logbook/forminfo/BL-1-ULB-CLSFMT-01-00/versions/1",
      // "http://192.168.7.28:8081/logbook/forminfo/RM Preparation/versions/1",
      // "http://192.168.7.28:8081/logbook/forminfo/76231%20Fiama%20GBB%20P&A%20125gx6_x0009_/versions/1",
      // "http://192.168.7.25:9090/logbooks/76231%20Fiama%20GBB%20P&A%20125gx6_x0009_/1",
      // "http://192.168.7.25:9090/logbooks/All%20Fields/8",
      {
        headers: {
          Authorization: "Basic " + encoded,
        },
      }
    );
    return response.data.payload;
  } catch (error) {
    console.error("Error fetching forminfo with versions:", error);
    return null;
  }
};

export const getAllTransactions = async (
  jobId,
  activityId,
  selectedFormName,
  selectedVersion
) => {
  console.log(selectedFormName, selectedVersion);
  try {
    const response = await axios.get(
      "http://localhost:8081/logbook/forminfo/getalltransactions",
      {
        params: {
          jobId: jobId,
          activityId: activityId,
          formName: selectedFormName,
          formVersion: selectedVersion,
        },
        headers: {
          Authorization: "Basic " + encoded,
        },
      }
    );
    return response.data.payload;
  } catch (error) {
    console.error("Error fetching logbook Transactions", error);
    return null;
  }
};

export const getAllCellInfoByFormNameAndVersion = async (
  formName,
  versionNumber
) => {
  const url = `http://localhost:8081/logbook/forminfo/${formName}/versions/${versionNumber}`;
  // console.log(url);
  try {
    const response = await axios.get(
      // "http://localhost:8081/logbook/forminfo/76231%20Fiama%20GBB%20P&A%20125gx6_x0009_/versions/1",
      // "http://localhost:8081/logbook/forminfo/Dependent_Test/versions/1",
      // "http://localhost:8081/logbook/forminfo/BL-1-ULB-CLSFMT-01-00/versions/1",
      // "http://localhost:8081/logbook/forminfo/Azarul_TestLogbook/versions/1",
      // "http://localhost:8081/logbook/forminfo/Mespack-ULB-CLSFMT-02-00/versions/1",
      url,
      // "http://192.168.7.28:8081/logbook/forminfo/Employee/versions/1",
      // "http://192.168.7.28:8081/logbook/forminfo/Azarul_TestLogbook/versions/1",
      // "http://192.168.7.28:8081/logbook/forminfo/BL-1-ULB-CLSFMT-01-00/versions/1",
      // "http://192.168.7.28:8081/logbook/forminfo/RM Preparation/versions/1",
      // "http://192.168.7.28:8081/logbook/forminfo/76231%20Fiama%20GBB%20P&A%20125gx6_x0009_/versions/1",
      // "http://192.168.7.25:9090/logbooks/76231%20Fiama%20GBB%20P&A%20125gx6_x0009_/1",
      // "http://192.168.7.25:9090/logbooks/All%20Fields/8",
      {
        headers: {
          Authorization: "Basic " + encoded,
        },
      }
    );
    return response.data.payload;
  } catch (error) {
    console.error("Error fetching forminfo with versions:", error);
    return null;
  }
};

export const getQueryResult = async (body) => {
  try {
    const response = await axios.post(
      "http://localhost:8081/logbook/forminfo/getdropdownforquery",
      // "http://192.168.7.28:8081/logbook/forminfo/getresultforquery",
      // JSON.stringify(body),
      body,
      {
        headers: {
          Authorization: "Basic " + encoded,
          // Accept: "application/json",
          "Content-type": "text/plain",
        },
      }
    );
    return response.data.payload;
  } catch (error) {
    console.error("Error fetching dropdowns from SQL:", error);
    return null;
  }
};

export const getQueryResultForGlobalCellUpdate = async (body) => {
  try {
    const response = await axios.post(
      "http://localhost:8081/logbook/forminfo/getqueryresultforglobalcellupdate",
      // "http://192.168.7.28:8081/logbook/forminfo/getqueryresultforglobalcellupdate",
      // JSON.stringify(body),
      body,
      {
        headers: {
          Authorization: "Basic " + encoded,
          // Accept: "application/json",
          "Content-type": "text/plain",
        },
      }
    );
    return response.data.payload;
  } catch (error) {
    console.error(
      "Error fetching getqueryresultforglobalcellupdate() from SQL:",
      error
    );
    return null;
  }
};

export const getCellEditHistory = async (cellId, jobId, activityId) => {
  console.log(cellId, jobId, activityId);
  try {
    const response = await axios.get(
      "http://localhost:8081/logbook/forminfo/getcelledithistory",
      {
        params: {
          cellId: cellId,
          jobId: jobId,
          activityId: activityId,
        },
        headers: {
          Authorization: "Basic " + encoded,
        },
      }
    );
    return response.data.payload;
  } catch (error) {
    console.error("Error fetching CellEdited History", error);
    return null;
  }
};

export const SaveTransaction = async (requestBody) => {
  console.log(requestBody);
  try {
    const response = await axios.post(
      "http://localhost:8081/logbook/forminfo/savetransaction",
      requestBody,
      {
        headers: {
          Authorization: "Basic " + encoded,
          Accept: "application/json",
          // "Content-type": "text/plain",
        },
      }
    );
    // console.log(response.status);
    return response.status;
  } catch (error) {
    console.error("Error saving transaction data.", error);
    return null;
  }
};
