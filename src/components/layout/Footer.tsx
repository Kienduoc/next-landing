import Link from "next/link";

const FOOTER_LINKS = [
  { label: "Trang Chủ", href: "#home" },
  { label: "Giới Thiệu", href: "#about" },
  { label: "Dịch Vụ", href: "#services" },
  { label: "Dự Án", href: "#portfolio" },
  { label: "Liên Hệ", href: "#contact" },
] as const;

export default function Footer() {
  return (
    <footer className="border-t border-border bg-bg px-[clamp(1.5rem,5vw,2rem)] py-12 pb-6" role="contentinfo">
      <div className="mx-auto max-w-[1200px]">
        {/* ——— Top row ——— */}
        <div className="mb-10 grid grid-cols-1 items-start gap-8 border-b border-border pb-10 md:grid-cols-[1fr_auto_auto] md:gap-12">
          {/* Brand */}
          <div>
            <a
              href="#home"
              className="flex items-center gap-2.5 font-display text-[1.1rem] font-bold tracking-tight"
              aria-label="ARCHITECT.AI - Trang chủ"
            >
              <span className="text-[1.4rem] text-primary-light">⬡</span>
              <span>
                ARCHITECT<span className="text-primary-light">.AI</span>
              </span>
            </a>
            <p className="mt-2 text-[0.825rem] text-text-muted">
              Kiến tạo tương lai doanh nghiệp với AI
            </p>
          </div>

          {/* Nav Links */}
          <nav
            className="flex flex-wrap gap-3 gap-x-6 md:flex-col md:gap-2.5"
            aria-label="Footer navigation"
          >
            {FOOTER_LINKS.map(({ label, href }) => (
              <a
                key={href}
                href={href}
                className="text-[0.85rem] text-text-muted transition-colors hover:text-text"
              >
                {label}
              </a>
            ))}
          </nav>

          {/* Social */}
          <div className="flex gap-3">
            <a
              href="https://www.linkedin.com/in/phnguyenduckien/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex size-[38px] items-center justify-center rounded-full border border-border bg-bg-card text-text-muted transition-all hover:border-border-hover hover:bg-primary-glow hover:text-primary-light"
              aria-label="LinkedIn"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" aria-hidden="true">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex size-[38px] items-center justify-center rounded-full border border-border bg-bg-card text-text-muted transition-all hover:border-border-hover hover:bg-primary-glow hover:text-primary-light"
              aria-label="Twitter / X"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" aria-hidden="true">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
          </div>
        </div>

        {/* ——— Bottom row ——— */}
        <div className="flex flex-col items-center justify-between gap-2 text-center text-[0.775rem] text-text-faint md:flex-row">
          <p>© 2026 ARCHITECT.AI. All rights reserved.</p>
          <p>
            Built with <span aria-label="tình yêu" className="text-red-500">♥</span> &amp; AI Power
          </p>
        </div>
      </div>
    </footer>
  );
}
