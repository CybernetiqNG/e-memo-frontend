import React, { useState, useRef } from "react";
import axios from "axios";
import Login from "../assets/svg/login.svg";
import Logo from "../assets/svg/logo.svg";
import Logo2 from "../assets/svg/eMemo.svg";
import Email from "../assets/svg/email.svg";
import Password from "../assets/svg/password.svg";

const Forgot = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [verify, setVerify] = useState(false);
  const [reset, setReset] = useState(false);
  const [digits, setDigits] = useState(["", "", "", ""]);
  const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];
  const baseUrl = import.meta.env.VITE_BASE_URL;

  const handleLogin = async () => {
    if (email === "") {
      setError("Email can't be empty");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post(`${baseUrl}/forgot-password`, {
        email: email,
      });
      //   console.log(response.status);
      if (response.status === 200) {
        setMessage("Email sent. Check inbox!");
        setLoading(false);
        setVerify(true);
      } else {
        setLoading(false);
        setError(response.message);
      }
    } catch (err) {
      // console.log(err);
      const errorMessage = err.response.data.message;
      // console.log(errorMessage);

      if (errorMessage === "Validation error") {
        setError("This email does not exist. Try again");
      } else {
        setError("Network. Please try again.");
      }
      setLoading(false);
      //   setError("");
    }
  };

  const handleVerify = async () => {
    if (email === "") {
      setError("Input Token");
      return;
    }
    const combinedValue = digits.join("");
    setLoading(true);
    // console.log(combinedValue);
    try {
      const response = await axios.post(`${baseUrl}/verify-token`, {
        email: email,
        token: combinedValue,
      });
      // console.log(response);
      if (response.status === 200 || response.staus === 201) {
        setLoading(false);
        setReset(true);
      } else {
        setLoading(false);
        setError(response.message);
      }
    } catch (err) {
      setError("Wrong Token");
      setLoading(false);
    }
  };

  const handleReset = async () => {
    if (password === "") {
      setError("Enter New Password");
      return;
    } else if (cpassword === "") {
      setError("Confirm New Password");
      return;
    } else if (password != cpassword) {
      setError("Password doesn't match");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(`${baseUrl}/reset-link`, {
        email: email,
        password: password,
        password_confirmation: cpassword,
      });
      // console.log(response);
      if (response.status === 200 || response.staus === 201) {
        setMessage("Password changed successfully. Login Now!");
        setLoading(false);
      } else {
        setLoading(false);
        setError(response.message);
      }
    } catch (err) {
      // setError("Wrong Token");
      setLoading(false);
    }
  };

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (!/^[0-9]$/.test(value)) return; // Allow only single digit numbers
    const newDigits = [...digits];
    newDigits[index] = value;
    setDigits(newDigits);

    // Move focus to next input if available and current input is not empty
    if (index < 3 && value) {
      inputRefs[index + 1].current.focus();
    }
    // setToken(combinedValue);
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      const newDigits = [...digits];
      newDigits[index] = "";
      setDigits(newDigits);

      // Move focus to the previous input, even if the current one is not empty
      if (index > 0) {
        inputRefs[index - 1].current.focus(); // Move to the previous input
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="lg:grid lg:grid-cols-2 gap-20 px-10 lg:px-28">
        <div className="lg:block hidden">
          <div className="text-center ">
            <div className="mr-4 block inline-flex cursor-pointer py-1.5 font-sans text-base font-medium leading-relaxed text-primary antialiased">
              <img src={Logo2} className="h-[46px] pr-2" />
              <img src={Logo} />
            </div>
            <p className="text-base font-light mt-4">
              Efficient administration of internal memorandum and
              correspondences in the public sector/government-to-government
            </p>
          </div>
          <img src={Login} alt="Login Illustration" className="mt-10" />
        </div>
        {verify ? (
          <div className="lg:pr-10 mt-10 w-full flex flex-col  justify-center">
            <div className="flex justify-center lg:hidden mb-10">
              <img src={Logo} className="h-10" alt="Logo" />
            </div>

            <p className=" font-bold text-5xl">Verify Token</p>
            <p className="mt-4 text-xl font-normal">
              Enter 4-digit token that was sent to{" "}
              <span className="text-secondary">{email}</span>
            </p>

            <div className="pt-10">
              {/* Email Input */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-900"
                >
                  Token
                </label>
                {/* <div className="relative mt-2">
                  <input
                    type="email"
                    id="email"
                    onChange={(e) => setToken(e.target.value)}
                    placeholder="Enter your email"
                    className="block w-full rounded-2xl border-0 p-7 text-gray-900 ring-2 ring-tertiary placeholder:text-grey focus:ring-0"
                    aria-label="Email"
                  />
                </div> */}
                <div className="grid grid-cols-4 gap-3 lg:h-20 h-14 mt-2">
                  {digits.map((digit, index) => (
                    <input
                      key={index}
                      type="text"
                      maxLength={1}
                      value={digit}
                      ref={inputRefs[index]}
                      onChange={(e) => handleChange(e, index)}
                      onKeyDown={(e) => handleKeyDown(e, index)}
                      className=" text-3xl text-center rounded-2xl border-0 focus:ring-2 ring-1 ring-secondary focus:ring-tertiary outline-none text-secondary"
                    />
                  ))}
                </div>
                {error && <p className="text-red-500 mt-5">{error}</p>}
                {message && <p className="text-secondary mt-5">{message}</p>}
                <p className="">
                  You did not receive any email?{" "}
                  <span
                    className="text-secondary underline"
                    onClick={handleLogin}
                  >
                    Send again!
                  </span>
                </p>
              </div>

              {/* Submit Button */}
              <div className="mt-12">
                <button
                  onClick={handleVerify}
                  className="w-full flex justify-center items-center bg-secondary lg:p-7 p-4 rounded-2xl text-white hover:bg-white hover:ring-2 hover:ring-btn hover:text-btn transition-transform duration-200 ease-in-out"
                  aria-label="Log In"
                >
                  {loading ? <div className="loader"></div> : "Submit"}
                </button>
              </div>
              <a href="/sign-in">
                <p className="font-semibold text-center mt-5 text-secondary">
                  Sign In
                </p>
              </a>
            </div>
          </div>
        ) : reset ? (
          <div className="lg:pr-10 mt-10 w-full flex flex-col  justify-center">
            {/* Mobile Logo */}
            <div className="flex justify-center lg:hidden mb-10">
              <img src={Logo} className="h-10" alt="Logo" />
            </div>

            <p className=" font-bold text-5xl">Reset Password</p>
            <p className="mt-4 text-xl font-normal">Enter new password</p>

            <div className="pt-7">
              {/* Email Input */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-900"
                >
                  New Password
                </label>
                <div className="relative mt-2">
                  <input
                    type="password"
                    id="password"
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter Password"
                    className="block w-full rounded-2xl border-0 p-7 text-gray-900 ring-2 ring-tertiary placeholder:text-grey focus:ring-0"
                    aria-label="Email"
                  />
                </div>
              </div>

              <div className="mt-10">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-900"
                >
                  Confirm New Password
                </label>
                <div className="relative mt-2">
                  <input
                    type="password"
                    id="password"
                    onChange={(e) => setCPassword(e.target.value)}
                    placeholder="Confirm Password"
                    className="block w-full rounded-2xl border-0 p-7 text-gray-900 ring-2 ring-tertiary placeholder:text-grey focus:ring-0"
                    aria-label="Password"
                  />
                </div>
                {error && <p className="text-red-500 mt-5">{error}</p>}
                {message && <p className="text-secondary mt-5">{message}</p>}
              </div>

              {/* Submit Button */}
              <div className="mt-12">
                <button
                  onClick={handleReset}
                  className="w-full flex justify-center items-center bg-secondary p-7 rounded-2xl text-white hover:bg-white hover:ring-2 hover:ring-btn hover:text-btn transition-transform duration-200 ease-in-out"
                  aria-label="Log In"
                >
                  {loading ? <div className="loader"></div> : "Submit"}
                </button>
              </div>
              <a href="/sign-in">
                <p className="font-semibold text-center mt-5 text-secondary">
                  Sign In
                </p>
              </a>
            </div>
          </div>
        ) : (
          <div className="lg:pr-10 mt-10 w-full flex flex-col  justify-center">
            {/* Mobile Logo */}
            <div className="flex justify-center lg:hidden mb-10">
              <img src={Logo} className="h-10" alt="Logo" />
            </div>

            <p className=" font-bold text-5xl">Forgot Password ?</p>
            <p className="mt-4 text-xl font-normal">
              Enter your email and we'll send you a link to reset your password
            </p>

            <div className="pt-7">
              {/* Email Input */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-900"
                >
                  Email
                </label>
                <div className="relative mt-2">
                  <input
                    type="email"
                    id="email"
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="block w-full rounded-2xl border-0 lg:p-7 p-4 text-gray-900 ring-2 ring-tertiary placeholder:text-grey focus:ring-0 pr-20"
                    aria-label="Email"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-7">
                    <img src={Email} alt="Email Icon" />
                  </div>
                </div>
                {error && <p className="text-red-500 mt-5">{error}</p>}
                {message && <p className="text-secondary mt-5">{message}</p>}
              </div>

              {/* Submit Button */}
              <div className="mt-12">
                <button
                  onClick={handleLogin}
                  className="w-full flex justify-center items-center bg-secondary lg:p-7 p-4 rounded-2xl text-white hover:bg-white hover:ring-2 hover:ring-btn hover:text-btn transition-transform duration-200 ease-in-out"
                  aria-label="Log In"
                >
                  {loading ? <div className="loader"></div> : "Submit"}
                </button>
              </div>
              <a href="/sign-in">
                <p className="font-semibold text-center mt-5 text-secondary">
                  Sign In
                </p>
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Forgot;
