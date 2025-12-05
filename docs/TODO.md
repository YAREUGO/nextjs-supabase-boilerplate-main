# 쇼핑몰 MVP 개발 TODO

## Phase 1: 기본 인프라 (1주)

- [x] Next.js 프로젝트 셋업
  - [x] 프로젝트 초기화 확인
  - [x] TypeScript 설정 확인
  - [x] 기본 디렉토리 구조 확인
- [x] Supabase 프로젝트 생성 및 테이블 스키마 작성
  - [x] Supabase 프로젝트 생성
  - [x] `users` 테이블 생성 (Clerk 연동)
  - [x] `products` 테이블 생성
  - [x] `cart_items` 테이블 생성
  - [x] `orders` 테이블 생성
  - [x] `order_items` 테이블 생성
  - [x] 인덱스 생성 (성능 최적화)
  - [x] 트리거 함수 생성 (updated_at 자동 갱신)
- [x] Clerk 연동 (회원가입/로그인)
  - [x] Clerk 프로젝트 생성 및 설정
  - [x] Clerk Next.js SDK 설치 및 설정
  - [x] 로그인 페이지 구현 (모달 방식 - SignInButton 사용)
  - [x] 회원가입 페이지 구현 (모달 방식 - Clerk 컴포넌트 사용)
  - [x] 사용자 인증 상태 관리
  - [x] Supabase와 Clerk 사용자 동기화
- [x] 기본 레이아웃 및 라우팅
  - [x] 레이아웃 컴포넌트 생성
  - [x] 네비게이션 바 구현
  - [x] 기본 라우팅 설정
  - [x] 인증 보호 라우트 설정

## Phase 2: 상품 기능 (1주)

- [x] 홈페이지
  - [x] 홈페이지 레이아웃 디자인
  - [x] 인기 상품 섹션
  - [x] 카테고리별 상품 미리보기
  - [x] 반응형 디자인 적용
- [x] 상품 목록 페이지
  - [x] 상품 목록 페이지 생성
  - [x] Supabase에서 상품 데이터 조회
  - [x] 상품 카드 컴포넌트 구현
  - [ ] 페이지네이션 구현 (선택사항 - MVP에서는 제외)
  - [x] 로딩 상태 처리
  - [x] 에러 핸들링
- [x] 카테고리 필터링
  - [x] 카테고리 필터 UI 구현
  - [x] 카테고리별 상품 필터링 로직
  - [x] URL 쿼리 파라미터 연동
  - [x] 필터 상태 관리
- [x] 상품 상세 페이지
  - [x] 상품 상세 페이지 생성
  - [x] 상품 정보 표시 (이름, 설명, 가격, 재고)
  - [x] 상품 이미지 표시 (플레이스홀더)
  - [x] 장바구니 추가 버튼
  - [x] 수량 선택 기능
  - [x] 재고 확인 로직
- [x] 어드민 상품 등록 (Supabase 직접)
  - [x] Supabase 대시보드에서 상품 등록 가이드 문서 작성
  - [x] 샘플 데이터 확인

## Phase 3: 장바구니 & 주문 (1주)

- [x] 장바구니 기능 (추가/삭제/수량 변경)
  - [x] 장바구니 페이지 생성
  - [x] 장바구니 아이템 추가 API 구현 (Server Actions)
  - [x] 장바구니 아이템 조회 API 구현 (Server Actions)
  - [x] 장바구니 아이템 수량 변경 API 구현 (Server Actions)
  - [x] 장바구니 아이템 삭제 API 구현 (Server Actions)
  - [x] 장바구니 총 금액 계산
  - [x] 장바구니 UI 컴포넌트 구현
  - [x] 실시간 장바구니 상태 관리 (revalidatePath 사용)
- [x] 주문 프로세스 구현
  - [x] 주문 페이지 생성
  - [x] 배송지 정보 입력 폼
  - [x] 주문 요약 표시
  - [x] 주문 유효성 검증
  - [x] 주문 생성 API 구현 (Server Actions)
- [x] 주문 테이블 연동
  - [x] 주문 데이터 저장 로직
  - [x] 주문 상세 아이템 저장 로직
  - [x] 주문 후 장바구니 비우기
  - [x] 주문 확인 페이지

## Phase 4: 결제 통합 (1주)

- [x] Toss Payments MCP 연동
  - [x] Toss Payments SDK 설치 (@tosspayments/payment-widget-sdk)
  - [x] 결제 위젯 연동
  - [x] 테스트 모드 설정
- [x] 테스트 결제 구현
  - [x] 결제 페이지 생성
  - [x] 결제 요청 처리 (Toss Payments 위젯)
  - [x] 결제 승인 처리 (Server Action)
  - [x] 결제 실패 처리
  - [x] 결제 취소 처리
- [x] 결제 완료 후 주문 저장
  - [x] 결제 성공 시 주문 상태 업데이트 (pending → confirmed)
  - [x] 결제 성공 후 장바구니 비우기
  - [x] 주문 완료 페이지
  - [x] 결제 실패 시 주문 취소 처리

## Phase 5: 마이페이지 (0.5주)

- [x] 주문 내역 조회
  - [x] 마이페이지 생성
  - [x] 주문 목록 조회 API 구현 (이미 구현됨 - getOrders)
  - [x] 주문 목록 UI 구현
  - [x] 주문 상태 표시
  - [x] 날짜별 정렬 (created_at 기준 내림차순)
- [x] 주문 상세 보기
  - [x] 주문 상세 페이지 생성 (이미 구현됨 - app/orders/[id]/page.tsx)
  - [x] 주문 상세 정보 조회 API 구현 (이미 구현됨 - getOrderById)
  - [x] 주문 상세 UI 구현 (이미 구현됨 - OrderDetail 컴포넌트)
  - [x] 주문한 상품 목록 표시
  - [x] 배송지 정보 표시
  - [x] 결제 정보 표시

## Phase 6: 테스트 & 배포 (0.5주)

- [x] 전체 플로우 테스트
  - [x] 프로덕션 빌드 테스트 완료
  - [x] TypeScript 타입 오류 수정
  - [x] ESLint 경고 최소화
  - [x] 사용하지 않는 import 제거
  - [x] 수동 테스트 가이드 작성 (`docs/pre-deployment-test-guide.md`)
  - [x] 테스트 리포트 작성 (`docs/test-report.md`)
  - [x] 코드 레벨 기능 점검 완료
- [x] 버그 수정
  - [x] Suspense import 오류 수정 (React에서 import)
  - [x] Toss Payments SDK 타입 오류 수정
  - [x] 사용하지 않는 import 제거
  - [x] 에러 핸들링 개선
  - [x] 장바구니 추가 시 로그인 체크 개선 (클라이언트 사이드)
  - [x] 네트워크 오류 메시지 개선
  - [x] 주문 404 페이지 링크 수정
- [x] Vercel 배포 준비
  - [x] 환경 변수 검증 강화
  - [x] Vercel 설정 파일 확인 (`vercel.json`)
  - [x] 프로덕션 빌드 테스트 성공
  - [x] 배포 체크리스트 작성 (`docs/deployment-checklist.md`)
  - [x] Vercel 프로젝트 생성 및 배포 완료
