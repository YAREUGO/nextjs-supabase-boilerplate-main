# Next.js 청크 로딩 에러 해결 가이드

## 에러 메시지

```
Failed to load chunk server/chunks/ssr/[root-of-the-server]__dde69759._.js
```

이 에러는 Next.js 15.5.6에서 Turbopack을 사용할 때 발생하는 일반적인 캐시 문제입니다.

## 빠른 해결 방법

### 1단계: 개발 서버 중지

현재 실행 중인 개발 서버를 완전히 종료하세요 (Ctrl+C).

### 2단계: 캐시 삭제

다음 명령어를 실행하여 캐시를 삭제하세요:

**Windows PowerShell:**
```powershell
# .next 폴더 삭제
Remove-Item -Recurse -Force .next

# node_modules/.cache 폴더 삭제 (있는 경우)
Remove-Item -Recurse -Force node_modules\.cache -ErrorAction SilentlyContinue
```

**또는 수동으로:**
1. 프로젝트 루트에서 `.next` 폴더 삭제
2. `node_modules/.cache` 폴더가 있으면 삭제

### 3단계: 개발 서버 재시작

```bash
pnpm dev
```

## 추가 해결 방법

### 방법 1: Turbopack 없이 실행 (임시 해결책)

Turbopack을 비활성화하고 일반 모드로 실행:

```bash
# package.json의 dev 스크립트를 임시로 수정
# "dev": "next dev" (--turbopack 제거)

# 또는 직접 실행
pnpm next dev
```

### 방법 2: node_modules 재설치

캐시 삭제 후에도 문제가 지속되면:

```bash
# node_modules 삭제
Remove-Item -Recurse -Force node_modules

# pnpm 캐시 정리 (선택사항)
pnpm store prune

# 의존성 재설치
pnpm install

# 개발 서버 재시작
pnpm dev
```

### 방법 3: Next.js 버전 확인

Next.js 15.5.6에서 알려진 이슈일 수 있습니다. 최신 버전으로 업데이트:

```bash
pnpm add next@latest react@latest react-dom@latest
```

## 예방 방법

### 1. 정기적인 캐시 정리

개발 중 주기적으로 `.next` 폴더를 삭제하세요:

```bash
# Windows PowerShell
Remove-Item -Recurse -Force .next
```

### 2. package.json에 캐시 정리 스크립트 추가

```json
{
  "scripts": {
    "dev": "next dev --turbopack",
    "dev:clean": "rm -rf .next && next dev",
    "clean": "rm -rf .next node_modules/.cache"
  }
}
```

Windows의 경우:

```json
{
  "scripts": {
    "dev": "next dev --turbopack",
    "dev:clean": "powershell -Command \"Remove-Item -Recurse -Force .next -ErrorAction SilentlyContinue; next dev\"",
    "clean": "powershell -Command \"Remove-Item -Recurse -Force .next,node_modules\\.cache -ErrorAction SilentlyContinue\""
  }
}
```

## 원인 분석

이 에러는 일반적으로 다음과 같은 이유로 발생합니다:

1. **빌드 캐시 불일치**: `.next` 폴더의 캐시가 손상되었거나 오래된 경우
2. **Turbopack 캐시 문제**: Turbopack의 내부 캐시가 잘못된 경우
3. **Hot Module Replacement (HMR) 문제**: 개발 중 파일 변경 시 HMR이 제대로 작동하지 않는 경우
4. **Next.js 버전 이슈**: 특정 Next.js 버전의 알려진 버그

## 추가 리소스

- [Next.js 공식 문서 - Troubleshooting](https://nextjs.org/docs/app/building-your-application/configuring/error-handling)
- [Next.js GitHub Issues](https://github.com/vercel/next.js/issues)

## 여전히 문제가 해결되지 않으면

1. 브라우저 캐시 삭제 (Ctrl+Shift+Delete)
2. 다른 브라우저에서 테스트
3. Next.js 버전을 다운그레이드하거나 업그레이드
4. Turbopack 없이 일반 모드로 실행

