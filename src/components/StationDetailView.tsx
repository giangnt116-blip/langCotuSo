import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Station, StationId, UserProgress } from '../types';
import { STATIONS_DATA } from '../data/culturalData';
import { IMAGE_ASSETS } from '../data/imageAssets';
import { CulturalImage } from './CulturalImage';
import { WeavingMinigame } from './games/WeavingMinigame';
import { GongRhythmMinigame } from './games/GongRhythmMinigame';
import { SpeakingSingingMinigame } from './games/SpeakingSingingMinigame';
import { DancePoseMinigame } from './games/DancePoseMinigame';
import { HeritageKnowledgeGallery } from './HeritageKnowledgeGallery';
import { formatDialogueItem } from '../utils/dialogueFormatter';
import { KienSangAvatar } from './KienSangAvatar';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  HelpCircle,
  Award,
  Sparkles,
  BookOpen,
  Info,
  ExternalLink,
  MessageSquare,
  Volume2,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { StationCertificateModal } from './StationCertificateModal';

interface StationDetailViewProps {
  stationId: StationId;
  progress: UserProgress;
  onBackToMap: () => void;
  onNavigateStation: (nextId: StationId) => void;
  onCompleteStation: (stationId: StationId) => void;
  onSaveNote: (stationId: StationId, note: string) => void;
  onNavigateCertificate?: () => void;
}

export const StationDetailView: React.FC<StationDetailViewProps> = ({
  stationId,
  progress,
  onBackToMap,
  onNavigateStation,
  onCompleteStation,
  onSaveNote,
  onNavigateCertificate,
}) => {
  const station = STATIONS_DATA.find((s) => s.id === stationId) || STATIONS_DATA[0];
  const stationAsset = IMAGE_ASSETS[station.imageId] || IMAGE_ASSETS.stationGuol;
  const isCompleted = progress.completedStations.includes(station.id);

  // Certificate Modal state
  const [isCertModalOpen, setIsCertModalOpen] = useState(false);

  // Active Tab
  const [activeTab, setActiveTab] = useState<'content' | 'activity' | 'quiz' | 'notes'>('content');

  // Quiz state
  const [currentQuizIdx, setCurrentQuizIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [quizFinished, setQuizFinished] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  // Hotspot selection
  const [selectedHotspot, setSelectedHotspot] = useState<string | null>(null);

  // Mini-game completed state
  const [minigameDone, setMinigameDone] = useState(false);

  // Student note input
  const existingNote = progress.notebookNotes.find((n) => n.stationId === station.id)?.note || '';
  const [userNote, setUserNote] = useState(existingNote);
  const [noteSaved, setNoteSaved] = useState(false);

  // Station navigation index
  const currentIndex = STATIONS_DATA.findIndex((s) => s.id === station.id);
  const prevStation = STATIONS_DATA[currentIndex - 1];
  const nextStation = STATIONS_DATA[currentIndex + 1];

  const handleSelectOption = (questionId: string, optionIdx: number) => {
    if (selectedAnswers[questionId] !== undefined) return;
    setSelectedAnswers((prev) => ({ ...prev, [questionId]: optionIdx }));
    setShowExplanation(true);
  };

  const handleNextQuestion = () => {
    setShowExplanation(false);
    if (currentQuizIdx + 1 < station.quiz.length) {
      setCurrentQuizIdx((prev) => prev + 1);
    } else {
      setQuizFinished(true);
      // Check if passed quiz and award stamp
      handleAwardStamp();
    }
  };

  const handleAwardStamp = () => {
    onCompleteStation(station.id);
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#B85D38', '#E2A76F', '#2D6A4F', '#D4AF37'],
      });
    } catch {
      // confetti fallback
    }
  };

  const handleSaveStudentNote = () => {
    if (userNote.trim()) {
      onSaveNote(station.id, userNote);
      setNoteSaved(true);
      setTimeout(() => setNoteSaved(false), 2000);
    }
  };

  return (
    <div id={`station-detail-${station.id}`} className="w-full bg-[#F5F2ED] text-[#2F2F2F] min-h-[calc(100vh-4rem)] py-6 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Navigation Breadcrumb & Back Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 bg-[#FAF8F5] p-3.5 rounded-2xl border border-[#E3DCD2] shadow-xs">
          <button
            type="button"
            id="btn-back-to-map"
            onClick={onBackToMap}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#EFECE6] hover:bg-[#E3DCD2] text-[#2F2F2F] text-xs font-semibold transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Về Bản đồ 8 trạm
          </button>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold px-3 py-1 rounded-lg bg-[#EAE4D9] text-[#7A4E38] border border-[#D5CCBC]">
              Trạm 0{station.order} / 08
            </span>
            {isCompleted && (
              <>
                <span className="inline-flex items-center gap-1 text-xs font-bold text-[#2D4232] bg-emerald-100 px-3 py-1 rounded-full border border-emerald-300">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Đã nhận Dấu ấn
                </span>
                <button
                  type="button"
                  id="btn-view-station-cert-header"
                  onClick={() => setIsCertModalOpen(true)}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-[#B35C44] hover:bg-[#964732] px-3 py-1 rounded-full shadow-xs transition-colors cursor-pointer"
                >
                  <Award className="w-3.5 h-3.5" /> Giấy chứng nhận trạm
                </button>
              </>
            )}
          </div>
        </div>

        {/* Station Hero Heading & Overview Card */}
        <div className="bg-[#FAF8F5] p-5 sm:p-6 rounded-2xl border border-[#E3DCD2] shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            
            {/* Left Info */}
            <div className="lg:col-span-6 space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#B35C44]">
                {station.category}
              </span>
              <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#2F2F2F] leading-tight">
                {station.title}
              </h1>
              {station.coTuTitle && (
                <p className="text-xs font-serif italic text-[#7A4E38] font-medium">
                  Tên tiếng Cơ Tu: {station.coTuTitle}
                </p>
              )}
              <p className="text-sm text-[#555047] leading-relaxed">
                {station.summary}
              </p>

              <div className="p-3.5 bg-[#EFECE6] rounded-xl border border-[#DDD5C7] text-xs text-[#555047] space-y-1.5">
                <p>
                  <strong className="text-[#B35C44]">Ý nghĩa văn hóa:</strong> {station.culturalSignificance}
                </p>
                <p className="text-[11px] text-[#736B60] pt-1.5 border-t border-[#DDD5C7]">
                  <strong>Gắn kết môn học:</strong> {station.curriculumTieIn}
                </p>
              </div>
            </div>

            {/* Right: Main Station Artwork (Y4) */}
            <div className="lg:col-span-6 relative">
              <div className="relative rounded-2xl overflow-hidden border border-[#E3DCD2] shadow-md bg-white">
                <CulturalImage
                  asset={stationAsset}
                  priority={true}
                  className="w-full"
                />

                {/* Optional Hotspots Over Main Image */}
                {station.hotspots && station.hotspots.length > 0 && (
                  <div className="absolute inset-0 pointer-events-none p-3">
                    {station.hotspots.map((hs) => (
                      <button
                        key={hs.id}
                        type="button"
                        id={`btn-hotspot-${hs.id}`}
                        onClick={() => setSelectedHotspot(selectedHotspot === hs.id ? null : hs.id)}
                        style={{ left: `${hs.x}%`, top: `${hs.y}%` }}
                        className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-auto p-1.5 rounded-full bg-[#B35C44] text-white hover:bg-[#964732] hover:scale-125 transition-all shadow-md ring-4 ring-[#B35C44]/30"
                        title={hs.title}
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Selected Hotspot Box */}
              {selectedHotspot && (
                <div className="mt-2.5 p-3.5 rounded-xl bg-[#FAF8F5] border border-[#B35C44] text-xs shadow-md animate-in fade-in">
                  {(() => {
                    const hs = station.hotspots?.find((h) => h.id === selectedHotspot);
                    if (!hs) return null;
                    return (
                      <div>
                        <div className="flex items-center justify-between font-bold text-[#B35C44]">
                          <span>🔍 Điểm nhấn: {hs.title}</span>
                          <button
                            type="button"
                            onClick={() => setSelectedHotspot(null)}
                            className="text-[#736B60] hover:text-[#2F2F2F]"
                          >
                            ✕
                          </button>
                        </div>
                        <p className="text-[#555047] mt-1">{hs.description}</p>
                      </div>
                    );
                  })()}
                </div>
              )}
            </div>

          </div>
        </div>

        {/* Tab Navigation Controls */}
        <div className="flex items-center gap-2 border-b border-[#DDD5C7] pb-2 overflow-x-auto">
          <button
            type="button"
            id="tab-content"
            onClick={() => setActiveTab('content')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all shrink-0 flex items-center gap-1.5 ${
              activeTab === 'content'
                ? 'bg-[#B35C44] text-white shadow-xs'
                : 'text-[#5A5852] hover:bg-[#EAE4D9]'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            Kiến thức di sản
          </button>

          {station.miniGameType && (
            <button
              type="button"
              id="tab-activity"
              onClick={() => setActiveTab('activity')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all shrink-0 flex items-center gap-1.5 ${
                activeTab === 'activity'
                  ? 'bg-[#B35C44] text-white shadow-xs'
                  : 'text-[#5A5852] hover:bg-[#EAE4D9]'
              }`}
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              Hoạt động tương tác
            </button>
          )}

          <button
            type="button"
            id="tab-quiz"
            onClick={() => setActiveTab('quiz')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all shrink-0 flex items-center gap-1.5 ${
              activeTab === 'quiz'
                ? 'bg-[#B35C44] text-white shadow-xs'
                : 'text-[#5A5852] hover:bg-[#EAE4D9]'
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            Câu hỏi thử thách & Nhận Dấu ấn
          </button>

          <button
            type="button"
            id="tab-notes"
            onClick={() => setActiveTab('notes')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all shrink-0 flex items-center gap-1.5 ${
              activeTab === 'notes'
                ? 'bg-[#B35C44] text-white shadow-xs'
                : 'text-[#5A5852] hover:bg-[#EAE4D9]'
            }`}
          >
            <Info className="w-4 h-4" />
            Ghi chép thu hoạch
          </button>
        </div>

        {/* Tab 1: Knowledge & Character Dialogue */}
        {activeTab === 'content' && (
          <div className="space-y-6">
            {/* Dialogue Conversation between Characters (Y3) */}
            <div className="bg-[#FAF8F5] p-5 rounded-2xl border border-[#E3DCD2] shadow-xs space-y-3">
              <div className="flex items-center gap-2 mb-2">
                <MessageSquare className="w-4 h-4 text-[#B35C44]" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#7A4E38]">
                  Đối thoại cùng Người dẫn đường & Các bạn học sinh
                </h3>
              </div>

              <div className="space-y-3">
                {station.storyDialogue.map((dialogue, idx) => {
                  const formatted = formatDialogueItem(dialogue, progress.studentName);
                  return (
                    <div
                      key={`dial-${idx}`}
                      className={`p-4 rounded-xl border flex items-start gap-3 transition-colors ${
                        formatted.isStudent
                          ? 'bg-[#FAF2EB] border-[#B35C44]/30 shadow-2xs'
                          : formatted.isCompanion
                          ? 'bg-[#FFF9F0] border-[#E8A838]/40 shadow-2xs'
                          : 'bg-[#F5F2ED] border-[#DDD5C7]'
                      }`}
                    >
                      {formatted.isCompanion ? (
                        <KienSangAvatar size="sm" showBadge={false} />
                      ) : (
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shrink-0 border ${
                            formatted.isStudent
                              ? 'bg-[#B35C44] text-white border-[#964732]'
                              : 'bg-[#EAE4D9] text-[#7A4E38] border-[#D5CCBC]'
                          }`}
                        >
                          {formatted.avatar || formatted.speaker[0]}
                        </div>
                      )}
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-[#2F2F2F]">{formatted.speaker}</span>
                          <span
                            className={`text-[10px] px-2 py-0.5 rounded-full ${
                              formatted.isStudent
                                ? 'bg-[#FAF8F5] text-[#B35C44] font-bold border border-[#B35C44]/20'
                                : formatted.isCompanion
                                ? 'bg-[#FFF3D6] text-[#A66300] font-bold border border-[#E8A838]/30'
                                : 'bg-[#EAE4D9] text-[#7A4E38]'
                            }`}
                          >
                            {formatted.role}
                          </span>
                        </div>
                        <p className="text-xs sm:text-sm text-[#555047] mt-1 leading-relaxed">
                          "{formatted.text}"
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Visual Knowledge Diagrams & Heritage Illustrations for this Station */}
            <HeritageKnowledgeGallery stationId={station.id} />

            {/* Detailed Sections */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {station.detailedSections.map((sec, idx) => (
                <div
                  key={`sec-${idx}`}
                  className="bg-[#FAF8F5] p-5 rounded-2xl border border-[#E3DCD2] shadow-xs space-y-2.5"
                >
                  <h4 className="text-sm sm:text-base font-serif font-bold text-[#B35C44]">
                    {sec.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-[#555047] leading-relaxed">
                    {sec.content}
                  </p>
                  {sec.bulletPoints && (
                    <ul className="space-y-1.5 mt-2 pt-2 border-t border-[#EFECE6]">
                      {sec.bulletPoints.map((bp, bIdx) => (
                        <li key={`bp-${bIdx}`} className="text-xs text-[#6B665E] flex items-start gap-2">
                          <span className="text-[#B35C44] shrink-0">•</span>
                          <span>{bp}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>

            {/* Official References */}
            <div className="p-4 bg-[#FAF8F5] rounded-2xl border border-[#E3DCD2] flex flex-wrap items-center justify-between gap-3 text-xs">
              <span className="text-[#736B60] font-medium">Nguồn tư liệu tham chiếu chính thức:</span>
              <div className="flex flex-wrap gap-2">
                {station.sources.map((src, idx) => (
                  <a
                    key={`src-${idx}`}
                    href={src.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-[#EFECE6] hover:bg-[#E3DCD2] text-[#B35C44] font-medium hover:underline"
                  >
                    <span>{src.title}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Interactive Activity */}
        {activeTab === 'activity' && (
          <div className="space-y-4">
            {station.id === 'weaving' && (
              <WeavingMinigame onComplete={() => setMinigameDone(true)} />
            )}
            {station.id === 'music' && (
              <GongRhythmMinigame onComplete={() => setMinigameDone(true)} />
            )}
            {station.id === 'speaking' && (
              <SpeakingSingingMinigame onComplete={() => setMinigameDone(true)} />
            )}
            {station.id === 'dance' && (
              <DancePoseMinigame onComplete={() => setMinigameDone(true)} />
            )}
          </div>
        )}

        {/* Tab 3: Cultural Quiz & Stamp Awarding */}
        {activeTab === 'quiz' && (
          <div className="bg-[#FAF8F5] p-5 sm:p-6 rounded-2xl border border-[#E3DCD2] shadow-sm space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-[#DDD5C7]">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#B35C44]">
                  Củng cố tri thức THCS
                </span>
                <h3 className="text-lg font-serif font-bold text-[#2F2F2F] mt-0.5">
                  Thử thách nhận Dấu ấn {station.stampName}
                </h3>
              </div>
              <span className="text-xs font-semibold px-3 py-1 rounded-lg bg-[#EAE4D9] text-[#7A4E38] border border-[#D5CCBC]">
                Câu {currentQuizIdx + 1} / {station.quiz.length}
              </span>
            </div>

            {/* Quiz Question Card */}
            {(() => {
              const q = station.quiz[currentQuizIdx];
              const selectedIdx = selectedAnswers[q.id];
              const isAnswered = selectedIdx !== undefined;
              const isCorrect = isAnswered && selectedIdx === q.correctIndex;

              return (
                <div className="space-y-4">
                  <p className="text-base font-semibold text-[#2F2F2F] leading-relaxed">
                    {q.question}
                  </p>

                  <div className="space-y-2.5">
                    {q.options.map((opt, oIdx) => {
                      let btnClass = 'bg-white hover:bg-[#F5F2ED] border-[#DDD5C7] text-[#2F2F2F]';
                      if (isAnswered) {
                        if (oIdx === q.correctIndex) {
                          btnClass = 'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold ring-2 ring-emerald-500/20';
                        } else if (oIdx === selectedIdx) {
                          btnClass = 'bg-red-50 border-red-400 text-red-950';
                        } else {
                          btnClass = 'opacity-40 bg-white border-transparent';
                        }
                      }

                      return (
                        <button
                          key={`opt-${oIdx}`}
                          type="button"
                          id={`btn-quiz-opt-${oIdx}`}
                          disabled={isAnswered}
                          onClick={() => handleSelectOption(q.id, oIdx)}
                          className={`w-full text-left p-3.5 rounded-xl border transition-all text-xs sm:text-sm font-medium flex items-center justify-between ${btnClass}`}
                        >
                          <div className="flex items-center gap-3">
                            <span className="w-6 h-6 rounded-full bg-[#EAE4D9] text-[#7A4E38] flex items-center justify-center text-xs font-bold">
                              {String.fromCharCode(65 + oIdx)}
                            </span>
                            <span>{opt}</span>
                          </div>
                          {isAnswered && oIdx === q.correctIndex && (
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Pedagogical Explanation */}
                  {showExplanation && (
                    <div className={`p-4 rounded-xl border text-xs leading-relaxed space-y-1.5 ${
                      isCorrect
                        ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                        : 'bg-[#FAF2EB] border-[#E8C2B4] text-[#7A3E2C]'
                    }`}>
                      <p className="font-bold flex items-center gap-1.5">
                        {isCorrect ? '✓ Chính xác!' : '⚠️ Giải thích chi tiết:'}
                      </p>
                      <p>{q.explanation}</p>
                      <p className="text-[11px] opacity-90 pt-1 border-t border-black/10 italic">
                        💡 <strong>Thông tin văn hóa bổ trợ:</strong> {q.culturalFact}
                      </p>
                    </div>
                  )}

                  {/* Quiz Controls */}
                  {isAnswered && (
                    <div className="flex justify-end pt-2">
                      <button
                        type="button"
                        id="btn-quiz-next"
                        onClick={handleNextQuestion}
                        className="px-5 py-2.5 bg-[#B35C44] hover:bg-[#964732] text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-2 cursor-pointer"
                      >
                        {currentQuizIdx + 1 < station.quiz.length ? (
                          <>Tiếp tục câu hỏi <ArrowRight className="w-3.5 h-3.5" /></>
                        ) : (
                          <>Hoàn thành trạm & Thu thập Dấu ấn <Award className="w-3.5 h-3.5 text-amber-200" /></>
                        )}
                      </button>
                    </div>
                  )}
                </div>
              );
            })()}

            {/* If station is already completed or just finished, show Certificate Claim Card */}
            {isCompleted && (
              <div className="p-4 bg-[#FAF2EB] rounded-xl border border-[#B35C44]/40 flex flex-col sm:flex-row items-center justify-between gap-3 mt-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#B35C44] text-white flex items-center justify-center text-lg font-bold shadow-xs">
                    📜
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-serif font-bold text-[#2F2F2F]">
                      Giấy Chứng Nhận Hoàn Thành Trạm 0{station.order}
                    </h4>
                    <p className="text-[11px] text-[#7A3E2C]">
                      Bạn đã chinh phục thành công Dấu ấn <strong>{station.stampName}</strong>. Hãy xem và tải giấy chứng nhận của bạn!
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  id="btn-open-station-cert-quiz"
                  onClick={() => setIsCertModalOpen(true)}
                  className="px-4 py-2 bg-[#B35C44] hover:bg-[#964732] text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer"
                >
                  <Award className="w-4 h-4 text-amber-200" />
                  Xem & Tải Giấy Chứng Nhận
                </button>
              </div>
            )}
          </div>
        )}

        {/* Tab 4: Student Harvest Notes */}
        {activeTab === 'notes' && (
          <div className="bg-[#FAF8F5] p-5 sm:p-6 rounded-2xl border border-[#E3DCD2] shadow-sm space-y-4">
            <div>
              <h3 className="text-base font-serif font-bold text-[#2F2F2F]">
                Sổ ghi chép thu hoạch kiến thức ({progress.studentName ? progress.studentName : 'Học sinh'} & Kiến Sáng)
              </h3>
              <p className="text-xs text-[#736B60] mt-0.5">
                Hãy ghi lại 1-2 điều tâm đắc nhất mà bạn đã học được tại Trạm {station.order} để lưu vào Sổ Hành Trình.
              </p>
            </div>

            <textarea
              value={userNote}
              onChange={(e) => setUserNote(e.target.value)}
              rows={4}
              placeholder="Ví dụ: Em rất ấn tượng với kỹ thuật dệt zèng đính cườm trắng trên nền chàm đen..."
              className="w-full p-3.5 rounded-xl bg-white border border-[#D5CCBC] text-[#2F2F2F] text-xs sm:text-sm focus:outline-none focus:border-[#B35C44] focus:ring-2 focus:ring-[#B35C44]/20 transition-all placeholder:text-[#9E9589]"
            />

            <div className="flex items-center justify-between">
              <button
                type="button"
                id="btn-save-note"
                onClick={handleSaveStudentNote}
                className="px-4 py-2 rounded-xl bg-[#B35C44] hover:bg-[#964732] text-white font-bold text-xs transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <BookOpen className="w-3.5 h-3.5" />
                Lưu vào Sổ Hành Trình
              </button>
              {noteSaved && (
                <span className="text-xs text-[#2D4232] font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Đã lưu vào sổ tay!
                </span>
              )}
            </div>
          </div>
        )}

        {/* Footer Station Pagination Prev / Next */}
        <div className="flex items-center justify-between pt-4 border-t border-[#DDD5C7]">
          {prevStation ? (
            <button
              type="button"
              id="btn-prev-station"
              onClick={() => onNavigateStation(prevStation.id)}
              className="px-4 py-2 rounded-xl bg-[#FAF8F5] hover:bg-[#EFECE6] border border-[#DDD5C7] text-[#2F2F2F] text-xs font-bold transition-colors flex items-center gap-2 shadow-2xs"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Trạm trước: {prevStation.title.split('&')[0]}
            </button>
          ) : <div />}

          {nextStation && (
            <button
              type="button"
              id="btn-next-station"
              onClick={() => onNavigateStation(nextStation.id)}
              className="px-4 py-2 rounded-xl bg-[#B35C44] hover:bg-[#964732] text-white text-xs font-bold transition-colors flex items-center gap-2 shadow-xs cursor-pointer"
            >
              Trạm tiếp theo: {nextStation.title.split('&')[0]}
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Station Certificate Modal */}
        <StationCertificateModal
          station={station}
          progress={progress}
          isOpen={isCertModalOpen}
          onClose={() => setIsCertModalOpen(false)}
          onViewAllCertificates={onNavigateCertificate}
        />

      </div>
    </div>
  );
};
