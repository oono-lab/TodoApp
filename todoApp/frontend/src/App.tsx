import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import TodoPage from "./components/TodoPage";
import { useNavigate } from "react-router-dom";
import TodoListShow from "./components/TodoListShow";
import WeeklyList from "./components/WeeklyStatsListShow";


const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TodoPage />} />
        <Route path="/todolist" element={<TodoListShow />} />
        <Route path="/WeeklyList" element={<WeeklyList />} />
      </Routes>
    </Router>
  );
};

export default App;
