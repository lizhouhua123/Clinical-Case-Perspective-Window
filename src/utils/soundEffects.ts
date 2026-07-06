let audioContext: AudioContext | null = null;

function getAudioContext(): AudioContext {
  if (!audioContext) {
    audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  if (audioContext.state === 'suspended') {
    audioContext.resume();
  }
  return audioContext;
}

export function playPageFlipSound() {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;

    // 创建白噪声
    const bufferSize = ctx.sampleRate * 0.4;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const source = ctx.createBufferSource();
    source.buffer = buffer;

    // 带通滤波器模拟纸张沙沙声
    const bandpass = ctx.createBiquadFilter();
    bandpass.type = 'bandpass';
    bandpass.frequency.setValueAtTime(1000, now);
    bandpass.frequency.exponentialRampToValueAtTime(4000, now + 0.1);
    bandpass.frequency.exponentialRampToValueAtTime(800, now + 0.35);
    bandpass.Q.value = 0.8;

    // 高通滤波器去除低频
    const highpass = ctx.createBiquadFilter();
    highpass.type = 'highpass';
    highpass.frequency.value = 200;

    // 包络控制音量
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.3, now + 0.02);
    gain.gain.linearRampToValueAtTime(0.15, now + 0.15);
    gain.gain.linearRampToValueAtTime(0, now + 0.4);

    source.connect(bandpass);
    bandpass.connect(highpass);
    highpass.connect(gain);
    gain.connect(ctx.destination);

    source.start(now);
    source.stop(now + 0.4);
  } catch (e) {
    // 音频播放失败，静默处理
  }
}
