import type { Metadata } from "next";
import { Syne, DM_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const syne = Syne({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const dmSans = DM_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

export const metadata: Metadata = {
  title: "Harsha Vardhan — AI/ML Engineer",
  description:
    "Portfolio of Harsha Vardhan Dyavanapelli — Applied AI & Machine Learning systems builder. B.Tech CS (AI & ML) at VJIT Hyderabad.",
  keywords: [
    "AI Engineer",
    "Machine Learning",
    "Portfolio",
    "Harsha Vardhan",
    "Computer Vision",
    "NLP",
    "Deep Learning",
  ],
  openGraph: {
    title: "Harsha Vardhan — AI/ML Engineer",
    description:
      "Applied AI & Machine Learning systems builder. B.Tech CS (AI & ML).",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${dmSans.variable} ${jetbrainsMono.variable} antialiased`}
    >
      <body>{children}</body>
    </html>
  );
}
