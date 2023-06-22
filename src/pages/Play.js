import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Play = () => {
  const location = useLocation();
  const quizData = location.state;
  console.log(quizData);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);

  return (
    <div>
      <h2>Квіз</h2>
      {quizData[0].category}
    </div>
  );
};

export default Play;
