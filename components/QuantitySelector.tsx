/**
 * @file components/QuantitySelector.tsx
 * @description 수량 선택 컴포넌트
 *
 * 상품 상세 페이지에서 수량을 선택하는 컴포넌트
 */

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Minus } from "lucide-react";

interface QuantitySelectorProps {
  min?: number;
  max: number;
  defaultValue?: number;
  onChange?: (quantity: number) => void;
  disabled?: boolean;
}

export function QuantitySelector({
  min = 1,
  max,
  defaultValue = 1,
  onChange,
  disabled = false,
}: QuantitySelectorProps) {
  const [quantity, setQuantity] = useState(defaultValue);

  const handleDecrease = () => {
    if (quantity > min) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      onChange?.(newQuantity);
    }
  };

  const handleIncrease = () => {
    if (quantity < max) {
      const newQuantity = quantity + 1;
      setQuantity(newQuantity);
      onChange?.(newQuantity);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || min;
    const clampedValue = Math.max(min, Math.min(max, value));
    setQuantity(clampedValue);
    onChange?.(clampedValue);
  };

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        size="icon"
        className="h-10 w-10"
        onClick={handleDecrease}
        disabled={disabled || quantity <= min}
      >
        <Minus className="w-4 h-4" />
      </Button>
      <Input
        type="number"
        min={min}
        max={max}
        value={quantity}
        onChange={handleInputChange}
        className="w-20 text-center"
        disabled={disabled}
      />
      <Button
        variant="outline"
        size="icon"
        className="h-10 w-10"
        onClick={handleIncrease}
        disabled={disabled || quantity >= max}
      >
        <Plus className="w-4 h-4" />
      </Button>
    </div>
  );
}


