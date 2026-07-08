import { useState } from 'react';

interface SizeConfig {
  patientImg: number;
  doctorImg: number;
  patientFlow: number;
  patientReply: number;
  doctorFlow: number;
  doctorPersuasion: number;
  subtitles: number;
  warningAlert: number;
  endingBox: number;
  backBtn: number;
  wallText: number;
  globalScale: number;
}

const defaultSizes: SizeConfig = {
  patientImg: 25,
  doctorImg: 25,
  patientFlow: 24,
  patientReply: 24,
  doctorFlow: 24,
  doctorPersuasion: 24,
  subtitles: 28,
  warningAlert: 15,
  endingBox: 45,
  backBtn: 15,
  wallText: 40,
  globalScale: 100,
};

const sizeLabels: Record<keyof SizeConfig, string> = {
  patientImg: '患者图片宽度',
  doctorImg: '医生图片宽度',
  patientFlow: '患者流程图宽度',
  patientReply: '患者回复气泡宽度',
  doctorFlow: '医生流程图宽度',
  doctorPersuasion: '医生劝说气泡宽度',
  subtitles: '剧情字幕宽度',
  warningAlert: '红色警示弹窗宽度',
  endingBox: '结局剧情框宽度',
  backBtn: '返回按钮宽度',
  wallText: '墙提示文字宽度',
  globalScale: '整体缩放比例',
};

export default function FeverCaseDebug() {
  const [sizes, setSizes] = useState<SizeConfig>(defaultSizes);
  const [selectedKey, setSelectedKey] = useState<keyof SizeConfig>('endingBox');
  const [panelPos, setPanelPos] = useState({ x: 70, y: 5 });
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

  const updateSize = (key: keyof SizeConfig, value: number) => {
    setSizes((prev) => ({ ...prev, [key]: value }));
  };

  const resetAll = () => setSizes(defaultSizes);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black flex items-center justify-center">
      {/* 游戏画面容器 */}
      <div
        className="relative"
        style={{
          width: 'min(95vw, calc(100vh * 2848 / 1600))',
          height: 'min(100vh, calc(95vw * 1600 / 2848))',
        }}
      >
        <img src="/fever-case/consult/bg.png" alt="背景" className="absolute inset-0 w-full h-full object-contain" />
        <img src="/fever-case/consult/wall.jpg" alt="墙" className="absolute inset-0 w-full h-full object-contain" style={{ opacity: 0.8 }} />

        {/* 患者图片 */}
        <div
          className={`absolute object-contain border-2 transition-all ${selectedKey === 'patientImg' ? 'border-yellow-400' : 'border-transparent'}`}
          style={{ left: '15%', top: '25%', width: `${sizes.patientImg}%` }}
          onClick={() => setSelectedKey('patientImg')}
        >
          <img src="/fever-case/consult/patient.png" alt="患者" className="w-full h-auto" />
        </div>

        {/* 医生图片 */}
        <div
          className={`absolute object-contain border-2 transition-all ${selectedKey === 'doctorImg' ? 'border-yellow-400' : 'border-transparent'}`}
          style={{ right: '15%', top: '25%', width: `${sizes.doctorImg}%` }}
          onClick={() => setSelectedKey('doctorImg')}
        >
          <img src="/fever-case/consult/doctor.png" alt="医生" className="w-full h-auto" />
        </div>

        {/* 患者流程图 */}
        <div
          className={`absolute z-20 border-2 transition-all ${selectedKey === 'patientFlow' ? 'border-yellow-400' : 'border-transparent'}`}
          style={{ left: '0.5%', top: '3%', width: `${sizes.patientFlow * sizes.globalScale / 100}%` }}
          onClick={() => setSelectedKey('patientFlow')}
        >
          <div 
            className="px-2 py-1 rounded bg-white/80 text-center" 
            style={{ fontSize: `${(8 + sizes.patientFlow * 0.2) * sizes.globalScale / 100}px` }}
          >患者流程图示例</div>
        </div>

        {/* 患者回复气泡 */}
        <div
          className={`absolute z-20 border-2 transition-all ${selectedKey === 'patientReply' ? 'border-yellow-400' : 'border-transparent'}`}
          style={{ left: '0.5%', top: '35%', width: `${sizes.patientReply * sizes.globalScale / 100}%` }}
          onClick={() => setSelectedKey('patientReply')}
        >
          <div 
            className="px-3 py-2 rounded-2xl bg-white/90" 
            style={{ fontSize: `${(8 + sizes.patientReply * 0.2) * sizes.globalScale / 100}px` }}
          >患者回复气泡示例</div>
        </div>

        {/* 医生流程图 */}
        <div
          className={`absolute z-20 border-2 transition-all ${selectedKey === 'doctorFlow' ? 'border-yellow-400' : 'border-transparent'}`}
          style={{ right: '0.5%', top: '3%', width: `${sizes.doctorFlow * sizes.globalScale / 100}%` }}
          onClick={() => setSelectedKey('doctorFlow')}
        >
          <div 
            className="px-2 py-1 rounded bg-white/80 text-center" 
            style={{ fontSize: `${(8 + sizes.doctorFlow * 0.2) * sizes.globalScale / 100}px` }}
          >医生流程图示例</div>
        </div>

        {/* 医生劝说气泡 */}
        <div
          className={`absolute z-20 border-2 transition-all ${selectedKey === 'doctorPersuasion' ? 'border-yellow-400' : 'border-transparent'}`}
          style={{ right: '0.5%', top: '35%', width: `${sizes.doctorPersuasion * sizes.globalScale / 100}%` }}
          onClick={() => setSelectedKey('doctorPersuasion')}
        >
          <div 
            className="px-3 py-2 rounded-2xl bg-white/90" 
            style={{ fontSize: `${(8 + sizes.doctorPersuasion * 0.2) * sizes.globalScale / 100}px` }}
          >医生劝说气泡示例</div>
        </div>

        {/* 剧情字幕 */}
        <div
          className={`absolute left-1/2 top-60 z-20 border-2 transition-all ${selectedKey === 'subtitles' ? 'border-yellow-400' : 'border-transparent'}`}
          style={{ maxWidth: `${sizes.subtitles * sizes.globalScale / 100}%`, transform: 'translateX(-50%)' }}
          onClick={() => setSelectedKey('subtitles')}
        >
          <div className="px-3 py-2 rounded bg-gray-700/80 text-white text-xs text-center">剧情字幕示例</div>
        </div>

        {/* 墙提示文字 */}
        <div
          className={`absolute z-30 border-2 transition-all ${selectedKey === 'wallText' ? 'border-yellow-400' : 'border-transparent'}`}
          style={{ left: '50%', top: '12%', transform: 'translateX(-50%)', width: `${sizes.wallText * sizes.globalScale / 100}%` }}
          onClick={() => setSelectedKey('wallText')}
        >
          <div className="px-4 py-2 rounded-lg bg-black/70 text-white text-xs text-center">医患认知存在差距<br/>因此产生就诊沟通矛盾</div>
        </div>

        {/* 红色警示弹窗 */}
        <div
          className={`absolute z-30 border-2 transition-all ${selectedKey === 'warningAlert' ? 'border-yellow-400' : 'border-transparent'}`}
          style={{ right: '1%', bottom: '15%', width: `${sizes.warningAlert * sizes.globalScale / 100}%` }}
          onClick={() => setSelectedKey('warningAlert')}
        >
          <div className="px-2 py-2 rounded-lg bg-red-700/90 text-white text-xs text-center">⚠ 高热延误诊疗可能导致</div>
        </div>

        {/* 结局剧情框 */}
        <div
          className={`absolute z-30 border-2 transition-all ${selectedKey === 'endingBox' ? 'border-yellow-400' : 'border-transparent'}`}
          style={{ left: '50%', top: '60%', transform: 'translate(-50%, -50%)', width: `${sizes.endingBox * sizes.globalScale / 100}%` }}
          onClick={() => setSelectedKey('endingBox')}
        >
          <div className="px-4 py-3 rounded-2xl bg-gray-800/80 text-white text-xs text-center">
            <div className="font-bold mb-2">检查后续</div>
            <div className="text-blue-400">正确诊疗内容...</div>
            <div className="text-red-400 mt-2">错误假设内容...</div>
          </div>
        </div>

        {/* 返回按钮 */}
        <div
          className={`absolute z-30 border-2 transition-all ${selectedKey === 'backBtn' ? 'border-yellow-400' : 'border-transparent'}`}
          style={{ right: '1%', bottom: '2%', width: `${sizes.backBtn * sizes.globalScale / 100}%`, height: `${8 * sizes.globalScale / 100}%` }}
          onClick={() => setSelectedKey('backBtn')}
        >
          <div className="w-full h-full rounded-lg bg-gradient-to-br from-red-900 to-red-700 text-white text-xs flex items-center justify-center">返回主页面</div>
        </div>
      </div>

      {/* 控制面板 */}
      <div
        className="fixed bg-black/85 backdrop-blur-md p-4 rounded-lg border border-white/20 shadow-2xl"
        style={{
          left: `${panelPos.x}%`,
          top: `${panelPos.y}%`,
          width: '340px',
          maxHeight: '90vh',
          overflowY: 'auto',
          zIndex: 100,
        }}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-white font-bold text-lg">发热病例弹窗调试</h3>
          <div
            className="w-8 h-8 bg-white/10 rounded cursor-grab flex items-center justify-center text-white"
            onMouseDown={handleDragStart}
            style={{ cursor: dragging ? 'grabbing' : 'grab' }}
          >
            ⋮⋮
          </div>
        </div>

        {/* 元素选择 */}
        <div className="mb-4">
          <label className="text-white text-sm block mb-2">选择元素</label>
          <select
            className="w-full bg-white/10 text-white border border-white/20 rounded px-3 py-2"
            value={selectedKey}
            onChange={(e) => setSelectedKey(e.target.value as keyof SizeConfig)}
          >
            {Object.entries(sizeLabels).map(([key, label]) => (
              <option key={key} value={key}>{label}</option>
            ))}
          </select>
        </div>

        {/* 滑块调节 */}
        <div className="mb-4">
          <div className="flex justify-between text-white/70 text-xs mb-1">
            <span>{sizeLabels[selectedKey]}</span>
            <span>{sizes[selectedKey]}%</span>
          </div>
          <input
            type="range"
            min="5"
            max="60"
            step="1"
            value={sizes[selectedKey]}
            onChange={(e) => updateSize(selectedKey, parseInt(e.target.value))}
            className="w-full accent-blue-500"
          />
          <input
            type="number"
            min="5"
            max="60"
            step="1"
            value={sizes[selectedKey]}
            onChange={(e) => updateSize(selectedKey, parseInt(e.target.value) || 5)}
            className="w-full bg-white/10 text-white border border-white/20 rounded px-2 py-1 text-sm mt-1"
          />
        </div>

        {/* 所有参数一览 */}
        <div className="mb-4 space-y-2">
          <label className="text-white text-sm block">所有参数</label>
          {Object.entries(sizeLabels).map(([key, label]) => (
            <div key={key} className="flex items-center gap-2">
              <span className="text-white/60 text-xs w-24 truncate">{label}</span>
              <input
                type="range"
                min={key === 'globalScale' ? '50' : '5'}
                max={key === 'globalScale' ? '150' : '60'}
                step="1"
                value={sizes[key as keyof SizeConfig]}
                onChange={(e) => updateSize(key as keyof SizeConfig, parseInt(e.target.value))}
                className="flex-1 accent-blue-500"
              />
              <span className="text-white text-xs w-8 text-right">{sizes[key as keyof SizeConfig]}%</span>
            </div>
          ))}
        </div>

        {/* 重置按钮 */}
        <button className="w-full py-2 bg-red-600 hover:bg-red-700 text-white rounded" onClick={resetAll}>
          重置所有参数
        </button>

        {/* 参数输出 */}
        <div className="mt-4 p-2 bg-white/5 rounded text-xs text-white/70 font-mono">
          <p className="mb-1">当前配置代码：</p>
          {Object.entries(sizes).map(([key, value]) => (
            <p key={key}>{key}: {value}%</p>
          ))}
        </div>
      </div>
    </div>
  );
}
