import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Select } from "antd";

const { Option } = Select;

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
  const [selectedDifficulty, setSelectedDifficulty] = useState("easy");
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
        `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${selectedDifficulty}&type=multiple`
      );
      const data = await response.json();
      navigate("/quizzes/play", { state: data.results });
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

  const handleDifficultyChange = (value) => {
    setSelectedDifficulty(value);
  };

  return (
    <div className="quiz-list">
      <h2>List of Quizzes</h2>
      <p>Points: {points}</p>
      <Button onClick={handleRandomQuiz}>I'm Lucky</Button>
      <Link to="/quizzes/statistics">
        <Button>Statistics</Button>
      </Link>
      <Button onClick={handleClearPoints}>Clear Statistics</Button>
      <div>
        <span>Select Difficulty: </span>
        <Select value={selectedDifficulty} onChange={handleDifficultyChange}>
          <Option value="easy">Easy</Option>
          <Option value="medium">Medium</Option>
          <Option value="hard">Hard</Option>
        </Select>
      </div>

      {quizzes.map((quiz, index) => (
        <div className="quiz-list-item" key={index}>
          <h3>{quiz.quiz}</h3>
          <h4>Number of Questions: {quiz.questionCount}</h4>
          <Button onClick={() => handlePlayQuiz(quiz)}>Play</Button>
        </div>
      ))}
    </div>
  );
};

export default Home;
