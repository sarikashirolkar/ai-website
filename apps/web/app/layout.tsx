import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Workflow Automate",
  description: "AI automation platform starter"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
