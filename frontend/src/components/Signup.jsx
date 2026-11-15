import React, { useRef } from "react";
import { registerUser } from "../api";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Signup({ setShowSignUp, showSignUp }) {
  if (!showSignUp) return null;

  const signName = useRef();
  const signPass = useRef();
  let username = null;
  let password = null;

  async function setNewData() {
    username = signName.current.value;
    password = signPass.current.value;

    const result = await registerUser({ username, password });

    if (result.message === "User Created") {
      toast.success("Registration Successfull!", {
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
      setShowSignUp(false);
    } else {
      toast.error("Registration Failed. Please Try Again!");
    }
  }
  return (
    <>
      <div
        className={`absolute left-135 top-50 ${showSignUp ? "z-20" : "z-10"} rounded-2xl bg-white/10 backdrop-blur-2xl`}
      >
        <form>
          <fieldset className="fieldset w-3xl p-10 rounded-2xl">
            <legend className="fieldset-legend text-3xl font-bold mt-5 ">
              Sign Up
            </legend>
            <button
              type="button"
              onClick={() => setShowSignUp(false)}
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
            <label className="flex flex-col flex-start font-extrabold text-2xl">
              Name
              <input
                type="text"
                className="input input-lg w-full outline-none"
                placeholder="Name"
                ref={signName}
                required
              />
            </label>
            <label className="flex flex-col flex-start font-extrabold text-2xl">
              Password
              <input
                type="password"
                className="input input-lg w-full outline-none"
                placeholder="Password"
                ref={signPass}
                required
              />
            </label>
            <button className="btn btn-neutral mt-4" onClick={setNewData}>
              Sign&nbsp;Up
            </button>
          </fieldset>
        </form>
      </div>
    </>
  );
}
