import axios from "axios";

const username = "user123";
const password = "pass123";
const encoded = btoa(username + ":" + password);

export const getAllTask = async () => {
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
