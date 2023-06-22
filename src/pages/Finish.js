import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Finish = () => {
  const location = useLocation();
  const { quizData, userAnswers } = location.state;
  const [score, setScore] = useState(0);

  useEffect(() => {
    const calculateScore = () => {
      let count = 0;
      for (let i = 0; i < quizData.length; i++) {
        if (userAnswers[i] === quizData[i].correct_answer) {
          count++;
        }
      }
      setScore(count);
    };

    calculateScore();
  }, [quizData, userAnswers]);

  return (
    <div>
      <h2>Результати квізу</h2>
      <Link to="/">
        <button>Home</button>
      </Link>

      <p>
        Ваш результат: {score} з {quizData.length}
      </p>
    </div>
  );
};

export default Finish;
