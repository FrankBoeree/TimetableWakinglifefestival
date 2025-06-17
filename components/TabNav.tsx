import React from "react";

type TabNavProps = {
  active: "timetable" | "lineup";
  onTab: (tab: "timetable" | "lineup") => void;
};

export function TabNav({ active, onTab }: TabNavProps) {
  return (
    <div className="flex items-center gap-10 mb-4 relative z-50">
      <button
        onClick={() => onTab("lineup")}
        className={`text-2xl font-bold transition-colors cursor-pointer ${
          active === "lineup" ? "text-white" : "text-gray-400 hover:text-white"
        }`}
        type="button"
      >
        Lineup
      </button>
      <button
        onClick={() => onTab("timetable")}
        className={`text-2xl font-bold transition-colors cursor-pointer ${
          active === "timetable" ? "text-white" : "text-gray-400 hover:text-white"
        }`}
        type="button"
      >
        Timetable
      </button>
    </div>
  );
} 