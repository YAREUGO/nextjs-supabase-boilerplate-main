import { SignedOut, SignInButton, SignedIn, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";
import { Button } from "@/components/ui/button";
import { Pyramid, Crown } from "lucide-react";

/**
 * 네비게이션 바 컴포넌트
 *
 * Clerk 컴포넌트 사용:
 * - SignInButton: 모달 방식의 로그인 버튼
 * - UserButton: 사용자 프로필 및 설정 버튼
 *
 * 주의: RootLayout의 ClerkProvider에 localization={koKR}이 설정되어 있으면
 * 모든 Clerk 컴포넌트가 자동으로 한국어로 표시됩니다.
 * 개별 컴포넌트에 localization prop을 전달할 필요는 없습니다.
 */
const Navbar = () => {
  return (
    <header className="flex justify-between items-center p-4 gap-4 h-16 max-w-7xl mx-auto bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950 dark:to-orange-950 border-b-2 border-amber-300 dark:border-amber-700 shadow-md">
      <Link
        href="/"
        className="text-2xl font-bold flex items-center gap-2 text-amber-900 dark:text-amber-200 hover:text-amber-700 dark:hover:text-amber-300 transition-colors"
      >
        <Pyramid className="w-6 h-6 text-amber-600 dark:text-amber-400" />
        <span className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
          SaaS Template
        </span>
      </Link>
      <div className="flex gap-4 items-center">
        <SignedOut>
          <SignInButton mode="modal">
            <Button className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white border-0 shadow-lg hover:shadow-xl transition-all">
              <Crown className="w-4 h-4 mr-2" />
              로그인
            </Button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </header>
  );
};

export default Navbar;
