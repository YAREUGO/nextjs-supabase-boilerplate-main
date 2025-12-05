"use client";

import { useEffect, useState } from "react";
import { Clock } from "lucide-react";

interface TimeSlot {
  time: string;
  label: string;
  gradient: string;
}

const timeSlots: TimeSlot[] = [
  { time: "5", label: "새벽", gradient: "from-indigo-900 via-purple-900 to-pink-900" },
  { time: "7", label: "아침", gradient: "from-orange-200 via-yellow-200 to-amber-200" },
  { time: "9", label: "오전", gradient: "from-blue-400 via-cyan-400 to-teal-400" },
  { time: "12", label: "점심", gradient: "from-blue-400 via-cyan-400 to-teal-400" },
  { time: "15", label: "오후", gradient: "from-blue-400 via-cyan-400 to-teal-400" },
  { time: "18", label: "저녁", gradient: "from-purple-500 via-pink-500 to-orange-500" },
  { time: "21", label: "밤", gradient: "from-slate-800 via-slate-900 to-indigo-900" },
];

export function LifeMapTimeline({ 
  selectedTime, 
  onTimeSelect 
}: { 
  selectedTime: string;
  onTimeSelect: (time: string) => void;
}) {
  const [currentHour, setCurrentHour] = useState<string>("");

  useEffect(() => {
    const hour = new Date().getHours().toString();
    setCurrentHour(hour);
    // 현재 시간에 가장 가까운 시간대 선택
    const closestTime = timeSlots.reduce((prev, curr) => {
      const prevDiff = Math.abs(parseInt(prev.time) - parseInt(hour));
      const currDiff = Math.abs(parseInt(curr.time) - parseInt(hour));
      return currDiff < prevDiff ? curr : prev;
    });
    onTimeSelect(closestTime.time);
  }, [onTimeSelect]);

  return (
    <div className="fixed left-0 top-0 h-screen w-[30%] bg-gradient-to-b from-indigo-900 via-blue-500 to-slate-900 p-8 flex flex-col items-center justify-center z-10">
      <div className="text-white mb-8 text-center">
        <Clock className="w-8 h-8 mx-auto mb-2" />
        <p className="text-sm opacity-80">현재 시간</p>
        <p className="text-2xl font-bold">{currentHour}시</p>
      </div>

      <div className="relative w-full flex flex-col gap-4">
        {timeSlots.map((slot, index) => {
          const isSelected = selectedTime === slot.time;
          const isCurrent = currentHour === slot.time;
          
          return (
            <button
              key={slot.time}
              onClick={() => onTimeSelect(slot.time)}
              className={`relative flex items-center gap-4 p-4 rounded-lg transition-all duration-300 ${
                isSelected
                  ? "bg-white/20 backdrop-blur-sm scale-105 shadow-lg"
                  : "bg-white/5 hover:bg-white/10"
              }`}
            >
              {/* 타임라인 라인 */}
              {index < timeSlots.length - 1 && (
                <div className="absolute left-8 top-full w-0.5 h-8 bg-white/20"></div>
              )}
              
              {/* 시간 마커 */}
              <div
                className={`w-4 h-4 rounded-full border-2 border-white transition-all ${
                  isSelected || isCurrent
                    ? "bg-white scale-125 animate-pulse"
                    : "bg-transparent"
                }`}
              ></div>
              
              {/* 시간 정보 */}
              <div className="flex-1 text-left">
                <p className="text-white font-bold">{slot.time}시</p>
                <p className="text-white/70 text-sm">{slot.label}</p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

