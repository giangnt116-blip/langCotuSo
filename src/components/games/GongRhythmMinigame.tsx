import React, { useState, useRef, useEffect } from 'react';
import { Play, Square, Award, Volume2, Sparkles, Music } from 'lucide-react';

interface SoundItem {
  id: string;
  name: string;
  coTuName: string;
  type: 'gong' | 'drum' | 'wind';
  freq: number;
  decay: number;
  icon: string;
  keyLabel: string;
}

const INSTRUMENTS: SoundItem[] = [
  { id: 'drum_ktu', name: 'Trống K’tu (S’gơr)', coTuName: 'S’gơr', type: 'drum', freq: 110, decay: 0.4, icon: '🥁', keyLabel: '1' },
  { id: 'gong_father', name: 'Chiêng Cha (Có núm)', coTuName: 'Cheng', type: 'gong', freq: 220, decay: 1.5, icon: '🔔', keyLabel: '2' },
  { id: 'gong_mother', name: 'Chiêng Mẹ (Cồng phẳng)', coTuName: 'T’roong', type: 'gong', freq: 330, decay: 1.8, icon: '🔅', keyLabel: '3' },
  { id: 'wind_alal', name: 'Kèn Tre (Alal)', coTuName: 'Alal', type: 'wind', freq: 520, decay: 0.8, icon: '🎋', keyLabel: '4' },
];

export const GongRhythmMinigame: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [activeBeats, setActiveBeats] = useState<number>(0);
  const [isPlayingAuto, setIsPlayingAuto] = useState(false);
  const [strikeCount, setStrikeCount] = useState(0);
  const [lastPlayed, setLastPlayed] = useState<string | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const intervalRef = useRef<number | null>(null);

  const initAudio = () => {
    if (!audioCtxRef.current) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      audioCtxRef.current = new AudioCtx();
    }
    if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
  };

  const playSynthSound = (item: SoundItem) => {
    try {
      initAudio();
      const ctx = audioCtxRef.current;
      if (!ctx) return;

      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      if (item.type === 'drum') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(item.freq * 1.5, now);
        osc.frequency.exponentialRampToValueAtTime(45, now + 0.3);
        gain.gain.setValueAtTime(1.0, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
      } else if (item.type === 'gong') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(item.freq, now);
        // add subtle bell overtone
        gain.gain.setValueAtTime(0.8, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + item.decay);
      } else {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(item.freq, now);
        gain.gain.setValueAtTime(0.5, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + item.decay);
      }

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + item.decay + 0.1);

      setLastPlayed(item.id);
      setStrikeCount((prev) => {
        const next = prev + 1;
        if (next >= 12) {
          onComplete();
        }
        return next;
      });

      setTimeout(() => {
        setLastPlayed(null);
      }, 300);
    } catch {
      // audio context fallback
    }
  };

  const toggleAutoEnsemble = () => {
    if (isPlayingAuto) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      setIsPlayingAuto(false);
      return;
    }

    initAudio();
    setIsPlayingAuto(true);
    let step = 0;
    const rhythmPattern = [0, 1, 0, 2, 0, 1, 3, 2]; // index into INSTRUMENTS

    intervalRef.current = window.setInterval(() => {
      const instIndex = rhythmPattern[step % rhythmPattern.length];
      playSynthSound(INSTRUMENTS[instIndex]);
      setActiveBeats(step % rhythmPattern.length);
      step++;
    }, 450);
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <div id="gong-minigame" className="bg-[#FAF8F5] rounded-2xl p-5 md:p-6 text-[#2F2F2F] border border-[#E3DCD2] shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#DDD5C7] mb-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#B35C44]">Hòa tấu trực tiếp</span>
          <h4 className="text-lg font-serif font-bold text-[#2F2F2F] mt-0.5">Thanh âm Cồng chiêng & Trống K’tu</h4>
        </div>
        <button
          type="button"
          id="btn-toggle-auto-gong"
          onClick={toggleAutoEnsemble}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer ${
            isPlayingAuto
              ? 'bg-[#B35C44] hover:bg-[#964732] text-white animate-pulse'
              : 'bg-[#EFECE6] hover:bg-[#E3DCD2] text-[#2F2F2F] border border-[#DDD5C7]'
          }`}
        >
          {isPlayingAuto ? (
            <>
              <Square className="w-3.5 h-3.5 fill-current" /> Dừng hòa tấu tự động
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5 fill-current" /> Nghe nhịp điệu lễ hội mẫu
            </>
          )}
        </button>
      </div>

      <p className="text-sm text-[#555047] mb-4">
        Nhấp vào từng nhạc cụ bên dưới để cảm nhận âm sắc kim khí của chiêng và nhịp trầm hùng của trống K’tu:
      </p>

      {/* Instruments Pads */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
        {INSTRUMENTS.map((inst) => {
          const isHit = lastPlayed === inst.id;
          return (
            <button
              key={inst.id}
              type="button"
              id={`btn-inst-${inst.id}`}
              onClick={() => playSynthSound(inst)}
              className={`relative p-4 rounded-2xl flex flex-col items-center justify-center text-center transition-all transform active:scale-95 border cursor-pointer ${
                isHit
                  ? 'bg-[#FAF2EB] border-[#B35C44] text-[#B35C44] scale-105 shadow-md ring-2 ring-[#B35C44]/40'
                  : 'bg-white hover:bg-[#FAF8F5] border-[#DDD5C7] text-[#2F2F2F] shadow-2xs'
              }`}
            >
              <span className="text-3xl mb-2 filter drop-shadow-xs">{inst.icon}</span>
              <span className="text-xs font-bold leading-snug">{inst.name}</span>
              <span className="text-[11px] text-[#736B60] italic mt-0.5">{inst.coTuName}</span>
              <div className="mt-2 text-[10px] px-2 py-0.5 rounded-full bg-[#EAE4D9] text-[#7A4E38] font-medium">
                Chạm để gõ
              </div>
            </button>
          );
        })}
      </div>

      {/* Rhythm Track Indicator */}
      <div className="p-3.5 bg-[#F5F2ED] rounded-xl border border-[#DDD5C7] flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Volume2 className="w-4 h-4 text-[#B35C44]" />
          <span className="text-xs text-[#555047]">
            Số lượt gõ nhịp: <strong className="text-[#B35C44]">{strikeCount}</strong> / 12 nhịp
          </span>
        </div>
        <div className="flex gap-1.5">
          {[0, 1, 2, 3, 4, 5, 6, 7].map((b) => (
            <span
              key={`beat-${b}`}
              className={`w-2.5 h-2.5 rounded-full transition-all ${
                activeBeats === b && isPlayingAuto
                  ? 'bg-[#B35C44] scale-125 ring-2 ring-[#B35C44]/30'
                  : 'bg-[#D5CCBC]'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Achievement */}
      {strikeCount >= 12 && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-950 text-xs flex items-center gap-3">
          <Award className="w-5 h-5 text-[#B35C44] shrink-0" />
          <span>
            Tuyệt vời! Bạn đã hòa cùng nhịp chiêng đại ngàn và mở khóa thành công thử thách âm nhạc cộng đồng!
          </span>
        </div>
      )}
    </div>
  );
};
