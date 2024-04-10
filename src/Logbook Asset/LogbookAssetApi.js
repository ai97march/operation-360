import axios from "axios";

const username = "user123";
const password = "pass123";
const encoded = btoa(username + ":" + password);

export const getAssetGroupsList = async () => {
  try {
    const response = await axios.get("http://localhost:8088/api/assetgroups", {
      headers: {
        Authorization: "Basic " + encoded,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching Asset Groups List with versions:", error);
    return null;
  }
};

export const getAllDepartments = async () => {
  try {
    const response = await axios.get(
      "http://localhost:8082/usermodule/getalldeptartments",
      {
        headers: {
          Authorization: "Basic " + encoded,
        },
      }
    );
    return response.data.payload;
  } catch (error) {
    console.error("Error fetching department list:", error);
    return null;
  }
};

export const getAllGroup = async () => {
  try {
    const response = await axios.get(
      "http://localhost:8082/usermodule/getallgroupdetails",
      {
        headers: {
          Authorization: "Basic " + encoded,
        },
      }
    );
    return response.data.payload;
  } catch (error) {
    console.error("Error fetching group list:", error);
    return null;
  }
};

export const getAssetGroupTree = async (assetGroupId) => {
  try {
    const response = await axios.get(
      `http://localhost:8088/api/assetGroups/${assetGroupId}`,
      {
        headers: {
          Authorization: "Basic " + encoded,
          // Accept: "application/json",
          "Content-type": "text/plain",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching Asset Group Tree:", error);
    return null;
  }
};
