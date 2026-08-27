import React from 'react';

interface FptSchoolLogoProps {
  className?: string;
  variant?: 'full' | 'compact' | 'horizontal';
  showSlogan?: boolean;
}

export const FptSchoolLogo: React.FC<FptSchoolLogoProps> = ({
  className = 'h-10',
  variant = 'full',
  showSlogan = true,
}) => {
  if (variant === 'compact') {
    return (
      <svg
        viewBox="0 0 420 200"
        className={className}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="FPT Schools Logo"
      >
        <g id="fpt-three-bars">
          {/* Blue F shape */}
          <path
            d="M50 20 C65 20 135 20 145 20 C135 70 120 150 110 185 C80 185 30 185 20 185 C28 140 42 60 50 20 Z"
            fill="#0066B2"
            rx="12"
          />
          {/* Orange P shape */}
          <path
            d="M175 10 C190 10 260 10 270 10 C260 70 240 160 230 195 C200 195 150 195 140 195 C150 140 165 60 175 10 Z"
            fill="#F37021"
            rx="12"
          />
          {/* Green T shape */}
          <path
            d="M300 20 C315 20 385 20 395 20 C385 70 370 150 360 185 C330 185 280 185 270 185 C278 140 292 60 300 20 Z"
            fill="#00A859"
            rx="12"
          />
          
          {/* Letters F P T */}
          <text
            x="65"
            y="135"
            fontFamily="'Arial Black', 'Inter', sans-serif"
            fontStyle="italic"
            fontWeight="900"
            fontSize="100"
            fill="white"
          >
            F
          </text>
          <text
            x="185"
            y="135"
            fontFamily="'Arial Black', 'Inter', sans-serif"
            fontStyle="italic"
            fontWeight="900"
            fontSize="100"
            fill="white"
          >
            P
          </text>
          <text
            x="315"
            y="135"
            fontFamily="'Arial Black', 'Inter', sans-serif"
            fontStyle="italic"
            fontWeight="900"
            fontSize="100"
            fill="white"
          >
            T
          </text>
        </g>
      </svg>
    );
  }

  if (variant === 'horizontal') {
    return (
      <div className={`inline-flex items-center gap-2.5 ${className}`}>
        <svg
          viewBox="0 0 420 200"
          className="h-full w-auto aspect-[420/200] shrink-0"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* F shape */}
          <path
            d="M55 20 C65 20 135 20 145 20 C135 70 120 150 110 185 C80 185 30 185 20 185 C28 140 45 60 55 20 Z"
            fill="#0066B2"
          />
          {/* P shape */}
          <path
            d="M175 10 C190 10 260 10 270 10 C260 70 240 160 230 195 C200 195 150 195 140 195 C150 140 165 60 175 10 Z"
            fill="#F37021"
          />
          {/* T shape */}
          <path
            d="M300 20 C315 20 385 20 395 20 C385 70 370 150 360 185 C330 185 280 185 270 185 C278 140 292 60 300 20 Z"
            fill="#00A859"
          />
          <text
            x="65"
            y="135"
            fontFamily="'Arial Black', 'Inter', sans-serif"
            fontStyle="italic"
            fontWeight="900"
            fontSize="100"
            fill="white"
          >
            F
          </text>
          <text
            x="185"
            y="135"
            fontFamily="'Arial Black', 'Inter', sans-serif"
            fontStyle="italic"
            fontWeight="900"
            fontSize="100"
            fill="white"
          >
            P
          </text>
          <text
            x="315"
            y="135"
            fontFamily="'Arial Black', 'Inter', sans-serif"
            fontStyle="italic"
            fontWeight="900"
            fontSize="100"
            fill="white"
          >
            T
          </text>
        </svg>
        <div className="flex flex-col justify-center leading-none">
          <span className="font-extrabold tracking-tight text-[#F37021] text-xs uppercase font-sans">
            FPT SCHOOLS
          </span>
          {showSlogan && (
            <span className="text-[9px] font-bold text-[#0066B2] tracking-normal font-sans mt-0.5">
              Trải nghiệm để trưởng thành
            </span>
          )}
        </div>
      </div>
    );
  }

  // Full Vector Logo (matching the uploaded image exactly: 3 color stripes FPT + FPT SCHOOLS orange + Trải nghiệm để trưởng thành blue)
  return (
    <svg
      viewBox="0 0 600 300"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="FPT Schools - Trải nghiệm để trưởng thành"
    >
      <g transform="translate(90, 15) scale(1)">
        {/* Blue F */}
        <path
          d="M55 15 C65 15 130 15 140 15 C130 65 115 135 105 165 C75 165 30 165 20 165 C28 125 45 55 55 15 Z"
          fill="#0066B2"
        />
        {/* Orange P */}
        <path
          d="M165 5 C180 5 245 5 255 5 C245 65 225 145 215 175 C185 175 140 175 130 175 C140 125 155 55 165 5 Z"
          fill="#F37021"
        />
        {/* Green T */}
        <path
          d="M280 15 C295 15 360 15 370 15 C360 65 345 135 335 165 C305 165 260 165 250 165 C258 125 272 55 280 15 Z"
          fill="#00A859"
        />
        
        {/* Registered symbol */}
        <circle cx="390" cy="165" r="9" stroke="#0066B2" strokeWidth="2" fill="none" />
        <text
          x="390"
          y="169"
          fontFamily="'Inter', sans-serif"
          fontWeight="bold"
          fontSize="11"
          fill="#0066B2"
          textAnchor="middle"
        >
          R
        </text>

        {/* Letters F P T */}
        <text
          x="62"
          y="120"
          fontFamily="'Arial Black', 'Inter', sans-serif"
          fontStyle="italic"
          fontWeight="900"
          fontSize="90"
          fill="white"
        >
          F
        </text>
        <text
          x="172"
          y="120"
          fontFamily="'Arial Black', 'Inter', sans-serif"
          fontStyle="italic"
          fontWeight="900"
          fontSize="90"
          fill="white"
        >
          P
        </text>
        <text
          x="288"
          y="120"
          fontFamily="'Arial Black', 'Inter', sans-serif"
          fontStyle="italic"
          fontWeight="900"
          fontSize="90"
          fill="white"
        >
          T
        </text>
      </g>

      {/* FPT SCHOOLS Text */}
      <text
        x="300"
        y="218"
        fontFamily="'Arial Black', 'Montserrat', 'Inter', sans-serif"
        fontWeight="900"
        fontSize="36"
        letterSpacing="2"
        fill="#F37021"
        textAnchor="middle"
      >
        FPT SCHOOLS
      </text>

      {/* Slogan: Trải nghiệm để trưởng thành */}
      {showSlogan && (
        <text
          x="300"
          y="268"
          fontFamily="'Inter', 'Arial', sans-serif"
          fontWeight="800"
          fontSize="27"
          letterSpacing="0.5"
          fill="#0066B2"
          textAnchor="middle"
        >
          Trải nghiệm để trưởng thành
        </text>
      )}
    </svg>
  );
};
