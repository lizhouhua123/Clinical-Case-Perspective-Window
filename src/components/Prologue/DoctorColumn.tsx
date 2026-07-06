import type { ConflictItem } from '@/data/conflicts';

interface DoctorColumnProps {
  items: ConflictItem[];
  visibleCount: number;
  activeIndex: number; // 当前正在播放的医生索引，-1 表示无
}

export default function DoctorColumn({ items, visibleCount, activeIndex }: DoctorColumnProps) {
  return (
    <div className="flex flex-col justify-center h-full px-3 md:px-4 lg:px-6">
      <div className="flex items-center justify-end gap-2 mb-3 opacity-80">
        <span className="text-wall-muted text-base md:text-lg tracking-wider font-medium">
          医生眼中的世界
        </span>
        <div className="w-8 h-8 rounded-full bg-wall-doctor/20 flex items-center justify-center">
          <span className="text-wall-doctor text-sm font-bold">医</span>
        </div>
      </div>

      <div className="flex flex-col space-y-3 md:space-y-4">
        {items.map((item, idx) => {
          const isVisible = idx < visibleCount;
          const isActive = idx === activeIndex;
          return (
            <div
              key={item.id}
              className={`h-[60px] md:h-[80px] flex items-center ${isVisible ? 'animate-bubble-pop' : 'opacity-0'}`}
              style={{
                animationFillMode: 'forwards',
              }}
            >
              <div
                className={`relative grid grid-cols-[1fr_auto] items-center gap-3 px-3 py-2 md:px-4 md:py-3 rounded-lg border transition-all duration-300 w-full h-full ${
                  isVisible
                    ? isActive
                      ? 'bg-wall-doctorSoft/80 border-wall-doctor/60 shadow-lg scale-105'
                      : 'bg-wall-doctorSoft/60 border-wall-doctor/30'
                    : 'bg-transparent border-transparent'
                }`}
              >
                <div
                  className="absolute -right-2 top-1/2 -translate-y-1/2 w-0 h-0"
                  style={{
                    borderTop: '6px solid transparent',
                    borderBottom: '6px solid transparent',
                    borderLeft: isVisible
                      ? '6px solid rgba(90, 143, 184, 0.4)'
                      : '6px solid transparent',
                    transition: 'border-left-color 0.3s',
                  }}
                />
                <p className="text-wall-text/90 text-sm md:text-base lg:text-lg font-medium italic text-right whitespace-nowrap overflow-hidden text-ellipsis relative z-10">
                  "{item.doctor.monologue}"
                </p>
                <div className="w-5 flex-shrink-0 relative z-10" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
