"use client";

import { useInView } from "@/hooks/useInView";

/* ——— Project data ——— */
const PROJECTS = [
  {
    id: "openclaw",
    tags: ["Personal Assistant", "AI Automation"],
    title: "Hệ thống Openclaw",
    desc: "Trợ lý cá nhân xuất sắc, giúp tự động hóa các tác vụ hàng ngày và tối ưu hóa năng suất làm việc cá nhân.",
    metrics: [
      { value: "20h+", label: "Tiết kiệm/tuần" },
      { value: "100%", label: "Tự động hóa" },
    ],
    mockup: "chart",
  },
  {
    id: "iso-ai",
    tags: ["ISO", "QMS", "LLM"],
    title: "ISO AI",
    desc: "Ứng dụng AI vào Hệ thống quản trị chất lượng chuẩn ISO 9001, ISO 17025, ISO 17065. Giúp tự động hóa đánh giá và lưu trữ hồ sơ.",
    metrics: [
      { value: "99%", label: "Tuân thủ" },
      { value: "1/10", label: "Thời gian audit" },
    ],
    mockup: "alert",
  },
  {
    id: "marketing",
    tags: ["Marketing AI", "Social Media"],
    title: "AI Marketing Automation",
    desc: "Tự động hóa đăng bài, quản trị Ads trên Facebook. Phân tích insight khách hàng và tối ưu hóa ngân sách theo thời gian thực.",
    metrics: [
      { value: "300%", label: "Tăng reach" },
      { value: "-40%", label: "Chi phí Ads" },
    ],
    mockup: "stats",
  },
] as const;

/* ——— Mockup visualizations ——— */
function MockupHeader() {
  return (
    <div className="flex items-center gap-[5px] border-b border-border bg-white/[0.04] px-3 py-2">
      <span className="size-2 rounded-full bg-red-500" />
      <span className="size-2 rounded-full bg-yellow-500" />
      <span className="size-2 rounded-full bg-green-500" />
    </div>
  );
}

function ChartMockup() {
  const bars = [40, 70, 55, 90, 65];
  return (
    <div className="p-4">
      <div className="mb-2 h-[5px] w-4/5 rounded bg-white/[0.08]" />
      <div className="mb-3 h-[5px] w-3/5 rounded bg-white/[0.08]" />
      <div className="flex h-[50px] items-end gap-1">
        {bars.map((h, i) => (
          <div
            key={i}
            className="flex-1 rounded-t bg-linear-to-t from-primary to-accent opacity-70"
            style={{ height: `${h}%` }}
          />
        ))}
      </div>
    </div>
  );
}

function AlertMockup() {
  return (
    <div className="p-4">
      <div className="mb-2 rounded border border-yellow-500/20 bg-yellow-500/10 px-2 py-1 text-[0.65rem] text-yellow-500">
        ⚠ Anomaly Detected
      </div>
      <div className="mb-2 h-[5px] w-[90%] rounded bg-white/[0.08]" />
      <div className="mb-2 h-[5px] w-[70%] rounded bg-white/[0.08]" />
      <div className="h-[5px] w-1/2 rounded bg-white/[0.08]" />
    </div>
  );
}

function StatsMockup() {
  return (
    <div className="p-4">
      <div className="mb-3 flex gap-3">
        <div className="text-center">
          <span className="gradient-text block text-[0.9rem] font-bold">2.4K</span>
          <span className="text-[0.55rem] text-text-muted">Leads</span>
        </div>
        <div className="text-center">
          <span className="gradient-text block text-[0.9rem] font-bold">89%</span>
          <span className="text-[0.55rem] text-text-muted">Conv.</span>
        </div>
      </div>
      <div className="mb-2 h-[5px] w-4/5 rounded bg-white/[0.08]" />
      <div className="h-[5px] w-3/5 rounded bg-white/[0.08]" />
    </div>
  );
}

const MOCKUPS: Record<string, React.FC> = {
  chart: ChartMockup,
  alert: AlertMockup,
  stats: StatsMockup,
};

/* ——— Portfolio Card ——— */
function PortfolioCard({
  project,
  index,
}: {
  project: (typeof PROJECTS)[number];
  index: number;
}) {
  const [ref, isInView] = useInView<HTMLElement>();
  const Mockup = MOCKUPS[project.mockup];
  const delayClass = `reveal-delay-${(index % 3) + 1}`;

  return (
    <article
      ref={ref}
      id={`portfolio-${project.id}`}
      className={`card-glow-hover reveal-element ${isInView ? "visible" : ""} ${delayClass} overflow-hidden rounded-2xl border border-border bg-bg-card backdrop-blur-xl`}
    >
      {/* Visual mockup */}
      <div className="relative flex h-[200px] items-center justify-center overflow-hidden bg-bg-2 p-6" aria-hidden="true">
        <div className="absolute inset-0 bg-linear-to-br from-primary/8 to-accent/5" />
        <div className="relative z-10 w-full max-w-[240px] overflow-hidden rounded-md border border-border bg-bg/80">
          <MockupHeader />
          <Mockup />
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Tags */}
        <div className="mb-3 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-border bg-primary/10 px-2.5 py-0.5 text-[0.68rem] font-medium text-primary-light"
            >
              {tag}
            </span>
          ))}
        </div>

        <h3 className="mb-2.5 font-display text-[1.05rem] font-bold">{project.title}</h3>
        <p className="mb-4 text-[0.825rem] leading-relaxed text-text-muted">{project.desc}</p>

        {/* Metrics */}
        <div className="flex gap-6 border-t border-border pt-4">
          {project.metrics.map((m) => (
            <div key={m.label} className="flex flex-col gap-0.5">
              <span className="gradient-text font-display text-[1.25rem] font-bold">{m.value}</span>
              <span className="text-[0.7rem] text-text-faint">{m.label}</span>
            </div>
          ))}
        </div>
      </div>
    </article>
  );
}

export default function Portfolio() {
  return (
    <section
      id="portfolio"
      className="bg-bg px-[clamp(1.5rem,5vw,2rem)] py-[clamp(5rem,10vw,8rem)]"
      aria-label="Dự án"
    >
      <div className="mx-auto max-w-[1200px]">
        {/* Section label */}
        <div className="mb-10 flex items-center gap-4 text-[0.75rem] font-semibold uppercase tracking-[0.15em] text-text-muted">
          <span className="h-px flex-1 bg-border" aria-hidden="true" />
          <span>03 / Dự Án</span>
          <span className="h-px flex-1 bg-border" aria-hidden="true" />
        </div>

        {/* Header */}
        <div className="mb-14 max-w-[640px]">
          <h2 className="mb-4 font-display text-[clamp(2rem,5vw,3.25rem)] font-bold leading-[1.15] tracking-tight">
            Bằng Chứng Về Tác Động
            <br />
            <span className="gradient-text">Dự Án Tiêu Biểu</span>
          </h2>
          <p className="text-[1.05rem] leading-[1.7] text-text-muted">
            Những dự án thực tế đã tạo ra sự thay đổi đo lường được cho doanh nghiệp.
          </p>
        </div>

        {/* Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((p, i) => (
            <PortfolioCard key={p.id} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
