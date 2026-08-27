import React, { useState } from 'react';
import { X, Send, Sparkles, MessageCircle, Bot, User } from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
}

const QUICK_QUESTIONS = [
  'Tại sao Nhà Gươl là trái tim của buôn làng Cơ Tu?',
  'Điểm độc đáo của nghề dệt thổ cẩm Zèng Cơ Tu là gì?',
  'Ý nghĩa của điệu múa Tân’tung Da’dá?',
  'Nói lý – Hát lý (Bh’nooch) giúp hòa giải buôn làng ra sao?',
];

export const CulturalTutorModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm0',
      sender: 'bot',
      text: 'A rơơng các cháu! Chú Bh’ling Avel và Già làng đây. Các cháu có câu hỏi hay điều gì còn băn khoăn về phong tục, kiến trúc hay lễ hội người Cơ Tu không? Cứ thoải mái hỏi chú nhé!',
      timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [inputVal, setInputVal] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async (questionText?: string) => {
    const textToSend = questionText || inputVal.trim();
    if (!textToSend || isLoading) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!questionText) setInputVal('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/cultural-qa', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: textToSend }),
      });

      const data = await res.json();
      const botReply = data.answer || 'Cảm ơn cháu đã quan tâm đến văn hóa Cơ Tu. Rừng Trường Sơn và buôn làng luôn chào đón các cháu khám phá di sản cha ông!';

      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: botReply,
        timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch {
      // Fallback local answer
      const fallbackMsg: ChatMessage = {
        id: `bot-fallback-${Date.now()}`,
        sender: 'bot',
        text: 'Người Cơ Tu luôn đề cao tính cộng đồng, sự hiếu khách và lòng tôn trọng thiên nhiên đại ngàn. Các cháu hãy tiếp tục hành trình qua 8 trạm nhé!',
        timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      id="modal-cultural-tutor"
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#2F2F2F]/60 p-4 backdrop-blur-xs animate-in fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl h-[85vh] bg-[#FAF8F5] border border-[#E3DCD2] rounded-2xl flex flex-col text-[#2F2F2F] shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 bg-[#F5F2ED] border-b border-[#E3DCD2] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#B35C44] flex items-center justify-center text-white text-lg font-serif font-bold shadow-xs">
              👴
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="text-sm sm:text-base font-serif font-bold text-[#2F2F2F]">
                  Người Dẫn Đường Văn Hóa AI (Chú Bh’ling Avel)
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-[#2D4232] border border-emerald-200">
                  Trực tuyến
                </span>
              </div>
              <p className="text-xs text-[#736B60]">Giải đáp chuẩn mực kiến thức văn hóa Cơ Tu</p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 text-[#736B60] hover:text-[#2F2F2F] hover:bg-[#EFECE6] rounded-xl transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Questions suggestion */}
        <div className="px-4 py-2.5 bg-[#EFECE6] border-b border-[#DDD5C7] flex items-center gap-2 overflow-x-auto">
          <span className="text-[11px] font-bold text-[#B35C44] shrink-0">Gợi ý câu hỏi:</span>
          {QUICK_QUESTIONS.map((q, idx) => (
            <button
              key={`qq-${idx}`}
              type="button"
              onClick={() => handleSend(q)}
              disabled={isLoading}
              className="px-3 py-1 rounded-full text-[11px] bg-white hover:bg-[#FAF8F5] text-[#555047] whitespace-nowrap border border-[#DDD5C7] transition-colors cursor-pointer shadow-2xs"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Message Area */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-[#F5F2ED]">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex items-start gap-2.5 ${m.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
            >
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                  m.sender === 'user'
                    ? 'bg-[#B35C44] text-white'
                    : 'bg-[#EAE4D9] text-[#7A4E38] border border-[#D5CCBC]'
                }`}
              >
                {m.sender === 'user' ? 'Bạn' : 'Chú'}
              </div>
              <div
                className={`max-w-[80%] p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                  m.sender === 'user'
                    ? 'bg-[#B35C44] text-white rounded-tr-none shadow-xs'
                    : 'bg-white border border-[#DDD5C7] text-[#2F2F2F] rounded-tl-none shadow-2xs'
                }`}
              >
                <p className="whitespace-pre-wrap">{m.text}</p>
                <span className={`text-[10px] block text-right mt-1 ${m.sender === 'user' ? 'text-white/70' : 'text-[#8C8478]'}`}>
                  {m.timestamp}
                </span>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex items-center gap-2 text-xs text-[#736B60] italic p-2">
              <div className="w-4 h-4 border-2 border-[#B35C44]/30 border-t-[#B35C44] rounded-full animate-spin" />
              Chú Bh’ling Avel đang suy ngẫm câu trả lời...
            </div>
          )}
        </div>

        {/* Input Bar */}
        <div className="p-3 bg-[#FAF8F5] border-t border-[#DDD5C7] flex items-center gap-2">
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Nhập câu hỏi về văn hóa Cơ Tu..."
            className="flex-1 px-3.5 py-2.5 rounded-xl bg-white border border-[#DDD5C7] text-[#2F2F2F] placeholder:text-[#9E9589] text-xs sm:text-sm focus:outline-none focus:border-[#B35C44] focus:ring-2 focus:ring-[#B35C44]/20 transition-all"
          />
          <button
            type="button"
            onClick={() => handleSend()}
            disabled={!inputVal.trim() || isLoading}
            className="px-4 py-2.5 rounded-xl bg-[#B35C44] hover:bg-[#964732] text-white font-bold text-xs disabled:opacity-50 transition-colors flex items-center gap-1 cursor-pointer shadow-xs"
          >
            <Send className="w-3.5 h-3.5" />
            Gửi
          </button>
        </div>

      </div>
    </div>
  );
};
