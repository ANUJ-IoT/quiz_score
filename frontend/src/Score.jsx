import React, { useEffect, useState } from "react";
import BackImage from "./assets/BackImage.jpg";
import { Link } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import { getLeaderboard } from "./api";

export default function Score() {
  const [result, setResult] = useState([]);

  const { isLoggedIn } = useAuth();

  useEffect(() => {
    async function data() {
      const data = await getLeaderboard();
      setResult(data);
    }
    data();
  }, [result]);

  console.log(result);

  return (
    <>
      <div
        style={{ backgroundImage: `url(${BackImage})` }}
        className="w-full min-h-screen font-mono"
      >
        {/* This is Logo */}
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

        {/* This is Score Board */}
        <div className="w-full h-160 flex flex-wrap items-center justify-center flex-col">
          {isLoggedIn ? (
            <>
              <div className="bg-while/10 backdrop-blur-2xl p-5 w-170 rounded-2xl rounded-b-none">
                <p className="text-5xl">Leaderboard</p>
                <p>Top players by high score</p>
              </div>
              <div className="bg-white/10 backdrop-blur-2xl rounded-t-none rounded-2xl p-5 ">
                <table className="w-160 text-2xl">
                  <thead>
                    <tr>
                      <th>No</th>
                      <th>Name</th>
                      <th>Score</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.length === 0 ? (
                      <td>Loading....</td>
                    ) : (
                      result.map((item, i) => (
                        <tr key={i} className="text-center">
                          <td>{i}</td>
                          <td>{item.username}</td>
                          <td>{item.score}</td>
                          <td>{item.date.slice(0, 16).replace("T", "")}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
              <div className="flex flex-wrap mt-6 w-100 justify-center ">
                <Link to="/">
                  <button className="p-4 rounded-2xl bg-button cursor-pointer">
                    Play again
                  </button>
                  <button className="ml-10 p-4 rounded-2xl bg-button cursor-pointer">
                    Back to Home
                  </button>
                </Link>
              </div>
            </>
          ) : (
            <Link to={"/"}>
              <button className="bg-Login p-5 rounded-2xl text-4xl font-bold cursor-pointer">
                LOG IN AND GET ON THE LEADERBOARD....!
              </button>
            </Link>
          )}
        </div>
      </div>
    </>
  );
}
