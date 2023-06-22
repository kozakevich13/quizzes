import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const [quizzes] = useState([
    { quiz: "General Knowledge", questionCount: 10, category: 9 },
    { quiz: "Entertainment: Books", questionCount: 10, category: 10 },
    { quiz: "Entertainment: Film", questionCount: 10, category: 11 },
    { quiz: "Entertainment: Music", questionCount: 10, category: 12 },
    {
      quiz: "Entertainment: Musicals & Theatres",
      questionCount: 10,
      category: 13,
    },
    { quiz: "Entertainment: Television", questionCount: 10, category: 14 },
    { quiz: "Entertainment: Video Games", questionCount: 10, category: 15 },
    { quiz: "Entertainment: Board Games", questionCount: 10, category: 15 },
    { quiz: "Science & Nature", questionCount: 10, category: 17 },
    { quiz: "Science: Computers", questionCount: 10, category: 18 },
  ]);
  const navigate = useNavigate();
  const [points, setPoints] = useState(0);

  useEffect(() => {
    const existingPoints = parseInt(localStorage.getItem("points"));
    if (!isNaN(existingPoints)) {
      setPoints(existingPoints);
    }
  }, []);

  const handlePlayQuiz = async (quiz) => {
    let amount = quiz.questionCount;
    let category = quiz.category;
    try {
      const response = await fetch(
        `https://opentdb.com/api.php?amount=${amount}&category=${category}&type=multiple`
      );
      const data = await response.json();
      navigate("/play", { state: data.results });
    } catch (error) {
      console.error("Error fetching quiz data:", error);
    }
  };

  const handleRandomQuiz = async () => {
    const randomQuiz = quizzes[Math.floor(Math.random() * quizzes.length)];
    handlePlayQuiz(randomQuiz);
  };

  const handleClearPoints = () => {
    localStorage.setItem("points", "0");
    localStorage.setItem("quizCount", "0");
    setPoints(0);
  };

  return (
    <div className="quiz-list">
      <h2>List of Quizzes</h2>
      <p>Points: {points}</p>
      <button onClick={handleRandomQuiz}>I'm Lucky</button>
      <Link to="/statistics">
        <button>Statistics</button>
      </Link>
      <button onClick={handleClearPoints}>Clear Statistics</button>
      {quizzes.map((quiz, index) => (
        <div className="quiz-list-item" key={index}>
          <h3>{quiz.quiz}</h3>
          <h4>Number of Questions: {quiz.questionCount}</h4>
          <button onClick={() => handlePlayQuiz(quiz)}>Play</button>
        </div>
      ))}
    </div>
  );
};

export default Home;
