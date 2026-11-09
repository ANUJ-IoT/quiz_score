import React, { useEffect, useReducer, useRef, useState } from "react";
import { Link } from "react-router-dom";
import BackImage from "./assets/BackImage.jpg";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "./context/AuthContext";

export default function Home() {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);

  const { userName, setUserName } = useAuth();
  const [Ques, setQues] = useState([]);

  const [category, setCategory] = useState(9);
  const [difficulty, setDifficulty] = useState("medium");
  const [amount, setAmount] = useState(10);

  useEffect(() => {
    async function fetchData() {
      const data = await (
        await fetch("https://opentdb.com/api_category.php")
      ).json();
      setQues(data.trivia_categories);
    }
    fetchData();
  }, []);

  return (
    <>
      {/* This is Hero section */}
      <div
        className="relative w-full min-h-screen font-mono bg-contain bg-center text-amber-50"
        style={{ backgroundImage: `url(${BackImage})` }}
      >
        {/* this is for the success for the sign up */}
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
          transition={Bounce}
        />
        {/* This is the Header */}
        <div className="flex flex-wrap items-center justify-between">
          <div className="flex w-170 ">
            <img
              src="https://static.vecteezy.com/system/resources/thumbnails/017/458/891/small/light-bulb-with-shining-light-cartoon-style-flat-style-hand-drawn-style-doodle-style-symbol-of-creativity-innovation-inspiration-invention-and-ideas-illustration-vector.jpg"
              alt="Bulb image"
              className="rounded-2xl w-20 h-20 mt-6 ml-10"
            />
            <p className="text-5xl p-10 font-bold">
              Stranger's <span className="text-Special">Quiz</span>
            </p>
          </div>

          {/* Buttons for Login and Sign Up */}
          {!userName ? (
            <div className="flex items-center justify-center gap-10 mr-20 p-5 font-bold text-2xl">
              <button
                className="p-3 outline-none rounded-2xl bg-Login cursor-pointer"
                onClick={() => {
                  setShowLogin(!showLogin);
                  setShowSignUp(false);
                }}
              >
                Login
              </button>
              <Login
                setShowLogin={setShowLogin}
                showLogin={showLogin}
                setUserName={setUserName}
              />
              <button
                className="p-3 outline-none rounded-2xl bg-Login cursor-pointer"
                onClick={() => {
                  setShowSignUp(!showSignUp);
                  setShowLogin(false);
                }}
              >
                Sign up
              </button>
              <Signup setShowSignUp={setShowSignUp} showSignUp={showSignUp} />
            </div>
          ) : (
            <div className="text-4xl p-4 mr-10 font-bold border rounded-2xl bg-Login">
              <p>{userName}</p>
            </div>
          )}
        </div>

        {/* This is the main section of the page */}
        <div className=" flex flex-wrap items-center justify-around gap-5">
          {/* This is the first Section with image */}
          <div className="w-100 p-10 ml-10 rounded-2xl">
            <div className="flex items-center justify-center flex-col gap-10">
              <p className="text-5xl font-bold">Test your knowledge!</p>
              <p className="text-2xl  bg-white/10 backdrop-blur-xl  order border-white/20 shadow-2xl rounded-2xl p-4">
                Choose your preference and start the quiz challenge!
              </p>
              <img
                src="https://static.vecteezy.com/system/resources/thumbnails/002/858/830/small/neuron-cells-with-glowing-in-human-brain-free-vector.jpg"
                alt="Brain Image"
                width={300}
                height={300}
                className="rounded-2xl"
              />
            </div>
          </div>

          {/* This is Main section for quiz configuration */}
          {/* Login and sign up form has to be designed again a little and login of both appearance has to be set */}
          <div className=" w-200 rounded-2xl p-10 bg-white/10 backdrop-blur-xl order border-white/20 shadow-2xl h-fit">
            <div className="mb-10">
              <ol className="text-3xl font-semibold">
                <li>1. Setup Your Quiz</li>
              </ol>
            </div>
            <div>
              <div className="flex items-center justify-between border p-2 rounded-2xl mb-5 h-20 px-10">
                <p className="font-semibold  text-2xl">Category</p>
                <select
                  defaultValue="Medium"
                  className="border w-70 p-3 rounded-2xl cursor-pointer"
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option disabled={true}>Subject</option>
                  {Ques.length === 0 ? (
                    <option value="Loading"></option>
                  ) : (
                    Ques.map((Q) => (
                      <option key={Q.id} value={Q.id}>
                        {Q.name}
                      </option>
                    ))
                  )}
                </select>
              </div>
              <div className="flex items-center justify-between border p-2 rounded-2xl mb-5 h-20 px-10">
                <p className="font-semibold text-2xl">Difficulty</p>
                <select
                  defaultValue="Medium"
                  className="border w-70 p-3 rounded-2xl cursor-pointer"
                  onChange={(e) => setDifficulty(e.target.value)}
                >
                  <option disabled={true}>Medium</option>
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
              </div>
              <div className="flex items-center justify-between border p-2 rounded-2xl mb-5 h-20 px-10">
                <p className="font-semibold text-2xl">Number of Question</p>
                <select
                  defaultValue="Medium"
                  className="border w-70 p-3 rounded-2xl cursor-pointer"
                  onChange={(e) => setAmount(e.target.value)}
                >
                  <option disabled={true}>10</option>
                  <option value={10}>10</option>
                  <option value={15}>15</option>
                  <option value={20}>20</option>
                </select>
              </div>
            </div>
            <div>
              <p className="p-2 border rounded-2xl mb-5 h-10 w-fit px-4">
                Questions are taken from{" "}
                <u>
                  <a href="https://www.britannica.com/quiz/browse">
                    Trivia Quiz
                  </a>
                </u>
              </p>
            </div>
            <div className="w-full">
              <Link to={`/Quiz/${amount}/${category}/${difficulty}`}>
                <button className="w-full bg-button text-3xl font-semibold rounded-2xl p-2 h-15 cursor-pointer">
                  Start Quiz
                </button>
              </Link>
            </div>
          </div>

          {/* This is Information section */}
          <div className="rounded-2xl p-15 flex-wrap w-125 h-115  bg-white/10 backdrop-blur-xl  order border-white/20 shadow-2xl">
            <p className="font-bold text-4xl mb-5">How it works</p>
            <div className="flex items-center justify-center flex-col gap-10 text-2xl flex-wrap">
              <p>Answer each question before time runs out</p>
              <p>You will get points for the correct answers</p>
              <p>See your results and climb the leaderboard!</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
