export interface Artist {
  id: string
  name: string
  startTime: string
  endTime: string
  stage: string
  day: string
}

export interface Stage {
  id: string
  name: string
  color: string
}

export interface Day {
  id: string
  name: string
  date: string
}

export const days: Day[] = [
  { id: "wednesday", name: "Wednesday", date: "2025-06-18" },
  { id: "thursday", name: "Thursday", date: "2025-06-19" },
  { id: "friday", name: "Friday", date: "2025-06-20" },
  { id: "saturday", name: "Saturday", date: "2025-06-21" },
  { id: "sunday", name: "Sunday", date: "2025-06-22" },
  { id: "monday", name: "Monday", date: "2025-06-23" },
]

export const stages: Stage[] = [
  { id: "Apuro", name: "Apuro", color: "#ec4899" },
  { id: "Floresta", name: "Floresta", color: "#8b5cf6" },
  { id: "Praia", name: "Praia", color: "#06b6d4" },
  { id: "Outro Lado", name: "Outro Lado", color: "#10b981" },
]

// Helper to generate time slots
function timeAdd(start: string, mins: number) {
  const [h, m] = start.split(":").map(Number)
  const date = new Date(2000, 0, 1, h, m)
  date.setMinutes(date.getMinutes() + mins)
  return date.toTimeString().slice(0, 5)
}

// Artists per stage per day (spread, no overlap)
export const timetable: Artist[] = [
  // Friday
  { id: "1", name: "Ronnie Flex & The Fam", startTime: "13:00", endTime: "14:00", stage: "Apuro", day: "friday" },
  { id: "2", name: "Alestorm", startTime: "14:15", endTime: "15:15", stage: "Apuro", day: "friday" },
  { id: "3", name: "Inhaler", startTime: "15:30", endTime: "16:30", stage: "Apuro", day: "friday" },
  { id: "4", name: "Oscar and The Wolf", startTime: "16:45", endTime: "17:45", stage: "Apuro", day: "friday" },
  { id: "5", name: "Justin Timberlake", startTime: "18:00", endTime: "19:30", stage: "Apuro", day: "friday" },

  { id: "6", name: "Pommelien Thijs", startTime: "13:00", endTime: "14:00", stage: "Floresta", day: "friday" },
  { id: "7", name: "The Chainsmokers", startTime: "14:15", endTime: "15:15", stage: "Floresta", day: "friday" },
  { id: "8", name: "Martin Garrix", startTime: "15:30", endTime: "16:30", stage: "Floresta", day: "friday" },
  { id: "9", name: "James Blake", startTime: "16:45", endTime: "17:45", stage: "Floresta", day: "friday" },
  { id: "10", name: "Stromae", startTime: "18:00", endTime: "19:30", stage: "Floresta", day: "friday" },

  { id: "11", name: "Warhaus", startTime: "13:00", endTime: "14:00", stage: "Praia", day: "friday" },
  { id: "12", name: "Balthazar", startTime: "14:15", endTime: "15:15", stage: "Praia", day: "friday" },
  { id: "13", name: "Alt-J", startTime: "15:30", endTime: "16:30", stage: "Praia", day: "friday" },
  { id: "14", name: "Little Simz", startTime: "16:45", endTime: "17:45", stage: "Praia", day: "friday" },
  { id: "15", name: "Sampa The Great", startTime: "18:00", endTime: "19:30", stage: "Praia", day: "friday" },

  { id: "16", name: "LaBoely", startTime: "13:00", endTime: "14:00", stage: "Outro Lado", day: "friday" },
  { id: "17", name: "Hiopy", startTime: "14:15", endTime: "15:15", stage: "Outro Lado", day: "friday" },
  { id: "18", name: "Kaytranada", startTime: "15:30", endTime: "16:30", stage: "Outro Lado", day: "friday" },
  { id: "19", name: "Arlo Parks", startTime: "16:45", endTime: "17:45", stage: "Outro Lado", day: "friday" },
  { id: "20", name: "ODESZA", startTime: "18:00", endTime: "19:30", stage: "Outro Lado", day: "friday" },

  // Saturday
  { id: "21", name: "Dua Lipa", startTime: "13:00", endTime: "14:00", stage: "Apuro", day: "saturday" },
  { id: "22", name: "Arctic Monkeys", startTime: "14:15", endTime: "15:15", stage: "Apuro", day: "saturday" },
  { id: "23", name: "Billie Eilish", startTime: "15:30", endTime: "16:30", stage: "Apuro", day: "saturday" },
  { id: "24", name: "The War On Drugs", startTime: "16:45", endTime: "17:45", stage: "Apuro", day: "saturday" },
  { id: "25", name: "Jungle", startTime: "18:00", endTime: "19:30", stage: "Apuro", day: "saturday" },

  { id: "26", name: "Calvin Harris", startTime: "13:00", endTime: "14:00", stage: "Floresta", day: "saturday" },
  { id: "27", name: "Disclosure", startTime: "14:15", endTime: "15:15", stage: "Floresta", day: "saturday" },
  { id: "28", name: "Khruangbin", startTime: "15:30", endTime: "16:30", stage: "Floresta", day: "saturday" },
  { id: "29", name: "Jamie xx", startTime: "16:45", endTime: "17:45", stage: "Floresta", day: "saturday" },
  { id: "30", name: "Sylvan Esso", startTime: "18:00", endTime: "19:30", stage: "Floresta", day: "saturday" },

  { id: "31", name: "Tame Impala", startTime: "13:00", endTime: "14:00", stage: "Praia", day: "saturday" },
  { id: "32", name: "Glass Animals", startTime: "14:15", endTime: "15:15", stage: "Praia", day: "saturday" },
  { id: "33", name: "Rex Orange County", startTime: "15:30", endTime: "16:30", stage: "Praia", day: "saturday" },
  { id: "34", name: "Jungle By Night", startTime: "16:45", endTime: "17:45", stage: "Praia", day: "saturday" },
  { id: "35", name: "Bonobo", startTime: "18:00", endTime: "19:30", stage: "Praia", day: "saturday" },

  { id: "36", name: "Sevdaliza", startTime: "13:00", endTime: "14:00", stage: "Outro Lado", day: "saturday" },
  { id: "37", name: "Kiasmos", startTime: "14:15", endTime: "15:15", stage: "Outro Lado", day: "saturday" },
  { id: "38", name: "Charlotte de Witte", startTime: "15:30", endTime: "16:30", stage: "Outro Lado", day: "saturday" },
  { id: "39", name: "The Blaze", startTime: "16:45", endTime: "17:45", stage: "Outro Lado", day: "saturday" },
  { id: "40", name: "Sofi Tukker", startTime: "18:00", endTime: "19:30", stage: "Outro Lado", day: "saturday" },

  // ... (herhaal dit patroon voor de andere dagen, of voeg meer artiesten toe voor spreiding)
]
