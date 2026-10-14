import React from 'react';

interface PceaLogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
}

export const PceaLogo: React.FC<PceaLogoProps> = ({ className = '', size = 36, showText = true }) => {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <div 
        style={{ width: size, height: size }} 
        className="relative shrink-0 flex items-center justify-center rounded-xl bg-gradient-to-br from-[#0D472B] to-[#08301D] text-[#D4AF37] shadow-sm border border-[#D4AF37]/30 p-1"
      >
        <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Subtle Outer Ring */}
          <circle cx="50" cy="50" r="46" stroke="#D4AF37" strokeWidth="2.5" strokeDasharray="3 3" opacity="0.6" />
          
          {/* St. Andrew's Cross (Saltire) behind bush */}
          <line x1="22" y1="22" x2="78" y2="78" stroke="#D4AF37" strokeWidth="3" opacity="0.35" strokeLinecap="round" />
          <line x1="78" y1="22" x2="22" y2="78" stroke="#D4AF37" strokeWidth="3" opacity="0.35" strokeLinecap="round" />
          
          {/* Burning Bush Base & Branches */}
          <path 
            d="M50 78 C48 65, 42 56, 32 46 C36 43, 40 46, 44 50 C46 40, 48 30, 50 20 C52 30, 54 40, 56 50 C60 46, 64 43, 68 46 C58 56, 52 65, 50 78 Z" 
            fill="#E5B83B" 
          />
          {/* Bush Flame Glow */}
          <path 
            d="M50 18 C46 26, 38 32, 42 42 C45 36, 48 34, 50 28 C52 34, 55 36, 58 42 C62 32, 54 26, 50 18 Z" 
            fill="#FFD700" 
          />
          <path 
            d="M50 26 C48 31, 44 35, 47 40 C49 37, 50 34, 50 30 C50 34, 51 37, 53 40 C56 35, 52 31, 50 26 Z" 
            fill="#FFFFFF" 
          />
          
          {/* Latin Motto Ribbon Arc indicator */}
          <path d="M26 84 Q50 92 74 84" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>

      {showText && (
        <div className="flex flex-col text-left">
          <span className="text-sm font-bold tracking-tight text-white leading-tight">
            PCEA
          </span>
          <span className="text-[10px] font-medium text-[#E5B83B] tracking-wider uppercase leading-none">
            East Africa
          </span>
        </div>
      )}
    </div>
  );
};
