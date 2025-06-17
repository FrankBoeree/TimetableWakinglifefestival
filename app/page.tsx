"use client"

import { useState } from "react"
import { Mic, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import TimetableView from "@/components/timetable-view"
import LineupView from "@/components/lineup-view"

export default function Home() {
  const [activeView, setActiveView] = useState<"timetable" | "lineup">("timetable")

  return (
    <div className="min-h-screen bg-black text-white">
      <main className="pb-20">{activeView === "timetable" ? <TimetableView /> : <LineupView />}</main>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-black/90 backdrop-blur-sm border-t border-gray-800">
        <div className="flex justify-center items-center py-4 px-8">
          <div className="flex gap-4">
            <Button
              variant={activeView === "lineup" ? "default" : "secondary"}
              size="lg"
              className={`rounded-full px-8 py-6 ${
                activeView === "lineup"
                  ? "bg-pink-500 hover:bg-pink-600 text-white"
                  : "bg-gray-800 hover:bg-gray-700 text-gray-300"
              }`}
              onClick={() => setActiveView("lineup")}
            >
              <Mic className="w-5 h-5 mr-2" />
              Lineup
            </Button>
            <Button
              variant={activeView === "timetable" ? "default" : "secondary"}
              size="lg"
              className={`rounded-full px-8 py-6 ${
                activeView === "timetable"
                  ? "bg-pink-500 hover:bg-pink-600 text-white"
                  : "bg-gray-800 hover:bg-gray-700 text-gray-300"
              }`}
              onClick={() => setActiveView("timetable")}
            >
              <Calendar className="w-5 h-5 mr-2" />
              Timetable
            </Button>
          </div>
        </div>
        <div className="w-12 h-1 bg-white rounded-full mx-auto mb-2" />
      </div>
    </div>
  )
}
