import { useState } from 'react';

interface ElementPos {
  left: number;
  top: number;
  width: number;
  height: number;
  fontSize: number;
}

const defaultElements: Record<string, ElementPos> = {
  patient: { left: 15, top: 50, width: 8, height: 10, fontSize: 16 },
  patientText: { left: 15, top: 65, width: 20, height: 20, fontSize: 16 },
  doctor: { left: 77, top: 50, width: 8, height: 10, fontSize: 16 },
  doctorText: { left: 77, top: 65, width: 20, height: 20, fontSize: 16 },
  wall: { left: 41, top: 35, width: 18, height: 30, fontSize: 18 },
  finalTitle: { left: 50, top: 35, width: 80, height: 10, fontSize: 28 },
  finalContent: { left: 50, top: 50, width: 80, height: 20, fontSize: 24 },
  finalHighlight: { left: 50, top: 75, width: 80, height: 10, fontSize: 32 },
};

const elementNames: Record<string, string> = {
  patient: '患者剪影',
  patientText: '患者对话文字',
  doctor: '医生剪影',
  doctorText: '医生对话文字',
  wall: '文字墙',
  finalTitle: '结尾标题',
  finalContent: '结尾内容',
  finalHighlight: '结尾点睛句',
};

export default function ThemeDebug() {
  const [elements, setElements] = useState<Record<string, ElementPos>>(defaultElements);
  const [selectedElement, setSelectedElement] = useState<string>('patient');
  const [stage, setStage] = useState(0);
  const [showFinal, setShowFinal] = useState(false);
  const [panelPos, setPanelPos] = useState({ x: 70, y: 10 });
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
        x: Math.max(0, Math.min(80, dragStart.px + (ev.clientX - dragStart.x))),
        y: Math.max(0, Math.min(80, dragStart.py + (ev.clientY - dragStart.y))),
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

  const updateElement = (key: string, prop: keyof ElementPos, value: number) => {
    setElements((prev) => ({
      ...prev,
      [key]: { ...prev[key], [prop]: value },
    }));
  };

  const resetAll = () => {
    setElements(defaultElements);
  };

  const wallCracked = stage >= 2;
  const wallBroken = stage >= 7;

  return (
    <div className="relative w-full h-screen overflow-hidden" style={{ background: 'radial-gradient(ellipse at center, #0a1929 0%, #050a14 50%, #000000 100%)' }}>
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: 'radial-gradient(circle at 30% 20%, rgba(74, 158, 255, 0.4) 0%, transparent 50%), radial-gradient(circle at 70% 80%, rgba(74, 158, 255, 0.2) 0%, transparent 50%)'
      }} />

      {/* 调试网格 */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={`h-${i}`} className="absolute w-full border-t border-white/20" style={{ top: `${i * 5}%` }} />
        ))}
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={`v-${i}`} className="absolute h-full border-l border-white/20" style={{ left: `${i * 5}%` }} />
        ))}
      </div>

      {/* 元素显示区 */}
      {!showFinal && (
        <>
          {/* 患者剪影 */}
          <div
            className={`absolute flex flex-col items-center border-2 cursor-pointer transition-all ${
              selectedElement === 'patient' ? 'border-yellow-400 bg-yellow-400/10' : 'border-transparent hover:border-white/30'
            }`}
            style={{
              left: `${elements.patient.left}%`,
              top: `${elements.patient.top}%`,
              width: `${elements.patient.width}%`,
              height: `${elements.patient.height}%`,
              transform: `translateY(-50%) translateX(${stage >= 1 ? '30%' : '0'})`,
            }}
            onClick={() => setSelectedElement('patient')}
          >
            <svg width="120" height="160" viewBox="0 0 120 160" fill="none" style={{ filter: 'drop-shadow(0 0 15px rgba(74, 158, 255, 0.5))', width: '100%', height: '100%' }}>
              <path d="M60 20C73.8 20 85 31.2 85 45C85 58.8 73.8 70 60 70C46.2 70 35 58.8 35 45C35 31.2 46.2 20 60 20Z" fill="#90caf9" />
              <path d="M30 150L35 110C35 90 50 75 60 75C70 75 85 90 85 110L90 150H30Z" fill="#90caf9" />
              <path d="M35 100L20 120M85 100L100 120" stroke="#90caf9" strokeWidth="10" strokeLinecap="round" />
              <ellipse cx="95" cy="125" rx="12" ry="8" fill="#90caf9" />
            </svg>
            {stage >= 3 && (
              <div className="mt-2 text-center" style={{ fontSize: `${elements.patientText.fontSize}px`, color: '#ffffff', fontFamily: 'Microsoft YaHei, SimHei, sans-serif', width: `${elements.patientText.width}%`, maxWidth: '200px' }}>
                <div style={{ fontStyle: 'italic', textShadow: '0 0 20px rgba(74, 158, 255, 0.6)' }}>"医生，我就是发烧而已..."</div>
                <div style={{ fontSize: '0.8em', marginTop: '8px' }}>——原来我没说出口的，那些"不重要"的老毛病，竟然这么重要。</div>
              </div>
            )}
          </div>

          {/* 医生剪影 */}
          <div
            className={`absolute flex flex-col items-center border-2 cursor-pointer transition-all ${
              selectedElement === 'doctor' ? 'border-yellow-400 bg-yellow-400/10' : 'border-transparent hover:border-white/30'
            }`}
            style={{
              left: `${elements.doctor.left}%`,
              top: `${elements.doctor.top}%`,
              width: `${elements.doctor.width}%`,
              height: `${elements.doctor.height}%`,
              transform: `translateY(-50%) translateX(${stage >= 3 ? '-30%' : '0'})`,
            }}
            onClick={() => setSelectedElement('doctor')}
          >
            <svg width="120" height="160" viewBox="0 0 120 160" fill="none" style={{ filter: 'drop-shadow(0 0 15px rgba(74, 158, 255, 0.5))', width: '100%', height: '100%' }}>
              <path d="M60 18C74.9 18 87 30.1 87 45C87 59.9 74.9 72 60 72C45.1 72 33 59.9 33 45C33 30.1 45.1 18 60 18Z" fill="#e3f2fd" stroke="#90caf9" strokeWidth="2" />
              <path d="M55 12H65C72 12 77 17 77 24V28C77 30 75 32 73 32H47C45 32 43 30 43 28V24C43 17 48 12 55 12Z" fill="#e3f2fd" stroke="#90caf9" strokeWidth="2" />
              <path d="M28 150L33 108C33 88 48 73 60 73C72 73 87 88 87 108L92 150H28Z" fill="#ffffff" stroke="#90caf9" strokeWidth="2" />
              <path d="M57 90L63 90M60 87L60 93" stroke="#64b5f6" strokeWidth="3" strokeLinecap="round" />
              <path d="M33 98L18 115M87 98L102 115" stroke="#ffffff" strokeWidth="10" strokeLinecap="round" />
              <circle cx="107" cy="118" r="12" fill="#ffffff" stroke="#90caf9" strokeWidth="2" />
              <path d="M102 118L112 118M107 113L107 123" stroke="#64b5f6" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
            {stage >= 5 && (
              <div className="mt-2 text-center" style={{ fontSize: `${elements.doctorText.fontSize}px`, color: '#ffffff', fontFamily: 'Microsoft YaHei, SimHei, sans-serif', width: `${elements.doctorText.width}%`, maxWidth: '200px' }}>
                <div style={{ fontStyle: 'italic', textShadow: '0 0 20px rgba(74, 158, 255, 0.6)' }}>"先做个检查吧..."</div>
                <div style={{ fontSize: '0.8em', marginTop: '8px' }}>——不是我不信任你，而是发热背后的病因，需要证据来寻找。</div>
              </div>
            )}
          </div>

          {/* 文字墙 */}
          <div
            className={`absolute border-2 cursor-pointer transition-all ${
              selectedElement === 'wall' ? 'border-yellow-400 bg-yellow-400/10' : 'border-transparent hover:border-white/30'
            }`}
            style={{
              left: `${elements.wall.left}%`,
              top: `${elements.wall.top}%`,
              width: `${elements.wall.width}%`,
              height: `${elements.wall.height}%`,
              transform: `scale(${wallBroken ? 1.5 : 1})`,
              opacity: wallBroken ? 0 : 1,
            }}
            onClick={() => setSelectedElement('wall')}
          >
            <div className="w-full h-full bg-[rgba(30,50,80,0.9)] rounded-lg p-3 grid grid-cols-5 grid-rows-3 gap-1" style={{ boxShadow: '0 10px 40px rgba(0,0,0,0.5), inset 0 2px 4px rgba(74, 158, 255, 0.2)' }}>
              {['误解', '猜疑', '信息差', '不信任', '怕麻烦', '不懂', '隐瞒', '侥幸', '固执', '偏见', '焦虑', '害怕', '省钱', '省事', '老毛病'].map((word, i) => (
                <div key={i} className="flex items-center justify-center text-blue-300 font-bold" style={{ fontSize: `${elements.wall.fontSize - 2}px`, textShadow: '0 0 8px rgba(74, 158, 255, 0.4)' }}>
                  {word}
                </div>
              ))}
            </div>
            {wallCracked && !wallBroken && (
              <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 200 300">
                <path d="M100 10 L80 60 L110 110 L90 170 L120 230" stroke="rgba(255,255,255,0.8)" strokeWidth="3" fill="none" />
              </svg>
            )}
          </div>
        </>
      )}

      {/* 结尾字幕 */}
      {showFinal && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center px-8">
            <div
              className={`border-2 cursor-pointer transition-all ${
                selectedElement === 'finalTitle' ? 'border-yellow-400 bg-yellow-400/10' : 'border-transparent'
              }`}
              style={{ fontSize: `${elements.finalTitle.fontSize}px`, color: '#ffffff', fontFamily: 'Microsoft YaHei, SimHei, sans-serif', textShadow: '0 0 20px rgba(74, 158, 255, 0.5)', WebkitTextStroke: '0.5px rgba(74, 158, 255, 0.4)', marginBottom: '24px' }}
              onClick={() => setSelectedElement('finalTitle')}
            >
              我们不是要你成为医生，<br />只是想让你知道：
            </div>

            <div
              className={`border-2 cursor-pointer transition-all ${
                selectedElement === 'finalContent' ? 'border-yellow-400 bg-yellow-400/10' : 'border-transparent'
              }`}
              style={{ fontSize: `${elements.finalContent.fontSize}px`, color: '#ffffff', fontFamily: 'Microsoft YaHei, SimHei, sans-serif', textShadow: '0 0 20px rgba(74, 158, 255, 0.6)', WebkitTextStroke: '1px rgba(74, 158, 255, 0.5)', marginBottom: '28px' }}
              onClick={() => setSelectedElement('finalContent')}
            >
              发热的背后，藏着无数种可能。<br />
              你多说一句病史，<br />
              医生多做一项检查，<br />
              我们就离真相近了一步。
            </div>

            <div
              className={`border-2 cursor-pointer transition-all ${
                selectedElement === 'finalHighlight' ? 'border-yellow-400 bg-yellow-400/10' : 'border-transparent'
              }`}
              style={{ fontSize: `${elements.finalHighlight.fontSize}px`, color: '#ffffff', fontFamily: 'Microsoft YaHei, SimHei, sans-serif', textShadow: '0 0 20px rgba(74, 158, 255, 0.6)', WebkitTextStroke: '1px rgba(74, 158, 255, 0.5)', fontWeight: '900' }}
              onClick={() => setSelectedElement('finalHighlight')}
            >
              这堵墙，<br />需要我们一起推倒。
            </div>
          </div>
        </div>
      )}

      {/* 控制面板 */}
      <div
        className="fixed bg-black/80 backdrop-blur-md p-4 rounded-lg border border-white/20 shadow-2xl"
        style={{
          left: `${panelPos.x}%`,
          top: `${panelPos.y}%`,
          width: '320px',
          zIndex: 100,
        }}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-white font-bold text-lg">医患破墙 - 可视化调试</h3>
          <div
            className="w-8 h-8 bg-white/10 rounded cursor-grab flex items-center justify-center text-white"
            onMouseDown={handleDragStart}
            style={{ cursor: dragging ? 'grabbing' : 'grab' }}
          >
            ⋮⋮
          </div>
        </div>

        {/* 阶段控制 */}
        <div className="mb-4">
          <label className="text-white text-sm block mb-2">动画阶段</label>
          <div className="flex gap-2">
            <button
              className="flex-1 py-2 px-3 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm"
              onClick={() => { setStage(0); setShowFinal(false); }}
            >重置</button>
            <button
              className="flex-1 py-2 px-3 bg-green-600 hover:bg-green-700 text-white rounded text-sm"
              onClick={() => setShowFinal(true)}
            >结尾字幕</button>
          </div>
          <div className="mt-2 flex gap-1">
            {[1, 2, 3, 4, 5, 6, 7].map((s) => (
              <button
                key={s}
                className={`flex-1 py-1 bg-white/10 hover:bg-white/20 text-white rounded text-xs ${stage >= s ? 'bg-blue-600' : ''}`}
                onClick={() => { setStage(s); setShowFinal(false); }}
              >{s}</button>
            ))}
          </div>
        </div>

        {/* 元素选择 */}
        <div className="mb-4">
          <label className="text-white text-sm block mb-2">选择元素</label>
          <select
            className="w-full bg-white/10 text-white border border-white/20 rounded px-3 py-2"
            value={selectedElement}
            onChange={(e) => setSelectedElement(e.target.value)}
          >
            {Object.entries(elementNames).map(([key, name]) => (
              <option key={key} value={key}>{name}</option>
            ))}
          </select>
        </div>

        {/* 参数调整 */}
        <div className="mb-4">
          <label className="text-white text-sm block mb-2">位置参数（%）</label>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-white/70 text-xs mb-1">
                <span>左 (Left)</span>
                <span>{elements[selectedElement].left.toFixed(1)}%</span>
              </div>
              <input
                type="range" min="0" max="90" step="0.1"
                value={elements[selectedElement].left}
                onChange={(e) => updateElement(selectedElement, 'left', parseFloat(e.target.value))}
                className="w-full accent-blue-500"
              />
              <input
                type="number" min="0" max="90" step="0.1"
                value={elements[selectedElement].left}
                onChange={(e) => updateElement(selectedElement, 'left', parseFloat(e.target.value) || 0)}
                className="w-full bg-white/10 text-white border border-white/20 rounded px-2 py-1 text-sm mt-1"
              />
            </div>

            <div>
              <div className="flex justify-between text-white/70 text-xs mb-1">
                <span>上 (Top)</span>
                <span>{elements[selectedElement].top.toFixed(1)}%</span>
              </div>
              <input
                type="range" min="0" max="90" step="0.1"
                value={elements[selectedElement].top}
                onChange={(e) => updateElement(selectedElement, 'top', parseFloat(e.target.value))}
                className="w-full accent-blue-500"
              />
              <input
                type="number" min="0" max="90" step="0.1"
                value={elements[selectedElement].top}
                onChange={(e) => updateElement(selectedElement, 'top', parseFloat(e.target.value) || 0)}
                className="w-full bg-white/10 text-white border border-white/20 rounded px-2 py-1 text-sm mt-1"
              />
            </div>

            <div>
              <div className="flex justify-between text-white/70 text-xs mb-1">
                <span>宽 (Width)</span>
                <span>{elements[selectedElement].width.toFixed(1)}%</span>
              </div>
              <input
                type="range" min="1" max="50" step="0.1"
                value={elements[selectedElement].width}
                onChange={(e) => updateElement(selectedElement, 'width', parseFloat(e.target.value))}
                className="w-full accent-blue-500"
              />
              <input
                type="number" min="1" max="50" step="0.1"
                value={elements[selectedElement].width}
                onChange={(e) => updateElement(selectedElement, 'width', parseFloat(e.target.value) || 1)}
                className="w-full bg-white/10 text-white border border-white/20 rounded px-2 py-1 text-sm mt-1"
              />
            </div>

            <div>
              <div className="flex justify-between text-white/70 text-xs mb-1">
                <span>高 (Height)</span>
                <span>{elements[selectedElement].height.toFixed(1)}%</span>
              </div>
              <input
                type="range" min="1" max="50" step="0.1"
                value={elements[selectedElement].height}
                onChange={(e) => updateElement(selectedElement, 'height', parseFloat(e.target.value))}
                className="w-full accent-blue-500"
              />
              <input
                type="number" min="1" max="50" step="0.1"
                value={elements[selectedElement].height}
                onChange={(e) => updateElement(selectedElement, 'height', parseFloat(e.target.value) || 1)}
                className="w-full bg-white/10 text-white border border-white/20 rounded px-2 py-1 text-sm mt-1"
              />
            </div>

            <div>
              <div className="flex justify-between text-white/70 text-xs mb-1">
                <span>字号 (Font Size)</span>
                <span>{elements[selectedElement].fontSize}px</span>
              </div>
              <input
                type="range" min="10" max="50" step="1"
                value={elements[selectedElement].fontSize}
                onChange={(e) => updateElement(selectedElement, 'fontSize', parseFloat(e.target.value))}
                className="w-full accent-blue-500"
              />
              <input
                type="number" min="10" max="50" step="1"
                value={elements[selectedElement].fontSize}
                onChange={(e) => updateElement(selectedElement, 'fontSize', parseFloat(e.target.value) || 10)}
                className="w-full bg-white/10 text-white border border-white/20 rounded px-2 py-1 text-sm mt-1"
              />
            </div>
          </div>
        </div>

        {/* 重置按钮 */}
        <button
          className="w-full py-2 bg-red-600 hover:bg-red-700 text-white rounded"
          onClick={resetAll}
        >重置所有参数</button>

        {/* 位置信息输出 */}
        <div className="mt-4 p-2 bg-white/5 rounded text-xs text-white/70 font-mono">
          <p>{elementNames[selectedElement]}:</p>
          <p>L={elements[selectedElement].left.toFixed(1)} T={elements[selectedElement].top.toFixed(1)} W={elements[selectedElement].width.toFixed(1)} H={elements[selectedElement].height.toFixed(1)} FS={elements[selectedElement].fontSize}</p>
        </div>
      </div>
    </div>
  );
}
