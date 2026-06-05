import type { Metadata } from "next";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";

export const metadata: Metadata = {
  title: "Harsha Vardhan Dyavanapelli — AI/ML Engineer",
  description:
    "Portfolio of Harsha Vardhan Dyavanapelli — AI/ML Engineer specializing in intelligent systems, computer vision, NLP, and applied machine learning.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="font-body cursor-none">
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
