
import React from 'react';

interface Props {
  onUpload: (base64: string) => void;
  currentImage: string | null;
}

const ImageUploader: React.FC<Props> = ({ onUpload, currentImage }) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onUpload(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="w-full flex flex-col items-center gap-4">
      <div className="relative group">
        <div className={`w-64 h-64 rounded-2xl overflow-hidden border-2 border-dashed flex items-center justify-center transition-all ${currentImage ? 'border-indigo-200' : 'border-slate-300 bg-slate-50 hover:bg-slate-100'}`}>
          {currentImage ? (
            <img src={currentImage} alt="Uploaded preview" className="w-full h-full object-cover" />
          ) : (
            <div className="text-center px-4">
              <svg className="w-12 h-12 text-slate-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="text-slate-500 text-sm">얼굴이 잘 나온 사진을 업로드하세요</p>
            </div>
          )}
        </div>
        
        <label className="absolute bottom-4 right-4 bg-white shadow-lg rounded-full p-3 cursor-pointer hover:bg-slate-50 transition-colors border border-slate-200">
          <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
        </label>
      </div>
      
      {currentImage && (
        <p className="text-xs text-slate-400">다른 사진으로 변경하려면 플러스 버튼을 누르세요</p>
      )}
    </div>
  );
};

export default ImageUploader;
