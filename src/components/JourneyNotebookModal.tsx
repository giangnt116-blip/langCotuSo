import React, { useState } from 'react';
import { UserProgress } from '../types';
import { CULTURAL_STAMPS, STATIONS_DATA } from '../data/culturalData';
import { X, BookOpen, CheckCircle2, Lock, Sparkles, Award, FileText } from 'lucide-react';

interface JourneyNotebookModalProps {
  progress: UserProgress;
  onClose: () => void;
  onSelectStation: (stationId: any) => void;
}

export const JourneyNotebookModal: React.FC<JourneyNotebookModalProps> = ({
  progress,
  onClose,
  onSelectStation,
}) => {
  const [activeTab, setActiveTab] = useState<'stamps' | 'funfacts' | 'notes'>('stamps');
  const completedCount = progress.completedStations.length;

  // Flatten all fun facts
  const allFunFacts = STATIONS_DATA.flatMap((s) => s.funFacts);

  return (
    <div
      id="modal-journey-notebook"
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#2F2F2F]/60 p-4 backdrop-blur-xs animate-in fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-[90vh] bg-[#FAF8F5] border border-[#E3DCD2] rounded-2xl flex flex-col text-[#2F2F2F] shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-4 sm:p-5 bg-[#F5F2ED] border-b border-[#E3DCD2] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#B35C44] flex items-center justify-center text-white font-serif font-bold text-lg shadow-xs">
              📖
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-serif font-bold text-[#2F2F2F]">
                  Sổ Hành Trình Khám Phá Văn Hóa
                </h3>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#EAE4D9] text-[#7A4E38] border border-[#D5CCBC]">
                  {completedCount}/8 Dấu ấn
                </span>
              </div>
              <p className="text-xs text-[#736B60]">
                Chủ sở hữu: <strong>{progress.studentName || 'Học sinh khám phá'}</strong>
              </p>
            </div>
          </div>

          <button
            type="button"
            id="btn-close-notebook"
            onClick={onClose}
            className="p-2 text-[#736B60] hover:text-[#2F2F2F] hover:bg-[#EFECE6] rounded-xl transition-colors cursor-pointer"
            aria-label="Đóng sổ hành trình"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs Bar */}
        <div className="px-5 pt-3 bg-[#EFECE6] border-b border-[#DDD5C7] flex items-center gap-2">
          <button
            type="button"
            onClick={() => setActiveTab('stamps')}
            className={`px-4 py-2 text-xs font-bold rounded-t-xl transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'stamps'
                ? 'bg-[#FAF8F5] text-[#B35C44] border-t-2 border-[#B35C44]'
                : 'text-[#736B60] hover:text-[#2F2F2F]'
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            Bộ 8 Dấu ấn Khắc gỗ ({completedCount}/8)
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('funfacts')}
            className={`px-4 py-2 text-xs font-bold rounded-t-xl transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'funfacts'
                ? 'bg-[#FAF8F5] text-[#B35C44] border-t-2 border-[#B35C44]'
                : 'text-[#736B60] hover:text-[#2F2F2F]'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            Thẻ "Bạn có biết?" ({allFunFacts.length})
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('notes')}
            className={`px-4 py-2 text-xs font-bold rounded-t-xl transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'notes'
                ? 'bg-[#FAF8F5] text-[#B35C44] border-t-2 border-[#B35C44]'
                : 'text-[#736B60] hover:text-[#2F2F2F]'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            Ghi chép thu hoạch ({progress.notebookNotes.length})
          </button>
        </div>

        {/* Modal Content Scroll Area */}
        <div className="p-5 overflow-y-auto flex-1 space-y-4">
          {/* Tab 1: 8 Stamps (Mandated Y4-12) */}
          {activeTab === 'stamps' && (
            <div className="space-y-4">
              <p className="text-xs text-[#736B60]">
                Các Dấu ấn Khắc gỗ số được tạo tác theo phong cách tối giản trung tính, minh chứng cho việc bạn đã hoàn thành các câu hỏi và hoạt động tại từng trạm:
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
                {CULTURAL_STAMPS.map((stamp, idx) => {
                  const isUnlocked = progress.completedStations.includes(stamp.stationId);
                  const stData = STATIONS_DATA.find((s) => s.id === stamp.stationId);

                  return (
                    <div
                      key={stamp.id}
                      onClick={() => {
                        onClose();
                        onSelectStation(stamp.stationId);
                      }}
                      className={`p-4 rounded-2xl border flex flex-col items-center text-center cursor-pointer transition-all ${
                        isUnlocked
                          ? 'bg-white border-[#B35C44]/40 shadow-xs hover:scale-105 hover:shadow-md'
                          : 'bg-[#F5F2ED] border-[#DDD5C7] opacity-60 hover:opacity-80'
                      }`}
                    >
                      {/* Stamp Seal Woodcut Box */}
                      <div
                        className={`w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-serif mb-2.5 border-2 ${
                          isUnlocked
                            ? 'bg-gradient-to-br from-[#B35C44] to-[#7A3E2C] border-[#B35C44] text-white shadow-inner'
                            : 'bg-[#EAE4D9] border-[#D5CCBC] text-[#8C8478]'
                        }`}
                      >
                        {isUnlocked ? (
                          <span>{idx === 0 ? '⛰️' : idx === 1 ? '🏛️' : idx === 2 ? '🧵' : idx === 3 ? '💃' : idx === 4 ? '🔔' : idx === 5 ? '💬' : idx === 6 ? '🪓' : '🎋'}</span>
                        ) : (
                          <Lock className="w-5 h-5" />
                        )}
                      </div>

                      <span className="text-xs font-bold text-[#2F2F2F] leading-tight">
                        {stamp.title}
                      </span>
                      <span className="text-[10px] text-[#736B60] mt-0.5">
                        Trạm 0{idx + 1}: {stData?.title.split('&')[0]}
                      </span>

                      <div className="mt-2 text-[10px]">
                        {isUnlocked ? (
                          <span className="text-[#2D4232] font-bold flex items-center gap-0.5">
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Đã đóng dấu
                          </span>
                        ) : (
                          <span className="text-[#9E9589] italic">Chưa mở khóa</span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Tab 2: Fun Facts Cards (Mandated Y4-11) */}
          {activeTab === 'funfacts' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {allFunFacts.map((ff) => {
                const st = STATIONS_DATA.find((s) => s.id === ff.stationId);
                return (
                  <div
                    key={ff.id}
                    className="p-4 rounded-2xl bg-white border border-[#DDD5C7] flex flex-col justify-between space-y-2 shadow-2xs"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#B35C44]">
                          {st?.title.split('&')[0]}
                        </span>
                        <span className="px-2 py-0.5 rounded-full text-[10px] bg-emerald-50 text-[#2D4232] font-medium border border-emerald-200">
                          Đã thẩm định
                        </span>
                      </div>
                      <h4 className="text-xs font-bold text-[#2F2F2F]">{ff.title}</h4>
                      <p className="text-xs text-[#555047] mt-1 leading-relaxed">
                        {ff.content}
                      </p>
                    </div>
                    <p className="text-[10px] text-[#8C8478] pt-2 border-t border-[#EFECE6]">
                      Nguồn: {ff.source}
                    </p>
                  </div>
                );
              })}
            </div>
          )}

          {/* Tab 3: Notes List */}
          {activeTab === 'notes' && (
            <div className="space-y-3">
              {progress.notebookNotes.length === 0 ? (
                <div className="p-8 text-center text-[#8C8478]">
                  <p className="text-sm">Bạn chưa có ghi chép nào.</p>
                  <p className="text-xs mt-1">
                    Hãy vào từng trạm học tập và chuyển sang thẻ "Ghi chép thu hoạch" để lưu lại cảm xúc và kiến thức nhé!
                  </p>
                </div>
              ) : (
                progress.notebookNotes.map((note, idx) => {
                  const st = STATIONS_DATA.find((s) => s.id === note.stationId);
                  return (
                    <div
                      key={`note-${idx}`}
                      className="p-4 rounded-2xl bg-white border border-[#DDD5C7] space-y-1.5 shadow-2xs"
                    >
                      <div className="flex items-center justify-between text-xs">
                        <strong className="text-[#B35C44] font-serif">{st?.title}</strong>
                        <span className="text-[10px] text-[#8C8478]">{note.timestamp}</span>
                      </div>
                      <p className="text-xs sm:text-sm text-[#555047] leading-relaxed italic">
                        "{note.note}"
                      </p>
                    </div>
                  );
                })
              )}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
