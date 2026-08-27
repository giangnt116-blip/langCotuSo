import React, { useRef, useState, useEffect } from 'react';
import { Station, StationId, UserProgress } from '../types';
import { IMAGE_ASSETS } from '../data/imageAssets';
import { CulturalImage } from './CulturalImage';
import { FptSchoolLogo } from './FptSchoolLogo';
import { STATIONS_DATA, CULTURAL_STAMPS } from '../data/culturalData';
import { StationCertificateModal, STATION_TITLES } from './StationCertificateModal';
import {
  Award,
  Download,
  ArrowLeft,
  CheckCircle2,
  Lock,
  Sparkles,
  BookOpen,
  Eye,
  FileCheck,
  Compass,
  ArrowRight,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface CompletionCertificateViewProps {
  progress: UserProgress;
  onBackToMap: () => void;
  onOpenNotebook: () => void;
  onSelectStation?: (stationId: StationId) => void;
}

export const CompletionCertificateView: React.FC<CompletionCertificateViewProps> = ({
  progress,
  onBackToMap,
  onOpenNotebook,
  onSelectStation,
}) => {
  const [activeTab, setActiveTab] = useState<'grand' | 'stations'>('grand');
  const [isExportingGrand, setIsExportingGrand] = useState(false);
  const [selectedStationCert, setSelectedStationCert] = useState<Station | null>(null);

  const completedCount = progress.completedStations.length;
  const isAllComplete = completedCount === 8;

  const studentName = progress.studentName.trim() || 'Học sinh khám phá';
  const issueDate = new Date().toLocaleDateString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
  const certCode = progress.certificateCode || `CT-EXP-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

  useEffect(() => {
    // Fire celebratory confetti on view entry if all 8 stations completed
    if (isAllComplete) {
      try {
        confetti({
          particleCount: 80,
          spread: 85,
          origin: { y: 0.6 },
          colors: ['#B35C44', '#F37021', '#2D4232', '#D4AF37', '#FAF8F5'],
        });
      } catch {
        // ignore
      }
    }
  }, [isAllComplete]);

  const drawAndDownloadGrandCertificate = () => {
    setIsExportingGrand(true);
    const canvas = document.createElement('canvas');
    canvas.width = 1920;
    canvas.height = 1080;
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      setIsExportingGrand(false);
      return;
    }

    // 1. Background paper cream
    ctx.fillStyle = '#FAF8F5';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Subtle luxury paper texture pattern
    ctx.fillStyle = '#F0ECE4';
    for (let i = 0; i < canvas.width; i += 40) {
      for (let j = 0; j < canvas.height; j += 40) {
        if ((i + j) % 80 === 0) {
          ctx.fillRect(i, j, 20, 20);
        }
      }
    }

    // 2. Outer Forest Green Frame
    ctx.strokeStyle = '#2D4232';
    ctx.lineWidth = 14;
    ctx.strokeRect(50, 50, canvas.width - 100, canvas.height - 100);

    // Inner Terracotta & Gold Frames
    ctx.strokeStyle = '#B35C44';
    ctx.lineWidth = 4;
    ctx.strokeRect(68, 68, canvas.width - 136, canvas.height - 136);

    ctx.strokeStyle = '#D4AF37';
    ctx.lineWidth = 2;
    ctx.strokeRect(76, 76, canvas.width - 152, canvas.height - 152);

    // Corner decorative geometric motifs
    const corners = [
      [90, 90],
      [canvas.width - 90, 90],
      [90, canvas.height - 90],
      [canvas.width - 90, canvas.height - 90],
    ];
    ctx.fillStyle = '#D4AF37';
    corners.forEach(([x, y]) => {
      ctx.beginPath();
      ctx.arc(x, y, 12, 0, Math.PI * 2);
      ctx.fill();
    });

    // 3. FPT SCHOOLS Logo Bars on Top Canvas
    const logoX = canvas.width / 2 - 90;
    const logoY = 95;
    // Blue bar
    ctx.fillStyle = '#0066B2';
    ctx.beginPath();
    ctx.roundRect(logoX, logoY, 52, 30, 6);
    ctx.fill();
    // Orange bar
    ctx.fillStyle = '#F37021';
    ctx.beginPath();
    ctx.roundRect(logoX + 60, logoY - 3, 56, 35, 6);
    ctx.fill();
    // Green bar
    ctx.fillStyle = '#00A859';
    ctx.beginPath();
    ctx.roundRect(logoX + 124, logoY, 52, 30, 6);
    ctx.fill();

    // Text F P T
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'italic bold 24px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('F', logoX + 26, logoY + 23);
    ctx.fillText('P', logoX + 88, logoY + 25);
    ctx.fillText('T', logoX + 150, logoY + 23);

    // 4. Header Title
    ctx.textAlign = 'center';
    ctx.fillStyle = '#F37021';
    ctx.font = 'bold 22px sans-serif';
    ctx.fillText('FPT SCHOOLS • LỚP 9A2 - TRẢI NGHIỆM ĐỂ TRƯỞNG THÀNH', canvas.width / 2, 168);

    ctx.fillStyle = '#B35C44';
    ctx.font = 'bold 30px serif';
    ctx.fillText('GIÁO DỤC DI SẢN VĂN HÓA CƠ TU MIỀN TRUNG', canvas.width / 2, 212);

    ctx.fillStyle = '#2F2F2F';
    ctx.font = 'bold 58px serif';
    ctx.fillText('GIẤY CHỨNG NHẬN', canvas.width / 2, 280);

    ctx.fillStyle = '#B35C44';
    ctx.font = 'italic bold 44px serif';
    ctx.fillText('“NHÀ THÁM HIỂM VĂN HÓA DÂN TỘC CƠ TU”', canvas.width / 2, 345);

    // Divider with Gold Accent
    ctx.strokeStyle = '#D4AF37';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2 - 380, 375);
    ctx.lineTo(canvas.width / 2 + 380, 375);
    ctx.stroke();

    // 5. Body Text
    ctx.fillStyle = '#555047';
    ctx.font = '26px sans-serif';
    ctx.fillText('Hội đồng Di sản Làng Cơ Tu Số & Trường FPT Schools trân trọng chứng nhận em:', canvas.width / 2, 440);

    // Student Name
    ctx.fillStyle = '#2F2F2F';
    ctx.font = 'bold 56px serif';
    ctx.fillText(studentName.toUpperCase(), canvas.width / 2, 510);

    ctx.fillStyle = '#555047';
    ctx.font = '26px sans-serif';
    ctx.fillText(
      'Đã hoàn thành xuất sắc toàn bộ 8 Trạm khám phá tri thức di sản tại Làng Cơ Tu Số,',
      canvas.width / 2,
      580
    );
    ctx.fillText(
      'thu thập trọn vẹn Bộ 8 Dấu ấn Khắc gỗ và vinh dự được phong tặng danh hiệu cao quý',
      canvas.width / 2,
      625
    );
    ctx.fillStyle = '#B35C44';
    ctx.font = 'bold 30px serif';
    ctx.fillText(
      '★ NHÀ THÁM HIỂM VĂN HÓA DÂN TỘC ★',
      canvas.width / 2,
      675
    );

    // 8 Badges summary text row
    ctx.fillStyle = '#2D4232';
    ctx.font = 'bold 21px sans-serif';
    ctx.fillText(
      '• Không gian cư trú  • Nhà Gươl  • Dệt Zèng  • Tân’tung Da’dá  • Cồng chiêng  • Nói lý Hát lý  • Điêu khắc  • Ẩm thực •',
      canvas.width / 2,
      740
    );

    // Creator Attribution
    ctx.fillStyle = '#7A4E38';
    ctx.font = 'bold 22px sans-serif';
    ctx.fillText('SẢN PHẨM HỌC TẬP SỐ DO TẬP THỂ HỌC SINH LỚP 9A2 – TRƯỜNG FPT THỰC HIỆN', canvas.width / 2, 795);

    // 6. Signature and Date Section
    ctx.textAlign = 'left';
    ctx.fillStyle = '#555047';
    ctx.font = '22px sans-serif';
    ctx.fillText(`Mã chứng nhận: ${certCode}`, 160, 890);
    ctx.fillText(`Ngày cấp: ${issueDate}`, 160, 930);
    ctx.fillText(`Đơn vị: Lớp 9A2 – Trường FPT Schools`, 160, 970);

    ctx.textAlign = 'right';
    ctx.fillText('ĐẠI DIỆN HỘI ĐỒNG DI SẢN LÀNG', canvas.width - 160, 890);
    ctx.fillStyle = '#B35C44';
    ctx.font = 'italic bold 32px serif';
    ctx.fillText('Già làng Y Kông & Chú Bh’ling Avel', canvas.width - 160, 945);
    ctx.fillStyle = '#736B60';
    ctx.font = '20px sans-serif';
    ctx.fillText('(Ký tên và xác thực số)', canvas.width - 160, 980);

    // Export to download
    const dataUrl = canvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = `Chung-nhan-Nha-Tham-Hiem-Van-Hoa-Co-Tu-FPT-9A2-${studentName.replace(/\s+/g, '-')}.png`;
    a.click();
    setIsExportingGrand(false);
  };

  return (
    <div id="completion-view" className="w-full bg-[#F5F2ED] text-[#2F2F2F] min-h-[calc(100vh-4rem)] py-8 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Top Navigation Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 bg-[#FAF8F5] p-3.5 rounded-2xl border border-[#E3DCD2] shadow-xs">
          <button
            type="button"
            onClick={onBackToMap}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#FAF8F5] hover:bg-[#EFECE6] border border-[#DDD5C7] text-[#2F2F2F] text-xs font-bold transition-colors shadow-2xs cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Quay lại Bản đồ 8 trạm
          </button>

          {/* Tab Selector */}
          <div className="flex items-center gap-1.5 bg-[#EFECE6] p-1 rounded-xl border border-[#DDD5C7]">
            <button
              type="button"
              onClick={() => setActiveTab('grand')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'grand'
                  ? 'bg-[#B35C44] text-white shadow-xs'
                  : 'text-[#555047] hover:text-[#2F2F2F]'
              }`}
            >
              <Award className="w-3.5 h-3.5" />
              Giấy Chứng Nhận Nhà Thám Hiểm (8 Trạm)
              {isAllComplete && <span className="w-2 h-2 rounded-full bg-amber-300 animate-ping" />}
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('stations')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'stations'
                  ? 'bg-[#B35C44] text-white shadow-xs'
                  : 'text-[#555047] hover:text-[#2F2F2F]'
              }`}
            >
              <FileCheck className="w-3.5 h-3.5" />
              Chứng Nhận Từng Trạm ({completedCount}/8)
            </button>
          </div>

          <button
            type="button"
            onClick={onOpenNotebook}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#FAF8F5] hover:bg-[#EFECE6] border border-[#DDD5C7] text-[#B35C44] text-xs font-bold transition-colors shadow-2xs cursor-pointer"
          >
            <BookOpen className="w-4 h-4" />
            Sổ Hành Trình ({completedCount}/8)
          </button>
        </div>

        {/* TAB 1: GRAND EXPLORER CERTIFICATE (8 STATIONS) */}
        {activeTab === 'grand' && (
          <div className="space-y-6">
            
            {/* If All 8 Stations Completed: Show Grand Victory Banner & Certificate */}
            {isAllComplete ? (
              <>
                {/* Victory Celebration Scene Artwork */}
                <div className="bg-[#FAF8F5] p-6 rounded-2xl border border-[#E3DCD2] shadow-sm space-y-4">
                  <div className="text-center max-w-2xl mx-auto space-y-2">
                    <span className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-widest text-[#B35C44] bg-[#FAF2EB] px-3 py-1 rounded-full border border-[#B35C44]/20">
                      <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" /> Cấp Bậc Tối Cao: Nhà Thám Hiểm Văn Hóa Dân Tộc
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#2F2F2F]">
                      Chúc Mừng Bạn Đã Trở Thành Nhà Thám Hiểm Văn Hóa Dân Tộc Cơ Tu!
                    </h2>
                    <p className="text-xs sm:text-sm text-[#555047] leading-relaxed">
                      Cộng đồng buôn làng, Già làng Y Kông và Chú Bh’ling Avel trân trọng ghi nhận tinh thần học tập xuất sắc, hoàn thành trọn vẹn 8 trạm tri thức và thể hiện lòng tự hào, tình yêu sâu sắc đối với di sản văn hóa Cơ Tu.
                    </p>
                  </div>

                  <div className="max-w-4xl mx-auto rounded-2xl overflow-hidden border border-[#E3DCD2] shadow-lg bg-white">
                    <CulturalImage
                      asset={IMAGE_ASSETS.victoryCommunity}
                      priority={true}
                      className="w-full"
                    />
                  </div>
                </div>

                {/* Digital Certificate Preview Card */}
                <div className="bg-[#FAF8F5] p-6 sm:p-8 rounded-2xl border border-[#E3DCD2] shadow-sm space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#DDD5C7]">
                    <div>
                      <h3 className="text-lg font-serif font-bold text-[#2F2F2F] flex items-center gap-2">
                        <Award className="w-5 h-5 text-[#D4AF37]" />
                        Giấy Chứng Nhận Nhà Thám Hiểm Văn Hóa Dân Tộc
                      </h3>
                      <p className="text-xs text-[#736B60]">
                        Định dạng chuẩn A4 ngang độ nét cao (1920x1080), do tập thể Lớp 9A2 - Trường FPT Schools & Hội đồng Di sản chứng thực.
                      </p>
                    </div>

                    <button
                      type="button"
                      id="btn-download-grand-cert"
                      onClick={drawAndDownloadGrandCertificate}
                      disabled={isExportingGrand}
                      className="px-6 py-3 bg-gradient-to-r from-[#B35C44] to-[#964732] hover:from-[#C5664E] hover:to-[#B35C44] text-white font-bold text-xs sm:text-sm rounded-xl shadow-xs flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-50 cursor-pointer"
                    >
                      <Download className="w-4 h-4" />
                      {isExportingGrand ? 'Đang xuất PNG...' : 'Tải Giấy Chứng Nhận Nhà Thám Hiểm (PNG)'}
                    </button>
                  </div>

                  {/* Rendered HTML Certificate Preview */}
                  <div
                    id="certificate-frame"
                    className="w-full max-w-3xl mx-auto p-8 sm:p-12 rounded-2xl bg-[#FAF8F5] text-[#2F2F2F] border-8 border-[#2D4232] shadow-xl relative overflow-hidden ring-4 ring-[#D4AF37]/40"
                  >
                    {/* Corner Badges */}
                    <div className="absolute top-3 left-3 w-4 h-4 rounded-full bg-[#D4AF37]" />
                    <div className="absolute top-3 right-3 w-4 h-4 rounded-full bg-[#D4AF37]" />
                    <div className="absolute bottom-3 left-3 w-4 h-4 rounded-full bg-[#D4AF37]" />
                    <div className="absolute bottom-3 right-3 w-4 h-4 rounded-full bg-[#D4AF37]" />

                    {/* School & Class Header Badge */}
                    <div className="flex flex-col items-center justify-center mb-3">
                      <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-xl border border-[#DDD5C7] shadow-2xs">
                        <FptSchoolLogo variant="compact" className="h-6 w-auto" />
                        <span className="text-xs font-black text-[#F37021] uppercase font-sans">
                          FPT SCHOOLS
                        </span>
                        <span className="text-xs font-bold text-[#0066B2] border-l border-[#DDD5C7] pl-2">
                          LỚP 9A2
                        </span>
                      </div>
                      <span className="text-[10px] font-bold text-[#0066B2] italic mt-1">
                        Trải nghiệm để trưởng thành
                      </span>
                    </div>

                    <div className="text-center space-y-3">
                      <span className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-[#B35C44] block">
                        GIÁO DỤC DI SẢN VĂN HÓA CƠ TU MIỀN TRUNG
                      </span>
                      <h1 className="text-2xl sm:text-4xl font-serif font-bold text-[#2F2F2F]">
                        GIẤY CHỨNG NHẬN
                      </h1>
                      <h2 className="text-base sm:text-xl font-serif font-bold italic text-[#B35C44]">
                        “NHÀ THÁM HIỂM VĂN HÓA DÂN TỘC CƠ TU”
                      </h2>
                      <div className="w-36 h-0.5 bg-[#D4AF37] mx-auto my-2" />
                    </div>

                    <div className="text-center my-6 space-y-2">
                      <p className="text-xs text-[#736B60]">Trân trọng vinh danh học sinh:</p>
                      <h3 className="text-xl sm:text-3xl font-serif font-bold text-[#2F2F2F] tracking-wide">
                        {studentName.toUpperCase()}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#555047] max-w-lg mx-auto leading-relaxed">
                        Đã hoàn thành xuất sắc trọn vẹn 8 Trạm khám phá tri thức di sản tại <strong>Làng Cơ Tu Số</strong>, thu thập đủ Bộ 8 Dấu ấn Khắc gỗ và vinh dự đạt danh hiệu cao quý <strong>Nhà Thám Hiểm Văn Hóa Dân Tộc</strong>.
                      </p>
                    </div>

                    {/* 8 Badges Mini Strip */}
                    <div className="py-2.5 px-3 bg-[#F5F2ED] rounded-xl border border-[#E3DCD2] flex flex-wrap items-center justify-center gap-2 text-[10px] text-[#7A4E38] font-bold mb-4">
                      {CULTURAL_STAMPS.map((st, sIdx) => (
                        <span key={st.id} className="inline-flex items-center gap-1 bg-white px-2 py-1 rounded-md border border-[#DDD5C7]">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          Trạm 0{sIdx + 1}: {st.title}
                        </span>
                      ))}
                    </div>

                    <div className="pt-4 border-t border-[#E3DCD2] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#736B60]">
                      <div className="text-left">
                        <p>Mã chứng nhận: <strong className="text-[#2F2F2F]">{certCode}</strong></p>
                        <p>Ngày cấp: {issueDate}</p>
                        <p className="text-[10px] text-[#B35C44] font-semibold mt-0.5">
                          Đơn vị sáng tạo: Lớp 9A2 - FPT Schools
                        </p>
                      </div>

                      <div className="text-center sm:text-right">
                        <p className="font-bold text-[#B35C44]">HỘI ĐỒNG DI SẢN LÀNG CƠ TU SỐ</p>
                        <p className="italic font-serif font-bold text-sm text-[#2F2F2F] mt-1">
                          Già làng Y Kông & Chú Bh’ling Avel
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              /* If Not Yet Completed All 8 Stations: Show Incomplete State with Remaining Stations */
              <div className="bg-[#FAF8F5] p-6 sm:p-8 rounded-2xl border border-[#E3DCD2] shadow-sm space-y-6">
                <div className="text-center max-w-xl mx-auto space-y-3">
                  <div className="w-16 h-16 rounded-2xl bg-[#EAE4D9] text-[#B35C44] flex items-center justify-center mx-auto text-2xl font-serif border border-[#D5CCBC]">
                    <Lock className="w-8 h-8 text-[#7A4E38]" />
                  </div>
                  <h2 className="text-2xl font-serif font-bold text-[#2F2F2F]">
                    Giấy Chứng Nhận Nhà Thám Hiểm Văn Hóa Dân Tộc
                  </h2>
                  <p className="text-xs sm:text-sm text-[#555047] leading-relaxed">
                    Bạn đã hoàn thành <strong>{completedCount}/8 Trạm</strong>. Để được cấp Giấy chứng nhận <strong>Nhà Thám Hiểm Văn Hóa Dân Tộc</strong> cao quý nhất, bạn hãy hoàn thành nốt <strong>{8 - completedCount} trạm</strong> còn lại dưới đây nhé!
                  </p>
                  
                  {/* Progress bar */}
                  <div className="w-full bg-[#EAE4D9] h-3 rounded-full overflow-hidden border border-[#D5CCBC]">
                    <div
                      className="bg-gradient-to-r from-[#B35C44] to-[#D4AF37] h-full transition-all duration-500 rounded-full"
                      style={{ width: `${(completedCount / 8) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Remaining Stations Grid */}
                <div className="space-y-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#B35C44]">
                    Danh sách các trạm cần hoàn thành ({8 - completedCount} trạm chưa xong):
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                    {STATIONS_DATA.map((st) => {
                      const isDone = progress.completedStations.includes(st.id);
                      return (
                        <div
                          key={st.id}
                          className={`p-3.5 rounded-xl border flex flex-col justify-between gap-3 ${
                            isDone
                              ? 'bg-emerald-50/60 border-emerald-300'
                              : 'bg-white border-[#DDD5C7]'
                          }`}
                        >
                          <div>
                            <div className="flex items-center justify-between">
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#EAE4D9] text-[#7A4E38]">
                                Trạm 0{st.order}
                              </span>
                              {isDone ? (
                                <span className="text-[10px] font-bold text-emerald-700 flex items-center gap-0.5">
                                  <CheckCircle2 className="w-3 h-3" /> Đã xong
                                </span>
                              ) : (
                                <span className="text-[10px] text-[#9E9589] italic">Chưa hoàn thành</span>
                              )}
                            </div>
                            <h4 className="text-xs font-bold text-[#2F2F2F] mt-1.5 leading-snug">
                              {st.title}
                            </h4>
                          </div>

                          {onSelectStation && (
                            <button
                              type="button"
                              onClick={() => onSelectStation(st.id)}
                              className={`w-full py-1.5 px-2 rounded-lg text-xs font-bold transition-colors flex items-center justify-center gap-1 cursor-pointer ${
                                isDone
                                  ? 'bg-[#FAF8F5] hover:bg-[#EFECE6] border border-[#DDD5C7] text-[#2F2F2F]'
                                  : 'bg-[#B35C44] hover:bg-[#964732] text-white shadow-xs'
                              }`}
                            >
                              {isDone ? 'Xem lại trạm' : 'Khám phá ngay'}
                              <ArrowRight className="w-3 h-3" />
                            </button>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Switch to Individual Station Certificates */}
                <div className="p-4 bg-[#FAF2EB] rounded-xl border border-[#B35C44]/30 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="text-xs text-[#7A3E2C]">
                    💡 <strong>Bạn có biết?</strong> Bạn đã có thể xem và tải <strong>Giấy chứng nhận của {completedCount} trạm</strong> mà bạn đã hoàn thành!
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveTab('stations')}
                    className="px-4 py-2 bg-[#B35C44] text-white text-xs font-bold rounded-xl shadow-xs hover:bg-[#964732] transition-colors whitespace-nowrap cursor-pointer"
                  >
                    Xem Chứng Nhận Từng Trạm ({completedCount}/8)
                  </button>
                </div>
              </div>
            )}

          </div>
        )}

        {/* TAB 2: INDIVIDUAL 8 STATION CERTIFICATES */}
        {activeTab === 'stations' && (
          <div className="bg-[#FAF8F5] p-6 sm:p-8 rounded-2xl border border-[#E3DCD2] shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#DDD5C7]">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#B35C44]">
                  Bộ Sưu Tập Giấy Chứng Nhận Từng Trạm
                </span>
                <h3 className="text-xl font-serif font-bold text-[#2F2F2F] mt-0.5">
                  8 Giấy Chứng Nhận Thành Tích Theo Từng Nội Dung Di Sản
                </h3>
                <p className="text-xs text-[#736B60] mt-0.5">
                  Mỗi trạm hoàn thành sẽ cấp một giấy chứng nhận với danh hiệu chuyên biệt, có thể xem và tải ảnh PNG riêng biệt.
                </p>
              </div>

              <span className="px-3.5 py-1.5 rounded-xl bg-[#EAE4D9] text-[#7A4E38] text-xs font-bold border border-[#D5CCBC] self-start sm:self-auto">
                Đã đạt được {completedCount} / 8 Giấy chứng nhận
              </span>
            </div>

            {/* 8 Station Certificates Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {STATIONS_DATA.map((st) => {
                const isCompleted = progress.completedStations.includes(st.id);
                const titleMeta = STATION_TITLES[st.id] || {
                  title: `Chuyên Viên Khám Phá Trạm 0${st.order}`,
                  badge: st.stampName,
                  description: st.summary,
                };

                return (
                  <div
                    key={st.id}
                    className={`p-5 rounded-2xl border transition-all flex flex-col justify-between gap-4 ${
                      isCompleted
                        ? 'bg-white border-[#B35C44]/40 shadow-xs hover:shadow-md'
                        : 'bg-[#F5F2ED] border-[#DDD5C7] opacity-75'
                    }`}
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-[#EAE4D9] text-[#7A4E38]">
                          Trạm 0{st.order} • {st.category}
                        </span>
                        {isCompleted ? (
                          <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full border border-emerald-300 flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Đã cấp chứng nhận
                          </span>
                        ) : (
                          <span className="text-xs font-medium text-[#8C8478] bg-[#EAE4D9] px-2.5 py-0.5 rounded-full flex items-center gap-1">
                            <Lock className="w-3 h-3" /> Chưa hoàn thành
                          </span>
                        )}
                      </div>

                      <div>
                        <h4 className="text-base font-serif font-bold text-[#2F2F2F]">
                          {st.title}
                        </h4>
                        <p className="text-xs font-bold text-[#B35C44] italic mt-0.5">
                          “{titleMeta.title}”
                        </p>
                      </div>

                      <p className="text-xs text-[#555047] leading-relaxed line-clamp-2">
                        {titleMeta.description}
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="pt-3 border-t border-[#DDD5C7] flex items-center justify-between gap-2">
                      <span className="text-[11px] text-[#736B60]">
                        Dấu ấn: <strong>{st.stampName}</strong>
                      </span>

                      {isCompleted ? (
                        <button
                          type="button"
                          onClick={() => setSelectedStationCert(st)}
                          className="px-4 py-2 bg-[#B35C44] hover:bg-[#964732] text-white text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          Xem & Tải Chứng Nhận Trạm
                        </button>
                      ) : (
                        onSelectStation && (
                          <button
                            type="button"
                            onClick={() => onSelectStation(st.id)}
                            className="px-3.5 py-1.5 bg-[#EAE4D9] hover:bg-[#DDD5C7] text-[#2F2F2F] text-xs font-bold rounded-xl transition-colors flex items-center gap-1 cursor-pointer"
                          >
                            Hoàn thành trạm <ArrowRight className="w-3 h-3" />
                          </button>
                        )
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Station Certificate Modal Popup when requested */}
        {selectedStationCert && (
          <StationCertificateModal
            station={selectedStationCert}
            progress={progress}
            isOpen={!!selectedStationCert}
            onClose={() => setSelectedStationCert(null)}
            onViewAllCertificates={() => {
              setSelectedStationCert(null);
              setActiveTab('grand');
            }}
          />
        )}

      </div>
    </div>
  );
};
