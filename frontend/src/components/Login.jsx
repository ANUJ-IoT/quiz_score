import React, { useState } from "react";
import { loginUser } from "../api";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../context/AuthContext";

export default function Login({ setShowLogin, showLogin, setUserName }) {
  const { setIsLoggedIn } = useAuth();

  const [user, setUser] = useState({ name: "", password: "" });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const login = async (e) => {
    e.preventDefault();
    const result = await loginUser(user.name, user.password);

    if (result.message === "Successfull.") {
      toast.success("Login Successfull!", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
      setIsLoggedIn(true);
      setUserName(user.name);
      setShowLogin(false);
    } else {
      toast.error("Credentials are incorrect. Try again!");
    }
  };
  if (!showLogin) return null;
  return (
    <>
      {/* This is login form*/}
      <div
        className={`absolute top-50 left-135 rounded-2xl ${showLogin ? "z-20" : "z-10"} bg-white/10 backdrop-blur-2xl`}
      >
        <form onSubmit={login}>
          <fieldset className="fieldset rounded-box w-3xl p-10">
            <legend className="fieldset-legend text-3xl font-bold mt-5">
              Login
            </legend>
            <button
              type="button"
              onClick={() => setShowLogin(false)}
              className="absolute top-10 right-4 btn btn-circle btn-ghost"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 6l12 12M18 6L6 18"
                />
              </svg>
            </button>
            <label className="flex flex-col text-2xl font-extrabold">
              User Name
              <input
                type="text"
                name="name"
                onChange={handleChange}
                className="input input-lg w-full outline-none"
                placeholder="User Name / Email"
                required
              />
            </label>

            <label className="flex flex-col text-2xl font-extrabold">
              Password
              <input
                type="password"
                name="password"
                onChange={handleChange}
                className="input input-lg w-full outline-none"
                placeholder="Password"
                required
              />
            </label>
            <button type="submit" className="btn btn-neutral mt-4">
              Login
            </button>
          </fieldset>
        </form>
      </div>
    </>
  );
}
