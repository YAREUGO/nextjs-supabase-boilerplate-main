# Clerk 한국어 로컬라이제이션 가이드

이 문서는 [Clerk 공식 로컬라이제이션 문서](https://clerk.com/docs/guides/customizing-clerk/localization)를 기반으로 작성되었습니다.

## 개요

프로젝트는 Clerk의 한국어 로컬라이제이션을 사용하여 모든 Clerk 컴포넌트를 한국어로 표시합니다.

## 설정 방법

### 1. 패키지 설치

`@clerk/localizations` 패키지가 이미 설치되어 있습니다:

```json
{
  "dependencies": {
    "@clerk/localizations": "^3.26.3"
  }
}
```

### 2. RootLayout에서 설정

`app/layout.tsx`에서 `koKR`을 import하여 `ClerkProvider`에 전달합니다:

```tsx
import { ClerkProvider } from "@clerk/nextjs";
import { koKR } from "@clerk/localizations";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider localization={koKR}>
      <html lang="ko">
        <body>{children}</body>
      </html>
    </ClerkProvider>
  );
}
```

### 3. 자동 적용

`ClerkProvider`에 `localization={koKR}`을 설정하면 모든 Clerk 컴포넌트가 자동으로 한국어로 표시됩니다:

- ✅ `SignIn` 컴포넌트
- ✅ `SignUp` 컴포넌트
- ✅ `UserButton` 컴포넌트
- ✅ `UserProfile` 컴포넌트
- ✅ `SignInButton` 컴포넌트
- ✅ `SignUpButton` 컴포넌트
- ✅ 모든 Clerk 컴포넌트

## 개별 컴포넌트에 적용 (선택사항)

개별 컴포넌트에도 명시적으로 localization을 전달할 수 있습니다:

```tsx
import { SignIn } from "@clerk/nextjs";
import { koKR } from "@clerk/localizations";

export default function SignInPage() {
  return <SignIn localization={koKR} />;
}
```

하지만 `ClerkProvider`에 이미 설정되어 있으면 개별 컴포넌트에 전달할 필요는 없습니다.

## 사용자 정의 로컬라이제이션

기본 한국어 번역을 수정하거나 추가할 수 있습니다:

```tsx
import { ClerkProvider } from "@clerk/nextjs";
import { koKR } from "@clerk/localizations";

// 기본 한국어 번역을 확장
const customKoKR = {
  ...koKR,
  signIn: {
    ...koKR.signIn,
    title: "환영합니다",
    subtitle: "계정에 로그인하여 계속하세요",
  },
  signUp: {
    ...koKR.signUp,
    title: "계정 만들기",
    subtitle: "새 계정을 만들어 시작하세요",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider localization={customKoKR}>
      <html lang="ko">
        <body>{children}</body>
      </html>
    </ClerkProvider>
  );
}
```

## 에러 메시지 커스터마이징

에러 메시지도 한국어로 커스터마이징할 수 있습니다:

```tsx
import { ClerkProvider } from "@clerk/nextjs";
import { koKR } from "@clerk/localizations";

const customKoKR = {
  ...koKR,
  unstable__errors: {
    ...koKR.unstable__errors,
    not_allowed_access:
      "접근이 허용되지 않은 이메일 도메인입니다. 접근을 원하시면 이메일로 문의해주세요.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider localization={customKoKR}>
      <html lang="ko">
        <body>{children}</body>
      </html>
    </ClerkProvider>
  );
}
```

## 지원되는 언어

Clerk는 다음 언어를 지원합니다 (일부):

- 한국어 (ko-KR): `koKR`
- 영어 (en-US): `enUS`
- 일본어 (ja-JP): `jaJP`
- 중국어 간체 (zh-CN): `zhCN`
- 중국어 번체 (zh-TW): `zhTW`
- 프랑스어 (fr-FR): `frFR`
- 독일어 (de-DE): `deDE`
- 스페인어 (es-ES): `esES`
- 기타 50개 이상의 언어

전체 목록은 [Clerk 공식 문서](https://clerk.com/docs/guides/customizing-clerk/localization#languages)를 참고하세요.

## 주의사항

> ⚠️ **중요**: 로컬라이제이션은 Clerk 컴포넌트의 텍스트만 변경합니다. 
> Clerk Account Portal (호스팅된 사용자 관리 페이지)는 여전히 영어로 표시됩니다.

## 참고 자료

- [Clerk 로컬라이제이션 공식 문서](https://clerk.com/docs/guides/customizing-clerk/localization)
- [@clerk/localizations 패키지](https://www.npmjs.com/package/@clerk/localizations)
- [Clerk 컴포넌트 개요](https://clerk.com/docs/components/overview)

