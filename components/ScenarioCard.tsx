"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ShoppingBag, ChevronRight } from "lucide-react";

interface ScenarioCardProps {
  title: string;
  description: string;
  products: string[];
  gradient: string;
  href?: string;
}

export function ScenarioCard({
  title,
  description,
  products,
  gradient,
  href = "/products",
}: ScenarioCardProps) {
  return (
    <div className="group relative w-[300px] h-[400px] rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 flex-shrink-0">
      {/* 배경 그라데이션 */}
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-90`}></div>
      
      {/* 플로팅 상품 아이콘 (배경) */}
      <div className="absolute inset-0 opacity-20">
        {products.slice(0, 3).map((product, index) => (
          <div
            key={index}
            className="absolute w-16 h-16 bg-white/30 rounded-full blur-xl"
            style={{
              top: `${20 + index * 30}%`,
              left: `${10 + index * 25}%`,
            }}
          ></div>
        ))}
      </div>

      {/* 콘텐츠 */}
      <div className="relative h-full flex flex-col justify-between p-6 text-white">
        <div>
          <h3 className="text-2xl font-bold mb-2">{title}</h3>
          <p className="text-white/90 mb-4">{description}</p>
          <div className="flex flex-wrap gap-2">
            {products.map((product, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm"
              >
                {product}
              </span>
            ))}
          </div>
        </div>

        <Link href={href} className="w-full">
          <Button className="w-full bg-white text-slate-900 hover:bg-slate-100">
            <ShoppingBag className="w-4 h-4 mr-2" />
            이 루틴 담기
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </Link>
      </div>
    </div>
  );
}

