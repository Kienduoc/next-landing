"use client";

import { useState, useRef, useEffect } from "react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Xin chào! Tôi là trợ lý AI của A Kiên. Tôi có thể giúp gì cho bạn hôm nay?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll xuống tin nhắn mới nhất
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, userMessage] }),
      });

      if (!response.ok) throw new Error("API Error");

      const data: Message = await response.json();
      
      let finalContent = data.content;
      // Tìm mảnh ghép (tag) chứa thông tin JSON
      const leadDataMatch = finalContent.match(/\|\|LEAD_DATA:\s*({.*?})\s*\|\|/);
      
      if (leadDataMatch && leadDataMatch[1]) {
        try {
          const leadInfo = JSON.parse(leadDataMatch[1]);
          console.log("🌟 Phát hiện khách hàng tiềm năng:", leadInfo);
          
          // GỬI DATA NGẦM LÊN GOOGLE SHEETS
          fetch("https://script.google.com/macros/s/AKfycbxdVHUssw0877eQOL37Ux9rYCvm5E2posmbQ-PgpKmSxxbCA7BTSxL1kXsWjpL8gSH3FQ/exec", {
            method: "POST",
            mode: "no-cors",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(leadInfo),
          }).catch((err) => console.error("Lỗi kết nối Webhook:", err));
        } catch (e) {
          console.error("Lỗi bóc tách JSON:", e);
        }
        // Xóa tag ẩn khỏi câu từ chối hiển thị cho User
        finalContent = finalContent.replace(/\|\|LEAD_DATA:\s*({.*?})\s*\|\|/g, "").trim();
      }

      setMessages((prev) => [...prev, { ...data, content: finalContent }]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Lỗi kết nối. Vui lòng thử lại sau." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Khung chatbox */}
      {isOpen && (
        <div className="mb-4 flex h-[450px] w-[350px] flex-col overflow-hidden rounded-2xl border border-border bg-bg/95 shadow-[0_8px_32px_rgba(0,0,0,0.5)] backdrop-blur-xl transition-all max-sm:fixed max-sm:inset-0 max-sm:h-full max-sm:w-full max-sm:rounded-none max-sm:mb-0">

          {/* Header */}
          <div className="flex items-center justify-between border-b border-border bg-bg-card px-4 py-3">
            <div className="flex items-center gap-3">
              <div className="relative flex size-8 items-center justify-center rounded-full bg-primary/20 text-primary-light">
                <span className="absolute -top-0.5 -right-0.5 size-2.5 rounded-full bg-green-500 shadow-[0_0_8px_#22c55e]" />
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
                </svg>
              </div>
              <div>
                <h3 className="text-[0.9rem] font-bold leading-tight">AI Assistant</h3>
                <p className="text-[0.7rem] text-text-muted">Trực tuyến</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="rounded-full p-2 text-text-faint transition-colors hover:bg-white/5 hover:text-white"
              aria-label="Đóng chat"
            >
              ✕
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10">
            <div className="flex flex-col gap-4">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-2 text-[0.875rem] leading-[1.5] whitespace-pre-wrap ${m.role === "user"
                      ? "bg-primary text-white rounded-br-sm"
                      : "bg-bg-2 text-text-muted rounded-bl-sm border border-border"
                      }`}
                  >
                    {m.content}
                  </div>
                </div>
              ))}

              {/* Tình trạng gõ phím */}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="max-w-[85%] rounded-2xl rounded-bl-sm border border-border bg-bg-2 px-4 py-3">
                    <div className="flex gap-1.5">
                      <span className="size-1.5 rounded-full bg-text-muted animate-[bounce_1s_infinite_0ms]" />
                      <span className="size-1.5 rounded-full bg-text-muted animate-[bounce_1s_infinite_150ms]" />
                      <span className="size-1.5 rounded-full bg-text-muted animate-[bounce_1s_infinite_300ms]" />
                    </div>
                  </div>
                </div>
              )}
              {/* Quick Actions */}
              {messages.length === 1 && !isLoading && (
                <div className="flex flex-wrap gap-2 pt-2">
                  {[
                    "Khóa học K12 là gì?",
                    "Giải pháp ISO AI",
                    "Liên hệ tư vấn Zalo",
                  ].map((suggestion) => (
                    <button
                      key={suggestion}
                      onClick={() => setInput(suggestion)}
                      className="rounded-full border border-primary/30 bg-primary/5 px-3 py-1.5 text-[0.75rem] text-primary-light transition-all hover:border-primary hover:bg-primary/10 active:scale-95"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Form nhập văn bản */}
          <div className="border-t border-border bg-bg-card p-3">
            <form onSubmit={handleSubmit} className="relative flex items-center">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Nhập tin nhắn..."
                disabled={isLoading}
                className="w-full rounded-full border border-border bg-bg/50 py-2.5 pl-4 pr-12 text-[0.875rem] text-text placeholder:text-text-faint transition-all focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="absolute right-1.5 flex size-8 items-center justify-center rounded-full bg-primary text-white transition-opacity hover:opacity-90 disabled:opacity-50"
                aria-label="Gửi"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" className="ml-0.5 size-4">
                  <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
                </svg>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Button floating */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex size-14 items-center justify-center rounded-full bg-linear-to-br from-primary to-accent shadow-[0_0_20px_var(--color-primary-glow)] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_var(--color-primary-glow)]"
        aria-label="Nhắn tin với AI"
      >
        {!isOpen ? (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-6 text-white transition-transform group-hover:scale-110">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-6 text-white transition-transform">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        )}
      </button>
    </div>
  );
}
