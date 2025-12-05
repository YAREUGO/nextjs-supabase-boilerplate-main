# 상품 설명 업데이트 가이드

이 가이드는 Supabase 데이터베이스에서 상품 설명(description)을 새로운 카피로 업데이트하는 방법을 안내합니다.

## 📋 준비사항

1. Supabase 프로젝트에 접근 권한이 있어야 합니다
2. SQL Editor 사용 권한이 있어야 합니다

## 🚀 실행 방법

### 방법 1: SQL Editor에서 직접 실행 (추천)

1. **Supabase 대시보드 접속**
   - [Supabase 대시보드](https://app.supabase.com)에 로그인
   - 프로젝트 선택

2. **SQL Editor 열기**
   - 왼쪽 메뉴에서 **SQL Editor** 클릭
   - **New query** 버튼 클릭

3. **SQL 쿼리 복사 & 붙여넣기**
   - 아래 SQL 쿼리를 복사
   - SQL Editor에 붙여넣기

4. **실행**
   - **Run** 버튼 클릭 (또는 `Ctrl + Enter`)
   - 실행 완료 메시지 확인

### 방법 2: 파일에서 직접 실행

1. `supabase/migrations/update_product_descriptions.sql` 파일 열기
2. 전체 내용 복사
3. Supabase SQL Editor에 붙여넣기
4. **Run** 버튼 클릭

## 📝 실행할 SQL 쿼리

```sql
-- ==========================================
-- 상품 설명 업데이트 (새로운 카피 적용)
-- "상황 + 감정" 형식으로 변경
-- ==========================================

-- 전자제품 카피 업데이트
UPDATE products 
SET description = '출퇴근길에 매일 쓰는, 케이블 없이 자유롭게'
WHERE name = '무선 블루투스 이어폰';

UPDATE products 
SET description = '헬스장·출근·산책까지 하루 종일 같이 다니는 시계'
WHERE name = '스마트워치 프로';

UPDATE products 
SET description = '배터리 10%에서 멘붕 오는 사람 필수템'
WHERE name = '휴대용 보조배터리 20000mAh';

UPDATE products 
SET description = '회의실에서도 깔끔하게, 케이블 없이 자유롭게'
WHERE name = '무선 마우스';

UPDATE products 
SET description = '노트북 하나로 모든 걸 연결하는, 출장 필수템'
WHERE name = 'USB-C 멀티 허브';

-- 의류 카피 업데이트
UPDATE products 
SET description = '세탁기 돌려도 자주 찾게 되는 그 티셔츠'
WHERE name = '면 100% 기본 티셔츠';

UPDATE products 
SET description = '바쁘면 그냥 이거부터 집게 되는 아우터'
WHERE name = '후드 집업 자켓';

UPDATE products 
SET description = '하루 종일 편한, 출근용 기본 슬랙스'
WHERE name = '청바지 슬림핏';

UPDATE products 
SET description = '요가·헬스·산책 어디에 입어도 편한 레깅스'
WHERE name = '운동용 레깅스';
```

## ✅ 실행 후 확인

SQL 실행 후, 아래 쿼리로 결과를 확인할 수 있습니다:

```sql
SELECT name, description, category 
FROM products 
WHERE category IN ('electronics', 'clothing') 
ORDER BY category, name;
```

## 🔄 다른 상품 설명 업데이트하기

새로운 상품을 추가하거나 기존 상품의 설명을 변경하려면:

```sql
UPDATE products 
SET description = '새로운 카피 내용'
WHERE name = '상품명';
```

## ⚠️ 주의사항

1. **WHERE 절 확인**: 상품명이 정확히 일치해야 합니다
2. **백업**: 중요한 데이터는 실행 전 백업을 권장합니다
3. **테스트**: 먼저 SELECT 쿼리로 대상 상품을 확인한 후 UPDATE를 실행하세요

## 📚 관련 문서

- [Supabase SQL Editor 가이드](https://supabase.com/docs/guides/database/overview)
- [상품 카피 가이드](./copy-improvements.md)

