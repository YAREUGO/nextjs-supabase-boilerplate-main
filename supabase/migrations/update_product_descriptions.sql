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

-- 확인용 쿼리 (실행 후 결과 확인)
-- SELECT name, description, category FROM products WHERE category IN ('electronics', 'clothing') ORDER BY category, name;

