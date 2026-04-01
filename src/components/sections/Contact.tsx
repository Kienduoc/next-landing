"use client";

import { useState, type FormEvent } from "react";
import { useInView } from "@/hooks/useInView";

/* ——— Contact method data ——— */
const CONTACT_METHODS = [
  {
    id: "email",
    icon: "✉",
    label: "Email trực tiếp",
    value: "phnguyenduckien@gmail.com",
    href: "mailto:phnguyenduckien@gmail.com",
    external: false,
  },
  {
    id: "linkedin",
    icon: "in",
    label: "LinkedIn",
    value: "Kết nối chuyên nghiệp",
    href: "https://linkedin.com",
    external: true,
  },
  {
    id: "calendly",
    icon: "📅",
    label: "Calendly",
    value: "Đặt lịch tư vấn miễn phí 30 phút",
    href: "https://calendly.com",
    external: true,
  },
] as const;

/* ——— Contact method link (extracted to respect Rules of Hooks) ——— */
function ContactMethodLink({
  method,
  index,
}: {
  method: (typeof CONTACT_METHODS)[number];
  index: number;
}) {
  const [ref, vis] = useInView<HTMLAnchorElement>();
  return (
    <a
      ref={ref}
      href={method.href}
      target={method.external ? "_blank" : undefined}
      rel={method.external ? "noopener noreferrer" : undefined}
      id={`contact-${method.id}`}
      className={`feature-shift reveal-element ${vis ? "visible" : ""} reveal-delay-${(index % 3) + 1} flex items-center gap-4 rounded-lg border border-border bg-bg-card p-4 backdrop-blur-[10px] transition-all duration-250`}
    >
      <div className="flex size-[42px] shrink-0 items-center justify-center rounded-md border border-border bg-primary-glow text-base font-bold text-primary-light" aria-hidden="true">
        {method.icon}
      </div>
      <div className="flex flex-1 flex-col gap-0.5">
        <span className="text-[0.7rem] uppercase tracking-[0.08em] text-text-faint">{method.label}</span>
        <span className="text-[0.875rem] font-medium">{method.value}</span>
      </div>
      <span className="text-text-faint transition-all duration-150 group-hover:translate-x-1 group-hover:text-primary-light" aria-hidden="true">→</span>
    </a>
  );
}

export default function Contact() {
  const [titleRef, titleVisible] = useInView<HTMLHeadingElement>();
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      subject: formData.get("service"),
      message: formData.get("message"),
    };

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    setSubmitting(true);
    setError(null);
    setSubmitted(false);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Gửi yêu cầu thất bại.");
      }

      setSubmitted(true);
      form.reset();

      // Clear success message after 10s
      setTimeout(() => setSubmitted(false), 10000);
    } catch (err: any) {
      setError(err.message || "Đã có lỗi xảy ra. Vui lòng thử lại.");
    } finally {
      setSubmitting(true); // Keep submitting state for a moment for transition
      setTimeout(() => setSubmitting(false), 500);
    }
  };

  return (
    <section
      id="contact"
      className="relative bg-bg-2 px-[clamp(1.5rem,5vw,2rem)] py-[clamp(5rem,10vw,8rem)]"
      aria-label="Liên hệ"
    >
      {/* Ambient */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_60%_at_50%_0%,rgba(124,58,237,0.08)_0%,transparent_70%)]"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-[1200px]">
        {/* Section label */}
        <div className="mb-10 flex items-center gap-4 text-[0.75rem] font-semibold uppercase tracking-[0.15em] text-text-muted">
          <span className="h-px flex-1 bg-border" aria-hidden="true" />
          <span>04 / Liên Hệ</span>
          <span className="h-px flex-1 bg-border" aria-hidden="true" />
        </div>

        <div className="grid items-start gap-16 lg:grid-cols-2">
          {/* ——— Left: info ——— */}
          <div>
            <h2
              ref={titleRef}
              className={`mb-4 font-display text-[clamp(2rem,5vw,3.25rem)] font-bold leading-[1.15] tracking-tight reveal-element ${titleVisible ? "visible" : ""}`}
            >
              Khởi Chạy
              <br />
              <span className="gradient-text">Giao Thức Hợp Tác</span>
            </h2>
            <p className="mb-10 text-base leading-[1.7] text-text-muted">
              Thảo luận về các yêu cầu vận hành của bạn với chuyên gia. Tôi phản hồi trong vòng{" "}
              <strong className="font-semibold text-text">24 giờ</strong>.
            </p>

            {/* Contact methods */}
            <div className="flex flex-col gap-3.5">
              {CONTACT_METHODS.map((m, idx) => (
                <ContactMethodLink key={m.id} method={m} index={idx} />
              ))}
            </div>
          </div>

          {/* ——— Right: form ——— */}
          <div className="rounded-2xl border border-border bg-bg-card p-8 backdrop-blur-2xl">
            <form id="contact-form" noValidate onSubmit={handleSubmit} className="flex flex-col gap-5" aria-label="Form liên hệ">
              {/* Name */}
              <div className="flex flex-col gap-2">
                <label htmlFor="contact-name" className="text-[0.8rem] font-medium uppercase tracking-[0.08em] text-text-muted">
                  Họ và tên
                </label>
                <input
                  type="text"
                  id="contact-name"
                  name="name"
                  placeholder="Nguyễn Văn A"
                  required
                  autoComplete="name"
                  className="w-full rounded-md border border-border bg-bg/60 px-4 py-3 text-[0.9rem] text-text placeholder:text-text-faint transition-all focus:border-primary focus:shadow-[0_0_0_3px_var(--color-primary-glow)] focus:outline-none"
                />
              </div>

              {/* Email */}
              <div className="flex flex-col gap-2">
                <label htmlFor="contact-email-input" className="text-[0.8rem] font-medium uppercase tracking-[0.08em] text-text-muted">
                  Email
                </label>
                <input
                  type="email"
                  id="contact-email-input"
                  name="email"
                  placeholder="phnguyenduckien@gmail.com"
                  required
                  autoComplete="email"
                  className="w-full rounded-md border border-border bg-bg/60 px-4 py-3 text-[0.9rem] text-text placeholder:text-text-faint transition-all focus:border-primary focus:shadow-[0_0_0_3px_var(--color-primary-glow)] focus:outline-none"
                />
              </div>

              {/* Service select */}
              <div className="flex flex-col gap-2">
                <label htmlFor="contact-service" className="text-[0.8rem] font-medium uppercase tracking-[0.08em] text-text-muted">
                  Dịch vụ quan tâm
                </label>
                <select
                  id="contact-service"
                  name="service"
                  required
                  defaultValue=""
                  className="form-select-custom w-full cursor-pointer rounded-md border border-border bg-bg/60 px-4 py-3 pr-10 text-[0.9rem] text-text transition-all focus:border-primary focus:shadow-[0_0_0_3px_var(--color-primary-glow)] focus:outline-none [&>option]:bg-bg-2 [&>option]:text-text"
                >
                  <option value="" disabled>Chọn dịch vụ...</option>
                  <option value="automation">Tự Động Hóa Quy Trình AI</option>
                  <option value="strategy">Chiến Lược Kinh Doanh &amp; AI</option>
                  <option value="coaching">Huấn Luyện Hiệu Suất Cá Nhân</option>
                  <option value="other">Khác</option>
                </select>
              </div>

              {/* Message */}
              <div className="flex flex-col gap-2">
                <label htmlFor="contact-message" className="text-[0.8rem] font-medium uppercase tracking-[0.08em] text-text-muted">
                  Mô tả nhu cầu của bạn
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  placeholder="Hãy chia sẻ thách thức bạn đang gặp phải và mục tiêu bạn muốn đạt được..."
                  rows={4}
                  required
                  className="min-h-[110px] w-full resize-y rounded-md border border-border bg-bg/60 px-4 py-3 text-[0.9rem] text-text placeholder:text-text-faint transition-all focus:border-primary focus:shadow-[0_0_0_3px_var(--color-primary-glow)] focus:outline-none"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={submitting}
                className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-linear-to-br from-primary to-accent px-7 py-3.5 text-[0.9rem] font-semibold text-white shadow-[0_0_20px_var(--color-primary-glow)] transition-all hover:-translate-y-0.5 hover:shadow-[0_0_30px_var(--color-primary-glow),0_8px_24px_rgba(0,0,0,0.3)] disabled:opacity-70"
              >
                <span>{submitting ? "Đang gửi..." : "Gửi Yêu Cầu"}</span>
                <span className="transition-transform group-hover:translate-x-1" aria-hidden="true">→</span>
              </button>

              {/* Success message */}
              {submitted && (
                <div
                  className="flex items-center gap-2 rounded-md border border-green-500/30 bg-green-500/10 px-4 py-3.5 text-[0.875rem] font-medium text-green-500 animate-slide-in"
                  role="alert"
                >
                  <span className="text-lg">✓</span> Yêu cầu đã được gửi! Tôi sẽ liên hệ lại sớm.
                </div>
              )}

              {/* Error message */}
              {error && (
                <div
                  className="flex items-center gap-2 rounded-md border border-red-500/30 bg-red-500/10 px-4 py-3.5 text-[0.875rem] font-medium text-red-500 animate-slide-in"
                  role="alert"
                >
                  <span className="text-lg">✕</span> {error}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
