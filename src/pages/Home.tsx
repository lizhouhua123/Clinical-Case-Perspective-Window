import { useState } from 'react';

const medicalNotes = [
  // 左侧墙（3张）：贴合左侧窗户
  { title: '发热待查', left: '3%', top: '24%', rotate: '3.5deg' },
  { title: '头晕原因', left: '3%', top: '39%', rotate: '1deg' },
  { title: '胸痛鉴别', left: '3%', top: '53%', rotate: '-2.5deg' },
  // 中央走廊（3张）：贴合中间柱子/窗户区域
  { title: '腹痛诊断', left: '33%', top: '26%', rotate: '1.2deg' },
  { title: '头痛评估', left: '43%', top: '28%', rotate: '-0.8deg' },
  { title: '呼吸困难', left: '53%', top: '31%', rotate: '0.8deg' },
  // 右侧墙（3张）：贴合右侧窗户
  { title: '腰痛排查', left: '75%', top: '24%', rotate: '-3.5deg' },
  { title: '乏力原因', left: '75%', top: '39%', rotate: '-1deg' },
  { title: '皮疹鉴别', left: '75%', top: '53%', rotate: '2.5deg' },
];

export default function MainPage() {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-black flex items-center justify-center">
      {/* 固定比例容器：保持背景图原始比例 2848:1600 */}
      <div
        className="relative"
        style={{
          width: 'min(100vw, 100vh * 2848 / 1600)',
          height: 'min(100vh, 100vw * 1600 / 2848)',
        }}
      >
        {/* 背景图：完整不裁剪 */}
        <img
          src="/main-bg.png"
          alt="主页面背景"
          className="absolute inset-0 w-full h-full object-contain"
        />

        {/* 病历单 — 每个单独定位，贴在窗户上 */}
        {medicalNotes.map((note, idx) => (
          <div
            key={idx}
            className="absolute cursor-pointer transition-all duration-300 hover:z-30"
            style={{
              left: note.left,
              top: note.top,
              width: '20%',
              transform: `rotate(${note.rotate}) perspective(600px) rotateY(${(idx < 3) ? '5deg' : (idx > 5) ? '-5deg' : '0deg'}) scale(${hoverIndex === idx ? 1.12 : 1})`,
              filter: hoverIndex === idx
                ? 'brightness(1.15) drop-shadow(0 8px 24px rgba(0,0,0,0.6))'
                : 'brightness(0.78) drop-shadow(0 4px 12px rgba(0,0,0,0.5))',
              zIndex: hoverIndex === idx ? 30 : 10,
            }}
            onMouseEnter={() => setHoverIndex(idx)}
            onMouseLeave={() => setHoverIndex(null)}
            onClick={() => console.log(`点击了第${idx + 1}个病历：${note.title}`)}
          >
            <div className="relative">
              <img
                src="/medical-note.png"
                alt={note.title}
                className="w-full h-auto object-contain"
              />
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <p
                  className="text-[8px] md:text-[10px] lg:text-xs font-bold"
                  style={{
                    color: '#3a2a1a',
                    textShadow: '0 1px 3px rgba(255,255,255,0.4)',
                  }}
                >
                  {note.title}
                </p>
              </div>
            </div>
          </div>
        ))}

        {/* 底部标题 */}
        <div
          className="absolute left-0 right-0 text-center"
          style={{ bottom: '4%' }}
        >
          <h1
            className="text-lg md:text-xl lg:text-2xl xl:text-3xl font-serif font-bold tracking-widest"
            style={{
              color: '#e8dcc8',
              textShadow: '0 2px 8px rgba(0,0,0,0.8)',
            }}
          >
            病例长廊
          </h1>
          <p
            className="mt-1 text-[10px] md:text-xs lg:text-sm tracking-wider"
            style={{
              color: 'rgba(232, 220, 200, 0.8)',
              textShadow: '0 1px 4px rgba(0,0,0,0.8)',
            }}
          >
            点击任意病历，走进真实的诊疗现场
          </p>
        </div>
      </div>
    </div>
  );
}
