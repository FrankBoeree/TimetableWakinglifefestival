"use client"

import { useState, useEffect } from "react"
import { Mic, Calendar, Star, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import TimetableView from "@/components/timetable-view"
import LineupView from "@/components/lineup-view"
import { InstallPrompt } from "@/components/install-prompt"
import { useFavorites } from "@/contexts/favorites-context"
import { useOfflineData } from "@/hooks/use-offline-data"

export default function Home() {
  const [activeView, setActiveView] = useState<"timetable" | "lineup">("timetable")
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false)
  const { refreshData, isLoading } = useOfflineData()
  const [countdown, setCountdown] = useState<{
    days: number
    hours: number
    minutes: number
    seconds: number
    show: boolean
  }>({ days: 0, hours: 0, minutes: 0, seconds: 0, show: true })
  const [mounted, setMounted] = useState(false)

  const handleRefresh = async () => {
    await refreshData()
  }

  // Countdown to Wednesday 17:00
  useEffect(() => {
    const targetDate = new Date('2025-06-18T17:00:00')
    
    const updateCountdown = () => {
      const now = new Date()
      const difference = targetDate.getTime() - now.getTime()
      
      if (difference <= 0) {
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0, show: false })
        return
      }
      
      const days = Math.floor(difference / (1000 * 60 * 60 * 24))
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((difference % (1000 * 60)) / 1000)
      
      setCountdown({ days, hours, minutes, seconds, show: true })
    }
    
    updateCountdown()
    const interval = setInterval(updateCountdown, 1000)
    
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Countdown Banner */}
      {mounted && countdown.show && (
        <div className="bg-gradient-to-r from-pink-500 to-pink-600 text-white text-center py-3 px-4">
          <div className="flex items-center justify-center gap-4 text-sm font-medium">
            <span>🎵 Waking Life 2025 starts in:</span>
            <div className="flex gap-2">
              {countdown.days > 0 && (
                <span className="bg-pink-700 px-2 py-1 rounded">
                  {countdown.days}d
                </span>
              )}
              <span className="bg-pink-700 px-2 py-1 rounded">
                {countdown.hours.toString().padStart(2, '0')}h
              </span>
              <span className="bg-pink-700 px-2 py-1 rounded">
                {countdown.minutes.toString().padStart(2, '0')}m
              </span>
              <span className="bg-pink-700 px-2 py-1 rounded">
                {countdown.seconds.toString().padStart(2, '0')}s
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Page Header - not clickable */}
      <header className="sticky top-0 z-50 bg-black/90 backdrop-blur-sm border-b border-gray-800">
        <div className="px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white">
            {activeView === "timetable" ? "Timetable" : "Lineup"}
          </h1>
          
          <div className="flex items-center gap-3">
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
            
            {/* Refresh button - only visible in timetable view */}
            {activeView === "timetable" && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleRefresh}
                disabled={isLoading}
                className="text-gray-300 hover:bg-gray-800"
              >
                <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className={activeView === "timetable" ? "h-[calc(100vh-120px)]" : "pb-24"}>
        {activeView === "timetable" ? (
          <TimetableView />
        ) : (
          <LineupView showFavoritesOnly={showFavoritesOnly} setShowFavoritesOnly={setShowFavoritesOnly} />
        )}
      </main>

      {/* Bottom Navigation - always visible */}
      <div className="fixed bottom-0 left-0 right-0 bg-black/90 backdrop-blur-sm border-t border-gray-800">
        <div className="flex justify-center items-center py-4 px-4">
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
      
      {/* Install Prompt */}
      <InstallPrompt />
    </div>
  )
}
