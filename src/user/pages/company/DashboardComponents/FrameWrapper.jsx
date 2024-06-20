import React from "react";

const FrameWrapper = ({ gdrivefolder }) => {
  return (
    <div
      style={{
        position: "relative",
        // paddingBottom: "56.25%",
        paddingBottom: "26.25%",
        height: 0,
        overflow: "hidden",
        maxWidth: "100%",
      }}
    >
      <iframe
        frameBorder="0"
        src={`https://drive.google.com/embeddedfolderview?id=${gdrivefolder}#list`}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default FrameWrapper;
