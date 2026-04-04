"use client";

import React from "react";

export default function FloatingContact() {
  return (
    <div className="fixed bottom-24 right-6 z-[60] flex flex-col gap-3 md:bottom-[6.5rem] md:right-8">
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
          className="size-10"
          aria-hidden="true"
        >
          <path d="M12 2C6.477 2 2 6.164 2 11.236c0 1.947.663 3.754 1.79 5.215L2.3 20.8a.75.75 0 0 0 .97.97l4.349-1.49c1.46.126 3.268 1.196 4.381 1.196 5.523 0 10-4.164 10-9.236S17.523 2 12 2zm3.328 13.912h-4.496l-1.04 1.832c-.104.184-.336.216-.48.064l-.064-.064a.276.276 0 0 1-.048-.304l1.456-2.544c.056-.096.064-.208.016-.312s-.136-.184-.24-.224l-1.448-.52a.276.276 0 0 1-.168-.344l1.328-3.664c.088-.24.384-.328.584-.176l.048.04c.12.112.144.296.064.44l-1.12 1.992c-.064.12-.064.264 0 .384l.848.848c.112.112.288.112.4 0l1.176-1.176c.112-.112.112-.288 0-.4l-.848-.848c-.032-.032-.072-.056-.112-.072l.488-.864.04-.072a.276.276 0 0 1 .496.04l.952 2.624c.048.136.008.288-.104.376l-1.176.928c-.112.088-.136.248-.048.36l1.24 1.576c.072.088.192.112.304.048l1.376-.848c.184-.112.432-.048.536.144l.032.064a.276.276 0 0 1-.104.384l-1.312.808z" opacity=".1"/>
          <path d="M11.66 12.35l-.01.01h.01v-.01zM11.75 6.4h-1.63c-.11 0-.21.05-.28.14l-1.64 2.19c-.04.05-.06.11-.06.17s.02.12.06.17l1.64 2.19c.07.09.17.14.28.14h1.63c.11 0 .21-.05.28-.14l1.64-2.19c.04-.05.06-.11.06-.17s-.02-.12-.06-.17l-1.64-2.19c-.07-.09-.17-.14-.28-.14z"/>
        </svg>
      </a>
    </div>
  );
}
