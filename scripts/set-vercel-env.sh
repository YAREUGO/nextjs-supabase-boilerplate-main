#!/bin/bash

# Vercel 환경 변수 자동 설정 스크립트
# .env 파일의 환경 변수를 Vercel 프로젝트에 추가합니다

echo "🚀 Vercel 환경 변수 설정 시작..."

# .env 파일 경로
ENV_FILE=".env"

if [ ! -f "$ENV_FILE" ]; then
    echo "❌ .env 파일을 찾을 수 없습니다."
    exit 1
fi

# .env 파일 읽기 및 Vercel에 추가
COUNT=0

while IFS='=' read -r key value || [ -n "$key" ]; do
    # 주석과 빈 줄 건너뛰기
    [[ "$key" =~ ^#.*$ ]] && continue
    [[ -z "$key" ]] && continue
    
    # 앞뒤 공백 제거
    key=$(echo "$key" | xargs)
    value=$(echo "$value" | xargs)
    
    # 따옴표 제거
    value=$(echo "$value" | sed "s/^['\"]//; s/['\"]$//")
    
    if [ -n "$key" ] && [ -n "$value" ]; then
        echo ""
        echo "📝 설정 중: $key"
        
        # Vercel CLI로 환경 변수 추가
        # Production, Preview, Development 모두에 설정
        echo "$value" | npx vercel env add "$key" production preview development
        
        if [ $? -eq 0 ]; then
            echo "✅ $key 설정 완료"
            COUNT=$((COUNT + 1))
        else
            echo "⚠️  $key 설정 실패 (이미 존재할 수 있음)"
        fi
    fi
done < "$ENV_FILE"

echo ""
echo "🎉 완료! $COUNT 개의 환경 변수가 설정되었습니다."
echo ""
echo "💡 참고: 이미 존재하는 환경 변수는 업데이트되지 않습니다."
echo "   업데이트가 필요하면 Vercel 대시보드에서 수동으로 수정하세요."

