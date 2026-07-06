import { ChevronRight } from 'lucide-react';

interface EnterButtonProps {
  show: boolean;
  onClick?: () => void;
}

export default function EnterButton({ show, onClick }: EnterButtonProps) {
  return (
    <div
      className={`relative z-30 flex flex-col items-center justify-center pb-6 md:pb-10 transition-all duration-1000 ${
        show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 pointer-events-none'
      }`}
    >
      <button
        onClick={onClick}
        className="group relative px-6 py-3 md:px-8 md:py-4 bg-wall-accent/20 hover:bg-wall-accent/30 border border-wall-accent/50 hover:border-wall-accent rounded-full transition-all duration-300 hover:scale-105 active:scale-95"
        style={{
          boxShadow:
            '0 0 20px rgba(212, 114, 74, 0.2), inset 0 0 15px rgba(212, 114, 74, 0.1)',
        }}
      >
        <span className="relative z-10 flex items-center gap-2 text-wall-text text-sm md:text-base font-medium tracking-wider">
          走进墙的另一边
          <ChevronRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
        </span>

        <div
          className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(212, 114, 74, 0.3) 0%, transparent 70%)',
            filter: 'blur(8px)',
          }}
        />
      </button>

      <p className="mt-2 text-wall-muted text-xs tracking-wider opacity-70">
        探索真实案例，理解背后的医疗困境
      </p>

      <div className="mt-4 flex flex-col items-center gap-1 animate-bounce opacity-50">
        <ChevronRight className="w-3 h-3 rotate-90 text-wall-muted" />
        <ChevronRight className="w-3 h-3 rotate-90 text-wall-muted -mt-1" />
      </div>
    </div>
  );
}
