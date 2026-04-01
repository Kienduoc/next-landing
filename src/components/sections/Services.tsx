"use client";

import { useInView } from "@/hooks/useInView";

/* ——— Service data ——— */
const SERVICES = [
  {
    id: "automation",
    number: "01",
    title: "Tự Động Hóa Quy Trình AI",
    desc: "Triển khai các quy trình tự trị xử lý các tác vụ dữ liệu khối lượng lớn mà không cần sự can thiệp của con người. Tối ưu hóa workflow & tích hợp hệ thống.",
    features: [
      "Tự động hóa workflow n8n / Make.com",
      "Tích hợp API & hệ thống CRM",
      "Xây dựng chatbot thông minh",
      "Phân tích dữ liệu tự động",
    ],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="size-[26px] text-primary-light">
        <path d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
      </svg>
    ),
    featured: false,
  },
  {
    id: "strategy",
    number: "02",
    title: "Chiến Lược Kinh Doanh & Tích Hợp AI",
    desc: "Tư vấn cấp cao để điều chỉnh các mục tiêu kinh doanh cốt lõi với các ngăn xếp LLM và tự động hóa mới nhất. Thiết kế lộ trình AI toàn diện.",
    features: [
      "Đánh giá mức độ sẵn sàng AI",
      "Thiết kế kiến trúc hệ thống AI",
      "Lộ trình triển khai chi tiết",
      "Đo lường ROI và hiệu suất",
    ],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="size-[26px] text-primary-light">
        <path d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" />
      </svg>
    ),
    featured: true,
  },
  {
    id: "coaching",
    number: "03",
    title: "Huấn Luyện Hiệu Suất Cá Nhân",
    desc: "Đào tạo cấp điều hành về việc tận dụng các trợ lý AI cá nhân để thu hồi hơn 20 giờ làm việc mỗi tuần và tối đa hóa năng lực.",
    features: [
      "Thiết lập hệ thống AI cá nhân",
      "Prompt engineering nâng cao",
      "Tối ưu luồng công việc cá nhân",
      "Coaching 1-on-1 hàng tuần",
    ],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="size-[26px] text-primary-light">
        <path d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
      </svg>
    ),
    featured: false,
  },
] as const;

/* ——— Service Card ——— */
function ServiceCard({
  service,
  index,
}: {
  service: (typeof SERVICES)[number];
  index: number;
}) {
  const [ref, isInView] = useInView<HTMLElement>();
  const delayClass = `reveal-delay-${(index % 3) + 1}`;

  return (
    <article
      ref={ref}
      id={`service-${service.id}`}
      className={`
        card-glow-hover reveal-element ${isInView ? "visible" : ""} ${delayClass}
        relative flex flex-col gap-4 overflow-hidden rounded-2xl border p-8
        backdrop-blur-xl
        ${
          service.featured
            ? "border-primary/30 bg-linear-to-br from-primary/15 to-accent/8"
            : "border-border bg-bg-card"
        }
      `}
    >
      {/* Hover overlay */}
      <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-primary/8 to-accent/5 opacity-0 transition-opacity duration-250 group-hover:opacity-100" />

      {/* Featured badge */}
      {service.featured && (
        <div className="absolute top-5 right-5 rounded-full bg-linear-to-br from-primary to-accent px-3 py-1 text-[0.7rem] font-semibold text-white">
          Phổ biến nhất
        </div>
      )}

      {/* Number */}
      <span className="relative z-10 font-display text-[0.7rem] font-bold tracking-widest text-text-faint">
        {service.number}
      </span>

      {/* Icon */}
      <div className="relative z-10 flex size-[52px] items-center justify-center rounded-lg border border-border bg-primary-glow transition-all duration-250">
        {service.icon}
      </div>

      {/* Title */}
      <h3 className="relative z-10 font-display text-[1.15rem] font-bold leading-snug">
        {service.title}
      </h3>

      {/* Description */}
      <p className="relative z-10 flex-1 text-[0.875rem] leading-[1.7] text-text-muted">
        {service.desc}
      </p>

      {/* Features */}
      <ul className="relative z-10 flex flex-col gap-2" aria-label={`Tính năng ${service.title}`}>
        {service.features.map((f) => (
          <li key={f} className="relative pl-5 text-[0.8rem] text-text-muted">
            <span className="absolute left-0 text-[0.75rem] text-primary-light" aria-hidden="true">→</span>
            {f}
          </li>
        ))}
      </ul>

      {/* CTA */}
      <div className="relative z-10 mt-auto">
        <a
          href="#contact"
          className="service-arrow inline-flex items-center gap-1.5 text-[0.85rem] font-semibold text-primary-light transition-all"
        >
          Tìm hiểu thêm <span aria-hidden="true">→</span>
        </a>
      </div>
    </article>
  );
}

export default function Services() {
  return (
    <section
      id="services"
      className="relative bg-bg-2 px-[clamp(1.5rem,5vw,2rem)] py-[clamp(5rem,10vw,8rem)]"
      aria-label="Dịch vụ"
    >
      {/* Ambient bg */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_80%_20%,rgba(6,182,212,0.06)_0%,transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_30%_at_20%_80%,rgba(124,58,237,0.08)_0%,transparent_70%)]" />
      </div>

      <div className="relative mx-auto max-w-[1200px]">
        {/* Section label */}
        <div className="mb-10 flex items-center gap-4 text-[0.75rem] font-semibold uppercase tracking-[0.15em] text-text-muted">
          <span className="h-px flex-1 bg-border" aria-hidden="true" />
          <span>02 / Dịch Vụ</span>
          <span className="h-px flex-1 bg-border" aria-hidden="true" />
        </div>

        {/* Header */}
        <div className="mb-14 max-w-[640px]">
          <h2 className="mb-4 font-display text-[clamp(2rem,5vw,3.25rem)] font-bold leading-[1.15] tracking-tight">
            Giao Thức Cốt Lõi
            <br />
            <span className="gradient-text">Dịch Vụ Chuyên Sâu</span>
          </h2>
          <p className="text-[1.05rem] leading-[1.7] text-text-muted">
            Các chiến lược AI được thiết kế riêng cho khả năng mở rộng của doanh nghiệp và hiệu suất đỉnh cao của cá nhân.
          </p>
        </div>

        {/* Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, i) => (
            <ServiceCard key={s.id} service={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
