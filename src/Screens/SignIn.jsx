import React, { useState } from "react";
import axios from "axios";
import Login from "../assets/svg/login.svg";
import Logo from "../assets/svg/logo.svg";
import Logo2 from "../assets/svg/eMemo.svg";
import Email from "../assets/svg/email.svg";
import Password from "../assets/svg/password.svg";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const baseUrl = import.meta.env.VITE_BASE_URL;

  const handleLogin = async () => {
    if (email === "") {
      setError("Email can't be empty");
      return;
    } else if (password === "") {
      setError("Password can't be empty");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post(`${baseUrl}/login`, {
        email: email,
        password: password,
      });
      // console.log(response.status);
      if (response.status === 200) {
        const { token, user } = response.data;

        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));

        window.location.href = "/overview";
      } else {
        setLoading(false);
        setError(response.message);
      }
    } catch (err) {
      const errorMessage = err.response.data.message;

      if (
        errorMessage.includes("Validation error") ||
        errorMessage.includes("Invalid")
      ) {
        setError("Wrong Email or Password");
      } else {
        setError("Network. Please try again.");
      }
      setLoading(false);
      // setError("");
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center">
      <div className="lg:grid lg:grid-cols-2 gap-20 w-full  px-10 lg:px-28">
        {/* Left Column: Logo and Info */}
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

        {/* Right Column: Login Form */}
        <div className="lg:pr-10 mt-10 flex flex-col justify-center w-full">
          {/* Mobile Logo */}
          <div className="flex justify-center lg:hidden mb-10">
            <img src={Logo2} className="h-[46px] pr-2" />
            <img src={Logo} className="h-10" alt="Logo" />
          </div>

          <p className="text-xl font-normal">Hi, welcome back!</p>
          <p className="mt-4 font-bold text-5xl">Sign In</p>

          <div className="pt-7 ">
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
                  onKeyDown={handleKeyDown}
                  placeholder="Enter your email"
                  className="block w-full rounded-2xl border-0 lg:p-7 p-4 text-gray-900 ring-2 ring-tertiary placeholder:text-grey focus:ring-0 lg:pr-20 pr-10"
                  aria-label="Email"
                />
                <div className="absolute inset-y-0 right-0 flex items-center lg:pr-7 pr-3">
                  <img src={Email} alt="Email Icon" className="" />
                </div>
              </div>
            </div>

            {/* Password Input */}
            <div className="mt-12">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-900"
              >
                Password
              </label>
              <div className="relative mt-2">
                <input
                  type="password"
                  id="password"
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="6+ Characters, 1 capital letter"
                  className="block w-full rounded-2xl border-0 lg:p-7 p-4 text-gray-900 ring-2 ring-tertiary placeholder:text-grey focus:ring-0 lg:pr-20 pr-10"
                  aria-label="Password"
                />
                <div className="absolute inset-y-0 right-0 flex items-center lg:pr-7 pr-0">
                  <img src={Password} alt="Password Icon" />
                </div>
              </div>
              {error && <p className="text-red-500 mt-5">{error}</p>}
            </div>

            {/* Submit Button */}
            <div className="mt-12">
              <button
                onClick={handleLogin}
                className="w-full flex justify-center items-center bg-secondary lg:p-7 p-4 rounded-2xl text-white hover:bg-white hover:ring-2 hover:ring-btn hover:text-btn transition-transform duration-200 ease-in-out"
                aria-label="Log In"
              >
                {loading ? <div className="loader"></div> : "Log In"}
              </button>
            </div>
            <a href="/forgot-password">
              <p className="font-semibold text-center mt-5 text-secondary">
                Forgot Password ?
              </p>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
