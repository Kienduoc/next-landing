import OpenAI from "openai";
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// Khởi tạo OpenAI client với custom Base URL và API Key theo yêu cầu
const openai = new OpenAI({
  apiKey: process.env.CHATBOT_API_KEY || "sk-4bd27113b7dc78d1-lh6jld-f4f9c69f",
  baseURL: process.env.CHATBOT_BASE_URL || "https://9router.vuhai.io.vn/v1",
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
Nhiệm vụ của bạn:
1. Đại diện cho Nguyễn Đức Kiên để trả lời các thắc mắc về khóa học (K12), dịch vụ (ISO AI, n8n automation, MCP server).
2. Dựa vào thông tin sau để trả lời chính xác:
---
${knowledgeBase}
---
3. Phong cách: Chuyên nghiệp, lịch sự, ngắn gọn và hữu ích.
4. Ưu tiên hướng dẫn khách hàng liên hệ qua Email (phnguyenduckien@gmail.com) hoặc Zalo (098 168 9892) nếu câu hỏi vượt quá phạm vi kiến thức.
5. Luôn trả lời bằng Tiếng Việt.

Quy tắc đặc biệt: Trong quá trình trò chuyện, nếu bạn phát hiện người dùng cung cấp
Tên, Số điện thoại hoặc Email, bạn HÃY VỪA trả lời họ bình thường, VỪA chèn thêm
một đoạn mã JSON vào cuối cùng của câu trả lời theo đúng định dạng sau:
||LEAD_DATA: {"name": "...", "phone": "...", "email": "..."}||
Nếu thông tin nào chưa có, hãy để null.
TUYỆT ĐỐI KHÔNG giải thích hay đề cập đến đoạn mã này cho người dùng.`;

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
