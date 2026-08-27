# DANH MỤC VÀ TÀI LIỆU PROMPT HỆ THỐNG HÌNH ẢNH MINH HỌA
## LÀNG CƠ TU SỐ – HÀNH TRÌNH KHÁM PHÁ VĂN HÓA ĐẠI NGÀN

Tài liệu này tổng hợp toàn bộ prompt chi tiết cho từng ảnh theo chuẩn Art Direction (Mục Y & Z) để phục vụ công tác tái tạo, cập nhật hoặc thẩm định hình ảnh cho ứng dụng giáo dục văn hóa Cơ Tu.

---

### BỘ QUY TẮC PHONG CÁCH CHUNG (ART DIRECTION)
- **Phong cách:** Minh họa số bán hiện thực (semi-realistic digital illustration), giàu chất liệu, ấm áp, thân thiện với học sinh THCS. Cảm giác như cuốn sách tranh khám phá văn hóa cao cấp.
- **Bảng màu:** Vàng ấm (nắng sớm/chiều), xanh rừng Trường Sơn, nâu gỗ mộc, đất nung, đen chàm, đỏ trầm và trắng ngà hạt cườm.
- **Chất liệu:** Gỗ rừng, mây tre, sợi dệt thổ cẩm zèng, đất và đá suối.
- **Negative Prompt chung:**
  `no text, no watermark, no logo, no neon, no cyberpunk, no fantasy costume, no Native American headdress, no African tribal patterns, no generic tribal aesthetic, no inaccurate stilt house, no mixed ethnic costumes, no invented sacred symbols, no tourist posing, no casino celebration, no distorted hands, no duplicated people`

---

### DANH SÁCH PROMPT CHI TIẾT THEO TỪNG HẠNG MỤC

#### 01. Ảnh Hero – Cổng vào Làng Cơ Tu số (`hero_cotu_village`)
- **Tỉ lệ:** 16:9 (Desktop) / Crop an toàn Mobile 4:5
- **Vị trí UI:** Trang chủ `/`
- **Prompt:**
  ```text
  Digital illustration in semi-realistic warm picture-book style of a serene Co Tu ethnic village nestled in the green Truong Son mountains of Central Vietnam at golden morning hour. The iconic Guol community stilt house with its curved thatched roof stands as the centerpiece. Two Vietnamese middle school students with journey notebook follow a friendly local cultural guide into the village plaza. Warm golden sunlight, forest green, timber brown, terracotta, indigo and off-white palette. High quality cultural picture book aesthetic, cinematic depth with clean sky and space for text on upper left, warm and welcoming atmosphere. No text, no watermark, no logo, no neon, no fantasy costume, no Native American headdress, no generic tribal patterns, no casino celebration.
  ```

#### 02. Ảnh Bản đồ hành trình khám phá (`journey_map_art`)
- **Tỉ lệ:** 16:10 / 16:9
- **Vị trí UI:** Màn hình Bản đồ làng
- **Prompt:**
  ```text
  Warm semi-realistic pictorial map illustration of a Co Tu mountain village nestled in Truong Son ranges, seen from high diagonal top-down perspective. Centered around the iconic oval Guol house with winding gentle stone paths connecting 8 distinct learning stops amidst streams, lush foliage, forest hills and wooden stilt dwellings. Warm morning sunlight, earth tones, forest green, warm terracotta, soft mist. Clean illustration suitable for interactive digital map interface without any text or labels drawn. No text, no words, no watermark, no neon, no fantasy elements.
  ```

#### 03. Trạm 01: Người Cơ Tu & Không gian cư trú (`station_residence_art`)
- **Tỉ lệ:** 16:9 hoặc 3:2
- **Vị trí UI:** Trạm 1
- **Prompt:**
  ```text
  Semi-realistic warm digital illustration of a Co Tu ethnic settlement landscape nestled harmoniously among the majestic green Truong Son mountain slopes, winding streams, native trees, walking paths, and peaceful traditional stilt houses under soft morning mist and golden sunlight. Showing harmonious relationship between the community and natural mountain forest ecosystem. Picture book illustration, warm earthen tones, indigo and forest greens. No text, no watermark, no neon.
  ```

#### 04. Trạm 02: Nhà Gươl – Trái tim của làng (`station_guol_art`)
- **Tỉ lệ:** 4:3
- **Vị trí UI:** Trạm 2
- **Prompt:**
  ```text
  Semi-realistic warm digital illustration of a traditional Co Tu Guol house three-quarter view in a village setting. Crafted with natural timber pillars, rattan, and curved thatched roof. Elders and villagers sitting calmly on the wooden veranda discussing, bathed in soft golden morning sunlight filtering through trees. Warm earthen palette, indigo and wood tones. Clean book illustration style. No text, no watermark, no fantasy elements, no distorted figures.
  ```

#### 05. Trạm 03: Thổ cẩm & Nghề dệt (`station_weaving_art`)
- **Tỉ lệ:** 4:3
- **Vị trí UI:** Trạm 3
- **Prompt:**
  ```text
  Semi-realistic warm digital illustration of a skilled Co Tu artisan woman weaving traditional brocade fabric with geometric bead patterns on a traditional back-strap loom under warm sunlight on the veranda. Two middle school students are intently observing the loom technique with curiosity and respect. Warm earthy wood, rich dark indigo, terracotta red, white bead accents. Clean educational picture-book illustration style. No text, no watermark, no fantasy elements.
  ```

#### 06. Trạm 04: Múa Tân’tung Da’dá (`station_dance_art`)
- **Tỉ lệ:** 16:9
- **Vị trí UI:** Trạm 4
- **Prompt:**
  ```text
  Semi-realistic warm digital illustration of the traditional Co Tu Tan tung Da da community dance performance in the courtyard in front of the Guol house. Female dancers gracefully raising their hands in Da da posture and male dancers in unison Tan tung formation, wearing authentic Co Tu woven clothing. Villagers and students standing in an outer circle clapping rhythmically. Warm late afternoon golden glow, lush Truong Son mountain backdrop, respectful community spirit. No neon, no text, no stage lights, no casino effects.
  ```

#### 07. Trạm 05: Cồng chiêng & Âm nhạc cộng đồng (`station_music_art`)
- **Tỉ lệ:** 4:3 / 3:2
- **Vị trí UI:** Trạm 5
- **Prompt:**
  ```text
  Semi-realistic warm digital illustration of Co Tu ethnic musicians performing traditional gongs and percussion instruments together in front of the Guol house. An elder master guides the rhythm while young learners listen intently and take notes. Rich timber, brass metal gleam, indigo woven vests, warm golden sunlight, respectful cultural heritage educational illustration. No text, no watermark, no fantasy elements.
  ```

#### 08. Trạm 06: Nghệ thuật Nói lý – Hát lý (`station_speaking_art`)
- **Tỉ lệ:** 4:3
- **Vị trí UI:** Trạm 6
- **Prompt:**
  ```text
  Semi-realistic warm digital illustration of two venerable Co Tu village elders engaged in the traditional oral dialogue of 'Noi ly - Hat lý' inside the atmospheric wooden Guol house. Surrounded by seated attentive village youth listening carefully with respect. Soft diffuse light illuminating wise expressive faces, timber interior, earthy colors, cultural storytelling tradition. No text, no speech bubbles in image, no fantasy elements.
  ```

#### 09. Trạm 07: Điêu khắc gỗ & Nghề thủ công (`station_woodcraft_art`)
- **Tỉ lệ:** 4:3 / 3:2
- **Vị trí UI:** Trạm 7
- **Prompt:**
  ```text
  Semi-realistic warm digital illustration of a veteran Co Tu woodcarver master patiently carving a timber pillar for the village house with traditional chisel tools in an airy open workshop. Wood shavings on the floor, focused hands, young apprentice student attentively observing the craft. Warm amber light, authentic woodwork textures, respectful educational illustration. No text, no watermark, no fantasy elements.
  ```

#### 10. Trạm 08: Đời sống, Ẩm thực & Tri thức bản địa (`station_dailylife_art`)
- **Tỉ lệ:** 16:9
- **Vị trí UI:** Trạm 8
- **Prompt:**
  ```text
  Semi-realistic warm digital illustration of daily community life and indigenous knowledge in a Co Tu mountain village. Villagers gently preparing traditional mountain sticky rice in bamboo tubes (com lam) and wild herbal tea around a friendly outdoor hearth, sharing stories under the shade of ancient trees. Warm golden afternoon light, mountain slopes, woven rattan baskets, harmonious living with nature. No restaurant plating, no casino elements, no text, no watermark.
  ```

#### 13. Màn hình Hoàn thành hành trình (`victory_community`)
- **Tỉ lệ:** 16:9
- **Vị trí UI:** Màn hình kết thúc hành trình
- **Prompt:**
  ```text
  Semi-realistic warm digital illustration of middle school students completing their cultural discovery journey at sunset in front of the illuminated Co Tu Guol house. Holding an open journey handbook filled with 8 stamps. The village cultural guide, master artisans, and smiling community members warmly welcome and congratulate them in the golden twilight. Gentle warm lanterns, respectful educational achievement atmosphere. No large casino fireworks, no crowns, no generic trophies. High quality cultural storybook aesthetic.
  ```
