import type { Metadata } from "next";
import { DM_Sans, Space_Grotesk } from "next/font/google";
import "../styles/main.scss";

const dmSans = DM_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-serif",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Infinity Portfolio",
  description: "Senior Developer Portfolio inspired by Top Tiers",
};

/**
 * RootLayout — Minimal global shell.
 *
 * Responsibilities:
 * - Load Google Fonts (DM Sans + Space Grotesk) as CSS variables
 * - Import the SCSS design system via main.scss
 * - Render children (AppRouter handles all routing)
 *
 * No UI components here — navigation/sidebar are inside AppRouter.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${dmSans.variable} ${spaceGrotesk.variable}`} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
