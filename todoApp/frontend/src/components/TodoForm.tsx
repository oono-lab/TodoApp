import React from 'react';

interface TodoFormProps {
  content: string;
  dueDate: string;
  error: string;
  onContentChange: (value: string) => void;
  onDueDateChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const TodoForm: React.FC<TodoFormProps> = ({
  content,
  dueDate,
  error,
  onContentChange,
  onDueDateChange,
  onSubmit,
}) => {
  return (
    <div
      style={{
        background: 'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255,255,255,0.18)',
        borderRadius: '16px',
        padding: '48px',
        marginBottom: '20px',
        boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
      }}
    >
      <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {/* 内容入力フィールド */}
        <div style={{ position: 'relative' }}>
          <input
            type="text"
            value={content}
            onChange={(e) => onContentChange(e.target.value)}
            maxLength={100}
            required
            placeholder=" "
            style={{
              width: '100%',
              padding: '16px 0px 16px 0px',
              fontSize: '16px',
              background: 'rgba(255,255,255,0.1)',
              border: '2px solid rgba(255,255,255,0.2)',
              borderRadius: '12px',
              color: 'white',
              outline: 'none',
              transition: 'all 0.3s ease',
              backdropFilter: 'blur(5px)',
            }}
            onFocus={(e) => {
              e.target.style.borderColor = 'rgba(100,200,255,0.8)';
              e.target.style.background = 'rgba(255,255,255,0.15)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = 'rgba(255,255,255,0.2)';
              e.target.style.background = 'rgba(255,255,255,0.1)';
            }}
          />
          <label
            style={{
              position: 'absolute',
              left: '12px',
              top: content ? '-20px' : '10px',
              fontSize: content ? '12px' : '16px',
              color: 'rgba(255,255,255,0.8)',
              pointerEvents: 'none',
              transition: 'all 0.3s ease',
              padding: content ? '2px 8px' : '0',
              borderRadius: '6px',
              fontWeight: content ? '600' : '400',
            }}
          >
            タスク内容
          </label>
        </div>

        {/* 期限入力フィールド */}
        <div style={{ position: 'relative' }}>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => onDueDateChange(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '16px 0px',
              fontSize: '16px',
              background: 'rgba(255,255,255,0.1)',
              border: '2px solid rgba(255,255,255,0.2)',
              borderRadius: '12px',
              color: 'white',
              outline: 'none',
              transition: 'all 0.3s ease',
              backdropFilter: 'blur(5px)',
              colorScheme: 'dark',
            }}
            onFocus={(e) => {
              e.target.style.borderColor = 'rgba(255,150,100,0.8)';
              e.target.style.background = 'rgba(255,255,255,0.15)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = 'rgba(255,255,255,0.2)';
              e.target.style.background = 'rgba(255,255,255,0.1)';
            }}
          />

        </div>

        {/* エラーメッセージ */}
        {error && (
          <div
            style={{
              background: 'linear-gradient(135deg, rgba(255,100,100,0.2), rgba(255,50,50,0.1))',
              border: '1px solid rgba(255,100,100,0.3)',
              borderRadius: '8px',
              padding: '12px',
              color: '#ff6b6b',
              fontSize: '14px',
              fontWeight: '500',
              textAlign: 'center',
              backdropFilter: 'blur(5px)',
            }}
          >
            ⚠️ {error}
          </div>
        )}

        {/* 送信ボタン */}
        <button
          type="submit"
          style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            border: 'none',
            borderRadius: '12px',
            padding: '16px 24px',
            color: 'white',
            fontSize: '16px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: '0 4px 15px rgba(102,126,234,0.3)',
            position: 'relative',
            overflow: 'hidden',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 8px 25px rgba(102,126,234,0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 15px rgba(102,126,234,0.3)';
          }}
          onMouseDown={(e) => {
            e.currentTarget.style.transform = 'translateY(0) scale(0.98)';
          }}
          onMouseUp={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px) scale(1)';
          }}
        >
          <span style={{ position: 'relative', zIndex: 1 }}>
           ToDoを追加
          </span>
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: '-100%',
              width: '100%',
              height: '100%',
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
              transition: 'left 0.5s ease',
            }}
          />
        </button>
      </form>
    </div>
  );
};

export default TodoForm;