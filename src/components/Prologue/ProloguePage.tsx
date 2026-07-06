import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import BackgroundLayer from './BackgroundLayer';
import TitleSection from './TitleSection';
import PatientColumn from './PatientColumn';
import DoctorColumn from './DoctorColumn';
import CentralDivider from './CentralDivider';
import EnterButton from './EnterButton';
import { useAnimationSequence } from '@/hooks/useAnimationSequence';
import { conflicts } from '@/data/conflicts';

export default function ProloguePage() {
  const navigate = useNavigate();
  const [started, setStarted] = useState(false);
  const titleAudioRef = useRef<HTMLAudioElement | null>(null);

  const {
    showBackground,
    showTitle,
    showQuestionMark,
    showWall,
    showButton,
    patientVisibleCount,
    doctorVisibleCount,
    currentStep,
    finished,
  } = useAnimationSequence(started);

  // 标题显示时播放语音
  useEffect(() => {
    if (showTitle && !titleAudioRef.current) {
      const audio = new Audio('/audio/title-voice.mp3');
      titleAudioRef.current = audio;
      audio.play().catch(() => {
        // 自动播放被阻止，忽略
      });
    }
    return () => {
      if (!showTitle && titleAudioRef.current) {
        titleAudioRef.current.pause();
        titleAudioRef.current = null;
      }
    };
  }, [showTitle]);

  // 根据当前步骤计算哪一行正在播放
  // 偶数步是患者，奇数步是医生
  // 全部播放完毕后，高亮取消
  const activePatientIndex = (!finished && currentStep >= 0 && currentStep % 2 === 0) ? currentStep / 2 : -1;
  const activeDoctorIndex = (!finished && currentStep >= 0 && currentStep % 2 === 1) ? (currentStep - 1) / 2 : -1;

  const handleEnter = () => {
    navigate('/main');
  };

  return (
    <div className="relative w-full h-full overflow-hidden bg-wall-bg">
      {/* 背景层 — 铺满整个视口 */}
      <BackgroundLayer show={showBackground} />

      {/* 内容层 — 和背景在同一平面，一起缩放 */}
      <div className="absolute inset-0 z-10 flex flex-col">
        <TitleSection show={showTitle} />

        <div className="flex-1 relative flex items-stretch">
          <div className="w-1/2 relative">
            <PatientColumn
              items={conflicts}
              visibleCount={patientVisibleCount}
              activeIndex={activePatientIndex}
            />
          </div>

          <CentralDivider show={showWall} showQuestionMark={showQuestionMark} />

          <div className="w-1/2 relative">
            <DoctorColumn
              items={conflicts}
              visibleCount={doctorVisibleCount}
              activeIndex={activeDoctorIndex}
            />
          </div>
        </div>

        <EnterButton show={showButton} onClick={handleEnter} />
      </div>

      {/* 点击开始遮罩 — 解决浏览器自动播放限制 */}
      {!started && (
        <div
          className="absolute inset-0 z-50 flex items-center justify-center cursor-pointer"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.9) 100%)',
          }}
          onClick={() => setStarted(true)}
        >
          <div className="text-center animate-pulse">
            <p className="text-wall-muted text-lg md:text-xl lg:text-2xl tracking-widest mb-4">
              医患隔墙，认知错位
            </p>
            <div
              className="px-8 py-3 rounded-lg border-2 transition-all duration-500 hover:scale-110"
              style={{
                borderColor: 'rgba(232, 220, 200, 0.4)',
                background: 'rgba(232, 220, 200, 0.1)',
              }}
            >
              <span className="text-wall-text text-base md:text-lg tracking-wider">
                点击进入
              </span>
            </div>
            <p className="text-wall-muted/60 text-xs md:text-sm mt-4 tracking-wider">
              （请开启音量以获得最佳体验）
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
