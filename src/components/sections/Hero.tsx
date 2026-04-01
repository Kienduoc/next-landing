"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useInView } from "@/hooks/useInView";

/* ——— Animated Counter sub-component ——— */
function Counter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const [ref, isInView] = useInView<HTMLSpanElement>({ threshold: 0.5 });
  const hasRun = useRef(false);

  useEffect(() => {
    if (!isInView || hasRun.current) return;
    hasRun.current = true;

    const duration = 2000;
    const fps = 60;
    const totalFrames = Math.round((duration / 1000) * fps);
    let frame = 0;

    const id = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.ceil(eased * target));

      if (frame >= totalFrames) {
        clearInterval(id);
        setCount(target);
      }
    }, duration / totalFrames);

    return () => clearInterval(id);
  }, [isInView, target]);

  return (
    <span ref={ref} className="gradient-text inline font-display text-[2rem] font-extrabold leading-none">
      {count}
      <span className="gradient-text text-[1.2rem] font-bold">{suffix}</span>
    </span>
  );
}

/* ——— Tech pill data ——— */
const TECH_PILLS = [
  { label: "GPT-4o", className: "top-[5%] right-[-15%]" },
  { label: "Claude AI", className: "top-[25%] right-[-20%] [animation-delay:0.5s]" },
  { label: "n8n", className: "top-[55%] right-[-10%] [animation-delay:1s]" },
  { label: "Make.com", className: "bottom-[20%] left-[-15%] [animation-delay:1.5s]" },
  { label: "LangChain", className: "top-[15%] left-[-20%] [animation-delay:2s]" },
] as const;

export default function Hero() {
  /* ——— Parallax on desktop ——— */
  const visualRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(min-width: 1024px)");
    if (!mq.matches) return;

    const onMove = (e: MouseEvent) => {
      if (!visualRef.current) return;
      const x = (window.innerWidth / 2 - e.pageX) / 50;
      const y = (window.innerHeight / 2 - e.pageY) / 50;
      visualRef.current.style.transform = `translate(${x}px, ${y}px)`;
    };
    const onLeave = () => {
      if (visualRef.current) visualRef.current.style.transform = "translate(0,0)";
    };

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <section
      id="home"
      className="relative flex min-h-screen flex-col overflow-hidden pt-[72px]"
      aria-label="Hero section"
    >
      {/* ——— Background orbs ——— */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="orb absolute -top-[200px] -right-[100px] size-[600px] rounded-full bg-[radial-gradient(circle,#7c3aed_0%,transparent_70%)] opacity-30 blur-[80px] animate-orb-float" />
        <div className="orb absolute -left-[100px] bottom-0 size-[400px] rounded-full bg-[radial-gradient(circle,#06b6d4_0%,transparent_70%)] opacity-30 blur-[80px] animate-orb-float [animation-direction:reverse] [animation-duration:10s]" />
        <div className="orb absolute top-1/2 left-[40%] size-[300px] rounded-full bg-[radial-gradient(circle,#a855f7_0%,transparent_70%)] opacity-30 blur-[80px] animate-orb-float [animation-delay:2s] [animation-duration:12s]" />
        <div className="grid-overlay absolute inset-0" />
      </div>

      {/* ——— Content ——— */}
      <div className="relative z-10 mx-auto flex w-full max-w-[1200px] flex-1 flex-col justify-center px-[clamp(1.5rem,5vw,2rem)] pt-12 pb-8">
        {/* Badge */}
        <div className="mb-10 inline-flex w-fit items-center gap-2 self-start rounded-full border border-border bg-primary/[0.06] px-4 py-1.5 text-[0.8rem] text-text-muted backdrop-blur-[10px] max-md:self-center">
          <span className="size-[7px] rounded-full bg-green-500 animate-pulse-dot" />
          <span>Đang nhận dự án mới · 2026</span>
        </div>

        {/* Grid: text | visual */}
        <div className="grid items-center gap-16 lg:grid-cols-2 max-md:text-center">
          {/* ——— Text column ——— */}
          <div className="max-md:order-2">
            <h1 className="mb-6 font-display text-[clamp(2.5rem,6vw,4.5rem)] font-extrabold leading-[1.1] tracking-tight">
              <span className="block">Tối Ưu Hóa</span>
              <span className="gradient-text block">Hiệu Suất Doanh Nghiệp</span>
              <span className="block">Với Tự Động Hóa AI</span>
            </h1>

            <p className="mx-auto mb-10 max-w-[520px] text-[clamp(1rem,2vw,1.15rem)] leading-[1.75] text-text-muted max-md:mx-auto lg:mx-0">
              Chuyên gia về <strong className="font-semibold text-text">Hiệu suất Doanh nghiệp</strong> và{" "}
              <strong className="font-semibold text-text">Vận hành AI</strong>. Kiến tạo tương lai của logic kinh doanh có
              khả năng mở rộng thông qua các giao thức thông minh.
            </p>

            {/* CTA buttons */}
            <div className="mb-12 flex flex-wrap gap-4 max-md:justify-center">
              <a
                href="#services"
                className="group inline-flex items-center gap-2 rounded-full bg-linear-to-br from-primary to-accent px-7 py-3.5 text-[0.9rem] font-semibold text-white shadow-[0_0_20px_var(--color-primary-glow)] transition-all hover:-translate-y-0.5 hover:shadow-[0_0_30px_var(--color-primary-glow),0_8px_24px_rgba(0,0,0,0.3)]"
              >
                <span>Khám Phá Dịch Vụ</span>
                <span className="transition-transform group-hover:translate-x-1" aria-hidden="true">→</span>
              </a>
              <a
                href="#portfolio"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-transparent px-7 py-3.5 text-[0.9rem] font-semibold text-text transition-all hover:-translate-y-0.5 hover:border-border-hover hover:bg-primary-glow"
              >
                Xem Dự Án
              </a>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-6 max-md:justify-center max-sm:flex-col max-sm:gap-3">
              <div className="flex flex-col gap-0.5">
                <Counter target={10} suffix="+" />
                <span className="text-[0.72rem] font-medium uppercase tracking-wider text-text-muted">Năm kinh nghiệm</span>
              </div>
              <div className="h-10 w-px bg-border max-sm:hidden" aria-hidden="true" />
              <div className="flex flex-col gap-0.5">
                <Counter target={50} suffix="+" />
                <span className="text-[0.72rem] font-medium uppercase tracking-wider text-text-muted">Dự án thành công</span>
              </div>
              <div className="h-10 w-px bg-border max-sm:hidden" aria-hidden="true" />
              <div className="flex flex-col gap-0.5">
                <Counter target={20} suffix="h/tuần" />
                <span className="text-[0.72rem] font-medium uppercase tracking-wider text-text-muted">Được tiết kiệm/KH</span>
              </div>
            </div>
          </div>

          {/* ——— Visual column ——— */}
          <div ref={visualRef} className="relative flex items-center justify-center max-md:order-1">
            {/* Avatar */}
            <div className="relative size-[340px] shrink-0 max-md:size-[240px]">
              {/* Glow */}
              <div className="absolute -inset-5 rounded-full bg-[radial-gradient(ellipse,rgba(124,58,237,0.35)_0%,transparent_70%)] animate-avatar-glow" aria-hidden="true" />
              {/* Ring */}
              <div className="avatar-ring absolute -inset-2 rounded-full animate-ring-rotate" aria-hidden="true" />
              {/* Image */}
              <Image
                src="/assets/avatar.png"
                alt="AI Expert - Chuyên gia Vận hành AI"
                width={380}
                height={380}
                priority
                className="relative z-10 size-full rounded-full border-[3px] border-primary/30 object-cover"
              />
              {/* Status badge */}
              <div
                className="absolute bottom-2.5 left-1/2 z-20 flex -translate-x-1/2 items-center gap-1.5 whitespace-nowrap rounded-full border border-border bg-bg/90 px-4 py-1.5 text-[0.75rem] font-medium text-green-500 backdrop-blur-[10px]"
                aria-label="Trạng thái: Sẵn sàng"
              >
                <span className="size-1.5 rounded-full bg-green-500 animate-pulse-dot" aria-hidden="true" />
                Sẵn sàng hợp tác
              </div>
            </div>

            {/* Tech pills */}
            <div className="pointer-events-none absolute inset-0 max-md:hidden" aria-label="Công nghệ sử dụng">
              {TECH_PILLS.map(({ label, className }) => (
                <div
                  key={label}
                  className={`absolute rounded-full border border-border bg-bg-2/90 px-3.5 py-1.5 text-[0.72rem] font-semibold text-text-muted backdrop-blur-[10px] animate-pill-float ${className}`}
                >
                  {label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ——— Scroll indicator ——— */}
      <a
        href="#about"
        className="relative z-10 flex flex-col items-center gap-2 self-center p-6 text-[0.7rem] uppercase tracking-widest text-text-faint transition-colors hover:text-text-muted"
        aria-label="Cuộn xuống phần giới thiệu"
      >
        <div className="flex h-[34px] w-[22px] justify-center rounded-xl border-[1.5px] border-current pt-[5px]">
          <div className="h-1.5 w-[3px] rounded-sm bg-current animate-scroll-wheel" />
        </div>
        <span>Cuộn xuống</span>
      </a>
    </section>
  );
}
