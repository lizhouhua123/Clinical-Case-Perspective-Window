import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface FeverCaseModalProps {
  onClose: () => void;
}

export default function FeverCaseModal({ onClose }: FeverCaseModalProps) {
  const navigate = useNavigate();
  const [sealClicked, setSealClicked] = useState(false);
  const [detailClicked, setDetailClicked] = useState(false);
  const [showNews, setShowNews] = useState(false);

  const handleSealClick = () => {
    setSealClicked(true);
    setTimeout(() => {
      navigate('/fever-case-detail');
    }, 500);
  };

  const handleDetailClick = () => {
    setDetailClicked(true);
    setTimeout(() => {
      setShowNews(true);
      setDetailClicked(false);
    }, 600);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        backdropFilter: 'blur(4px)',
        animation: 'fadeIn 0.3s ease-out',
      }}
      onClick={onClose}
    >
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          0% {
            opacity: 0;
            transform: scale(0.8) rotate(-5deg);
          }
          60% {
            transform: scale(1.03) rotate(1deg);
          }
          100% {
            opacity: 1;
            transform: scale(1) rotate(0deg);
          }
        }
        @keyframes sealStamp {
          0% {
            opacity: 0;
            transform: scale(2) rotate(-15deg);
          }
          50% {
            transform: scale(0.9) rotate(5deg);
          }
          100% {
            opacity: 1;
            transform: scale(1) rotate(0deg);
          }
        }
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes pulse-glow {
          0%, 100% {
            filter: drop-shadow(0 0 8px rgba(255, 100, 80, 0.6));
          }
          50% {
            filter: drop-shadow(0 0 20px rgba(255, 100, 80, 0.9));
          }
        }
        @keyframes bounce-pulse {
          0%, 100% {
            transform: translateY(0) scale(1);
          }
          50% {
            transform: translateY(-5px) scale(1.03);
          }
        }
      `}</style>

      {/* 病历单容器 */}
      <div
        className="relative"
        style={{
          width: 'min(90vw, 700px)',
          maxHeight: '90vh',
          animation: 'scaleIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* 初始病历单背景 */}
        <img
          src="/fever-case/initial.png"
          alt="发热病例"
          className="w-full h-auto drop-shadow-2xl"
          style={{
            filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.5))',
          }}
        />

        {/* 特别会诊印章 - 右下角偏上 */}
        <div
          className="absolute cursor-pointer transition-transform duration-300 hover:scale-110"
          style={{
            right: '2%',
            bottom: '12%',
            width: '22%',
          }}
          onClick={handleSealClick}
        >
          <div style={{ animation: 'slideUp 0.6s ease-out 0.5s both' }}>
            <img
              src="/fever-case/special-consult.png"
              alt="特别会诊"
              className="w-full h-auto"
              style={{
                mixBlendMode: 'multiply',
                backgroundColor: 'transparent',
              }}
            />
          {sealClicked && (
            <div
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
              style={{
                backgroundColor: 'rgba(255, 80, 80, 0.3)',
                borderRadius: '50%',
              }}
            >
              <span className="text-white font-bold text-sm drop-shadow-lg">
                已申请
              </span>
            </div>
          )}
          </div>
        </div>

        {/* 点击查看病例详情 - 底部 */}
        <div
          className="absolute cursor-pointer transition-transform duration-300 hover:scale-110"
          style={{
            right: '8%',
            bottom: '2%',
            width: '35%',
          }}
          onClick={handleDetailClick}
        >
          <div style={{ animation: 'slideUp 0.6s ease-out 0.8s both' }}>
            <img
              src="/fever-case/view-detail.png"
              alt="点击查看病例详情"
              className="w-full h-auto drop-shadow-lg"
            />
          {detailClicked && (
            <div
              className="absolute inset-0 flex items-center justify-center pointer-events-none rounded"
              style={{
                backgroundColor: 'rgba(255, 200, 50, 0.4)',
              }}
            >
              <span className="text-amber-900 font-bold text-xs md:text-sm drop-shadow">
                跳转中...
              </span>
            </div>
          )}
          </div>
        </div>
      </div>

      {/* 关闭提示 */}
      <div
        className="absolute top-6 right-6 text-white/60 text-sm tracking-wider"
        style={{ animation: 'fadeIn 0.5s ease-out 1s both' }}
      >
        点击任意处关闭
      </div>

      {/* 新闻单弹窗 */}
      {showNews && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center"
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.85)',
            backdropFilter: 'blur(6px)',
            animation: 'fadeIn 0.4s ease-out',
          }}
          onClick={() => setShowNews(false)}
        >
          <style>{`
            @keyframes newsSlideIn {
              from {
                opacity: 0;
                transform: translateY(40px) scale(0.95);
              }
              to {
                opacity: 1;
                transform: translateY(0) scale(1);
              }
            }
            @keyframes titleFadeIn {
              from { opacity: 0; transform: translateY(-10px); }
              to { opacity: 1; transform: translateY(0); }
            }
            @keyframes contentFadeIn {
              from { opacity: 0; transform: translateY(10px); }
              to { opacity: 1; transform: translateY(0); }
            }
          `}</style>

          <div
            className="relative"
            style={{
              width: 'min(92vw, 720px)',
              maxHeight: '92vh',
              animation: 'newsSlideIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* 新闻图背景 */}
            <img
              src="/fever-case/news.png"
              alt="新闻单"
              className="w-full h-auto block"
              style={{
                filter: 'drop-shadow(0 20px 50px rgba(0,0,0,0.6))',
              }}
            />

            {/* 标题栏文字叠加 */}
            <div
              className="absolute"
              style={{
                left: '10%',
                right: '10%',
                top: '7%',
                animation: 'titleFadeIn 0.8s ease-out 0.4s both',
              }}
            >
              <h1
                style={{
                  color: '#1a1a1a',
                  fontFamily: 'Microsoft YaHei, SimHei, sans-serif',
                  fontSize: 'clamp(18px, 3vw, 28px)',
                  fontWeight: '900',
                  lineHeight: '1.5',
                  textAlign: 'center',
                  letterSpacing: '0.02em',
                  textShadow: '0 1px 2px rgba(255,255,255,0.5)',
                }}
              >
                <div>从发热到死亡仅13天</div>
                <div>这个悲剧为所有人敲响警钟！</div>
              </h1>
            </div>

            {/* 内容栏文字叠加 */}
            <div
              className="absolute overflow-y-auto"
              style={{
                left: '10%',
                right: '10%',
                top: '24%',
                bottom: '8%',
                animation: 'contentFadeIn 0.8s ease-out 0.8s both',
                padding: '0 8px',
              }}
            >
              <div
                style={{
                  color: '#222',
                  fontFamily: 'Microsoft YaHei, SimHei, sans-serif',
                  fontSize: 'clamp(11px, 1.4vw, 14px)',
                  fontWeight: '400',
                  lineHeight: '1.95',
                  letterSpacing: '0.01em',
                  textAlign: 'justify',
                  textIndent: '2em',
                }}
              >
                <p style={{ marginBottom: '10px' }}>
                  流感高发季，一名急诊科医生分享了一则真实悲剧案例：一名老年患者因家属将流感误判为普通受凉感冒，多次拒绝专业检查与住院治疗、延误规范救治，从出现症状到离世仅13天，为大众尤其是老年群体的流感防治敲响警钟。
                </p>
                <p style={{ marginBottom: '10px' }}>
                  据悉，患者最初因身体不适被家属送至医院急诊，家属主观认定老人只是受凉引发老毛病，坚持要求按既往方案输液治疗。接诊医生结合当时流感高发的背景，以及患者高热、肌肉酸痛、乏力、食欲差等异于普通感冒的症状，多次建议其完善血常规、胸部CT等相关检查，排查流感及肺部病变，但家属态度固执，拒绝检查并带患者离开。
                </p>
                <p style={{ marginBottom: '10px' }}>
                  后续患者在外私人诊所连续输液三天，症状未得到任何缓解，还新增咳嗽、咳痰症状，家属遂再次返回医院。此次检查结果显示患者存在双肺肺炎、甲流初筛弱阳性，且合并二型呼吸衰竭，病情已较为严重，医生当即建议住院治疗。但家属以临近过年、家中生意繁忙无人照料为由，再次拒绝住院，仅选择门诊输液后带患者居家观察。
                </p>
                <p style={{ marginBottom: '10px' }}>
                  经门诊输液后，患者表面症状短暂缓解，让家属误以为病情好转。首次就诊第十二天，家属因患者咳痰困难前往医院开具化痰药物，在医生建议不适需及时复诊后，仅取药居家观察。次日，患者病情急剧恶化，被120紧急送医抢救，陷入重度昏迷，生命体征持续衰竭，最终家属签字放弃抢救，患者不幸离世。
                </p>
                <p style={{ textAlign: 'right', color: '#666', fontSize: '0.9em', marginTop: '8px' }}>
                  （2019人民网报道）
                </p>
              </div>
            </div>

            {/* 关闭按钮 */}
            <button
              className="absolute"
              style={{
                top: '8px',
                right: '8px',
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                border: 'none',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                color: '#fff',
                fontSize: '20px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'background-color 0.2s',
              }}
              onClick={() => setShowNews(false)}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(200, 50, 50, 0.8)')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.5)')}
              aria-label="关闭新闻"
            >
              ×
            </button>
          </div>

          {/* 底部提示 */}
          <div
            className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/60 text-sm tracking-wider"
            style={{ animation: 'fadeIn 0.5s ease-out 1.2s both' }}
          >
            点击任意处关闭新闻
          </div>
        </div>
      )}
    </div>
  );
}
