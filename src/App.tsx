/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { StationId, UserProgress } from './types';
import { STATIONS_DATA } from './data/culturalData';
import { HeaderNavbar } from './components/HeaderNavbar';
import { HeroSection } from './components/HeroSection';
import { JourneyMapView } from './components/JourneyMapView';
import { StationDetailView } from './components/StationDetailView';
import { CompletionCertificateView } from './components/CompletionCertificateView';
import { JourneyNotebookModal } from './components/JourneyNotebookModal';
import { HeritageSummaryModal } from './components/HeritageSummaryModal';
import { CulturalTutorModal } from './components/CulturalTutorModal';
import { FptSchoolLogo } from './components/FptSchoolLogo';

const STORAGE_KEY = 'co_tu_heritage_progress_v1';

export default function App() {
  // Load progress from localStorage or use default
  const [progress, setProgress] = useState<UserProgress>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // ignore
    }
    return {
      studentName: '',
      completedStations: [],
      collectedStamps: [],
      notebookNotes: [],
    };
  });

  // Navigation state
  const [currentView, setCurrentView] = useState<'home' | 'map' | 'station' | 'certificate'>('home');
  const [activeStationId, setActiveStationId] = useState<StationId>('guol');

  // Modals state
  const [isNotebookOpen, setIsNotebookOpen] = useState(false);
  const [isSummaryOpen, setIsSummaryOpen] = useState(false);
  const [isTutorOpen, setIsTutorOpen] = useState(false);

  // Save progress changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch {
      // ignore
    }
  }, [progress]);

  const handleUpdateStudentName = (name: string) => {
    setProgress((prev) => ({ ...prev, studentName: name }));
  };

  const handleCompleteStation = (stationId: StationId) => {
    setProgress((prev) => {
      const alreadyCompleted = prev.completedStations.includes(stationId);
      const nextCompleted = alreadyCompleted
        ? prev.completedStations
        : [...prev.completedStations, stationId];

      const stampId = `stamp_${stationId}`;
      const nextStamps = prev.collectedStamps.includes(stampId)
        ? prev.collectedStamps
        : [...prev.collectedStamps, stampId];

      const isAllDone = nextCompleted.length === 8;
      const certCode = prev.certificateCode || `CT-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

      return {
        ...prev,
        completedStations: nextCompleted,
        collectedStamps: nextStamps,
        certificateCode: certCode,
        isCompletedAll: isAllDone,
      };
    });
  };

  const handleSaveNote = (stationId: StationId, noteText: string) => {
    setProgress((prev) => {
      const existingIdx = prev.notebookNotes.findIndex((n) => n.stationId === stationId);
      const newEntry = {
        stationId,
        note: noteText,
        timestamp: new Date().toLocaleDateString('vi-VN', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
        }),
      };

      let updatedNotes;
      if (existingIdx >= 0) {
        updatedNotes = [...prev.notebookNotes];
        updatedNotes[existingIdx] = newEntry;
      } else {
        updatedNotes = [...prev.notebookNotes, newEntry];
      }

      return {
        ...prev,
        notebookNotes: updatedNotes,
      };
    });
  };

  const handleSelectStation = (stId: StationId) => {
    setActiveStationId(stId);
    setCurrentView('station');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateStation = (nextId: StationId) => {
    setActiveStationId(nextId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#F5F2ED] text-[#2F2F2F] font-sans antialiased flex flex-col selection:bg-[#B35C44] selection:text-white">
      {/* Sticky Header Navbar */}
      <HeaderNavbar
        progress={progress}
        currentView={currentView}
        onOpenNotebook={() => setIsNotebookOpen(true)}
        onOpenSummary={() => setIsSummaryOpen(true)}
        onOpenTutor={() => setIsTutorOpen(true)}
        onNavigateHome={() => {
          setCurrentView('home');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onNavigateMap={() => {
          setCurrentView('map');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onNavigateCertificate={() => {
          setCurrentView('certificate');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Main View Router */}
      <main className="flex-1 w-full">
        {currentView === 'home' && (
          <HeroSection
            studentName={progress.studentName}
            onChangeName={handleUpdateStudentName}
            onStartJourney={() => {
              setCurrentView('map');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenNotebook={() => setIsNotebookOpen(true)}
            onOpenSummary={() => setIsSummaryOpen(true)}
          />
        )}

        {currentView === 'map' && (
          <JourneyMapView
            progress={progress}
            onSelectStation={handleSelectStation}
            onOpenNotebook={() => setIsNotebookOpen(true)}
            onOpenSummary={() => setIsSummaryOpen(true)}
            onNavigateCertificate={() => {
              setCurrentView('certificate');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {currentView === 'station' && (
          <StationDetailView
            stationId={activeStationId}
            progress={progress}
            onBackToMap={() => {
              setCurrentView('map');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onNavigateStation={handleNavigateStation}
            onCompleteStation={handleCompleteStation}
            onSaveNote={handleSaveNote}
            onNavigateCertificate={() => {
              setCurrentView('certificate');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {currentView === 'certificate' && (
          <CompletionCertificateView
            progress={progress}
            onBackToMap={() => {
              setCurrentView('map');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenNotebook={() => setIsNotebookOpen(true)}
            onSelectStation={handleSelectStation}
          />
        )}
      </main>

      {/* Footer in Natural Tones Forest Green with FPT Schools & Class 9A2 Attribution */}
      <footer className="bg-[#243528] border-t border-[#364D3B] text-[#D3DFCE] text-xs py-8 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-[#364D3B]">
            {/* Project Identity */}
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-[#B35C44] text-white flex items-center justify-center font-serif font-bold text-sm shadow-xs shrink-0">
                CT
              </div>
              <div>
                <p className="font-serif font-bold text-[#FAF8F5] text-base tracking-wide">
                  LÀNG CƠ TU SỐ – HÀNH TRÌNH KHÁM PHÁ VĂN HÓA ĐẠI NGÀN
                </p>
                <p className="text-xs text-[#A6BAA4] mt-0.5">
                  Dự án học tập số hóa di sản văn hóa Cơ Tu dành cho học sinh
                </p>
              </div>
            </div>

            {/* School & Class Credit with Logo */}
            <div className="bg-[#1D2B20] px-4 py-3 rounded-2xl border border-[#3A533F] flex items-center gap-4 shadow-xs">
              <div className="bg-white p-1.5 rounded-xl shadow-2xs">
                <FptSchoolLogo variant="compact" className="h-9 w-auto" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black text-[#F37021] uppercase tracking-wide font-sans">
                    FPT SCHOOLS
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-[#FAF8F5] text-[#B35C44]">
                    LỚP 9A2
                  </span>
                </div>
                <p className="text-[11px] font-bold text-[#62B3ED] italic mt-0.5">
                  Trải nghiệm để trưởng thành
                </p>
                <span className="text-[10px] text-[#A6BAA4]">
                  Đơn vị sáng tạo & thực hiện sản phẩm số
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-[#97AC95]">
            <span>© 2026 Dự án Di sản số Cơ Tu • Thực hiện bởi Tập thể Lớp 9A2 Trường FPT</span>
            <div className="flex items-center gap-3">
              <span>Tư liệu tham khảo chuẩn mực: Cục Di sản Văn hóa</span>
              <span>•</span>
              <span>Bảo tàng Điêu khắc Đà Nẵng</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Modals */}
      {isNotebookOpen && (
        <JourneyNotebookModal
          progress={progress}
          onClose={() => setIsNotebookOpen(false)}
          onSelectStation={(stId) => {
            setIsNotebookOpen(false);
            handleSelectStation(stId);
          }}
          onOpenSummary={() => {
            setIsNotebookOpen(false);
            setIsSummaryOpen(true);
          }}
          onNavigateCertificate={() => {
            setIsNotebookOpen(false);
            setCurrentView('certificate');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />
      )}

      {isSummaryOpen && (
        <HeritageSummaryModal
          isOpen={isSummaryOpen}
          progress={progress}
          onClose={() => setIsSummaryOpen(false)}
          onSelectStation={(stId) => {
            setIsSummaryOpen(false);
            handleSelectStation(stId);
          }}
        />
      )}

      {isTutorOpen && (
        <CulturalTutorModal
          studentName={progress.studentName}
          onClose={() => setIsTutorOpen(false)}
        />
      )}
    </div>
  );
}
