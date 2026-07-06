import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export default function FeverCaseDetail() {
  const navigate = useNavigate();
  const [visibleLines, setVisibleLines] = useState(0);
  const [showPatientFlow, setShowPatientFlow] = useState(false);
  const [showDoctorFlow, setShowDoctorFlow] = useState(false);
  const [showWallText, setShowWallText] = useState(false);
  const [showDoctorPersuasion, setShowDoctorPersuasion] = useState(false);
  const [showPatientReply, setShowPatientReply] = useState(false);
  const [dissolveSubtitles, setDissolveSubtitles] = useState(false);
  const [dissolveWallText, setDissolveWallText] = useState(false);
  const [dissolveWall, setDissolveWall] = useState(false);
  const [dissolveBubbles, setDissolveBubbles] = useState(false);
  const [showEnding, setShowEnding] = useState(false);
  const [showTheme, setShowTheme] = useState(false);
  const endingAudioRef = useRef<HTMLAudioElement | null>(null);

  // 第一次：查看完患者和医生流程后墙可点击
  // 第二次：患者回复后墙可再次点击（消散全部+显示结局）
  const wallClickable =
    (showPatientFlow && showDoctorFlow && !showWallText) ||
    (showPatientReply && !dissolveSubtitles);

  useEffect(() => {
    const lines = 4;
    const delay = 2000;

    const timers = [];
    for (let i = 0; i <= lines; i++) {
      const timer = setTimeout(() => {
        setVisibleLines(i);
      }, i * delay);
      timers.push(timer);
    }

    // 播放背景介绍语音
    const audio = new Audio('/audio/fever-intro.mp3');
    audio.volume = 1;
    audio.play().catch(() => {});

    return () => {
      timers.forEach(clearTimeout);
      audio.pause();
    };
  }, []);

  const handleBack = () => {
    navigate('/main');
  };

  const handlePatientClick = () => {
    // 背景文字未展示完毕，不可点击
    if (visibleLines < 4) return;
    // 患者回复已显示，不再重复
    if (showPatientReply) return;
    // 第一次点击：显示患者流程图
    if (!showPatientFlow) {
      setShowPatientFlow(true);
      return;
    }
    // 医生劝说显示后第二次点击：切换为患者回复气泡
    if (showDoctorPersuasion) {
      setShowPatientFlow(false);
      setShowPatientReply(true);
    }
  };

  const handleDoctorClick = () => {
    // 背景文字未展示完毕，不可点击
    if (visibleLines < 4) return;
    // 已进入劝说/回复阶段，不再重复显示思考链
    if (showDoctorPersuasion || showPatientReply) return;
    // 第一次点击：显示医生诊断流程图
    if (!showDoctorFlow) {
      setShowDoctorFlow(true);
      return;
    }
    // 墙点完之后第二次点击：切换为医生劝说气泡
    if (showWallText) {
      setShowDoctorFlow(false);
      setShowDoctorPersuasion(true);
    }
  };

  const handleWallClick = () => {
    // 背景文字未展示完毕，不可点击
    if (visibleLines < 4) return;
    // 第一次点击：显示墙的提示文字
    if (showPatientFlow && showDoctorFlow && !showWallText) {
      setShowWallText(true);
      const audio = new Audio('/audio/wall-gap-voice.mp3');
      audio.volume = 1;
      audio.play().catch(() => {});
      return;
    }
    // 第二次点击（患者回复后）：依次消散背景介绍、墙提示、墙、对话气泡，最后显示结局
    if (showPatientReply && !dissolveSubtitles) {
      setDissolveSubtitles(true);
      setTimeout(() => setDissolveWallText(true), 1000);
      setTimeout(() => setDissolveWall(true), 2000);
      setTimeout(() => setDissolveBubbles(true), 3000);
      setTimeout(() => {
        setShowEnding(true);
        endingAudioRef.current = new Audio('/audio/ending-voice.mp3');
        endingAudioRef.current.volume = 1;
        endingAudioRef.current.play().catch(() => {});
      }, 4000);
    }
  };

  const subtitles = [
    '患者体温 38.8℃，因高烧前来医院就诊',
    '患者只想开一盒退烧药，吃完立刻回家',
    '患者期盼服药后明天就能完全退烧痊愈',
    '医生查看状态后，建议抽血化验 + 胸部 CT 检查',
  ];

  // 患者内心思路流程图数据
  const patientFlow = [
    {
      title: '现状',
      items: ['发烧 38.8℃，特地请假抽空来医院就诊'],
    },
    {
      title: '核心诉求',
      items: ['只想快速开退烧药，不想抽血、拍 CT 耽误时间'],
    },
    {
      title: '自身现实顾虑',
      items: [
        '上班很难请假，多做检查会超时扣工资',
        '排队等候太久，耽误后续工作安排',
      ],
    },
    {
      title: '固有过往经验',
      items: ['之前每次发烧只吃退烧药，第二天就能好转痊愈'],
    },
    {
      title: '最终想法',
      items: ['没必要做复杂检查，拿药立刻回家'],
    },
  ];

  // 医生诊断流程图数据
  const doctorFlow = [
    {
      title: '发热病因分类排查',
      items: [
        '①病毒性感冒',
        '②细菌感染：肺炎、咽炎、扁桃体炎',
        '③非感染性发热：风湿热、肿瘤、药物热',
      ],
    },
    {
      title: '危重潜在风险',
      items: ['严重并发症：肺炎、脑膜炎、败血症、脓毒症休克'],
    },
    {
      title: '延误诊疗危害',
      items: ['不及时明确治疗 → 高热惊厥、休克、永久后遗症'],
    },
  ];

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black flex items-center justify-center">
      <div
        className="relative"
        style={{
          width: 'min(95vw, calc(100vh * 2848 / 1600))',
          height: 'min(100vh, calc(95vw * 1600 / 2848))',
        }}
      >
        <img
          src="/fever-case/consult/bg.png"
          alt="背景"
          className="absolute inset-0 w-full h-full object-contain"
        />

        <img
          src="/fever-case/consult/wall.jpg"
          alt="墙"
          className={`absolute inset-0 w-full h-full object-contain transition-all duration-300 ${
            wallClickable && visibleLines >= 4 ? 'cursor-pointer' : ''
          }`}
          onClick={handleWallClick}
          style={{
            opacity: dissolveWall ? 0 : 1,
            transform: dissolveWall
              ? 'scale(1.15)'
              : wallClickable && visibleLines >= 4
                ? 'scale(1)'
                : 'scale(1)',
            filter: dissolveWall
              ? 'blur(20px) brightness(2)'
              : wallClickable && visibleLines >= 4
                ? 'brightness(1.05) drop-shadow(0 0 20px rgba(255,255,255,0.3))'
                : 'none',
          }}
          onMouseEnter={(e) => {
            if (wallClickable && visibleLines >= 4) {
              e.currentTarget.style.filter = 'brightness(1.25) drop-shadow(0 0 30px rgba(255,255,255,0.5))';
              e.currentTarget.style.transform = 'scale(1.01)';
            }
          }}
          onMouseLeave={(e) => {
            if (wallClickable && visibleLines >= 4) {
              e.currentTarget.style.filter = 'brightness(1.05) drop-shadow(0 0 20px rgba(255,255,255,0.3))';
              e.currentTarget.style.transform = 'scale(1)';
            }
          }}
        />

        <img
          src="/fever-case/consult/patient.png"
          alt="患者"
          className={`absolute object-contain transition-all duration-300 ${
            visibleLines >= 4 ? 'cursor-pointer hover:scale-105' : 'cursor-not-allowed opacity-80'
          }`}
          style={{
            left: '15%',
            top: '25%',
            width: '25%',
          }}
          onClick={handlePatientClick}
        />

        <img
          src="/fever-case/consult/doctor.png"
          alt="医生"
          className={`absolute object-contain transition-all duration-300 ${
            visibleLines >= 4 ? 'cursor-pointer hover:scale-105' : 'cursor-not-allowed opacity-80'
          }`}
          style={{
            right: '15%',
            top: '25%',
            width: '25%',
          }}
          onClick={handleDoctorClick}
        />

        {/* 患者内心思路流程图 */}
        <div
          className="absolute z-20 transition-all duration-800"
          style={{
            left: '0.5%',
            top: '3%',
            width: '24%',
            opacity: showPatientFlow ? 1 : 0,
            transform: showPatientFlow ? 'translateX(0)' : 'translateX(-30px)',
          }}
        >
          <div className="flex flex-col items-center gap-1">
            {patientFlow.map((section, sIdx) => (
              <div key={sIdx} className="flex flex-col items-center w-full">
                <div
                  className="px-4 py-2 rounded w-full text-center"
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.85)',
                    border: '1px solid rgba(200, 200, 200, 0.9)',
                    color: '#5a3a1a',
                    fontFamily: 'Microsoft YaHei, SimHei, sans-serif',
                    fontSize: 'clamp(13px, 1.3vw, 17px)',
                    fontWeight: '700',
                    boxShadow: '0 1px 4px rgba(0,0,0,0.1)',
                  }}
                >
                  {section.title}
                </div>

                <div className="mt-1 w-full space-y-1">
                  {section.items.map((item, iIdx) => (
                    <div
                      key={iIdx}
                      className="px-3 py-1.5 rounded text-center"
                      style={{
                        backgroundColor: 'rgba(248, 244, 240, 0.7)',
                        border: '1px solid rgba(200, 200, 200, 0.6)',
                        color: '#2c2c2c',
                        fontFamily: 'Microsoft YaHei, SimHei, sans-serif',
                        fontSize: 'clamp(11px, 1.1vw, 14px)',
                        fontWeight: '500',
                        lineHeight: '1.4',
                      }}
                    >
                      {item}
                    </div>
                  ))}
                </div>

                {sIdx < patientFlow.length - 1 && (
                  <svg
                    width="20"
                    height="24"
                    viewBox="0 0 20 24"
                    fill="none"
                    className="my-1"
                  >
                    <path
                      d="M10 0V20M10 20L3 13M10 20L17 13"
                      stroke="rgba(255,255,255,0.8)"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </div>
            ))}
          </div>

          <div
            className="mt-4 text-center px-3 py-2 rounded"
            style={{
              backgroundColor: 'rgba(240, 240, 240, 0.7)',
              border: '1px solid rgba(200, 200, 200, 0.8)',
              color: '#2c2c2c',
              fontFamily: 'Microsoft YaHei, SimHei, sans-serif',
              fontSize: 'clamp(11px, 1vw, 14px)',
              fontWeight: '500',
              letterSpacing: '0.03em',
              lineHeight: '1.5',
              boxShadow: '0 1px 4px rgba(0,0,0,0.1)',
            }}
          >
            患者觉得单纯发烧无需繁琐检查，想快速结束就诊返回工作。
          </div>
        </div>

        {/* 患者回复气泡 */}
        <div
          className="absolute z-20 transition-all duration-1000"
          style={{
            left: '0.5%',
            top: '3%',
            width: '24%',
            opacity: dissolveBubbles ? 0 : showPatientReply ? 1 : 0,
            transform: dissolveBubbles
              ? 'translateX(-30px) scale(1.1)'
              : showPatientReply
                ? 'translateX(0) scale(1)'
                : 'translateX(-30px) scale(1)',
            filter: dissolveBubbles ? 'blur(15px)' : 'none',
          }}
        >
          <div
            className="px-4 py-3 rounded-2xl"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.92)',
              border: '2px solid rgba(200, 200, 200, 0.9)',
              boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
            }}
          >
            {/* 对话气泡小尾巴（右侧朝向医生） */}
            <div
              style={{
                position: 'absolute',
                right: '-10px',
                top: '30px',
                width: 0,
                height: 0,
                borderTop: '10px solid transparent',
                borderBottom: '10px solid transparent',
                borderLeft: '12px solid rgba(255, 255, 255, 0.92)',
              }}
            />

            <div
              style={{
                color: '#5a3a1a',
                fontFamily: 'Microsoft YaHei, SimHei, sans-serif',
                fontSize: 'clamp(12px, 1.2vw, 15px)',
                fontWeight: '500',
                lineHeight: '1.9',
                letterSpacing: '0.02em',
              }}
            >
              <div style={{ marginBottom: '8px', color: '#5a3a1a', fontWeight: '700' }}>
                患者回复：
              </div>
              <div style={{ marginBottom: '6px' }}>医生，听您这么一说</div>
              <div style={{ marginBottom: '6px' }}>我完全明白了，</div>
              <div style={{ marginBottom: '6px' }}>也理解您反复建议我做检查</div>
              <div style={{ marginBottom: '6px' }}>是真的为我的身体着想。</div>
              <div style={{ marginBottom: '6px' }}>之前只想着工作请假麻烦，</div>
              <div style={{ marginBottom: '6px' }}>忽略了发烧背后藏着风险，</div>
              <div style={{ marginBottom: '6px' }}>是我考虑不周，</div>
              <div>我现在配合您去抽血、拍 CT。</div>
            </div>
          </div>
        </div>

        {/* 医生诊断思维流程图 */}
        <div
          className="absolute z-20 transition-all duration-800"
          style={{
            right: '0.5%',
            top: '3%',
            width: '24%',
            opacity: showDoctorFlow ? 1 : 0,
            transform: showDoctorFlow ? 'translateX(0)' : 'translateX(30px)',
          }}
        >
          <div className="flex flex-col items-center gap-1">
            {doctorFlow.map((section, sIdx) => (
              <div key={sIdx} className="flex flex-col items-center w-full">
                {/* 层级标题 */}
                <div
                  className="px-4 py-2 rounded w-full text-center"
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.85)',
                    border: '1px solid rgba(180, 200, 220, 0.9)',
                    color: '#1a3a5c',
                    fontFamily: 'Microsoft YaHei, SimHei, sans-serif',
                    fontSize: 'clamp(13px, 1.3vw, 17px)',
                    fontWeight: '700',
                    boxShadow: '0 1px 4px rgba(0,0,0,0.1)',
                  }}
                >
                  {section.title}
                </div>

                {/* 层级内容 */}
                <div className="mt-1 w-full space-y-1">
                  {section.items.map((item, iIdx) => (
                    <div
                      key={iIdx}
                      className="px-3 py-1.5 rounded text-center"
                      style={{
                        backgroundColor: 'rgba(240, 248, 255, 0.7)',
                        border: '1px solid rgba(180, 200, 220, 0.6)',
                        color: '#2c2c2c',
                        fontFamily: 'Microsoft YaHei, SimHei, sans-serif',
                        fontSize: 'clamp(11px, 1.1vw, 14px)',
                        fontWeight: '500',
                        lineHeight: '1.4',
                      }}
                    >
                      {item}
                    </div>
                  ))}
                </div>

                {/* 层级之间的深蓝色箭头 */}
                {sIdx < doctorFlow.length - 1 && (
                  <svg
                    width="20"
                    height="24"
                    viewBox="0 0 20 24"
                    fill="none"
                    className="my-1"
                  >
                    <path
                      d="M10 0V20M10 20L3 13M10 20L17 13"
                      stroke="rgba(30, 80, 160, 0.9)"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </div>
            ))}
          </div>

          {/* 流程图下方居中加粗醒目大号白色字体 */}
          <div
            className="mt-4 text-center px-3 py-3 rounded"
            style={{
              backgroundColor: 'rgba(30, 30, 30, 0.6)',
              backdropFilter: 'blur(4px)',
              color: '#ffffff',
              fontFamily: 'Microsoft YaHei, SimHei, sans-serif',
              fontSize: 'clamp(14px, 1.5vw, 19px)',
              fontWeight: '700',
              letterSpacing: '0.03em',
              lineHeight: '1.5',
              textShadow: '0 1px 3px rgba(0,0,0,0.6)',
              boxShadow: '0 2px 10px rgba(0,0,0,0.3)',
            }}
          >
            发热原因超过 200 种，必须尽快明确诊断，否则可能错过治疗窗口
          </div>
        </div>

        {/* 医生耐心劝说气泡 */}
        <div
          className="absolute z-20 transition-all duration-1000"
          style={{
            right: '0.5%',
            top: '3%',
            width: '24%',
            opacity: dissolveBubbles ? 0 : showDoctorPersuasion ? 1 : 0,
            transform: dissolveBubbles
              ? 'translateX(30px) scale(1.1)'
              : showDoctorPersuasion
                ? 'translateX(0) scale(1)'
                : 'translateX(30px) scale(1)',
            filter: dissolveBubbles ? 'blur(15px)' : 'none',
          }}
        >
          <div
            className="px-4 py-3 rounded-2xl"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.92)',
              border: '2px solid rgba(180, 200, 220, 0.9)',
              boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
            }}
          >
            {/* 对话气泡小尾巴 */}
            <div
              style={{
                position: 'absolute',
                left: '-10px',
                top: '30px',
                width: 0,
                height: 0,
                borderTop: '10px solid transparent',
                borderBottom: '10px solid transparent',
                borderRight: '12px solid rgba(255, 255, 255, 0.92)',
              }}
            />

            <div
              style={{
                color: '#1a3a5c',
                fontFamily: 'Microsoft YaHei, SimHei, sans-serif',
                fontSize: 'clamp(12px, 1.2vw, 15px)',
                fontWeight: '500',
                lineHeight: '1.9',
                letterSpacing: '0.02em',
              }}
            >
              <div style={{ marginBottom: '8px', color: '#1a3a5c', fontWeight: '700' }}>
                医生耐心劝说：
              </div>
              <div style={{ marginBottom: '6px' }}>我特别理解你上班请假不容易，</div>
              <div style={{ marginBottom: '6px' }}>抽时间来医院一趟确实耽误工作、耗精力。</div>
              <div style={{ marginBottom: '6px' }}>但发烧不只是表面热，</div>
              <div style={{ marginBottom: '6px' }}>很多严重问题早期只表现为高烧，</div>
              <div style={{ marginBottom: '6px' }}>光吃退烧药只能暂时压下体温，</div>
              <div style={{ marginBottom: '6px' }}>病根没找到，万一拖成肺炎、败血症，</div>
              <div style={{ marginBottom: '6px' }}>到时候要请假住院，</div>
              <div style={{ marginBottom: '6px' }}>耽误的时间和花费只会更多。</div>
              <div style={{ marginBottom: '6px' }}>身体底子才是根本，</div>
              <div style={{ marginBottom: '6px' }}>咱们先做简单检查排除危险，</div>
              <div>对症处理好得更快，反而少折腾。</div>
            </div>
          </div>
        </div>

        {/* 中上方墙的提示文字 */}
        <div
          className="absolute z-30 transition-all duration-1000"
          style={{
            left: '50%',
            top: '12%',
            transform: dissolveWallText
              ? 'translate(-50%, 0) scale(1.2)'
              : showWallText
                ? 'translate(-50%, 0) scale(1)'
                : 'translate(-50%, -30px) scale(1)',
            opacity: dissolveWallText ? 0 : showWallText ? 1 : 0,
            filter: dissolveWallText ? 'blur(15px)' : 'none',
          }}
        >
          <div
            className="text-center px-6 py-4 rounded-lg"
            style={{
              backgroundColor: 'rgba(20, 20, 20, 0.75)',
              backdropFilter: 'blur(6px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              color: '#ffffff',
              fontFamily: 'Microsoft YaHei, SimHei, sans-serif',
              fontSize: 'clamp(16px, 1.8vw, 24px)',
              fontWeight: '700',
              letterSpacing: '0.05em',
              lineHeight: '1.8',
              textShadow: '0 2px 4px rgba(0,0,0,0.7)',
              boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
            }}
          >
            <div>医患认知存在差距</div>
            <div>因此产生就诊沟通矛盾</div>
          </div>
        </div>

        {/* 剧情字幕 */}
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 transition-all duration-1000"
          style={{
            maxWidth: '28%',
            opacity: dissolveSubtitles ? 0 : 1,
            transform: dissolveSubtitles
              ? 'translate(-50%, -50%) scale(1.2)'
              : 'translate(-50%, -50%) scale(1)',
            filter: dissolveSubtitles ? 'blur(15px)' : 'none',
          }}
        >
          <div className="flex flex-col gap-3">
            {subtitles.map((text, idx) => (
              <div
                key={idx}
                className="text-center px-4 py-2 rounded transition-all duration-800"
                style={{
                  backgroundColor: 'rgba(60, 60, 60, 0.65)',
                  backdropFilter: 'blur(4px)',
                  color: '#f8f8f8',
                  fontFamily: 'Microsoft YaHei, SimHei, sans-serif',
                  fontSize: 'clamp(12px, 1.3vw, 18px)',
                  fontWeight: '400',
                  letterSpacing: '0.05em',
                  textShadow: '0 1px 3px rgba(0,0,0,0.5)',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.3)',
                  opacity: idx < visibleLines ? 1 : 0,
                  transform: idx < visibleLines ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.9)',
                }}
              >
                {text}
              </div>
            ))}
          </div>
        </div>

        {/* 红色警示弹窗（返回按钮上方） */}
        <div
          className="absolute z-30 transition-all duration-800"
          style={{
            right: '1%',
            bottom: '12%',
            width: '18%',
            opacity: showDoctorFlow && !showDoctorPersuasion ? 1 : 0,
            transform: showDoctorFlow && !showDoctorPersuasion ? 'translateY(0)' : 'translateY(20px)',
          }}
        >
          <div
            className="px-4 py-3 rounded-lg"
            style={{
              backgroundColor: 'rgba(180, 0, 0, 0.85)',
              border: '3px solid #8b0000',
              color: '#ffffff',
              fontFamily: 'Microsoft YaHei, SimHei, sans-serif',
              fontSize: 'clamp(12px, 1.2vw, 16px)',
              fontWeight: '700',
              textAlign: 'center',
              lineHeight: '1.5',
              textShadow: '0 1px 2px rgba(0,0,0,0.6)',
              boxShadow: '0 4px 16px rgba(139, 0, 0, 0.7), 0 0 20px rgba(255, 0, 0, 0.3)',
            }}
          >
            ⚠ 高热延误诊疗可能导致：
            <br />
            高热惊厥 · 休克 · 永久后遗症
          </div>
        </div>

        {/* 结局剧情 */}
        <div
          className="absolute z-30 transition-all duration-1000"
          style={{
            left: '50%',
            top: '50%',
            transform: showEnding
              ? 'translate(-50%, -50%) scale(1)'
              : 'translate(-50%, -50%) scale(0.9)',
            opacity: showEnding ? 1 : 0,
            width: '50%',
          }}
        >
          <div
            className="px-6 py-5 rounded-2xl relative"
            style={{
              backgroundColor: 'rgba(20, 20, 20, 0.8)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              boxShadow: '0 4px 30px rgba(0,0,0,0.6)',
              textAlign: 'center',
              opacity: showTheme ? 0 : 1,
              transition: 'opacity 0.8s ease',
            }}
          >
            {/* 标题 */}
            <div
              style={{
                color: '#ffffff',
                fontFamily: 'Microsoft YaHei, SimHei, sans-serif',
                fontSize: 'clamp(18px, 2vw, 26px)',
                fontWeight: '700',
                letterSpacing: '0.08em',
                marginBottom: '16px',
                paddingBottom: '12px',
                borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
                textShadow: '0 2px 8px rgba(0,0,0,0.6)',
              }}
            >
              检查后续
            </div>

            {/* 蓝字部分：正确诊疗 */}
            <div
              style={{
                color: '#4a9eff',
                fontFamily: 'Microsoft YaHei, SimHei, sans-serif',
                fontSize: 'clamp(13px, 1.3vw, 17px)',
                fontWeight: '500',
                lineHeight: '2',
                letterSpacing: '0.03em',
                textShadow: '0 0 8px rgba(74, 158, 255, 0.3)',
              }}
            >
              <div style={{ marginBottom: '6px' }}>患者配合完成抽血、胸部 CT 检查后，</div>
              <div style={{ marginBottom: '6px' }}>确诊细菌性肺炎，明确本次高烧根源；</div>
              <div style={{ marginBottom: '6px' }}>医生根据病因开具抗感染药物对症治疗，</div>
              <div style={{ marginBottom: '6px' }}>规范用药后患者体温平稳下降，</div>
              <div style={{ marginBottom: '12px' }}>彻底痊愈无遗留不适。</div>
            </div>

            {/* 红字部分：错误假设 */}
            <div
              style={{
                color: '#ff4a4a',
                fontFamily: 'Microsoft YaHei, SimHei, sans-serif',
                fontSize: 'clamp(13px, 1.3vw, 17px)',
                fontWeight: '500',
                lineHeight: '2',
                letterSpacing: '0.03em',
                textShadow: '0 0 8px rgba(255, 74, 74, 0.3)',
                borderTop: '1px solid rgba(255, 255, 255, 0.15)',
                paddingTop: '12px',
              }}
            >
              <div style={{ marginBottom: '6px' }}>若当初仅单纯服用退烧药压制体温、</div>
              <div style={{ marginBottom: '6px' }}>未针对根源治疗，</div>
              <div style={{ marginBottom: '6px' }}>肺部感染会持续加重，</div>
              <div style={{ marginBottom: '6px' }}>后续可能发展为重症肺炎、败血症，</div>
              <div>甚至引发休克留下长期后遗症。</div>
            </div>

            {/* 学习感悟按钮（结局框内右下角） */}
            <div style={{ position: 'absolute', right: '16px', bottom: '12px' }}>
              <button
                onClick={() => {
                  if (endingAudioRef.current) {
                    endingAudioRef.current.pause();
                    endingAudioRef.current = null;
                  }
                  setShowTheme(true);
                  const audio = new Audio('/audio/theme-voice.mp3');
                  audio.volume = 1;
                  audio.play().catch(() => {});
                }}
                className="rounded-lg transition-all duration-300 hover:scale-105 font-bold tracking-wider"
                style={{
                  background: 'linear-gradient(135deg, #1a3a5c 0%, #2c5a8c 100%)',
                  color: '#ffffff',
                  border: '2px solid #4a9eff',
                  padding: '8px 20px',
                  fontSize: 'clamp(12px, 1.2vw, 16px)',
                  boxShadow: '0 4px 12px rgba(30, 80, 160, 0.5)',
                  textShadow: '0 1px 2px rgba(0,0,0,0.5)',
                }}
              >
                学习感悟
              </button>
            </div>
          </div>
        </div>

        {/* 背景虚化遮罩 */}
        <div
          className="absolute inset-0 z-35 transition-all duration-1000"
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            backdropFilter: showTheme ? 'blur(12px)' : 'blur(0px)',
            opacity: showTheme ? 1 : 0,
            pointerEvents: showTheme ? 'auto' : 'none',
          }}
        />

        {/* 主题文字 */}
        <div
          className="absolute z-40 transition-all duration-1000"
          style={{
            left: '50%',
            top: '50%',
            transform: showTheme
              ? 'translate(-50%, -50%) scale(1)'
              : 'translate(-50%, -50%) scale(0.8)',
            opacity: showTheme ? 1 : 0,
            pointerEvents: showTheme ? 'auto' : 'none',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              color: '#ffffff',
              fontFamily: 'Microsoft YaHei, SimHei, sans-serif',
              fontSize: 'clamp(28px, 4vw, 56px)',
              fontWeight: '900',
              letterSpacing: '0.08em',
              lineHeight: '1.6',
              textShadow:
                '0 0 20px rgba(74, 158, 255, 0.6), 0 0 40px rgba(74, 158, 255, 0.4), 0 0 60px rgba(30, 80, 160, 0.3)',
              WebkitTextStroke: '1px rgba(74, 158, 255, 0.5)',
              opacity: 0.95,
              filter: 'drop-shadow(0 0 12px rgba(74, 158, 255, 0.4))',
            }}
          >
            <div>医患并非对立，</div>
            <div>而是携手并肩、共同对抗疾病的同盟</div>
          </div>
        </div>

        <button
          onClick={handleBack}
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
          返回主页面
        </button>
      </div>
    </div>
  );
}
