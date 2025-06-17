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

// Helper: bereken huidige tijd positie in de tijdlijn
function getCurrentTimePosition() {
  // For testing: add 2 days
  const testOffset = 2 * 24 * 60 * 60 * 1000
  const now = new Date(Date.now() + testOffset)
  
  const currentDay = now.getDay(); // 0 = zondag, 1 = maandag, etc.
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();
  
  // Map JavaScript day naar onze dayOrder
  const dayMap: { [key: number]: string } = {
    0: "sunday",    // zondag
    1: "monday",    // maandag
    2: "tuesday",   // dinsdag
    3: "wednesday", // woensdag
    4: "thursday",  // donderdag
    5: "friday",    // vrijdag
    6: "saturday"   // zaterdag
  };
  
  const currentDayId = dayMap[currentDay];
  if (!currentDayId) return null;
  
  // Bereken minuten sinds festival start
  const startDayIdx = getDayIndex(FESTIVAL_START_DAY);
  const currentDayIdx = getDayIndex(currentDayId);
  const daysDiff = currentDayIdx - startDayIdx;
  const festivalStartMin = timeToMinutes(FESTIVAL_START_TIME);
  const currentTimeMin = currentHour * 60 + currentMinute;
  
  // Als we voor het festival start zijn, return null
  if (daysDiff < 0 || (daysDiff === 0 && currentTimeMin < festivalStartMin)) {
    return null;
  }
  
  return daysDiff * 24 * 60 + (currentTimeMin - festivalStartMin);
}

export default function TimetableView() {
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const dayRefs = useRef<{ [key: string]: HTMLDivElement | null }>({})
  const { isFavorite, toggleFavorite } = useFavorites()
  const { data, isLoading, error } = useOfflineData()
  const [currentTimePosition, setCurrentTimePosition] = useState<number | null>(null)

  // Update current time position every minute
  useEffect(() => {
    const updateTime = () => {
      const newPosition = getCurrentTimePosition();
      setCurrentTimePosition(newPosition);
    };
    
    updateTime(); // Initial update
    const interval = setInterval(updateTime, 60000); // Update every minute
    
    return () => clearInterval(interval);
  }, []);

  // Auto-scroll to current time when component mounts or current time changes
  useEffect(() => {
    if (currentTimePosition !== null && scrollRef.current) {
      // Add a longer delay to ensure DOM is fully rendered and timeline width is calculated
      const timeoutId = setTimeout(() => {
        if (scrollRef.current) {
          const scrollPosition = currentTimePosition * (HOUR_WIDTH / 60);
          // Scroll to current time with some offset to center it in viewport
          const viewportWidth = scrollRef.current.clientWidth;
          const targetScrollLeft = scrollPosition - (viewportWidth / 2);
          
          console.log('Scrolling to current time:', {
            currentTimePosition,
            scrollPosition,
            viewportWidth,
            targetScrollLeft
          });
          
          scrollRef.current.scrollTo({ 
            left: Math.max(0, targetScrollLeft), 
            behavior: "smooth" 
          });
        }
      }, 500); // 500ms delay
      
      return () => clearTimeout(timeoutId);
    }
  }, [currentTimePosition]);

  // Additional effect to handle initial scroll after data loads
  useEffect(() => {
    if (!isLoading && currentTimePosition !== null && scrollRef.current) {
      const timeoutId = setTimeout(() => {
        if (scrollRef.current) {
          const scrollPosition = currentTimePosition * (HOUR_WIDTH / 60);
          const viewportWidth = scrollRef.current.clientWidth;
          const targetScrollLeft = scrollPosition - (viewportWidth / 2);
          
          console.log('Initial scroll after data load:', {
            currentTimePosition,
            scrollPosition,
            viewportWidth,
            targetScrollLeft
          });
          
          scrollRef.current.scrollTo({ 
            left: Math.max(0, targetScrollLeft), 
            behavior: "smooth" 
          });
        }
      }, 1000); // 1 second delay for initial load
      
      return () => clearTimeout(timeoutId);
    }
  }, [isLoading, currentTimePosition]);

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

  // Determine start minute per day in the timeline
  const dayStartMinutes: Record<string, number> = {};
  dayOrder.forEach((day, idx) => {
    if (day === "wednesday") {
      // Wednesday starts at 21:00 (0 minutes - festival start point)
      dayStartMinutes[day] = 0;
    } else if (day === "thursday") {
      // Thursday starts at 00:00 (3 hours after Wednesday 21:00 = 180 minutes)
      dayStartMinutes[day] = 180;
    } else if (day === "friday") {
      // Friday starts at 00:00 (27 hours after Wednesday 21:00 = 1620 minutes)
      dayStartMinutes[day] = 1620;
    } else if (day === "saturday") {
      // Saturday starts at 00:00 (51 hours after Wednesday 21:00 = 3060 minutes)
      dayStartMinutes[day] = 3060;
    } else if (day === "sunday") {
      // Sunday starts at 00:00 (75 hours after Wednesday 21:00 = 4500 minutes)
      dayStartMinutes[day] = 4500;
    } else if (day === "monday") {
      // Monday starts at 00:00 (99 hours after Wednesday 21:00 = 5940 minutes)
      dayStartMinutes[day] = 5940;
    }
  });

  // Scroll to day tab
  function scrollToDay(day: string) {
    if (!scrollRef.current) return;
    
    const targetMinutes = dayStartMinutes[day] || 0;
    const px = targetMinutes * (HOUR_WIDTH / 60);
    scrollRef.current.scrollTo({ left: px, behavior: "smooth" });
  }

  // Detect active day when scrolling - switch as soon as day start is visible
  function handleScroll() {
    if (!scrollRef.current) return;
    const scrollLeft = scrollRef.current.scrollLeft;
    
    // Calculate scroll position in minutes since festival start
    const scrollMinutes = scrollLeft / (HOUR_WIDTH / 60);
    
    // Determine which day is active based on scroll position
    let foundDay = dayOrder[0];
    
    // Loop through all days to find which day is active
    for (let i = 0; i < dayOrder.length; i++) {
      const day = dayOrder[i];
      const dayStartMin = dayStartMinutes[day];
      
      // If we're past the start point of this day, update the active day
      if (scrollMinutes >= dayStartMin) {
        foundDay = day;
      }
    }
    
    if (foundDay !== activeDay) {
      setActiveDay(foundDay);
    }
  }

  // All artists, optionally filtered by favorites
  const filteredTimetable = timetable.filter(
    (artist) => !showFavoritesOnly || isFavorite(artist.id)
  )

  const DAY_WIDTH = 24 * HOUR_WIDTH;

  // Helper: split artists across days
  function getDayArtistBlocks(artists: Artist[], dayId: string) {
    const blocks: { artist: Artist, start: number, end: number }[] = [];
    for (const artist of artists) {
      const start = parseTime(artist.startTime);
      const end = parseTime(artist.endTime);
      if (start === null || end === null) continue;
      if (artist.startDay === dayId && artist.endDay === dayId) {
        // Normal set within one day
        blocks.push({ artist, start, end });
      } else if (artist.startDay === dayId) {
        // Starts on this day, continues after midnight
        blocks.push({ artist, start, end: 24 * 60 });
      } else if (artist.endDay === dayId) {
        // Ends on this day, started previous day
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

  // Dynamically determine time range for the active day, considering over-midnight
  function getDayTimeRange(dayId: string) {
    const artists = timetable.filter((a) => a.startDay === dayId || a.endDay === dayId)
    let min = 24 * 60, max = 0
    for (const a of artists) {
      const start = parseTime(a.startTime)
      let end = parseTime(a.endTime)
      if (start !== null && end !== null && end < start) {
        end += 24 * 60 // over midnight
      }
      if (start !== null && start < min) min = start
      if (end !== null && end > max) max = end
    }
    // fallback: 13:00-00:00
    if (min === 24 * 60) min = 13 * 60
    if (max === 0) max = 24 * 60
    return { min, max }
  }

  // Calculate the position and width of an artist within the day timeline (relative to earliest time), considering over-midnight
  function getArtistPositionInDay(artist: Artist, minTime: number) {
    const start = parseTime(artist.startTime)
    let end = parseTime(artist.endTime)
    if (start === null || end === null) return { left: 0, width: 0 }
    if (end < start) {
      end += 24 * 60 // over midnight
    }
    const left = (start - minTime) * 4 // 4px per minute = 240px per hour
    const width = (end - start) * 4
    return { left, width }
  }

  // Styling for tabs
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
      <div className="text-center py-12 text-gray-400">
        <p>Loading timetable...</p>
      </div>
    )
  }

  // Show error state
  if (error) {
    return (
      <div className="text-center py-12 text-red-400">
        <p>Error loading timetable: {error}</p>
      </div>
    )
  }

  // Show fallback if no data
  if (!timetable || timetable.length === 0) {
    return (
      <div className="text-center py-12 text-gray-400">
        <p>No timetable data available.</p>
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col bg-black text-white">
      {/* Day tabs - horizontally scrollable */}
      <div className="overflow-x-auto mb-2 hide-scrollbar bg-black/90 backdrop-blur-sm border-b border-gray-800">
        <div className="flex gap-2 px-4 py-3" style={{ minWidth: 'max-content' }}>
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

      {/* Scrollable content area */}
      <div className="flex-1 overflow-hidden">
        <div className="flex h-full">
          {/* Scrollable timeline */}
          <div className="flex-1 overflow-auto timetable-scrollbar" ref={scrollRef} onScroll={handleScroll}>
            {/* Sticky time labels above */}
            <div className="sticky top-0 z-40 bg-black border-b border-gray-700">
              <div className="flex relative" style={{ width: timelineWidth }}>
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
                
                {/* Now indicator - red vertical line */}
                {currentTimePosition !== null && (
                  <div
                    className="absolute top-0 z-50 pointer-events-none"
                    style={{
                      left: `${currentTimePosition * (HOUR_WIDTH / 60)}px`,
                      height: '100vh',
                    }}
                  >
                    {/* Red line */}
                    <div className="w-0.5 bg-red-500 h-full shadow-lg shadow-red-500/50"></div>
                    
                    {/* "Now" label - centered on the line */}
                    <div className="absolute top-2 transform -translate-x-1/2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded shadow-lg">
                      NOW
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {/* Artists per stage */}
            <div className="flex flex-col relative" style={{ width: timelineWidth }}>
              {/* Now indicator for artists section */}
              {currentTimePosition !== null && (
                <div
                  className="absolute top-0 z-50 pointer-events-none"
                  style={{
                    left: `${currentTimePosition * (HOUR_WIDTH / 60)}px`,
                    height: '100%',
                  }}
                >
                  {/* Red line */}
                  <div className="w-0.5 bg-red-500 h-full shadow-lg shadow-red-500/50"></div>
                </div>
              )}
              
              {stages.map((stage) => (
                <div key={stage.id} className="relative" style={{ height: "80px", width: timelineWidth, marginBottom: "16px" }}>
                  {/* Sticky stagenaam above the artist row */}
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
                  {/* Artist timeline */}
                  <div className="relative" style={{ height: "56px", width: timelineWidth, marginTop: "8px" }}>
                    {timetable.filter((a) => a.stage === stage.id).map((artist) => {
                      const left = getMinutesSinceFestivalStart(artist) * (HOUR_WIDTH / 60);
                      const width = getArtistDuration(artist) * (HOUR_WIDTH / 60);
                      const isFav = isFavorite(artist.id);
                      return (
                        <div
                          key={artist.id}
                          className={`absolute top-0 h-full rounded-lg border transition-colors cursor-pointer group flex flex-col justify-between ${
                            isFav
                              ? 'bg-yellow-400 border-yellow-500' 
                              : 'bg-gray-800 border-gray-600 hover:bg-gray-700'
                          }`}
                          style={{
                            left: `${left}px`,
                            width: `${width}px`,
                            minWidth: "60px",
                          }}
                          onClick={() => toggleFavorite(artist.id)}
                        >
                          {/* Ster icon right above */}
                          <div className="absolute top-1 right-1 z-10">
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
                          <div className="p-2 h-full flex flex-col justify-between">
                            <div className={`text-xs font-semibold truncate ${isFav ? 'text-black' : 'text-white'}`}>
                              {artist.name}
                            </div>
                            <div className={`text-xs ${isFav ? 'text-black/80' : 'text-gray-400'}`}>
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
