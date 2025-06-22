import React from 'react';

const TodoTitle: React.FC = () => {
  return (
    <div className="flex justify-center items-center py-8 px-4">
      <div className="relative">
        {/* グラデーション背景 */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-2xl blur-sm opacity-75"></div>

        {/* メインタイトル */}
        <h2 className="relative bg-black bg-opacity-80 backdrop-blur-sm px-8 py-4 rounded-2xl border border-gray-700 shadow-2xl">
          <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent text-3xl font-bold tracking-wide">
            あなたのToDo一覧
          </span>

          {/* 装飾的なアンダーライン */}
          <div className="mt-2 h-0.5 w-full bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 rounded-full"></div>
        </h2>

        {/* 光るエフェクト */}
        <div className="absolute -top-1 -left-1 -right-1 -bottom-1 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-2xl opacity-20 animate-pulse"></div>
      </div>
    </div>
  );
};

export default TodoTitle;