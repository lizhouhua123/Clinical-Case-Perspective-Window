import { useState, useEffect } from 'react';

interface TitleSectionProps {
  show: boolean;
}

export default function TitleSection({ show }: TitleSectionProps) {
  const title = '医患之间，隔着一道墙';
  const [visibleLetters, setVisibleLetters] = useState(0);

  useEffect(() => {
    if (!show) return;
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setVisibleLetters(i);
      if (i >= title.length) {
        clearInterval(interval);
      }
    }, 120);
    return () => clearInterval(interval);
  }, [show]);

  return (
    <div className="relative z-10 text-center pt-8 md:pt-12 px-4">
      <h1 className="font-serif text-2xl md:text-3xl lg:text-4xl font-bold text-wall-text tracking-[0.15em] leading-relaxed">
        {title.split('').map((char, idx) => (
          <span
            key={idx}
            className={`inline-block transition-all duration-300 ${
              idx < visibleLetters
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-4'
            }`}
            style={{ transitionDelay: `${idx * 30}ms` }}
          >
            {char}
          </span>
        ))}
      </h1>

      <div
        className={`mt-4 flex items-center justify-center gap-4 transition-opacity duration-1000 ${
          visibleLetters >= title.length ? 'opacity-60' : 'opacity-0'
        }`}
      >
        <div className="h-px w-10 md:w-16 bg-gradient-to-r from-transparent to-wall-muted" />
        <span className="text-wall-muted text-xs md:text-sm tracking-widest font-light">
          序幕
        </span>
        <div className="h-px w-10 md:w-16 bg-gradient-to-l from-transparent to-wall-muted" />
      </div>
    </div>
  );
}
