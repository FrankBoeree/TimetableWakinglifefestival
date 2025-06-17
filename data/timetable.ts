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

export const timetable: Artist[] = [
  // Friday
  { id: "1", name: "Ronnie Flex & The Fam", startTime: "13:40", endTime: "14:40", stage: "Apuro", day: "friday" },
  { id: "2", name: "Alestorm", startTime: "15:50", endTime: "16:50", stage: "Apuro", day: "friday" },
  { id: "3", name: "Inhaler", startTime: "18:00", endTime: "19:00", stage: "Apuro", day: "friday" },
  { id: "4", name: "Oscar and The Wolf", startTime: "20:10", endTime: "21:10", stage: "Apuro", day: "friday" },
  { id: "5", name: "Justin Timberlake", startTime: "22:25", endTime: "00:00", stage: "Apuro", day: "friday" },

  { id: "6", name: "Pommelien Thijs", startTime: "14:45", endTime: "15:45", stage: "Floresta", day: "friday" },
  { id: "7", name: "The Chainsmokers", startTime: "19:30", endTime: "20:30", stage: "Floresta", day: "friday" },
  { id: "8", name: "Martin Garrix", startTime: "21:45", endTime: "22:45", stage: "Floresta", day: "friday" },

  { id: "9", name: "Warhaus", startTime: "14:15", endTime: "15:15", stage: "Praia", day: "friday" },
  { id: "10", name: "Balthazar", startTime: "17:30", endTime: "18:30", stage: "Praia", day: "friday" },
  { id: "11", name: "Stromae", startTime: "23:00", endTime: "00:30", stage: "Praia", day: "friday" },

  { id: "12", name: "LaBoely", startTime: "13:00", endTime: "16:00", stage: "Outro Lado", day: "friday" },
  { id: "13", name: "Hiopy", startTime: "15:15", endTime: "16:15", stage: "Outro Lado", day: "friday" },

  // Saturday
  { id: "14", name: "Dua Lipa", startTime: "21:00", endTime: "22:30", stage: "Apuro", day: "saturday" },
  { id: "15", name: "Arctic Monkeys", startTime: "19:15", endTime: "20:15", stage: "Apuro", day: "saturday" },
  { id: "16", name: "Billie Eilish", startTime: "23:00", endTime: "00:30", stage: "Apuro", day: "saturday" },

  { id: "17", name: "Calvin Harris", startTime: "22:00", endTime: "23:30", stage: "Floresta", day: "saturday" },
  { id: "18", name: "Disclosure", startTime: "20:30", endTime: "21:30", stage: "Floresta", day: "saturday" },

  { id: "19", name: "Tame Impala", startTime: "21:45", endTime: "23:15", stage: "Praia", day: "saturday" },
  { id: "20", name: "Glass Animals", startTime: "18:45", endTime: "19:45", stage: "Praia", day: "saturday" },

  { id: "21", name: "Bonobo", startTime: "16:00", endTime: "18:00", stage: "Outro Lado", day: "saturday" },
  { id: "22", name: "Kiasmos", startTime: "19:00", endTime: "21:00", stage: "Outro Lado", day: "saturday" },

  // Woensdag
  { id: "d1", name: "Jungle", startTime: "13:00", endTime: "14:00", stage: "Apuro", day: "wednesday" },
  { id: "d2", name: "Peggy Gou", startTime: "14:15", endTime: "15:00", stage: "Floresta", day: "wednesday" },
  { id: "d3", name: "Bicep", startTime: "15:10", endTime: "16:00", stage: "Praia", day: "wednesday" },
  { id: "d4", name: "Charlotte de Witte", startTime: "16:10", endTime: "17:00", stage: "Outro Lado", day: "wednesday" },
  { id: "d5", name: "Fred Again..", startTime: "17:10", endTime: "18:00", stage: "Apuro", day: "wednesday" },
  { id: "d6", name: "Jamie xx", startTime: "18:10", endTime: "19:00", stage: "Floresta", day: "wednesday" },
  { id: "d7", name: "RÜFÜS DU SOL", startTime: "19:10", endTime: "20:00", stage: "Praia", day: "wednesday" },
  { id: "d8", name: "The Blaze", startTime: "20:10", endTime: "21:00", stage: "Outro Lado", day: "wednesday" },
  // Donderdag
  { id: "d9", name: "Foals", startTime: "13:00", endTime: "14:00", stage: "Apuro", day: "thursday" },
  { id: "d10", name: "Caribou", startTime: "14:15", endTime: "15:00", stage: "Floresta", day: "thursday" },
  { id: "d11", name: "Bon Iver", startTime: "15:10", endTime: "16:00", stage: "Praia", day: "thursday" },
  { id: "d12", name: "Sofi Tukker", startTime: "16:10", endTime: "17:00", stage: "Outro Lado", day: "thursday" },
  { id: "d13", name: "ODESZA", startTime: "17:10", endTime: "18:00", stage: "Apuro", day: "thursday" },
  { id: "d14", name: "M83", startTime: "18:10", endTime: "19:00", stage: "Floresta", day: "thursday" },
  { id: "d15", name: "Jorja Smith", startTime: "19:10", endTime: "20:00", stage: "Praia", day: "thursday" },
  { id: "d16", name: "The xx", startTime: "20:10", endTime: "21:00", stage: "Outro Lado", day: "thursday" },
  // Vrijdag
  { id: "d17", name: "Rosalía", startTime: "13:00", endTime: "14:00", stage: "Apuro", day: "friday" },
  { id: "d18", name: "James Blake", startTime: "14:15", endTime: "15:00", stage: "Floresta", day: "friday" },
  { id: "d19", name: "Alt-J", startTime: "15:10", endTime: "16:00", stage: "Praia", day: "friday" },
  { id: "d20", name: "Kaytranada", startTime: "16:10", endTime: "17:00", stage: "Outro Lado", day: "friday" },
  { id: "d21", name: "Moses Sumney", startTime: "17:10", endTime: "18:00", stage: "Apuro", day: "friday" },
  { id: "d22", name: "Sampa The Great", startTime: "18:10", endTime: "19:00", stage: "Floresta", day: "friday" },
  { id: "d23", name: "Little Simz", startTime: "19:10", endTime: "20:00", stage: "Praia", day: "friday" },
  { id: "d24", name: "Arlo Parks", startTime: "20:10", endTime: "21:00", stage: "Outro Lado", day: "friday" },
  // Zaterdag
  { id: "d25", name: "The War On Drugs", startTime: "13:00", endTime: "14:00", stage: "Apuro", day: "saturday" },
  { id: "d26", name: "Khruangbin", startTime: "14:15", endTime: "15:00", stage: "Floresta", day: "saturday" },
  { id: "d27", name: "Jungle By Night", startTime: "15:10", endTime: "16:00", stage: "Praia", day: "saturday" },
  { id: "d28", name: "Sevdaliza", startTime: "16:10", endTime: "17:00", stage: "Outro Lado", day: "saturday" },
  { id: "d29", name: "Balthazar", startTime: "17:10", endTime: "18:00", stage: "Apuro", day: "saturday" },
  { id: "d30", name: "Sylvan Esso", startTime: "18:10", endTime: "19:00", stage: "Floresta", day: "saturday" },
  { id: "d31", name: "Rex Orange County", startTime: "19:10", endTime: "20:00", stage: "Praia", day: "saturday" },
  { id: "d32", name: "Sohn", startTime: "20:10", endTime: "21:00", stage: "Outro Lado", day: "saturday" },
  // Zondag
  { id: "d33", name: "Anderson .Paak & The Free Nationals", startTime: "13:00", endTime: "14:00", stage: "Apuro", day: "sunday" },
  { id: "d34", name: "Loyle Carner", startTime: "14:15", endTime: "15:00", stage: "Floresta", day: "sunday" },
  { id: "d35", name: "Parcels", startTime: "15:10", endTime: "16:00", stage: "Praia", day: "sunday" },
  { id: "d36", name: "Jungle (DJ Set)", startTime: "16:10", endTime: "17:00", stage: "Outro Lado", day: "sunday" },
  { id: "d37", name: "Rina Sawayama", startTime: "17:10", endTime: "18:00", stage: "Apuro", day: "sunday" },
  { id: "d38", name: "Sigrid", startTime: "18:10", endTime: "19:00", stage: "Floresta", day: "sunday" },
  { id: "d39", name: "Jungle Brown", startTime: "19:10", endTime: "20:00", stage: "Praia", day: "sunday" },
  { id: "d40", name: "Yussef Dayes", startTime: "20:10", endTime: "21:00", stage: "Outro Lado", day: "sunday" },
  // Maandag
  { id: "d41", name: "The Smile", startTime: "13:00", endTime: "14:00", stage: "Apuro", day: "monday" },
  { id: "d42", name: "Wet Leg", startTime: "14:15", endTime: "15:00", stage: "Floresta", day: "monday" },
  { id: "d43", name: "Fontaines D.C.", startTime: "15:10", endTime: "16:00", stage: "Praia", day: "monday" },
  { id: "d44", name: "Black Pumas", startTime: "16:10", endTime: "17:00", stage: "Outro Lado", day: "monday" },
  { id: "d45", name: "Jungle (Live)", startTime: "17:10", endTime: "18:00", stage: "Apuro", day: "monday" },
  { id: "d46", name: "Arctic Lake", startTime: "18:10", endTime: "19:00", stage: "Floresta", day: "monday" },
  { id: "d47", name: "Oscar Jerome", startTime: "19:10", endTime: "20:00", stage: "Praia", day: "monday" },
  { id: "d48", name: "Jordan Rakei", startTime: "20:10", endTime: "21:00", stage: "Outro Lado", day: "monday" },
]
