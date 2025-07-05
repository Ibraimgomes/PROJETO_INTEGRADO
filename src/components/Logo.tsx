interface LogoProps {
  className?: string;
  showText?: boolean;
}

export default function Logo({ 
  className = "", 
  showText = true
}: LogoProps) {
  return (
    <div className={`flex items-center ${className}`}>
      {/* Icon only */}
      <div className="flex items-center">
        <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center mr-3">
          <svg 
            width="28" 
            height="28" 
            viewBox="0 0 100 100" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Profile Icon */}
            <circle cx="50" cy="30" r="15" stroke="white" strokeWidth="4" fill="none"/>
            <path 
              d="M25 75 Q25 60 35 60 L65 60 Q75 60 75 75 L75 85 L25 85 Z" 
              stroke="white" 
              strokeWidth="4" 
              fill="none"
            />
            {/* Lines */}
            <line x1="80" y1="35" x2="95" y2="35" stroke="white" strokeWidth="3" strokeLinecap="round"/>
            <line x1="80" y1="50" x2="90" y2="50" stroke="white" strokeWidth="3" strokeLinecap="round"/>
            <line x1="80" y1="65" x2="92" y2="65" stroke="white" strokeWidth="3" strokeLinecap="round"/>
          </svg>
        </div>
        
        {showText && (
          <div className="flex flex-col">
            <span className="text-xl font-bold leading-tight text-slate-100">
              Professional<span className="text-primary">Page</span>
            </span>
            <span className="text-xs leading-tight text-slate-300">
              Multilingual profiles
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
