"use client"

import { useState } from "react"
import { Search, Star } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { stages, days } from "@/data/timetable"
import { useFavorites } from "@/contexts/favorites-context"
import { useOfflineData } from "@/hooks/use-offline-data"

interface LineupViewProps {
  showFavoritesOnly: boolean
  setShowFavoritesOnly: (value: boolean) => void
}

export default function LineupView({ showFavoritesOnly, setShowFavoritesOnly }: LineupViewProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStage, setSelectedStage] = useState<string | null>(null)
  const { isFavorite, toggleFavorite } = useFavorites()
  const { data, isLoading, error } = useOfflineData()

  // Use offline data if available, fallback to static imports
  const timetable = data?.timetable || []

  const filteredArtists = timetable
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

  // Helper function to format date DD-MM-YYYY
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const day = date.getDate().toString().padStart(2, '0')
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const year = date.getFullYear()
    return `${day}-${month}-${year}`
  }

  // Helper function to get day info
  const getDayInfo = (artist: any) => {
    // Use startDay if available, otherwise fall back to day
    const dayId = artist.startDay || artist.day
    const day = days.find((d) => d.id === dayId)
    return day ? { name: day.name, date: formatDate(day.date) } : { name: 'Unknown', date: 'Unknown' }
  }

  // Show loading state
  if (isLoading) {
    return (
      <div className="p-4">
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
        <div className="text-center py-12 text-red-400">
          <p>Error loading lineup: {error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-4">
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

      {/* Artists Grid - using timetable-style cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredArtists.map((artist) => {
          const isFav = isFavorite(artist.id)
          const stage = stages.find((s) => s.id === artist.stage)
          const dayInfo = getDayInfo(artist)
          
          return (
            <div 
              key={artist.id} 
              className={`relative rounded-lg border transition-colors cursor-pointer group h-32 ${
                isFav
                  ? 'bg-yellow-400 border-yellow-500' 
                  : 'bg-gray-800 border-gray-600 hover:bg-gray-700'
              }`}
              onClick={() => toggleFavorite(artist.id)}
            >
              {/* Favorite button */}
              <div className="absolute top-2 right-2 z-10">
                <span
                  onClick={e => { e.stopPropagation(); toggleFavorite(artist.id); }}
                  className="inline-flex items-center justify-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill={isFav ? '#FFD700' : 'none'}
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke={isFav ? '#FFD700' : '#d1d5db'}
                    className={`w-5 h-5 ${isFav ? '' : 'text-gray-400'}`}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.75.75 0 0 1 1.04 0l2.347 2.382a.75.75 0 0 0 .564.22l3.247-.23a.75.75 0 0 1 .78.977l-.98 3.19a.75.75 0 0 0 .217.77l2.522 2.36a.75.75 0 0 1-.44 1.3l-3.25.23a.75.75 0 0 0-.564.22l-2.347 2.382a.75.75 0 0 1-1.04 0l-2.347-2.382a.75.75 0 0 0-.564-.22l-3.25-.23a.75.75 0 0 1-.44-1.3l2.522-2.36a.75.75 0 0 0 .217-.77l-.98-3.19a.75.75 0 0 1 .78-.977l3.247.23a.75.75 0 0 0 .564-.22l2.347-2.382z" />
                  </svg>
                </span>
              </div>

              {/* Content */}
              <div className="p-4 h-full flex flex-col justify-between">
                {/* Artist name */}
                <div className={`text-lg font-semibold truncate ${isFav ? 'text-black' : 'text-white'}`}>
                  {artist.name}
                </div>
                
                {/* Day and date */}
                <div className={`text-sm ${isFav ? 'text-black/80' : 'text-gray-400'}`}>
                  {dayInfo.date} • {artist.startTime} - {artist.endTime}
                </div>
                
                {/* Stage name */}
                <div className={`text-sm font-medium ${isFav ? 'text-black/80' : 'text-gray-300'} flex items-center gap-2`}>
                  <div 
                    className="w-3 h-3 rounded-full flex-shrink-0"
                    style={{ backgroundColor: stage?.color || "#ec4899" }}
                  />
                  {stage?.name || 'Unknown Stage'}
                </div>
              </div>
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
