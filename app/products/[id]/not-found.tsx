import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Package } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-amber-50 via-orange-50 to-yellow-50 dark:from-gray-900 dark:via-amber-950 dark:to-orange-950 py-16">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <Package className="w-24 h-24 text-amber-400 dark:text-amber-600 mx-auto mb-6" />
        <h1 className="text-4xl font-bold text-amber-900 dark:text-amber-200 mb-4">
          상품을 찾을 수 없습니다
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
          요청하신 상품이 존재하지 않거나 삭제되었습니다.
        </p>
        <Link href="/products">
          <Button className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white">
            <ArrowLeft className="w-4 h-4 mr-2" />
            상품 목록으로 돌아가기
          </Button>
        </Link>
      </div>
    </main>
  );
}


