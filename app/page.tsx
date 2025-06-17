"use client"

import { useState } from "react"
import { Mic, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import TimetableView from "@/components/timetable-view"
import LineupView from "@/components/lineup-view"
import { OfflineStatus } from "@/components/offline-status"
import { InstallPrompt } from "@/components/install-prompt"

export default function Home() {
  const [activeView, setActiveView] = useState<"timetable" | "lineup">("timetable")

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Festival Timetable PWA - Works Offline! */}
      <main className={activeView === "timetable" ? "h-screen" : "pb-20"}>
        {activeView === "timetable" ? (
          <TimetableView onNavigateToLineup={() => setActiveView("lineup")} />
        ) : (
          <LineupView onNavigateToTimetable={() => setActiveView("timetable")} />
        )}
      </main>

      {/* Bottom Navigation - alleen zichtbaar voor lineup view */}
      {activeView === "lineup" && (
        <div className="fixed bottom-0 left-0 right-0 bg-black/90 backdrop-blur-sm border-t border-gray-800">
          <div className="flex justify-center items-center py-4 px-8">
            <div className="flex gap-4">
              <Button
                variant="default"
                size="lg"
                className="rounded-full px-8 py-6 bg-pink-500 hover:bg-pink-600 text-white"
                onClick={() => setActiveView("lineup")}
              >
                <Mic className="w-5 h-5 mr-2" />
                Lineup
              </Button>
              <Button
                variant="secondary"
                size="lg"
                className="rounded-full px-8 py-6 bg-gray-800 hover:bg-gray-700 text-gray-300"
                onClick={() => setActiveView("timetable")}
              >
                <Calendar className="w-5 h-5 mr-2" />
                Timetable
              </Button>
            </div>
          </div>
          <div className="w-12 h-1 bg-white rounded-full mx-auto mb-2" />
        </div>
      )}

      {/* Offline Status */}
      <OfflineStatus />
      
      {/* Install Prompt */}
      <InstallPrompt />
    </div>
  )
}
