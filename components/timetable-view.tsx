"use client"

import { useState, useRef, useEffect } from "react"
import { Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { stages, days, type Artist } from "@/data/timetable"
import { useFavorites } from "@/contexts/favorites-context"
import { useOfflineData } from "@/hooks/use-offline-data"
import { TabNav } from "./TabNav"
import { StickyHeader } from "./StickyHeader"

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

// Festival startmoment: woensdag 21:00
const FESTIVAL_START_DAY = "wednesday";
const FESTIVAL_START_TIME = "21:00";
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

export default function TimetableView({ onNavigateToLineup }: { onNavigateToLineup?: () => void }) {
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
    if (day === "wednesday") {
      // Woensdag start op 21:00 (0 minuten - startpunt van festival)
      dayStartMinutes[day] = 0;
    } else if (day === "thursday") {
      // Donderdag start op 00:00 (3 uur na woensdag 21:00 = 180 minuten)
      dayStartMinutes[day] = 180;
    } else if (day === "friday") {
      // Vrijdag start op 00:00 (27 uur na woensdag 21:00 = 1620 minuten)
      dayStartMinutes[day] = 1620;
    } else if (day === "saturday") {
      // Zaterdag start op 00:00 (51 uur na woensdag 21:00 = 3060 minuten)
      dayStartMinutes[day] = 3060;
    } else if (day === "sunday") {
      // Zondag start op 00:00 (75 uur na woensdag 21:00 = 4500 minuten)
      dayStartMinutes[day] = 4500;
    } else if (day === "monday") {
      // Maandag start op 00:00 (99 uur na woensdag 21:00 = 5940 minuten)
      dayStartMinutes[day] = 5940;
    }
  });

  // Scroll naar dag-tab
  function scrollToDay(day: string) {
    if (!scrollRef.current) return;
    
    const targetMinutes = dayStartMinutes[day] || 0;
    const px = targetMinutes * (HOUR_WIDTH / 60);
    scrollRef.current.scrollTo({ left: px, behavior: "smooth" });
  }

  // Detecteer actieve dag bij scrollen - wissel zodra dagstart zichtbaar is
  function handleScroll() {
    if (!scrollRef.current) return;
    const scrollLeft = scrollRef.current.scrollLeft;
    
    // Bereken de scroll positie in minuten sinds festival start
    const scrollMinutes = scrollLeft / (HOUR_WIDTH / 60);
    
    // Bepaal welke dag actief is gebaseerd op scroll positie
    let foundDay = dayOrder[0];
    
    // Loop door alle dagen om te vinden welke dag actief is
    for (let i = 0; i < dayOrder.length; i++) {
      const day = dayOrder[i];
      const dayStartMin = dayStartMinutes[day];
      
      // Als we voorbij het startpunt van deze dag zijn, update de actieve dag
      if (scrollMinutes >= dayStartMin) {
        foundDay = day;
      }
    }
    
    if (foundDay !== activeDay) {
      setActiveDay(foundDay);
    }
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
    <div className="h-screen flex flex-col bg-black text-white">
      <StickyHeader>
        <TabNav active="timetable" onTab={tab => { if (tab === "lineup") onNavigateToLineup?.(); }} />
        {/* Dag-tabs - horizontaal scrollbaar */}
        <div className="overflow-x-auto mb-2 hide-scrollbar">
          <div className="flex gap-2" style={{ minWidth: 'max-content', paddingBottom: '4px' }}>
            {dayOrder.map((day, index) => (
              <Button
                key={day}
                variant={activeDay === day ? "default" : "outline"}
                className={`px-4 py-2 rounded-full font-semibold transition-colors whitespace-nowrap flex-shrink-0 ${
                  activeDay === day 
                    ? "bg-pink-500 text-white" 
                    : "bg-gray-800 text-gray-200 hover:bg-gray-700 border border-gray-600"
                }`}
                onClick={() => scrollToDay(day)}
              >
                {day.charAt(0).toUpperCase() + day.slice(1)}
              </Button>
            ))}
          </div>
        </div>
      </StickyHeader>

      {/* Scrollbare content area */}
      <div className="flex-1 overflow-hidden">
        <div className="flex h-full">
          {/* Scrollbare tijdlijn */}
          <div className="flex-1 overflow-auto timetable-scrollbar" ref={scrollRef} onScroll={handleScroll}>
            {/* Sticky tijdlabels bovenaan */}
            <div className="sticky top-0 z-40 bg-black border-b border-gray-700">
              <div className="flex" style={{ width: timelineWidth }}>
                {hourLabels.map((h, i) => (
                  <div
                    key={h}
                    className="text-left text-gray-400 text-sm flex-shrink-0 py-2"
                    style={{ width: `${HOUR_WIDTH}px` }}
                  >
                    {(() => {
                      // Toon de tijd sinds festival start (woensdag 21:00)
                      // h = 0: 21:00 (festival start)
                      // h = 1: 22:00
                      // h = 3: 00:00 (donderdag)
                      // h = 4: 01:00 (donderdag)
                      
                      let displayHour;
                      if (h < 3) {
                        // Woensdag: 21:00 tot 23:00
                        displayHour = 21 + h;
                      } else {
                        // Andere dagen: 00:00 tot 23:00
                        displayHour = (h - 3) % 24;
                      }
                      
                      return `${displayHour.toString().padStart(2, "0")}:00`;
                    })()}
                  </div>
                ))}
              </div>
            </div>
            
            {/* Artiesten per stage */}
            <div className="flex flex-col" style={{ width: timelineWidth }}>
              {stages.map((stage) => (
                <div key={stage.id} className="relative" style={{ height: "80px", width: timelineWidth }}>
                  {/* Sticky stagenaam boven de artiestenrij */}
                  <div
                    className="text-xs font-semibold text-white px-2 py-1 rounded z-30 bg-black/90 border-b border-gray-700 sticky left-0"
                    style={{ 
                      backgroundColor: stage.color, 
                      width: '200px',
                      whiteSpace: 'nowrap',
                      height: '24px',
                      display: 'flex',
                      alignItems: 'center',
                      position: 'sticky',
                      left: 0,
                      zIndex: 30
                    }}
                  >
                    {stage.name}
                  </div>
                  {/* Artiesten tijdlijn */}
                  <div className="relative" style={{ height: "56px", width: timelineWidth, marginTop: "4px" }}>
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
    </div>
  )
}
