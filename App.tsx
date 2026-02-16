
import React, { useState, useCallback } from 'react';
import { generateSingleEmoji } from './services/geminiService';
import { EmojiResult, ExpressionType } from './types';
import Header from './components/Header';
import ImageUploader from './components/ImageUploader';
import EmojiGallery from './components/EmojiGallery';

const App: React.FC = () => {
  const [sourceImage, setSourceImage] = useState<string | null>(null);
  const [emojis, setEmojis] = useState<EmojiResult[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const expressions = [
    ExpressionType.HAPPY,
    ExpressionType.SAD,
    ExpressionType.ANGRY,
    ExpressionType.SURPRISED,
    ExpressionType.COOL
  ];

  const handleImageUpload = (base64: string) => {
    setSourceImage(base64);
    setEmojis([]);
  };

  const handleGenerateEmojis = async () => {
    if (!sourceImage) return;

    setIsProcessing(true);
    
    // Initialize empty emoji slots
    const initialEmojis: EmojiResult[] = expressions.map((exp, idx) => ({
      id: `emoji-${idx}`,
      expression: exp,
      imageUrl: '',
      isLoading: true
    }));
    setEmojis(initialEmojis);

    // Run generations
    const promises = expressions.map(async (exp, idx) => {
      try {
        const resultUrl = await generateSingleEmoji(sourceImage, exp);
        setEmojis(prev => prev.map(e => 
          e.expression === exp ? { ...e, imageUrl: resultUrl, isLoading: false } : e
        ));
      } catch (err) {
        console.error(`Error generating ${exp}:`, err);
        setEmojis(prev => prev.map(e => 
          e.expression === exp ? { ...e, isLoading: false, error: 'Failed' } : e
        ));
      }
    });

    await Promise.allSettled(promises);
    setIsProcessing(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center">
      <Header />
      
      <main className="w-full max-w-4xl px-4 py-8 space-y-8">
        <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <div className="flex flex-col items-center gap-6">
            <h2 className="text-xl font-semibold text-slate-800 self-start">1. 사진 불러오기</h2>
            <ImageUploader onUpload={handleImageUpload} currentImage={sourceImage} />
            
            {sourceImage && (
              <button
                onClick={handleGenerateEmojis}
                disabled={isProcessing}
                className={`w-full max-w-xs py-4 px-6 rounded-xl text-white font-bold text-lg shadow-lg transition-all transform active:scale-95 ${
                  isProcessing 
                  ? 'bg-slate-400 cursor-not-allowed' 
                  : 'bg-indigo-600 hover:bg-indigo-700 hover:shadow-indigo-200'
                }`}
              >
                {isProcessing ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    이모티콘 만드는 중...
                  </span>
                ) : '만들기'}
              </button>
            )}
          </div>
        </section>

        {emojis.length > 0 && (
          <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 animate-fade-in">
            <h2 className="text-xl font-semibold text-slate-800 mb-6">2. 생성된 이모티콘</h2>
            <EmojiGallery emojis={emojis} />
          </section>
        )}
      </main>
      
      <footer className="py-8 text-slate-400 text-sm">
        © 2024 AI Emoji Magic. Powered by Gemini.
      </footer>
    </div>
  );
};

export default App;
