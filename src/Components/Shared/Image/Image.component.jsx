import React from "react";

function Image({ height, width }) {
  return (
    <>
      <img
        // src={`/resources/logbookImages/${elem.imagePath}`}
        src="D:/ReactSideBar/my-sidebar/public/logo512.png"
        height={height}
        width={width}
        alt="NA"
        style={{ display: "block" }}
      />
    </>
  );
}

export default Image;
