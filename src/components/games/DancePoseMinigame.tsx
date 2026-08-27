import React, { useState } from 'react';
import { Sparkles, CheckCircle2, Award, Play, RotateCcw } from 'lucide-react';

interface DancePose {
  id: string;
  name: string;
  coTuRole: 'Da’dá (Nữ)' | 'Tân’tung (Nam)' | 'Hòa tấu Chiêng';
  description: string;
  symbol: string;
}

const POSES: DancePose[] = [
  {
    id: 'p1',
    name: '1. Thế tay Da’dá (Dâng trời)',
    coTuRole: 'Da’dá (Nữ)',
    description: 'Hai cánh tay gập vuông góc ngang vai, bàn tay ngửa mở rộng hướng lên trời, mắt nhìn thẳng với nụ cười kín đáo.',
    symbol: '🙌',
  },
  {
    id: 'p2',
    name: '2. Bước chân Tân’tung (Hào khí)',
    coTuRole: 'Tân’tung (Nam)',
    description: 'Chân dậm nhịp 1-2 dứt khoát theo tiếng trống K’tu, thân hơi nghiêng về phía trước, tay cầm khiên hoặc vung mạnh mẽ.',
    symbol: '👣',
  },
  {
    id: 'p3',
    name: '3. Vòng tròn di chuyển (Tuần hoàn)',
    coTuRole: 'Da’dá (Nữ)',
    description: 'Toàn bộ đội hình bước đều nhịp ngược chiều kim đồng hồ quanh sân Gươl, tạo nên vòng xoáy đoàn kết.',
    symbol: '🔄',
  },
];

export const DancePoseMinigame: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [activePoseIdx, setActivePoseIdx] = useState(0);
  const [practiced, setPracticed] = useState<string[]>([]);
  const [isDancing, setIsDancing] = useState(false);

  const handleLearnPose = (poseId: string, idx: number) => {
    setActivePoseIdx(idx);
    if (!practiced.includes(poseId)) {
      const next = [...practiced, poseId];
      setPracticed(next);
      if (next.length === POSES.length) {
        onComplete();
      }
    }
  };

  const handleStartRhythm = () => {
    setIsDancing(true);
    let step = 0;
    const timer = setInterval(() => {
      setActivePoseIdx((prev) => (prev + 1) % POSES.length);
      step++;
      if (step > 6) {
        clearInterval(timer);
        setIsDancing(false);
      }
    }, 1200);
  };

  return (
    <div id="dance-minigame" className="bg-[#FAF8F5] rounded-2xl p-5 md:p-6 text-[#2F2F2F] border border-[#E3DCD2] shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#DDD5C7] mb-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#B35C44]">Tìm hiểu chuyển động</span>
          <h4 className="text-lg font-serif font-bold text-[#2F2F2F] mt-0.5">Vũ điệu Tân’tung Da’dá chuẩn xác</h4>
        </div>
        <button
          type="button"
          onClick={handleStartRhythm}
          disabled={isDancing}
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#B35C44] hover:bg-[#964732] text-white text-xs font-bold transition-all disabled:opacity-50 cursor-pointer shadow-xs"
        >
          <Play className="w-3.5 h-3.5 fill-current" />
          {isDancing ? 'Đang hợp nhịp...' : 'Xem chuỗi nhịp điệu'}
        </button>
      </div>

      <p className="text-xs text-[#555047] mb-4">
        Nhấp vào từng tư thế để tìm hiểu ý nghĩa biểu tượng trong di sản múa Tân’tung Da’dá của người Cơ Tu:
      </p>

      {/* Poses Selector */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">
        {POSES.map((pose, idx) => {
          const isSelected = activePoseIdx === idx;
          const isDone = practiced.includes(pose.id);
          return (
            <button
              key={pose.id}
              type="button"
              id={`btn-pose-${pose.id}`}
              onClick={() => handleLearnPose(pose.id, idx)}
              className={`p-4 rounded-xl border text-left transition-all flex flex-col justify-between cursor-pointer ${
                isSelected
                  ? 'bg-[#FAF2EB] border-[#B35C44] text-[#2F2F2F] ring-2 ring-[#B35C44]/30 scale-[1.02] shadow-sm'
                  : 'bg-white hover:bg-[#FAF8F5] border-[#DDD5C7] text-[#2F2F2F] shadow-2xs'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl">{pose.symbol}</span>
                <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-[#EAE4D9] text-[#7A4E38]">
                  {pose.coTuRole}
                </span>
              </div>
              <p className="text-xs font-bold leading-tight mb-1 text-[#2F2F2F]">{pose.name}</p>
              <div className="flex items-center justify-between text-[11px] text-[#736B60] mt-2">
                <span>{isDone ? '✓ Đã luyện' : 'Chạm để học'}</span>
                {isDone && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Pose Detail Display */}
      <div className="p-4 bg-[#F5F2ED] rounded-xl border border-[#DDD5C7] flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="w-14 h-14 rounded-2xl bg-[#EAE4D9] flex items-center justify-center text-3xl shrink-0 border border-[#D5CCBC]">
          {POSES[activePoseIdx].symbol}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h5 className="text-sm font-bold text-[#2F2F2F]">{POSES[activePoseIdx].name}</h5>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#FAF2EB] text-[#B35C44] border border-[#B35C44]/30 font-semibold">
              {POSES[activePoseIdx].coTuRole}
            </span>
          </div>
          <p className="text-xs text-[#555047] mt-1 leading-relaxed">
            {POSES[activePoseIdx].description}
          </p>
        </div>
      </div>

      {practiced.length === POSES.length && (
        <div className="mt-4 p-4 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-950 text-xs flex items-center gap-2">
          <Award className="w-4 h-4 text-[#B35C44] shrink-0" />
          <span>Bạn đã tìm hiểu trọn vẹn nét đẹp nghi lễ và vũ đạo Tân’tung Da’dá của người Cơ Tu!</span>
        </div>
      )}
    </div>
  );
};
