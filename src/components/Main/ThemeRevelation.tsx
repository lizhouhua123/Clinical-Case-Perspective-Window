import { useState, useEffect, useRef } from 'react';

interface ThemeRevelationProps {
  onComplete?: () => void;
}

const wallWords = [
  '误解', '猜疑', '信息差', '不信任', '怕麻烦',
  '不懂', '隐瞒', '侥幸', '固执', '偏见',
  '焦虑', '害怕', '省钱', '省事', '老毛病',
];

export default function ThemeRevelation({ onComplete }: ThemeRevelationProps) {
  const [stage, setStage] = useState(0);
  const [showFinal, setShowFinal] = useState(false);
  const [clickable, setClickable] = useState(false);
  const finalAudioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];

    timers.push(setTimeout(() => setStage(1), 500));
    timers.push(setTimeout(() => setStage(2), 2000));
    timers.push(setTimeout(() => setStage(3), 4000));
    timers.push(setTimeout(() => setStage(4), 6500));
    timers.push(setTimeout(() => setStage(5), 8500));
    timers.push(setTimeout(() => setStage(6), 11500));
    timers.push(setTimeout(() => setStage(7), 13500));
    timers.push(setTimeout(() => {
      setShowFinal(true);
      finalAudioRef.current = new Audio('/audio/theme-final-voice.mp3');
      finalAudioRef.current.volume = 1;
      finalAudioRef.current.onended = () => {
        setClickable(true);
      };
      finalAudioRef.current.play().catch(() => {
        setTimeout(() => setClickable(true), 3000);
      });
    }, 15500));

    return () => {
      timers.forEach(clearTimeout);
      if (finalAudioRef.current) {
        finalAudioRef.current.pause();
        finalAudioRef.current = null;
      }
    };
  }, []);

  const wallCracked = stage >= 6;
  const wallBroken = stage >= 7;

  const handleClick = () => {
    if (clickable && onComplete) {
      onComplete();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
      style={{
        background: 'radial-gradient(ellipse at center, #0a1929 0%, #050a14 50%, #000000 100%)',
      }}
      onClick={handleClick}
    >
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            'radial-gradient(circle at 30% 20%, rgba(74, 158, 255, 0.4) 0%, transparent 50%), radial-gradient(circle at 70% 80%, rgba(74, 158, 255, 0.2) 0%, transparent 50%)',
        }}
      />

      {!showFinal && (
        <div className="relative w-full h-full flex items-center justify-center">
          <div
            className="absolute flex flex-col items-center transition-all duration-1000"
            style={{
              left: '15%',
              top: '50%',
              transform: `translateY(-50%) translateX(${stage >= 1 ? '30%' : '0'})`,
              transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          >
            <PatientSilhouette />
            {stage >= 3 && (
              <div className="mt-8 animate-fade-in text-center max-w-xs">
                <div
                  className="text-lg font-bold mb-4"
                  style={{
                    color: '#ffffff',
                    fontFamily: 'Microsoft YaHei, SimHei, sans-serif',
                    lineHeight: '1.8',
                    fontStyle: 'italic',
                    textShadow: '0 0 20px rgba(74, 158, 255, 0.6), 0 0 40px rgba(74, 158, 255, 0.3)',
                  }}
                >
                  "医生，我就是发烧而已..."
                </div>
                <div
                  className="text-base"
                  style={{
                    color: 'rgba(255, 255, 255, 0.9)',
                    fontFamily: 'Microsoft YaHei, SimHei, sans-serif',
                    lineHeight: '2',
                    textShadow: '0 0 15px rgba(74, 158, 255, 0.4)',
                  }}
                >
                  ——原来我没说出口的，<br />
                  那些"不重要"的老毛病，<br />
                  竟然这么重要。
                </div>
              </div>
            )}
          </div>

          <div
            className="absolute flex flex-col items-center transition-all duration-1000"
            style={{
              right: '15%',
              top: '50%',
              transform: `translateY(-50%) translateX(${stage >= 3 ? '-30%' : '0'})`,
              transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
              transitionDelay: stage >= 3 ? '0ms' : '0ms',
            }}
          >
            <DoctorSilhouette />
            {stage >= 5 && (
              <div className="mt-8 animate-fade-in text-center max-w-xs">
                <div
                  className="text-lg font-bold mb-4"
                  style={{
                    color: '#ffffff',
                    fontFamily: 'Microsoft YaHei, SimHei, sans-serif',
                    lineHeight: '1.8',
                    fontStyle: 'italic',
                    textShadow: '0 0 20px rgba(74, 158, 255, 0.6), 0 0 40px rgba(74, 158, 255, 0.3)',
                  }}
                >
                  "先做个检查吧..."
                </div>
                <div
                  className="text-base"
                  style={{
                    color: 'rgba(255, 255, 255, 0.9)',
                    fontFamily: 'Microsoft YaHei, SimHei, sans-serif',
                    lineHeight: '2',
                    textShadow: '0 0 15px rgba(74, 158, 255, 0.4)',
                  }}
                >
                  ——不是我不信任你，<br />
                  而是发热背后的病因，<br />
                  需要证据来寻找。
                </div>
              </div>
            )}
          </div>

          <div
            className="absolute left-1/2 top-1/2 transition-all duration-700"
            style={{
              transform: `translate(-50%, -50%) scale(${wallBroken ? 1.5 : 1})`,
              opacity: wallBroken ? 0 : 1,
            }}
          >
            <WordWall cracked={wallCracked} broken={wallBroken} />
          </div>
        </div>
      )}

      {showFinal && (
        <div className="absolute inset-0 flex items-center justify-center animate-fade-in">
          <div
            className="text-center px-8"
            style={{
              maxWidth: '900px',
            }}
          >
            <div
              style={{
                color: '#ffffff',
                fontFamily: 'Microsoft YaHei, SimHei, sans-serif',
                fontSize: 'clamp(20px, 3vw, 32px)',
                fontWeight: '500',
                letterSpacing: '0.05em',
                lineHeight: '2',
                textShadow:
                  '0 0 20px rgba(74, 158, 255, 0.5), 0 0 40px rgba(74, 158, 255, 0.3)',
                WebkitTextStroke: '0.5px rgba(74, 158, 255, 0.4)',
                marginBottom: '28px',
                opacity: 0.95,
              }}
            >
              我们不是要你成为医生，<br />
              只是想让你知道：
            </div>

            <div
              style={{
                color: '#ffffff',
                fontFamily: 'Microsoft YaHei, SimHei, sans-serif',
                fontSize: 'clamp(22px, 3vw, 38px)',
                fontWeight: '700',
                letterSpacing: '0.06em',
                lineHeight: '2.2',
                textShadow:
                  '0 0 20px rgba(74, 158, 255, 0.6), 0 0 40px rgba(74, 158, 255, 0.4), 0 0 60px rgba(30, 80, 160, 0.3)',
                WebkitTextStroke: '1px rgba(74, 158, 255, 0.5)',
                filter: 'drop-shadow(0 0 12px rgba(74, 158, 255, 0.4))',
                marginBottom: '32px',
              }}
            >
              发热的背后，藏着无数种可能。<br />
              你多说一句病史，<br />
              医生多做一项检查，<br />
              我们就离真相近了一步。
            </div>

            <div
              style={{
                color: '#ffffff',
                fontFamily: 'Microsoft YaHei, SimHei, sans-serif',
                fontSize: 'clamp(24px, 3.5vw, 44px)',
                fontWeight: '900',
                letterSpacing: '0.1em',
                lineHeight: '1.8',
                textShadow:
                  '0 0 20px rgba(74, 158, 255, 0.6), 0 0 40px rgba(74, 158, 255, 0.4), 0 0 60px rgba(30, 80, 160, 0.3)',
                WebkitTextStroke: '1px rgba(74, 158, 255, 0.5)',
                filter: 'drop-shadow(0 0 12px rgba(74, 158, 255, 0.4))',
                opacity: 0.95,
              }}
            >
              这堵墙，<br />
              需要我们一起推倒。
            </div>
          </div>

          {clickable && (
            <div
              className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-pulse"
              style={{
                color: 'rgba(255, 255, 255, 0.6)',
                fontFamily: 'Microsoft YaHei, SimHei, sans-serif',
                fontSize: '16px',
                letterSpacing: '0.1em',
              }}
            >
              点击任意位置返回主页面
            </div>
          )}
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 1s ease-out forwards;
        }
        @keyframes floatUp {
          0% { opacity: 1; transform: translateY(0) rotate(0deg); }
          100% { opacity: 0; transform: translateY(-100px) rotate(20deg); }
        }
        .word-float {
          animation: floatUp 1.5s ease-out forwards;
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        .wall-shake {
          animation: shake 0.3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

function PatientSilhouette() {
  return (
    <svg width="120" height="160" viewBox="0 0 120 160" fill="none" style={{ filter: 'drop-shadow(0 0 15px rgba(74, 158, 255, 0.5))' }}>
      <path
        d="M60 20C73.8 20 85 31.2 85 45C85 58.8 73.8 70 60 70C46.2 70 35 58.8 35 45C35 31.2 46.2 20 60 20Z"
        fill="#90caf9"
      />
      <path
        d="M30 150L35 110C35 90 50 75 60 75C70 75 85 90 85 110L90 150H30Z"
        fill="#90caf9"
      />
      <path
        d="M35 100L20 120M85 100L100 120"
        stroke="#90caf9"
        strokeWidth="10"
        strokeLinecap="round"
      />
      <ellipse cx="95" cy="125" rx="12" ry="8" fill="#90caf9" />
    </svg>
  );
}

function DoctorSilhouette() {
  return (
    <svg width="120" height="160" viewBox="0 0 120 160" fill="none" style={{ filter: 'drop-shadow(0 0 15px rgba(74, 158, 255, 0.5))' }}>
      <path
        d="M60 18C74.9 18 87 30.1 87 45C87 59.9 74.9 72 60 72C45.1 72 33 59.9 33 45C33 30.1 45.1 18 60 18Z"
        fill="#e3f2fd"
        stroke="#90caf9"
        strokeWidth="2"
      />
      <path
        d="M55 12H65C72 12 77 17 77 24V28C77 30 75 32 73 32H47C45 32 43 30 43 28V24C43 17 48 12 55 12Z"
        fill="#e3f2fd"
        stroke="#90caf9"
        strokeWidth="2"
      />
      <path
        d="M28 150L33 108C33 88 48 73 60 73C72 73 87 88 87 108L92 150H28Z"
        fill="#ffffff"
        stroke="#90caf9"
        strokeWidth="2"
      />
      <path
        d="M57 90L63 90M60 87L60 93"
        stroke="#64b5f6"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M33 98L18 115M87 98L102 115"
        stroke="#ffffff"
        strokeWidth="10"
        strokeLinecap="round"
      />
      <circle cx="107" cy="118" r="12" fill="#ffffff" stroke="#90caf9" strokeWidth="2" />
      <path
        d="M102 118L112 118M107 113L107 123"
        stroke="#64b5f6"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function WordWall({ cracked, broken }: { cracked: boolean; broken: boolean }) {
  const rows = 2;
  const cols = 5;

  return (
    <div
      className={`relative ${cracked && !broken ? 'wall-shake' : ''}`}
      style={{
        width: '260px',
        height: '360px',
        perspective: '1000px',
      }}
    >
      <div
        className="absolute inset-0 grid"
        style={{
          gridTemplateRows: `repeat(${rows}, 1fr)`,
          gridTemplateColumns: `repeat(${cols}, 1fr)`,
          gap: '10px',
          padding: '12px',
          backgroundColor: 'rgba(30, 50, 80, 0.9)',
          borderRadius: '8px',
          boxShadow:
            '0 10px 40px rgba(0,0,0,0.5), inset 0 2px 4px rgba(74, 158, 255, 0.2)',
          transform: broken ? 'rotateY(90deg) scale(1.2)' : 'rotateY(0deg)',
          transition: 'transform 0.8s ease-out, opacity 0.8s ease-out',
          opacity: broken ? 0 : 1,
        }}
      >
        {Array.from({ length: rows * cols }).map((_, i) => {
          const word = wallWords[i % wallWords.length];
          const size = 20 + (i % 3) * 8;
          return (
            <div
              key={i}
              className={`flex items-center justify-center ${broken ? 'word-float' : ''}`}
              style={{
                color: i % 3 === 0 ? '#90caf9' : i % 3 === 1 ? '#64b5f6' : '#bbdefb',
                fontFamily: 'Microsoft YaHei, SimHei, sans-serif',
                fontSize: `${size}px`,
                fontWeight: '600',
                opacity: cracked ? (i % 2 === 0 ? 0.6 : 0.8) : 0.9,
                textShadow: '0 0 8px rgba(74, 158, 255, 0.4)',
                animationDelay: `${i * 0.05}s`,
              }}
            >
              {word}
            </div>
          );
        })}
      </div>

      {cracked && !broken && (
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 260 360"
        >
          <path
            d="M130 10 L100 60 L140 110 L110 170 L150 230 L105 290 L135 350"
            stroke="rgba(255,255,255,0.8)"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M130 90 L80 140 M130 200 L180 160 M130 280 L90 250"
            stroke="rgba(255,255,255,0.6)"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          />
        </svg>
      )}
    </div>
  );
}
