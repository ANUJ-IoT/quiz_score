import React, { useEffect, useState } from "react";
import BackImage from "./assets/BackImage.jpg";
import { useParams, useNavigate } from "react-router-dom";
import { saveScore } from "./api";
import { useAuth } from "./context/AuthContext";

export default function Quiz() {
  const { userName, isLoggedIn } = useAuth();

  const query = useParams();
  const category = query.category;
  const navigate = useNavigate();

  const [ques, setQues] = useState([]);
  const [nques, setNQues] = useState(0);

  const [second, setSeconds] = useState(30);
  const [answer, setAnswer] = useState(0);

  // null = unanswered, true = correct, false = incorrect
  const [questionResults, setQuestionResults] = useState(
    Array(Number(query.amount)).fill(null),
  );

  const [isFinished, setIsFinished] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fetch Questions
  useEffect(() => {
    async function fetchQues() {
      try {
        const response = await fetch(
          `https://opentdb.com/api.php?amount=${query.amount}&category=${query.category}&difficulty=${query.difficulty}`,
        );

        const data = await response.json();

        setQues(data.results);
      } catch (error) {
        console.log("Error fetching questions:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchQues();
  }, [query.amount, query.category, query.difficulty]);

  // Move to next question
  function advanceQuestion() {
    if (nques < ques.length - 1) {
      setNQues((prev) => prev + 1);
    } else {
      setIsFinished(true);
    }
  }

  // Record user's answer
  function handleAnswer(isCorrect) {
    if (questionResults[nques] !== null) return;

    setQuestionResults((prev) => {
      const updated = [...prev];
      updated[nques] = isCorrect;
      return updated;
    });

    if (isCorrect) {
      setAnswer((prev) => prev + 1);
    }

    advanceQuestion();
  }

  // Skip question
  function handleNext() {
    if (questionResults[nques] === null) {
      setQuestionResults((prev) => {
        const updated = [...prev];
        updated[nques] = false;
        return updated;
      });
    }

    advanceQuestion();
  }

  // Timer
  useEffect(() => {
    if (ques.length === 0 || isFinished) return;

    setSeconds(30);

    const interval = setInterval(() => {
      setSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(interval);

          setQuestionResults((results) => {
            if (results[nques] !== null) return results;

            const updated = [...results];
            updated[nques] = false;
            return updated;
          });

          if (nques < ques.length - 1) {
            setNQues((current) => current + 1);
          } else {
            setIsFinished(true);
          }

          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [nques, ques.length, isFinished]);

  // Save score to database
  async function setScoreDB() {
    try {
      if (isLoggedIn) {
        await saveScore({
          username: userName,
          score: answer,
          category,
        });
      }

      navigate("/Score");
    } catch (error) {
      console.error("Error saving score:", error);
    }
  }

  // Loading state
  if (loading) {
    return <div className="p-20 text-3xl">Loading Questions...</div>;
  }

  if (ques.length === 0) {
    return <div className="p-20 text-3xl">No questions available.</div>;
  }

  const currentQuestion = ques[nques];

  return (
    <>
      <div
        style={{ backgroundImage: `url(${BackImage})` }}
        className="w-full min-h-screen text-amber-50 font-mono"
      >
        {/* Header */}
        <div className="flex items-center justify-between mr-30 mb-5">
          <div className="flex w-fit">
            <img
              src="https://static.vecteezy.com/system/resources/thumbnails/017/458/891/small/light-bulb-with-shining-light-cartoon-style-flat-style-hand-drawn-style-doodle-style-symbol-of-creativity-innovation-inspiration-invention-and-ideas-illustration-vector.jpg"
              alt="Bulb"
              className="rounded-2xl w-20 h-20 mt-6 ml-10"
            />

            <p className="text-5xl p-10 font-bold">Stranger's Quiz</p>
          </div>

          <div className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-2xl mt-8">
            <p className="p-5 font-semibold text-2xl">
              Question {nques + 1} / {ques.length}
            </p>
          </div>

          <div className="rounded-2xl flex items-center justify-center gap-4 bg-cyan-300 mt-8 p-5">
            <p className="font-semibold text-2xl">{second}</p>
          </div>
        </div>

        {/* Overall Progress */}
        <div className="mx-20">
          <progress
            className="w-full rounded-2xl"
            value={Math.round((nques / ques.length) * 100)}
            max={100}
          />
        </div>

        {/* Main Section */}
        <div className="flex flex-wrap items-center justify-between px-20">
          {/* Question Section */}
          <div className="w-fit h-fit rounded-2xl p-10 bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl max-w-300 mt-20">
            {!isFinished ? (
              <div className="w-full" key={nques}>
                <p className="text-4xl font-bold">{currentQuestion.question}</p>

                <div className="flex flex-wrap items-center justify-center flex-col gap-5 mt-10">
                  {[
                    ...currentQuestion.incorrect_answers,
                    currentQuestion.correct_answer,
                  ].map((option, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() =>
                        handleAnswer(option === currentQuestion.correct_answer)
                      }
                      className="w-full border p-3 rounded-2xl text-2xl hover:bg-cyan-500 cursor-pointer"
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center p-10">
                <h2 className="text-4xl font-bold">Quiz Completed!</h2>

                <p className="text-2xl mt-5">
                  Your Score: {answer} / {ques.length}
                </p>
              </div>
            )}

            {!isFinished && (
              <button
                type="button"
                className="w-full bg-button p-3 rounded-2xl cursor-pointer mt-8"
                onClick={handleNext}
              >
                Next Question
              </button>
            )}

            {isFinished && (
              <button
                type="button"
                className="w-full bg-button p-3 rounded-2xl cursor-pointer mt-8"
                onClick={setScoreDB}
              >
                Finish
              </button>
            )}
          </div>

          {/* Question Tracker */}
          <div className="w-fit rounded-2xl p-10 bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl">
            <p className="text-2xl font-bold">Question Progress</p>

            <div className="flex flex-wrap gap-2 items-center max-w-100 mt-8">
              {questionResults.map((result, index) => (
                <p
                  key={index}
                  className={`w-15 p-4 border rounded-2xl text-center
                    ${
                      result === true
                        ? "border-green-600 bg-green-600/20"
                        : result === false
                          ? "border-red-700 bg-red-700/20"
                          : "border-white"
                    }`}
                >
                  {index + 1}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
