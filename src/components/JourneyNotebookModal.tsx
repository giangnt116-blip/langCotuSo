import React, { useState } from 'react';
import { Station, StationId, UserProgress } from '../types';
import { CULTURAL_STAMPS, STATIONS_DATA } from '../data/culturalData';
import { FptSchoolLogo } from './FptSchoolLogo';
import { StationCertificateModal, STATION_TITLES } from './StationCertificateModal';
import { KienSangAvatar } from './KienSangAvatar';
import { X, BookOpen, CheckCircle2, Lock, Sparkles, Award, FileText, FileCheck, Eye, Download } from 'lucide-react';

interface JourneyNotebookModalProps {
  progress: UserProgress;
  onClose: () => void;
  onSelectStation: (stationId: StationId) => void;
  onOpenSummary?: () => void;
  onNavigateCertificate?: () => void;
}

export const JourneyNotebookModal: React.FC<JourneyNotebookModalProps> = ({
  progress,
  onClose,
  onSelectStation,
  onOpenSummary,
  onNavigateCertificate,
}) => {
  const [activeTab, setActiveTab] = useState<'stamps' | 'certificates' | 'funfacts' | 'notes'>('stamps');
  const [selectedStationCert, setSelectedStationCert] = useState<Station | null>(null);
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
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-base sm:text-lg font-serif font-bold text-[#2F2F2F]">
                  Sổ Hành Trình Khám Phá Văn Hóa
                </h3>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#EAE4D9] text-[#7A4E38] border border-[#D5CCBC]">
                  {completedCount}/8 Dấu ấn
                </span>
                <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#FAF2EB] text-[10px] font-bold text-[#B35C44] border border-[#B35C44]/30">
                  Lớp 9A2 • FPT Schools
                </span>
              </div>
              <p className="text-xs text-[#736B60] flex items-center gap-1.5 mt-0.5">
                <span>Chủ sở hữu: <strong>{progress.studentName || 'Học sinh khám phá'}</strong></span>
                <span className="text-[#DDD5C7]">•</span>
                <span className="inline-flex items-center gap-1 text-[#7A4E38]">
                  <KienSangAvatar size="xs" />
                  Đồng hành: <strong>Kiến Sáng</strong>
                </span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <FptSchoolLogo variant="compact" className="h-6 w-auto hidden md:block" />
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
        </div>

        {/* Tabs Bar */}
        <div className="px-5 pt-3 bg-[#EFECE6] border-b border-[#DDD5C7] flex flex-wrap items-center gap-2">
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
            onClick={() => setActiveTab('certificates')}
            className={`px-4 py-2 text-xs font-bold rounded-t-xl transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'certificates'
                ? 'bg-[#FAF8F5] text-[#B35C44] border-t-2 border-[#B35C44]'
                : 'text-[#736B60] hover:text-[#2F2F2F]'
            }`}
          >
            <FileCheck className="w-3.5 h-3.5" />
            Giấy chứng nhận ({completedCount}/8)
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
            Ghi chép ({progress.notebookNotes.length})
          </button>
        </div>

        {/* Modal Content Scroll Area */}
        <div className="p-5 overflow-y-auto flex-1 space-y-4">
          {/* Tab 1: 8 Stamps */}
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
                      className={`p-3.5 rounded-2xl border flex flex-col items-center text-center transition-all ${
                        isUnlocked
                          ? 'bg-white border-[#B35C44]/40 shadow-xs'
                          : 'bg-[#F5F2ED] border-[#DDD5C7] opacity-60'
                      }`}
                    >
                      {/* Stamp Seal Woodcut Box */}
                      <div
                        onClick={() => {
                          onClose();
                          onSelectStation(stamp.stationId);
                        }}
                        className={`w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-serif mb-2 border-2 cursor-pointer ${
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

                      <div className="mt-2 w-full space-y-1.5">
                        {isUnlocked ? (
                          <>
                            <span className="text-[#2D4232] font-bold text-[10px] flex items-center justify-center gap-0.5">
                              <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Đã đóng dấu
                            </span>
                            {stData && (
                              <button
                                type="button"
                                onClick={() => setSelectedStationCert(stData)}
                                className="w-full py-1 px-2 rounded-lg bg-[#FAF2EB] hover:bg-[#F3E3D8] text-[#B35C44] text-[10px] font-bold border border-[#B35C44]/30 transition-colors flex items-center justify-center gap-1 cursor-pointer"
                              >
                                <Eye className="w-3 h-3" /> Xem Chứng nhận
                              </button>
                            )}
                          </>
                        ) : (
                          <button
                            type="button"
                            onClick={() => {
                              onClose();
                              onSelectStation(stamp.stationId);
                            }}
                            className="w-full py-1 px-2 rounded-lg bg-[#EAE4D9] hover:bg-[#DDD5C7] text-[#736B60] text-[10px] font-medium transition-colors cursor-pointer"
                          >
                            Đến trạm học tập
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Tab 2: Individual & Grand Certificates */}
          {activeTab === 'certificates' && (
            <div className="space-y-4">
              {/* Grand Certificate Callout */}
              <div className="p-4 rounded-2xl bg-[#FAF2EB] border border-[#B35C44]/40 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#B35C44] to-[#7A3E2C] text-white flex items-center justify-center text-lg font-bold shadow-xs">
                    🏆
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-serif font-bold text-[#2F2F2F]">
                      Giấy Chứng Nhận Nhà Thám Hiểm Văn Hóa Dân Tộc (8 Trạm)
                    </h4>
                    <p className="text-[11px] text-[#7A3E2C]">
                      {completedCount === 8
                        ? '★ Đã mở khóa trọn vẹn! Bạn đã chính thức đạt danh hiệu cao quý nhất.'
                        : `Tiến độ: ${completedCount}/8 trạm. Hoàn thành thêm ${8 - completedCount} trạm để mở khóa!`}
                    </p>
                  </div>
                </div>

                {onNavigateCertificate && (
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onNavigateCertificate();
                    }}
                    className="px-4 py-2 bg-[#B35C44] hover:bg-[#964732] text-white text-xs font-bold rounded-xl shadow-xs transition-colors whitespace-nowrap cursor-pointer"
                  >
                    Xem Trung Tâm Chứng Nhận
                  </button>
                )}
              </div>

              {/* List of 8 Station Certificates */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#B35C44]">
                  Danh sách Giấy Chứng Nhận Từng Trạm:
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {STATIONS_DATA.map((st) => {
                    const isDone = progress.completedStations.includes(st.id);
                    const titleMeta = STATION_TITLES[st.id] || { title: `Trạm 0${st.order}` };

                    return (
                      <div
                        key={`cert-tab-${st.id}`}
                        className={`p-3.5 rounded-xl border flex items-center justify-between gap-3 ${
                          isDone ? 'bg-white border-[#B35C44]/30 shadow-2xs' : 'bg-[#F5F2ED] border-[#DDD5C7] opacity-70'
                        }`}
                      >
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-1.5">
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#EAE4D9] text-[#7A4E38]">
                              Trạm 0{st.order}
                            </span>
                            {isDone && (
                              <span className="text-[10px] text-emerald-700 font-bold flex items-center gap-0.5">
                                <CheckCircle2 className="w-3 h-3" /> Đã cấp
                              </span>
                            )}
                          </div>
                          <p className="text-xs font-bold text-[#2F2F2F]">{st.title}</p>
                          <p className="text-[11px] text-[#B35C44] italic">“{titleMeta.title}”</p>
                        </div>

                        {isDone ? (
                          <button
                            type="button"
                            onClick={() => setSelectedStationCert(st)}
                            className="px-3 py-1.5 bg-[#B35C44] hover:bg-[#964732] text-white text-xs font-bold rounded-lg shadow-2xs transition-colors flex items-center gap-1 shrink-0 cursor-pointer"
                          >
                            <Eye className="w-3.5 h-3.5" /> Xem
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={() => {
                              onClose();
                              onSelectStation(st.id);
                            }}
                            className="px-3 py-1.5 bg-[#EAE4D9] hover:bg-[#DDD5C7] text-[#2F2F2F] text-xs font-medium rounded-lg transition-colors shrink-0 cursor-pointer"
                          >
                            Học trạm
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: Fun Facts Cards (Mandated Y4-11) */}
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

        {/* Modal Footer */}
        <div className="p-4 bg-[#F5F2ED] border-t border-[#E3DCD2] flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            {onOpenSummary && (
              <button
                type="button"
                id="btn-notebook-to-summary"
                onClick={() => {
                  onClose();
                  onOpenSummary();
                }}
                className="px-3.5 py-2 bg-[#FAF2EB] hover:bg-[#F2E5D8] text-[#B35C44] text-xs font-bold rounded-xl border border-[#B35C44]/30 flex items-center gap-1.5 transition-colors shadow-2xs cursor-pointer"
              >
                <FileText className="w-4 h-4" />
                <span>Xem Cẩm nang Tóm tắt Toàn bộ 8 Trạm</span>
              </button>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-white hover:bg-[#EFECE6] text-[#2F2F2F] text-xs font-semibold rounded-xl border border-[#DDD5C7] transition-colors cursor-pointer ml-auto"
          >
            Đóng sổ
          </button>
        </div>

        {/* Station Certificate Preview Modal */}
        {selectedStationCert && (
          <StationCertificateModal
            station={selectedStationCert}
            progress={progress}
            isOpen={!!selectedStationCert}
            onClose={() => setSelectedStationCert(null)}
            onViewAllCertificates={() => {
              setSelectedStationCert(null);
              onClose();
              if (onNavigateCertificate) {
                onNavigateCertificate();
              }
            }}
          />
        )}

      </div>
    </div>
  );
};
