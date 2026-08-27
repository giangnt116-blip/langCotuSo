import React, { useRef, useState, useEffect } from 'react';
import { UserProgress } from '../types';
import { IMAGE_ASSETS } from '../data/imageAssets';
import { CulturalImage } from './CulturalImage';
import { Award, Download, ArrowLeft, CheckCircle2, RotateCcw, Share2, Sparkles, BookOpen } from 'lucide-react';
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
  const certCode = progress.certificateCode || `CT-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

  useEffect(() => {
    // Fire celebratory confetti on view entry
    try {
      confetti({
        particleCount: 70,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#B85D38', '#E2A76F', '#2D6A4F', '#F4E8DB'],
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
    ctx.fillStyle = '#FAF6EE';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Subtle paper texture pattern
    ctx.fillStyle = '#F4EDE0';
    for (let i = 0; i < canvas.width; i += 40) {
      for (let j = 0; j < canvas.height; j += 40) {
        if ((i + j) % 80 === 0) {
          ctx.fillRect(i, j, 20, 20);
        }
      }
    }

    // Outer Timber Frame
    ctx.strokeStyle = '#6A3B22';
    ctx.lineWidth = 14;
    ctx.strokeRect(50, 50, canvas.width - 100, canvas.height - 100);

    // Inner Subtle Frame
    ctx.strokeStyle = '#B85D38';
    ctx.lineWidth = 3;
    ctx.strokeRect(70, 70, canvas.width - 140, canvas.height - 140);

    // Corner decorative geometric motifs (neutral)
    const corners = [
      [85, 85],
      [canvas.width - 85, 85],
      [85, canvas.height - 85],
      [canvas.width - 85, canvas.height - 85],
    ];
    ctx.fillStyle = '#8E4423';
    corners.forEach(([x, y]) => {
      ctx.beginPath();
      ctx.arc(x, y, 10, 0, Math.PI * 2);
      ctx.fill();
    });

    // Header Title
    ctx.textAlign = 'center';
    ctx.fillStyle = '#8E4423';
    ctx.font = 'bold 36px serif';
    ctx.fillText('GIÁO DỤC DI SẢN VĂN HÓA CƠ TU MIỀN TRUNG', canvas.width / 2, 160);

    ctx.fillStyle = '#2A1F18';
    ctx.font = 'bold 64px serif';
    ctx.fillText('GIẤY CHỨNG NHẬN', canvas.width / 2, 250);

    ctx.fillStyle = '#B85D38';
    ctx.font = 'italic bold 42px serif';
    ctx.fillText('“NGƯỜI BẠN VĂN HÓA CƠ TU”', canvas.width / 2, 320);

    // Divider
    ctx.strokeStyle = '#D4A373';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2 - 300, 355);
    ctx.lineTo(canvas.width / 2 + 300, 355);
    ctx.stroke();

    // Body Text
    ctx.fillStyle = '#4A3D33';
    ctx.font = '28px sans-serif';
    ctx.fillText('Chứng nhận em:', canvas.width / 2, 420);

    // Student Name
    ctx.fillStyle = '#1D140F';
    ctx.font = 'bold 54px serif';
    ctx.fillText(studentName.toUpperCase(), canvas.width / 2, 490);

    ctx.fillStyle = '#5A4A3D';
    ctx.font = '26px sans-serif';
    ctx.fillText(
      'Đã hoàn thành xuất sắc 8 Trạm khám phá tri thức di sản tại Làng Cơ Tu Số,',
      canvas.width / 2,
      560
    );
    ctx.fillText(
      'thu thập trọn vẹn Bộ 8 Dấu ấn Khắc gỗ và thể hiện tinh thần tôn trọng văn hóa đại ngàn.',
      canvas.width / 2,
      605
    );

    // 8 Badges summary text row
    ctx.fillStyle = '#8E4423';
    ctx.font = 'bold 22px sans-serif';
    ctx.fillText(
      '• Không gian cư trú  • Nhà Gươl  • Dệt Zèng  • Tân’tung Da’dá  • Cồng chiêng  • Nói lý Hát lý  • Điêu khắc  • Ẩm thực •',
      canvas.width / 2,
      680
    );

    // Signature and Date Section
    ctx.textAlign = 'left';
    ctx.fillStyle = '#4A3D33';
    ctx.font = '24px sans-serif';
    ctx.fillText(`Mã chứng nhận: ${certCode}`, 160, 850);
    ctx.fillText(`Ngày cấp: ${issueDate}`, 160, 890);
    ctx.fillText(`Nền tảng: Làng Cơ Tu Số – Di sản Đại ngàn`, 160, 930);

    ctx.textAlign = 'right';
    ctx.fillText('ĐẠI DIỆN HỘI ĐỒNG DI SẢN LÀNG', canvas.width - 160, 850);
    ctx.fillStyle = '#8E4423';
    ctx.font = 'italic bold 32px serif';
    ctx.fillText('Già làng Y Kông & Chú Bh’ling Avel', canvas.width - 160, 910);
    ctx.fillStyle = '#6E5C4E';
    ctx.font = '20px sans-serif';
    ctx.fillText('(Ký tên và xác thực số)', canvas.width - 160, 945);

    // Export to download
    const dataUrl = canvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = `Chung-nhan-Co-Tu-${studentName.replace(/\s+/g, '-')}.png`;
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
                Định dạng A4 ngang độ nét cao, có thể tải về máy để in hoặc lưu niệm học tập.
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
