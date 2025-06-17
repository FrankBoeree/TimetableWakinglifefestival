import React from "react";

export function StickyHeader({ children }: { children: React.ReactNode }) {
  return (
    <div className="sticky top-0 z-50 bg-black border-b border-gray-800">
      <div className="p-4 pb-2">{children}</div>
    </div>
  );
} 