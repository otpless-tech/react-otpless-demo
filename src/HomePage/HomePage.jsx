import React, { useState } from "react";
import Prebuilt from "../Prebuilt/Prebuilt";
import Headless from "../Headless/Headless";

const HomePage = () => {
  const [activeComponent, setActiveComponent] = useState(null);

  const handlePrebuiltClick = () => {
    setActiveComponent("prebuilt");
  };

  const handleHeadlessClick = () => {
    setActiveComponent("headless");
  };

  return (
    <div
      className="buttons"
      style={{
        textAlign: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "10px",
        padding: "10px",
      }}
    >
      <button
        style={{
          margin: "0px 10px",
          padding: "12px 24px",
          borderRadius: "5px",
          fontWeight: "bold",
          border: "none",
          cursor: "pointer",
          fontSize: "16px",
          transition: "background-color 0.3s",
          boxShadow: "0px 2px 3px 0px",
        }}
        onClick={handlePrebuiltClick}
      >
        Prebuilt
      </button>
      <button
        style={{
          margin: "0px 10px",
          padding: "12px 24px",
          borderRadius: "5px",
          fontWeight: "bold",
          border: "none",
          cursor: "pointer",
          fontSize: "16px",
          transition: "background-color 0.3s",
          boxShadow: "0px 2px 3px 0px",
        }}
        onClick={handleHeadlessClick}
      >
        Headless
      </button>

      {activeComponent === "prebuilt" && <Prebuilt />}
      {activeComponent === "headless" && <Headless />}
    </div>
  );
};

export default HomePage;
