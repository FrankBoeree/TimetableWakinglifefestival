"use client"

import { useState, useRef, useEffect } from "react"
import { Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { stages, days, type Artist } from "@/data/timetable"
import { useFavorites } from "@/contexts/favorites-context"
import { useOfflineData } from "@/hooks/use-offline-data"

function parseTime(time: string) {
  // "02:00" => 120
  if (!time || time === "--") return null
  const [h, m] = time.split(":").map(Number)
  return h * 60 + m
}
function formatTime(minutes: number) {
  const h = Math.floor(minutes / 60) % 24
  const m = minutes % 60
  return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`
}

// Festival startmoment: woensdag 17:00
const FESTIVAL_START_DAY = "wednesday";
const FESTIVAL_START_TIME = "17:00";
const HOUR_WIDTH = 240;

// Helper: dag naar index
const dayOrder = ["wednesday", "thursday", "friday", "saturday", "sunday", "monday"];
function getDayIndex(dayId: string) {
  return dayOrder.indexOf(dayId);
}

// Helper: tijd naar minuten
function timeToMinutes(time: string) {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
}

// Helper: bereken minuten sinds festivalstart
function getMinutesSinceFestivalStart(artist: Artist) {
  const startDayIdx = getDayIndex(FESTIVAL_START_DAY);
  const artistStartDayIdx = getDayIndex(artist.startDay!);
  const daysDiff = artistStartDayIdx - startDayIdx;
  const festivalStartMin = timeToMinutes(FESTIVAL_START_TIME);
  const artistStartMin = timeToMinutes(artist.startTime);
  return daysDiff * 24 * 60 + (artistStartMin - festivalStartMin);
}

function getArtistDuration(artist: Artist) {
  const startDayIdx = getDayIndex(artist.startDay!);
  const endDayIdx = getDayIndex(artist.endDay!);
  const daysDiff = endDayIdx - startDayIdx;
  const startMin = timeToMinutes(artist.startTime);
  const endMin = timeToMinutes(artist.endTime);
  return daysDiff * 24 * 60 + (endMin - startMin);
}

// Bepaal totale festivalduur in minuten
function getFestivalTotalMinutes(timetable: Artist[]) {
  let max = 0;
  for (const artist of timetable) {
    const start = getMinutesSinceFestivalStart(artist);
    const duration = getArtistDuration(artist);
    if (start + duration > max) max = start + duration;
  }
  // Rond af op hele uren
  return Math.ceil(max / 60) * 60;
}

export default function TimetableView() {
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const dayRefs = useRef<{ [key: string]: HTMLDivElement | null }>({})
  const { isFavorite, toggleFavorite } = useFavorites()
  const { data, isLoading, error } = useOfflineData()

  // Use offline data if available, fallback to static imports
  const timetable = data?.timetable || []
  const totalMinutes = getFestivalTotalMinutes(timetable);
  const totalHours = totalMinutes / 60;
  const timelineWidth = totalHours * HOUR_WIDTH;

  // Tijdlabels per uur
  const hourLabels = [];
  for (let h = 0; h <= totalHours; h++) {
    hourLabels.push(h);
  }

  // Dag-tab functionaliteit
  const [activeDay, setActiveDay] = useState(dayOrder[0])

  // Bepaal per dag het start-minuut in de tijdlijn
  const dayStartMinutes: Record<string, number> = {};
  dayOrder.forEach((day, idx) => {
    dayStartMinutes[day] = (idx === 0)
      ? timeToMinutes(FESTIVAL_START_TIME)
      : (idx * 24 * 60 + timeToMinutes(FESTIVAL_START_TIME));
  });

  // Scroll naar dag-tab
  function scrollToDay(day: string) {
    if (!scrollRef.current) return;
    const min = dayStartMinutes[day] - timeToMinutes(FESTIVAL_START_TIME);
    const px = min * (HOUR_WIDTH / 60);
    scrollRef.current.scrollTo({ left: px, behavior: "smooth" });
  }

  // Detecteer actieve dag bij scrollen
  function handleScroll() {
    if (!scrollRef.current) return;
    const scrollLeft = scrollRef.current.scrollLeft;
    let foundDay = dayOrder[0];
    for (let i = 0; i < dayOrder.length; i++) {
      const min = (i === 0)
        ? 0
        : (i * 24 * 60);
      const px = min * (HOUR_WIDTH / 60);
      if (scrollLeft >= px) {
        foundDay = dayOrder[i];
      }
    }
    setActiveDay(foundDay);
  }

  // Alle artiesten, eventueel gefilterd op favorieten
  const filteredTimetable = timetable.filter(
    (artist) => !showFavoritesOnly || isFavorite(artist.id)
  )

  const DAY_WIDTH = 24 * HOUR_WIDTH;

  // Helper: splits artiesten over dagen
  function getDayArtistBlocks(artists: Artist[], dayId: string) {
    const blocks: { artist: Artist, start: number, end: number }[] = [];
    for (const artist of artists) {
      const start = parseTime(artist.startTime);
      const end = parseTime(artist.endTime);
      if (start === null || end === null) continue;
      if (artist.startDay === dayId && artist.endDay === dayId) {
        // Normale set binnen één dag
        blocks.push({ artist, start, end });
      } else if (artist.startDay === dayId) {
        // Start op deze dag, loopt door na middernacht
        blocks.push({ artist, start, end: 24 * 60 });
      } else if (artist.endDay === dayId) {
        // Eindigt op deze dag, begon vorige dag
        blocks.push({ artist, start: 0, end });
      }
    }
    return blocks;
  }

  function getHourSlots() {
    const slots: string[] = [];
    for (let h = 0; h < 24; h++) {
      slots.push(`${h.toString().padStart(2, "0")}:00`);
    }
    return slots;
  }

  // Dynamisch tijdsbereik bepalen voor de actieve dag, rekening houdend met over-middernacht
  function getDayTimeRange(dayId: string) {
    const artists = timetable.filter((a) => a.startDay === dayId || a.endDay === dayId)
    let min = 24 * 60, max = 0
    for (const a of artists) {
      const start = parseTime(a.startTime)
      let end = parseTime(a.endTime)
      if (start !== null && end !== null && end < start) {
        end += 24 * 60 // over middernacht
      }
      if (start !== null && start < min) min = start
      if (end !== null && end > max) max = end
    }
    // fallback: 13:00-00:00
    if (min === 24 * 60) min = 13 * 60
    if (max === 0) max = 24 * 60
    return { min, max }
  }

  // Bereken de positie en breedte van een artiest binnen de dag-tijdlijn (t.o.v. earliest time), rekening houdend met over-middernacht
  function getArtistPositionInDay(artist: Artist, minTime: number) {
    const start = parseTime(artist.startTime)
    let end = parseTime(artist.endTime)
    if (start === null || end === null) return { left: 0, width: 0 }
    if (end < start) {
      end += 24 * 60 // over middernacht
    }
    const left = (start - minTime) * 4 // 4px per minuut = 240px per uur
    const width = (end - start) * 4
    return { left, width }
  }

  // Styling voor tabs
  const tabClass = (active: boolean) =>
    `px-4 py-2 rounded-full font-semibold transition-colors whitespace-nowrap ${
      active
        ? "bg-pink-500 text-white shadow-lg border-2 border-pink-300 scale-105"
        : "bg-gray-800 text-gray-200 hover:bg-gray-700 border border-gray-600"
    }`

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

  // Show fallback if no data
  if (!timetable || timetable.length === 0) {
    return (
      <div className="p-4">
        <h1 className="text-3xl font-bold mb-6">Timetable</h1>
        <div className="text-center py-12 text-gray-400">
          <p>Geen timetable data beschikbaar.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6">Timetable</h1>
      {/* Dag-tabs */}
      <div className="flex gap-2 mb-2" style={{zIndex: 9999, position: 'relative'}}>
        {dayOrder.map((day, index) => (
          <button
            key={day}
            style={{
              background: activeDay === day ? '#ec4899' : '#4b5563',
              color: 'white',
              padding: '12px 20px',
              borderRadius: '25px',
              fontWeight: 'bold',
              fontSize: '16px',
              border: activeDay === day ? '2px solid #f9a8d4' : '2px solid #6b7280',
              transition: 'all 0.2s',
              transform: activeDay === day ? 'scale(1.05)' : 'scale(1)',
              boxShadow: activeDay === day ? '0 4px 6px -1px rgba(0, 0, 0, 0.1)' : 'none',
              zIndex: 9999,
              position: 'relative',
              cursor: 'pointer'
            }}
            onClick={() => scrollToDay(day)}
            type="button"
          >
            {day.charAt(0).toUpperCase() + day.slice(1)}
          </button>
        ))}
      </div>
      <div className="flex">
        {/* Verwijderde linker sticky stagenamen kolom */}
        {/* Scrollbare tijdlijn */}
        <div className="overflow-x-auto" style={{ width: '100%' }} ref={scrollRef} onScroll={handleScroll}>
          {/* Tijdlabels */}
          <div className="flex mb-4" style={{ width: timelineWidth }}>
            <div className="w-0" /> {/* lege ruimte voor alignment met stagenamen, mag weg */}
            {hourLabels.map((h, i) => (
              <div
                key={h}
                className="text-left text-gray-400 text-sm flex-shrink-0"
                style={{ width: `${HOUR_WIDTH}px` }}
              >
                {(() => {
                  const totalMin = h * 60 + timeToMinutes(FESTIVAL_START_TIME);
                  const hour = (totalMin % (24 * 60)) / 60;
                  return `${hour.toString().padStart(2, "0")}:00`;
                })()}
              </div>
            ))}
          </div>
          {/* Artiesten per stage */}
          <div className="flex flex-col gap-4" style={{ width: timelineWidth }}>
            {stages.map((stage) => (
              <div key={stage.id} className="relative" style={{ height: "80px", width: timelineWidth }}>
                {/* Sticky stagenaam boven de artiestenrij */}
                <div
                  className="text-xs font-semibold text-white px-2 py-1 rounded z-10 bg-black/90 border-b border-gray-700 sticky left-0"
                  style={{ backgroundColor: stage.color, minWidth: 'fit-content', maxWidth: '200px', whiteSpace: 'nowrap', top: 0 }}
                >
                  {stage.name}
                </div>
                {/* Artiesten tijdlijn */}
                <div className="relative" style={{ height: "60px", width: timelineWidth, marginTop: 4 }}>
                  {timetable.filter((a) => a.stage === stage.id).map((artist) => {
                    const left = getMinutesSinceFestivalStart(artist) * (HOUR_WIDTH / 60);
                    const width = getArtistDuration(artist) * (HOUR_WIDTH / 60);
                    const isFav = isFavorite(artist.id);
                    return (
                      <div
                        key={artist.id}
                        className="absolute top-0 h-full bg-gray-800 rounded-lg border border-gray-600 hover:bg-gray-700 transition-colors cursor-pointer group"
                        style={{
                          left: `${left}px`,
                          width: `${width}px`,
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
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
