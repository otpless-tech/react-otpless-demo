import React, { useState, useEffect } from "react";

const EmailAuth = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [response, setResponse] = useState(null);
  const [OTPlessSignin, setOTPlessSignin] = useState(null);

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
    setOTPlessSignin(new window.OTPless());
  };

  const handleEmailAuth = async () => {
    if (!OTPlessSignin || !email) return;

    try {
      const res = await OTPlessSignin.initiate({
        channel: "EMAIL",
        email: email,
      });
      setResponse(res);
      document.getElementById("otp-section").style.display = "block";
    } catch (error) {
      console.error("Error initiating email authentication:", error);
    }
  };

  const handleVerifyOTP = async () => {
    if (!OTPlessSignin || !email || !otp) return;

    try {
      const res = await OTPlessSignin.verify({
        channel: "EMAIL",
        email: email,
        otp: otp,
      });
      setResponse(res);
    } catch (error) {
      console.error("Error verifying OTP:", error);
    }
  };

  const copyResponse = () => {
    if (response) {
      navigator.clipboard
        .writeText(JSON.stringify(response, null, 2))
        .then(() => alert("Response copied to clipboard!"))
        .catch((error) => console.error("Error copying response:", error));
    }
  };

  return (
    <div>
      <div id="email-section">
        <input
          id="email-input"
          type="email"
          placeholder="Enter email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button onClick={handleEmailAuth}>Request OTP</button>
      </div>

      <div id="otp-section">
        <input
          id="otp-input"
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />
        <button onClick={handleVerifyOTP}>Verify OTP</button>
      </div>

      <div id="response-container">
        {response && (
          <>
            <h3>Response:</h3>
            <pre>{JSON.stringify(response, null, 2)}</pre>
            <button onClick={copyResponse}>Copy Response</button>
          </>
        )}
      </div>
    </div>
  );
};

export default EmailAuth;
