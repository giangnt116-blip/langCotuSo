import React from 'react';
import { motion } from 'motion/react';
import { Compass, Sparkles, MapPin, CheckCircle2, Users, BookOpen, GraduationCap, FileText } from 'lucide-react';
import { IMAGE_ASSETS } from '../data/imageAssets';
import { CHARACTERS } from '../data/culturalData';
import { CulturalImage } from './CulturalImage';
import { FptSchoolLogo } from './FptSchoolLogo';
import { KienSangAvatar } from './KienSangAvatar';

interface HeroSectionProps {
  onStartJourney: () => void;
  onOpenNotebook: () => void;
  onOpenSummary: () => void;
  studentName: string;
  onChangeName: (name: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onStartJourney,
  onOpenNotebook,
  onOpenSummary,
  studentName,
  onChangeName,
}) => {
  return (
    <div id="hero-view" className="relative w-full overflow-hidden bg-[#F5F2ED] text-[#2F2F2F]">
      {/* Visual Canvas Hero Background & Interactive Overlays */}
      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 pt-6 pb-12 lg:py-10">
        
        {/* Project Authorship Banner - Lớp 9A2 Trường FPT Schools */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-6 p-3 sm:p-4 rounded-2xl bg-[#FAF8F5] border border-[#E3DCD2] shadow-xs flex flex-wrap items-center justify-between gap-3"
        >
          <div className="flex items-center gap-3">
            <FptSchoolLogo variant="compact" className="h-8 sm:h-9 w-auto shrink-0" />
            <div className="border-l border-[#DDD5C7] pl-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-black text-[#F37021] uppercase tracking-wide font-sans">
                  FPT SCHOOLS
                </span>
                <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-[#FAF2EB] text-[#B35C44] border border-[#B35C44]/30">
                  Lớp 9A2
                </span>
              </div>
              <p className="text-[11px] font-semibold text-[#0066B2] italic">
                “Trải nghiệm để trưởng thành”
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-[#555047] font-medium bg-[#EFECE6] px-3 py-1.5 rounded-xl border border-[#DDD5C7]">
            <GraduationCap className="w-4 h-4 text-[#B35C44] shrink-0" />
            <span>Sản phẩm số học tập sáng tạo & Di sản văn hóa</span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Title, Subtitle, Student Input & Primary CTA (Clean 45% space) */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-6 z-10 flex flex-col justify-center space-y-6"
          >
            {/* National Heritage Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EAE4D9] border border-[#D5CCBC] text-xs font-semibold text-[#7A4E38] w-fit shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#B35C44]" />
              <span>Không gian Giáo dục Di sản Văn hóa số</span>
            </div>

            {/* Main Headline */}
            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#2F2F2F] leading-[1.15] tracking-tight">
                LÀNG CƠ TU SỐ
              </h1>
              <h2 className="text-lg sm:text-xl font-serif text-[#B35C44] mt-2 font-semibold">
                Hành trình khám phá văn hóa đại ngàn Trường Sơn
              </h2>
            </div>

            {/* Descriptive Body */}
            <p className="text-sm sm:text-base text-[#555047] leading-relaxed max-w-xl">
              Cùng <strong>Chú Bh’ling Avel</strong>, bạn đồng hành <strong>Kiến Sáng</strong> và{' '}
              {studentName.trim() ? (
                <span>
                  bạn học sinh <strong>{studentName.trim()}</strong>
                </span>
              ) : (
                <span>
                  bạn học sinh khám phá <strong>Minh</strong>
                </span>
              )}{' '}
              bước qua 8 trạm trải nghiệm: từ kiến trúc Nhà Gươl, kỹ nghệ dệt zèng luồn cườm, vũ điệu Tân’tung Da’dá đến thanh âm cồng chiêng và nghệ thuật Nói lý – Hát lý độc đáo.
            </p>

            {/* Student Name Input & Onboarding Card */}
            <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#E3DCD2] shadow-sm space-y-3.5">
              <label htmlFor="student-name-input" className="block text-xs font-bold uppercase tracking-wider text-[#7A4E38]">
                Tên học sinh khám phá:
              </label>
              <div className="flex flex-col sm:flex-row gap-2.5">
                <input
                  id="student-name-input"
                  type="text"
                  value={studentName}
                  onChange={(e) => onChangeName(e.target.value)}
                  placeholder="Nhập họ và tên học sinh..."
                  className="flex-1 px-3.5 py-2.5 rounded-xl bg-white border border-[#D5CCBC] text-[#2F2F2F] text-sm focus:outline-none focus:border-[#B35C44] focus:ring-2 focus:ring-[#B35C44]/20 transition-all placeholder:text-[#9E9589]"
                />
                <button
                  type="button"
                  id="btn-start-hero-cta"
                  onClick={onStartJourney}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#B35C44] to-[#964732] hover:from-[#C5664E] hover:to-[#B35C44] text-white text-sm font-bold shadow-sm transition-all flex items-center justify-center gap-2 shrink-0 active:scale-95 cursor-pointer"
                >
                  <Compass className="w-4 h-4" />
                  BẮT ĐẦU HÀNH TRÌNH
                </button>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-1">
                <p className="text-[11px] text-[#736B60]">
                  * Nhập tên để in trang trọng lên Giấy chứng nhận <em>"Người bạn văn hóa Cơ Tu"</em>.
                </p>
                <button
                  type="button"
                  id="btn-open-summary-hero"
                  onClick={onOpenSummary}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#B35C44] hover:text-[#8C3F2B] underline decoration-[#B35C44]/40 hover:decoration-[#B35C44] cursor-pointer"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Xem cẩm nang tóm tắt 8 trạm</span>
                </button>
              </div>
            </div>

            {/* Quick Feature Stats */}
            <div className="grid grid-cols-3 gap-3 pt-2 border-t border-[#DDD5C7]">
              <button
                type="button"
                onClick={onOpenSummary}
                className="flex flex-col text-left group cursor-pointer hover:bg-white/60 p-2 rounded-xl transition-colors"
                title="Bấm để xem tóm tắt toàn bộ 8 trạm"
              >
                <span className="text-xl sm:text-2xl font-serif font-bold text-[#B35C44] group-hover:underline">
                  08 Trạm
                </span>
                <span className="text-[11px] text-[#736B60] font-medium flex items-center gap-1">
                  <span>Di sản trọng điểm</span>
                  <FileText className="w-3 h-3 text-[#B35C44]" />
                </span>
              </button>
              <div className="flex flex-col p-2">
                <span className="text-xl sm:text-2xl font-serif font-bold text-[#2D4232]">08 Dấu ấn</span>
                <span className="text-[11px] text-[#736B60] font-medium">Khắc gỗ số thu thập</span>
              </div>
              <div className="flex flex-col p-2">
                <span className="text-xl sm:text-2xl font-serif font-bold text-[#5A5A40]">04 Di sản</span>
                <span className="text-[11px] text-[#736B60] font-medium">Cấp Quốc gia</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Hero Visual Illustration (Mandated Y4-01) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-6 flex flex-col items-center"
          >
            <div className="w-full relative">
              <CulturalImage
                asset={IMAGE_ASSETS.hero}
                priority={true}
                className="w-full shadow-lg rounded-2xl overflow-hidden border border-[#E3DCD2] bg-white"
              />
            </div>
          </motion.div>
        </div>

        {/* Characters Overview Strip (Mandated by Y3) */}
        <div className="mt-12 pt-8 border-t border-[#DDD5C7]">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-[#B35C44]" />
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#2F2F2F]">
                Đồng hành cùng bạn trong hành trình (Bộ nhân vật văn hóa)
              </h3>
            </div>
            <button
              type="button"
              id="btn-open-notebook-link"
              onClick={onOpenNotebook}
              className="text-xs text-[#B35C44] hover:underline flex items-center gap-1 font-semibold"
            >
              <BookOpen className="w-3.5 h-3.5" />
              Xem Sổ Hành Trình
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3.5">
            {CHARACTERS.map((char) => {
              const currentName = studentName.trim();
              let displayName = char.name;
              let displayRole = char.role;
              let displayGreeting = char.greeting;
              let displayDesc = char.description;
              let isCurrentStudent = false;
              const isCompanion = char.id === 'companion_kiensang';

              if (char.id === 'student_minh') {
                isCurrentStudent = true;
                if (currentName) {
                  displayName = currentName;
                  displayRole = 'Học sinh khám phá';
                  displayGreeting = `Chào mọi người, mình là ${currentName}! Rất hào hứng cùng chú Avel, bạn Kiến Sáng và Già làng khám phá 8 trạm di sản Cơ Tu.`;
                  displayDesc = `Học sinh khám phá trực tiếp tham gia trải nghiệm và thu thập các dấu ấn di sản văn hóa.`;
                }
              } else if (char.id === 'companion_kiensang') {
                if (currentName) {
                  displayGreeting = `Chào bạn ${currentName}! Mình là Kiến Sáng, chúng mình cùng nhau khám phá trọn vẹn 8 trạm di sản Cơ Tu nhé!`;
                }
              } else if (char.id === 'guide' && currentName) {
                displayGreeting = `A rơơng cháu ${currentName}! Chú Bh’ling Avel rất vui được đồng hành cùng cháu và bạn Kiến Sáng qua 8 trạm di sản Trường Sơn hùng vĩ.`;
              } else if (char.id === 'artisan_elder' && currentName) {
                displayGreeting = `Chào cháu ${currentName} và bạn Kiến Sáng! Lời nói của người Cơ Tu phải đẹp như hoa rừng, êm như suối mát cháu nhé.`;
              }

              return (
                <div
                  key={char.id}
                  className={`p-4 rounded-xl border flex flex-col justify-between transition-all shadow-2xs ${
                    isCurrentStudent && currentName
                      ? 'bg-[#FAF2EB] border-[#B35C44]/40 shadow-xs'
                      : isCompanion
                      ? 'bg-[#FFFDF7] border-[#E8A838]/40 hover:border-[#E8A838] shadow-xs'
                      : 'bg-[#FAF8F5] border-[#E3DCD2] hover:border-[#B35C44]'
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-2.5 mb-2">
                      {isCompanion ? (
                        <KienSangAvatar size="sm" showBadge={false} />
                      ) : (
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs border ${
                            isCurrentStudent && currentName
                              ? 'bg-[#B35C44] text-white border-[#964732]'
                              : 'bg-[#EAE4D9] text-[#7A4E38] border-[#D5CCBC]'
                          }`}
                        >
                          {displayName[0]}
                        </div>
                      )}
                      <div>
                        <h4 className="text-xs font-bold text-[#2F2F2F] leading-tight">{displayName}</h4>
                        <span className={`text-[10px] font-semibold block ${isCompanion ? 'text-[#C77700]' : 'text-[#B35C44]'}`}>
                          {displayRole}
                        </span>
                      </div>
                    </div>
                    <p className="text-[11px] text-[#555047] leading-relaxed line-clamp-3">
                      {displayDesc}
                    </p>
                  </div>
                  <div className="mt-3 pt-2 border-t border-[#EFEAE2]">
                    <p className="text-[10px] italic text-[#736B60] line-clamp-2">
                      "{displayGreeting}"
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};
