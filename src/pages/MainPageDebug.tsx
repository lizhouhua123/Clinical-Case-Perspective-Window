import { useState } from 'react';

// 所有素材
const allPanels = [
  { id: 1, src: '/main-left/1.png', name: '体检常见疑惑答疑宣传栏', group: '左侧' },
  { id: 2, src: '/main-left/2.png', name: '医患双向沟通科普海报', group: '左侧' },
  { id: 3, src: '/main-left/3.png', name: '医生完整诊疗决策流程图', group: '左侧' },
  { id: 4, src: '/main-left/4.png', name: '医疗信任科普留言互动橱窗', group: '左侧' },
  { id: 5, src: '/main-left/5.png', name: '疾病潜在风险科普墙', group: '左侧' },
  { id: 10, src: '/main-center/10.png', name: '资源10', group: '中央' },
  { id: 11, src: '/main-center/11.png', name: '资源11', group: '中央' },
  { id: 12, src: '/main-center/12.png', name: '资源12', group: '中央' },
  { id: 13, src: '/main-center/13.png', name: '资源13', group: '中央' },
  { id: 14, src: '/main-center/14.png', name: '资源14', group: '中央' },
  { id: 20, src: '/main-right/1.png', name: '右侧图表1', group: '右侧' },
  { id: 21, src: '/main-right/2.png', name: '右侧图表2', group: '右侧' },
  { id: 22, src: '/main-right/3.png', name: '右侧图表3', group: '右侧' },
  { id: 23, src: '/main-right/4.png', name: '右侧图表4', group: '右侧' },
  { id: 24, src: '/main-right/5.png', name: '右侧图表5', group: '右侧' },
];

// 每个素材的初始位置（可调整）
type PanelPos = { left: number; top: number; width: number; height: number };
const defaultPositions: Record<number, PanelPos> = {
  1:  { left: 1.2, top: 15.6, width: 27.5, height: 15 },
  2:  { left: 1.2, top: 28.5, width: 27.5, height: 15 },
  3:  { left: 1.2, top: 42,   width: 27.5, height: 15 },
  4:  { left: 1.2, top: 55.5, width: 27.5, height: 15 },
  5:  { left: 1.1, top: 68.5, width: 27, height: 17 },
  10: { left: 17.7, top: 4,   width: 12.5, height: 15 },
  11: { left: 31,   top: 4,   width: 12.5, height: 15 },
  12: { left: 44.5, top: 4,   width: 12.5, height: 15 },
  13: { left: 57.6, top: 4,   width: 12.5, height: 15 },
  14: { left: 69.8, top: 4,   width: 12.5, height: 15 },
  20: { left: 71.6, top: 15.5, width: 27.5, height: 15 },
  21: { left: 71.6, top: 28.3, width: 27.5, height: 15 },
  22: { left: 71.6, top: 41,   width: 27.5, height: 15 },
  23: { left: 71.6, top: 54,   width: 27.5, height: 15 },
  24: { left: 71.6, top: 67,   width: 27.5, height: 15 },
};

const groupColors: Record<string, { border: string; bg: string; text: string; selected: string }> = {
  '左侧': { border: 'border-blue-400', bg: 'bg-blue-600', text: 'text-blue-400', selected: 'border-blue-400' },
  '中央': { border: 'border-green-400', bg: 'bg-green-600', text: 'text-green-400', selected: 'border-green-400' },
  '右侧': { border: 'border-purple-400', bg: 'bg-purple-600', text: 'text-purple-400', selected: 'border-purple-400' },
};

export default function MainPageDebug() {
  const [showEffect, setShowEffect] = useState(true);
  const [showGrid, setShowGrid] = useState(true);
  const [selectedId, setSelectedId] = useState<number | null>(1);
  const [positions, setPositions] = useState<Record<number, PanelPos>>(defaultPositions);
  const [panelPos, setPanelPos] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const dragStart = { x: 0, y: 0, px: 0, py: 0 };

  const handleDragStart = (e: React.MouseEvent) => {
    e.preventDefault();
    setDragging(true);
    dragStart.x = e.clientX;
    dragStart.y = e.clientY;
    dragStart.px = panelPos.x;
    dragStart.py = panelPos.y;

    const handleMove = (ev: MouseEvent) => {
      setPanelPos({
        x: dragStart.px + (ev.clientX - dragStart.x),
        y: dragStart.py + (ev.clientY - dragStart.y),
      });
    };
    const handleUp = () => {
      setDragging(false);
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseup', handleUp);
    };
    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mouseup', handleUp);
  };

  const updatePos = (id: number, key: keyof PanelPos, value: number) => {
    setPositions((prev) => ({
      ...prev,
      [id]: { ...prev[id], [key]: value },
    }));
  };

  const selected = selectedId !== null ? positions[selectedId] : null;
  const selectedPanel = selectedId !== null ? allPanels.find((p) => p.id === selectedId) : null;
  const color = selectedPanel ? groupColors[selectedPanel.group] : null;

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gray-900 flex items-center justify-center">
      <div
        className="relative"
        style={{
          width: 'min(100vw, calc(100vh * 2848 / 1600))',
          height: 'min(100vh, calc(100vw * 1600 / 2848))',
        }}
      >
        {/* 原始背景图 */}
        <img
          src="/main-bg.png"
          alt="主页面背景"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* 效果图叠加 */}
        {showEffect && (
          <img
            src="/main-final.png"
            alt="效果图"
            className="absolute inset-0 w-full h-full object-contain pointer-events-none"
            style={{ opacity: 0.5, mixBlendMode: 'screen' }}
          />
        )}

        {/* 网格辅助线 */}
        {showGrid && (
          <div className="absolute inset-0 pointer-events-none">
            {Array.from({ length: 19 }).map((_, i) => (
              <div
                key={`v-${i}`}
                className="absolute top-0 bottom-0 border-l border-red-500/20"
                style={{ left: `${(i + 1) * 5}%` }}
              />
            ))}
            {Array.from({ length: 19 }).map((_, i) => (
              <div
                key={`h-${i}`}
                className="absolute left-0 right-0 border-t border-red-500/20"
                style={{ top: `${(i + 1) * 5}%` }}
              />
            ))}
            {Array.from({ length: 9 }).map((_, i) => (
              <div
                key={`lv-${i}`}
                className="absolute bottom-0 text-red-400/70 text-[10px] font-mono bg-black/50 px-1"
                style={{ left: `${(i + 1) * 10 - 2}%` }}
              >
                {(i + 1) * 10}%
              </div>
            ))}
            {Array.from({ length: 9 }).map((_, i) => (
              <div
                key={`lh-${i}`}
                className="absolute left-0 text-red-400/70 text-[10px] font-mono bg-black/50 px-1"
                style={{ top: `${(i + 1) * 10}%` }}
              >
                {(i + 1) * 10}%
              </div>
            ))}
          </div>
        )}

        {/* 所有素材 - 独立定位 */}
        {allPanels.map((panel) => {
          const pos = positions[panel.id];
          const isSelected = selectedId === panel.id;
          const c = groupColors[panel.group];
          return (
            <div
              key={panel.id}
              className={`absolute cursor-pointer ${isSelected ? c.selected + ' border-2' : 'border border-transparent'}`}
              style={{
                left: `${pos.left}%`,
                top: `${pos.top}%`,
                width: `${pos.width}%`,
                height: `${pos.height}%`,
              }}
              onClick={() => setSelectedId(panel.id)}
            >
              <img
                src={panel.src}
                alt={panel.name}
                className="w-full h-full object-contain drop-shadow-lg"
              />
              {isSelected && (
                <div className={`absolute -top-5 left-0 ${c.text} text-xs font-bold bg-black/80 px-2 py-0.5 rounded whitespace-nowrap z-10`}>
                  {panel.name}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* 控制面板 */}
      <div
        className="absolute top-4 right-4 bg-black/90 text-white p-3 rounded-lg z-50 w-72 max-h-[95vh] overflow-y-auto"
        style={{
          transform: `translate(${panelPos.x}px, ${panelPos.y}px)`,
        }}
      >
        {/* 拖动把手 */}
        <div
          className="mb-2 p-1 bg-gray-700 rounded cursor-move text-center text-xs text-gray-300 hover:bg-gray-600 select-none"
          onMouseDown={handleDragStart}
        >
          ≡ 拖动此处移动面板
        </div>

        {/* 顶部按钮 */}
        <div className="mb-3 flex gap-2">
          <button
            onClick={() => setShowEffect(!showEffect)}
            className="px-2 py-1 bg-purple-600 text-xs rounded hover:bg-purple-700"
          >
            {showEffect ? '隐藏效果图' : '显示效果图'}
          </button>
          <button
            onClick={() => setShowGrid(!showGrid)}
            className="px-2 py-1 bg-red-600 text-xs rounded hover:bg-red-700"
          >
            {showGrid ? '隐藏网格' : '显示网格'}
          </button>
        </div>

        {/* 素材选择列表 */}
        <div className="mb-3">
          <div className="text-xs text-gray-400 mb-1">选择素材：</div>
          <div className="grid grid-cols-2 gap-1">
            {allPanels.map((panel) => {
              const c = groupColors[panel.group];
              const isActive = selectedId === panel.id;
              return (
                <button
                  key={panel.id}
                  onClick={() => setSelectedId(panel.id)}
                  className={`px-2 py-1 text-[10px] rounded truncate ${
                    isActive ? c.bg + ' text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  {panel.group}#{panel.id}
                </button>
              );
            })}
          </div>
        </div>

        {/* 选中素材的滑块控制 */}
        {selected && selectedPanel && color && (
          <div className="space-y-2">
            <div className={`${color.text} text-xs font-bold`}>
              调整: {selectedPanel.name}
            </div>
            {(['left', 'top', 'width', 'height'] as const).map((key) => {
              const labels: Record<string, string> = {
                left: 'left (左距离)',
                top: 'top (上距离)',
                width: 'width (宽度)',
                height: 'height (高度)',
              };
              const maxes: Record<string, number> = {
                left: 80,
                top: 80,
                width: 50,
                height: 50,
              };
              return (
                <div key={key}>
                  <label className="text-xs flex justify-between">
                    <span>{labels[key]}</span>
                    <span className="font-mono text-yellow-400">{selected[key]}%</span>
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="range"
                      min="0"
                      max={maxes[key]}
                      step="0.5"
                      value={selected[key]}
                      onChange={(e) => updatePos(selectedPanel.id, key, Number(e.target.value))}
                      className="flex-1"
                    />
                    <input
                      type="number"
                      min="0"
                      max={maxes[key]}
                      step="0.5"
                      value={selected[key]}
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        if (!isNaN(val) && val >= 0 && val <= maxes[key]) {
                          updatePos(selectedPanel.id, key, val);
                        }
                      }}
                      className="w-16 bg-gray-800 text-yellow-400 text-xs font-mono px-2 py-1 rounded border border-gray-600 focus:border-yellow-400 outline-none"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* 所有素材配置输出 */}
        <div className="mt-3 pt-3 border-t border-gray-700">
          <div className="text-xs text-gray-400 mb-1">所有素材配置（复制给AI）：</div>
          <div className="bg-gray-900 p-2 rounded text-[9px] font-mono text-cyan-400 max-h-48 overflow-y-auto whitespace-pre">
            {allPanels.map((panel) => {
              const pos = positions[panel.id];
              return `${panel.group}#${panel.id}: L=${pos.left} T=${pos.top} W=${pos.width} H=${pos.height}`;
            }).join('\n')}
          </div>
        </div>
      </div>
    </div>
  );
}