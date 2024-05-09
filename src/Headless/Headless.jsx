import React, { useEffect, useState } from "react";
import EmailAuth from "./EmailAuth";

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
    if (!OTPlessSignin) return;

    const phno = document.getElementById("mobile-input").value;
    const otp = document.getElementById("otp-input").value;

    const res = await OTPlessSignin.verify({
      channel: "PHONE",
      phone: phno,
      otp: otp,
      countryCode: "+91",
    });

    alert(JSON.stringify(res));
    handleResponse(res);
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
      <div id="mobile-section">
        <input id="country-code-input" placeholder="Country Code" />
        <input id="mobile-input" placeholder="Enter mobile number" />
        <button onClick={phoneAuth}>Request OTP</button>
      </div>
      <div id="otp-section">
        <input id="otp-input" placeholder="Enter OTP" />
        <button onClick={verifyOTP}>Verify OTP</button>
      </div>
      {response && (
        <div>
          <h3>Response:</h3>
          <pre>{JSON.stringify(response, null, 2)}</pre>
          <button onClick={copyResponse}>Copy Response</button>
        </div>
      )}
      <button onClick={handleEmailAuthClick}>Email Authentication</button>
      {activeComponent === "prebuilt" && <EmailAuth />}
    </>
  );
};

export default Headless;
