interface CentralDividerProps {
  show: boolean;
  showQuestionMark: boolean;
}

export default function CentralDivider({ show, showQuestionMark }: CentralDividerProps) {
  return (
    <div className="absolute left-1/2 top-0 bottom-0 -translate-x-1/2 flex flex-col items-center z-20 pointer-events-none">
      <div
        className={`w-px flex-1 origin-top ${
          show ? 'animate-wall-reveal' : 'opacity-0 scale-y-0'
        }`}
        style={{
          background:
            'linear-gradient(to bottom, transparent 0%, rgba(255,255,255,0.15) 20%, rgba(255,255,255,0.25) 50%, rgba(255,255,255,0.15) 80%, transparent 100%)',
          boxShadow: '0 0 20px rgba(255,255,255,0.1)',
        }}
      />

      {showQuestionMark && (
        <div className="absolute top-1/2 -translate-y-1/2 animate-float">
          <div
            className="font-serif text-[120px] md:text-[180px] lg:text-[240px] font-black leading-none animate-pulse-slow select-none"
            style={{
              color: 'rgba(212, 114, 74, 0.25)',
              textShadow:
                '0 0 40px rgba(212, 114, 74, 0.3), 0 0 80px rgba(212, 114, 74, 0.15)',
            }}
          >
            ?
          </div>
          <div
            className="absolute inset-0 font-serif text-[120px] md:text-[180px] lg:text-[240px] font-black leading-none animate-flicker select-none"
            style={{
              color: 'rgba(212, 114, 74, 0.15)',
            }}
          >
            ?
          </div>
        </div>
      )}

      <div
        className={`w-px flex-1 origin-bottom ${
          show ? 'animate-wall-reveal' : 'opacity-0 scale-y-0'
        }`}
        style={{
          background:
            'linear-gradient(to top, transparent 0%, rgba(255,255,255,0.15) 20%, rgba(255,255,255,0.25) 50%, rgba(255,255,255,0.15) 80%, transparent 100%)',
          boxShadow: '0 0 20px rgba(255,255,255,0.1)',
          animationDelay: '200ms',
        }}
      />
    </div>
  );
}
