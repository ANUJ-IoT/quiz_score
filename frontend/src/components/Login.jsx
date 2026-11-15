import React, { useRef } from "react";
import { loginUser } from "../api";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../context/AuthContext";

export default function Login({ setShowLogin, showLogin, setUserName }) {
  if (!showLogin) return null;

  const { setIsLoggedIn } = useAuth();

  const loginName = useRef();
  const loginPass = useRef();

  async function setName() {
    const username = loginName.current.value.trim();
    const password = loginPass.current.value.trim();

    const result = await loginUser({ username, password });

    if (result.message === "Login Succesfull") {
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
      setUserName(username);
      setShowLogin(false);
    } else {
      toast.error("Credentials are incorrect. Try again!");
    }
  }
  return (
    <>
      {/* This is login form*/}
      <div
        className={`absolute top-50 left-135 rounded-2xl ${showLogin ? "z-20" : "z-10"} bg-white/10 backdrop-blur-2xl`}
      >
        <form>
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
                className="input input-lg w-full"
                placeholder="User Name / Email"
                ref={loginName}
                required
              />
            </label>

            <label className="flex flex-col text-2xl font-extrabold">
              Password
              <input
                type="password"
                className="input input-lg w-full"
                placeholder="Password"
                ref={loginPass}
                required
              />
            </label>
            <button className="btn btn-neutral mt-4" onClick={setName}>
              Login
            </button>
          </fieldset>
        </form>
      </div>
    </>
  );
}
