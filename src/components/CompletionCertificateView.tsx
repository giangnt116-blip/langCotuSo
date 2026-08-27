import React, { useRef, useState, useEffect } from 'react';
import { UserProgress } from '../types';
import { IMAGE_ASSETS } from '../data/imageAssets';
import { CulturalImage } from './CulturalImage';
import { FptSchoolLogo } from './FptSchoolLogo';
import { Award, Download, ArrowLeft, CheckCircle2, RotateCcw, Share2, Sparkles, BookOpen, GraduationCap } from 'lucide-react';
import confetti from 'canvas-confetti';

interface CompletionCertificateViewProps {
  progress: UserProgress;
  onBackToMap: () => void;
  onOpenNotebook: () => void;
}

export const CompletionCertificateView: React.FC<CompletionCertificateViewProps> = ({
  progress,
  onBackToMap,
  onOpenNotebook,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isExporting, setIsExporting] = useState(false);

  const studentName = progress.studentName.trim() || 'Học sinh khám phá';
  const issueDate = new Date().toLocaleDateString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
  const certCode = progress.certificateCode || `CT-9A2-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

  useEffect(() => {
    // Fire celebratory confetti on view entry
    try {
      confetti({
        particleCount: 70,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#B35C44', '#F37021', '#2D4232', '#FAF8F5'],
      });
    } catch {
      // ignore
    }
  }, []);

  const drawAndDownloadCertificate = () => {
    setIsExporting(true);
    const canvas = document.createElement('canvas');
    canvas.width = 1920;
    canvas.height = 1080;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Background paper cream
    ctx.fillStyle = '#FAF8F5';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Subtle paper texture pattern
    ctx.fillStyle = '#F0ECE4';
    for (let i = 0; i < canvas.width; i += 40) {
      for (let j = 0; j < canvas.height; j += 40) {
        if ((i + j) % 80 === 0) {
          ctx.fillRect(i, j, 20, 20);
        }
      }
    }

    // Outer Forest Frame
    ctx.strokeStyle = '#2D4232';
    ctx.lineWidth = 14;
    ctx.strokeRect(50, 50, canvas.width - 100, canvas.height - 100);

    // Inner Terracotta Frame
    ctx.strokeStyle = '#B35C44';
    ctx.lineWidth = 3;
    ctx.strokeRect(70, 70, canvas.width - 140, canvas.height - 140);

    // Corner decorative geometric motifs
    const corners = [
      [85, 85],
      [canvas.width - 85, 85],
      [85, canvas.height - 85],
      [canvas.width - 85, canvas.height - 85],
    ];
    ctx.fillStyle = '#B35C44';
    corners.forEach(([x, y]) => {
      ctx.beginPath();
      ctx.arc(x, y, 10, 0, Math.PI * 2);
      ctx.fill();
    });

    // FPT SCHOOLS Logo Bars on Top Canvas
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

    // Header Title
    ctx.textAlign = 'center';
    ctx.fillStyle = '#F37021';
    ctx.font = 'bold 24px sans-serif';
    ctx.fillText('FPT SCHOOLS • LỚP 9A2 - TRẢI NGHIỆM ĐỂ TRƯỞNG THÀNH', canvas.width / 2, 170);

    ctx.fillStyle = '#B35C44';
    ctx.font = 'bold 32px serif';
    ctx.fillText('GIÁO DỤC DI SẢN VĂN HÓA CƠ TU MIỀN TRUNG', canvas.width / 2, 218);

    ctx.fillStyle = '#2F2F2F';
    ctx.font = 'bold 64px serif';
    ctx.fillText('GIẤY CHỨNG NHẬN', canvas.width / 2, 295);

    ctx.fillStyle = '#B35C44';
    ctx.font = 'italic bold 44px serif';
    ctx.fillText('“NGƯỜI BẠN VĂN HÓA CƠ TU”', canvas.width / 2, 365);

    // Divider
    ctx.strokeStyle = '#DDD5C7';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2 - 350, 395);
    ctx.lineTo(canvas.width / 2 + 350, 395);
    ctx.stroke();

    // Body Text
    ctx.fillStyle = '#555047';
    ctx.font = '28px sans-serif';
    ctx.fillText('Chứng nhận em:', canvas.width / 2, 460);

    // Student Name
    ctx.fillStyle = '#2F2F2F';
    ctx.font = 'bold 56px serif';
    ctx.fillText(studentName.toUpperCase(), canvas.width / 2, 530);

    ctx.fillStyle = '#555047';
    ctx.font = '27px sans-serif';
    ctx.fillText(
      'Đã hoàn thành xuất sắc 8 Trạm khám phá tri thức di sản tại Làng Cơ Tu Số,',
      canvas.width / 2,
      605
    );
    ctx.fillText(
      'thu thập trọn vẹn Bộ 8 Dấu ấn Khắc gỗ và thể hiện tinh thần tôn trọng sâu sắc văn hóa đại ngàn.',
      canvas.width / 2,
      650
    );

    // 8 Badges summary text row
    ctx.fillStyle = '#B35C44';
    ctx.font = 'bold 22px sans-serif';
    ctx.fillText(
      '• Không gian cư trú  • Nhà Gươl  • Dệt Zèng  • Tân’tung Da’dá  • Cồng chiêng  • Nói lý Hát lý  • Điêu khắc  • Ẩm thực •',
      canvas.width / 2,
      720
    );

    // Creator Attribution
    ctx.fillStyle = '#2D4232';
    ctx.font = 'bold 23px sans-serif';
    ctx.fillText('SẢN PHẨM HỌC TẬP SỐ DO TẬP THỂ HỌC SINH LỚP 9A2 – TRƯỜNG FPT THỰC HIỆN', canvas.width / 2, 780);

    // Signature and Date Section
    ctx.textAlign = 'left';
    ctx.fillStyle = '#555047';
    ctx.font = '24px sans-serif';
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
    a.download = `Chung-nhan-Co-Tu-9A2-FPT-${studentName.replace(/\s+/g, '-')}.png`;
    a.click();
    setIsExporting(false);
  };

  return (
    <div id="completion-view" className="w-full bg-[#F5F2ED] text-[#2F2F2F] min-h-[calc(100vh-4rem)] py-8 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Top Bar */}
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={onBackToMap}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#FAF8F5] hover:bg-[#EFECE6] border border-[#DDD5C7] text-[#2F2F2F] text-xs font-bold transition-colors shadow-2xs cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Quay lại Bản đồ làng
          </button>

          <button
            type="button"
            onClick={onOpenNotebook}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#FAF8F5] hover:bg-[#EFECE6] border border-[#DDD5C7] text-[#B35C44] text-xs font-bold transition-colors shadow-2xs cursor-pointer"
          >
            <BookOpen className="w-4 h-4" />
            Xem Sổ Hành Trình (Đủ 8 Dấu ấn)
          </button>
        </div>

        {/* Victory Celebration Scene Artwork (Mandated Y4-13) */}
        <div className="bg-[#FAF8F5] p-6 rounded-2xl border border-[#E3DCD2] shadow-sm space-y-4">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#B35C44]">
              Hoàn thành xuất sắc 8 Trạm học tập
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#2F2F2F]">
              Chúc Mừng Bạn Đã Trở Thành Người Bạn Văn Hóa Cơ Tu!
            </h2>
            <p className="text-xs sm:text-sm text-[#555047]">
              Cộng đồng buôn làng và Chú Bh’ling Avel trân trọng ghi nhận tinh thần học tập nghiêm túc, sự say mê và lòng tôn trọng di sản đại ngàn của bạn.
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

        {/* Digital Certificate Preview Card (Mandated Y4-14) */}
        <div className="bg-[#FAF8F5] p-6 sm:p-8 rounded-2xl border border-[#E3DCD2] shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#DDD5C7]">
            <div>
              <h3 className="text-lg font-serif font-bold text-[#2F2F2F]">
                Bản xem trước Giấy Chứng Nhận Kỹ Thuật Số
              </h3>
              <p className="text-xs text-[#736B60]">
                Định dạng A4 ngang độ nét cao, do tập thể Lớp 9A2 - Trường FPT Schools cấp chứng thực.
              </p>
            </div>

            <button
              type="button"
              id="btn-download-certificate"
              onClick={drawAndDownloadCertificate}
              disabled={isExporting}
              className="px-6 py-3 bg-gradient-to-r from-[#B35C44] to-[#964732] hover:from-[#C5664E] hover:to-[#B35C44] text-white font-bold text-xs sm:text-sm rounded-xl shadow-xs flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-50 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              {isExporting ? 'Đang xuất PNG...' : 'Tải Giấy Chứng Nhận (PNG)'}
            </button>
          </div>

          {/* Rendered HTML Certificate Preview */}
          <div
            id="certificate-frame"
            className="w-full max-w-3xl mx-auto p-8 sm:p-12 rounded-2xl bg-[#FAF8F5] text-[#2F2F2F] border-8 border-[#2D4232] shadow-xl relative overflow-hidden"
          >
            {/* Corner Badges */}
            <div className="absolute top-3 left-3 w-4 h-4 rounded-full bg-[#B35C44]" />
            <div className="absolute top-3 right-3 w-4 h-4 rounded-full bg-[#B35C44]" />
            <div className="absolute bottom-3 left-3 w-4 h-4 rounded-full bg-[#B35C44]" />
            <div className="absolute bottom-3 right-3 w-4 h-4 rounded-full bg-[#B35C44]" />

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
                “NGƯỜI BẠN VĂN HÓA CƠ TU”
              </h2>
              <div className="w-32 h-0.5 bg-[#CFC5B6] mx-auto my-2" />
            </div>

            <div className="text-center my-6 space-y-2">
              <p className="text-xs text-[#736B60]">Chứng nhận học sinh:</p>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#2F2F2F] tracking-wide">
                {studentName.toUpperCase()}
              </h3>
              <p className="text-xs sm:text-sm text-[#555047] max-w-lg mx-auto leading-relaxed">
                Đã hoàn thành xuất sắc 8 Trạm khám phá tri thức di sản tại <strong>Làng Cơ Tu Số</strong>, thu thập trọn vẹn Bộ 8 Dấu ấn Khắc gỗ và thể hiện tinh thần tôn trọng sâu sắc văn hóa đại ngàn.
              </p>
            </div>

            <div className="pt-4 border-t border-[#E3DCD2] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#736B60]">
              <div>
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

      </div>
    </div>
  );
};
