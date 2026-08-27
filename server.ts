import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import { createServer as createViteServer } from 'vite';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialized Gemini AI client
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;
  if (!aiClient) {
    aiClient = new GoogleGenAI({ apiKey });
  }
  return aiClient;
}

// API Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

// API Cultural Q&A with Chú Bh'ling Avel / Già Làng
app.post('/api/cultural-qa', async (req, res) => {
  try {
    const { question } = req.body;
    if (!question || typeof question !== 'string') {
      return res.status(400).json({ error: 'Question is required' });
    }

    const ai = getGeminiClient();
    if (!ai) {
      // Return accurate curated response if API key is not yet set
      return res.json({
        answer: `[Người dẫn đường văn hóa Cơ Tu]: Cảm ơn cháu đã quan tâm đến di sản Làng Cơ Tu. Về câu hỏi "${question}": Người Cơ Tu sinh sống dọc dãy Trường Sơn hùng vĩ thuộc tỉnh Quảng Nam và Thừa Thiên Huế. Với tinh thần gắn kết cộng đồng keo sơn, người Cơ Tu coi trọng việc gìn giữ Nhà Gươl, thổ cẩm Zèng luồn cườm, vũ điệu Tân’tung Da’dá, dàn chiêng mẹ chiêng cha và nghệ thuật Nói lý - Hát lý để giải quyết mọi mâu thuẫn bằng hòa khí và tri thức đại ngàn.`,
      });
    }

    const systemPrompt = `Bạn là Chú Bh'ling Avel và Già làng Cơ Tu, người dẫn đường văn hóa uyên bác, ân cần, ấm áp trong ứng dụng giáo dục "LÀNG CƠ TU SỐ – HÀNH TRÌNH KHÁM PHÁ VĂN HÓA ĐẠI NGÀN" dành cho học sinh THCS Việt Nam.
Hãy giải đáp câu hỏi của học sinh về văn hóa Cơ Tu bằng tiếng Việt chuẩn mực, tôn trọng sâu sắc di sản dân tộc, ngôn từ mộc mạc, gần gũi, giàu hình tượng đại ngàn.
Tuyệt đối chỉ cung cấp thông tin văn hóa Cơ Tu chuẩn xác (Kiến trúc Nhà Gươl, Nhà Moong; Dệt Zèng cườm; Múa Tân'tung Da'dá; Cồng chiêng; Nói lý - Hát lý Bh'nooch; Điêu khắc nhà mồ; Ẩm thực cơm lam, cá niên, rượu cần/t'đót). Không bịa đặt yếu tố kỳ ảo hoặc lai tạp văn hóa khác.
Độ dài câu trả lời súc tích trong khoảng 2-4 đoạn ngắn dễ hiểu.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [
        { role: 'user', parts: [{ text: `${systemPrompt}\n\nCâu hỏi của học sinh: ${question}` }] },
      ],
    });

    const answer = response.text || 'Chào cháu! Rất vui được đồng hành cùng cháu trên hành trình tìm hiểu văn hóa Cơ Tu.';
    return res.json({ answer });
  } catch (error) {
    console.error('Gemini QA error:', error);
    return res.json({
      answer:
        'Cảm ơn cháu đã hỏi. Văn hóa Cơ Tu là viên ngọc quý của đại ngàn Trường Sơn với tính cố kết cộng đồng cao, tôn trọng thiên nhiên và nghệ thuật thủ công dệt zèng tinh xảo. Cháu hãy tiếp tục trải nghiệm 8 trạm học tập nhé!',
    });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Làng Cơ Tu Số server running on http://localhost:${PORT}`);
  });
}

startServer();
