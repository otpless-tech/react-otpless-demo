import React, { useEffect, useState } from "react";

const Prebuilt = () => {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    // Dynamically load OTPLESS SDK script
    const script = document.createElement("script");
    script.id = "otpless-sdk";
    script.type = "text/javascript";
    script.src = "https://otpless.com/v2/auth.js";
    script.setAttribute("data-appid", "RM2I31PAOMTTAJ0UGFLP"); // Replace YOUR_APP_ID with your actual app ID
    document.head.appendChild(script);

    // Initialize OTPLESS callback function
    window.otpless = (otplessUser) => {
      // Set user information state
      setUserInfo(otplessUser);
    };
  }, []);

  const copyResponse = () => {
    // Copy response to clipboard
    navigator.clipboard.writeText(JSON.stringify(userInfo)).then(() => {
      alert("Response copied to clipboard!");
    });
  };

  return (
    <div style={{ display: "flex" }}>
      {/* Div element to display the login page */}
      <div id="otpless-login-page"></div>

      {/* Display user information */}
      {userInfo && (
        <div style={{ marginLeft: "20px", overflow: "auto" }}>
          <h2>User Information</h2>
          <button onClick={copyResponse}>Copy Response</button>
          <div
            style={{
              maxHeight: "300px",
              maxWidth: "400px",
              overflowX: "auto",
              overflowY: "auto",
              border: "1px solid #ccc",
              boxShadow: "0px 2px 3px 0px #ccc",
              borderRadius: "10px",
            }}
          >
            <pre>{JSON.stringify(userInfo, null, 2)}</pre>
          </div>
        </div>
      )}
    </div>
  );
};

export default Prebuilt;
