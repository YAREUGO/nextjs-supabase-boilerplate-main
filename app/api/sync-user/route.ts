import { auth, clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { getServiceRoleClient } from "@/lib/supabase/service-role";

/**
 * Clerk 사용자를 Supabase users 테이블에 동기화하는 API
 *
 * 클라이언트에서 로그인 후 이 API를 호출하여 사용자 정보를 Supabase에 저장합니다.
 * 이미 존재하는 경우 업데이트하고, 없으면 새로 생성합니다.
 */
export async function POST() {
  try {
    // 환경 변수 확인
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseServiceRoleKey) {
      console.error("Missing environment variables:", {
        hasUrl: !!supabaseUrl,
        hasServiceRoleKey: !!supabaseServiceRoleKey,
      });
      return NextResponse.json(
        {
          error: "Server configuration error",
          details: "Supabase environment variables are missing",
        },
        { status: 500 }
      );
    }

    // Clerk 인증 확인
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Clerk에서 사용자 정보 가져오기
    let clerkUser;
    try {
      const client = await clerkClient();
      clerkUser = await client.users.getUser(userId);
    } catch (clerkError) {
      console.error("Clerk API error:", clerkError);
      return NextResponse.json(
        {
          error: "Failed to fetch user from Clerk",
          details: clerkError instanceof Error ? clerkError.message : "Unknown error",
        },
        { status: 500 }
      );
    }

    if (!clerkUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Supabase에 사용자 정보 동기화
    let supabase;
    try {
      supabase = getServiceRoleClient();
    } catch (supabaseError) {
      console.error("Supabase client creation error:", supabaseError);
      return NextResponse.json(
        {
          error: "Failed to create Supabase client",
          details: supabaseError instanceof Error ? supabaseError.message : "Unknown error",
        },
        { status: 500 }
      );
    }

    const userData = {
      clerk_id: clerkUser.id,
      name:
        clerkUser.fullName ||
        clerkUser.username ||
        clerkUser.emailAddresses[0]?.emailAddress ||
        "Unknown",
    };

    const { data, error } = await supabase
      .from("users")
      .upsert(userData, {
        onConflict: "clerk_id",
      })
      .select()
      .single();

    if (error) {
      console.error("Supabase sync error:", {
        error,
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code,
        userData,
      });
      return NextResponse.json(
        {
          error: "Failed to sync user to Supabase",
          details: error.message,
          code: error.code,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      user: data,
    });
  } catch (error) {
    // 서버 사이드에서만 상세 로그 출력
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
    const errorStack = error instanceof Error ? error.stack : undefined;
    
    console.error("[sync-user] Unexpected error:", {
      error: errorMessage,
      stack: errorStack,
    });
    
    // 클라이언트에는 간단한 메시지만 반환 (보안상 상세 정보 노출 방지)
    return NextResponse.json(
      {
        error: "Internal server error",
        details: process.env.NODE_ENV === "development" ? errorMessage : "An error occurred while syncing user",
      },
      { status: 500 }
    );
  }
}
