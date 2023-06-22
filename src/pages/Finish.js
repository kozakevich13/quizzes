import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "antd";

const Finish = () => {
  const location = useLocation();
  const { quizData, userAnswers, timeTaken } = location.state;
  const [points, setPoints] = useState(0);
  const [totalPoints, setTotalPoints] = useState(0);
  const [quizCount, setQuizCount] = useState(
    parseInt(localStorage.getItem("quizCount")) || 0
  );

  useEffect(() => {
    const calculateScore = () => {
      let count = 0;
      for (let i = 0; i < quizData.length; i++) {
        if (userAnswers[i] === quizData[i].correct_answer) {
          count += 2;
        }
      }
      setPoints(count);
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

  useEffect(() => {
    const updatedQuizCount = quizCount + 1;
    localStorage.setItem("quizCount", updatedQuizCount.toString());
    setQuizCount(updatedQuizCount);
  }, []);

  return (
    <div className="user-result">
      <h2>Result</h2>
      <Link to="/quizzes/">
        <Button>Home</Button>
      </Link>

      <p>
        Your score is: {points} out of {quizData.length}
      </p>

      <p>Correct answers: {points}</p>
      <p>Wrong answers: {quizData.length - points}</p>

      <p>Your time: {timeTaken} sec</p>
      <p>Your points: +{points}</p>
      <p>Total points: {totalPoints}</p>

      <p>Total quizzes taken: {localStorage.getItem("quizCount")}</p>
    </div>
  );
};

export default Finish;
