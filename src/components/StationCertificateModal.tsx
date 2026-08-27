import React, { useState, useEffect } from 'react';
import { Station, UserProgress } from '../types';
import { FptSchoolLogo } from './FptSchoolLogo';
import { CULTURAL_STAMPS } from '../data/culturalData';
import { Award, Download, X, CheckCircle2, Sparkles, BookOpen, Share2 } from 'lucide-react';
import confetti from 'canvas-confetti';

interface StationCertificateModalProps {
  station: Station;
  progress: UserProgress;
  isOpen: boolean;
  onClose: () => void;
  onViewAllCertificates?: () => void;
}

// Cultural titles corresponding to each of the 8 stations
export const STATION_TITLES: Record<string, { title: string; badge: string; description: string }> = {
  residence: {
    title: 'Nhà Khám Phá Không Gian Cư Trú Cơ Tu',
    badge: 'Dấu ấn Đại Ngàn',
    description: 'Chứng nhận đã nắm vững tri thức về cấu trúc làng tròn (Vel), kiến trúc nhà sàn, hệ thống máng nước T’roong đác và triết lý sống hòa hợp, bảo vệ rừng thiêng Trường Sơn.',
  },
  guol: {
    title: 'Sứ Giả Tìm Hiểu Trái Tim Buôn Làng – Nhà Gươl',
    badge: 'Dấu ấn Nhà Gươl',
    description: 'Chứng nhận đã thấu hiểu giá trị kiến trúc cột cái (Zrâm Gươl), biểu tượng đôi chim Tring linh thiêng và vai trò trung tâm sinh hoạt tâm linh, cộng đồng của Nhà Gươl.',
  },
  weaving: {
    title: 'Nghệ Nhân Nhí Tìm Hiểu Nghệ Thuật Dệt Zèng',
    badge: 'Dấu ấn Dệt Zèng',
    description: 'Chứng nhận đã am hiểu nguyên lý khung dệt lưng (Back-strap loom), kỹ thuật đan luồn hạt cườm chì và ý nghĩa các hoa văn quả trám di sản văn hóa quốc gia.',
  },
  dance: {
    title: 'Đại Sứ Vũ Điệu Dâng Trời Tân’tung Da’dá',
    badge: 'Dấu ấn Tân’tung Da’dá',
    description: 'Chứng nhận đã cảm thụ trọn vẹn vẻ đẹp dũng mãnh của nam giới và nét thanh thoát dâng Mẹ Thiên Nhiên của nữ giới trong vũ điệu vòng tròn di sản.',
  },
  music: {
    title: 'Người Giữ Nhịp Âm Vang Cồng Chiêng Đại Ngàn',
    badge: 'Dấu ấn Cồng Chiêng',
    description: 'Chứng nhận đã nhận diện cấu tạo đôi Chiêng Mẹ (T’roong) - Chiêng Cha (Cheng), Trống K’tu (S’gơr) và nhịp điệu gắn kết linh hồn buôn làng.',
  },
  speaking: {
    title: 'Sứ Giả Nghệ Thuật Ứng Đối Nói Lý Hát Lý',
    badge: 'Dấu ấn Lời Hay Ý Đẹp',
    description: 'Chứng nhận đã thấu hiểu giá trị nhân văn sâu sắc, nghệ thuật ẩn dụ ví von và vai trò hòa giải, giáo dục của kho tàng Nói lý – Hát lý (Bh’nooch).',
  },
  woodcraft: {
    title: 'Nhà Khám Phá Nghệ Thuật Điêu Khắc & Đan Lát',
    badge: 'Dấu ấn Bàn Tay Vàng',
    description: 'Chứng nhận đã khám phá nghệ thuật tạc tượng gỗ dân gian mộc mạc và kỹ thuật đan Gùi Đao 3 ngăn (Pa-nhưng) đỉnh cao của người Cơ Tu.',
  },
  dailylife: {
    title: 'Đại Sứ Văn Hóa Ẩm Thực & Tri Thức Đại Ngàn',
    badge: 'Dấu ấn Hương Vị Rừng',
    description: 'Chứng nhận đã hiểu rõ nghệ thuật nướng gián tiếp trong ống tre (Cơm lam, Zơră), ý nghĩa bánh A-quát và tri thức dân gian bảo tồn tài nguyên rừng bền vững.',
  },
};

export const StationCertificateModal: React.FC<StationCertificateModalProps> = ({
  station,
  progress,
  isOpen,
  onClose,
  onViewAllCertificates,
}) => {
  const [isExporting, setIsExporting] = useState(false);

  const studentName = progress.studentName.trim() || 'Học sinh khám phá';
  const issueDate = new Date().toLocaleDateString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
  const certCode = `CT-T0${station.order}-${Math.random().toString(36).substring(2, 7).toUpperCase()}`;
  const stationMeta = STATION_TITLES[station.id] || {
    title: `Chuyên Viên Khám Phá Trạm 0${station.order}`,
    badge: station.stampName,
    description: `Đã hoàn thành xuất sắc các nội dung học tập và thử thách tại Trạm 0${station.order}: ${station.title}.`,
  };

  useEffect(() => {
    if (isOpen) {
      try {
        confetti({
          particleCount: 50,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#B35C44', '#D4AF37', '#2D4232', '#FAF8F5'],
        });
      } catch {
        // ignore
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const downloadStationCertificatePNG = () => {
    setIsExporting(true);
    const canvas = document.createElement('canvas');
    canvas.width = 1920;
    canvas.height = 1080;
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      setIsExporting(false);
      return;
    }

    // 1. Background paper cream
    ctx.fillStyle = '#FAF8F5';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Subtle paper grid pattern
    ctx.fillStyle = '#F0ECE4';
    for (let i = 0; i < canvas.width; i += 40) {
      for (let j = 0; j < canvas.height; j += 40) {
        if ((i + j) % 80 === 0) {
          ctx.fillRect(i, j, 20, 20);
        }
      }
    }

    // 2. Outer Border (Terracotta)
    ctx.strokeStyle = '#B35C44';
    ctx.lineWidth = 14;
    ctx.strokeRect(50, 50, canvas.width - 100, canvas.height - 100);

    // Inner Border (Gold Ochre)
    ctx.strokeStyle = '#D4AF37';
    ctx.lineWidth = 3;
    ctx.strokeRect(70, 70, canvas.width - 140, canvas.height - 140);

    // Corner decorative accents
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

    // 3. FPT SCHOOLS Logo Bars on Top
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

    // 4. Header Titles
    ctx.textAlign = 'center';
    ctx.fillStyle = '#F37021';
    ctx.font = 'bold 22px sans-serif';
    ctx.fillText('FPT SCHOOLS • LỚP 9A2 - TRẢI NGHIỆM ĐỂ TRƯỞNG THÀNH', canvas.width / 2, 170);

    ctx.fillStyle = '#B35C44';
    ctx.font = 'bold 28px serif';
    ctx.fillText('GIÁO DỤC DI SẢN VĂN HÓA CƠ TU MIỀN TRUNG', canvas.width / 2, 215);

    ctx.fillStyle = '#2F2F2F';
    ctx.font = 'bold 54px serif';
    ctx.fillText(`GIẤY CHỨNG NHẬN HOÀN THÀNH TRẠM 0${station.order}`, canvas.width / 2, 285);

    ctx.fillStyle = '#7A4E38';
    ctx.font = 'bold 30px serif';
    ctx.fillText(`${station.title.toUpperCase()}`, canvas.width / 2, 335);

    ctx.fillStyle = '#B35C44';
    ctx.font = 'italic bold 36px serif';
    ctx.fillText(`“${stationMeta.title}”`, canvas.width / 2, 390);

    // Divider
    ctx.strokeStyle = '#D4AF37';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2 - 350, 415);
    ctx.lineTo(canvas.width / 2 + 350, 415);
    ctx.stroke();

    // 5. Student Name Section
    ctx.fillStyle = '#555047';
    ctx.font = '26px sans-serif';
    ctx.fillText('Chứng nhận học sinh:', canvas.width / 2, 475);

    ctx.fillStyle = '#2F2F2F';
    ctx.font = 'bold 52px serif';
    ctx.fillText(studentName.toUpperCase(), canvas.width / 2, 540);

    // Description
    ctx.fillStyle = '#555047';
    ctx.font = '24px sans-serif';
    ctx.fillText(
      `Đã hoàn thành xuất sắc các nội dung học tập, thử thách và thu thập thành công`,
      canvas.width / 2,
      610
    );
    ctx.fillStyle = '#B35C44';
    ctx.font = 'bold 26px sans-serif';
    ctx.fillText(
      `[${stationMeta.badge}] tại Làng Cơ Tu Số`,
      canvas.width / 2,
      655
    );

    // Cultural description
    ctx.fillStyle = '#666157';
    ctx.font = 'italic 21px serif';
    ctx.fillText(
      `"${stationMeta.description}"`,
      canvas.width / 2,
      720
    );

    // Attribution
    ctx.fillStyle = '#2D4232';
    ctx.font = 'bold 22px sans-serif';
    ctx.fillText('SẢN PHẨM HỌC TẬP SỐ DO TẬP THỂ HỌC SINH LỚP 9A2 – TRƯỜNG FPT THỰC HIỆN', canvas.width / 2, 785);

    // 6. Signatures and Verification
    ctx.textAlign = 'left';
    ctx.fillStyle = '#555047';
    ctx.font = '22px sans-serif';
    ctx.fillText(`Mã chứng nhận: ${certCode}`, 160, 890);
    ctx.fillText(`Ngày cấp: ${issueDate}`, 160, 930);
    ctx.fillText(`Đơn vị: Lớp 9A2 – Trường FPT Schools`, 160, 970);

    ctx.textAlign = 'right';
    ctx.fillText('ĐẠI DIỆN HỘI ĐỒNG DI SẢN LÀNG', canvas.width - 160, 890);
    ctx.fillStyle = '#B35C44';
    ctx.font = 'italic bold 30px serif';
    ctx.fillText('Già làng Y Kông & Chú Bh’ling Avel', canvas.width - 160, 945);
    ctx.fillStyle = '#736B60';
    ctx.font = '19px sans-serif';
    ctx.fillText('(Ký tên và xác thực số)', canvas.width - 160, 980);

    // Export to download
    const dataUrl = canvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = `Chung-nhan-Tram-0${station.order}-${station.id}-FPT-9A2-${studentName.replace(/\s+/g, '-')}.png`;
    a.click();
    setIsExporting(false);
  };

  return (
    <div
      id="modal-station-certificate"
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#2F2F2F]/70 p-4 backdrop-blur-xs animate-in fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl max-h-[92vh] bg-[#FAF8F5] border border-[#E3DCD2] rounded-2xl flex flex-col text-[#2F2F2F] shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-4 sm:p-5 bg-[#F5F2ED] border-b border-[#E3DCD2] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#B35C44] flex items-center justify-center text-white font-serif font-bold text-lg shadow-xs">
              📜
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-serif font-bold text-[#2F2F2F]">
                  Giấy Chứng Nhận Hoàn Thành Trạm 0{station.order}
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-[#EAE4D9] text-[#7A4E38]">
                  {station.stampName}
                </span>
              </div>
              <p className="text-xs text-[#736B60]">
                Chứng nhận cấp bởi Lớp 9A2 – FPT Schools & Hội đồng Di sản Làng Cơ Tu Số
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              id="btn-close-station-cert"
              onClick={onClose}
              className="p-2 text-[#736B60] hover:text-[#2F2F2F] hover:bg-[#EFECE6] rounded-xl transition-colors cursor-pointer"
              aria-label="Đóng"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Certificate Display Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-4">
          
          {/* Certificate Frame Preview */}
          <div
            id="station-certificate-preview-box"
            className="w-full p-6 sm:p-8 rounded-2xl bg-[#FAF8F5] text-[#2F2F2F] border-4 sm:border-8 border-[#B35C44] shadow-md relative overflow-hidden text-center space-y-4"
          >
            {/* Corner Decorative Dots */}
            <div className="absolute top-2 left-2 w-3 h-3 rounded-full bg-[#D4AF37]" />
            <div className="absolute top-2 right-2 w-3 h-3 rounded-full bg-[#D4AF37]" />
            <div className="absolute bottom-2 left-2 w-3 h-3 rounded-full bg-[#D4AF37]" />
            <div className="absolute bottom-2 right-2 w-3 h-3 rounded-full bg-[#D4AF37]" />

            {/* School & Project Header */}
            <div className="flex flex-col items-center justify-center">
              <div className="flex items-center gap-2 bg-white px-3 py-1 rounded-xl border border-[#DDD5C7] shadow-2xs">
                <FptSchoolLogo variant="compact" className="h-5 w-auto" />
                <span className="text-[11px] font-black text-[#F37021] uppercase font-sans">
                  FPT SCHOOLS
                </span>
                <span className="text-[11px] font-bold text-[#0066B2] border-l border-[#DDD5C7] pl-2">
                  LỚP 9A2
                </span>
              </div>
              <span className="text-[10px] font-bold text-[#B35C44] uppercase tracking-wider mt-1.5">
                GIÁO DỤC DI SẢN VĂN HÓA CƠ TU MIỀN TRUNG
              </span>
            </div>

            {/* Certificate Title */}
            <div className="space-y-1">
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#2F2F2F]">
                GIẤY CHỨNG NHẬN HOÀN THÀNH TRẠM 0{station.order}
              </h2>
              <p className="text-sm font-serif font-bold text-[#7A4E38]">
                {station.title} {station.coTuTitle && `(${station.coTuTitle})`}
              </p>
              <h3 className="text-sm sm:text-base font-serif font-bold italic text-[#B35C44]">
                “{stationMeta.title}”
              </h3>
              <div className="w-24 h-0.5 bg-[#D4AF37] mx-auto my-2" />
            </div>

            {/* Recipient Details */}
            <div className="space-y-2 py-1">
              <p className="text-xs text-[#736B60]">Trao tặng cho học sinh:</p>
              <h4 className="text-xl sm:text-2xl font-serif font-bold text-[#2F2F2F] tracking-wide">
                {studentName.toUpperCase()}
              </h4>
              <p className="text-xs text-[#555047] max-w-lg mx-auto leading-relaxed">
                Đã hoàn thành xuất sắc các nội dung học tập, câu hỏi thử thách và xuất sắc đạt danh hiệu <strong>{stationMeta.badge}</strong> tại Làng Cơ Tu Số.
              </p>
              <div className="p-3 bg-[#F5F2ED] rounded-xl border border-[#E3DCD2] max-w-md mx-auto">
                <p className="text-[11px] text-[#666157] italic">
                  "{stationMeta.description}"
                </p>
              </div>
            </div>

            {/* Certificate Footer Meta & Signatures */}
            <div className="pt-3 border-t border-[#E3DCD2] flex flex-col sm:flex-row items-center justify-between gap-3 text-[10px] sm:text-[11px] text-[#736B60]">
              <div className="text-left">
                <p>Mã chứng nhận: <strong className="text-[#2F2F2F]">{certCode}</strong></p>
                <p>Ngày cấp: {issueDate}</p>
                <p className="text-[10px] text-[#B35C44] font-semibold">
                  Sản phẩm số: Lớp 9A2 - FPT Schools
                </p>
              </div>

              <div className="text-center sm:text-right">
                <p className="font-bold text-[#B35C44]">HỘI ĐỒNG DI SẢN LÀNG CƠ TU SỐ</p>
                <p className="italic font-serif font-bold text-xs text-[#2F2F2F] mt-0.5">
                  Già làng Y Kông & Chú Bh’ling Avel
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="p-4 sm:p-5 bg-[#F5F2ED] border-t border-[#E3DCD2] flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-[#555047]">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Dấu ấn trạm đã được lưu vào Sổ Hành Trình</span>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            {onViewAllCertificates && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onViewAllCertificates();
                }}
                className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-[#FAF8F5] hover:bg-[#EFECE6] border border-[#DDD5C7] text-[#2F2F2F] text-xs font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
              >
                <Award className="w-3.5 h-3.5 text-[#B35C44]" />
                Xem Bộ Chứng Nhận
              </button>
            )}

            <button
              type="button"
              id="btn-download-station-cert"
              onClick={downloadStationCertificatePNG}
              disabled={isExporting}
              className="flex-1 sm:flex-initial px-5 py-2.5 bg-[#B35C44] hover:bg-[#964732] text-white font-bold text-xs rounded-xl shadow-xs flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-50 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              {isExporting ? 'Đang xuất PNG...' : 'Tải Giấy Chứng Nhận Trạm (PNG)'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
