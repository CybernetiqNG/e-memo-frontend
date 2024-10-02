import React, { useState } from "react";
import axios from "axios";
import Login from "../assets/svg/login.svg";
import Logo from "../assets/svg/logo.svg";
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
      console.log(response.status);
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
      setLoading(false);
      setError("Wrong Email or Password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="grid grid-cols-2 gap-20 px-28">
        <div>
          <div className="">
            <div className="flex justify-center">
              <img src={Logo} className="h-10 " />
            </div>
            <p className="text-base font-light text-center pt-4">
              Lorem ipsum dolor sit amet consectetur. Aliquam enim id leo a.
              Etiam congue mauris pellentesque quam.
            </p>
          </div>
          <img src={Login} />
        </div>
        <div className="pr-10 mt-10">
          <p className="text-xl font-normal">Hi Cephas, welcome</p>
          <p className="mt-4 font-bold text-5xl">Sign In </p>
          <div className="pt-7">
            <div>
              <label
                htmlFor="price"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email
              </label>
              <div className="relative mt-2 ">
                <input
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="block w-full rounded-2xl border-0 p-7 text-gray-900 ring-2 ring-inset ring-tertiary placeholder:text-grey focus:ring-0 focus:ring-0 focus:ring-secondary"
                />
                <div className="absolute inset-y-0 right-0 mt-6 flex items-center">
                  <div className="h-full rounded-md border-1 border-secondary py-0 pl-2 pr-7 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm">
                    <img src={Email} />
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-[71px]">
              <label
                htmlFor="price"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
              <div className="relative mt-2 ">
                <input
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="6+ Characters, 1 capital letter"
                  className="block w-full rounded-2xl border-0 p-7 text-gray-900 ring-2 ring-inset ring-tertiary placeholder:text-grey focus:ring-0 focus:ring-0 focus:ring-secondary"
                />
                <div className="absolute inset-y-0 right-0 mt-6 flex items-center">
                  <div className="h-full rounded-md border-1 border-secondary py-0 pl-2 pr-7 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm">
                    <img src={Password} />
                  </div>
                </div>
              </div>
              {error && <p className="text-red-500 mt-5 -mb-5">{error}</p>}
            </div>
            <div className="mt-[71px]">
              <button
                onClick={handleLogin}
                className="text-center justify-center flex items-center w-full bg-secondary p-7 rounded-2xl text-white hover:bg-white hover:ring-2 hover:text-btn ring-btn item-center transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110"
              >
                {loading ? <div className="loader"></div> : "Log In"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
