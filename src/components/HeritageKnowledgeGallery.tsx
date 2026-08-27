import React, { useState } from 'react';
import { Sparkles, ZoomIn, Info, CheckCircle2, ChevronRight, BookOpen } from 'lucide-react';

export interface HeritageVisualItem {
  id: string;
  title: string;
  coTuTerm?: string;
  category: string;
  badge: string;
  caption: string;
  description: string;
  culturalMeaning: string;
  features: string[];
  svgGraphic: React.ReactNode;
}

export const STATION_HERITAGE_VISUALS: Record<string, HeritageVisualItem[]> = {
  residence: [
    {
      id: 'vis_vel_layout',
      title: 'Bố cục Làng vành khuyên (Vel)',
      coTuTerm: 'Vel Cr’nguul',
      category: 'Không gian sống',
      badge: 'Cấu trúc làng',
      caption: 'Mặt bằng làng Cơ Tu quây quần hình bầu dục quanh sân Gươl trung tâm',
      description: 'Làng Cơ Tu cổ truyền gồm từ 20-50 nóc nhà sàn (Moong) bố trí theo hình vòng cung hoặc vành khuyên, tất cả đều hướng cửa chính về ngôi Nhà Gươl và bãi đất sinh hoạt chung.',
      culturalMeaning: 'Tượng trưng cho sự gắn bó keo sơn ruột thịt, tinh thần tương thân tương ái và khả năng bảo vệ lẫn nhau trước thú dữ hay hiểm họa thiên tai.',
      features: [
        'Nhà Gươl nằm ở vị trí trung tâm cao ráo nhất',
        'Các nhà sàn Moong xếp hình vòng cung quây tròn',
        'Hàng rào chông tre và cổng làng bao quanh vững chắc',
        'Máng nước công cộng (T’roong đác) dẫn nước từ suối mát'
      ],
      svgGraphic: (
        <svg viewBox="0 0 400 240" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="400" height="240" fill="#EAE5DC" />
          {/* Mountain background */}
          <path d="M0 120 L80 50 L180 130 L280 40 L380 120 L400 110 L400 240 L0 240 Z" fill="#D3CBBD" />
          <path d="M60 140 L160 70 L260 150 L360 80 L400 130 L400 240 L0 240 Z" fill="#C5BCAC" />
          
          {/* River / Stream */}
          <path d="M0 210 C100 200 180 230 400 195 L400 240 L0 240 Z" fill="#8AA899" opacity="0.6" />
          <text x="320" y="225" fill="#2D4232" fontSize="10" fontStyle="italic" fontWeight="600">Suối đầu nguồn</text>

          {/* Central Village Oval Common Yard */}
          <ellipse cx="200" cy="145" rx="130" ry="55" fill="#F5F2ED" stroke="#B35C44" strokeWidth="2" strokeDasharray="4 4" />
          <text x="200" y="195" textAnchor="middle" fill="#7A4E38" fontSize="10" fontWeight="bold">SÂN LÀNG TRUNG TÂM (VÀNH KHUYÊN)</text>

          {/* Central Guol House */}
          <g transform="translate(170, 110)">
            <ellipse cx="30" cy="30" rx="36" ry="12" fill="#D4AF37" opacity="0.2" />
            <path d="M5 25 Q30 5 55 25 L50 40 L10 40 Z" fill="#8C3F2B" stroke="#5A2416" strokeWidth="2" />
            <path d="M15 40 L15 50 M45 40 L45 50" stroke="#4A3B32" strokeWidth="3" />
            <circle cx="30" cy="12" r="3" fill="#D4AF37" />
            <text x="30" y="58" textAnchor="middle" fill="#B35C44" fontSize="10" fontWeight="bold">Nhà Gươl</text>
          </g>

          {/* Surrounding Houses (Moong) */}
          {[
            { x: 90, y: 130, deg: 30 },
            { x: 120, y: 100, deg: 60 },
            { x: 160, y: 85, deg: 80 },
            { x: 240, y: 85, deg: -80 },
            { x: 280, y: 100, deg: -60 },
            { x: 310, y: 130, deg: -30 },
            { x: 290, y: 165, deg: -150 },
            { x: 110, y: 165, deg: 150 },
          ].map((h, i) => (
            <g key={i} transform={`translate(${h.x}, ${h.y})`}>
              <path d="M0 12 L12 0 L24 12 L20 22 L4 22 Z" fill="#6E5C4E" stroke="#3D2D24" strokeWidth="1.5" />
              <line x1="6" y1="22" x2="6" y2="28" stroke="#3D2D24" strokeWidth="2" />
              <line x1="18" y1="22" x2="18" y2="28" stroke="#3D2D24" strokeWidth="2" />
            </g>
          ))}

          {/* Compass / Orientation */}
          <g transform="translate(30, 30)">
            <circle cx="16" cy="16" r="14" fill="#FAF8F5" stroke="#DDD5C7" />
            <path d="M16 4 L20 16 L16 28 L12 16 Z" fill="#B35C44" />
            <text x="16" y="2" textAnchor="middle" fill="#7A4E38" fontSize="8" fontWeight="bold">BẮC</text>
          </g>
        </svg>
      ),
    },
    {
      id: 'vis_troong_dac',
      title: 'Máng nước Thần kỳ (T’roong đác)',
      coTuTerm: 'T’roong Đác',
      category: 'Công trình dân sinh',
      badge: 'Nguồn nước sạch',
      caption: 'Hệ thống máng tre nứa dẫn nước ngầm tự nhiên từ khe núi về làng',
      description: 'Đồng bào Cơ Tu dùng những thân cây vầu, cây nứa già đục rỗng mắt ghép nối liên hoàn hàng trăm mét để dẫn nước suối trong vắt từ thượng nguồn về tận cổng làng.',
      culturalMeaning: 'Nước là nguồn sống thiêng liêng được Thần Nước (Giàng Đác) ban tặng. Khu vực máng nước luôn được giữ gìn thanh tịnh và nghiêm cấm xả rác hay chặt phá cây đầu nguồn.',
      features: [
        'Hệ thống ống bương tre nứa nối dài vượt dốc núi',
        'Nước chảy liên tục ngày đêm không bao giờ cạn',
        'Điểm gặp gỡ, trò chuyện của phụ nữ và trẻ em mỗi chiều',
        'Luật tục bảo vệ rừng đầu nguồn nghiêm ngặt'
      ],
      svgGraphic: (
        <svg viewBox="0 0 400 240" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="400" height="240" fill="#E6EDE8" />
          {/* Lush Green Foliage */}
          <path d="M0 0 L150 0 L100 80 L0 60 Z" fill="#4B6B50" opacity="0.6" />
          <path d="M250 0 L400 0 L400 90 L300 60 Z" fill="#3D5643" opacity="0.7" />
          
          {/* Rocky Hillside */}
          <path d="M0 100 Q120 120 220 150 L400 180 L400 240 L0 240 Z" fill="#C9C2B5" />
          <path d="M0 160 Q180 180 400 210 L400 240 L0 240 Z" fill="#9C8E7E" />

          {/* Bamboo Water Pipes on Stilts */}
          {/* Pipe 1 */}
          <path d="M20 70 L160 105" stroke="#7A9A60" strokeWidth="8" strokeLinecap="round" />
          <path d="M20 68 L160 103" stroke="#A8C686" strokeWidth="3" strokeLinecap="round" />
          {/* Support Cross */}
          <line x1="80" y1="85" x2="65" y2="150" stroke="#5A4A3D" strokeWidth="3" />
          <line x1="70" y1="85" x2="85" y2="150" stroke="#5A4A3D" strokeWidth="3" />

          {/* Pipe 2 */}
          <path d="M150 102 L280 135" stroke="#7A9A60" strokeWidth="8" strokeLinecap="round" />
          <path d="M150 100 L280 133" stroke="#A8C686" strokeWidth="3" strokeLinecap="round" />
          {/* Support Cross */}
          <line x1="220" y1="120" x2="205" y2="180" stroke="#5A4A3D" strokeWidth="3" />
          <line x1="210" y1="120" x2="225" y2="180" stroke="#5A4A3D" strokeWidth="3" />

          {/* Water Spout */}
          <path d="M275 137 Q290 155 295 200" stroke="#4A90E2" strokeWidth="4" strokeLinecap="round" fill="none" />
          <ellipse cx="295" cy="205" rx="35" ry="12" fill="#62B3ED" opacity="0.7" />
          <ellipse cx="295" cy="205" rx="20" ry="6" fill="#FFFFFF" opacity="0.5" />

          {/* Traditional Gourd Vessel / Bamboo Tube */}
          <g transform="translate(250, 170)">
            <rect x="0" y="0" width="16" height="40" rx="3" fill="#D4A373" stroke="#7A4E38" strokeWidth="2" />
            <line x1="2" y1="12" x2="14" y2="12" stroke="#7A4E38" strokeWidth="1.5" />
            <line x1="2" y1="26" x2="14" y2="26" stroke="#7A4E38" strokeWidth="1.5" />
          </g>
          {/* Explanatory Caption Banner */}
          <g transform="translate(30, 204)">
            <rect x="0" y="0" width="340" height="24" rx="6" fill="#FFFFFF" stroke="#4B6B50" strokeWidth="1" opacity="0.95" />
            <text x="170" y="16" textAnchor="middle" fill="#1C3822" fontSize="10" fontWeight="bold">
              Máng nước T’roong đác – Nguồn nước tinh khiết của đại ngàn
            </text>
          </g>
        </svg>
      ),
    },
  ],

  guol: [
    {
      id: 'vis_zram_pillar',
      title: 'Cột Cái (Zrâm) – Trụ Cột Tâm Linh',
      coTuTerm: 'Zrâm Gươl',
      category: 'Kiến trúc gỗ',
      badge: 'Cột trụ chính',
      caption: 'Cột gỗ lim nguyên khối chịu lực và chạm khắc phù điêu biểu tượng linh thiêng',
      description: 'Cột Cái đặt tại vị trí trung tâm Nhà Gươl, được chọn từ cây gỗ kiền kiền hoặc chò chỉ thẳng tắp và lâu năm nhất trong rừng. Thân cột chạm khắc dày đặc các biểu tượng phản ánh vũ trụ quan và đời sống Cơ Tu.',
      culturalMeaning: 'Biểu trưng cho người cha, người già làng đáng kính làm trụ cột bảo vệ toàn buôn làng. Nơi gắn kết giữa trần gian và thế giới tổ tiên.',
      features: [
        'Chạm nổi hình tượng đôi chim Tring linh thiêng',
        'Hình ảnh người phụ nữ múa Da’dá dâng lúa',
        'Họa tiết sóng nước, mặt trời và hoa văn hình học',
        'Chỗ treo đầu sừng trâu hiến tế và nhạc cụ thiêng'
      ],
      svgGraphic: (
        <svg viewBox="0 0 400 240" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="400" height="240" fill="#F4EFE6" />
          {/* Wood Pillar Center */}
          <rect x="165" y="10" width="70" height="220" fill="#7A4E38" stroke="#4A2A1A" strokeWidth="3" rx="6" />
          
          {/* Wood grain pattern */}
          <line x1="180" y1="10" x2="180" y2="230" stroke="#5C3826" strokeWidth="1.5" strokeDasharray="30 10" />
          <line x1="220" y1="10" x2="220" y2="230" stroke="#5C3826" strokeWidth="1.5" strokeDasharray="40 15" />

          {/* Carved motifs on Pillar */}
          {/* Top: Sun / Star motif */}
          <circle cx="200" cy="40" r="14" fill="#D4AF37" stroke="#3D1E06" strokeWidth="2" />
          <path d="M200 20 L200 60 M180 40 L220 40 M186 26 L214 54 M186 54 L214 26" stroke="#3D1E06" strokeWidth="2" />

          {/* Middle 1: Tring Bird Motif */}
          <g transform="translate(180, 75)">
            <path d="M5 20 Q20 5 35 20 Q20 15 5 20 Z" fill="#EAE5DC" stroke="#3D1E06" strokeWidth="1.5" />
            <circle cx="10" cy="14" r="2" fill="#3D1E06" />
            <path d="M5 14 L0 16" stroke="#3D1E06" strokeWidth="1.5" />
          </g>

          {/* Middle 2: Buffalo Horn Bracket (Raph) */}
          <g transform="translate(150, 115)">
            <path d="M-15 0 Q50 -20 115 0 Q50 15 -15 0 Z" fill="#3A2518" stroke="#1D120B" strokeWidth="2" />
            <text x="50" y="32" textAnchor="middle" fill="#FFFFFF" fontSize="9" fontWeight="bold">GIÁ SỪNG TRÂU</text>
          </g>

          {/* Lower: Dancing Figures carved in low relief */}
          <g transform="translate(182, 155)">
            <circle cx="18" cy="8" r="4" fill="#D4AF37" />
            <line x1="18" y1="12" x2="18" y2="28" stroke="#D4AF37" strokeWidth="2" />
            <path d="M10 18 L18 16 L26 18" stroke="#D4AF37" strokeWidth="2" />
            <path d="M12 36 L18 28 L24 36" stroke="#D4AF37" strokeWidth="2" />
          </g>

          {/* Explanatory Annotations Left and Right */}
          <g transform="translate(20, 45)">
            <rect x="0" y="0" width="130" height="42" rx="8" fill="#FAF8F5" stroke="#DDD5C7" />
            <text x="10" y="18" fill="#B35C44" fontSize="10" fontWeight="bold">Hoa văn Mặt trời</text>
            <text x="10" y="32" fill="#736B60" fontSize="9">Nguồn sinh khí Giàng ban</text>
            <line x1="130" y1="21" x2="165" y2="40" stroke="#B35C44" strokeWidth="1.5" strokeDasharray="3 3" />
          </g>

          <g transform="translate(250, 115)">
            <rect x="0" y="0" width="130" height="42" rx="8" fill="#FAF8F5" stroke="#DDD5C7" />
            <text x="10" y="18" fill="#B35C44" fontSize="10" fontWeight="bold">Khung gá sừng trâu</text>
            <text x="10" y="32" fill="#736B60" fontSize="9">Ghi dấu các kỳ lễ hội lớn</text>
            <line x1="0" y1="21" x2="-35" y2="12" stroke="#B35C44" strokeWidth="1.5" strokeDasharray="3 3" />
          </g>
        </svg>
      ),
    },
    {
      id: 'vis_tring_birds',
      title: 'Đôi Chim Tring trên nóc Gươl',
      coTuTerm: 'A-tring',
      category: 'Biểu tượng linh vật',
      badge: 'Linh điểu Cơ Tu',
      caption: 'Hình tượng đôi chim Tring đối xứng ngự trên đỉnh nóc nhà Gươl',
      description: 'Theo thần thoại Cơ Tu, chim Tring là loài chim mang lại sự sinh sôi, hòa thuận và dẫn dắt người Cơ Tu tìm thấy những vùng đất bằng phẳng trù phú để lập làng.',
      culturalMeaning: 'Biểu tượng cho lòng thủy chung, tình nghĩa vợ chồng son sắt và khát vọng buôn làng mãi mãi bình yên, ấm no.',
      features: [
        'Tạc bằng gỗ gắn ở hai đầu hồi hoặc chính giữa nóc',
        'Mỏ ngậm cá hoặc hạt lúa trĩu bông',
        'Đôi cánh uốn lượn hòa nhịp với độ cong của mái lá',
        'Hình tượng xuất hiện trên cả thổ cẩm và điêu khắc mồ'
      ],
      svgGraphic: (
        <svg viewBox="0 0 400 240" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="400" height="240" fill="#EBF0F5" />
          {/* Blue Sky with soft clouds */}
          <ellipse cx="80" cy="50" rx="40" ry="15" fill="#FFFFFF" opacity="0.6" />
          <ellipse cx="320" cy="60" rx="50" ry="18" fill="#FFFFFF" opacity="0.6" />

          {/* Roof Ridge Curve */}
          <path d="M20 210 Q200 130 380 210 L380 240 L20 240 Z" fill="#8C5338" />
          <path d="M20 205 Q200 125 380 205" stroke="#D4AF37" strokeWidth="6" />

          {/* Center Finial Plinth */}
          <rect x="185" y="105" width="30" height="35" fill="#5A321E" rx="3" />
          <circle cx="200" cy="100" r="10" fill="#D4AF37" />

          {/* Left Bird Tring */}
          <g transform="translate(130, 70)">
            <path d="M60 40 Q40 10 10 20 Q-10 25 5 45 Q35 50 60 40 Z" fill="#3D2619" stroke="#1D1009" strokeWidth="2" />
            <circle cx="8" cy="23" r="3" fill="#D4AF37" />
            <path d="M4 25 L-8 28" stroke="#D4AF37" strokeWidth="2" /> {/* Beak */}
            {/* Wing details */}
            <path d="M25 28 Q45 15 55 35" stroke="#FFFFFF" strokeWidth="2" />
          </g>

          {/* Right Bird Tring (Facing Left) */}
          <g transform="translate(210, 70)">
            <path d="M0 40 Q20 10 50 20 Q70 25 55 45 Q25 50 0 40 Z" fill="#3D2619" stroke="#1D1009" strokeWidth="2" />
            <circle cx="52" cy="23" r="3" fill="#D4AF37" />
            <path d="M56 25 L68 28" stroke="#D4AF37" strokeWidth="2" /> {/* Beak */}
            {/* Wing details */}
            <path d="M35 28 Q15 15 5 35" stroke="#FFFFFF" strokeWidth="2" />
          </g>

          {/* Explanatory Caption Banner */}
          <g transform="translate(30, 198)">
            <rect x="0" y="0" width="340" height="26" rx="6" fill="#FFFFFF" stroke="#D4AF37" strokeWidth="1.5" />
            <text x="170" y="17" textAnchor="middle" fill="#5A2416" fontSize="11" fontWeight="bold">
              Đôi Chim Tring – Biểu tượng son sắt và ước vọng bình yên
            </text>
          </g>
        </svg>
      ),
    },
  ],

  weaving: [
    {
      id: 'vis_backstrap_loom',
      title: 'Khung Dệt Lưng Cổ Truyền (Back-strap Loom)',
      coTuTerm: 'Khung dệt lưng',
      category: 'Công cụ dệt thổ cẩm',
      badge: 'Kỹ thuật cổ',
      caption: 'Người dệt ngồi duỗi thẳng chân, dùng chính sức căng của lưng để giữ đều sợi dệt',
      description: 'Khung dệt không hề có khung gỗ cố định như dưới đồng bằng. Một đầu cuộn sợi buộc vào cột nhà, đầu kia nối với đai da quàng sau lưng người phụ nữ. Độ căng của sợi chỉ được điều chỉnh bằng nhịp ngả người ra trước hay sau.',
      culturalMeaning: 'Mỗi tấm zèng là sự hòa quyện giữa nhịp thở, nhịp tim và sự kiên nhẫn vô bờ của người mẹ, người chị Cơ Tu.',
      features: [
        'Dây đai tựa lưng (Por-tang) làm từ da trâu hoặc vỏ cây rừng',
        'Thanh kiếm đập thoi dệt bằng gỗ quý nhẵn bóng',
        'Các ống nứa luồn sợi phân chia tầng hoa văn',
        'Tư thế dệt đòi hỏi sự tập trung và khéo léo tuyệt đối'
      ],
      svgGraphic: (
        <svg viewBox="0 0 400 240" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="400" height="240" fill="#F7F3EB" />
          
          {/* Warp Threads (Sợi dọc căng ngang) */}
          <g transform="translate(60, 90)">
            <line x1="0" y1="0" x2="260" y2="25" stroke="#2B2B2B" strokeWidth="18" />
            <line x1="0" y1="2" x2="260" y2="27" stroke="#8C2D19" strokeWidth="4" />
            <line x1="0" y1="8" x2="260" y2="33" stroke="#FFFFFF" strokeWidth="2" strokeDasharray="3 3" />
            <line x1="0" y1="12" x2="260" y2="37" stroke="#D4AF37" strokeWidth="3" />
          </g>

          {/* Fixed Anchor Pole on Left */}
          <rect x="45" y="40" width="16" height="160" rx="4" fill="#6B4F3B" stroke="#3D2817" strokeWidth="2" />
          <text x="53" y="215" textAnchor="middle" fill="#7A4E38" fontSize="9" fontWeight="bold">Cột buộc sợi</text>

          {/* Wooden Sword / Batten (Thanh đập thoi) */}
          <rect x="180" y="70" width="10" height="90" rx="3" fill="#B85D38" transform="rotate(-15 180 70)" stroke="#5A2416" strokeWidth="1.5" />
          <text x="175" y="180" fill="#B35C44" fontSize="9" fontWeight="bold">Thanh đập thoi</text>

          {/* Bamboo Pattern Rods (Ống nứa luồn hoa văn) */}
          <circle cx="120" cy="98" r="6" fill="#A8C686" stroke="#4B6B50" strokeWidth="1.5" />
          <circle cx="140" cy="100" r="6" fill="#A8C686" stroke="#4B6B50" strokeWidth="1.5" />

          {/* Backstrap Belt on Right */}
          <path d="M315 110 Q345 125 345 155 Q345 185 315 170" fill="none" stroke="#8C3F2B" strokeWidth="8" strokeLinecap="round" />
          <text x="345" y="200" textAnchor="middle" fill="#7A4E38" fontSize="9" fontWeight="bold">Đai lưng tựa</text>

          {/* Weaver Silhouette Indication */}
          <circle cx="320" cy="80" r="14" fill="#6E5C4E" />
          <path d="M305 100 Q325 105 330 160 L290 160 Z" fill="#6E5C4E" opacity="0.7" />

          <text x="200" y="30" textAnchor="middle" fill="#2F2F2F" fontSize="12" fontStyle="italic" fontWeight="bold">
            Cơ chế hoạt động của Khung dệt lưng Cơ Tu
          </text>
        </svg>
      ),
    },
    {
      id: 'vis_bead_pattern',
      title: 'Kỹ thuật Luồn Hạt Cườm (Bead Weaving)',
      coTuTerm: 'Chơ-lơ cườm',
      category: 'Họa tiết thổ cẩm',
      badge: 'Hoa văn cườm',
      caption: 'Từng hạt cườm trắng đính trực tiếp vào sợi dọc tạo nên hoa văn hình học nổi',
      description: 'Điểm độc nhất của dệt zèng Cơ Tu: Nghệ nhân không thêu cườm sau khi may, mà luồn từng hạt cườm chì/nhựa trắng vào các sợi chỉ dọc theo một sơ đồ tính toán chính xác trước khi gạt thoi dệt.',
      culturalMeaning: 'Màu trắng của cườm nổi bật trên nền chàm sẫm tượng trưng cho những vì sao đêm rực sáng soi đường giữa rừng thẳm.',
      features: [
        'Hoa văn quả trám (hình mắt chim, mắt sâu rừng)',
        'Đường zíc zắc (dòng suối ngàn chảy qua ghềnh đá)',
        'Hình tam giác đối xứng (ngọn núi Trường Sơn trùng điệp)',
        'Cườm bám chắc vào thớ vải, không bao giờ bong tróc'
      ],
      svgGraphic: (
        <svg viewBox="0 0 400 240" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Black Indigo Fabric Background */}
          <rect width="400" height="240" fill="#1C2321" />
          
          {/* Woven Texture Grid Lines */}
          {[...Array(20)].map((_, i) => (
            <line key={`grid-${i}`} x1={i * 20} y1="0" x2={i * 20} y2="240" stroke="#2D3B36" strokeWidth="0.8" />
          ))}

          {/* Red and Yellow Accent Stripes */}
          <rect x="0" y="35" width="400" height="12" fill="#B83A28" />
          <rect x="0" y="50" width="400" height="6" fill="#E5A93C" />
          <rect x="0" y="180" width="400" height="6" fill="#E5A93C" />
          <rect x="0" y="190" width="400" height="12" fill="#B83A28" />

          {/* Bead Pattern: Diamond / Rhombus with White Beads */}
          {/* Diamond 1 Center */}
          {[
            [120, 115], [140, 95], [160, 75], [180, 95], [200, 115],
            [180, 135], [160, 155], [140, 135],
            [140, 115], [160, 95], [180, 115], [160, 135],
            [160, 115] // Center bead
          ].map(([x, y], idx) => (
            <g key={`b1-${idx}`}>
              <circle cx={x} cy={y} r="5.5" fill="#FAF8F5" stroke="#CBD5E1" strokeWidth="1" />
              <circle cx={x - 1.5} cy={y - 1.5} r="1.8" fill="#FFFFFF" />
            </g>
          ))}

          {/* Diamond 2 Right */}
          {[
            [240, 115], [260, 95], [280, 75], [300, 95], [320, 115],
            [300, 135], [280, 155], [260, 135],
            [260, 115], [280, 95], [300, 115], [280, 135],
            [280, 115]
          ].map(([x, y], idx) => (
            <g key={`b2-${idx}`}>
              <circle cx={x} cy={y} r="5.5" fill="#FAF8F5" stroke="#CBD5E1" strokeWidth="1" />
              <circle cx={x - 1.5} cy={y - 1.5} r="1.8" fill="#FFFFFF" />
            </g>
          ))}

          {/* Diamond Left Edge */}
          {[
            [40, 115], [60, 95], [80, 75],
            [80, 155], [60, 135],
            [60, 115]
          ].map(([x, y], idx) => (
            <g key={`b0-${idx}`}>
              <circle cx={x} cy={y} r="5.5" fill="#FAF8F5" stroke="#CBD5E1" strokeWidth="1" />
              <circle cx={x - 1.5} cy={y - 1.5} r="1.8" fill="#FFFFFF" />
            </g>
          ))}

          <rect x="80" y="212" width="240" height="22" rx="6" fill="#FAF8F5" opacity="0.9" />
          <text x="200" y="227" textAnchor="middle" fill="#7A4E38" fontSize="10" fontWeight="bold">
            Hạt cườm đan cài tạo dải hoa văn quả trám nổi
          </text>
        </svg>
      ),
    },
  ],

  dance: [
    {
      id: 'vis_dada_gesture',
      title: 'Động Tác Múa Da’dá – Bàn Tay Dâng Trời',
      coTuTerm: 'Da’dá (Múa nữ)',
      category: 'Nghệ thuật múa',
      badge: 'Động tác nữ',
      caption: 'Đôi bàn tay ngửa ngang vai hướng lên trời đón nhận phước lành từ Mẹ Thiên Nhiên',
      description: 'Phụ nữ Cơ Tu khi múa Da’dá giữ lưng thẳng, bước đi nhẹ nhàng theo nhịp cồng chiêng. Hai cánh tay co vuông góc ngang vai, lòng bàn tay ngửa lên trời nghiêng nhẹ theo nhịp bước chân.',
      culturalMeaning: 'Thể hiện sự khiêm nhường, lòng biết ơn sâu sắc với hạt lúa Giàng ban và nét duyên dáng, e ấp kín đáo của người con gái vùng cao.',
      features: [
        'Cánh tay bẻ vuông góc ngang vai cân xứng',
        'Bàn tay ngửa hứng hạt sương và lúa trời',
        'Váy thổ cẩm zèng ôm sát bước chân nhịp nhàng',
        'Khuôn mặt tươi vui rạng rỡ hướng về buôn làng'
      ],
      svgGraphic: (
        <svg viewBox="0 0 400 240" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="400" height="240" fill="#FAF5ED" />
          {/* Sunlight Rays */}
          <path d="M200 0 L160 120 L240 120 Z" fill="#F6E05E" opacity="0.25" />
          <path d="M120 0 L100 140 L160 140 Z" fill="#F6E05E" opacity="0.15" />
          <path d="M280 0 L240 140 L300 140 Z" fill="#F6E05E" opacity="0.15" />

          {/* Female Dancer Outline Figure */}
          <g transform="translate(140, 20)">
            {/* Head and Hair Bun */}
            <circle cx="60" cy="30" r="16" fill="#3D2619" />
            <circle cx="74" cy="24" r="8" fill="#3D2619" /> {/* Hair bun */}
            {/* Bead Headband */}
            <path d="M46 28 Q60 22 74 28" stroke="#D4AF37" strokeWidth="3" />

            {/* Neck & Bead Necklace */}
            <rect x="55" y="44" width="10" height="12" fill="#E8B896" />
            <ellipse cx="60" cy="56" rx="14" ry="5" fill="none" stroke="#D4AF37" strokeWidth="2.5" />

            {/* Torso in Zèng Vest */}
            <path d="M42 58 L78 58 L74 110 L46 110 Z" fill="#1C2321" stroke="#8C2D19" strokeWidth="2" />
            <line x1="60" y1="58" x2="60" y2="110" stroke="#B83A28" strokeWidth="3" />

            {/* Left Arm: Raised 90 degrees with open palm up */}
            <path d="M42 62 L15 65 L12 35" stroke="#E8B896" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M5 33 Q12 25 18 33" stroke="#E8B896" strokeWidth="4" strokeLinecap="round" />

            {/* Right Arm: Raised 90 degrees with open palm up */}
            <path d="M78 62 L105 65 L108 35" stroke="#E8B896" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M102 33 Q108 25 115 33" stroke="#E8B896" strokeWidth="4" strokeLinecap="round" />

            {/* Long Skirt (Chơ-lơ) with horizontal bead stripes */}
            <path d="M46 110 L74 110 L84 195 L36 195 Z" fill="#1C2321" />
            <rect x="38" y="140" width="44" height="6" fill="#B83A28" />
            <rect x="37" y="150" width="46" height="3" fill="#D4AF37" />
            <rect x="36" y="170" width="48" height="6" fill="#B83A28" />
          </g>

          {/* Caption Banner */}
          <g transform="translate(30, 204)">
            <rect x="0" y="0" width="340" height="24" rx="6" fill="#FFFFFF" stroke="#B35C44" strokeWidth="1" opacity="0.95" />
            <text x="170" y="16" textAnchor="middle" fill="#8C2D19" fontSize="10" fontWeight="bold">
              Vũ thế Da’dá: Cánh tay bẻ góc, lòng bàn tay ngửa dâng Trời
            </text>
          </g>
        </svg>
      ),
    },
    {
      id: 'vis_tantung_circle',
      title: 'Đội Hình Vòng Tròn Tân’tung Da’dá',
      coTuTerm: 'Vòng múa cộng đồng',
      category: 'Đội hình biểu diễn',
      badge: 'Đoàn kết làng',
      caption: 'Vòng tròn múa di chuyển ngược chiều kim đồng hồ quanh cột lễ trung tâm',
      description: 'Nam giới múa Tân’tung đi trước với giáo khiên dũng mãnh, nữ giới múa Da’dá nối tiếp sau với nhịp điệu uyển chuyển. Cả vòng múa xoay quanh cột đâm trâu (T’cột) hoặc sân Gươl.',
      culturalMeaning: 'Mô phỏng sự tuần hoàn bất tận của bốn mùa xuân hạ thu đông và quy luật vũ trụ, gắn kết cả trăm con người thành một khối thống nhất.',
      features: [
        'Vòng tròn di chuyển ngược chiều kim đồng hồ',
        'Nam giới đi trước mở đường thể hiện bản lĩnh',
        'Nữ giới theo sau mang lại sự mềm mại hài hòa',
        'Dàn cồng chiêng giữ nhịp ở trung tâm vòng tròn'
      ],
      svgGraphic: (
        <svg viewBox="0 0 400 240" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="400" height="240" fill="#EFE9DD" />
          
          {/* Main Circular Track */}
          <ellipse cx="200" cy="120" rx="140" ry="75" fill="#FAF8F5" stroke="#B35C44" strokeWidth="2.5" strokeDasharray="6 4" />
          
          {/* Rotation Arrows (Counter-Clockwise) */}
          <path d="M340 120 A140 75 0 0 0 200 45" stroke="#B35C44" strokeWidth="2" fill="none" markerEnd="url(#arrow)" />
          <path d="M60 120 A140 75 0 0 0 200 195" stroke="#B35C44" strokeWidth="2" fill="none" />

          {/* Central Sacred Pole (T’cột) */}
          <g transform="translate(190, 80)">
            <rect x="8" y="0" width="5" height="70" fill="#7A4E38" />
            <path d="M-5 15 L25 15" stroke="#D4AF37" strokeWidth="3" />
            <path d="M0 30 L20 30" stroke="#D4AF37" strokeWidth="2" />
            <circle cx="10" cy="5" r="5" fill="#B35C44" />
            <text x="10" y="82" textAnchor="middle" fill="#7A4E38" fontSize="8" fontWeight="bold">Cột Lễ</text>
          </g>

          {/* Male Dancers (Blue/Brown dots with shields) */}
          {[
            { x: 300, y: 75, label: 'Nam' },
            { x: 260, y: 55, label: 'Nam' },
            { x: 200, y: 45, label: 'Nam' },
            { x: 140, y: 55, label: 'Nam' },
          ].map((pos, idx) => (
            <g key={`m-${idx}`} transform={`translate(${pos.x}, ${pos.y})`}>
              <circle cx="0" cy="0" r="9" fill="#0066B2" stroke="#FFFFFF" strokeWidth="1.5" />
              <text x="0" y="3" textAnchor="middle" fill="#FFFFFF" fontSize="7" fontWeight="bold">T</text>
            </g>
          ))}

          {/* Female Dancers (Red/Orange dots) */}
          {[
            { x: 90, y: 80, label: 'Nữ' },
            { x: 60, y: 120, label: 'Nữ' },
            { x: 90, y: 160, label: 'Nữ' },
            { x: 150, y: 185, label: 'Nữ' },
            { x: 220, y: 195, label: 'Nữ' },
            { x: 290, y: 180, label: 'Nữ' },
            { x: 330, y: 140, label: 'Nữ' },
          ].map((pos, idx) => (
            <g key={`f-${idx}`} transform={`translate(${pos.x}, ${pos.y})`}>
              <circle cx="0" cy="0" r="9" fill="#B35C44" stroke="#FFFFFF" strokeWidth="1.5" />
              <text x="0" y="3" textAnchor="middle" fill="#FFFFFF" fontSize="7" fontWeight="bold">D</text>
            </g>
          ))}

          {/* Caption Banner */}
          <g transform="translate(25, 204)">
            <rect x="0" y="0" width="350" height="24" rx="6" fill="#FFFFFF" stroke="#B35C44" strokeWidth="1" opacity="0.95" />
            <text x="175" y="16" textAnchor="middle" fill="#555047" fontSize="10" fontWeight="bold">
              Vòng tròn di chuyển ngược chiều kim đồng hồ quanh tâm điểm lễ hội
            </text>
          </g>
        </svg>
      ),
    },
  ],

  music: [
    {
      id: 'vis_gong_set',
      title: 'Bộ Chiêng Cha & Chiêng Mẹ (Cheng & T’roong)',
      coTuTerm: 'Cheng – T’roong',
      category: 'Nhạc cụ đồng',
      badge: 'Cồng chiêng',
      caption: 'Bộ cồng có núm (Chiêng Cha) và chiêng phẳng (Chiêng Mẹ) hòa quyện âm sắc trầm vang',
      description: 'Dàn chiêng Cơ Tu gồm chiêng phẳng (T’roong) cho âm thanh thanh thoát ngân vang và chiêng có núm (Cheng) cho tiếng trầm ấm, giữ nhịp dẫn dắt toàn dàn nhạc.',
      culturalMeaning: 'Âm thanh của chiêng là tiếng lòng của người Cơ Tu, là cầu nối tâm linh gửi lời khấn nguyện tới các đấng thần linh trên trời cao.',
      features: [
        'Đúc bằng hợp kim đồng thiếc quý giá',
        'Dùi đánh bịt vải mềm tạo âm thanh tròn đầy',
        'Được cất giữ trang trọng tại Nhà Gươl',
        'Chỉ mang ra biểu diễn trong các dịp hội làng lớn'
      ],
      svgGraphic: (
        <svg viewBox="0 0 400 240" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="400" height="240" fill="#FAF6EE" />
          
          {/* Top Carved Wooden Hanging Rack */}
          <rect x="35" y="14" width="330" height="12" rx="3" fill="#6B4226" stroke="#3D2210" strokeWidth="1.5" />
          <circle cx="50" cy="20" r="2.5" fill="#D4AF37" />
          <circle cx="350" cy="20" r="2.5" fill="#D4AF37" />
          <line x1="60" y1="20" x2="340" y2="20" stroke="#8C5832" strokeWidth="1" strokeDasharray="6 4" />

          {/* Left: Chiêng Mẹ (Chiêng phẳng - T’roong) */}
          <g transform="translate(110, 95)">
            {/* Hanging Cords from rack */}
            <line x1="-15" y1="-75" x2="-8" y2="-45" stroke="#B85D38" strokeWidth="2.5" />
            <line x1="15" y1="-75" x2="8" y2="-45" stroke="#B85D38" strokeWidth="2.5" />
            <ellipse cx="0" cy="-45" rx="8" ry="3" fill="#8C3F2B" />

            {/* Bronze Gong Body (Flat surface) */}
            <circle cx="0" cy="0" r="48" fill="#C59B27" stroke="#7A5A12" strokeWidth="3" />
            <circle cx="0" cy="0" r="40" fill="#DDB744" stroke="#A8811E" strokeWidth="1.2" />
            <circle cx="0" cy="0" r="28" fill="#E6C86E" stroke="#A8811E" strokeWidth="1" />
            <circle cx="0" cy="0" r="14" fill="#DDB744" stroke="#7A5A12" strokeWidth="1" strokeDasharray="3 2" />

            {/* Acoustic Sound Waves (High frequency waves) */}
            <path d="M-54 -20 A58 58 0 0 0 -54 20" stroke="#D4AF37" strokeWidth="1.5" fill="none" opacity="0.7" />
            <path d="M-60 -28 A66 66 0 0 0 -60 28" stroke="#D4AF37" strokeWidth="1.5" fill="none" opacity="0.4" />

            {/* Label Card */}
            <rect x="-65" y="54" width="130" height="34" rx="6" fill="#FFFFFF" stroke="#DDD5C7" strokeWidth="1" />
            <text x="0" y="68" textAnchor="middle" fill="#7A4E38" fontSize="10" fontWeight="bold">Chiêng Mẹ (T’roong)</text>
            <text x="0" y="82" textAnchor="middle" fill="#736B60" fontSize="8.5">Mặt phẳng • Âm vang cao</text>
          </g>

          {/* Center: Gong Mallet (Dùi đánh chiêng bọc vải) */}
          <g transform="translate(200, 95)">
            {/* Wooden Handle */}
            <line x1="-15" y1="35" x2="15" y2="-25" stroke="#7A4E38" strokeWidth="4" strokeLinecap="round" />
            {/* Red Cloth Padded Striker Head */}
            <circle cx="15" cy="-25" r="9" fill="#B83A28" stroke="#7A1D10" strokeWidth="1.5" />
            <circle cx="13" cy="-27" r="3" fill="#E57373" />
            <text x="0" y="48" textAnchor="middle" fill="#8C5832" fontSize="8" fontStyle="italic" fontWeight="600">Dùi bịt vải</text>
          </g>

          {/* Right: Chiêng Cha (Chiêng có núm - Cheng) */}
          <g transform="translate(290, 95)">
            {/* Hanging Cords from rack */}
            <line x1="-15" y1="-75" x2="-8" y2="-45" stroke="#B85D38" strokeWidth="2.5" />
            <line x1="15" y1="-75" x2="8" y2="-45" stroke="#B85D38" strokeWidth="2.5" />
            <ellipse cx="0" cy="-45" rx="8" ry="3" fill="#8C3F2B" />

            {/* Bronze Gong Body */}
            <circle cx="0" cy="0" r="48" fill="#A8811E" stroke="#5C440D" strokeWidth="3" />
            <circle cx="0" cy="0" r="38" fill="#C59B27" stroke="#7A5A12" strokeWidth="1.2" />
            <circle cx="0" cy="0" r="26" fill="#A8811E" stroke="#5C440D" strokeWidth="1" />

            {/* Prominent 3D Raised Knob (Núm chiêng) */}
            <circle cx="0" cy="0" r="14" fill="#5C440D" stroke="#3D2C06" strokeWidth="2" />
            <circle cx="-2" cy="-2" r="9" fill="#8A6715" />
            <circle cx="-4" cy="-4" r="4" fill="#DDB744" opacity="0.8" />

            {/* Acoustic Sound Waves (Deep frequency waves) */}
            <path d="M54 -20 A58 58 0 0 1 54 20" stroke="#A8811E" strokeWidth="2" fill="none" opacity="0.7" />
            <path d="M60 -28 A66 66 0 0 1 60 28" stroke="#A8811E" strokeWidth="1.5" fill="none" opacity="0.4" />

            {/* Label Card */}
            <rect x="-65" y="54" width="130" height="34" rx="6" fill="#FFFFFF" stroke="#DDD5C7" strokeWidth="1" />
            <text x="0" y="68" textAnchor="middle" fill="#7A4E38" fontSize="10" fontWeight="bold">Chiêng Cha (Cheng)</text>
            <text x="0" y="82" textAnchor="middle" fill="#736B60" fontSize="8.5">Có núm giữa • Âm trầm giữ nhịp</text>
          </g>

          {/* Explanatory Caption Banner */}
          <g transform="translate(20, 204)">
            <rect x="0" y="0" width="360" height="24" rx="6" fill="#FFFFFF" stroke="#B35C44" strokeWidth="1" opacity="0.95" />
            <text x="180" y="16" textAnchor="middle" fill="#5A2416" fontSize="10" fontWeight="bold">
              Cấu tạo đôi Cồng Chiêng Cơ Tu truyền thống (Chiêng Mẹ & Chiêng Cha)
            </text>
          </g>
        </svg>
      ),
    },
    {
      id: 'vis_ktu_drum',
      title: 'Trống K’tu (S’gơr) – Trái Tim Nhịp Điệu',
      coTuTerm: 'Trống S’gơr',
      category: 'Nhạc cụ màng da',
      badge: 'Trống cái',
      caption: 'Thân gỗ khoét rỗng nguyên khối bịt da trâu rừng hai đầu căng bằng nẹp mây',
      description: 'Trống K’tu có kích thước lớn, thân uốn thon ở giữa như eo đồng hồ cát. Hai mặt bịt da trâu già đực được chằng néo bằng những sợi mây rừng dẻo dai giúp tiếng trống đanh chắc, dội vang khắp thung lũng.',
      culturalMeaning: 'Tiếng trống đại diện cho nhịp đập con tim của làng, hiệu lệnh tập hợp dân làng khi có việc khẩn cấp hoặc mở đầu những khúc ca mừng hội.',
      features: [
        'Thân khoét từ thân cây gỗ chò hoặc mít rừng già',
        'Mặt trống bịt da trâu phơi khô kỹ lưỡng',
        'Nẹp mây đan chéo mắt cáo chắc chắn',
        'Treo trang trọng cạnh cột Cái trong Nhà Gươl'
      ],
      svgGraphic: (
        <svg viewBox="0 0 400 240" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="400" height="240" fill="#F4EFE6" />
          
          {/* Suspended Wooden Beam */}
          <rect x="50" y="25" width="300" height="14" rx="3" fill="#6B4F3B" stroke="#3D2817" strokeWidth="2" />
          
          {/* Suspension Ropes */}
          <line x1="120" y1="39" x2="140" y2="85" stroke="#D4A373" strokeWidth="3" />
          <line x1="280" y1="39" x2="260" y2="85" stroke="#D4A373" strokeWidth="3" />

          {/* Drum Body (Horizontal Hourglass shape) */}
          <g transform="translate(200, 130)">
            {/* Wooden Barrel */}
            <path d="M-90 -45 Q0 -35 90 -45 L90 45 Q0 35 -90 45 Z" fill="#8C4A2F" stroke="#4A2213" strokeWidth="3" />
            
            {/* Left Drumhead (Skin) */}
            <ellipse cx="-90" cy="0" rx="14" ry="45" fill="#D2B48C" stroke="#4A2213" strokeWidth="2" />
            
            {/* Right Drumhead (Skin) */}
            <ellipse cx="90" cy="0" rx="14" ry="45" fill="#C5A070" stroke="#4A2213" strokeWidth="2" />

            {/* Rattan laced criss-cross braces (Dây mây chằng nẹp) */}
            {[-70, -40, -10, 20, 50, 80].map((x, i) => (
              <g key={`lace-${i}`}>
                <line x1={x - 15} y1="-40" x2={x + 15} y2="40" stroke="#E6C280" strokeWidth="1.5" />
                <line x1={x + 15} y1="-40" x2={x - 15} y2="40" stroke="#E6C280" strokeWidth="1.5" />
              </g>
            ))}
          </g>

          {/* Caption Banner */}
          <g transform="translate(30, 204)">
            <rect x="0" y="0" width="340" height="24" rx="6" fill="#FFFFFF" stroke="#7A4E38" strokeWidth="1" opacity="0.95" />
            <text x="170" y="16" textAnchor="middle" fill="#5A2416" fontSize="10" fontWeight="bold">
              Trống K’tu (S’gơr) – Giữ nhịp phách chủ đạo cho toàn buôn làng
            </text>
          </g>
        </svg>
      ),
    },
  ],

  speaking: [
    {
      id: 'vis_bhnooch_dialogue',
      title: 'Nghệ Thuật Đối Đáp Nói Lý – Hát Lý',
      coTuTerm: 'Bh’nooch',
      category: 'Văn học dân gian',
      badge: 'Ứng tác ngôn từ',
      caption: 'Hai bên ngồi quây quần bên bếp lửa Nhà Gươl đối đáp bằng lời thơ ví von',
      description: 'Nói lý – Hát lý không dùng văn bản có sẵn. Người nói mượn hình tượng thiên nhiên cây cỏ (con suối, cây nứa, hạt ngô, con chim) để gián tiếp bộc lộ tâm tình, phân tích đúng sai mà không làm mất lòng người nghe.',
      culturalMeaning: 'Đỉnh cao của văn hóa ứng xử hòa bình, sự tôn trọng và nghệ thuật ngoại giao dân gian của đồng bào Cơ Tu.',
      features: [
        'Lời thơ giàu hình tượng ẩn dụ so sánh',
        'Ngâm nga theo làn điệu dân ca trầm bổng',
        'Dùng chén rượu tà-vạt kết thúc cuộc hòa giải',
        'Được công nhận Di sản Phi vật thể Quốc gia'
      ],
      svgGraphic: (
        <svg viewBox="0 0 400 240" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="400" height="240" fill="#242120" />
          
          {/* Warm Hearth Fire at Center */}
          <ellipse cx="200" cy="175" rx="40" ry="12" fill="#3A1C0E" />
          <path d="M185 170 Q200 120 215 170 Q200 135 185 170 Z" fill="#E53E3E" opacity="0.8" />
          <path d="M190 170 Q200 130 210 170" fill="#ED8936" />
          <circle cx="200" cy="155" r="8" fill="#ECC94B" opacity="0.9" />

          {/* Left Elder (Speaking / Nói Lý) */}
          <g transform="translate(60, 80)">
            <circle cx="30" cy="30" r="18" fill="#C58F58" />
            <path d="M20 18 Q30 10 40 18" stroke="#3D2010" strokeWidth="4" /> {/* Turban */}
            <path d="M10 80 Q30 48 50 80 Z" fill="#7A3B22" />
            
            {/* Speech bubble: Spacious & High Contrast */}
            <g transform="translate(-40, -55)">
              <rect x="0" y="0" width="145" height="42" rx="8" fill="#FFFFFF" stroke="#B35C44" strokeWidth="1.8" />
              {/* Pointer Tail */}
              <polygon points="65,42 75,52 80,42" fill="#FFFFFF" />
              <line x1="65" y1="42" x2="75" y2="52" stroke="#B35C44" strokeWidth="1.8" />
              <line x1="75" y1="52" x2="80" y2="42" stroke="#B35C44" strokeWidth="1.8" />
              
              <text x="72" y="17" textAnchor="middle" fill="#7A4E38" fontSize="8.5" fontWeight="600">NGƯỜI NÓI LÝ</text>
              <text x="72" y="32" textAnchor="middle" fill="#8C2D19" fontSize="10.5" fontWeight="bold">"Lời như suối trong..."</text>
            </g>
          </g>

          {/* Right Elder (Singing response / Hát Lý) */}
          <g transform="translate(260, 80)">
            <circle cx="30" cy="30" r="18" fill="#C58F58" />
            <path d="M20 18 Q30 10 40 18" stroke="#1C3822" strokeWidth="4" /> {/* Turban */}
            <path d="M10 80 Q30 48 50 80 Z" fill="#2D4232" />
            
            {/* Response bubble: Spacious & High Contrast */}
            <g transform="translate(-25, -55)">
              <rect x="0" y="0" width="145" height="42" rx="8" fill="#FFFFFF" stroke="#2D4232" strokeWidth="1.8" />
              {/* Pointer Tail */}
              <polygon points="55,42 60,52 70,42" fill="#FFFFFF" />
              <line x1="55" y1="42" x2="60" y2="52" stroke="#2D4232" strokeWidth="1.8" />
              <line x1="60" y1="52" x2="70" y2="42" stroke="#2D4232" strokeWidth="1.8" />
              
              <text x="72" y="17" textAnchor="middle" fill="#556B2F" fontSize="8.5" fontWeight="600">NGƯỜI HÁT LÝ</text>
              <text x="72" y="32" textAnchor="middle" fill="#1C3822" fontSize="10.5" fontWeight="bold">"Dạ sáng như trăng..."</text>
            </g>
          </g>

          {/* Caption Banner */}
          <g transform="translate(20, 204)">
            <rect x="0" y="0" width="360" height="24" rx="6" fill="#FFFFFF" stroke="#D4AF37" strokeWidth="1" opacity="0.95" />
            <text x="180" y="16" textAnchor="middle" fill="#5A2416" fontSize="10" fontWeight="bold">
              Bếp lửa Gươl – Không gian thiêng trao truyền Nói lý Hát lý (Bh’nooch)
            </text>
          </g>
        </svg>
      ),
    },
  ],

  woodcraft: [
    {
      id: 'vis_gui_ba_ngan',
      title: 'Chiếc Gùi Ba Ngăn (Đao / Pa-nhưng)',
      coTuTerm: 'Gùi Đao',
      category: 'Nghệ thuật đan lát',
      badge: 'Đan lát tinh xảo',
      caption: 'Vật dụng tùy thân độc đáo của đàn ông Cơ Tu mang khi đi săn và bảo vệ rừng',
      description: 'Chiếc gùi đan bằng mây rừng dẻo dai, chia làm 3 ngăn đứng tách biệt: Ngăn chính lớn để lương thực áo ấm, 2 ngăn nhỏ hai bên đựng tên nỏ, bùi nhùi lấy lửa và dao quắm.',
      culturalMeaning: 'Biểu tượng cho sự khéo léo, dũng cảm và trưởng thành của người đàn ông Cơ Tu trụ cột gia đình.',
      features: [
        'Kỹ thuật đan nan mây khít chống nước mưa rừng',
        'Có nắp đậy bằng da thú hoặc lá cọ đan chắc chắn',
        'Quai đeo bằng vỏ cây rừng êm vai khi vượt đèo',
        'Hoa văn nan nhuộm đen chàm xen kẽ nan mây vàng óng'
      ],
      svgGraphic: (
        <svg viewBox="0 0 400 240" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="400" height="240" fill="#FAF7F0" />
          
          {/* Main 3-Compartment Backpack (Gùi Đao) */}
          <g transform="translate(130, 30)">
            {/* Center Main Compartment */}
            <rect x="35" y="20" width="70" height="150" rx="8" fill="#D4A373" stroke="#5C381E" strokeWidth="2.5" />
            
            {/* Left Compartment */}
            <rect x="5" y="40" width="30" height="130" rx="6" fill="#C58F58" stroke="#5C381E" strokeWidth="2" />
            
            {/* Right Compartment */}
            <rect x="105" y="40" width="30" height="130" rx="6" fill="#C58F58" stroke="#5C381E" strokeWidth="2" />

            {/* Woven Crosshatch Mesh pattern */}
            {[...Array(10)].map((_, i) => (
              <line key={`w-${i}`} x1="5" y1={40 + i * 13} x2="135" y2={40 + i * 13} stroke="#7A4E2D" strokeWidth="1" />
            ))}

            {/* Lid Flap */}
            <path d="M30 20 Q70 5 110 20 L105 38 L35 38 Z" fill="#8C3F2B" stroke="#4A1E11" strokeWidth="2" />

            {/* Carrying Straps */}
            <path d="M40 50 Q10 90 25 140" stroke="#5A2E17" strokeWidth="4" fill="none" />
            <path d="M100 50 Q130 90 115 140" stroke="#5A2E17" strokeWidth="4" fill="none" />
          </g>

          {/* Caption Banner */}
          <g transform="translate(30, 204)">
            <rect x="0" y="0" width="340" height="24" rx="6" fill="#FFFFFF" stroke="#7A4E38" strokeWidth="1" opacity="0.95" />
            <text x="170" y="16" textAnchor="middle" fill="#5A2416" fontSize="10" fontWeight="bold">
              Cấu trúc 3 ngăn độc đáo của Gùi Đao Cơ Tu
            </text>
          </g>
        </svg>
      ),
    },
    {
      id: 'vis_wood_sculpture',
      title: 'Tượng Gỗ Dân Gian & Phù Điêu Gươl',
      coTuTerm: 'T’rak',
      category: 'Điêu khắc dân gian',
      badge: 'Nghệ thuật tạc tượng',
      caption: 'Nghệ nhân dùng rìu nhỏ đẽo gỗ mộc mạc khắc họa con người và muông thú',
      description: 'Điêu khắc Cơ Tu không trau chuốt nhẵn bóng mà giữ nguyên những vệt rìu mộc mạc khỏe khoắn. Các chủ đề quen thuộc: Người mẹ bồng con, phụ nữ giã gạo, người đàn ông đánh chiêng, chim tring, kỳ đà.',
      culturalMeaning: 'Phản ánh chân thực cuộc sống lao động, khát vọng phồn vinh và tình cảm gia đình ấm cúng giữa đại ngàn.',
      features: [
        'Chất liệu gỗ rừng chịu mối mọt tự nhiên',
        'Hình khối mộc mạc, biểu cảm chân thật',
        'Gắn ở cột hiên, vách ngăn và đầu cầu thang Nhà Gươl',
        'Nhuộm màu bằng tro bếp và vôi tự nhiên'
      ],
      svgGraphic: (
        <svg viewBox="0 0 400 240" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="400" height="240" fill="#EAE4D8" />
          
          {/* Wooden Statue 1: Woman Pounding Rice */}
          <g transform="translate(100, 35)">
            {/* Wooden log pillar */}
            <rect x="15" y="10" width="50" height="160" rx="6" fill="#7A4E38" stroke="#3D2416" strokeWidth="2" />
            {/* Carved Figure */}
            <circle cx="40" cy="35" r="12" fill="#C58F58" />
            <rect x="30" y="50" width="20" height="50" rx="3" fill="#A86F3E" />
            {/* Pestle & Mortar */}
            <rect x="36" y="25" width="8" height="90" rx="2" fill="#D4AF37" />
            <ellipse cx="40" cy="125" rx="16" ry="10" fill="#5C381E" />
            <text x="40" y="188" textAnchor="middle" fill="#7A4E38" fontSize="9" fontWeight="bold">Người giã gạo</text>
          </g>

          {/* Wooden Statue 2: Man with Gong */}
          <g transform="translate(240, 35)">
            <rect x="15" y="10" width="50" height="160" rx="6" fill="#7A4E38" stroke="#3D2416" strokeWidth="2" />
            <circle cx="40" cy="35" r="12" fill="#C58F58" />
            <rect x="30" y="50" width="20" height="50" rx="3" fill="#A86F3E" />
            {/* Gong Held */}
            <circle cx="40" cy="75" r="16" fill="#D4AF37" stroke="#3D2416" strokeWidth="1.5" />
            <text x="40" y="188" textAnchor="middle" fill="#7A4E38" fontSize="9" fontWeight="bold">Người đánh chiêng</text>
          </g>
        </svg>
      ),
    },
  ],

  dailylife: [
    {
      id: 'vis_bamboo_tube_food',
      title: 'Ẩm Thực Ống Tre (Cơm Lam & Zơră)',
      coTuTerm: 'C’har & Zơră',
      category: 'Văn hóa ẩm thực',
      badge: 'Nướng ống tre',
      caption: 'Gạo nếp nương và thịt cá rừng trộn gia vị nướng chín trong ống tre tươi bánh tẻ',
      description: 'Phương thức nấu nướng độc đáo không dùng nồi kim loại: Cho nguyên liệu vào ống nứa tươi, dùng lá chuối hoặc lá đót bịt kín miệng rồi gác lên than hồng nướng đều tay cho đến khi cật tre cháy xém.',
      culturalMeaning: 'Bảo lưu trọn vẹn vị ngọt thanh khiết của sản vật tự nhiên và thích ứng hoàn hảo với cuộc sống đi rừng của cha ông.',
      features: [
        'Ống tre tiết ra lớp màng lụa mỏng thơm ngát bọc quanh hạt cơm',
        'Gia vị đặc trưng: Tiêu rừng (amất), kiệu rừng, ớt chỉ thiên',
        'Bảo quản thức ăn được nhiều ngày mà không ôi thiu',
        'Món ăn đãi khách quý và dâng cúng lễ hội'
      ],
      svgGraphic: (
        <svg viewBox="0 0 400 240" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="400" height="240" fill="#FAF6EE" />
          
          {/* Charcoal Hearth with Embers */}
          <ellipse cx="200" cy="180" rx="140" ry="25" fill="#3D3028" />
          <ellipse cx="200" cy="180" rx="110" ry="18" fill="#1C1510" />
          {/* Glowing coals */}
          {[140, 170, 200, 230, 260].map((x, idx) => (
            <circle key={`coal-${idx}`} cx={x} cy={180 + (idx % 2 ? 3 : -3)} r="7" fill="#E53E3E" opacity="0.8" />
          ))}

          {/* Bamboo Tube 1 (Cơm lam) leaning */}
          <g transform="translate(130, 70) rotate(25)">
            <rect x="0" y="0" width="22" height="130" rx="4" fill="#7A9A60" stroke="#3D5628" strokeWidth="2" />
            <line x1="0" y1="40" x2="22" y2="40" stroke="#3D5628" strokeWidth="1.5" />
            <line x1="0" y1="85" x2="22" y2="85" stroke="#3D5628" strokeWidth="1.5" />
            {/* Burn mark at bottom */}
            <rect x="0" y="95" width="22" height="35" rx="3" fill="#2B2B2B" opacity="0.6" />
            {/* Leaf stopper at top */}
            <path d="M-2 0 Q11 -12 24 0 Z" fill="#4B6B50" />
            <text x="11" y="-16" textAnchor="middle" fill="#2D4232" fontSize="9" fontWeight="bold">Cơm Lam</text>
          </g>

          {/* Bamboo Tube 2 (Zơră) leaning */}
          <g transform="translate(230, 70) rotate(-25)">
            <rect x="0" y="0" width="24" height="130" rx="4" fill="#6B8A50" stroke="#3D5628" strokeWidth="2" />
            <line x1="0" y1="45" x2="24" y2="45" stroke="#3D5628" strokeWidth="1.5" />
            <line x1="0" y1="90" x2="24" y2="90" stroke="#3D5628" strokeWidth="1.5" />
            <rect x="0" y="95" width="24" height="35" rx="3" fill="#2B2B2B" opacity="0.6" />
            <path d="M-2 0 Q12 -12 26 0 Z" fill="#4B6B50" />
            <text x="12" y="-16" textAnchor="middle" fill="#B35C44" fontSize="9" fontWeight="bold">Món Zơră</text>
          </g>

          {/* Caption Banner */}
          <g transform="translate(20, 204)">
            <rect x="0" y="0" width="360" height="24" rx="6" fill="#FFFFFF" stroke="#3D5628" strokeWidth="1" opacity="0.95" />
            <text x="180" y="16" textAnchor="middle" fill="#1C3822" fontSize="10" fontWeight="bold">
              Kỹ thuật nướng gián tiếp trên than hồng giữ trọn dưỡng chất tự nhiên
            </text>
          </g>
        </svg>
      ),
    },
    {
      id: 'vis_aquat_cake',
      title: 'Bánh Sừng Trâu (A-quát) & Rượu Tà-vạt',
      coTuTerm: 'A-quát & Tà-vạt',
      category: 'Sản vật truyền thống',
      badge: 'Đặc sản di sản',
      caption: 'Bánh nếp hình đôi sừng trâu và thức uống lên men từ dịch cây rừng tự nhiên',
      description: 'Bánh A-quát gói bằng lá đót khéo léo thành hai đầu sừng trâu uốn cong. Rượu Tà-vạt hứng từ cuống hoa cây đoác đại ngàn, lên men bằng vỏ cây chuồn mà không qua chưng cất.',
      culturalMeaning: 'Biểu trưng của lòng hiếu khách, sự thủy chung và tình cảm đùm bọc trong mọi ngày hội đại đoàn kết buôn làng.',
      features: [
        'Gạo nếp dẻo thơm không nhân thanh đạm',
        'Gói thành cặp đôi sừng trâu gắn kết',
        'Nước tà-vạt sủi bọt trắng thơm thanh mát',
        'Tri thức khai thác bền vững không tổn hại cây rừng'
      ],
      svgGraphic: (
        <svg viewBox="0 0 400 240" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="400" height="240" fill="#F4EFE6" />
          
          {/* Plate / Bamboo Tray */}
          <ellipse cx="140" cy="140" rx="90" ry="45" fill="#D4A373" stroke="#7A4E38" strokeWidth="2" />
          
          {/* Buffalo Horn Cake (A-quát) */}
          <g transform="translate(100, 100)">
            {/* Horn shape left */}
            <path d="M20 30 Q5 0 40 10 Q25 25 20 30 Z" fill="#6B8E4E" stroke="#3D5628" strokeWidth="1.5" />
            {/* Horn shape right */}
            <path d="M60 30 Q75 0 40 10 Q55 25 60 30 Z" fill="#5B7E3E" stroke="#3D5628" strokeWidth="1.5" />
            <circle cx="40" cy="20" r="8" fill="#D4AF37" stroke="#7A5A12" />
            <text x="40" y="55" textAnchor="middle" fill="#2D4232" fontSize="9" fontWeight="bold">Bánh A-quát</text>
          </g>

          {/* Bamboo Cup with Tà-vạt Wine */}
          <g transform="translate(270, 75)">
            <rect x="10" y="20" width="45" height="75" rx="5" fill="#C5A070" stroke="#5C381E" strokeWidth="2" />
            <ellipse cx="32.5" cy="20" rx="22.5" ry="8" fill="#FFFFFF" stroke="#5C381E" strokeWidth="1.5" />
            <ellipse cx="32.5" cy="20" rx="18" ry="5" fill="#FAF8F5" />
            {/* Froth bubbles */}
            <circle cx="28" cy="19" r="2.5" fill="#E2E8F0" />
            <circle cx="36" cy="18" r="2" fill="#E2E8F0" />
            <text x="32.5" y="115" textAnchor="middle" fill="#7A4E38" fontSize="9" fontWeight="bold">Rượu Tà-vạt sủi bọt</text>
          </g>

          {/* Caption Banner */}
          <g transform="translate(20, 204)">
            <rect x="0" y="0" width="360" height="24" rx="6" fill="#FFFFFF" stroke="#7A4E38" strokeWidth="1" opacity="0.95" />
            <text x="180" y="16" textAnchor="middle" fill="#5A2416" fontSize="10" fontWeight="bold">
              Hương vị đại ngàn trao gửi tình cảm nồng hậu của đồng bào Cơ Tu
            </text>
          </g>
        </svg>
      ),
    },
  ],
};

interface HeritageKnowledgeGalleryProps {
  stationId: string;
}

export const HeritageKnowledgeGallery: React.FC<HeritageKnowledgeGalleryProps> = ({ stationId }) => {
  const visuals = STATION_HERITAGE_VISUALS[stationId] || [];
  const [activeVisualId, setActiveVisualId] = useState<string>(visuals[0]?.id || '');
  const [isZoomModalOpen, setIsZoomModalOpen] = useState(false);

  if (visuals.length === 0) return null;

  const currentVisual = visuals.find((v) => v.id === activeVisualId) || visuals[0];

  return (
    <div className="bg-[#FAF8F5] p-5 sm:p-6 rounded-2xl border border-[#E3DCD2] shadow-xs space-y-5">
      {/* Header of Section */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#DDD5C7]">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#B35C44] text-white flex items-center justify-center shadow-2xs">
            <Sparkles className="w-4 h-4 text-amber-300" />
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-serif font-bold text-[#2F2F2F] flex items-center gap-2">
              <span>Hình Ảnh & Sơ Đồ Minh Họa Kiến Thức Di Sản</span>
              <span className="text-[10px] font-sans font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#FAF2EB] text-[#B35C44] border border-[#B35C44]/30">
                {visuals.length} Minh họa trực quan
              </span>
            </h3>
            <p className="text-xs text-[#736B60]">
              Khám phá sơ đồ cấu trúc, kỹ thuật cổ truyền và biểu tượng văn hóa chi tiết
            </p>
          </div>
        </div>

        {/* Visual Selector Pills */}
        <div className="flex flex-wrap items-center gap-1.5 bg-[#EFECE6] p-1 rounded-xl border border-[#DDD5C7]">
          {visuals.map((vis) => (
            <button
              key={vis.id}
              type="button"
              id={`btn-select-vis-${vis.id}`}
              onClick={() => setActiveVisualId(vis.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeVisualId === vis.id
                  ? 'bg-white text-[#B35C44] shadow-xs font-bold border border-[#DDD5C7]'
                  : 'text-[#6B665E] hover:text-[#2F2F2F]'
              }`}
            >
              <span>{vis.title}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Visual Display & Explanation Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Graphic Artwork Container */}
        <div className="lg:col-span-7 space-y-2">
          <div className="relative rounded-2xl overflow-hidden border border-[#DDD5C7] shadow-sm bg-white aspect-[5/3] group">
            {currentVisual.svgGraphic}

            {/* Quick Badge */}
            <div className="absolute top-3 left-3 flex items-center gap-1.5">
              <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#2F2F2F]/80 backdrop-blur-xs text-[#FAF8F5] border border-white/20 shadow-xs">
                {currentVisual.badge}
              </span>
              {currentVisual.coTuTerm && (
                <span className="px-2.5 py-1 rounded-full text-[11px] font-serif italic bg-[#B35C44]/90 backdrop-blur-xs text-white border border-white/20 shadow-xs">
                  {currentVisual.coTuTerm}
                </span>
              )}
            </div>

            {/* Zoom Action */}
            <button
              type="button"
              id="btn-zoom-svg-graphic"
              onClick={() => setIsZoomModalOpen(true)}
              className="absolute bottom-3 right-3 p-2 rounded-xl bg-[#2F2F2F]/70 hover:bg-[#2F2F2F]/90 text-white backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity border border-white/20 cursor-pointer shadow-xs"
              title="Phóng to sơ đồ minh họa"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
          </div>

          <p className="text-xs text-[#736B60] italic px-1">
            * {currentVisual.caption}
          </p>
        </div>

        {/* Right: Rich Cultural Explanation */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-[#FAF8F5] p-4 rounded-xl border border-[#E3DCD2] space-y-2.5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#B35C44]">
              {currentVisual.category}
            </span>
            <h4 className="text-base sm:text-lg font-serif font-bold text-[#2F2F2F]">
              {currentVisual.title}
            </h4>
            <p className="text-xs sm:text-sm text-[#555047] leading-relaxed">
              {currentVisual.description}
            </p>
          </div>

          {/* Cultural Meaning Callout */}
          <div className="p-3.5 rounded-xl bg-[#FAF2EB] border border-[#B35C44]/30 space-y-1">
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#B35C44]">
              <Info className="w-3.5 h-3.5" />
              <span>Ý nghĩa biểu tượng di sản:</span>
            </div>
            <p className="text-xs text-[#6A3928] leading-relaxed">
              {currentVisual.culturalMeaning}
            </p>
          </div>

          {/* Key Visual Features List */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-[#2F2F2F] flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#2D4232]" />
              Đặc điểm trực quan cần ghi nhớ:
            </span>
            <ul className="space-y-1.5">
              {currentVisual.features.map((feat, fIdx) => (
                <li key={fIdx} className="text-xs text-[#555047] flex items-start gap-2 bg-[#EFECE6] p-2 rounded-lg border border-[#DDD5C7]">
                  <ChevronRight className="w-3.5 h-3.5 text-[#B35C44] shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Fullscreen Zoom Modal */}
      {isZoomModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm animate-in fade-in"
          onClick={() => setIsZoomModalOpen(false)}
        >
          <div
            className="relative max-w-4xl w-full bg-[#FAF8F5] p-6 rounded-2xl border border-[#DDD5C7] shadow-2xl flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-full flex items-center justify-between pb-3 border-b border-[#DDD5C7] mb-4">
              <div>
                <h3 className="font-serif font-bold text-lg text-[#2F2F2F]">
                  {currentVisual.title}
                </h3>
                <p className="text-xs text-[#736B60]">{currentVisual.caption}</p>
              </div>
              <button
                type="button"
                onClick={() => setIsZoomModalOpen(false)}
                className="px-3 py-1.5 bg-[#EFECE6] hover:bg-[#DDD5C7] rounded-xl text-xs font-bold text-[#2F2F2F] transition-colors"
              >
                Đóng ✕
              </button>
            </div>

            <div className="w-full aspect-[5/3] max-h-[60vh] rounded-xl overflow-hidden border border-[#DDD5C7] bg-white shadow-inner">
              {currentVisual.svgGraphic}
            </div>

            <p className="text-xs text-[#555047] mt-4 text-center max-w-2xl leading-relaxed">
              {currentVisual.description}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
