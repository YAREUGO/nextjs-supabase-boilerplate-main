import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { koKR } from "@clerk/localizations";
import { Geist, Geist_Mono } from "next/font/google";

import Navbar from "@/components/Navbar";
import { SyncUserProvider } from "@/components/providers/sync-user-provider";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";

/**
 * Clerk 한국어 로컬라이제이션 설정
 *
 * 공식 문서: https://clerk.com/docs/guides/customizing-clerk/localization
 *
 * koKR은 @clerk/localizations 패키지에서 제공하는 한국어 번역입니다.
 * ClerkProvider에 localization prop을 전달하면 모든 Clerk 컴포넌트가
 * 자동으로 한국어로 표시됩니다.
 *
 * 지원되는 컴포넌트:
 * - SignIn, SignUp
 * - UserButton, UserProfile
 * - SignInButton, SignUpButton
 * - 기타 모든 Clerk 컴포넌트
 */

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SaaS 템플릿",
  description: "Next.js + Clerk + Supabase 보일러플레이트",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider localization={koKR}>
      <html lang="ko">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <SyncUserProvider>
            <Navbar />
            {children}
            <Toaster />
          </SyncUserProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
