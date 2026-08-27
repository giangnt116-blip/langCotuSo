import React from 'react';
import { IMAGE_ASSETS } from '../data/imageAssets';

interface KienSangAvatarProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  showBadge?: boolean;
}

export const KienSangAvatar: React.FC<KienSangAvatarProps> = ({
  size = 'md',
  className = '',
  showBadge = false,
}) => {
  const sizeClasses = {
    xs: 'w-6 h-6 text-[10px]',
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-14 h-14 text-base',
    xl: 'w-20 h-20 text-lg',
  };

  const imgSizeClasses = {
    xs: 'w-6 h-6',
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-14 h-14',
    xl: 'w-20 h-20',
  };

  return (
    <div className={`relative inline-flex items-center justify-center shrink-0 ${className}`}>
      <div
        className={`${sizeClasses[size]} rounded-full overflow-hidden border-2 border-[#F37021] bg-gradient-to-br from-[#FFF5EB] via-[#FFEAD4] to-[#FCD9B8] shadow-xs flex items-center justify-center`}
      >
        <img
          src={IMAGE_ASSETS.kienSang.src}
          alt="Linh vật Kiến Sáng FPT Schools"
          className={`${imgSizeClasses[size]} object-cover object-center transform scale-105`}
          loading="lazy"
        />
      </div>

      {showBadge && (
        <span className="absolute -bottom-1 -right-1 px-1 py-0.2 text-[8px] font-black bg-[#F37021] text-white rounded-full border border-white shadow-2xs">
          FPT
        </span>
      )}
    </div>
  );
};
