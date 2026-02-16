
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="w-full bg-white border-b border-slate-200 py-6 px-4 flex flex-col items-center">
      <div className="flex items-center gap-3">
        <div className="bg-indigo-600 p-2 rounded-lg">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">마법 이모티콘 메이커</h1>
      </div>
      <p className="text-slate-500 mt-2">내 사진으로 5가지 표정의 스티커를 만들어보세요!</p>
    </header>
  );
};

export default Header;
