# Clerk + Supabase 통합 예시 코드

이 문서는 [Clerk 공식 문서](https://clerk.com/docs/guides/development/integrations/databases/supabase)를 기반으로 작성된 Clerk와 Supabase 통합 예시 코드입니다.

## 개요

이 프로젝트는 2025년 4월 이후 권장되는 Clerk의 네이티브 Supabase 통합 방식을 사용합니다:
- ✅ JWT 템플릿 불필요
- ✅ Clerk 세션 토큰을 Supabase가 자동 검증
- ✅ `auth.jwt()->>'sub'`로 Clerk 사용자 ID 접근

## 클라이언트 사이드 예시 (Client Component)

```tsx
'use client'

import { useEffect, useState } from 'react'
import { useUser, useSession } from '@clerk/nextjs'
import { useClerkSupabaseClient } from '@/lib/supabase/clerk-client'

export default function TasksPage() {
  const [tasks, setTasks] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [name, setName] = useState('')
  
  // Clerk 사용자 정보
  const { user } = useUser()
  const { session } = useSession()
  
  // Clerk 토큰이 포함된 Supabase 클라이언트
  const supabase = useClerkSupabaseClient()

  // 사용자의 tasks 조회
  useEffect(() => {
    if (!user) return

    async function loadTasks() {
      setLoading(true)
      const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .order('created_at', { ascending: false })
      
      if (error) {
        console.error('Error loading tasks:', error)
      } else {
        setTasks(data || [])
      }
      setLoading(false)
    }

    loadTasks()
  }, [user, supabase])

  // 새 task 생성
  async function createTask(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    
    const { error } = await supabase
      .from('tasks')
      .insert({ name })
    
    if (error) {
      console.error('Error creating task:', error)
      alert('작업 생성 실패: ' + error.message)
    } else {
      setName('')
      // 페이지 새로고침하여 목록 업데이트
      window.location.reload()
    }
  }

  if (loading) {
    return <div>로딩 중...</div>
  }

  return (
    <div>
      <h1>내 작업 목록</h1>
      
      {tasks.length > 0 ? (
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>{task.name}</li>
          ))}
        </ul>
      ) : (
        <p>작업이 없습니다.</p>
      )}

      <form onSubmit={createTask}>
        <input
          type="text"
          placeholder="새 작업 입력"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit">추가</button>
      </form>
    </div>
  )
}
```

## 서버 사이드 예시 (Server Component)

```tsx
import { createClerkSupabaseClient } from '@/lib/supabase/server'
import AddTaskForm from './AddTaskForm'

export default async function TasksPage() {
  // 서버 사이드 Supabase 클라이언트
  const supabase = createClerkSupabaseClient()

  // 사용자의 tasks 조회
  const { data: tasks, error } = await supabase
    .from('tasks')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    throw error
  }

  return (
    <div>
      <h1>내 작업 목록</h1>
      
      {tasks && tasks.length > 0 ? (
        <ul>
          {tasks.map((task: any) => (
            <li key={task.id}>{task.name}</li>
          ))}
        </ul>
      ) : (
        <p>작업이 없습니다.</p>
      )}

      <AddTaskForm />
    </div>
  )
}
```

## Server Action 예시

```ts
'use server'

import { createClerkSupabaseClient } from '@/lib/supabase/server'

export async function addTask(name: string) {
  const supabase = createClerkSupabaseClient()

  try {
    const { data, error } = await supabase
      .from('tasks')
      .insert({ name })
      .select()
      .single()

    if (error) throw error

    return { success: true, task: data }
  } catch (error: any) {
    console.error('Error adding task:', error)
    return { success: false, error: error.message }
  }
}
```

## RLS 정책 예시

```sql
-- tasks 테이블 생성
CREATE TABLE tasks (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  user_id TEXT NOT NULL DEFAULT (auth.jwt()->>'sub'),
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- RLS 활성화
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;

-- SELECT 정책: 사용자는 자신의 tasks만 조회
CREATE POLICY "User can view their own tasks"
  ON tasks
  FOR SELECT
  TO authenticated
  USING (
    ((SELECT auth.jwt()->>'sub') = user_id::text)
  );

-- INSERT 정책: 사용자는 자신의 tasks만 생성
CREATE POLICY "Users must insert their own tasks"
  ON tasks
  AS PERMISSIVE
  FOR INSERT
  TO authenticated
  WITH CHECK (
    ((SELECT auth.jwt()->>'sub') = user_id::text)
  );

-- UPDATE 정책: 사용자는 자신의 tasks만 수정
CREATE POLICY "Users can update their own tasks"
  ON tasks
  FOR UPDATE
  TO authenticated
  USING (
    ((SELECT auth.jwt()->>'sub') = user_id::text)
  )
  WITH CHECK (
    ((SELECT auth.jwt()->>'sub') = user_id::text)
  );

-- DELETE 정책: 사용자는 자신의 tasks만 삭제
CREATE POLICY "Users can delete their own tasks"
  ON tasks
  FOR DELETE
  TO authenticated
  USING (
    ((SELECT auth.jwt()->>'sub') = user_id::text)
  );
```

## 주요 포인트

1. **클라이언트 사이드**: `useClerkSupabaseClient()` 훅 사용
2. **서버 사이드**: `createClerkSupabaseClient()` 함수 사용
3. **RLS 정책**: `auth.jwt()->>'sub'`로 Clerk 사용자 ID 확인
4. **자동 토큰 주입**: Clerk 세션 토큰이 자동으로 Supabase 요청에 포함됨

## 참고 자료

- [Clerk 공식 통합 가이드](https://clerk.com/docs/guides/development/integrations/databases/supabase)
- [Supabase RLS 문서](https://supabase.com/docs/guides/auth/row-level-security)
- [Supabase Third-Party Auth 문서](https://supabase.com/docs/guides/auth/third-party/overview)

