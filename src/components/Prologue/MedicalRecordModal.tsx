import { X } from 'lucide-react';

interface MedicalRecordModalProps {
  isVisible: boolean;
  onClose: () => void;
}

export default function MedicalRecordModal({ isVisible, onClose }: MedicalRecordModalProps) {
  if (!isVisible) return null;

  const handleStampClick = () => {
    alert('特别会诊印章 - 已申请专家会诊');
  };

  const handleDetailClick = () => {
    alert('正在跳转到病例详情页面...');
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      <div
        className="relative w-full max-w-2xl mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="animate-float-in"
          style={{
            animation: isVisible
              ? 'floatIn 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards'
              : 'none',
          }}
        >
          <button
            onClick={onClose}
            className="absolute -top-12 right-0 z-10 w-10 h-10 rounded-full bg-wall-dark/80 hover:bg-wall-mid flex items-center justify-center transition-colors"
          >
            <X className="w-6 h-6 text-wall-text" />
          </button>

          <div className="relative bg-wall-dark/95 rounded-lg overflow-hidden shadow-2xl border border-wall-light/20">
            <div className="relative">
              <img
                src="/medical-record.png"
                alt="病历单"
                className="w-full h-auto object-contain"
              />

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleStampClick();
                }}
                className="absolute bottom-[18%] right-[15%] w-[140px] h-[140px] cursor-pointer hover:opacity-80 transition-opacity"
                title="特别会诊印章"
                aria-label="特别会诊印章"
              >
                <div className="w-full h-full bg-transparent" />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDetailClick();
                }}
                className="absolute bottom-[5%] left-1/2 -translate-x-1/2 px-8 py-3 bg-wall-accent/80 hover:bg-wall-accent rounded-full cursor-pointer transition-all duration-300 hover:scale-105"
                title="点击查看病例详情"
                aria-label="点击查看病例详情"
              >
                <span className="text-wall-text font-medium text-sm tracking-wider">
                  点击查看病例详情
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes floatIn {
          0% {
            opacity: 0;
            transform: translateY(100px) rotate(5deg) scale(0.9);
          }
          60% {
            transform: translateY(-10px) rotate(-1deg) scale(1.02);
          }
          100% {
            opacity: 1;
            transform: translateY(0) rotate(0) scale(1);
          }
        }
      `}</style>
    </div>
  );
}
