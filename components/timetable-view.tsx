"use client"

import { useState, useRef, useEffect } from "react"
import { Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { stages, days, type Artist } from "@/data/timetable"
import { useFavorites } from "@/contexts/favorites-context"
import { useOfflineData } from "@/hooks/use-offline-data"

export default function TimetableView() {
  const [activeDay, setActiveDay] = useState(days[0].id)
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const dayRefs = useRef<{ [key: string]: HTMLDivElement | null }>({})
  const { isFavorite, toggleFavorite } = useFavorites()
  const { data, isLoading, error } = useOfflineData()

  // Use offline data if available, fallback to static imports
  const timetable = data?.timetable || []

  // Alle artiesten, eventueel gefilterd op favorieten
  const filteredTimetable = timetable.filter(
    (artist) => !showFavoritesOnly || isFavorite(artist.id)
  )

  // Unieke tijdslots per dag bepalen
  const getTimeSlots = (dayId: string) => {
    const artists = timetable.filter((a) => a.day === dayId)
    const times = artists.flatMap((a) => [a.startTime, a.endTime])
    const unique = Array.from(new Set(times)).sort()
    return unique
  }

  // Genereer altijd de hele uren van 00:00 t/m 23:00
  const getHourSlots = () => {
    const slots = []
    for (let h = 0; h < 24; h++) {
      slots.push(`${h.toString().padStart(2, "0")}:00`)
    }
    return slots
  }

  // Bereken de positie en breedte van een artiest binnen de dag-tijdlijn (t.o.v. 00:00)
  const getArtistPositionInDay = (artist: Artist) => {
    const [startHour, startMinute] = artist.startTime.split(":").map(Number)
    const [endHour, endMinute] = artist.endTime.split(":").map(Number)
    const startTotalMinutes = startHour * 60 + startMinute
    let endTotalMinutes = endHour * 60 + endMinute
    if (endHour < startHour) {
      // Over middernacht
      endTotalMinutes += 24 * 60
    }
    const pixelsPerMinute = 200 / 60
    const left = startTotalMinutes * pixelsPerMinute
    const width = (endTotalMinutes - startTotalMinutes) * pixelsPerMinute
    return { left, width }
  }

  // Horizontaal scrollen naar dag-tab
  const scrollToDay = (dayId: string) => {
    const ref = dayRefs.current[dayId]
    if (ref && scrollRef.current) {
      scrollRef.current.scrollTo({
        left: ref.offsetLeft,
        behavior: "smooth",
      })
    }
  }

  // Scroll event handler voor automatische active tab
  useEffect(() => {
    const handleScroll = () => {
      if (!scrollRef.current) return
      const scrollLeft = scrollRef.current.scrollLeft
      let foundDay = days[0].id
      for (const day of days) {
        const ref = dayRefs.current[day.id]
        if (ref && ref.offsetLeft <= scrollLeft + 100) {
          foundDay = day.id
        }
      }
      setActiveDay(foundDay)
    }
    const el = scrollRef.current
    if (el) {
      el.addEventListener("scroll", handleScroll)
      return () => el.removeEventListener("scroll", handleScroll)
    }
  }, [])

  // Styling voor tabs
  const tabClass = (active: boolean) =>
    `px-4 py-2 rounded-full font-semibold transition-colors whitespace-nowrap ${
      active
        ? "bg-pink-500 text-white shadow-lg border-2 border-pink-300 scale-105"
        : "bg-gray-800 text-gray-200 hover:bg-gray-700 border border-gray-600"
    }`

  const getArtistPosition = (artist: Artist) => {
    // Parse start and end times
    const [startHour, startMinute] = artist.startTime.split(":").map(Number)
    const [endHour, endMinute] = artist.endTime.split(":").map(Number)

    // Convert start time to total minutes since 13:00
    const startTotalMinutes = (startHour - 13) * 60 + startMinute

    // Convert end time to total minutes since 13:00
    let endTotalMinutes
    if (endHour === 0) {
      // Past midnight (e.g., 00:30 = 24:30)
      endTotalMinutes = (24 - 13) * 60 + endMinute
    } else {
      endTotalMinutes = (endHour - 13) * 60 + endMinute
    }

    // Calculate position: 200px per hour = 200/60 = 3.33px per minute
    const pixelsPerMinute = 200 / 60
    const startPosition = startTotalMinutes * pixelsPerMinute
    const width = (endTotalMinutes - startTotalMinutes) * pixelsPerMinute

    return {
      left: Math.round(startPosition),
      width: Math.round(width),
    }
  }

  const getStageColor = (stageId: string) => {
    const stage = stages.find((s) => s.id === stageId)
    return stage?.color || "#ec4899"
  }

  // Show loading state
  if (isLoading) {
    return (
      <div className="p-4">
        <h1 className="text-3xl font-bold mb-6">Timetable</h1>
        <div className="text-center py-12 text-gray-400">
          <p>Loading timetable...</p>
        </div>
      </div>
    )
  }

  // Show error state
  if (error) {
    return (
      <div className="p-4">
        <h1 className="text-3xl font-bold mb-6">Timetable</h1>
        <div className="text-center py-12 text-red-400">
          <p>Error loading timetable: {error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6">Timetable</h1>

      {/* Sticky Scrollbare Day Tabs + Show Favorites */}
      <div className="sticky top-0 z-20 bg-black/90 pb-2 mb-6 flex items-center gap-2" style={{backdropFilter: 'blur(8px)'}}>
        <div className="overflow-x-auto flex-1">
          <div className="flex gap-2 min-w-max">
            {days.map((day) => (
              <button
                key={day.id}
                className={tabClass(activeDay === day.id)}
                onClick={() => scrollToDay(day.id)}
                type="button"
              >
                {day.name}
              </button>
            ))}
          </div>
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

      {/* Horizontale Timetable */}
      <div className="relative">
        <div className="overflow-x-auto" ref={scrollRef} style={{ scrollBehavior: "smooth" }}>
          <div className="flex min-w-max gap-16">
            {days.map((day) => {
              const dayArtists = filteredTimetable.filter((a) => a.day === day.id)
              if (dayArtists.length === 0) return null
              const hourSlots = getHourSlots()
              const dayWidth = 24 * 200
              return (
                <div
                  key={day.id}
                  ref={(el) => {
                    dayRefs.current[day.id] = el;
                  }}
                  className="flex flex-col min-w-[700px]"
                  style={{ width: dayWidth }}
                >
                  {/* Tijdlabels: altijd 00:00 t/m 23:00 */}
                  <div className="flex mb-4">
                    {hourSlots.map((time) => (
                      <div
                        key={time}
                        className="text-left text-gray-400 text-sm flex-shrink-0"
                        style={{ width: `200px` }}
                      >
                        {time}
                      </div>
                    ))}
                  </div>
                  {/* Stages en artiesten */}
                  <div className="space-y-4">
                    {stages.map((stage) => {
                      const stageArtists = dayArtists.filter((a) => a.stage === stage.id)
                      return (
                        <div key={stage.id} className="space-y-2">
                          {/* Stage naam */}
                          <div className="sticky left-0 z-10 w-32 flex-shrink-0">
                            <div
                              className="text-sm font-semibold text-white p-2 rounded"
                              style={{ backgroundColor: stage.color }}
                            >
                              {stage.name}
                            </div>
                          </div>
                          {/* Artiesten voor deze stage */}
                          <div className="relative" style={{ height: "60px" }}>
                            {stageArtists.map((artist) => {
                              const position = getArtistPosition(artist)
                              const isFav = isFavorite(artist.id)
                              return (
                                <div
                                  key={artist.id}
                                  className="absolute top-0 h-full bg-gray-800 rounded-lg border border-gray-600 hover:bg-gray-700 transition-colors cursor-pointer group"
                                  style={{
                                    left: `${position.left}px`,
                                    width: `${position.width}px`,
                                    minWidth: "60px",
                                  }}
                                  onClick={() => toggleFavorite(artist.id)}
                                >
                                  <div className="p-2 h-full flex flex-col justify-between">
                                    <div className="text-xs font-semibold text-white truncate">
                                      {artist.name}
                                    </div>
                                    <div className="text-xs text-gray-400">
                                      {artist.startTime} - {artist.endTime}
                                    </div>
                                    <div className="absolute top-1 right-1">
                                      <Star
                                        className={`w-3 h-3 ${
                                          isFav
                                            ? "text-yellow-400 fill-current"
                                            : "text-gray-400 group-hover:text-yellow-300"
                                        }`}
                                      />
                                    </div>
                                  </div>
                                </div>
                              )
                            })}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
