import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import FeverCaseModal from '@/components/Main/FeverCaseModal';
import { playPageFlipSound } from '@/utils/soundEffects';

const caseTitles = [
  '发烧为何要检查',
  '排队三时看五分',
  '高血药需终身服',
  '拍片正常为何疼',
  '术后为何越治越差',
  '血糖正常还需测',
  '术前签字恐惧症',
  '医生为何不肯定',
  '抽血为何抽多管',
];

// 左侧科普栏素材配置
const leftPanels = [
  { id: 1, src: '/main-left/1.png', name: '体检常见疑惑答疑宣传栏', left: 1.2, top: 15.6, width: 27.5, height: 15 },
  { id: 2, src: '/main-left/2.png', name: '医患双向沟通科普海报', left: 1.2, top: 28.5, width: 27.5, height: 15 },
  { id: 3, src: '/main-left/3.png', name: '医生完整诊疗决策流程图', left: 1.2, top: 42, width: 27.5, height: 15 },
  { id: 4, src: '/main-left/4.png', name: '医疗信任科普留言互动橱窗', left: 1.2, top: 55.5, width: 27.5, height: 15 },
  { id: 5, src: '/main-left/5.png', name: '疾病潜在风险科普墙', left: 1.1, top: 68.5, width: 27, height: 17 },
];

// 中央资源区素材配置
const centerPanels = [
  { id: 10, src: '/main-center/10.png', name: '资源10', left: 17.7, top: 4, width: 12.5, height: 15 },
  { id: 11, src: '/main-center/11.png', name: '资源11', left: 31, top: 4, width: 12.5, height: 15 },
  { id: 12, src: '/main-center/12.png', name: '资源12', left: 44.5, top: 4, width: 12.5, height: 15 },
  { id: 13, src: '/main-center/13.png', name: '资源13', left: 57.6, top: 4, width: 12.5, height: 15 },
  { id: 14, src: '/main-center/14.png', name: '资源14', left: 69.8, top: 4, width: 12.5, height: 15 },
];

// 右侧图表素材配置
const rightPanels = [
  { id: 20, src: '/main-right/1.png', name: '右侧图表1', left: 71.6, top: 15.5, width: 27.5, height: 15 },
  { id: 21, src: '/main-right/2.png', name: '右侧图表2', left: 71.6, top: 28.3, width: 27.5, height: 15 },
  { id: 22, src: '/main-right/3.png', name: '右侧图表3', left: 71.6, top: 41, width: 27.5, height: 15 },
  { id: 23, src: '/main-right/4.png', name: '右侧图表4', left: 71.6, top: 54, width: 27.5, height: 15 },
  { id: 24, src: '/main-right/5.png', name: '右侧图表5', left: 71.6, top: 67, width: 27.5, height: 15 },
];

export default function MainPage() {
  const navigate = useNavigate();
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [showFeverModal, setShowFeverModal] = useState(false);
  const [hoverPanel, setHoverPanel] = useState<number | null>(null);
  const voicePlayed = useRef(false);

  // 主页面进场自动播放欢迎语音
  useEffect(() => {
    if (voicePlayed.current) return;
    voicePlayed.current = true;

    const voicePath = '/audio/main-welcome.mp3.mp3';
    const audio = new Audio(voicePath);
    audio.volume = 1;
    audio.play().catch((err) => {
      console.log('语音自动播放被阻止:', err.message);
      // 浏览器自动播放策略可能阻止，用户首次点击页面后重试
    });
  }, []);

  const handlePanelClick = (id: number, name: string) => {
    console.log(`点击了素材 ${id}: ${name}`);
    // 后续可添加点击交互逻辑
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black flex items-center justify-center">
      <div
        className="relative"
        style={{
          width: 'min(100vw, calc(100vh * 2848 / 1600))',
          height: 'min(100vh, calc(100vw * 1600 / 2848))',
        }}
      >
        {/* 背景图 */}
        <img
          src="/main-bg.png"
          alt="主页面背景"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* 左侧科普栏素材 */}
        {leftPanels.map((panel) => (
          <div
            key={`left-${panel.id}`}
            className="absolute cursor-pointer transition-all duration-300"
            style={{
              left: `${panel.left}%`,
              top: `${panel.top}%`,
              width: `${panel.width}%`,
              height: `${panel.height}%`,
              transform: hoverPanel === panel.id ? 'scale(1.05)' : 'scale(1)',
              zIndex: hoverPanel === panel.id ? 10 : 1,
            }}
            onMouseEnter={() => setHoverPanel(panel.id)}
            onMouseLeave={() => setHoverPanel(null)}
            onClick={() => handlePanelClick(panel.id, panel.name)}
          >
            <img
              src={panel.src}
              alt={panel.name}
              className="w-full h-full object-contain drop-shadow-lg"
              style={{
                filter: hoverPanel === panel.id ? 'brightness(1.15)' : 'brightness(1)',
                imageRendering: 'auto',
              }}
            />
          </div>
        ))}

        {/* 中央资源区素材 */}
        {centerPanels.map((panel) => (
          <div
            key={`center-${panel.id}`}
            className="absolute cursor-pointer transition-all duration-300"
            style={{
              left: `${panel.left}%`,
              top: `${panel.top}%`,
              width: `${panel.width}%`,
              height: `${panel.height}%`,
              transform: hoverPanel === panel.id ? 'scale(1.05)' : 'scale(1)',
              zIndex: hoverPanel === panel.id ? 10 : 1,
            }}
            onMouseEnter={() => setHoverPanel(panel.id)}
            onMouseLeave={() => setHoverPanel(null)}
            onClick={() => handlePanelClick(panel.id, panel.name)}
          >
            <img
              src={panel.src}
              alt={panel.name}
              className="w-full h-full object-contain drop-shadow-lg"
              style={{
                filter: hoverPanel === panel.id ? 'brightness(1.15)' : 'brightness(1)',
                imageRendering: 'auto',
              }}
            />
          </div>
        ))}

        {/* 右侧图表素材 */}
        {rightPanels.map((panel) => (
          <div
            key={`right-${panel.id}`}
            className="absolute cursor-pointer transition-all duration-300"
            style={{
              left: `${panel.left}%`,
              top: `${panel.top}%`,
              width: `${panel.width}%`,
              height: `${panel.height}%`,
              transform: hoverPanel === panel.id ? 'scale(1.05)' : 'scale(1)',
              zIndex: hoverPanel === panel.id ? 10 : 1,
            }}
            onMouseEnter={() => setHoverPanel(panel.id)}
            onMouseLeave={() => setHoverPanel(null)}
            onClick={() => handlePanelClick(panel.id, panel.name)}
          >
            <img
              src={panel.src}
              alt={panel.name}
              className="w-full h-full object-contain drop-shadow-lg"
              style={{
                filter: hoverPanel === panel.id ? 'brightness(1.15)' : 'brightness(1)',
                imageRendering: 'auto',
              }}
            />
          </div>
        ))}

        {/* 病历单 3x3 网格 - 精确对齐窗户玻璃 */}
        <div
          className="absolute grid grid-cols-3 grid-rows-3"
          style={{
            top: '20%',
            left: '34%',
            right: '34%',
            bottom: '22%',
            gap: '4% 3%',
          }}
        >
          {caseTitles.map((title, idx) => (
            <div
              key={idx}
              className="relative flex items-center justify-center cursor-pointer"
              onMouseEnter={() => setHoverIndex(idx)}
              onMouseLeave={() => setHoverIndex(null)}
              onClick={() => {
                if (idx === 0) {
                  playPageFlipSound();
                  const audio = new Audio('/audio/fever-case-open.mp3');
                  audio.volume = 1;
                  audio.play().catch(() => {});
                  setShowFeverModal(true);
                } else {
                  console.log(`点击了第${idx + 1}个病历：${title}`);
                }
              }}
            >
              <div
                className="relative w-full h-full transition-all duration-300 flex items-center justify-center"
                style={{
                  transform: `rotate(${(idx % 3 - 1) * 1.5 + (Math.floor(idx / 3) - 1) * 0.8}deg) scale(${hoverIndex === idx ? 1.05 : 1})`,
                }}
              >
                <img
                  src="/medical-note.png"
                  alt={title}
                  className="w-full h-full object-contain drop-shadow-xl"
                  style={{
                    filter: hoverIndex === idx ? 'brightness(1.1)' : 'brightness(0.92)',
                  }}
                />
                <div className="absolute inset-0 flex items-start justify-center pt-[18%] pointer-events-none">
                  <p
                    className="text-[8px] md:text-[10px] lg:text-xs font-bold"
                    style={{
                      color: '#3a2a1a',
                      textShadow: '0 1px 2px rgba(255,255,255,0.4)',
                    }}
                  >
                    {title}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 底部标题 */}
        <div
          className="absolute left-0 right-0 text-center z-20"
          style={{ bottom: '5%' }}
        >
          <h1
            className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-serif font-bold tracking-widest"
            style={{
              color: '#e8dcc8',
              textShadow: '0 2px 8px rgba(0,0,0,0.8)',
            }}
          >
            病例墙的透视窗
          </h1>
          <p
            className="mt-1 md:mt-2 text-xs md:text-sm lg:text-base tracking-wider"
            style={{
              color: 'rgba(232, 220, 200, 0.8)',
              textShadow: '0 1px 4px rgba(0,0,0,0.8)',
            }}
          >
            走进临床病例，理解医者选择，缓和医患距离
          </p>
        </div>

        {/* 回到序幕页按钮 */}
        <button
          onClick={() => navigate('/')}
          className="absolute z-30 rounded-lg shadow-lg transition-all duration-300 hover:scale-105 font-bold tracking-wider flex items-center justify-center"
          style={{
            right: '1%',
            bottom: '2%',
            width: '15%',
            height: '8%',
            background: 'linear-gradient(135deg, #8b0000 0%, #b22222 100%)',
            color: '#f5e6d3',
            border: '3px solid #d4a574',
            textShadow: '0 1px 2px rgba(0,0,0,0.5)',
            boxShadow: '0 6px 20px rgba(139, 0, 0, 0.6)',
            fontSize: 'clamp(12px, 1.5vw, 20px)',
          }}
        >
          当下医患之墙
        </button>
      </div>

      {showFeverModal && (
        <FeverCaseModal onClose={() => setShowFeverModal(false)} />
      )}
    </div>
  );
}