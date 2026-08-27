import React from 'react';
import { motion } from 'motion/react';
import { Station, StationId, UserProgress } from '../types';
import { STATIONS_DATA } from '../data/culturalData';
import { IMAGE_ASSETS } from '../data/imageAssets';
import { CulturalImage } from './CulturalImage';
import { CheckCircle2, Lock, ArrowRight, Sparkles, Compass, Award, BookOpen } from 'lucide-react';

interface JourneyMapViewProps {
  progress: UserProgress;
  onSelectStation: (stationId: StationId) => void;
  onOpenNotebook: () => void;
  onNavigateCertificate: () => void;
}

export const JourneyMapView: React.FC<JourneyMapViewProps> = ({
  progress,
  onSelectStation,
  onOpenNotebook,
  onNavigateCertificate,
}) => {
  const completedCount = progress.completedStations.length;
  const isCompletedAll = completedCount === 8;

  // Station status helper
  const getStationStatus = (station: Station, index: number): 'completed' | 'open' | 'locked' => {
    if (progress.completedStations.includes(station.id)) {
      return 'completed';
    }
    // First station is always open; subsequent stations unlock or can be explored
    if (index === 0 || progress.completedStations.includes(STATIONS_DATA[index - 1]?.id)) {
      return 'open';
    }
    return 'open'; // Allow open exploration mode for students
  };

  return (
    <div id="journey-map-view" className="w-full bg-[#F5F2ED] text-[#2F2F2F] min-h-[calc(100vh-4rem)] py-8 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Top Header & Progress HUD */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#FAF8F5] p-5 rounded-2xl border border-[#E3DCD2] shadow-xs">
          <div>
            <div className="flex items-center gap-2">
              <Compass className="w-5 h-5 text-[#B35C44]" />
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#2F2F2F]">
                Bản đồ Khám phá Làng Cơ Tu
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-[#6B665E] mt-1">
              Chọn bất kỳ trạm nào trên bản đồ để bắt đầu tìm hiểu văn hóa và thu thập Dấu ấn Khắc gỗ số.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-[#EFECE6] px-4 py-2.5 rounded-xl border border-[#DDD5C7] flex items-center gap-3">
              <div className="text-right">
                <span className="text-[10px] text-[#736B60] block font-bold uppercase tracking-wider">Tiến độ</span>
                <span className="text-sm font-bold text-[#B35C44]">
                  {completedCount} / 8 Trạm hoàn thành
                </span>
              </div>
              <div className="w-10 h-10 rounded-full bg-[#FAF8F5] flex items-center justify-center font-bold text-[#2D4232] border border-[#2D4232]/30 shadow-2xs">
                {Math.round((completedCount / 8) * 100)}%
              </div>
            </div>

            {isCompletedAll ? (
              <button
                type="button"
                id="btn-map-finish-cert"
                onClick={onNavigateCertificate}
                className="px-4 py-2.5 bg-gradient-to-r from-[#2D4232] to-[#3D5A44] hover:from-[#354F3C] hover:to-[#476B50] text-white text-xs font-bold rounded-xl shadow-xs flex items-center gap-1.5 animate-pulse"
              >
                <Award className="w-4 h-4 text-amber-300" />
                Nhận Chứng Nhận
              </button>
            ) : (
              <button
                type="button"
                id="btn-map-open-notebook"
                onClick={onOpenNotebook}
                className="px-4 py-2.5 bg-[#FAF8F5] hover:bg-[#EFECE6] text-[#2F2F2F] text-xs font-bold rounded-xl border border-[#DDD5C7] flex items-center gap-1.5 transition-colors shadow-2xs"
              >
                <BookOpen className="w-4 h-4 text-[#B35C44]" />
                Sổ Hành Trình
              </button>
            )}
          </div>
        </div>

        {/* Illustrated Interactive Map Visual Stage (Mandated Y4-02) */}
        <div className="relative w-full rounded-2xl overflow-hidden border border-[#E3DCD2] bg-[#FAF8F5] shadow-md">
          {/* Main Map Background Illustration */}
          <CulturalImage
            asset={IMAGE_ASSETS.journeyMap}
            showCaption={false}
            allowZoom={false}
            className="w-full aspect-[16/10] md:aspect-[16/9] object-cover"
          />

          {/* Interactive Overlay Station Pins */}
          <div className="absolute inset-0 p-4 pointer-events-none">
            {STATIONS_DATA.map((st, idx) => {
              const status = getStationStatus(st, idx);
              const isCompleted = status === 'completed';

              return (
                <div
                  key={st.id}
                  style={{
                    left: `${st.locationCoords.x}%`,
                    top: `${st.locationCoords.y}%`,
                  }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-auto group z-20"
                >
                  <button
                    type="button"
                    id={`btn-map-pin-${st.id}`}
                    onClick={() => onSelectStation(st.id)}
                    className={`relative p-2 rounded-2xl transition-all duration-300 shadow-md flex items-center justify-center border ${
                      isCompleted
                        ? 'bg-[#2D4232] border-emerald-300 text-white scale-105 ring-4 ring-[#2D4232]/30'
                        : 'bg-[#FAF8F5]/95 hover:bg-[#B35C44] border-[#B35C44]/60 text-[#2F2F2F] hover:text-white hover:scale-110 shadow-lg'
                    }`}
                  >
                    <div className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center font-serif font-bold text-xs sm:text-sm">
                      {isCompleted ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-200" />
                      ) : (
                        <span>0{st.order}</span>
                      )}
                    </div>

                    {/* Ping Animation for Current Suggested Station */}
                    {!isCompleted && idx === completedCount && (
                      <span className="absolute -top-1 -right-1 flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#B35C44] opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-[#B35C44]"></span>
                      </span>
                    )}

                    {/* Floating Info Tooltip on Hover */}
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:flex flex-col items-center pointer-events-none z-30 w-48 sm:w-56">
                      <div className="p-2.5 rounded-xl bg-[#2D4232] text-white border border-[#486B50] shadow-xl text-center backdrop-blur-md">
                        <span className="text-[10px] uppercase font-bold text-amber-200 tracking-wider block">
                          Trạm 0{st.order} • {st.category}
                        </span>
                        <p className="text-xs font-bold mt-0.5 text-white">{st.title}</p>
                        <p className="text-[11px] text-[#D8E6D6] mt-1 line-clamp-2">
                          {st.subTitle}
                        </p>
                      </div>
                      <div className="w-2 h-2 bg-[#2D4232] rotate-45 -mt-1 border-r border-b border-[#486B50]" />
                    </div>
                  </button>

                  {/* Accessible Station Badge Label directly on Map */}
                  <div className="mt-1.5 text-center hidden md:block">
                    <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-[#2D4232]/90 backdrop-blur-md text-white border border-white/20 shadow-xs whitespace-nowrap">
                      Trạm {st.order}: {st.title.split('&')[0]}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Grid List of 8 Stations for Easy Touch Selection */}
        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-[#7A4E38] mb-3">
            Danh sách 8 Trạm trải nghiệm di sản Cơ Tu:
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
            {STATIONS_DATA.map((station, idx) => {
              const status = getStationStatus(station, idx);
              const isCompleted = status === 'completed';

              return (
                <div
                  key={station.id}
                  id={`card-station-${station.id}`}
                  onClick={() => onSelectStation(station.id)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between group ${
                    isCompleted
                      ? 'bg-[#F1F6F2] border-[#A8C7B0] hover:border-[#2D4232] shadow-2xs'
                      : 'bg-[#FAF8F5] border-[#E3DCD2] hover:border-[#B35C44] hover:bg-white shadow-2xs'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#EAE4D9] text-[#7A4E38]">
                        Trạm 0{station.order}
                      </span>
                      {isCompleted ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#2D4232] bg-emerald-100 px-2 py-0.5 rounded-full border border-emerald-300">
                          <CheckCircle2 className="w-3 h-3" /> Đã xong
                        </span>
                      ) : (
                        <span className="text-[11px] text-[#736B60] font-medium">
                          {station.durationMinutes} phút
                        </span>
                      )}
                    </div>

                    <h4 className="text-sm font-bold text-[#2F2F2F] group-hover:text-[#B35C44] transition-colors leading-snug">
                      {station.title}
                    </h4>
                    {station.coTuTitle && (
                      <p className="text-[11px] italic text-[#736B60] mt-0.5">
                        {station.coTuTitle}
                      </p>
                    )}
                    <p className="text-xs text-[#555047] mt-2 line-clamp-2 leading-relaxed">
                      {station.summary}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#EFEAE2] flex items-center justify-between text-xs font-semibold">
                    <span className="text-[11px] text-[#B35C44] font-medium">
                      {station.stampName}
                    </span>
                    <span className="text-[#B35C44] group-hover:translate-x-1 transition-transform flex items-center gap-1">
                      Khám phá <ArrowRight className="w-3.5 h-3.5" />
                    </span>
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
