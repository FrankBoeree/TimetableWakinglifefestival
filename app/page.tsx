"use client"

import { useState } from "react"
import { Mic, Calendar, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import TimetableView from "@/components/timetable-view"
import LineupView from "@/components/lineup-view"
import { OfflineStatus } from "@/components/offline-status"
import { InstallPrompt } from "@/components/install-prompt"
import { useFavorites } from "@/contexts/favorites-context"

export default function Home() {
  const [activeView, setActiveView] = useState<"timetable" | "lineup">("timetable")
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false)

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Page Header - niet klikbaar */}
      <header className="sticky top-0 z-50 bg-black/90 backdrop-blur-sm border-b border-gray-800">
        <div className="px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white">
            {activeView === "timetable" ? "Timetable" : "Lineup"}
          </h1>
          
          {/* Show Favorites button - only visible in lineup view */}
          {activeView === "lineup" && (
            <Button
              variant={showFavoritesOnly ? "default" : "outline"}
              size="sm"
              className={`${
                showFavoritesOnly
                  ? "bg-yellow-500 hover:bg-yellow-600 text-black"
                  : "border-gray-600 text-gray-300 hover:bg-gray-800"
              }`}
              onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
            >
              <Star className={`w-4 h-4 mr-2 ${showFavoritesOnly ? "fill-current" : ""}`} />
              {showFavoritesOnly ? "Show All" : "Show Favorites"}
            </Button>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className={activeView === "timetable" ? "h-[calc(100vh-120px)]" : "pb-20"}>
        {activeView === "timetable" ? (
          <TimetableView />
        ) : (
          <LineupView showFavoritesOnly={showFavoritesOnly} setShowFavoritesOnly={setShowFavoritesOnly} />
        )}
      </main>

      {/* Bottom Navigation - altijd zichtbaar */}
      <div className="fixed bottom-0 left-0 right-0 bg-black/90 backdrop-blur-sm border-t border-gray-800">
        <div className="flex justify-center items-center py-2 px-4">
          <div className="flex gap-2">
            <Button
              variant={activeView === "timetable" ? "default" : "secondary"}
              size="lg"
              className={`rounded-full px-4 py-3 ${
                activeView === "timetable" 
                  ? "bg-pink-500 hover:bg-pink-600 text-white" 
                  : "bg-gray-800 hover:bg-gray-700 text-gray-300"
              }`}
              onClick={() => setActiveView("timetable")}
            >
              <Calendar className="w-4 h-4 mr-1" />
              Timetable
            </Button>
            <Button
              variant={activeView === "lineup" ? "default" : "secondary"}
              size="lg"
              className={`rounded-full px-4 py-3 ${
                activeView === "lineup" 
                  ? "bg-pink-500 hover:bg-pink-600 text-white" 
                  : "bg-gray-800 hover:bg-gray-700 text-gray-300"
              }`}
              onClick={() => setActiveView("lineup")}
            >
              <Mic className="w-4 h-4 mr-1" />
              Lineup
            </Button>
          </div>
        </div>
      </div>

      {/* Offline Status */}
      <OfflineStatus />
      
      {/* Install Prompt */}
      <InstallPrompt />
    </div>
  )
}
