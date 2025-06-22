import React, { useEffect, useState, FormEvent } from "react";
import { useNavigate } from 'react-router-dom';
import Container from './Container';
import Background from './Background';
import TodoTitle from './TodoTitle';
import TodoForm from './TodoForm';
import TodoStats from './TodoStats';
import WeeklyStats from './WeeklyStats';
import { Todo } from './types';


const TodoPage: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [content, setContent] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [error, setError] = useState("");
  const [countTusk, setCountTask] = useState(0);
  const [weeklyCompletedCount, setWeeklyCompletedCount] = useState(0);
  const navigate = useNavigate();


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

    console.log(`Completed At: ${completedAt}, Monday: ${monday}, Sunday: ${sunday}`);
    console.log(todo.completed_at);
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

  const handleAddTodo = async (e: FormEvent) => {
    e.preventDefault();
    if (content.length === 0 || content.length > 100) {
      setError("内容は100字以内で入力してください");
      return;
    }

    const today = new Date().toISOString().split("T")[0];
    if (dueDate < today) {
      setError("期限は今日以降の日付を指定してください");
      return;
    }

    setError("");

    const newTodo = {
      content,
      deadline: dueDate,
    };

    const response = await fetch(`http://localhost:8080/api/todos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTodo),
    });
    if (response.ok) {
      setContent("");
      setDueDate("");
    } else {
      setError("ToDoの登録に失敗しました");
    }
  };

return (
    <Background
      backgroundImage="https://thumb.ac-illust.com/14/148ae45fff7bddfbc856ba419dcfba9b_t.jpeg"
      overlayOpacity={0.3}
    >

      <Container>
        <div>

          <TodoForm
            content={content}
            dueDate={dueDate}
            error={error}
            onContentChange={setContent}
            onDueDateChange={setDueDate}
            onSubmit={handleAddTodo}
          />
          <TodoStats countTusk={countTusk}
          onNavigate={() => navigate('/todolist')}
          />
          <WeeklyStats weeklyCompletedCount={weeklyCompletedCount}
            onNavigate={() => navigate('/WeeklyList')}
          />
        </div>
      </Container>
    </Background>
  );
};


export default TodoPage;
