"use client";

import { useInView } from "@/hooks/useInView";

/* ——— Skill data ——— */
const SKILLS = [
  { name: "AI Automation", pct: 95 },
  { name: "Business Strategy", pct: 90 },
  { name: "LLM Engineering", pct: 88 },
  { name: "Process Optimization", pct: 92 },
] as const;

const TECH_TAGS = [
  "GPT-4o",
  "Claude 3.5",
  "n8n",
  "Make.com",
  "LangChain",
  "Python",
  "Zapier",
  "Notion AI",
] as const;

/* ——— Animated Skill Bar ——— */
function SkillBar({ name, pct }: { name: string; pct: number }) {
  const [ref, isInView] = useInView<HTMLDivElement>();

  return (
    <div className="space-y-2">
      <div className="flex justify-between">
        <span className="text-[0.875rem] font-medium">{name}</span>
        <span className="text-[0.8rem] font-semibold text-primary-light">{pct}%</span>
      </div>
      <div
        ref={ref}
        className="h-1 overflow-hidden rounded-sm bg-primary/12"
        role="progressbar"
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className={`skill-fill-bar ${isInView ? "animated" : ""}`}
          style={{ "--pct": `${pct}%` } as React.CSSProperties}
        />
      </div>
    </div>
  );
}

export default function About() {
  const [titleRef, titleVisible] = useInView<HTMLHeadingElement>();

  return (
    <section
      id="about"
      className="bg-linear-to-b from-bg to-bg-2 px-[clamp(1.5rem,5vw,2rem)] py-[clamp(5rem,10vw,8rem)]"
      aria-label="Giới thiệu"
    >
      <div className="mx-auto max-w-[1200px]">
        {/* Section label */}
        <div className="mb-10 flex items-center gap-4 text-[0.75rem] font-semibold uppercase tracking-[0.15em] text-text-muted">
          <span className="h-px flex-1 bg-border" aria-hidden="true" />
          <span>01 / Giới Thiệu</span>
          <span className="h-px flex-1 bg-border" aria-hidden="true" />
        </div>

        <div className="grid items-start gap-16 lg:grid-cols-2">
          {/* ——— Left: text ——— */}
          <div>
            <h2
              ref={titleRef}
              className={`mb-4 font-display text-[clamp(2rem,5vw,3.25rem)] font-bold leading-[1.15] tracking-tight reveal-element ${titleVisible ? "visible" : ""}`}
            >
              Kiến Trúc Sư
              <br />
              <span className="gradient-text">Một Thập Kỷ Vận Hành Xuất Sắc.</span>
            </h2>

            <p className="mb-5 text-base leading-[1.8] text-text-muted">
              Hành trình của tôi bắt đầu từ những thử thách quản lý doanh nghiệp thực tế, nơi tôi đã dành{" "}
              <strong className="font-semibold text-text">10 năm tối ưu hóa</strong> các quy trình thủ công cho các doanh
              nghiệp lớn.
            </p>
            <p className="mb-8 text-base leading-[1.8] text-text-muted">
              Nhận thấy những hạn chế của vận hành ở quy mô con người, tôi đã chuyển hướng sang triển khai AI. Ngày nay, tôi
              thu hẹp khoảng cách giữa{" "}
              <strong className="font-semibold text-text">trí tuệ quản trị truyền thống</strong> và khả năng mở rộng vô hạn
              của các hệ thống tự trị.
            </p>

            {/* Feature cards */}
            <div className="flex flex-col gap-4">
              {[
                {
                  icon: "⚡",
                  title: "Chuyển Đổi Hệ Thống",
                  desc: "Di chuyển kiến trúc doanh nghiệp từ truyền thống sang ưu tiên AI.",
                },
                {
                  icon: "📊",
                  title: "Kiểm Tra Hiệu Suất",
                  desc: "Lập bản đồ hiệu suất dựa trên dữ liệu và loại bỏ các nút thắt cổ chai.",
                },
              ].map((f) => (
                <div
                  key={f.title}
                  className="feature-shift flex gap-4 rounded-lg border border-border bg-bg-card p-5 backdrop-blur-lg transition-all duration-250"
                >
                  <div className="flex size-11 shrink-0 items-center justify-center rounded-md bg-primary-glow text-2xl" aria-hidden="true">
                    {f.icon}
                  </div>
                  <div>
                    <h3 className="mb-1 text-[0.9rem] font-semibold">{f.title}</h3>
                    <p className="text-[0.82rem] leading-relaxed text-text-muted">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ——— Right: skills card ——— */}
          <div className="sticky top-[calc(72px+2rem)] rounded-2xl border border-border bg-bg-card p-8 backdrop-blur-2xl">
            <h3 className="mb-6 text-[0.75rem] font-semibold uppercase tracking-[0.08em] text-text-muted">
              Chỉ Số Năng Lực
            </h3>

            <div className="mb-8 flex flex-col gap-5">
              {SKILLS.map((s) => (
                <SkillBar key={s.name} name={s.name} pct={s.pct} />
              ))}
            </div>

            <div className="flex flex-wrap gap-2">
              {TECH_TAGS.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-border bg-primary/10 px-3 py-1 text-[0.72rem] font-medium text-primary-light transition-all hover:border-border-hover hover:bg-primary/20"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
