import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "antd";

const Play = () => {
  const location = useLocation();
  const quizData = location.state;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [startTime, setStartTime] = useState(null);
  const navigate = useNavigate();

  const currentQuestion = quizData[currentQuestionIndex];

  const shuffleAnswers = (answers) => {
    for (let i = answers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [answers[i], answers[j]] = [answers[j], answers[i]];
    }
    return answers;
  };

  const handleAnswerSelect = (selectedAnswer) => {
    setUserAnswers((prevAnswers) => {
      const updatedUserAnswers = [...prevAnswers];
      updatedUserAnswers[currentQuestionIndex] = selectedAnswer;
      return updatedUserAnswers;
    });

    if (currentQuestionIndex < quizData.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      const endTime = new Date();
      const timeTaken = Math.floor((endTime - startTime) / 1000); // Time in seconds

      navigate("/finish", {
        state: {
          quizData,
          userAnswers: [...userAnswers, selectedAnswer],
          timeTaken,
        },
      });
    }
  };

  const allAnswers = shuffleAnswers([
    ...currentQuestion.incorrect_answers,
    currentQuestion.correct_answer,
  ]);

  const handleReturnHome = () => {
    navigate("/");
  };

  useEffect(() => {
    setStartTime(new Date());
  }, []);

  return (
    <div className="quiz-questions-section">
      <h2>Quiz</h2>
      {currentQuestion && (
        <>
          <h3>{currentQuestion.category}</h3>
          <p>{currentQuestion.question}</p>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {allAnswers.map((answer, index) => (
              <Button
                key={index}
                onClick={() => handleAnswerSelect(answer)}
                style={{ marginBottom: "8px", width: "100%" }}
              >
                {answer}
              </Button>
            ))}
          </div>
        </>
      )}
      <Button danger onClick={handleReturnHome}>
        Cancel the quiz and go home
      </Button>
    </div>
  );
};

export default Play;
