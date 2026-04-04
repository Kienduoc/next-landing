"use client";

import React from "react";

export default function FloatingContact() {
  return (
    <div className="fixed bottom-6 right-6 z-[60] flex flex-col gap-3 md:bottom-8 md:right-8">
      {/* Zalo Button */}
      <a
        href="https://zalo.me/0981689892"
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex size-14 items-center justify-center rounded-full bg-[#0068ff] text-white shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-[#0068ff]/40 active:scale-95"
        aria-label="Nhắn tin qua Zalo"
      >
        <div className="absolute -left-20 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-md bg-bg-card border border-border px-3 py-1.5 text-[0.8rem] font-medium text-text opacity-0 shadow-sm transition-all duration-300 group-hover:-left-24 group-hover:opacity-100 pointer-events-none">
          Chat qua Zalo
        </div>
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className="size-7"
          aria-hidden="true"
        >
          <path d="M19.071 4.929C15.183 1.041 8.817 1.041 4.929 4.929 -0.962 10.82-0.962 17.18 4.929 23.071c3.888 3.888 10.254 3.888 14.142 0 5.891-5.891 5.891-12.251 0-18.142z" opacity=".1"/>
          <path d="M12 2C6.477 2 2 5.582 2 10c0 1.956.88 3.738 2.344 5.14-.145.474-.53 1.543-.53 1.832 0 .422.383.567.653.42 1.353-.736 2.05-1.11 2.503-1.282.937.284 1.95.441 3.03.441 5.523 0 10-3.582 10-8s-4.477-8-10-8z"/>
        </svg>
      </a>
    </div>
  );
}
