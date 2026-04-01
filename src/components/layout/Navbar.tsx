"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";

const NAV_ITEMS = [
  { id: "home", label: "Trang Chủ", href: "#home" },
  { id: "about", label: "Giới Thiệu", href: "#about" },
  { id: "services", label: "Dịch Vụ", href: "#services" },
  { id: "portfolio", label: "Dự Án", href: "#portfolio" },
  { id: "contact", label: "Liên Hệ", href: "#contact" },
] as const;

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  /* ——— Scroll: background + active link tracking ——— */
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = NAV_ITEMS.map(({ id }) =>
        document.getElementById(id)
      ).filter(Boolean) as HTMLElement[];

      const scrollY = window.pageYOffset;

      for (const section of sections) {
        const top = section.offsetTop - 100;
        const bottom = top + section.offsetHeight;
        if (scrollY >= top && scrollY < bottom) {
          setActiveSection(section.id);
          break;
        }
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ——— Lock body scroll when mobile menu is open ——— */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  return (
    <nav
      id="navbar"
      className={`fixed top-0 left-0 right-0 z-[1000] h-[72px] transition-all duration-400 ${
        scrolled
          ? "bg-bg/90 backdrop-blur-[20px] shadow-[0_1px_0_var(--color-border)]"
          : ""
      }`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="mx-auto flex h-full max-w-[1200px] items-center justify-between gap-8 px-[clamp(1.5rem,5vw,2rem)]">
        {/* ——— Logo ——— */}
        <a
          href="#home"
          className="flex shrink-0 items-center gap-2.5 font-display text-[1.1rem] font-bold tracking-tight"
          aria-label="ARCHITECT.AI - Trang chủ"
        >
          <span className="text-[1.4rem] text-primary-light">⬡</span>
          <span>
            ARCHITECT<span className="text-primary-light">.AI</span>
          </span>
        </a>

        {/* ——— Desktop nav links ——— */}
        <ul
          className={`
            flex items-center gap-1
            max-md:fixed max-md:top-[72px] max-md:left-0 max-md:right-0
            max-md:z-[999] max-md:flex-col max-md:items-start
            max-md:gap-1 max-md:border-b max-md:border-border
            max-md:bg-bg/[0.98] max-md:px-[clamp(1.5rem,5vw,2rem)] max-md:py-4 max-md:pb-6
            max-md:backdrop-blur-[20px]
            max-md:transition-all max-md:duration-400
            ${menuOpen ? "max-md:translate-y-0 max-md:opacity-100" : "max-md:-translate-y-[120%] max-md:opacity-0"}
          `}
          role="list"
        >
          {NAV_ITEMS.map(({ id, label, href }) => (
            <li key={id}>
              <a
                href={href}
                onClick={closeMenu}
                className={`block rounded-full px-3.5 py-2 text-[0.875rem] font-medium transition-all duration-150
                  max-md:w-full max-md:px-3.5 max-md:py-3
                  ${
                    activeSection === id
                      ? "bg-primary/12 text-text"
                      : "text-text-muted hover:bg-primary/12 hover:text-text"
                  }
                `}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        {/* ——— Desktop CTA ——— */}
        <a
          href="#contact"
          className="hidden rounded-full bg-linear-to-br from-primary to-accent px-5 py-2.5 text-[0.85rem] font-semibold text-white transition-all hover:shadow-[0_0_20px_var(--color-primary-glow)] hover:-translate-y-px md:inline-flex"
        >
          Bắt Đầu Ngay
        </a>

        {/* ——— Hamburger ——— */}
        <button
          className="flex flex-col gap-[5px] p-1 md:hidden"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label={menuOpen ? "Đóng menu" : "Mở menu"}
          aria-expanded={menuOpen}
        >
          <span
            className={`block h-[2px] w-6 rounded bg-text transition-all duration-250 ${
              menuOpen ? "translate-y-[7px] rotate-45" : ""
            }`}
          />
          <span
            className={`block h-[2px] w-6 rounded bg-text transition-all duration-250 ${
              menuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block h-[2px] w-6 rounded bg-text transition-all duration-250 ${
              menuOpen ? "-translate-y-[7px] -rotate-45" : ""
            }`}
          />
        </button>
      </div>
    </nav>
  );
}
