import { AlertTriangle, HelpCircle, Frown } from 'lucide-react';
import type { ConflictItem, EmotionType } from '@/data/conflicts';

interface PatientColumnProps {
  items: ConflictItem[];
  visibleCount: number;
  activeIndex: number; // 当前正在播放的患者索引，-1 表示无
}

function EmotionIcon({ type }: { type: EmotionType }) {
  const iconClass = 'w-5 h-5 flex-shrink-0';
  switch (type) {
    case 'anger':
      return <AlertTriangle className={`${iconClass} text-wall-patient`} />;
    case 'confusion':
      return <HelpCircle className={`${iconClass} text-wall-patient/70`} />;
    case 'sadness':
      return <Frown className={`${iconClass} text-wall-patient/80`} />;
  }
}

export default function PatientColumn({ items, visibleCount, activeIndex }: PatientColumnProps) {
  return (
    <div className="flex flex-col justify-center h-full px-3 md:px-4 lg:px-6">
      <div className="flex items-center gap-2 mb-3 opacity-80">
        <div className="w-8 h-8 rounded-full bg-wall-patient/20 flex items-center justify-center">
          <span className="text-wall-patient text-sm font-bold">患</span>
        </div>
        <span className="text-wall-muted text-base md:text-lg tracking-wider font-medium">
          患者眼中的世界
        </span>
      </div>

      <div className="flex flex-col space-y-3 md:space-y-4">
        {items.map((item, idx) => {
          const isVisible = idx < visibleCount;
          const isActive = idx === activeIndex;
          return (
            <div
              key={item.id}
              className={`h-[60px] md:h-[80px] flex items-center ${isVisible ? 'animate-slide-in-left' : 'opacity-0'}`}
              style={{
                animationFillMode: 'forwards',
              }}
            >
              <div
                className={`relative grid grid-cols-[auto_1fr] items-center gap-3 px-3 py-2 md:px-4 md:py-3 rounded-lg border transition-all duration-300 w-full h-full ${
                  isVisible
                    ? isActive
                      ? 'bg-wall-patientSoft/80 border-wall-patient/60 shadow-lg scale-105'
                      : 'bg-wall-patientSoft/60 border-wall-patient/30'
                    : 'bg-transparent border-transparent'
                }`}
              >
                <div
                  className="absolute -left-2 top-1/2 -translate-y-1/2 w-0 h-0"
                  style={{
                    borderTop: '6px solid transparent',
                    borderBottom: '6px solid transparent',
                    borderRight: isVisible
                      ? '6px solid rgba(201, 74, 74, 0.4)'
                      : '6px solid transparent',
                    transition: 'border-right-color 0.3s',
                  }}
                />
                <div className="flex-shrink-0 relative z-10">
                  <EmotionIcon type={item.patient.emotion} />
                </div>
                <div className="min-w-0 relative z-10">
                  <p className="text-wall-text text-sm md:text-base lg:text-lg font-medium whitespace-nowrap overflow-hidden text-ellipsis">
                    "{item.patient.title}"
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
