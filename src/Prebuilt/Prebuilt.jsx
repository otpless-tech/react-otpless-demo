import React, { useEffect, useState } from "react";

const Prebuilt = () => {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.id = "otpless-sdk";
    script.type = "text/javascript";
    script.src = "https://otpless.com/v2/auth.js";
    script.setAttribute("data-appid", "RM2I31PAOMTTAJ0UGFLP");
    document.head.appendChild(script);

    window.otpless = (otplessUser) => {
      setUserInfo(otplessUser);
    };
  }, []);

  const copyResponse = () => {
    navigator.clipboard.writeText(JSON.stringify(userInfo)).then(() => {
      alert("Response copied to clipboard!");
    });
  };

  return (
    <>
      <div style={{ display: "flex" }}>
        <div id="otpless-login-page"></div>
        {userInfo && (
          <div
            style={{
              marginLeft: "20px",
              overflow: "auto",
              gap: "20px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <h2>User Information</h2>
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
              onClick={copyResponse}
            >
              Copy Response
            </button>
            <div
              style={{
                maxHeight: "450px",
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
    </>
  );
};

export default Prebuilt;
