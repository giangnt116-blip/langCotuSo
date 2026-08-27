import React from 'react';
import { BookOpen, Sparkles, MapPin, Award, MessageCircle, Volume2, VolumeX } from 'lucide-react';
import { UserProgress } from '../types';
import { FptSchoolLogo } from './FptSchoolLogo';

interface HeaderNavbarProps {
  progress: UserProgress;
  onOpenNotebook: () => void;
  onOpenTutor: () => void;
  onNavigateHome: () => void;
  onNavigateMap: () => void;
  onNavigateCertificate: () => void;
  currentView: 'home' | 'map' | 'station' | 'certificate';
}

export const HeaderNavbar: React.FC<HeaderNavbarProps> = ({
  progress,
  onOpenNotebook,
  onOpenTutor,
  onNavigateHome,
  onNavigateMap,
  onNavigateCertificate,
  currentView,
}) => {
  const completedCount = progress.completedStations.length;
  const isAllComplete = completedCount === 8;

  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/90 backdrop-blur-md border-b border-[#E3DCD2] text-[#2F2F2F] shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Brand / Logo */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            id="btn-nav-home"
            onClick={onNavigateHome}
            className="flex items-center gap-2.5 text-left group focus:outline-none cursor-pointer"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#B35C44] to-[#8C3F2B] flex items-center justify-center text-white shadow-xs border border-[#D58C77] group-hover:scale-105 transition-transform">
              <span className="font-serif font-bold text-base tracking-wider">CT</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-serif font-bold text-sm sm:text-base tracking-wide text-[#2F2F2F]">
                  LÀNG CƠ TU SỐ
                </span>
                <span className="hidden xl:inline-block text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded bg-[#EAE4D9] text-[#7A503A] border border-[#D5CCBC]">
                  Di sản Đại ngàn
                </span>
              </div>
              <p className="text-[10px] text-[#6B665E] hidden sm:block">
                Hành trình khám phá văn hóa Trường Sơn
              </p>
            </div>
          </button>

          {/* FPT Schools & Class 9A2 Affiliation Tag */}
          <div className="hidden sm:flex items-center gap-2 pl-3 border-l border-[#DDD5C7]">
            <FptSchoolLogo variant="compact" className="h-6 w-auto" />
            <div className="flex flex-col">
              <span className="text-[10px] font-extrabold text-[#F37021] leading-none uppercase tracking-tight font-sans">
                FPT SCHOOLS
              </span>
              <span className="text-[10px] font-bold text-[#0066B2] leading-none mt-0.5">
                Lớp 9A2
              </span>
            </div>
          </div>
        </div>

        {/* Center Nav Links */}
        <nav className="hidden lg:flex items-center gap-1 bg-[#EFECE6] p-1 rounded-xl border border-[#DDD5C7]">
          <button
            type="button"
            onClick={onNavigateHome}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              currentView === 'home'
                ? 'bg-[#B35C44] text-white shadow-xs'
                : 'text-[#5A5852] hover:text-[#2F2F2F] hover:bg-[#E2DDD3]'
            }`}
          >
            Trang chủ
          </button>
          <button
            type="button"
            id="btn-nav-map"
            onClick={onNavigateMap}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              currentView === 'map'
                ? 'bg-[#B35C44] text-white shadow-xs'
                : 'text-[#5A5852] hover:text-[#2F2F2F] hover:bg-[#E2DDD3]'
            }`}
          >
            <MapPin className="w-3.5 h-3.5" />
            Bản đồ 8 trạm
          </button>
          {isAllComplete && (
            <button
              type="button"
              id="btn-nav-cert"
              onClick={onNavigateCertificate}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                currentView === 'certificate'
                  ? 'bg-[#2D4232] text-white shadow-xs'
                  : 'text-[#2D4232] hover:bg-[#E2DDD3] font-bold'
              }`}
            >
              <Award className="w-3.5 h-3.5 text-amber-600" />
              Chứng nhận
            </button>
          )}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Progress Stamp Badge */}
          <button
            type="button"
            id="btn-open-notebook-badge"
            onClick={onOpenNotebook}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#FAF8F5] hover:bg-[#EFECE6] border border-[#DDD5C7] transition-all text-xs text-[#2F2F2F] shadow-xs"
            title="Mở Sổ Hành Trình"
          >
            <BookOpen className="w-4 h-4 text-[#B35C44]" />
            <div className="text-left hidden sm:block">
              <span className="text-[10px] text-[#6B665E] block leading-none">Dấu ấn thu thập</span>
              <strong className="text-xs font-bold text-[#B35C44]">
                {completedCount}/8 Trạm
              </strong>
            </div>
            <span className="sm:hidden font-bold text-[#B35C44] text-xs">{completedCount}/8</span>
          </button>

          {/* AI Cultural Tutor Button in Natural Forest Green */}
          <button
            type="button"
            id="btn-open-tutor"
            onClick={onOpenTutor}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-[#2D4232] to-[#3B5742] hover:from-[#354F3B] hover:to-[#46664F] text-white text-xs font-semibold shadow-xs transition-all border border-[#52745B]/40 active:scale-95"
          >
            <MessageCircle className="w-3.5 h-3.5 text-emerald-200" />
            <span className="hidden md:inline">Hỏi Già Làng AI</span>
            <span className="md:hidden">Hỏi AI</span>
          </button>
        </div>
      </div>
    </header>
  );
};
