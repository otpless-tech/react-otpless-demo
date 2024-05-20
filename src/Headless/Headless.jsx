import React, { useEffect, useState } from "react";
import EmailAuth from "./EmailAuth";
import "./Headless.css";

<EmailAuth />;

const Headless = () => {
  const [OTPlessSignin, setOTPlessSignin] = useState(null);
  const [response, setResponse] = useState(null);
  const [activeComponent, setActiveComponent] = useState(null);
  useEffect(() => {
    const script = document.createElement("script");
    script.id = "otpless-sdk";
    script.src = "https://otpless.com/v2/headless.js";
    script.setAttribute("data-appid", "RM2I31PAOMTTAJ0UGFLP");
    script.onload = initializeSDK;
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const initializeSDK = () => {
    window.otpless = (otplessUser) => {
      console.log(otplessUser);
    };

    setOTPlessSignin(new window.OTPless(window.otpless));
  };

  const phoneAuth = async () => {
    const countryCode = document.getElementById("country-code-input").value;
    const phoneNumber = document.getElementById("mobile-input").value;

    const res = await OTPlessSignin.initiate({
      channel: "PHONE",
      phone: phoneNumber,
      countryCode: countryCode,
    });

    alert(JSON.stringify(res));
    handleResponse(res);
  };

  const verifyOTP = async () => {
    console.log("Verifying OTP...");

    if (!OTPlessSignin) {
      console.error("OTPlessSignin is not initialized");
      return;
    }

    const phno = document.getElementById("mobile-input").value;
    const otp = document.getElementById("otp-input").value;

    console.log("Phone Number:", phno);
    console.log("OTP:", otp);

    try {
      const res = await OTPlessSignin.verify({
        channel: "PHONE",
        phone: phno,
        otp: otp,
        countryCode: "+91",
      });

      console.log("Verification Response:", res);
      handleResponse(res);
    } catch (error) {
      console.error("Error verifying OTP:", error);
      // Handle error if needed
    }
  };

  const oAuth = async (params) => {
    if (!OTPlessSignin) return;

    const res = await OTPlessSignin.initiate({
      channel: "OAUTH",
      channelType: params,
    });

    alert(JSON.stringify(res));
    handleResponse(res);
  };

  const handleResponse = (res) => {
    setResponse(res);
  };

  const copyResponse = () => {
    if (response) {
      navigator.clipboard
        .writeText(JSON.stringify(response, null, 2))
        .then(() => alert("Response copied to clipboard"))
        .catch((error) => console.error("Error copying response:", error));
    }
  };

  const handleEmailAuthClick = () => {
    setActiveComponent("prebuilt");
  };

  return (
    <>
      <div
        className="headless"
        style={{ display: "flex", flexDirection: "column", gap: "20px" }}
      >
        <div id="mobile-section">
          <input id="country-code-input" placeholder="Country Code" />
          <input id="mobile-input" placeholder="Enter mobile number" />
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
            onClick={phoneAuth}
          >
            Request OTP
          </button>
        </div>
        <div id="otp-section">
          <input id="otp-input" placeholder="Enter OTP" />
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
            onClick={verifyOTP}
          >
            Verify OTP
          </button>
        </div>
        {response && (
          <div className="response">
            <h3>Response:</h3>
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
            <pre>{JSON.stringify(response, null, 2)}</pre>
          </div>
        )}
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
          onClick={handleEmailAuthClick}
        >
          Email Authentication
        </button>
        {activeComponent === "prebuilt" && <EmailAuth />}
      </div>
    </>
  );
};

export default Headless;
