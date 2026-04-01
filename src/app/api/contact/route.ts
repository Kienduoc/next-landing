import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req: Request) {
  try {
    const apiKey = process.env.RESEND_API_KEY;
    const { name, email, subject, message } = await req.json();

    // 1. Basic Validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Vui lòng điền đầy đủ thông tin bắt buộc." },
        { status: 400 }
      );
    }

    // 2. Kiểm tra API Key đã được cấu hình chưa
    if (!apiKey) {
      console.warn("Chưa cấu hình RESEND_API_KEY - giả lập thành công");
      // Simulate delay if no API key
      await new Promise((resolve) => setTimeout(resolve, 800));
      return NextResponse.json({
        success: true,
        message: "Gửi thông tin thành công! (Chế độ mô phỏng chưa có API Key)",
      });
    }

    const resend = new Resend(apiKey);

    // 3. Gửi Email thật qua Resend
    // Lưu ý: Nếu chưa có tên miền (domain) xác thực trên Resend,
    // trường "to" (người nhận) BẮT BUỘC phải là email mà bạn dùng để đăng ký tài khoản Resend.
    const { data, error } = await resend.emails.send({
      from: "Architect AI Contact <onboarding@resend.dev>", 
      to: "nhap.email.cua.ban@gmail.com", // 🔴 THAY BẰNG EMAIL CỦA BẠN (Cái bạn dùng đăng ký Resend)
      subject: subject || "Có người liên hệ từ Landing Page Architect AI",
      html: `
        <h2>Bạn nhận được tin nhắn mới từ Website</h2>
        <p><strong>Tên:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Nội dung:</strong></p>
        <p>${message}</p>
      `,
    });

    if (error) {
      console.error("Resend API Error details:", error);
      return NextResponse.json(
        { error: "Không thể gửi email lúc này. Hãy thử lại." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data,
      message: "Gửi thông tin thành công!",
    });
  } catch (error) {
    console.error("Contact API Server Error:", error);
    return NextResponse.json(
      { error: "Máy chủ bận. Thử lại sau." },
      { status: 500 }
    );
  }
}
