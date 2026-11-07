import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Caveat, Instrument_Serif, Inter, Inter_Tight, JetBrains_Mono } from "next/font/google";
import { SvgSprite } from "@/components/Icons";
import { Toast } from "@/components/Toast";
import "./globals.css";

const interTight = Inter_Tight({ subsets: ["latin"], weight: ["500", "600", "700"], variable: "--ff-inter-tight" });
const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--ff-inter" });
const mono = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--ff-jetbrains-mono" });
const caveat = Caveat({ subsets: ["latin"], weight: ["500", "600"], variable: "--ff-caveat" });
const serif = Instrument_Serif({ subsets: ["latin"], weight: "400", style: "italic", variable: "--ff-instrument-serif" });

export const metadata: Metadata = {
  // TODO: set NEXT_PUBLIC_SITE_URL to the real domain before deploying
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: { default: "Code's Desktop", template: "%s · Code's Desktop" },
  description: "Stephen Ntale (Code): computer science student at KIU and founder building software for African SMEs.",
};

export const viewport: Viewport = { viewportFit: "cover", themeColor: "#F3F6FB" };

// set .calm / .compact before first paint so pinned stages never flash
const preflight = `(function(){var d=document.documentElement;if(matchMedia('(prefers-reduced-motion: reduce)').matches)d.classList.add('calm');if(innerWidth<860||innerHeight<560)d.classList.add('compact')})()`;

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${interTight.variable} ${inter.variable} ${mono.variable} ${caveat.variable} ${serif.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: preflight }} />
      </head>
      <body>
        <SvgSprite />
        {children}
        <Toast />
      </body>
    </html>
  );
}
