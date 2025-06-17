export interface Artist {
  id: string
  name: string
  startTime: string
  endTime: string
  stage: string
  day?: string // legacy
  startDay?: string
  endDay?: string
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

export const timetable: Artist[] = [
  {
    "id": "1",
    "name": "Kutmah",
    "startTime": "21:00",
    "endTime": "23:00",
    "startDay": "wednesday",
    "endDay": "wednesday",
    "stage": "Praia"
  },
  {
    "id": "2",
    "name": "Om Unit",
    "startTime": "23:00",
    "endTime": "01:00",
    "startDay": "wednesday",
    "endDay": "thursday",
    "stage": "Praia"
  },
  {
    "id": "3",
    "name": "DJ Marcelle",
    "startTime": "01:00",
    "endTime": "04:00",
    "startDay": "thursday",
    "endDay": "thursday",
    "stage": "Praia"
  },
  {
    "id": "4",
    "name": "Catu Diosis",
    "startTime": "04:00",
    "endTime": "06:00",
    "startDay": "thursday",
    "endDay": "thursday",
    "stage": "Praia"
  },
 
  {
    "id": "6",
    "name": "Mari.te",
    "startTime": "12:00",
    "endTime": "15:00",
    "startDay": "thursday",
    "endDay": "thursday",
    "stage": "Praia"
  },
  {
    "id": "7",
    "name": "Dana Kuehr",
    "startTime": "15:00",
    "endTime": "18:00",
    "startDay": "thursday",
    "endDay": "thursday",
    "stage": "Praia"
  },
  {
    "id": "8",
    "name": "Mark Farina",
    "startTime": "18:00",
    "endTime": "22:00",
    "startDay": "thursday",
    "endDay": "thursday",
    "stage": "Praia"
  },
  {
    "id": "9",
    "name": "Trol2000",
    "startTime": "22:00",
    "endTime": "01:00",
    "startDay": "thursday",
    "endDay": "friday",
    "stage": "Praia"
  },
  {
    "id": "10",
    "name": "Richard Akingbehin",
    "startTime": "01:00",
    "endTime": "04:00",
    "startDay": "friday",
    "endDay": "friday",
    "stage": "Praia"
  },
  {
    "id": "11",
    "name": "Yen Sung",
    "startTime": "04:00",
    "endTime": "06:00",
    "startDay": "friday",
    "endDay": "friday",
    "stage": "Praia"
  },

  {
    "id": "13",
    "name": "Funkamente",
    "startTime": "12:00",
    "endTime": "16:00",
    "startDay": "friday",
    "endDay": "friday",
    "stage": "Praia"
  },
  {
    "id": "14",
    "name": "Mike Stellar",
    "startTime": "16:00",
    "endTime": "19:30",
    "startDay": "friday",
    "endDay": "friday",
    "stage": "Praia"
  },
  {
    "id": "15",
    "name": "Luke Vibert",
    "startTime": "19:30",
    "endTime": "21:00",
    "startDay": "friday",
    "endDay": "friday",
    "stage": "Praia"
  },
  {
    "id": "16",
    "name": "King Kami",
    "startTime": "21:00",
    "endTime": "00:00",
    "startDay": "friday",
    "endDay": "saturday",
    "stage": "Praia"
  },
  {
    "id": "17",
    "name": "Dj Flight",
    "startTime": "00:00",
    "endTime": "03:00",
    "startDay": "saturday",
    "endDay": "saturday",
    "stage": "Praia"
  },
  {
    "id": "18",
    "name": "Doctor Jeep",
    "startTime": "03:00",
    "endTime": "06:00",
    "startDay": "saturday",
    "endDay": "saturday",
    "stage": "Praia"
  },

  {
    "id": "20",
    "name": "Mr Scruff",
    "startTime": "12:00",
    "endTime": "18:00",
    "startDay": "saturday",
    "endDay": "saturday",
    "stage": "Praia"
  },
  {
    "id": "21",
    "name": "Club CCC (CC:Disco & Dj Caring & Chima Isaaro)",
    "startTime": "18:00",
    "endTime": "00:00",
    "startDay": "saturday",
    "endDay": "sunday",
    "stage": "Praia"
  },
  {
    "id": "22",
    "name": "Tim Sweeney",
    "startTime": "00:00",
    "endTime": "06:00",
    "startDay": "sunday",
    "endDay": "sunday",
    "stage": "Praia"
  },

  {
    "id": "24",
    "name": "Selecta Fontes",
    "startTime": "14:00",
    "endTime": "15:20",
    "startDay": "sunday",
    "endDay": "sunday",
    "stage": "Praia"
  },
  {
    "id": "25",
    "name": "Medi Sound Station",
    "startTime": "15:20",
    "endTime": "16:40",
    "startDay": "sunday",
    "endDay": "sunday",
    "stage": "Praia"
  },
  {
    "id": "26",
    "name": "Simply Rockers Sound System",
    "startTime": "16:40",
    "endTime": "18:00",
    "startDay": "sunday",
    "endDay": "sunday",
    "stage": "Praia"
  },
  {
    "id": "27",
    "name": "10.000 Lions",
    "startTime": "18:00",
    "endTime": "20:00",
    "startDay": "sunday",
    "endDay": "sunday",
    "stage": "Praia"
  },
  {
    "id": "28",
    "name": "Simply Rockers Sound System",
    "startTime": "20:00",
    "endTime": "22:00",
    "startDay": "sunday",
    "endDay": "sunday",
    "stage": "Praia"
  },
  {
    "id": "29",
    "name": "Alpha & Omega feat. Ras Tinny",
    "startTime": "22:00",
    "endTime": "00:00",
    "startDay": "sunday",
    "endDay": "monday",
    "stage": "Praia"
  }
];
