import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { StationId, UserProgress } from '../types';
import { STATIONS_DATA } from '../data/culturalData';
import { IMAGE_ASSETS } from '../data/imageAssets';
import { CulturalImage } from './CulturalImage';
import { KienSangAvatar } from './KienSangAvatar';
import { FptSchoolLogo } from './FptSchoolLogo';
import {
  X,
  BookOpen,
  Sparkles,
  Award,
  Compass,
  ArrowRight,
  CheckCircle2,
  ListFilter,
  Grid,
  FileText,
  Printer,
  ChevronRight,
  HelpCircle,
  Flame,
  Music,
  Palette,
  Home,
  Utensils,
  Feather,
  Trees,
} from 'lucide-react';

interface HeritageSummaryModalProps {
  progress: UserProgress;
  onClose: () => void;
  onSelectStation: (stationId: StationId) => void;
  onNavigateCertificate: () => void;
}

interface DetailedStationSummary {
  id: StationId;
  order: number;
  title: string;
  coTuTitle: string;
  badge?: string;
  category: string;
  icon: React.ReactNode;
  tagline: string;
  coreHighlights: string[];
  culturalSignificance: string;
  curriculumConnection: string;
  elderWisdom: string;
  reviewQuestion: string;
  imageId: string;
}

const DETAILED_SUMMARIES: DetailedStationSummary[] = [
  {
    id: 'residence',
    order: 1,
    title: 'Người Cơ Tu & Không Gian Cư Trú',
    coTuTitle: 'Cơ Tu & Cr’nguul Bh’lưng',
    category: 'Môi trường & Không gian sống',
    icon: <Trees className="w-5 h-5 text-emerald-700" />,
    tagline: 'Hòa quyện keo sơn giữa con người với rừng già và nguồn nước dãy Trường Sơn hùng vĩ.',
    coreHighlights: [
      'Cấu trúc làng truyền thống xếp theo hình vành khuyên hoặc bầu dục, ôm trọn lấy ngôi Nhà Gươl ở vị trí trung tâm cao ráo.',
      'Tri thức bản địa chọn đất lập làng bên sườn đồi thoai thoải, gần nguồn suối trong lành nhưng tuyệt đối tránh dòng lũ quét mùa mưa.',
      'Triết lý "Rừng chở che người, người gìn giữ rừng" — người Cơ Tu chỉ khai thác có giới hạn và luôn tôn kính các khu rừng đầu nguồn thiêng liêng.',
    ],
    culturalSignificance:
      'Minh chứng cho lối sống sinh thái xanh, tôn trọng tự nhiên và tinh thần đùm bọc cộng đồng từ thuở khai hoang lập làng.',
    curriculumConnection:
      'Môn Lịch sử & Địa lý THCS: Địa hình Trường Sơn, sự phân bố các dân tộc thiểu số và ý thức bảo vệ tài nguyên môi trường.',
    elderWisdom: 'Con chim có tổ trên ngàn, người Cơ Tu có rừng Trường Sơn che chở. Giữ được rừng là giữ được sự sống của làng!',
    reviewQuestion: 'Làng Cơ Tu truyền thống được bố trí theo hình dạng gì và công trình nào nằm ở trung tâm?',
    imageId: 'stationResidence',
  },
  {
    id: 'guol',
    order: 2,
    title: 'Nhà Gươl – Trái Tim Của Buôn Làng',
    coTuTitle: 'Gươl – Cr’nguul Pr’loọng Vel',
    badge: 'Di sản Văn hóa Tiêu biểu',
    category: 'Kiến trúc & Không gian cộng đồng',
    icon: <Home className="w-5 h-5 text-[#B35C44]" />,
    tagline: 'Biểu tượng tối cao của sự độc lập, quyền lực và tinh thần đoàn kết toàn thể dân làng.',
    coreHighlights: [
      'Gươl là công trình lớn nhất, trang trọng nhất làng; chỉ làng nào dựng được Gươl hoàn chỉnh mới được xem là một làng độc lập vững mạnh.',
      'Mái Gươl lợp lá nón hoặc mây rừng cong vút tựa mu rùa kiên cố hoặc đôi cánh chim tring huyền thoại bay lượn giữa đại ngàn.',
      'Cột cái T’rang to lớn nằm chính giữa, được đục đẽo công phu với hình tượng chim muông, hoa văn mặt trời và người nhảy múa Tân’tung.',
    ],
    culturalSignificance:
      'Trung tâm sinh hoạt văn hóa, nơi tổ chức lễ hội lớn, bàn việc làng, phân xử hòa giải và truyền dạy phong tục cho thế hệ trẻ.',
    curriculumConnection:
      'Môn Lịch sử & GDCD: Tinh thần dân chủ làng xã, tính cộng đồng và bảo tồn kiến trúc gỗ truyền thống Việt Nam.',
    elderWisdom: 'Nhà riêng có thể dột nát, nhưng Nhà Gươl của làng phải luôn vững chãi và đỏ lửa đêm ngày!',
    reviewQuestion: 'Tại sao người Cơ Tu quan niệm một ngôi làng chỉ thực sự độc lập khi đã có Nhà Gươl?',
    imageId: 'stationGuol',
  },
  {
    id: 'weaving',
    order: 3,
    title: 'Kỹ Nghệ Dệt Zèng & Luồn Cườm',
    coTuTitle: 'Ta’ôôch & Zèng Ch’cươm',
    badge: 'Di sản Văn hóa Phi vật thể Quốc gia',
    category: 'Nghề thủ công truyền thống',
    icon: <Palette className="w-5 h-5 text-amber-700" />,
    tagline: 'Tuyệt kỹ dệt thổ cẩm luồn trực tiếp hạt cườm vào từng thớ sợi độc nhất vô nhị.',
    coreHighlights: [
      'Khung dệt bằng tre nứa gọn nhẹ, người phụ nữ ngồi bệt duỗi thẳng chân, dùng dây đai da vòng qua thắt lưng để giữ căng sợi dệt.',
      'Kỹ thuật cấy cườm độc đáo: luồn từng hạt chì hoặc cườm sứ trực tiếp vào sợi dọc khi dệt, tạo hoa văn hình học kỷ hà chìm nổi bền đẹp hàng chục năm.',
      'Màu sắc tự nhiên chiết xuất từ núi rừng: màu đen từ bùn non và lá tràm, màu đỏ từ rễ cây tà-râm, màu vàng từ củ nghệ rừng.',
    ],
    culturalSignificance:
      'Tấm zèng là thước đo sự khéo léo, nết na của người con gái Cơ Tu, là lễ vật bắt buộc trong hôn nhân và biểu tượng giàu sang của gia đình.',
    curriculumConnection:
      'Môn Mỹ thuật & Công nghệ: Nghệ thuật phối màu tự nhiên, tư duy hình học ứng dụng trong trang trí hoa văn dân tộc.',
    elderWisdom: 'Mỗi hạt cườm đính trên tấm Zèng là một giọt mồ hôi và một lời nguyện cầu ấm no cho gia đình!',
    reviewQuestion: 'Điểm độc đáo khác biệt nhất của kỹ thuật dệt thổ cẩm Zèng Cơ Tu so với các dân tộc khác là gì?',
    imageId: 'stationWeaving',
  },
  {
    id: 'dance',
    order: 4,
    title: 'Vũ Điệu Dâng Trời Tân’tung Da’dá',
    coTuTitle: 'Tân’tung Da’dá – T’roong Yang',
    badge: 'Di sản Văn hóa Phi vật thể Quốc gia',
    category: 'Nghệ thuật Trình diễn Dân gian',
    icon: <Sparkles className="w-5 h-5 text-rose-700" />,
    tagline: 'Khúc hòa ca dâng trời đất, biểu đạt trọn vẹn vẻ đẹp dũng mãnh của đàn ông và nét duyên dáng của phụ nữ.',
    coreHighlights: [
      'Tân’tung (điệu múa nam giới): Động tác dậm chân mạnh mẽ, tay cầm khiên giáo hoặc kiếm gỗ vung cao, tượng trưng cho sức mạnh quật cường bảo vệ buôn làng.',
      'Da’dá (điệu múa nữ giới): Đôi bàn tay khép nhẹ giơ vuông góc ngang vai hướng lên trời, từng bước đi nhún nhảy mềm mại thể hiện sự khiêm nhường hứng lộc từ Mẹ Thiên Nhiên.',
      'Đội hình vòng tròn di chuyển ngược chiều kim đồng hồ quanh cây Nêu (Cột Lễ K’liang), hòa cùng nhịp trống k’tu rộn rã.',
    ],
    culturalSignificance:
      'Lời tạ ơn chân thành gửi đến các đấng thần linh (Yang), cầu chúc mùa màng bội thu, buôn làng bình an và gắn kết tình làng nghĩa xóm.',
    curriculumConnection:
      'Môn Âm nhạc & Thể dục THCS: Cảm thụ nhịp điệu dân gian, rèn luyện sự dẻo dai và tinh thần biểu diễn đồng đội.',
    elderWisdom: 'Đôi chân bước theo nhịp chiêng, hai bàn tay dâng lên đón lấy ơn lành. Khi làng múa Tân’tung Da’dá, mọi lo âu đều tan biến!',
    reviewQuestion: 'Động tác giơ hai tay lên cao trong điệu múa Da’dá của phụ nữ Cơ Tu mang ý nghĩa biểu tượng gì?',
    imageId: 'stationDance',
  },
  {
    id: 'music',
    order: 5,
    title: 'Âm Vang Cồng Chiêng & Nhạc Cụ Trường Sơn',
    coTuTitle: 'Chiêng Cheng & K’lâu K’tu',
    category: 'Âm nhạc & Nhạc cụ Cổ truyền',
    icon: <Music className="w-5 h-5 text-indigo-700" />,
    tagline: 'Tiếng lòng thiêng liêng nối kết con người với tổ tiên và vạn vật muôn loài.',
    coreHighlights: [
      'Bộ cồng chiêng gồm Chiêng Cha (Cheng - có núm giữa, đánh giữ nhịp trầm) và Chiêng Mẹ (T’roong - mặt phẳng, âm vang thanh cao bay xa qua vách núi).',
      'Trống K’tu: Thân gỗ khoét rỗng, hai mặt bịt da trâu rừng phơi khô, treo trang trọng cạnh cột cái nhà Gươl để chỉ huy toàn bộ nhịp điệu lễ hội.',
      'Các nhạc cụ độc đáo khác: Tù và bằng sừng trâu (Tơ-lía), đàn Abel làm từ ống nứa và dây thép kéo bằng cung dây mây du dương.',
    ],
    culturalSignificance:
      'Âm nhạc không chỉ phục vụ giải trí mà là ngôn ngữ thiêng kết nối người trần với cõi thần linh, hiệu lệnh báo tin mừng và xua đuổi tà ma.',
    curriculumConnection:
      'Môn Âm nhạc & Vật lý THCS: Cấu tạo nhạc cụ gõ, nguyên lý dao động âm thanh và sự lan truyền sóng âm trong không gian mở.',
    elderWisdom: 'Tiếng chiêng kêu là làng còn sống, tiếng trống gióng lên là đồng bào nhớ về cội nguồn!',
    reviewQuestion: 'Hãy phân biệt điểm khác nhau về hình dáng và chức năng giữa Chiêng Cha (Cheng) và Chiêng Mẹ (T’roong)?',
    imageId: 'stationMusic',
  },
  {
    id: 'speaking',
    order: 6,
    title: 'Nghệ Thuật Nói Lý – Hát Lý (Bh’nooch)',
    coTuTitle: 'Bh’nooch – Pr’noonh Liêm',
    badge: 'Di sản Văn hóa Phi vật thể Quốc gia',
    category: 'Trí tuệ dân gian & Văn học truyền khẩu',
    icon: <Feather className="w-5 h-5 text-teal-700" />,
    tagline: 'Đỉnh cao ứng xử nhân văn, giải hòa mọi xung đột bằng vẻ đẹp của thi ca và trí tuệ ví von.',
    coreHighlights: [
      'Người nói lý không dùng lời lẽ gay gắt hay mệnh lệnh áp đặt, mà mượn hình tượng con chim cu cu, cây măng rừng, hòn đá bờ suối để chỉ ra điều hay lẽ phải.',
      'Khả năng ứng tác xuất thần: các già làng và nghệ nhân đối đáp thơ ca hàng giờ liền một cách vần điệu, sâu sắc mà không hề có văn bản soạn sẵn.',
      'Giá trị hòa giải tuyệt đối: khi hai bên hiểu ra lý lẽ, họ bắt tay cùng uống chén rượu tà-vạt, khép lại mọi hiềm khích mà không ai bị mất thể diện.',
    ],
    culturalSignificance:
      'Bài học sâu sắc về văn hóa giao tiếp hòa nhã, giải quyết mâu thuẫn bằng sự thấu hiểu và tôn trọng nhân phẩm lẫn nhau.',
    curriculumConnection:
      'Môn Ngữ văn & GDCD: Nghệ thuật ẩn dụ so sánh, kỹ năng giao tiếp ứng xử văn minh và bài học giải quyết xung đột không bạo lực.',
    elderWisdom: 'Lời nói của người Cơ Tu phải đẹp như hoa rừng, mát lành như nước suối đầu nguồn. Đừng để lời nói làm đau lòng nhau!',
    reviewQuestion: 'Tại sao nói nghệ thuật Nói lý – Hát lý là đỉnh cao của văn hóa ứng xử nhân văn người Cơ Tu?',
    imageId: 'stationSpeaking',
  },
  {
    id: 'woodcraft',
    order: 7,
    title: 'Điêu Khắc Gỗ & Kỹ Nghệ Đan Lát Mây Tre',
    coTuTitle: 'Đoọc T’rang & Ba-lê',
    badge: 'Di sản Nghệ thuật Dân gian',
    category: 'Mỹ thuật tạo hình & Thủ công truyền thống',
    icon: <Flame className="w-5 h-5 text-orange-700" />,
    tagline: 'Bàn tay tài hoa của người đàn ông Cơ Tu biến cây gỗ và nan tre rừng thành tác phẩm nghệ thuật sống động.',
    coreHighlights: [
      'Nghệ thuật đục đẽo không cần bản vẽ: người nghệ nhân chỉ dùng chiếc rìu nhỏ và cây đục để tạc nên những bức tượng người giã gạo, người đánh cồng chiêng sống động.',
      'Hoa văn cột Gươl và nhà mồ: thể hiện thế giới quan sinh động về muông thú (kỳ đà, chim tring, rắn hổ mang) và các vì sao trên bầu trời.',
      'Kỹ nghệ đan gùi Ba-lê 3 ngăn: đan khít bằng nan mây rừng dẻo dai, chống thấm nước, dùng để đựng đồ quý và là người bạn đồng hành của đàn ông khi đi săn.',
    ],
    culturalSignificance:
      'Lưu giữ ký ức lịch sử, tín ngưỡng tâm linh và minh chứng cho sự cần cù, khéo léo, tinh thần sáng tạo không ngừng của đồng bào Cơ Tu.',
    curriculumConnection:
      'Môn Mỹ thuật & Công nghệ THCS: Nghệ thuật điêu khắc dân gian, kỹ thuật xử lý vật liệu tự nhiên (mây, tre, gỗ).',
    elderWisdom: 'Chiếc gùi đan chắc, cây cột đục khéo chính là lòng dạ người đàn ông Cơ Tu vững vàng trước giông bão!',
    reviewQuestion: 'Chiếc gùi Ba-lê 3 ngăn có đặc điểm cấu tạo và công dụng đặc biệt như thế nào đối với người đàn ông Cơ Tu?',
    imageId: 'stationWoodcraft',
  },
  {
    id: 'dailylife',
    order: 8,
    title: 'Đời Sống Thường Nhật & Văn Hóa Ẩm Thực',
    coTuTitle: 'Cha-chaom & Za-zơră Cơ Tu',
    category: 'Ẩm thực & Tri thức bản địa',
    icon: <Utensils className="w-5 h-5 text-green-700" />,
    tagline: 'Hương vị thơm lành của nương rẫy và tri thức bảo tồn nguồn sống bền vững qua nhiều thế hệ.',
    coreHighlights: [
      'Nghệ thuật nướng ống tre: Cơm Lam nấu từ gạo nếp nương trong ống nứa bánh tẻ dẻo thơm; Món Zơră (thịt, cá suối, rau rừng ướp tiêu rừng và nướng chín bằng hơi nóng ống tre).',
      'Bánh A-quát (Bánh sừng trâu): Gói bằng nếp nương thơm dẻo, biểu tượng của sự may mắn, ấm no và tình nghĩa vợ chồng thủy chung son sắt.',
      'Thức uống từ cây rừng: Rượu Tà-vạt và rượu Tr’đin lấy trực tiếp từ dịch thân cây đoác tự nhiên sủi bọt men rừng thanh mát, không gây say gắt.',
    ],
    culturalSignificance:
      'Phản ánh lối sống tự cung tự cấp hài hòa, lòng hiếu khách nồng hậu và tinh thần sẻ chia "hạt muối cắn đôi, củ sắn bẻ nửa" của cư dân vùng cao.',
    curriculumConnection:
      'Môn Công nghệ & Sinh học THCS: Giá trị dinh dưỡng thực phẩm tự nhiên, quy trình lên men vi sinh và an toàn vệ sinh môi trường sống.',
    elderWisdom: 'Miếng cơm nướng ống tre, chén rượu tà-vạt thơm nồng là tấm lòng thơm thảo dân làng mời khách phương xa!',
    reviewQuestion: 'Món Zơră và Cơm lam được chế biến theo phương pháp độc đáo nào để giữ trọn hương vị của núi rừng?',
    imageId: 'stationDailyLife',
  },
];

export const HeritageSummaryModal: React.FC<HeritageSummaryModalProps> = ({
  progress,
  onClose,
  onSelectStation,
  onNavigateCertificate,
}) => {
  const [activeTab, setActiveTab] = useState<'cards' | 'matrix' | 'overview'>('cards');
  const [selectedStationIndex, setSelectedStationIndex] = useState<number>(0);
  const [searchKeyword, setSearchKeyword] = useState<string>('');

  const completedCount = progress.completedStations.length;
  const isCompletedAll = completedCount === 8;

  const currentStation = DETAILED_SUMMARIES[selectedStationIndex] || DETAILED_SUMMARIES[0];

  const filteredStations = DETAILED_SUMMARIES.filter((st) => {
    if (!searchKeyword.trim()) return true;
    const kw = searchKeyword.toLowerCase();
    return (
      st.title.toLowerCase().includes(kw) ||
      st.coTuTitle.toLowerCase().includes(kw) ||
      st.category.toLowerCase().includes(kw) ||
      st.coreHighlights.some((h) => h.toLowerCase().includes(kw))
    );
  });

  const handlePrintSummary = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 15 }}
        className="bg-[#FAF8F5] text-[#2F2F2F] w-full max-w-5xl rounded-2xl shadow-2xl border border-[#E3DCD2] flex flex-col max-h-[92vh] overflow-hidden my-auto"
      >
        {/* Header with FPT Branding & Companion */}
        <div className="p-4 sm:p-5 bg-[#FAF2EB] border-b border-[#E3DCD2] flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#B35C44] to-[#8C3F2B] text-white flex items-center justify-center shadow-xs shrink-0">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-base sm:text-lg font-serif font-bold text-[#2F2F2F] tracking-wide">
                  Cẩm Nang Tóm Tắt Toàn Cảnh 8 Trạm Di Sản Cơ Tu
                </h2>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#B35C44] text-white">
                  Đại Ngàn Trường Sơn
                </span>
              </div>
              <p className="text-xs text-[#736B60] flex items-center gap-1.5 mt-0.5">
                <span>Người học: <strong>{progress.studentName || 'Học sinh khám phá'}</strong></span>
                <span className="text-[#DDD5C7]">•</span>
                <span className="inline-flex items-center gap-1 text-[#7A4E38]">
                  <KienSangAvatar size="xs" />
                  Bạn đồng hành: <strong>Kiến Sáng</strong>
                </span>
                <span className="text-[#DDD5C7] hidden sm:inline">•</span>
                <span className="text-[#2D4232] font-semibold hidden sm:inline">
                  Đã hoàn thành: {completedCount}/8 Trạm
                </span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrintSummary}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-[#F0ECE1] border border-[#DDD5C7] text-xs font-semibold text-[#555047] transition-colors cursor-pointer shadow-2xs"
              title="In hoặc lưu Cẩm nang tóm tắt"
            >
              <Printer className="w-3.5 h-3.5 text-[#7A4E38]" />
              <span>In Cẩm nang</span>
            </button>
            <button
              type="button"
              id="btn-close-summary-modal"
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white hover:bg-[#EAE4D9] border border-[#D5CCBC] flex items-center justify-center text-[#736B60] hover:text-[#2F2F2F] transition-colors cursor-pointer"
              title="Đóng cửa sổ"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* View Mode Tabs & Search Bar */}
        <div className="px-4 sm:px-6 py-2.5 bg-[#F5F2ED] border-b border-[#E3DCD2] flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          {/* Tabs */}
          <div className="flex items-center gap-1 bg-[#EAE4D9] p-1 rounded-xl w-full sm:w-auto">
            <button
              type="button"
              onClick={() => setActiveTab('cards')}
              className={`flex-1 sm:flex-none px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                activeTab === 'cards'
                  ? 'bg-white text-[#B35C44] shadow-xs'
                  : 'text-[#6B665E] hover:text-[#2F2F2F]'
              }`}
            >
              <Grid className="w-3.5 h-3.5" />
              <span>Thẻ Trạm Chi Tiết</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('overview')}
              className={`flex-1 sm:flex-none px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                activeTab === 'overview'
                  ? 'bg-white text-[#B35C44] shadow-xs'
                  : 'text-[#6B665E] hover:text-[#2F2F2F]'
              }`}
            >
              <ListFilter className="w-3.5 h-3.5" />
              <span>Danh Sách 8 Trạm</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('matrix')}
              className={`flex-1 sm:flex-none px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                activeTab === 'matrix'
                  ? 'bg-white text-[#B35C44] shadow-xs'
                  : 'text-[#6B665E] hover:text-[#2F2F2F]'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Ma Trận So Sánh</span>
            </button>
          </div>

          {/* Search box */}
          <div className="w-full sm:w-64">
            <input
              type="text"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              placeholder="Tìm kiếm trạm, di sản, kỹ nghệ..."
              className="w-full px-3 py-1.5 text-xs bg-white border border-[#D5CCBC] rounded-xl focus:outline-none focus:border-[#B35C44] text-[#2F2F2F] placeholder:text-[#9E9589]"
            />
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {/* TAB 1: INTERACTIVE DETAIL CARDS WITH PREVIEW */}
          {activeTab === 'cards' && (
            <div className="space-y-6">
              {/* Station Horizontal Nav Selector */}
              <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
                {DETAILED_SUMMARIES.map((st, idx) => {
                  const isDone = progress.completedStations.includes(st.id);
                  const isSelected = selectedStationIndex === idx;
                  return (
                    <button
                      key={st.id}
                      type="button"
                      onClick={() => setSelectedStationIndex(idx)}
                      className={`px-3 py-2 rounded-xl text-left border flex items-center gap-2 shrink-0 transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#FAF2EB] border-[#B35C44] ring-2 ring-[#B35C44]/20 shadow-xs'
                          : 'bg-white border-[#E3DCD2] hover:border-[#B35C44]/50'
                      }`}
                    >
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs ${
                          isDone
                            ? 'bg-[#2D4232] text-white'
                            : isSelected
                            ? 'bg-[#B35C44] text-white'
                            : 'bg-[#EAE4D9] text-[#7A4E38]'
                        }`}
                      >
                        {isDone ? '✓' : st.order}
                      </div>
                      <div>
                        <span className="text-[11px] font-bold text-[#2F2F2F] block whitespace-nowrap">
                          Trạm {st.order}: {st.title.split('–')[0].split('&')[0]}
                        </span>
                        <span className="text-[9px] text-[#8C5832] font-semibold block italic">
                          {st.coTuTitle}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Selected Station Full Summary Card */}
              <div className="bg-white rounded-2xl border border-[#E3DCD2] shadow-sm overflow-hidden grid grid-cols-1 lg:grid-cols-12">
                {/* Left Visual Column */}
                <div className="lg:col-span-5 relative bg-[#EFECE6] min-h-[220px] lg:min-h-full flex flex-col justify-between p-4 sm:p-5">
                  <div className="relative rounded-xl overflow-hidden shadow-xs border border-[#DDD5C7] aspect-video sm:aspect-4/3 w-full">
                    {IMAGE_ASSETS[currentStation.imageId] ? (
                      <CulturalImage
                        asset={IMAGE_ASSETS[currentStation.imageId]}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-[#D5CCBC] flex items-center justify-center text-xs text-[#736B60]">
                        Hình ảnh di sản
                      </div>
                    )}
                    {currentStation.badge && (
                      <span className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-md text-[10px] font-bold bg-[#B35C44] text-white shadow-sm">
                        ★ {currentStation.badge}
                      </span>
                    )}
                  </div>

                  {/* Elder Quote Box */}
                  <div className="mt-4 p-3.5 rounded-xl bg-[#FAF8F5] border border-[#E3DCD2] relative">
                    <span className="text-2xl font-serif text-[#B35C44] leading-none absolute top-1.5 left-2">“</span>
                    <p className="text-xs italic text-[#555047] pl-4 leading-relaxed">
                      {currentStation.elderWisdom}
                    </p>
                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#EFEAE2] text-[10px] text-[#8C5832] font-bold">
                      <span>Lời dặn của Già Làng</span>
                      <span>Trạm {currentStation.order}</span>
                    </div>
                  </div>
                </div>

                {/* Right Content Details Column */}
                <div className="lg:col-span-7 p-5 sm:p-6 space-y-4">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-semibold text-[#8C5832]">
                      {currentStation.icon}
                      <span>{currentStation.category}</span>
                      <span className="text-[#DDD5C7]">•</span>
                      <span className="text-[#B35C44] font-bold">TRẠM {currentStation.order}/8</span>
                    </div>
                    <h3 className="text-lg sm:text-xl font-serif font-bold text-[#2F2F2F] mt-1">
                      {currentStation.title}
                    </h3>
                    <p className="text-xs text-[#8C5832] italic font-semibold">
                      Tiếng Cơ Tu: {currentStation.coTuTitle}
                    </p>
                    <p className="text-xs sm:text-sm text-[#555047] font-medium mt-2 leading-relaxed bg-[#FAF8F5] p-2.5 rounded-lg border border-[#EFEAE2]">
                      {currentStation.tagline}
                    </p>
                  </div>

                  {/* 3 Core Highlights */}
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#7A4E38] flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#B35C44]" />
                      03 Điểm Tinh Hoa Cốt Lõi Cần Nhớ:
                    </h4>
                    <div className="space-y-2">
                      {currentStation.coreHighlights.map((hl, i) => (
                        <div
                          key={i}
                          className="flex items-start gap-2 text-xs text-[#443E37] leading-relaxed bg-[#FAF8F5] p-2.5 rounded-xl border border-[#E8E1D5]"
                        >
                          <span className="w-4 h-4 rounded-full bg-[#B35C44] text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                            {i + 1}
                          </span>
                          <span>{hl}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Significance & Curriculum Tie-In Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-[#EFEAE2]">
                    <div className="p-3 rounded-xl bg-[#F5F2ED] border border-[#DDD5C7]">
                      <span className="text-[10px] font-bold text-[#7A4E38] block uppercase">
                        Giá Trị Văn Hóa:
                      </span>
                      <p className="text-[11px] text-[#555047] mt-1 leading-snug">
                        {currentStation.culturalSignificance}
                      </p>
                    </div>

                    <div className="p-3 rounded-xl bg-[#F5F2ED] border border-[#DDD5C7]">
                      <span className="text-[10px] font-bold text-[#2D4232] block uppercase">
                        Liên Hệ Bài Học THCS:
                      </span>
                      <p className="text-[11px] text-[#555047] mt-1 leading-snug">
                        {currentStation.curriculumConnection}
                      </p>
                    </div>
                  </div>

                  {/* Quick Review Question Box */}
                  <div className="p-3 rounded-xl bg-[#FAF2EB] border border-[#B35C44]/30 flex items-start gap-2.5">
                    <HelpCircle className="w-4 h-4 text-[#B35C44] shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[10px] font-bold uppercase text-[#B35C44] block">
                        Câu hỏi củng cố thu hoạch:
                      </span>
                      <p className="text-xs text-[#2F2F2F] font-medium mt-0.5">
                        {currentStation.reviewQuestion}
                      </p>
                    </div>
                  </div>

                  {/* Action CTA to Jump to Station */}
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-xs font-semibold text-[#736B60]">
                      Trạng thái:{' '}
                      {progress.completedStations.includes(currentStation.id) ? (
                        <strong className="text-[#2D4232]">✓ Đã đạt Dấu ấn</strong>
                      ) : (
                        <span className="text-[#B35C44]">Chưa hoàn thành</span>
                      )}
                    </span>

                    <button
                      type="button"
                      onClick={() => {
                        onClose();
                        onSelectStation(currentStation.id);
                      }}
                      className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#B35C44] to-[#964732] hover:from-[#C5664E] hover:to-[#B35C44] text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer active:scale-95"
                    >
                      <span>Vào Trạm {currentStation.order}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: OVERVIEW FULL LIST OF ALL 8 STATIONS */}
          {activeTab === 'overview' && (
            <div className="space-y-4">
              <div className="bg-[#FAF2EB] p-4 rounded-xl border border-[#B35C44]/30 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <KienSangAvatar size="sm" />
                  <div>
                    <h4 className="text-xs font-bold text-[#2F2F2F]">
                      Hành trình 8 Trạm Di sản – Ghi nhận của Kiến Sáng & Học sinh FPT Schools
                    </h4>
                    <p className="text-[11px] text-[#736B60]">
                      Toàn bộ 8 trạm được thiết kế theo cấu trúc bài học trải nghiệm trực quan từ Không gian cư trú đến Văn hóa sinh hoạt.
                    </p>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full bg-[#B35C44] text-white text-xs font-bold shrink-0">
                  {completedCount}/8 Hoàn thành
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredStations.map((st) => {
                  const isDone = progress.completedStations.includes(st.id);
                  return (
                    <div
                      key={st.id}
                      className={`p-4 rounded-2xl border flex flex-col justify-between transition-all ${
                        isDone
                          ? 'bg-white border-[#2D4232]/40 shadow-xs'
                          : 'bg-[#FAF8F5] border-[#E3DCD2] hover:border-[#B35C44]'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <div className="flex items-center gap-2">
                            <div
                              className={`w-7 h-7 rounded-xl flex items-center justify-center font-bold text-xs ${
                                isDone ? 'bg-[#2D4232] text-white' : 'bg-[#B35C44] text-white'
                              }`}
                            >
                              {st.order}
                            </div>
                            <div>
                              <span className="text-[10px] font-bold text-[#8C5832] uppercase block">
                                {st.category}
                              </span>
                              <h4 className="text-xs font-bold text-[#2F2F2F] leading-tight">
                                {st.title}
                              </h4>
                            </div>
                          </div>
                          {isDone ? (
                            <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-[#E8F0E8] text-[#2D4232] flex items-center gap-1 shrink-0">
                              <CheckCircle2 className="w-3 h-3 text-[#2D4232]" />
                              Đã thu thập
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 rounded-full text-[9px] font-medium bg-[#EAE4D9] text-[#7A4E38] shrink-0">
                              Chưa học
                            </span>
                          )}
                        </div>

                        <p className="text-[11px] text-[#8C5832] italic font-semibold mb-2">
                          Tiếng Cơ Tu: {st.coTuTitle}
                        </p>

                        <p className="text-xs text-[#555047] leading-relaxed mb-3">
                          {st.tagline}
                        </p>

                        <div className="space-y-1.5 pt-2 border-t border-[#EFEAE2]">
                          <span className="text-[10px] font-bold uppercase text-[#7A4E38] block">
                            Điểm cốt lõi:
                          </span>
                          {st.coreHighlights.slice(0, 2).map((h, idx) => (
                            <p key={idx} className="text-[11px] text-[#443E37] flex items-start gap-1.5 leading-snug">
                              <span className="text-[#B35C44] font-bold">•</span>
                              <span>{h}</span>
                            </p>
                          ))}
                        </div>
                      </div>

                      <div className="mt-4 pt-3 border-t border-[#EFEAE2] flex items-center justify-between">
                        <span className="text-[10px] text-[#736B60] italic">
                          {st.badge || 'Trạm trải nghiệm'}
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            onClose();
                            onSelectStation(st.id);
                          }}
                          className="px-3 py-1.5 rounded-lg bg-[#FAF2EB] hover:bg-[#B35C44] text-[#B35C44] hover:text-white border border-[#B35C44]/30 text-xs font-bold transition-colors flex items-center gap-1 cursor-pointer"
                        >
                          <span>Xem Trạm {st.order}</span>
                          <ChevronRight className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 3: MATRIX COMPARISON TABLE */}
          {activeTab === 'matrix' && (
            <div className="space-y-4">
              <div className="bg-white rounded-2xl border border-[#E3DCD2] shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-[#FAF2EB] border-b border-[#E3DCD2] text-[#7A4E38] font-bold">
                        <th className="p-3 w-12 text-center">STT</th>
                        <th className="p-3 w-48">Trạm & Danh hiệu</th>
                        <th className="p-3 w-40">Tên tiếng Cơ Tu</th>
                        <th className="p-3 w-64">Biểu Tượng & Hiện Vật</th>
                        <th className="p-3">Giá Trị Văn Hóa Cốt Lõi</th>
                        <th className="p-3 w-28 text-center">Tiến Độ</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#EFEAE2]">
                      {DETAILED_SUMMARIES.map((st) => {
                        const isDone = progress.completedStations.includes(st.id);
                        return (
                          <tr
                            key={st.id}
                            className={`hover:bg-[#FAF8F5] transition-colors ${
                              isDone ? 'bg-[#FAFDF8]' : ''
                            }`}
                          >
                            <td className="p-3 text-center font-bold text-[#B35C44]">
                              {st.order}
                            </td>
                            <td className="p-3">
                              <span className="font-bold text-[#2F2F2F] block">{st.title}</span>
                              {st.badge && (
                                <span className="inline-block mt-0.5 px-1.5 py-0.2 rounded text-[9px] font-bold bg-[#FAF2EB] text-[#B35C44] border border-[#B35C44]/30">
                                  {st.badge}
                                </span>
                              )}
                            </td>
                            <td className="p-3 font-semibold text-[#8C5832] italic">
                              {st.coTuTitle}
                            </td>
                            <td className="p-3 text-[#555047] leading-relaxed">
                              {st.coreHighlights[0]}
                            </td>
                            <td className="p-3 text-[#555047] leading-relaxed">
                              {st.culturalSignificance}
                            </td>
                            <td className="p-3 text-center">
                              {isDone ? (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#E8F0E8] text-[#2D4232]">
                                  <CheckCircle2 className="w-3 h-3" /> Đạt
                                </span>
                              ) : (
                                <button
                                  type="button"
                                  onClick={() => {
                                    onClose();
                                    onSelectStation(st.id);
                                  }}
                                  className="px-2 py-1 rounded bg-[#FAF2EB] text-[#B35C44] text-[10px] font-bold hover:bg-[#B35C44] hover:text-white transition-colors"
                                >
                                  Khám phá
                                </button>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Summary Actions & Grand Certificate CTA */}
        <div className="p-4 sm:p-5 bg-[#FAF2EB] border-t border-[#E3DCD2] flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <FptSchoolLogo variant="compact" className="h-7 w-auto hidden sm:block" />
            <div>
              <p className="text-xs font-bold text-[#2F2F2F]">
                Lớp 9A2 • Dự Án Di Sản Văn Hóa Số Cơ Tu FPT Schools
              </p>
              <p className="text-[10px] text-[#736B60]">
                Tư liệu chuẩn hóa phục vụ học tập, ôn luyện và bảo tồn bản sắc văn hóa dân tộc.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-white hover:bg-[#EFECE6] border border-[#DDD5C7] text-xs font-bold text-[#555047] transition-colors cursor-pointer"
            >
              Đóng Cẩm Nang
            </button>

            {isCompletedAll ? (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onNavigateCertificate();
                }}
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#2D4232] to-[#3B5742] hover:from-[#354F3B] hover:to-[#46664F] text-white text-xs font-bold shadow-sm transition-all flex items-center gap-1.5 cursor-pointer active:scale-95"
              >
                <Award className="w-4 h-4 text-amber-300" />
                <span>Xem Giấy Chứng Nhận Đại Ngàn</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  // jump to first uncompleted station or station 1
                  const firstUnfinished = DETAILED_SUMMARIES.find(
                    (s) => !progress.completedStations.includes(s.id)
                  );
                  if (firstUnfinished) {
                    onSelectStation(firstUnfinished.id);
                  } else {
                    onSelectStation('residence');
                  }
                }}
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#B35C44] to-[#964732] hover:from-[#C5664E] hover:to-[#B35C44] text-white text-xs font-bold shadow-sm transition-all flex items-center gap-1.5 cursor-pointer active:scale-95"
              >
                <Compass className="w-4 h-4" />
                <span>Tiếp Tục Chinh Phục ({completedCount}/8)</span>
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};
