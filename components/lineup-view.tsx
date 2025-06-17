"use client"

import { useState } from "react"
import { Search, Star } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { stages, days } from "@/data/timetable"
import { useFavorites } from "@/contexts/favorites-context"
import { useOfflineData } from "@/hooks/use-offline-data"

export default function LineupView() {
  const [activeDay, setActiveDay] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStage, setSelectedStage] = useState<string | null>(null)
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false)
  const { isFavorite, toggleFavorite } = useFavorites()
  const { data, isLoading, error } = useOfflineData()

  // Use offline data if available, fallback to static imports
  const timetable = data?.timetable || []

  const filteredArtists = timetable
    .filter((artist) => !activeDay || artist.day === activeDay)
    .filter((artist) =>
      artist.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((artist) => !showFavoritesOnly || isFavorite(artist.id))
    .sort((a, b) => a.name.localeCompare(b.name))

  const getStageColor = (stageId: string) => {
    const stage = stages.find((s) => s.id === stageId)
    return stage?.color || "#ec4899"
  }

  const getStageName = (stageId: string) => {
    const stage = stages.find((s) => s.id === stageId)
    return stage?.name || stageId
  }

  // Show loading state
  if (isLoading) {
    return (
      <div className="p-4">
        <h1 className="text-3xl font-bold mb-6">Lineup</h1>
        <div className="text-center py-12 text-gray-400">
          <p>Loading lineup...</p>
        </div>
      </div>
    )
  }

  // Show error state
  if (error) {
    return (
      <div className="p-4">
        <h1 className="text-3xl font-bold mb-6">Lineup</h1>
        <div className="text-center py-12 text-red-400">
          <p>Error loading lineup: {error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6">Lineup</h1>

      {/* Day Tabs + Favorites */}
      <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2">
        <div className="flex gap-2 min-w-max">
          <Button
            variant={activeDay === null ? "default" : "outline"}
            className={`px-4 py-2 rounded-full font-semibold transition-colors whitespace-nowrap ${activeDay === null ? "bg-pink-500 text-white" : "bg-gray-800 text-gray-200 hover:bg-gray-700 border border-gray-600"}`}
            onClick={() => setActiveDay(null)}
          >
            All
          </Button>
          {days.map((day) => (
            <Button
              key={day.id}
              variant={activeDay === day.id ? "default" : "outline"}
              className={`px-4 py-2 rounded-full font-semibold transition-colors whitespace-nowrap ${activeDay === day.id ? "bg-pink-500 text-white" : "bg-gray-800 text-gray-200 hover:bg-gray-700 border border-gray-600"}`}
              onClick={() => setActiveDay(day.id)}
            >
              {day.name}
            </Button>
          ))}
        </div>
        <Button
          variant={showFavoritesOnly ? "default" : "outline"}
          size="sm"
          className={`ml-2 ${
            showFavoritesOnly
              ? "bg-yellow-500 hover:bg-yellow-600 text-black"
              : "border-gray-600 text-gray-300 hover:bg-gray-800"
          }`}
          onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
        >
          <Star className={`w-4 h-4 mr-2 ${showFavoritesOnly ? "fill-current" : ""}`} />
          {showFavoritesOnly ? "Show All" : "Show Favorites"}
        </Button>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <Input
          placeholder="Search artists..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 bg-gray-900 border-gray-700 text-white placeholder-gray-400"
        />
      </div>

      {/* Artists List */}
      <div className="space-y-4">
        {filteredArtists.map((artist) => {
          const isFav = isFavorite(artist.id)
          const stage = stages.find((s) => s.id === artist.stage)
          const day = days.find((d) => d.id === artist.day)
          return (
            <div key={artist.id} className="flex items-center gap-4 p-4 bg-gray-900 rounded-lg transition-colors">
              <div className="w-16 h-16 bg-gray-700 rounded-lg flex-shrink-0 overflow-hidden">
                <img
                  src="/placeholder.svg?height=64&width=64"
                  alt={artist.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-lg text-white truncate">{artist.name}</h3>
                <p className="text-gray-400 text-sm">
                  {artist.startTime} - {artist.endTime} | {stage?.name}
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  {day?.name} {day?.date}
                </p>
              </div>

              <Button
                variant="ghost"
                size="icon"
                className="flex-shrink-0 hover:bg-gray-800"
                onClick={() => toggleFavorite(artist.id)}
              >
                <Star className={`w-6 h-6 ${isFav ? "text-yellow-400 fill-current" : "text-gray-400"}`} />
              </Button>
            </div>
          )
        })}
      </div>

      {filteredArtists.length === 0 && (
        <div className="text-center py-12 text-gray-400">
          <p>No artists found matching your search.</p>
        </div>
      )}
    </div>
  )
}
