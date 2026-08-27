import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, RotateCcw, Sparkles, Award } from 'lucide-react';

interface WeavingStep {
  id: string;
  order: number;
  title: string;
  desc: string;
  icon: string;
}

const WEAVING_STEPS: WeavingStep[] = [
  {
    id: 's1',
    order: 1,
    title: '1. Kéo sợi & Nhuộm chàm tự nhiên',
    desc: 'Bông rừng cán tơi, se sợi và ngâm ủ trong nước lá chàm rừng cùng tro bếp để tạo màu đen chàm sâu thẳm.',
    icon: '🌿',
  },
  {
    id: 's2',
    order: 2,
    title: '2. Lên khung cửi buộc lưng (Back-strap)',
    desc: 'Mắc sợi dọc lên bộ khung dệt lưng, thắt đai giữ vòng qua eo để tạo lực căng chuẩn xác bằng nhịp thở.',
    icon: '🪵',
  },
  {
    id: 's3',
    order: 3,
    title: '3. Luồn chuỗi hạt cườm trắng',
    desc: 'Đếm và luồn từng hạt cườm trắng vào các sợi chỉ dọc theo đúng sơ đồ hình học (quả trám, bước chân chim).',
    icon: '⚪',
  },
  {
    id: 's4',
    order: 4,
    title: '4. Đập thoi và dệt khóa hoa văn',
    desc: 'Dùng thanh gỗ dẹt chuốt bóng đập chặt sợi ngang, khóa chặt các hạt cườm nổi trên nền vải zèng bền chắc.',
    icon: '✨',
  },
];

export const WeavingMinigame: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  // Shuffle steps initially
  const [shuffledSteps, setShuffledSteps] = useState<WeavingStep[]>(() =>
    [...WEAVING_STEPS].sort(() => Math.random() - 0.5)
  );
  const [selectedSequence, setSelectedSequence] = useState<WeavingStep[]>([]);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSelectStep = (step: WeavingStep) => {
    if (selectedSequence.some((s) => s.id === step.id)) return;
    const nextSeq = [...selectedSequence, step];
    setSelectedSequence(nextSeq);
    setErrorMessage(null);

    if (nextSeq.length === WEAVING_STEPS.length) {
      const isCorrect = nextSeq.every((s, idx) => s.order === idx + 1);
      if (isCorrect) {
        setIsSuccess(true);
        onComplete();
      } else {
        setErrorMessage('Thứ tự các bước dệt chưa chính xác. Bạn hãy bấm Thử lại để sắp xếp đúng quy trình nhé!');
      }
    }
  };

  const handleReset = () => {
    setSelectedSequence([]);
    setIsSuccess(false);
    setErrorMessage(null);
    setShuffledSteps([...WEAVING_STEPS].sort(() => Math.random() - 0.5));
  };

  return (
    <div id="weaving-minigame" className="bg-[#FAF8F5] rounded-2xl p-5 md:p-6 text-[#2F2F2F] border border-[#E3DCD2] shadow-sm">
      <div className="flex items-center justify-between pb-3 border-b border-[#DDD5C7] mb-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#B35C44]">Thử thách tương tác</span>
          <h4 className="text-lg font-serif font-bold text-[#2F2F2F] mt-0.5">Quy trình dệt Zèng cườm Cơ Tu</h4>
        </div>
        <button
          type="button"
          onClick={handleReset}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl bg-[#EFECE6] hover:bg-[#E3DCD2] text-[#2F2F2F] transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Làm lại
        </button>
      </div>

      <p className="text-sm text-[#555047] mb-4">
        Hãy nhấp chọn 4 bước dưới đây theo đúng trình tự từ đầu đến khi hoàn thành một tấm thổ cẩm Zèng:
      </p>

      {/* Selected Sequence Slots */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {[0, 1, 2, 3].map((slotIdx) => {
          const step = selectedSequence[slotIdx];
          return (
            <div
              key={`slot-${slotIdx}`}
              className={`min-h-[100px] p-3.5 rounded-xl border-2 border-dashed flex flex-col justify-between transition-all ${
                step
                  ? isSuccess
                    ? 'border-emerald-500 bg-emerald-50 text-emerald-950 font-medium'
                    : 'border-[#B35C44] bg-[#FAF2EB] text-[#2F2F2F]'
                  : 'border-[#D5CCBC] bg-[#F5F2ED] text-[#8C8478]'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#736B60]">
                  Bước {slotIdx + 1}
                </span>
                {step && <span className="text-base">{step.icon}</span>}
              </div>
              {step ? (
                <div className="mt-1">
                  <p className="text-xs font-bold leading-snug">{step.title}</p>
                </div>
              ) : (
                <p className="text-xs italic text-center py-3">Chọn bước tiếp theo...</p>
              )}
            </div>
          );
        })}
      </div>

      {/* Error Notice */}
      {errorMessage && (
        <div className="p-3 mb-4 rounded-xl bg-red-50 border border-red-300 text-red-950 text-xs flex items-center justify-between">
          <span>{errorMessage}</span>
          <button
            type="button"
            onClick={handleReset}
            className="px-2.5 py-1 bg-red-700 text-white rounded-lg font-medium ml-2 cursor-pointer shadow-2xs"
          >
            Thử lại
          </button>
        </div>
      )}

      {/* Available Cards to Pick */}
      {!isSuccess && selectedSequence.length < WEAVING_STEPS.length && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {shuffledSteps.map((step) => {
            const isPicked = selectedSequence.some((s) => s.id === step.id);
            return (
              <button
                key={step.id}
                type="button"
                id={`btn-step-${step.id}`}
                disabled={isPicked}
                onClick={() => handleSelectStep(step)}
                className={`p-3.5 text-left rounded-xl transition-all flex items-start gap-3 border ${
                  isPicked
                    ? 'opacity-40 bg-[#F5F2ED] border-[#DDD5C7] cursor-not-allowed'
                    : 'bg-white hover:bg-[#FAF8F5] border-[#DDD5C7] text-[#2F2F2F] hover:border-[#B35C44] shadow-2xs cursor-pointer'
                }`}
              >
                <span className="text-2xl mt-0.5">{step.icon}</span>
                <div>
                  <p className="text-xs font-bold text-[#2F2F2F]">{step.title}</p>
                  <p className="text-[11px] text-[#555047] mt-0.5 leading-relaxed">{step.desc}</p>
                </div>
              </button>
            );
          })}
        </div>
      )}

      {/* Success View */}
      <AnimatePresence>
        {isSuccess && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-4 rounded-2xl bg-emerald-50 border border-emerald-300 text-center"
          >
            <div className="inline-flex p-2.5 rounded-full bg-emerald-100 text-emerald-800 mb-2">
              <Award className="w-6 h-6 text-[#B35C44]" />
            </div>
            <h5 className="text-base font-bold text-emerald-950">Xuất sắc! Bạn đã thông thạo kỹ nghệ dệt Zèng</h5>
            <p className="text-xs text-emerald-900 mt-1 max-w-lg mx-auto">
              Nghệ nhân ALăng Thị Pơr rất khen ngợi sự tập trung của bạn. Từng sợi chỉ và hạt cườm được sắp xếp chính xác như cách người phụ nữ Cơ Tu bảo tồn di sản!
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
