import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Finish = () => {
  const location = useLocation();
  const { quizData, userAnswers, timeTaken } = location.state;
  const [points, setPoints] = useState(0);
  const [totalPoints, setTotalPoints] = useState(0);

  useEffect(() => {
    const calculateScore = () => {
      let count = 0;
      for (let i = 0; i < quizData.length; i++) {
        if (userAnswers[i] === quizData[i].correct_answer) {
          setPoints((prevPoints) => prevPoints + 2);
        }
      }
    };

    calculateScore();
  }, [quizData, userAnswers]);

  useEffect(() => {
    const existingPoints = parseInt(localStorage.getItem("points"));
    const updatedPoints = isNaN(existingPoints)
      ? points
      : points + existingPoints;
    localStorage.setItem("points", updatedPoints.toString());
    setTotalPoints(updatedPoints);
  }, [points]);

  return (
    <div className="user-result">
      <h2>Result</h2>
      <Link to="/">
        <button>Home</button>
      </Link>

      <p>
        Your score is: {points} out of {quizData.length * 2}
      </p>

      <p>Сorrect answers: {points}</p>
      <p>Wrong answers: {quizData.length * 2 - points} </p>

      <p>Your time: {timeTaken} sec</p>
      <p>Your points: +{points}</p>
      <p>Total points: {totalPoints}</p>
    </div>
  );
};

export default Finish;
