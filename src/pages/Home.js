import React, { useState } from "react";

const Home = () => {
  const [quizzes] = useState([
    { quiz: "General Knowledge", questionCount: 5, category: 9 },
    { quiz: "Entertainment: Books", questionCount: 8, category: 10 },
    { quiz: "Entertainment: Film", questionCount: 10, category: 11 },
  ]);

  const handlePlayQuiz = async (quiz) => {
    let amount = quiz.questionCount;
    let category = quiz.category;
    try {
      const response = await fetch(
        `https://opentdb.com/api.php?amount=${amount}&category=${category}&type=multiple`
      );
      const data = await response.json();
      console.log("Quiz data:", data);
    } catch (error) {
      console.error("Error fetching quiz data:", error);
    }
  };
  return (
    <div>
      <h2>Список квізів</h2>
      {quizzes.map((quiz, index) => (
        <div key={index}>
          <h3>{quiz.quiz}</h3>
          <p>Кількість питань: {quiz.questionCount}</p>
          <button onClick={() => handlePlayQuiz(quiz)}>Грати</button>
        </div>
      ))}
    </div>
  );
};

export default Home;
