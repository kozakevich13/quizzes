import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Play = () => {
  const location = useLocation();
  const quizData = location.state;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const navigate = useNavigate();

  const currentQuestion = quizData[currentQuestionIndex];

  const handleAnswerSelect = (selectedAnswer) => {
    setUserAnswers((prevAnswers) => {
      const updatedUserAnswers = [...prevAnswers];
      updatedUserAnswers[currentQuestionIndex] = selectedAnswer;
      return updatedUserAnswers;
    });

    if (currentQuestionIndex < quizData.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      navigate("/finish", {
        state: { quizData, userAnswers: [...userAnswers, selectedAnswer] },
      });
    }
  };

  console.log(currentQuestion.correct_answer);
  return (
    <div>
      <h2>Квіз</h2>
      {currentQuestion && (
        <>
          <h3>{currentQuestion.category}</h3>
          <p>{currentQuestion.question}</p>
          <ul>
            {currentQuestion.incorrect_answers.map((answer, index) => (
              <li key={index} onClick={() => handleAnswerSelect(answer)}>
                {answer}
              </li>
            ))}
            <li
              onClick={() => handleAnswerSelect(currentQuestion.correct_answer)}
            >
              {currentQuestion.correct_answer}
            </li>
          </ul>
        </>
      )}
    </div>
  );
};

export default Play;
