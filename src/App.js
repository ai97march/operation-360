// import logo from './logo.svg';
// import './App.css';

import { Navigate, Route, Routes } from "react-router-dom";
// import LogbookView from "./Logbook/View/LogBookView";
// import LogBookSelection from "./Logbook/View/LogBookSelection";
// import LogbookForm from "./Logbook/View/LogbookForm";
import LogbookAsset from "./Logbook Asset/LogbookAsset";
import AssetMaster from "./Logbook Asset/AssetMaster";
import JobAssign from "./JobAssign/JobAssign";
import JobPerformer from "./JobPerformer/JobPerformer";
// import ActivityDetails from "./JobAssign/ActivityDetails";
// import Test from "./Test";
import JobReviewer from "./JobReviewer/JobReviewer";
import SelfJobAssign from "./SelfJobAssign/SelfJobAssign";

function App() {
  return (
    <div className="App">
      <Routes>
        {/* <Route exact path="/" element={<LogBookSelection />} />
        <Route path="/LogbookView" element={<LogbookForm />} /> */}
        <Route path="/LogbookAsset" element={<LogbookAsset />} />
        <Route path="/AssetMaster" element={<AssetMaster />} />
        <Route path="/JobAssign" element={<JobAssign />} />
        <Route path="/JobPerformer" element={<JobPerformer />} />
        <Route path="/JobReviewer" element={<JobReviewer />} />
        <Route path="/SelfJob" element={<SelfJobAssign />} />
        {/* <Route path="/Test" element={<Test />} /> */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;
