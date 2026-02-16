
import React from 'react';
import { EmojiResult } from '../types';

interface Props {
  emojis: EmojiResult[];
}

const EmojiGallery: React.FC<Props> = ({ emojis }) => {
  const downloadImage = (url: string, name: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = `${name.replace(' ', '_')}_emoji.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
      {emojis.map((emoji) => (
        <div key={emoji.id} className="flex flex-col items-center gap-3">
          <div className="relative w-full aspect-square bg-slate-100 rounded-xl overflow-hidden border border-slate-100 group">
            {emoji.isLoading ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-50">
                <div className="w-8 h-8 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mb-2"></div>
                <span className="text-[10px] text-slate-400 font-medium">생성 중...</span>
              </div>
            ) : emoji.error ? (
              <div className="absolute inset-0 flex items-center justify-center bg-red-50 text-red-400">
                <span className="text-xs font-medium text-center px-2">이미지 생성에<br/>실패했습니다</span>
              </div>
            ) : (
              <>
                <img src={emoji.imageUrl} alt={emoji.expression} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                <button 
                  onClick={() => downloadImage(emoji.imageUrl, emoji.expression)}
                  className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                >
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                </button>
              </>
            )}
          </div>
          <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-2 py-1 rounded-full">
            {emoji.expression}
          </span>
        </div>
      ))}
    </div>
  );
};

export default EmojiGallery;
