import { useState, useEffect } from 'react';

const playPageTurnSound = () => {
  const audioContext = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);

  oscillator.type = 'sine';
  oscillator.frequency.setValueAtTime(400, audioContext.currentTime);
  oscillator.frequency.exponentialRampToValueAtTime(150, audioContext.currentTime + 0.3);

  gainNode.gain.setValueAtTime(0.15, audioContext.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);

  oscillator.start();
  oscillator.stop(audioContext.currentTime + 0.3);
};

interface QuizCase {
  id: number;
  title: string;
  date: string;
  patientInfo: string[];
  question: string;
  options: { label: string; text: string }[];
  redInfo: string[];
  news: string;
  correctAnswer: string;
  analysis: string[];
}

interface ClinicalQuizProps {
  onComplete: () => void;
}

const quizCases: QuizCase[] = [
  {
    id: 1,
    title: '病例一',
    date: '2024年12月15日',
    patientInfo: [
      '患者：82岁女性',
      '主诉：发热3天，体温最高39.2℃',
      '症状：高热、肌肉酸痛、乏力、食欲差',
      '家属描述：老人只是受凉了，每年冬天都会这样，吃点感冒药就好',
      '当前背景：流感高发季',
    ],
    question: '作为接诊医生，你认为最合理的处理是？',
    options: [
      {
        label: 'A',
        text: '按普通感冒治疗，开具退烧药+复方感冒药，让家属带药回家观察',
      },
      {
        label: 'B',
        text: '考虑病毒感染可能性大，开具抗病毒药物，建议多喝水休息',
      },
      {
        label: 'C',
        text: '症状较重，安排门诊输液治疗，先缓解发热和乏力症状',
      },
    ],
    redInfo: [
      '既往史遗漏：患者有20年高血压病史、10年糖尿病史，长期服用降压药和降糖药',
      '关键体征：听诊双肺呼吸音减弱，未闻及明显啰音（早期肺炎可能无典型体征）',
      '流行病学史：患者同住家属5天前出现类似症状，自行服药后好转（家庭聚集性发病）',
    ],
    news: '流感高发季，一名老年患者因家属将流感症状误判为普通受凉感冒，多次拒绝专业检查。医生建议完善血常规、胸部CT时，家属坚称"老人只是老毛病犯了"，坚持要求按既往方案输液治疗。3天后症状未缓解，患者出现咳嗽、咳痰，复查发现双肺肺炎、甲流弱阳性，但此时已合并呼吸衰竭。家属仍以"临近过年"为由拒绝住院。第12天，患者病情急剧恶化，被120紧急送医抢救，最终因重症肺炎、多器官功能衰竭不幸离世。',
    correctAnswer: '立即安排血常规、胸部CT检查，同时建议住院观察！',
    analysis: [
      '高危人群：82岁高龄 + 高血压+糖尿病基础疾病，属于流感重症高危人群，不能按普通感冒处理',
      '家庭聚集性发病：家属先出现症状，提示流感可能性极大，需警惕病毒传播',
      '体征异常：双肺呼吸音减弱，虽未闻及啰音，但老年肺炎早期可能无典型体征，必须通过CT明确肺部情况',
      '症状持续不缓解：发热3天未好转，且全身症状明显，需排除并发症',
    ],
  },
  {
    id: 2,
    title: '病例二',
    date: '2025年4月16日',
    patientInfo: [
      '患者：62岁男性',
      '主诉：反复发热伴乏力2周',
      '症状：体温最高39.2℃，呼吸急促，咳嗽有痰',
      '就诊经过：外院诊断为"肺部感染"，已输液治疗1周，但发热仍反复，效果不佳',
      '患者自述：平时身体健康，就是最近总发烧，感觉特别累',
    ],
    question: '患者已按肺部感染治疗1周仍无效，你认为下一步最合理的处理是？',
    options: [
      {
        label: 'A',
        text: '继续当前抗感染治疗方案，认为疗程还不够，再观察3-5天看看效果',
      },
      {
        label: 'B',
        text: '考虑可能是耐药菌感染，更换更强效、更广谱的抗生素进行治疗',
      },
      {
        label: 'C',
        text: '常规治疗无效，建议安排支气管镜检查，取肺组织活检进一步明确病因',
      },
    ],
    redInfo: [
      '病史遗漏：患者家中饲养鹦鹉已逾一年，长期清理鸟笼，接触禽类排泄物',
      '关键线索：此前科室收治的鹦鹉热衣原体感染患者，肺部CT表现与此病例高度相似',
      '传播途径：鹦鹉热衣原体主要通过禽类排泄物传播，患者长期接触鹦鹉，感染风险显著增加',
    ],
    news: '62岁患者因反复发热伴乏力2周入院，体温高达39.2℃，呼吸急促。外院诊断为"肺部感染"，常规抗感染治疗效果欠佳。胸部CT显示左肺多发阴影伴少量胸腔积液。起初患者仅提到"无禽类接触史"，但在医生反复沟通追问下，家属透露家中饲养鹦鹉已逾一年。结合影像学特征和流行病学史，医生高度怀疑鹦鹉热衣原体感染，调整治疗方案加用多西环素。用药48小时后，患者体温逐渐恢复正常，乏力症状明显缓解。后续病原学检测证实：痰液报告显示鹦鹉热衣原体阳性。',
    correctAnswer: '立即追问患者生活史和流行病学接触史，重点询问有无禽类接触史！',
    analysis: [
      '治疗无效是核心信号：常规抗感染治疗1周仍无效，说明病原体可能不是常见细菌',
      '影像学有提示：肺部CT表现与鹦鹉热衣原体感染高度相似',
      '流行病学史是关键：鹦鹉热衣原体通过禽类排泄物传播，追问生活史是诊断突破口',
      '特效药明确：一旦确诊鹦鹉热，多西环素治疗48小时内即可见效',
    ],
  },
  {
    id: 3,
    title: '病例三',
    date: '2025年6月20日',
    patientInfo: [
      '患者：70岁女性',
      '主诉：发热1周，体温最高39℃',
      '症状：高热、畏寒怕冷、全身肌肉酸痛、食欲极差',
      '消化道症状：从"吃不下"发展到"一吃就吐"，体重明显下降',
      '全身状态：精神萎靡、浑身无力',
      '患者自述：以前身体一直很好，极少生病，这次就是"感冒"了，吃点药就好',
    ],
    question: '作为首诊医生，你认为最合理的处理是？',
    options: [
      {
        label: 'A',
        text: '考虑呼吸道感染可能性大，开具抗生素+退烧药治疗，回家观察',
      },
      {
        label: 'B',
        text: '消化道症状明显，按急性肠胃炎处理，开具止吐药+肠胃调理药，建议清淡饮食',
      },
      {
        label: 'C',
        text: '老年人全身状态差，考虑营养不良+脱水，安排补液支持治疗，补充营养',
      },
    ],
    redInfo: [
      '病史遗漏：患者长期有眼干、关节疼痛的老毛病，只是从没当回事，也没告诉医生',
      '关键线索：反复发热 + 抗生素无效 + 消化道症状突出，这种不典型表现提示可能不是感染',
      '医学常识：发热不一定都是细菌/病毒感染，自身免疫性疾病也会引发全身炎症反应导致高热',
    ],
    news: '温州市中医院老年医学科收治了一位70岁的卢奶奶。一周前劳累后突然"感冒"：高烧39℃、畏寒怕冷、全身肌肉酸痛，连饭都吃不下。家人最初以为是重感冒，自行用药后毫无起色。当地医院按"呼吸道感染"给予抗生素治疗，配合退烧药，然而三天过去，体温依旧反复，最高仍冲至39℃。更让人心慌的是，卢奶奶的症状非但没有缓解，反而急转直下——胃口越来越差，从"吃不下"发展到"一吃就吐"，整个人迅速消瘦、精神萎靡。抗生素越用越多，病情却越治越重。转院后医生重新梳理病史，发现了关键疑点：卢奶奶除了发热，其实长期有眼干、关节疼痛的老毛病。结合反复发热、抗生素无效、消化道症状突出等不典型表现，医生敏锐地意识到——这可能不是感染，而是免疫系统在"作乱"。经过针对性风湿免疫学及病理检查，真相大白：卢奶奶反复发热的"真凶"竟是干燥综合征！这是一种自身免疫性疾病，此次是疾病活动引发的全身炎症反应，而非细菌感染。之前使用的抗生素不仅无效，反而因其胃肠道副作用加重了患者的呕吐和食欲不振。明确诊断后，医生立即调整方案，给予免疫调节和对症支持治疗。很快，卢奶奶的体温恢复正常，呕吐停止，胃口和精神明显好转，最终顺利出院。',
    correctAnswer: '发热不能一概而论为感染，必须全面追问病史，排查自身免疫性疾病可能！',
    analysis: [
      '不典型表现：反复发热 + 消化道症状突出 + 全身状态差，不能简单用普通感染解释',
      '病史是突破口：眼干、关节疼痛等全身症状是干燥综合征的典型表现，追问病史即可发现线索',
      '治疗方向完全相反：自身免疫病用抗生素不仅无效，还会因副作用加重病情（如呕吐、食欲差）',
      '老年人特点：老年患者自身免疫病表现常不典型，容易被误诊为感染或营养不良',
    ],
  },
];

export default function ClinicalQuiz({ onComplete }: ClinicalQuizProps) {
  const [currentCaseIndex, setCurrentCaseIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [showRedInfo, setShowRedInfo] = useState(false);
  const [visibleRedLines, setVisibleRedLines] = useState(0);
  const [showNews, setShowNews] = useState(false);
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [isFlipping, setIsFlipping] = useState(false);

  const currentCase = quizCases[currentCaseIndex];

  useEffect(() => {
    if (showRedInfo && visibleRedLines < currentCase.redInfo.length) {
      const timer = setTimeout(() => {
        setVisibleRedLines((prev) => prev + 1);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [showRedInfo, visibleRedLines, currentCase.redInfo.length]);

  const handleOptionSelect = (optionIndex: number) => {
    if (submitted) return;
    setSelectedOption(optionIndex);
  };

  const handleSubmit = () => {
    if (selectedOption === null) return;
    setSubmitted(true);
    const audio = new Audio(`/audio/quiz-case${currentCaseIndex + 1}-submit.mp3`);
    audio.volume = 1;
    audio.play().catch(() => {});
    setTimeout(() => {
      setShowRedInfo(true);
    }, 500);
  };

  const handleShowNews = () => {
    setShowNews(true);
  };

  const handleShowAnalysis = () => {
    setShowAnalysis(true);
  };

  const handleNextCase = () => {
    playPageTurnSound();
    setIsFlipping(true);

    setTimeout(() => {
      if (currentCaseIndex < quizCases.length - 1) {
        setCurrentCaseIndex((prev) => prev + 1);
        setSelectedOption(null);
        setSubmitted(false);
        setShowRedInfo(false);
        setVisibleRedLines(0);
        setShowNews(false);
        setShowAnalysis(false);
      } else {
        onComplete();
      }
      setIsFlipping(false);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm overflow-y-auto py-8">
      <div className="relative w-full max-w-6xl mx-4 my-auto">
        <div
          className={`relative transition-all duration-500 ${
            isFlipping ? 'opacity-0 translate-x-[-100%]' : 'opacity-100 translate-x-0'
          }`}
          style={{
            background:
              'linear-gradient(135deg, #fdfbf7 0%, #f5f0e6 50%, #ebe4d5 100%)',
            borderRadius: '8px',
            boxShadow:
              '0 10px 40px rgba(0,0,0,0.3), 0 0 0 1px rgba(139, 69, 19, 0.1)',
            border: '1px solid rgba(139, 69, 19, 0.2)',
          }}
        >
          <div
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.04'/%3E%3C/svg%3E\")",
              padding: '32px',
              borderRadius: '8px',
            }}
          >
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-amber-800/20">
              <div className="flex items-center gap-4">
                <div
                  style={{
                    color: '#8b4513',
                    fontFamily: 'Microsoft YaHei, SimHei, sans-serif',
                    fontSize: '24px',
                    fontWeight: '700',
                    letterSpacing: '0.1em',
                  }}
                >
                  {currentCase.title}
                </div>
                <div
                  style={{
                    width: '1px',
                    height: '24px',
                    backgroundColor: '#8b4513',
                  }}
                />
                <div
                  style={{
                    color: '#8b4513',
                    fontFamily: 'Microsoft YaHei, SimHei, sans-serif',
                    fontSize: '14px',
                    fontWeight: '500',
                    opacity: '0.7',
                  }}
                >
                  编号：{String(currentCase.id).padStart(3, '0')}
                </div>
              </div>
              <div
                style={{
                  color: '#8b4513',
                  fontFamily: 'Microsoft YaHei, SimHei, sans-serif',
                  fontSize: '14px',
                  fontWeight: '500',
                  opacity: '0.7',
                }}
              >
                {currentCase.date}
              </div>
            </div>

            <div
              className="mb-6 grid gap-6"
              style={{
                gridTemplateColumns: showRedInfo ? '1fr 1fr' : '1fr',
                transition: 'grid-template-columns 0.5s ease',
              }}
            >
              <div>
                <div
                  style={{
                    color: '#5a3a1a',
                    fontFamily: 'Microsoft YaHei, SimHei, sans-serif',
                    fontSize: '14px',
                    fontWeight: '700',
                    marginBottom: '16px',
                    letterSpacing: '0.05em',
                  }}
                >
                  患者信息
                </div>
                <div className="space-y-4">
                  {currentCase.patientInfo.map((info, idx) => (
                    <div
                      key={idx}
                      style={{
                        color: '#2c2c2c',
                        fontFamily: 'Microsoft YaHei, SimHei, sans-serif',
                        fontSize: '15px',
                        fontWeight: '500',
                        lineHeight: '1.8',
                        padding: '12px 16px',
                        backgroundColor: 'rgba(212, 165, 116, 0.08)',
                        borderRadius: '6px',
                        borderLeft: '4px solid #d4a574',
                      }}
                    >
                      {info}
                    </div>
                  ))}
                </div>
              </div>

              {showRedInfo && (
                <div className="animate-fade-in">
                  <div
                    style={{
                      color: '#8b0000',
                      fontFamily: 'Microsoft YaHei, SimHei, sans-serif',
                      fontSize: '14px',
                      fontWeight: '700',
                      marginBottom: '16px',
                      letterSpacing: '0.05em',
                    }}
                  >
                    ⚠ 补充信息
                  </div>
                  <div className="space-y-4">
                    {currentCase.redInfo.map((info, idx) => (
                      <div
                        key={idx}
                        className={`transition-all duration-800 ${
                          idx < visibleRedLines ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
                        }`}
                        style={{
                          color: '#8b0000',
                          fontFamily: 'Microsoft YaHei, SimHei, sans-serif',
                          fontSize: '15px',
                          fontWeight: '500',
                          lineHeight: '1.8',
                          padding: '12px 16px',
                          backgroundColor: 'rgba(139, 0, 0, 0.08)',
                          borderRadius: '6px',
                          borderLeft: '4px solid #8b0000',
                          fontStyle: 'italic',
                        }}
                      >
                        {info}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="mb-6">
              <div
                style={{
                  color: '#8b0000',
                  fontFamily: 'Microsoft YaHei, SimHei, sans-serif',
                  fontSize: '17px',
                  fontWeight: '700',
                  lineHeight: '1.6',
                  marginBottom: '16px',
                  padding: '12px 16px',
                  backgroundColor: 'rgba(139, 0, 0, 0.05)',
                  borderRadius: '6px',
                  borderLeft: '4px solid #8b0000',
                }}
              >
                {currentCase.question}
              </div>

              <div className="space-y-4">
                {currentCase.options.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleOptionSelect(idx)}
                    disabled={submitted}
                    className={`w-full text-left transition-all duration-300 rounded-lg ${
                      selectedOption === idx
                        ? 'bg-amber-100 border-amber-500'
                        : 'bg-white/60 border-amber-200 hover:bg-amber-50'
                    } ${submitted ? 'cursor-default' : 'cursor-pointer'}`}
                    style={{
                      border: '2px solid',
                      padding: '16px',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                    }}
                  >
                    <div className="flex items-start gap-4">
                      <div
                        style={{
                          width: '28px',
                          height: '28px',
                          borderRadius: '50%',
                          border: '3px solid',
                          borderColor:
                            selectedOption === idx ? '#8b0000' : '#8b4513',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                          fontFamily: 'serif',
                          fontSize: '18px',
                          fontWeight: '700',
                          color: selectedOption === idx ? '#8b0000' : '#8b4513',
                        }}
                      >
                        {selectedOption === idx ? (
                          <span style={{ fontSize: '12px' }}>●</span>
                        ) : (
                          <span style={{ fontSize: '12px' }}>○</span>
                        )}
                      </div>
                      <div className="flex-1">
                        <span
                          style={{
                            fontFamily: 'Microsoft YaHei, SimHei, sans-serif',
                            fontSize: '16px',
                            fontWeight: '700',
                            color: '#8b4513',
                            marginRight: '8px',
                          }}
                        >
                          {option.label}.
                        </span>
                        <span
                          style={{
                            fontFamily: 'Microsoft YaHei, SimHei, sans-serif',
                            fontSize: '16px',
                            fontWeight: '400',
                            color: '#2c2c2c',
                            lineHeight: '1.6',
                          }}
                        >
                          {option.text}
                        </span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {showRedInfo && visibleRedLines >= currentCase.redInfo.length && (
              <div
                className="mb-6 text-center animate-fade-in"
                style={{
                  color: '#8b0000',
                  fontFamily: 'Microsoft YaHei, SimHei, sans-serif',
                  fontSize: '18px',
                  fontWeight: '700',
                  letterSpacing: '0.1em',
                  padding: '16px',
                  backgroundColor: 'rgba(139, 0, 0, 0.1)',
                  borderRadius: '8px',
                }}
              >
                现在还是这个答案么？
              </div>
            )}

            {showNews && (
              <div className="mb-6 animate-fade-in">
                <div
                  style={{
                    color: '#1a3a5c',
                    fontFamily: 'Microsoft YaHei, SimHei, sans-serif',
                    fontSize: '14px',
                    fontWeight: '700',
                    marginBottom: '12px',
                    letterSpacing: '0.05em',
                    paddingBottom: '8px',
                    borderBottom: '2px solid rgba(26, 58, 92, 0.3)',
                  }}
                >
                  📰 真实案例
                </div>
                <div
                  style={{
                    color: '#2c2c2c',
                    fontFamily: 'Microsoft YaHei, SimHei, sans-serif',
                    fontSize: '15px',
                    fontWeight: '400',
                    lineHeight: '2',
                    padding: '16px',
                    backgroundColor: 'rgba(26, 58, 92, 0.05)',
                    borderRadius: '6px',
                    borderLeft: '4px solid #1a3a5c',
                  }}
                >
                  {currentCase.news}
                </div>
              </div>
            )}

            {showAnalysis && (
              <div className="mb-6 animate-fade-in">
                <div
                  style={{
                    color: '#2d5a27',
                    fontFamily: 'Microsoft YaHei, SimHei, sans-serif',
                    fontSize: '14px',
                    fontWeight: '700',
                    marginBottom: '12px',
                    letterSpacing: '0.05em',
                    paddingBottom: '8px',
                    borderBottom: '2px solid rgba(45, 90, 39, 0.3)',
                  }}
                >
                  ✅ 正确判断与分析
                </div>
                <div
                  style={{
                    color: '#8b0000',
                    fontFamily: 'Microsoft YaHei, SimHei, sans-serif',
                    fontSize: '18px',
                    fontWeight: '700',
                    lineHeight: '1.6',
                    padding: '16px',
                    backgroundColor: 'rgba(139, 0, 0, 0.08)',
                    borderRadius: '6px',
                    marginBottom: '16px',
                    borderLeft: '4px solid #8b0000',
                  }}
                >
                  {currentCase.correctAnswer}
                </div>
                <div className="space-y-3">
                  {currentCase.analysis.map((point, idx) => (
                    <div
                      key={idx}
                      style={{
                        color: '#2c2c2c',
                        fontFamily: 'Microsoft YaHei, SimHei, sans-serif',
                        fontSize: '15px',
                        fontWeight: '500',
                        lineHeight: '1.8',
                        paddingLeft: '24px',
                        position: 'relative',
                      }}
                    >
                      <span
                        style={{
                          position: 'absolute',
                          left: '0',
                          color: '#2d5a27',
                          fontWeight: '700',
                        }}
                      >
                        {idx + 1}.
                      </span>
                      {point}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex justify-between items-center pt-4 border-t border-amber-800/20">
              <div
                style={{
                  color: '#8b4513',
                  fontFamily: 'Microsoft YaHei, SimHei, sans-serif',
                  fontSize: '14px',
                  fontWeight: '500',
                  opacity: '0.7',
                }}
              >
                临床考验 · 第 {currentCaseIndex + 1} / {quizCases.length} 关
              </div>

              <div className="flex gap-4">
                {!submitted ? (
                  <button
                    onClick={handleSubmit}
                    disabled={selectedOption === null}
                    className={`px-8 py-3 rounded-lg font-bold tracking-wider transition-all duration-300 ${
                      selectedOption !== null
                        ? 'hover:scale-105 cursor-pointer'
                        : 'opacity-50 cursor-not-allowed'
                    }`}
                    style={{
                      background:
                        selectedOption !== null
                          ? 'linear-gradient(135deg, #8b4513 0%, #a0522d 100%)'
                          : '#d4c4b0',
                      color: '#ffffff',
                      border: '2px solid #8b4513',
                      fontSize: '16px',
                      boxShadow:
                        selectedOption !== null
                          ? '0 4px 12px rgba(139, 69, 19, 0.4)'
                          : 'none',
                    }}
                  >
                    提交答案
                  </button>
                ) : !showNews ? (
                  <button
                    onClick={handleShowNews}
                    className="px-6 py-3 rounded-lg font-bold tracking-wider transition-all duration-300 hover:scale-105"
                    style={{
                      background: 'linear-gradient(135deg, #1a3a5c 0%, #2c5a8c 100%)',
                      color: '#ffffff',
                      border: '2px solid #1a3a5c',
                      fontSize: '14px',
                      boxShadow: '0 4px 12px rgba(26, 58, 92, 0.4)',
                    }}
                  >
                    查看真实案例
                  </button>
                ) : !showAnalysis ? (
                  <button
                    onClick={handleShowAnalysis}
                    className="px-6 py-3 rounded-lg font-bold tracking-wider transition-all duration-300 hover:scale-105"
                    style={{
                      background: 'linear-gradient(135deg, #2d5a27 0%, #3d7a37 100%)',
                      color: '#ffffff',
                      border: '2px solid #2d5a27',
                      fontSize: '14px',
                      boxShadow: '0 4px 12px rgba(45, 90, 39, 0.4)',
                    }}
                  >
                    查看正确判断
                  </button>
                ) : (
                  <button
                    onClick={handleNextCase}
                    className="px-8 py-3 rounded-lg font-bold tracking-wider transition-all duration-300 hover:scale-105"
                    style={{
                      background: 'linear-gradient(135deg, #8b0000 0%, #b22222 100%)',
                      color: '#ffffff',
                      border: '2px solid #8b0000',
                      fontSize: '16px',
                      boxShadow: '0 4px 12px rgba(139, 0, 0, 0.4)',
                    }}
                  >
                    {currentCaseIndex < quizCases.length - 1 ? '下一个病例' : '进入感悟'}
                  </button>
                )}
              </div>
            </div>
          </div>

          <div
            className="absolute top-0 right-0 w-16 h-full pointer-events-none"
            style={{
              background:
                'linear-gradient(to right, rgba(139, 69, 19, 0.1) 0%, rgba(139, 69, 19, 0.05) 50%, transparent 100%)',
            }}
          />
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}
