import React from 'react';
import { Todo } from './types';

interface TodoListProps {
  todos: Todo[];
  onDeleteTodo: (id: number) => void;
}



const WeeklyStatsList: React.FC<TodoListProps> = ({
  todos,
  onDeleteTodo,
}) => {



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
  const { monday, sunday } = getThisWeekRange();
  const incompleteTodos = todos.filter((todo) => {
        if (!todo.completed_at) return false;

        const completedAt = new Date(todo.completed_at);

        completedAt.setHours(0, 0, 0, 0);
        return completedAt >= monday && completedAt <= sunday;
      })
  const getDaysUntilDue = (dueDate: string) => {
      const today = new Date();
      const due = new Date(sunday);
      const diffTime = due.getTime() - today.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays;
    };
const getPriorityColor = (dueDate: string) => {
    const days = getDaysUntilDue(dueDate);
    if (days === 0) return { bg: 'rgba(255,193,7,0.1)', border: 'rgba(255,193,7,0.3)', text: '#ffc107' };
    if (days <= 3) return { bg: 'rgba(255,152,0,0.1)', border: 'rgba(255,152,0,0.3)', text: '#ff9800' };
    return { bg: 'rgba(76,175,80,0.1)', border: 'rgba(76,175,80,0.3)', text: '#4caf50' };
  };

  const getDueDateStatus = (dueDate: string) => {
    const days = getDaysUntilDue(dueDate);
    if (days === 0) return '今日まで 🔥';
    if (days === 1) return '明日まで ⏰';
    return `あと${days}日 📅`;
  };
  if (incompleteTodos.length === 0) {
    return (
      <div
        style={{
          textAlign: 'center',
          padding: '40px 20px',
          background: 'linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '16px',
          color: 'rgba(255,255,255,0.7)',
        }}
      >
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>🎉</div>
        <h3 style={{ margin: '0 0 8px 0', color: 'rgba(255,255,255,0.9)' }}>
          今週完了したタスクはありません。
        </h3>
        <p style={{ margin: 0, fontSize: '14px' }}>
          新しいタスクを追加して、タスクを完了しよう！
        </p>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {incompleteTodos.map((todo) => {
        const priorityColor = getPriorityColor(todo.dueDate);

        return (
          <div
            key={todo.id}
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))',
              backdropFilter: 'blur(15px)',
              border: '1px solid rgba(255,255,255,0.18)',
              borderRadius: '16px',
              padding: '20px',
              boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
              transition: 'all 0.3s ease',
              position: 'relative',
              overflow: 'hidden',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.1)';
            }}
          >
            {/* 優先度インジケーター */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '4px',
                height: '100%',
                background: `linear-gradient(180deg, ${priorityColor.text}, ${priorityColor.text}aa)`,
              }}
            />

            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
              {/* カスタムチェックボックス */}
              <label
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  cursor: 'pointer',
                  marginTop: '2px',
                }}
              >
                <div
                  style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    border: '2px solid rgba(255,255,255,0.3)',
                    background: 'rgba(255,255,255,0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.3s ease',
                    backdropFilter: 'blur(5px)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#4caf50';
                    e.currentTarget.style.background = 'rgba(76,175,80,0.2)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)';
                    e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                  }}
                >
                  <span style={{ color: 'transparent', fontSize: '12px' }}>✓</span>
                </div>
              </label>

              {/* タスク内容 */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    color: 'white',
                    fontSize: '16px',
                    fontWeight: '500',
                    marginBottom: '8px',
                    lineHeight: '1.4',
                    wordBreak: 'break-word',
                  }}
                >
                  {todo.content}
                </div>
                <div
                  style={{
                    display: 'inline-block',
                    background: priorityColor.bg,
                    border: `1px solid ${priorityColor.border}`,
                    borderRadius: '20px',
                    padding: '4px 12px',
                    fontSize: '12px',
                    fontWeight: '600',
                    color: priorityColor.text,
                    backdropFilter: 'blur(5px)',
                  }}
                >
                  {getDueDateStatus(todo.dueDate)}
                </div>

                {/* 期限日 */}
                <div
                  style={{
                    color: 'rgba(255,255,255,0.6)',
                    fontSize: '14px',
                    marginTop: '4px',
                  }}
                >
                  掲載期限: {new Date(sunday).toLocaleDateString('ja-JP', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                    weekday: 'short'
                  })},
                </div>
              </div>

              {/* 削除ボタン */}
              <button
                onClick={() => onDeleteTodo(todo.id)}
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  border: 'none',
                  background: 'linear-gradient(135deg, rgba(255,82,82,0.2), rgba(255,82,82,0.1))',
                  color: '#ff5252',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '18px',
                  fontWeight: 'bold',
                  transition: 'all 0.3s ease',
                  backdropFilter: 'blur(5px)',
                  marginTop: '2px',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'linear-gradient(135deg, rgba(255,82,82,0.3), rgba(255,82,82,0.2))';
                  e.currentTarget.style.transform = 'scale(1.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'linear-gradient(135deg, rgba(255,82,82,0.2), rgba(255,82,82,0.1))';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
                onMouseDown={(e) => {
                  e.currentTarget.style.transform = 'scale(0.95)';
                }}
                onMouseUp={(e) => {
                  e.currentTarget.style.transform = 'scale(1.1)';
                }}
              >
                🗑️
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default WeeklyStatsList;