import { CulturalImageAsset } from '../types';

import heroImg from '../assets/images/hero_cotu_village_1787811808112.jpg';
import journeyMapImg from '../assets/images/journey_map_art_1787811830337.jpg';
import stationResidenceImg from '../assets/images/station_residence_art_1787812007699.jpg';
import stationGuolImg from '../assets/images/station_guol_art_1787811845503.jpg';
import stationWeavingImg from '../assets/images/station_weaving_art_1787811874928.jpg';
import stationDanceImg from '../assets/images/station_dance_art_1787811897480.jpg';
import stationMusicImg from '../assets/images/station_music_art_1787811915018.jpg';
import stationSpeakingImg from '../assets/images/station_speaking_art_1787811932422.jpg';
import stationWoodcraftImg from '../assets/images/station_woodcraft_art_1787811950070.jpg';
import stationDailyLifeImg from '../assets/images/station_dailylife_art_1787811965914.jpg';
import victoryImg from '../assets/images/victory_community_1787811983312.jpg';

export const IMAGE_ASSETS: Record<string, CulturalImageAsset> = {
  hero: {
    id: 'hero',
    src: heroImg,
    alt: 'Toàn cảnh ngôi làng Cơ Tu giữa núi rừng Trường Sơn với Nhà Gươl ở trung tâm và người dẫn đường cùng hai học sinh',
    caption: 'Không gian Làng Cơ Tu số – Nơi hội tụ các giá trị văn hóa truyền thống đại ngàn',
    credit: 'Họa sĩ minh họa số – Làng Cơ Tu Số',
    culturalStatus: 'illustration',
    aspectRatio: '16:9',
    focalPoint: { x: 50, y: 50 },
  },
  journeyMap: {
    id: 'journeyMap',
    src: journeyMapImg,
    alt: 'Bản đồ minh họa trải nghiệm 8 trạm khám phá làng Cơ Tu kết nối từ không gian cư trú đến sinh hoạt đời sống',
    caption: 'Sơ đồ hành trình 8 trạm trải nghiệm văn hóa Cơ Tu',
    credit: 'Dự án Giáo dục Di sản Cơ Tu',
    culturalStatus: 'illustration',
    aspectRatio: '16:9',
    focalPoint: { x: 50, y: 50 },
  },
  stationResidence: {
    id: 'stationResidence',
    src: stationResidenceImg,
    alt: 'Quần thể làng Cơ Tu hòa quyện giữa thung lũng, suối mát và rừng đại ngàn Trường Sơn',
    caption: 'Không gian cư trú truyền thống: Rừng chở che buôn làng, buôn làng giữ gìn nguồn nước',
    credit: 'Tham chiếu: Địa chí Văn hóa Dân gian Cơ Tu miền Trung',
    sourceUrl: 'https://dsvh.gov.vn',
    culturalStatus: 'illustration',
    aspectRatio: '16:9',
    focalPoint: { x: 50, y: 40 },
  },
  stationGuol: {
    id: 'stationGuol',
    src: stationGuolImg,
    alt: 'Nhà Gươl truyền thống của người Cơ Tu với kết cấu cột cái kiên cố, mái lợp lá uốn cong mềm mại',
    caption: 'Nhà Gươl – Trái tim và linh hồn của buôn làng Cơ Tu, nơi tổ chức hội họp và lễ hội chung',
    credit: 'Tham chiếu: Nhà Gươl đồng bào Cơ Tu Hòa Vang & Nam Giang',
    sourceUrl: 'https://hoavang.danang.gov.vn/web/hoavang/-/nha-guol-cua-dong-bao-cotu-25047',
    culturalStatus: 'illustration',
    aspectRatio: '4:3',
    focalPoint: { x: 50, y: 50 },
  },
  stationWeaving: {
    id: 'stationWeaving',
    src: stationWeavingImg,
    alt: 'Nghệ nhân Cơ Tu thao tác dệt vải zèng thổ cẩm luồn hạt cườm trên khung dệt lưng truyền thống',
    caption: 'Nghề dệt thổ cẩm Cơ Tu – Di sản Văn hóa Phi vật thể Quốc gia, nghệ thuật luồn cườm tinh xảo',
    credit: 'Tham chiếu: Cục Di sản văn hóa - Nghề dệt zèng Cơ Tu',
    sourceUrl: 'https://dsvh.gov.vn/danh-muc-di-san-van-hoa-phi-vat-the-quoc-gia-1789',
    culturalStatus: 'illustration',
    aspectRatio: '4:3',
    focalPoint: { x: 50, y: 50 },
  },
  stationDance: {
    id: 'stationDance',
    src: stationDanceImg,
    alt: 'Đội hình biểu diễn điệu múa truyền thống Tân’tung Da’dá trước sân Nhà Gươl trong không khí cộng đồng',
    caption: 'Điệu múa Tân’tung Da’dá – Biểu tượng của sức mạnh nam giới và sự dịu dàng dâng trời của phụ nữ Cơ Tu',
    credit: 'Tham chiếu: Di sản múa Tân’tung Da’dá Cơ Tu',
    sourceUrl: 'https://dsvh.gov.vn',
    culturalStatus: 'illustration',
    aspectRatio: '16:9',
    focalPoint: { x: 50, y: 50 },
  },
  stationMusic: {
    id: 'stationMusic',
    src: stationMusicImg,
    alt: 'Nhóm nghệ nhân Cơ Tu hòa tấu cồng chiêng, trống k’tu và các nhạc cụ truyền thống',
    caption: 'Âm vang cồng chiêng và nhạc cụ cộng đồng Cơ Tu gắn liền với nhịp điệu sinh hoạt buôn làng',
    credit: 'Tham chiếu: Âm nhạc dân gian Cơ Tu Quảng Nam - Đà Nẵng',
    culturalStatus: 'illustration',
    aspectRatio: '4:3',
    focalPoint: { x: 50, y: 45 },
  },
  stationSpeaking: {
    id: 'stationSpeaking',
    src: stationSpeakingImg,
    alt: 'Hai già làng đối thoại theo hình thức Nói lý – Hát lý (Bh’nooch) trong không gian Nhà Gươl ấm cúng',
    caption: 'Nói lý – Hát lý (Bh’nooch): Nghệ thuật ngôn từ ứng tác độc đáo, khuyên răn hòa giải và trao truyền',
    credit: 'Tham chiếu: Di sản Văn hóa Phi vật thể Quốc gia Nói lý - Hát lý Cơ Tu',
    sourceUrl: 'https://dsvh.gov.vn',
    culturalStatus: 'illustration',
    aspectRatio: '4:3',
    focalPoint: { x: 50, y: 50 },
  },
  stationWoodcraft: {
    id: 'stationWoodcraft',
    src: stationWoodcraftImg,
    alt: 'Nghệ nhân Cơ Tu tỉ mỉ chạm khắc hoa văn hình học và biểu tượng tự nhiên trên cột gỗ nhà Gươl',
    caption: 'Nghệ thuật điêu khắc gỗ và đan lát – Bàn tay khéo léo biến thân gỗ rừng thành tác phẩm di sản',
    credit: 'Tham chiếu: Điêu khắc dân gian truyền thống Cơ Tu',
    culturalStatus: 'illustration',
    aspectRatio: '4:3',
    focalPoint: { x: 50, y: 50 },
  },
  stationDailyLife: {
    id: 'stationDailyLife',
    src: stationDailyLifeImg,
    alt: 'Cộng đồng người Cơ Tu chế biến ẩm thực truyền thống cơm lam và chia sẻ tri thức sống hòa hợp thiên nhiên',
    caption: 'Ẩm thực và tri thức bản địa – Sự tôn trọng rừng nguồn và hương vị nướng ống tre đặc sắc',
    credit: 'Tham chiếu: Tri thức dân gian và ẩm thực Cơ Tu miền núi',
    culturalStatus: 'illustration',
    aspectRatio: '16:9',
    focalPoint: { x: 50, y: 50 },
  },
  victoryCommunity: {
    id: 'victoryCommunity',
    src: victoryImg,
    alt: 'Cộng đồng Cơ Tu chào đón hai học sinh hoàn thành xuất sắc 8 trạm hành trình tại sân Nhà Gươl hoàng hôn',
    caption: 'Chúc mừng bạn đã hoàn thành trọn vẹn hành trình khám phá và trở thành Người bạn Văn hóa Cơ Tu!',
    credit: 'Làng Cơ Tu Số – Hành trình Tri thức & Tôn trọng Di sản',
    culturalStatus: 'illustration',
    aspectRatio: '16:9',
    focalPoint: { x: 50, y: 50 },
  },
};
