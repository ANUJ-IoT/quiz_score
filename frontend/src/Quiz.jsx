import React, { useEffect, useState } from "react";
import BackImage from "./assets/BackImage.jpg";
import { Link, useParams } from "react-router-dom";
import { saveScore } from "./api";
import { useAuth } from "./context/AuthContext";

export default function Quiz() {
  const { userName, isLoggedIn } = useAuth();

  const [ques, setQues] = useState([]);
  const [nques, setNQues] = useState(0);

  const query = useParams();
  const category = query.category;

  const [second, setSeconds] = useState(30);
  const [numProgress, setNumProgress] = useState([1]);

  const [answer, setAnswer] = useState(0);
  const [current, setCurrent] = useState(false);

  useEffect(() => {
    async function fetchQues() {
      try {
        const data = await (
          await fetch(
            `https://opentdb.com/api.php?amount=${query.amount}&category=${query.category}&difficulty=${query.difficulty}`,
          )
        ).json();
        setQues(data.results);
      } catch (error) {
        console.log("this is the error", error);
      }
    }
    fetchQues();
  }, []);

  useEffect(() => {
    setSeconds(30);
    const interval = setInterval(() => {
      setSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          handleClick();
          setAnswer("");
          return 30;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [nques]);

  function handleClick() {
    setNumProgress((prev) => [...prev, nques + 1]);
    if (nques <= query.amount) setNQues((prev) => prev + 1);
  }

  async function setScoreDB() {
    if (isLoggedIn) {
      const data = await saveScore({
        username: userName,
        score: answer,
        category,
      });
    }
  }

  return (
    <>
      <div
        style={{ backgroundImage: `url(${BackImage})` }}
        className="w-full min-h-screen text-amber-50 font-mono"
      >
        <div className="flex items-center justify-between mr-30 mb-5">
          <div className="flex w-fit ">
            <img
              src="https://static.vecteezy.com/system/resources/thumbnails/017/458/891/small/light-bulb-with-shining-light-cartoon-style-flat-style-hand-drawn-style-doodle-style-symbol-of-creativity-innovation-inspiration-invention-and-ideas-illustration-vector.jpg"
              alt="Bulb image"
              className="rounded-2xl w-20 h-20 mt-6 ml-10"
            />
            <p className="text-5xl p-10 font-bold">Stranger's Quiz</p>
          </div>
          <div className=" bg-white/10 backdrop-blur-xl order border-white/20 shadow-2xl rounded-2xl mr-70 mt-8">
            <p className="p-5 font-semibold text-2xl">
              Question {nques} / {query.amount}
            </p>
          </div>
          <div className="rounded-2xl flex flex-wrap items-center justify-center gap-4 bg-cyan-300 mt-8 p-5">
            <img src="andiamge,com" alt="Clock" />
            <p className=" font-semibold text-2xl ">{second}</p>
          </div>
        </div>
        <div className="mx-20">
          <progress
            className="w-full rounded-2xl"
            value={Math.round((nques / query.amount) * 100)}
            max={100}
          ></progress>
        </div>

        {/* this is for the Main section for the quiz */}
        <div className="flex flex-wrap items-center justify-between px-20">
          <div className="w-fit h-fit rounded-2xl p-10 bg-white/10 backdrop-blur-xl order border-white/20 shadow-2xl max-w-300 mt-20">
            {ques.length === 0 || nques >= ques.length ? (
              <p className="p-50">Loading</p>
            ) : (
              <div className="w-full" key={nques}>
                <p className="text-4xl font-bold">{ques[nques].question}</p>

                <form className="filter">
                  <div className="flex flex-wrap items-center justify-center flex-col gap-5 mt-10">
                    <div className="w-full border p-3 rounded-2xl text-2xl hover:bg-cyan-500 cursor-pointer">
                      <button onClick={handleClick} className="cursor-pointer">
                        {ques[nques].incorrect_answers[0]}
                      </button>
                    </div>
                    <div className="w-full border p-3 rounded-2xl text-2xl  hover:bg-cyan-500 cursor-pointer">
                      <button
                        value={ques[nques].correct_answer}
                        onClick={() => {
                          setCurrent(true);
                          handleClick();
                          if (isLoggedIn) setAnswer((prev) => prev + 1);
                        }}
                        className="cursor-pointer"
                      >
                        {ques[nques].correct_answer}
                      </button>
                    </div>
                    {ques[nques].incorrect_answers.length == 3 && (
                      <div key={nques}>
                        <div className="w-full border p-3 rounded-2xl text-2xl mb-5  hover:bg-cyan-500 cursor-pointer">
                          <button
                            onClick={handleClick}
                            className="cursor-pointer"
                          >
                            {ques[nques].incorrect_answers[1]}
                          </button>
                        </div>
                        <div className="w-full border p-3 rounded-2xl text-2xl  hover:bg-cyan-500 cursor-pointer">
                          <button
                            onClick={handleClick}
                            className="cursor-pointer"
                          >
                            {ques[nques].incorrect_answers[2]}
                          </button>
                        </div>
                      </div>
                    )}
                    <input className="btn btn-square" type="reset" value="×" />
                  </div>
                </form>
              </div>
            )}
            {nques <= query.amount - 1 ? (
              <button
                className="w-full bg-button p-3 rounded-2xl cursor-pointer"
                onClick={handleClick}
              >
                Next Question
              </button>
            ) : (
              <Link to={"/Score"}>
                <button
                  className="w-full bg-button p-3 rounded-2xl cursor-pointer"
                  onClick={setScoreDB}
                >
                  Finish
                </button>
              </Link>
            )}
          </div>
          <div className="w-fit  rounded-2xl p-10 bg-white/10 backdrop-blur-xl order border-white/20 shadow-2xl">
            <p className=" text-2xl font-bold">Question Progress</p>
            <div className="flex flex-wrap gap-2 items-center max-w-100 mt-8">
              {numProgress.map((i) => (
                <p
                  key={i}
                  className={`{w-15  p-4 border ${current ? "border-green-600" : "border-red-700"} rounded-2xl`}
                >
                  {i}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
