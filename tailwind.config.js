/** @type {import('tailwindcss').Config} */

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        wall: {
          bg: '#0d1117',
          dark: '#1a1f2e',
          mid: '#252b3d',
          light: '#3a4157',
          text: '#e8e8e8',
          muted: '#8b95a7',
          accent: '#d4724a',
          accentGlow: 'rgba(212, 114, 74, 0.4)',
          patient: '#c94a4a',
          patientSoft: 'rgba(201, 74, 74, 0.15)',
          doctor: '#5a8fb8',
          doctorSoft: 'rgba(90, 143, 184, 0.15)',
          wallLine: 'rgba(255, 255, 255, 0.12)',
        }
      },
      fontFamily: {
        serif: ['"Noto Serif SC"', '"Source Han Serif CN"', 'Georgia', 'serif'],
        sans: ['"Noto Sans SC"', '"PingFang SC"', '"Microsoft YaHei"', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulseSlow 4s ease-in-out infinite',
        'pulse-faster': 'pulseFaster 2s ease-in-out infinite',
        'fade-in': 'fadeIn 2s ease-out forwards',
        'slide-in-left': 'slideInLeft 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'slide-in-right': 'slideInRight 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'bubble-pop': 'bubblePop 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
        'wall-reveal': 'wallReveal 1.5s ease-out forwards',
        'keyword-reveal': 'keywordReveal 1.5s ease-out forwards',
        'button-rise': 'buttonRise 1s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'flicker': 'flicker 3s ease-in-out infinite',
        'breath': 'breath 6s ease-in-out infinite',
        'float': 'float 5s ease-in-out infinite',
      },
      keyframes: {
        pulseSlow: {
          '0%, 100%': { opacity: '0.3', transform: 'scale(1)' },
          '50%': { opacity: '0.7', transform: 'scale(1.05)' },
        },
        pulseFaster: {
          '0%, 100%': { opacity: '0.6', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.03)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-60px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(60px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        bubblePop: {
          '0%': { opacity: '0', transform: 'translateX(40px) scale(0.85)' },
          '60%': { transform: 'translateX(-4px) scale(1.02)' },
          '100%': { opacity: '1', transform: 'translateX(0) scale(1)' },
        },
        wallReveal: {
          '0%': { opacity: '0', transform: 'scaleY(0)' },
          '100%': { opacity: '1', transform: 'scaleY(1)' },
        },
        keywordReveal: {
          '0%': { opacity: '0', transform: 'translateY(20px) scale(0.9)', filter: 'blur(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)', filter: 'blur(0)' },
        },
        buttonRise: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        flicker: {
          '0%, 100%': { opacity: '1' },
          '45%': { opacity: '1' },
          '50%': { opacity: '0.6' },
          '55%': { opacity: '1' },
          '70%': { opacity: '0.85' },
          '75%': { opacity: '1' },
        },
        breath: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.7' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
};
