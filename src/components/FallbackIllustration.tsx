import React from 'react';

interface FallbackIllustrationProps {
  type: string;
  className?: string;
}

export const FallbackIllustration: React.FC<FallbackIllustrationProps> = ({ type, className = 'w-full h-full' }) => {
  return (
    <div className={`bg-[#F7F3E9] border border-[#E0D7C6] rounded-xl flex flex-col items-center justify-center p-6 text-center text-[#4A3B32] ${className}`}>
      <div className="w-20 h-20 mb-3 text-[#B85D38]">
        {type === 'guol' && (
          <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-full h-full">
            <path d="M10 60 L50 20 L90 60 Z" fill="#EADBC8" />
            <path d="M20 60 L20 85 L80 85 L80 60" />
            <line x1="50" y1="20" x2="50" y2="85" strokeDasharray="3 3" />
            <path d="M40 85 L40 65 L60 65 L60 85" fill="#C58F68" />
            <path d="M35 15 Q50 5 65 15" strokeWidth="3" />
          </svg>
        )}
        {type === 'weaving' && (
          <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-full h-full">
            <rect x="20" y="15" width="60" height="70" rx="4" fill="#EADBC8" />
            <line x1="30" y1="15" x2="30" y2="85" />
            <line x1="50" y1="15" x2="50" y2="85" />
            <line x1="70" y1="15" x2="70" y2="85" />
            <line x1="20" y1="40" x2="80" y2="40" stroke="#B85D38" strokeWidth="4" />
            <circle cx="30" cy="40" r="2.5" fill="#4A3B32" />
            <circle cx="50" cy="40" r="2.5" fill="#4A3B32" />
            <circle cx="70" cy="40" r="2.5" fill="#4A3B32" />
          </svg>
        )}
        {type === 'music' && (
          <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-full h-full">
            <circle cx="50" cy="50" r="35" fill="#EADBC8" />
            <circle cx="50" cy="50" r="12" fill="#B85D38" />
            <circle cx="50" cy="50" r="4" fill="#4A3B32" />
            <path d="M30 15 L50 25 L70 15" strokeWidth="2" />
          </svg>
        )}
        {type === 'dance' && (
          <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-full h-full">
            <circle cx="50" cy="25" r="8" fill="#B85D38" />
            <path d="M50 33 L50 65 L35 85 M50 65 L65 85" strokeWidth="3" />
            <path d="M25 45 L50 40 L75 45" strokeWidth="3" />
            <path d="M25 45 L20 30 M75 45 L80 30" strokeWidth="3" />
          </svg>
        )}
        {type === 'residence' || type === 'general' ? (
          <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-full h-full">
            <path d="M15 75 L40 35 L65 75 Z" fill="#EADBC8" />
            <path d="M45 75 L70 45 L90 75 Z" fill="#D5C2A5" />
            <path d="M10 82 Q50 78 90 82" strokeWidth="3" stroke="#B85D38" />
          </svg>
        ) : null}
      </div>
      <p className="text-xs font-medium tracking-wide uppercase text-[#8C7A6B]">
        Hình minh họa đang được cập nhật
      </p>
      <span className="text-[11px] text-[#A8988B] mt-1">Dữ liệu di sản Cơ Tu chuẩn hóa</span>
    </div>
  );
};
