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
import { CulturalTutorModal } from './components/CulturalTutorModal';

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
      studentName: 'Minh & An',
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
          />
        )}

        {currentView === 'map' && (
          <JourneyMapView
            progress={progress}
            onSelectStation={handleSelectStation}
            onOpenNotebook={() => setIsNotebookOpen(true)}
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
          />
        )}
      </main>

      {/* Footer in Natural Tones Forest Green */}
      <footer className="bg-[#2D4232] border-t border-[#3D5643] text-[#D3DFCE] text-xs py-8 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#B35C44] text-white flex items-center justify-center font-serif font-bold text-xs shadow-sm">
              CT
            </div>
            <div>
              <p className="font-serif font-bold text-[#FAF8F5] text-sm tracking-wide">
                LÀNG CƠ TU SỐ – HÀNH TRÌNH KHÁM PHÁ VĂN HÓA ĐẠI NGÀN
              </p>
              <p className="text-[11px] text-[#A6BAA4]">
                Nền tảng Giáo dục Di sản Văn hóa số hóa dành cho Học sinh THCS
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-[11px] text-[#B8CAB6]">
            <span>© 2026 Dự án Di sản số Cơ Tu</span>
            <span>•</span>
            <span>Tư liệu chuẩn hóa: Cục Di sản văn hóa & Bảo tàng Điêu khắc</span>
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
        />
      )}

      {isTutorOpen && (
        <CulturalTutorModal onClose={() => setIsTutorOpen(false)} />
      )}
    </div>
  );
}
