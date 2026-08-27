import React, { useState } from 'react';
import { MessageSquare, Award, CheckCircle2, AlertCircle, RotateCcw } from 'lucide-react';

interface Scenario {
  id: string;
  context: string;
  question: string;
  options: {
    text: string;
    isWise: boolean;
    feedback: string;
  }[];
}

const SCENARIOS: Scenario[] = [
  {
    id: 'sc1',
    context: 'Tình huống 1: Hai hộ dân nương rẫy có sự bất đồng về mốc ranh giới cây rừng sau mùa giông bão.',
    question: 'Theo truyền thống Nói lý – Hát lý (Bh’nooch), Già làng nên mở lời bằng câu ca đối đáp nào để giữ hòa khí buôn làng?',
    options: [
      {
        text: '“Cây lim ngã thì mầm lim mọc / Con suối quanh co nhưng nước chảy cùng dòng / Anh em một làng chớ để cỏ dại mọc ngăn bước chân”.',
        isWise: true,
        feedback: 'Chính xác! Lời nói ẩn dụ mượn hình ảnh rừng lim và dòng suối khuyên nhủ tinh thần nhường nhịn, hòa giải ruột thịt.',
      },
      {
        text: '“Ai nhanh chân rào trước thì đất ấy thuộc về người đó, không cần bàn cãi thêm”.',
        isWise: false,
        feedback: 'Chưa đúng tinh thần Bh’nooch. Nói lý không dùng sự áp đặt mà dùng lý lẽ thấu tình đạt lý để cả hai cùng vui vẻ.',
      },
    ],
  },
  {
    id: 'sc2',
    context: 'Tình huống 2: Người thanh niên trẻ trong làng muốn chặt một cây pơ-mu cổ thụ to ở đầu nguồn suối để lấy gỗ.',
    question: 'Già làng dùng câu Nói lý nào để giáo dục thanh niên hiểu giá trị thiêng liêng của rừng đầu nguồn?',
    options: [
      {
        text: '“Cây to giữ nước nuôi con tôm con cá / Rừng ngàn đổ bóng che buôn làng bình yên / Chặt một cây lớn là làm cạn dòng sữa của mẹ Trường Sơn”.',
        isWise: true,
        feedback: 'Rất sâu sắc! Mượn hình ảnh dòng sữa mẹ Trường Sơn để người trẻ thấu hiểu tri thức bản địa bảo vệ thiên nhiên.',
      },
      {
        text: '“Gỗ to bán được nhiều tiền, cứ chặt nhanh kẻo người làng khác lấy mất”.',
        isWise: false,
        feedback: 'Hoàn toàn sai với luật tục Cơ Tu. Rừng đầu nguồn là vùng thiêng được buôn làng đồng lòng bảo vệ qua bao đời.',
      },
    ],
  },
];

export const SpeakingSingingMinigame: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [completedCount, setCompletedCount] = useState(0);

  const scenario = SCENARIOS[currentIdx];

  const handleSelect = (idx: number) => {
    setSelectedOption(idx);
    if (scenario.options[idx].isWise) {
      if (completedCount + 1 >= SCENARIOS.length) {
        onComplete();
      }
      setCompletedCount((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    setSelectedOption(null);
    if (currentIdx + 1 < SCENARIOS.length) {
      setCurrentIdx((prev) => prev + 1);
    }
  };

  const handleReset = () => {
    setCurrentIdx(0);
    setSelectedOption(null);
    setCompletedCount(0);
  };

  return (
    <div id="speaking-minigame" className="bg-[#FAF8F5] rounded-2xl p-5 md:p-6 text-[#2F2F2F] border border-[#E3DCD2] shadow-sm">
      <div className="flex items-center justify-between pb-3 border-b border-[#DDD5C7] mb-4">
        <div className="flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-[#B35C44]" />
          <h4 className="text-base font-serif font-bold text-[#2F2F2F]">Thực hành Ứng tác Nói lý – Hát lý</h4>
        </div>
        <span className="text-xs font-bold px-3 py-1 rounded-lg bg-[#EAE4D9] text-[#7A4E38] border border-[#D5CCBC]">
          Tình huống {currentIdx + 1}/{SCENARIOS.length}
        </span>
      </div>

      <div className="p-4 bg-[#F5F2ED] rounded-xl border border-[#DDD5C7] mb-4">
        <p className="text-xs font-bold text-[#B35C44]">{scenario.context}</p>
        <p className="text-sm font-semibold text-[#2F2F2F] mt-1.5">{scenario.question}</p>
      </div>

      <div className="space-y-3 mb-5">
        {scenario.options.map((opt, idx) => {
          const isSelected = selectedOption === idx;
          let btnStyle = 'bg-white hover:bg-[#FAF8F5] border-[#DDD5C7] text-[#2F2F2F] shadow-2xs';
          if (isSelected) {
            btnStyle = opt.isWise
              ? 'bg-emerald-50 border-emerald-500 text-emerald-950 ring-2 ring-emerald-500/20 font-medium'
              : 'bg-red-50 border-red-400 text-red-950 ring-2 ring-red-500/20';
          }

          return (
            <button
              key={`opt-${idx}`}
              type="button"
              id={`btn-speech-opt-${idx}`}
              disabled={selectedOption !== null}
              onClick={() => handleSelect(idx)}
              className={`w-full text-left p-4 rounded-xl border transition-all text-xs sm:text-sm leading-relaxed cursor-pointer ${btnStyle}`}
            >
              <div className="flex items-start gap-3">
                <span className="shrink-0 w-6 h-6 rounded-full bg-[#EAE4D9] text-[#7A4E38] flex items-center justify-center text-xs font-bold mt-0.5">
                  {idx === 0 ? 'A' : 'B'}
                </span>
                <div className="flex-1">
                  <p className="font-serif italic font-medium">{opt.text}</p>
                  {isSelected && (
                    <div className="mt-2.5 pt-2.5 border-t border-black/10 flex items-start gap-2">
                      {opt.isWise ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      ) : (
                        <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                      )}
                      <p className={`text-xs ${opt.isWise ? 'text-emerald-900' : 'text-red-900'}`}>
                        {opt.feedback}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {selectedOption !== null && (
        <div className="flex items-center justify-between pt-3 border-t border-[#DDD5C7]">
          <button
            type="button"
            onClick={handleReset}
            className="text-xs font-semibold text-[#736B60] hover:text-[#2F2F2F] flex items-center gap-1 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Làm lại
          </button>
          {currentIdx + 1 < SCENARIOS.length ? (
            <button
              type="button"
              id="btn-next-scenario"
              onClick={handleNext}
              className="px-4 py-2 bg-[#B35C44] hover:bg-[#964732] text-white rounded-xl text-xs font-bold transition-colors cursor-pointer shadow-xs"
            >
              Sang tình huống tiếp theo →
            </button>
          ) : (
            <div className="flex items-center gap-2 text-xs font-bold text-[#2D4232]">
              <Award className="w-4 h-4 text-[#B35C44]" />
              Đã hoàn thành xuất sắc thử thách Nói lý – Hát lý!
            </div>
          )}
        </div>
      )}
    </div>
  );
};
