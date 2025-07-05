"use client";
import { usePathname } from "next/navigation";

export default function Progress() {
  const step = Number(usePathname().split("/").pop()); // 1,2,3
  return (
    <ol className="flex justify-center gap-4 mb-8">
      {[1, 2, 3].map((n) => (
        <li
          key={n}
          className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold
            ${n <= step ? "bg-primary text-white" : "bg-slate-700 text-slate-300"}`}
        >
          {n}
        </li>
      ))}
    </ol>
  );
}
