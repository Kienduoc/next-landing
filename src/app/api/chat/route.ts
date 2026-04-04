import OpenAI from "openai";
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// Khởi tạo OpenAI client với custom Base URL và API Key theo yêu cầu
const openai = new OpenAI({
  apiKey: process.env.CHATBOT_API_KEY,
  baseURL: process.env.CHATBOT_BASE_URL,
});

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    // Read chatbot context data
    const chatbotDataPath = path.join(process.cwd(), "chatbot_data.txt");
    let knowledgeBase = "";
    
    try {
      if (fs.existsSync(chatbotDataPath)) {
        knowledgeBase = fs.readFileSync(chatbotDataPath, "utf-8");
      }
    } catch (e) {
      console.error("Error reading chatbot_data.txt:", e);
    }

    const systemPrompt = `Bạn là Trợ lý AI chuyên nghiệp của Nguyễn Đức Kiên (Chuyên gia AI & Tự động hóa).
Nhiệm vụ và Quy trình giao tiếp:
1. LUÔN HỎI NHU CẦU TRƯỚC: Khi bắt đầu, hãy đặt câu hỏi để tìm hiểu nhu cầu, vấn đề hoặc mục tiêu của khách hàng (VD: Họ muốn học AI để làm gì? Doanh nghiệp của họ đang gặp khó khăn gì trong vận hành?).
2. PHẢN HỒI DỰA TRÊN KNOWLEDGE BASE: Sau khi hiểu nhu cầu, hãy dùng thông tin dưới đây để tư vấn giải pháp phù hợp:
---
${knowledgeBase}
---
3. KHÉO LÉO LẤY THÔNG TIN (LEAD): Sau khi đã tư vấn hoặc giải đáp một phần, hãy khéo léo đề nghị khách để lại Tên, Số điện thoại hoặc Email để anh Kiên có thể gửi thêm tài liệu chi tiết hoặc liên hệ tư vấn chuyên sâu 1-1. 
   - Tuyệt đối không hỏi dồn dập toàn bộ thông tin ngay từ đầu. 
   - Lồng ghép vào mạch hội thoại một cách tự nhiên.

Quy tắc kỹ thuật (BẮT BUỘC):
- Khi phát hiện khách cung cấp Tên, Số điện thoại hoặc Email, bạn HÃY VỪA trả lời họ bình thường, VỪA chèn thêm một đoạn mã JSON vào cuối cùng của câu trả lời theo đúng định dạng sau:
||LEAD_DATA: {"name": "...", "phone": "...", "email": "..."}||
- Nếu thông tin nào chưa có, hãy để null. 
- TUYỆT ĐỐI KHÔNG giải thích, đề cập hay để lộ đoạn mã này cho người dùng. 
- Luôn trả lời bằng Tiếng Việt, phong cách chuyên nghiệp, lịch sự nhưng gần gũi.`;

    const apiMessages = [
      { role: "system", content: systemPrompt },
      ...messages,
    ];

    const response = await openai.chat.completions.create({
      model: process.env.CHATBOT_MODEL || "ces-chatbot-gpt-5.4",
      messages: apiMessages,
      temperature: 0.7,
      max_tokens: 800,
    });

    return NextResponse.json(response.choices[0].message);
  } catch (error: any) {
    console.error("Chat API Error:", error.message || error);
    return NextResponse.json(
      { error: "Rất tiếc, máy chủ AI đang bận. Vui lòng thử lại sau giây lát." },
      { status: 500 }
    );
  }
}
