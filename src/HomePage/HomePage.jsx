import React, { useState } from "react";
import Prebuilt from "../Prebuilt/Prebuilt";
import Headless from "../Headless/Headless";

<Prebuilt />;
<Headless />;

const HomePage = () => {
  const [activeComponent, setActiveComponent] = useState(null);
  const handlePrebuiltClick = () => {
    setActiveComponent("prebuilt");
  };

  const handleHeadlessClick = () => {
    setActiveComponent("headless");
  };

  return (
    <>
      <button onClick={handlePrebuiltClick}>Prebuilt</button>
      <button onClick={handleHeadlessClick}>Headless</button>

      {activeComponent === "prebuilt" && <Prebuilt />}
      {activeComponent === "headless" && <Headless />}
    </>
  );
};

export default HomePage;
