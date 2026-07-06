import { useState, useEffect, useRef, useCallback } from 'react';
import { conflicts } from '@/data/conflicts';

// 对话序列：患者和医生交替出现
// step 0: 患者1, step 1: 医生1, step 2: 患者2, step 3: 医生2 ...
type DialogueStep = {
  side: 'patient' | 'doctor';
  index: number; // 在 conflicts 数组中的索引
  audio: string;
};

const dialogueSteps: DialogueStep[] = [];
for (let i = 0; i < conflicts.length; i++) {
  dialogueSteps.push({ side: 'patient', index: i, audio: conflicts[i].patient.audio });
  dialogueSteps.push({ side: 'doctor', index: i, audio: conflicts[i].doctor.audio });
}

// 每句之间的停顿（音频播放结束后到下一句出现前的间隔）
const GAP_BETWEEN_LINES = 600;

export function useAnimationSequence(started: boolean) {
  const [activePhases, setActivePhases] = useState<Set<string>>(new Set());
  const [patientVisibleCount, setPatientVisibleCount] = useState(0);
  const [doctorVisibleCount, setDoctorVisibleCount] = useState(0);
  const [currentStep, setCurrentStep] = useState(-1); // 当前播放到第几步
  const [finished, setFinished] = useState(false); // 所有对话是否播放完毕

  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const cancelledRef = useRef(false);

  // 播放下一步
  const playStep = useCallback((stepIndex: number) => {
    if (cancelledRef.current || stepIndex >= dialogueSteps.length) {
      // 所有对话播放完毕，高亮取消，显示按钮
      if (!cancelledRef.current) {
        setFinished(true);
        const timer = setTimeout(() => {
          setActivePhases((prev) => {
            const next = new Set(prev);
            next.add('button');
            return next;
          });
        }, 800);
        timersRef.current.push(timer);
      }
      return;
    }

    const step = dialogueSteps[stepIndex];
    setCurrentStep(stepIndex);

    // 显示对应行
    if (step.side === 'patient') {
      setPatientVisibleCount(step.index + 1);
    } else {
      setDoctorVisibleCount(step.index + 1);
    }

    // 播放音频
    const audio = new Audio(step.audio);
    audioRef.current = audio;

    audio.addEventListener('ended', () => {
      // 音频播放结束后，停顿一会儿再播放下一句
      const timer = setTimeout(() => {
        playStep(stepIndex + 1);
      }, GAP_BETWEEN_LINES);
      timersRef.current.push(timer);
    });

    audio.addEventListener('error', () => {
      // 音频加载失败，用默认时长继续
      const fallbackDuration = 3000;
      const timer = setTimeout(() => {
        playStep(stepIndex + 1);
      }, fallbackDuration + GAP_BETWEEN_LINES);
      timersRef.current.push(timer);
    });

    audio.play().catch(() => {
      // 自动播放被阻止，用默认时长继续
      const fallbackDuration = 3000;
      const timer = setTimeout(() => {
        playStep(stepIndex + 1);
      }, fallbackDuration + GAP_BETWEEN_LINES);
      timersRef.current.push(timer);
    });
  }, []);

  useEffect(() => {
    if (!started) return;

    cancelledRef.current = false;

    // 初始阶段动画：背景 → 标题 → 问号 → 墙
    const initialPhases = [
      { name: 'background', delay: 0 },
      { name: 'title', delay: 500 },
      { name: 'questionMark', delay: 2500 },
      { name: 'wall', delay: 3000 },
    ];

    initialPhases.forEach((phase) => {
      const timer = setTimeout(() => {
        setActivePhases((prev) => {
          const next = new Set(prev);
          next.add(phase.name);
          return next;
        });
      }, phase.delay);
      timersRef.current.push(timer);
    });

    // 4000ms 后开始对话序列
    const startDialogueTimer = setTimeout(() => {
      playStep(0);
    }, 4000);
    timersRef.current.push(startDialogueTimer);

    return () => {
      cancelledRef.current = true;
      timersRef.current.forEach(clearTimeout);
      timersRef.current = [];
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [playStep, started]);

  const isActive = (phaseName: string) => activePhases.has(phaseName);

  return {
    isActive,
    showBackground: isActive('background'),
    showTitle: isActive('title'),
    showQuestionMark: isActive('questionMark'),
    showWall: isActive('wall'),
    showButton: isActive('button'),
    patientVisibleCount,
    doctorVisibleCount,
    currentStep,
    finished,
  };
}
