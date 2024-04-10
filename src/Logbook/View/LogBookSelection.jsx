import { Button, MenuItem, Select, TextField } from "@mui/material";
import React, { useEffect, useState, version } from "react";
import LogbookForm from "./LogbookForm";
import { useNavigate } from "react-router-dom";
import Dropdown from "../../Components/Shared/Dropdown/Dropdown.component";
import { getAllFormInfo, getAllTransactions } from "../LogbookApi";

function LogBookSelection() {
  const navigate = useNavigate();
  const [formMap, setFormMap] = useState(new Map());
  const [selectedFormName, setSelectedFormName] = useState("");
  const [selectedVersion, setSelectedVersion] = useState("");
  const [jobId, setJobId] = useState("AJ20240220163745389");
  const [activityId, setActivityId] = useState("AA20240220163745889");
  const [userId, setUserId] = useState("azarul.islam@greenwave.co.in");
  // const [versionList, setVersionList] = useState([]);
  const [transactionData, setTransactionData] = useState({});

  const handleFormNameChange = (event) => {
    setSelectedFormName(event.target.value);
    setSelectedVersion("");
    // setOpenLogbook(false);
  };

  const handleVersionChange = (event) => {
    setSelectedVersion(event.target.value);
  };

  const handleJobIdChange = (event) => {
    setJobId(event.target.value);
  };

  const handleActivityIdChange = (event) => {
    setActivityId(event.target.value);
  };

  const handleUserIdChange = (event) => {
    setUserId(event.target.value);
  };

  const handleSave = async (event) => {
    let data = await getAllTransactions(
      jobId,
      activityId,
      selectedFormName,
      selectedVersion
    );
    setTransactionData(data[data.length - 1]);
    if (selectedFormName && selectedVersion) {
      //   setOpenLogbook(true);
      navigate("/LogbookView", {
        state: {
          jobId: jobId,
          activityId: activityId,
          userId: userId,
          formName: selectedFormName,
          versionNumber: selectedVersion,
          transactionData: data[data.length - 1],
        },
      });
    }
  };

  const versions = selectedFormName
    ? formMap.get(selectedFormName).map((form) => {
        return {
          itemLabel: form.versionNumber,
          itemValue: form.versionNumber,
        };
      })
    : [];

  useEffect(() => {
    async function fetchData() {
      let data = await getAllFormInfo();
      const map = new Map();

      data.forEach((form) => {
        const { formName } = form;
        if (!map.has(formName)) {
          map.set(formName, [form]);
        } else {
          map.get(formName).push(form);
        }
      });
      setFormMap(map);
    }
    fetchData();
  }, []);

  return (
    <>
      <div style={{ margin: "10px" }}>
        <TextField
          label="Enter Job ID" //{elem.aliasId}
          value={jobId}
          //   defaultValue={elem.value ? elem.value : ""}
          variant="outlined"
          onChange={(e) => handleJobIdChange(e)}
          // onBlur={() => onCellValueChange(col)}
          type="text"
          //   disabled={elem.disabled}
          //   required={elem.requiredfield}
        />
      </div>
      <div style={{ margin: "10px" }}>
        <TextField
          label="Enter Activity ID" //{elem.aliasId}
          value={activityId}
          //   defaultValue={elem.value ? elem.value : ""}
          variant="outlined"
          onChange={(e) => handleActivityIdChange(e)}
          // onBlur={() => onCellValueChange(col)}
          type="text"
          //   disabled={elem.disabled}
          //   required={elem.requiredfield}
        />
      </div>
      <div style={{ margin: "10px" }}>
        <TextField
          label="Enter User ID" //{elem.aliasId}
          value={userId}
          //   defaultValue={elem.value ? elem.value : ""}
          variant="outlined"
          onChange={(e) => handleUserIdChange(e)}
          // onBlur={() => onCellValueChange(col)}
          type="text"
          //   disabled={elem.disabled}
          //   required={elem.requiredfield}
        />
      </div>
      {/* <div style={{ margin: "10px" }}>
        <Select
          value={selectedFormName}
          onChange={handleFormNameChange}
          displayEmpty
          autoWidth
        >
          <MenuItem value="" disabled>
            Select Form Name
          </MenuItem>
          {[...formMap.keys()].map((formName) => (
            <MenuItem key={formName} value={formName}>
              {formName}
            </MenuItem>
          ))}
        </Select>
      </div> */}
      <div style={{ margin: "10px" }}>
        <Dropdown
          elem={{
            value: selectedFormName,
            disabled: false,
            aliasId: "",
            requiredfield: false,
            displayEmpty: true,
            drpItems: [
              ...formMap.keys().map((formName) => {
                return { itemLabel: formName, itemValue: formName };
              }),
            ],
            autoWidth: true,
            fullWidth: true,
            show: true,
            labelStr: "Select Form Name",
          }}
          onCellValueChange={(e) => handleFormNameChange(e)}
        />
      </div>
      {/* <div style={{ margin: "10px" }}>
        <Select
          value={selectedVersion}
          onChange={handleVersionChange}
          displayEmpty
          autoWidth
          disabled={!selectedFormName}
        >
          <MenuItem value="" disabled>
            Select Version Number
          </MenuItem>
          {versions.map((version) => (
            <MenuItem key={version} value={version}>
              {version}
            </MenuItem>
          ))}
        </Select>
      </div> */}
      <div style={{ margin: "10px" }}>
        <Dropdown
          elem={{
            value: selectedVersion,
            disabled: !selectedFormName,
            aliasId: "",
            requiredfield: false,
            displayEmpty: true,
            drpItems: versions,
            autoWidth: true,
            fullWidth: true,
            show: true,
            labelStr: "Select Version Number",
          }}
          onCellValueChange={(e) => handleVersionChange(e)}
        />
      </div>
      <div style={{ margin: "20px" }}>
        <Button
          variant="contained"
          color="primary"
          // endIcon={values.isPlay ? <PauseIcon /> : <PlayArrowIcon />}
          onClick={(e) => handleSave(e)}
        >
          Submit
        </Button>
      </div>
      {/* <div style={{ marginTop: "20px" }}>
        {openLogbook && (
          <LogbookForm
            jobId={jobId}
            activityId={activityId}
            userId={userId}
            formName={selectedFormName}
            versionNumber={selectedVersion}
            transactionData={transactionData}
          />
        )}
      </div> */}
    </>
  );
}

export default LogBookSelection;
