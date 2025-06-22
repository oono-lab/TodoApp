import React, { useEffect, useState, FormEvent } from "react";
import { useParams } from "react-router-dom";
import Background from './Background';
import TodoTitle from './TodoTitle';
import TodoStats from './TodoStats';
import WeeklyStats from './WeeklyStats';
import TodoList from './TodoList';
import { Todo } from './types';


const TodoListShow: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [content, setContent] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [error, setError] = useState("");
  const [countTusk, setCountTask] = useState(0);
  const [weeklyCompletedCount, setWeeklyCompletedCount] = useState(0);

  const getThisWeekRange = () => {
    const today = new Date();
    const dayOfWeek = today.getDay();

    const monday = new Date(today);
    monday.setDate(today.getDate() - ((dayOfWeek + 6) % 7));
    monday.setHours(0, 0, 0, 0);

    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6);
    sunday.setHours(23, 59, 59, 999);

    return { monday, sunday };
  };

useEffect(() => {
  const incompleteCount = todos.filter((todo) => !todo.completed).length;
  setCountTask(incompleteCount);

  const { monday, sunday } = getThisWeekRange();

  const completedThisWeek = todos.filter((todo) => {
    if (!todo.completed_at) return false;

    const completedAt = new Date(todo.completed_at);

    completedAt.setHours(0, 0, 0, 0);
    return completedAt >= monday && completedAt <= sunday;
  }).length;
    console.log(`Completed This Week: ${completedThisWeek}`);
  setWeeklyCompletedCount(completedThisWeek);

}, [todos]);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/todos/notepad");
        if (response.ok) {
          const data = await response.json();
          setTodos(data);
        } else {
          setError("ToDoの取得に失敗しました");
        }
      } catch (err) {
        console.error("エラー:", err);
      }
    };

    fetchTodos();

  }, [content,dueDate,countTusk]);

  const handleDeleteTodo = async (todoId: number) => {
    try {
      const response = await fetch(`http://localhost:8080/api/todos/${todoId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== todoId));
      } else {
        setError("ToDoの削除に失敗しました");
      }
    } catch (err) {
      console.error("削除エラー:", err);
      setError("通信エラーが発生しました");
    }
  };

  const handleToggleComplete = async (todoId: number) => {
    const today = new Date().toISOString().split("T")[0];
    try {
      const response = await fetch(`http://localhost:8080/api/todos/${todoId}/complete`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          completed: true,
          completed_at: today,
        }),
      });
      if (response.ok) {
        setTodos((prevTodos) =>
          prevTodos.map((todo) =>
            todo.id === todoId
              ? { ...todo, completed: true, completed_at: today }
              : todo
          )
        );
      } else {
        setError("完了処理に失敗しました");
      }
    } catch (err) {
      console.error("エラー:", err);
      setError("通信エラーが発生しました");
    }
  };


return (
    <Background
      backgroundImage="https://thumb.ac-illust.com/14/148ae45fff7bddfbc856ba419dcfba9b_t.jpeg"
      overlayOpacity={0.3}
    ><TodoList
                 todos={todos}
                 onToggleComplete={handleToggleComplete}
                 onDeleteTodo={handleDeleteTodo}
    />
    </Background>
  );
};


export default TodoListShow;