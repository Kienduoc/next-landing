import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Chatbot from "@/components/ui/Chatbot";

/* ——— Google Fonts loaded via next/font (self-hosted, no CLS) ——— */
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "vietnamese"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin", "vietnamese"],
  display: "swap",
});

/* ——— SEO Metadata ——— */
export const metadata: Metadata = {
  metadataBase: new URL("https://architect.ai"), // Update to your domain
  title: {
    default: "Nguyễn Đức Kiên | Chuyên Gia Tối Ưu Vận Hành AI",
    template: "%s | Nguyễn Đức Kiên AI",
  },
  description:
    "Chuyên gia về Hiệu suất Doanh nghiệp và Vận hành AI. Chuyên cung cấp giải pháp Tự động hóa thông minh (n8n, MCP), đào tạo AI (Khoá K12) và tư vấn ISO AI.",
  keywords: [
    "Nguyễn Đức Kiên AI",
    "Tự động hóa n8n Việt Nam",
    "Khóa học AI K12",
    "Giải pháp ISO AI",
    "Tối ưu vận hành doanh nghiệp",
    "AI Specialist Vietnam",
    "MCP Server Agent",
  ],
  authors: [{ name: "Nguyễn Đức Kiên" }],
  creator: "Nguyễn Đức Kiên",
  publisher: "Architect AI Studio",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Nguyễn Đức Kiên | Chuyên Gia AI & Tự động hóa",
    description: "Kiến tạo tương lai của doanh nghiệp thông qua hệ thống AI thông minh và quy trình vận hành tinh gọn.",
    url: "https://architect.ai",
    siteName: "Nguyễn Đức Kiên AI",
    locale: "vi_VN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nguyễn Đức Kiên | AI & Automation Expert",
    description: "Building the next generation of AI-driven enterprises.",
  },
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="vi"
      className={`${inter.variable} ${spaceGrotesk.variable} antialiased`}
    >
      <body className="min-h-screen overflow-x-hidden font-sans leading-relaxed text-text bg-bg selection:bg-primary/30 selection:text-white">
        {children}
        <Chatbot />
      </body>
    </html>
  );
}
