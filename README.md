[![OTPless](https://d1j61bbz9a40n6.cloudfront.net/website/home/v4/logo/white_logo.svg)](https://otpless.com/)

# React-JS Demo: Otpless Login Page

## Steps to add OTPless SDK to your ReactJS Website

1. **Create an App in [OTPless dashboard](https://otpless.com/dashboard/app) and copy the `APP ID`**
2. **Add OTPLESS Script as a function**

    > Add the following code to your Prebuilt/Prebuilt.jsx in root directory.

    ```js
    export const initOTPless = (callback) => {
        const otplessInit = Reflect.get(window, "otplessInit");

        const loadScript = () => {
            const isScriptLoaded = document.getElementById("otpless-sdk");
            if(isScriptLoaded) return;

            const script = document.createElement('script')
            script.id = 'otpless-sdk'
            script.type = 'text/javascript'
            script.src = 'https://otpless.com/v2/auth.js'
            script.setAttribute("data-appid", "PASTE_YOUR_APPID_HERE")
            document.body.appendChild(script);
        };

        otplessInit ? otplessInit() : loadScript();

        Reflect.set(window, "otpless", callback);
    };

    ```

   

3. **Load the script in Login/Signup component and add callback function**

    > Add following code in Login/Signup component.
    >> retrive data using **otplessUser** object

    ```jsx
    useEffect(() => initOTPless(callback), []);

    const callback = (otplessUser) => {
        alert(JSON.stringify(otplessUser));
    };
    ```

   

4. **Add Otpless-login-page div**

    > Add the following div in Login/Signup component.

    ```html
    <div id="otpless-login-page"></div>
    ```

### This demo implementation adds extra modularity, scalability and reusability to the otpless-auth sdk

### Integration Options

- [OTPless-Page](https://github.com/reniyal-otpless/otpless-reactjs-demo/)
- [OTPless-Page-OnClick](https://github.com/reniyal-otpless/otpless-reactjs-demo/tree/onclick-page-demo)
- [OTPless-Floater](https://github.com/reniyal-otpless/otpless-reactjs-demo/tree/floater-demo)
- [OTPless-Floater-OnClick](https://github.com/reniyal-otpless/otpless-reactjs-demo/tree/onclick-floater-demo)

### Usage

> **Prerequisites**: [NodeJS](https://nodejs.org/en)

- Install Packages

    ```bash
    npm install
    ```

- Run the demo

    ```bash
    npm start
    ```

- Open [localhost:3000](http://localhost:3000) in your browser
- Switch branches to check out available options to integrate *OTPless* in your project

## *Thank You*

## [Visit OTPless](https://otpless.com/platforms/react)
