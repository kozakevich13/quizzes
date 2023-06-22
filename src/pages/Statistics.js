import React from "react";
import { Link } from "react-router-dom";
import { Button } from "antd";

const Statistics = () => {
  const quizCount = parseInt(localStorage.getItem("quizCount")) || 0;
  const points = parseInt(localStorage.getItem("points")) || 0;

  return (
    <div className="statistics">
      <h2>Statistics</h2>
      <Link to="/">
        <Button>Home</Button>
      </Link>
      <p>Total quizzes taken: {quizCount}</p>
      <p>Total correct questions: {points}</p>
    </div>
  );
};

export default Statistics;
