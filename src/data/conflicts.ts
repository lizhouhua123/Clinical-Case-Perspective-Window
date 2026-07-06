export type EmotionType = 'anger' | 'confusion' | 'sadness';

export interface ConflictItem {
  id: number;
  patient: {
    title: string;
    emotion: EmotionType;
    audio: string;
  };
  doctor: {
    monologue: string;
    audio: string;
  };
}

export const conflicts: ConflictItem[] = [
  {
    id: 1,
    patient: {
      title: '我就发个烧，你让我查血、拍胸片，是不是为了多赚钱？',
      emotion: 'anger',
      audio: '/audio/patient/patient-1.mp3',
    },
    doctor: {
      monologue: '不查血怎么知道是病毒还是细菌？不拍片怎么排除肺炎？',
      audio: '/audio/doctor/doctor-1.mp3',
    },
  },
  {
    id: 2,
    patient: {
      title: '排了三个小时，医生看我三分钟，这什么态度！',
      emotion: 'anger',
      audio: '/audio/patient/patient-2.mp3',
    },
    doctor: {
      monologue: '你的主诉我已经听明白了，核心问题就是咳嗽三天。',
      audio: '/audio/doctor/doctor-2.mp3',
    },
  },
  {
    id: 3,
    patient: {
      title: '我血压现在不高了，为什么还要天天吃药？药都有副作用。',
      emotion: 'confusion',
      audio: '/audio/patient/patient-3.mp3',
    },
    doctor: {
      monologue: '血压不高是因为药物控制住了，一旦停药反弹更高，对心脑肾的损伤不可逆。',
      audio: '/audio/doctor/doctor-3.mp3',
    },
  },
  {
    id: 4,
    patient: {
      title: '明明只是头晕，你们怎么给治死了？',
      emotion: 'sadness',
      audio: '/audio/patient/patient-4.mp3',
    },
    doctor: {
      monologue: '头晕可能是脑干梗死、心梗前兆。检查结果大面积心梗，我们已经用了所有手段。',
      audio: '/audio/doctor/doctor-4.mp3',
    },
  },
];
