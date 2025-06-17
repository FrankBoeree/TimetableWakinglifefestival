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

export const timetable: Artist[] = [
// ... data from combined_lineup.json ...
{"id":"1","name":"Paquita Gordon","startTime":"21:00","endTime":"02:00","stage":"Floresta","day":"wednesday"},
{"id":"2","name":"Theo Parrish","startTime":"02:00","endTime":"10:00","stage":"Floresta","day":"wednesday"},
{"id":"3","name":"a pausa","startTime":"10:00","endTime":"14:00","stage":"Floresta","day":"wednesday"},
{"id":"4","name":"Francisca Urbano & Lamaz","startTime":"14:00","endTime":"17:00","stage":"Floresta","day":"wednesday"},
{"id":"5","name":"Dj Fart in the Club","startTime":"17:00","endTime":"20:00","stage":"Floresta","day":"wednesday"},
{"id":"6","name":"Verraco","startTime":"20:00","endTime":"23:00","stage":"Floresta","day":"wednesday"},
{"id":"7","name":"Lournco Lvgs","startTime":"14:00","endTime":"17:00","stage":"Floresta","day":"thursday"},
{"id":"8","name":"Octo Octa & Eris Drew","startTime":"17:00","endTime":"21:00","stage":"Floresta","day":"thursday"},
{"id":"9","name":"Nathalie Seres & Introspekt","startTime":"21:00","endTime":"00:00","stage":"Floresta","day":"thursday"},
{"id":"10","name":"Pearson Sound","startTime":"00:00","endTime":"03:00","stage":"Floresta","day":"friday"},
{"id":"11","name":"Lena Willikens","startTime":"03:00","endTime":"06:00","stage":"Floresta","day":"friday"},
{"id":"12","name":"Djrum","startTime":"06:00","endTime":"10:00","stage":"Floresta","day":"friday"},
{"id":"13","name":"Nosedrip","startTime":"23:00","endTime":"03:00","stage":"Floresta","day":"saturday"},
{"id":"14","name":"Dj Red","startTime":"03:00","endTime":"07:00","stage":"Floresta","day":"saturday"},
{"id":"15","name":"Jane Fitz","startTime":"07:00","endTime":"10:00","stage":"Floresta","day":"saturday"},
{"id":"16","name":"a pausa","startTime":"10:00","endTime":"14:00","stage":"Floresta","day":"saturday"},
{"id":"17","name":"Que Sakamoto","startTime":"14:00","endTime":"17:00","stage":"Floresta","day":"saturday"},
{"id":"18","name":"Rhadoo","startTime":"17:00","endTime":"23:00","stage":"Floresta","day":"saturday"},
{"id":"19","name":"Loidis","startTime":"23:00","endTime":"02:00","stage":"Floresta","day":"saturday"},
{"id":"20","name":"Roman Fl\u00fcgel pres. Tracks On Delivery","startTime":"02:00","endTime":"03:00","stage":"Floresta","day":"sunday"},
{"id":"21","name":"Maayan Nidam","startTime":"03:00","endTime":"07:00","stage":"Floresta","day":"sunday"},
{"id":"22","name":"Kia","startTime":"07:00","endTime":"10:00","stage":"Floresta","day":"sunday"},
{"id":"23","name":"a pausa","startTime":"10:00","endTime":"14:00","stage":"Floresta","day":"sunday"},
{"id":"24","name":"Altinbas","startTime":"14:00","endTime":"17:00","stage":"Floresta","day":"sunday"},
{"id":"25","name":"David Rodrigues","startTime":"17:00","endTime":"20:00","stage":"Floresta","day":"sunday"},
{"id":"26","name":"Magda","startTime":"20:00","endTime":"23:00","stage":"Floresta","day":"sunday"},
{"id":"27","name":"DVS1","startTime":"23:00","endTime":"02:00","stage":"Floresta","day":"sunday"},
{"id":"28","name":"Polygonia","startTime":"02:00","endTime":"05:00","stage":"Floresta","day":"monday"},
{"id":"29","name":"Vlada","startTime":"05:00","endTime":"08:00","stage":"Floresta","day":"monday"},
{"id":"30","name":"''--''","startTime":"08:00","endTime":"--","stage":"Floresta","day":"monday"},
{"id":"31","name":"Kutmah","startTime":"21:00","endTime":"23:00","stage":"Praia","day":"wednesday"},
{"id":"32","name":"Om Unit","startTime":"23:00","endTime":"01:00","stage":"Praia","day":"wednesday"},
{"id":"33","name":"DJ Marcelle","startTime":"01:00","endTime":"04:00","stage":"Praia","day":"wednesday"},
{"id":"34","name":"Catu Diosis","startTime":"04:00","endTime":"06:00","stage":"Praia","day":"wednesday"},
{"id":"35","name":"a pausa","startTime":"06:00","endTime":"12:00","stage":"Praia","day":"wednesday"},
{"id":"36","name":"Mari.te","startTime":"12:00","endTime":"15:00","stage":"Praia","day":"thursday"},
{"id":"37","name":"Dana Kuehr","startTime":"15:00","endTime":"18:00","stage":"Praia","day":"thursday"},
{"id":"38","name":"Mark Farina","startTime":"18:00","endTime":"22:00","stage":"Praia","day":"thursday"},
{"id":"39","name":"Trol2000","startTime":"22:00","endTime":"01:00","stage":"Praia","day":"thursday"},
{"id":"40","name":"Richard Akingbehin","startTime":"01:00","endTime":"04:00","stage":"Praia","day":"thursday"},
{"id":"41","name":"Yen Sung","startTime":"04:00","endTime":"06:00","stage":"Praia","day":"thursday"},
{"id":"42","name":"a pausa","startTime":"06:00","endTime":"12:00","stage":"Praia","day":"friday"},
{"id":"43","name":"Funkamente","startTime":"12:00","endTime":"16:00","stage":"Praia","day":"friday"},
{"id":"44","name":"Mike Stellar","startTime":"16:00","endTime":"19:30","stage":"Praia","day":"friday"},
{"id":"45","name":"Luke Vibert","startTime":"19:30","endTime":"21:00","stage":"Praia","day":"friday"},
{"id":"46","name":"King Kami","startTime":"21:00","endTime":"00:00","stage":"Praia","day":"friday"},
{"id":"47","name":"Dj Flight","startTime":"00:00","endTime":"03:00","stage":"Praia","day":"friday"},
{"id":"48","name":"Doctor Jeep","startTime":"03:00","endTime":"06:00","stage":"Praia","day":"saturday"},
{"id":"49","name":"a pausa","startTime":"06:00","endTime":"12:00","stage":"Praia","day":"saturday"},
{"id":"50","name":"Mr Scruff","startTime":"12:00","endTime":"18:00","stage":"Praia","day":"saturday"},
{"id":"51","name":"Club CCC (CC:Disco & Dj Caring & Chima Isaaro)","startTime":"18:00","endTime":"00:00","stage":"Praia","day":"saturday"},
{"id":"52","name":"Tim Sweeney","startTime":"00:00","endTime":"06:00","stage":"Praia","day":"saturday"},
{"id":"53","name":"a pausa","startTime":"06:00","endTime":"14:00","stage":"Praia","day":"sunday"},
{"id":"54","name":"Selecta Fontes","startTime":"14:00","endTime":"15:20","stage":"Praia","day":"sunday"},
{"id":"55","name":"Medi Sound Station","startTime":"15:20","endTime":"16:40","stage":"Praia","day":"sunday"},
{"id":"56","name":"Simply Rockers Sound System","startTime":"16:40","endTime":"18:00","stage":"Praia","day":"sunday"},
{"id":"57","name":"10.000 Lions","startTime":"18:00","endTime":"20:00","stage":"Praia","day":"sunday"},
{"id":"58","name":"Simply Rockers Sound System","startTime":"20:00","endTime":"22:00","stage":"Praia","day":"sunday"},
{"id":"59","name":"Alpha & Omega feat. Ras Tinny","startTime":"22:00","endTime":"00:00","stage":"Praia","day":"sunday"},
{"id":"60","name":"Leafar Legov","startTime":"12:00","endTime":"15:00","stage":"Outro Lado","day":"thursday"},
{"id":"61","name":"O.Bee","startTime":"15:00","endTime":"18:00","stage":"Outro Lado","day":"thursday"},
{"id":"62","name":"Sonja Moonear","startTime":"18:00","endTime":"21:00","stage":"Outro Lado","day":"thursday"},
{"id":"63","name":"Kenny Larkin","startTime":"21:00","endTime":"23:00","stage":"Outro Lado","day":"thursday"},
{"id":"64","name":"Yamour","startTime":"23:00","endTime":"02:00","stage":"Outro Lado","day":"thursday"},
{"id":"65","name":"Mathew Jonson & .VRIL","startTime":"02:00","endTime":"04:00","stage":"Outro Lado","day":"friday"},
{"id":"66","name":"Konstantin","startTime":"04:00","endTime":"07:00","stage":"Outro Lado","day":"friday"},
{"id":"67","name":"Elli","startTime":"07:00","endTime":"10:00","stage":"Outro Lado","day":"friday"},
{"id":"68","name":"Fennesz","startTime":"10:00","endTime":"11:00","stage":"Outro Lado","day":"friday"},
{"id":"69","name":"Drama","startTime":"11:00","endTime":"13:00","stage":"Outro Lado","day":"friday"},
{"id":"70","name":"Helena Guedes","startTime":"13:00","endTime":"15:00","stage":"Outro Lado","day":"friday"},
{"id":"71","name":"UNOS","startTime":"15:00","endTime":"17:30","stage":"Outro Lado","day":"friday"},
{"id":"72","name":"Kalabrese","startTime":"17:30","endTime":"20:30","stage":"Outro Lado","day":"friday"},
{"id":"73","name":"Dj Koze","startTime":"20:30","endTime":"23:00","stage":"Outro Lado","day":"friday"},
{"id":"74","name":"DESIREE","startTime":"23:00","endTime":"01:30","stage":"Outro Lado","day":"friday"},
{"id":"75","name":"Cassy","startTime":"01:30","endTime":"04:00","stage":"Outro Lado","day":"saturday"},
{"id":"76","name":"Soundstream","startTime":"04:00","endTime":"07:00","stage":"Outro Lado","day":"saturday"},
{"id":"77","name":"Cosmo","startTime":"07:00","endTime":"10:00","stage":"Outro Lado","day":"saturday"},
{"id":"78","name":"Malibu","startTime":"10:00","endTime":"11:00","stage":"Outro Lado","day":"saturday"},
{"id":"79","name":"Gizem \u00d6z","startTime":"11:00","endTime":"12:00","stage":"Outro Lado","day":"saturday"},
{"id":"80","name":"Rhadoo","startTime":"12:00","endTime":"13:00","stage":"Outro Lado","day":"saturday"},
{"id":"81","name":"Bochum Welt","startTime":"13:00","endTime":"14:00","stage":"Outro Lado","day":"saturday"},
{"id":"82","name":"Lowtec & Ulf Eriksson","startTime":"14:00","endTime":"17:00","stage":"Outro Lado","day":"saturday"},
{"id":"83","name":"Willow","startTime":"17:00","endTime":"19:00","stage":"Outro Lado","day":"saturday"},
{"id":"84","name":"XDB & PLO Man","startTime":"19:00","endTime":"22:00","stage":"Outro Lado","day":"saturday"},
{"id":"85","name":"Aleksi Per\u00e4l\u00e4","startTime":"22:00","endTime":"00:00","stage":"Outro Lado","day":"saturday"},
{"id":"86","name":"Decoder","startTime":"00:00","endTime":"02:00","stage":"Outro Lado","day":"sunday"},
{"id":"87","name":"Cio D'Or","startTime":"02:00","endTime":"04:00","stage":"Outro Lado","day":"sunday"},
{"id":"88","name":"Serenne","startTime":"04:00","endTime":"06:00","stage":"Outro Lado","day":"sunday"},
{"id":"89","name":"Edward","startTime":"06:00","endTime":"09:00","stage":"Outro Lado","day":"sunday"},
{"id":"90","name":"BifiBoji","startTime":"09:00","endTime":"10:00","stage":"Outro Lado","day":"sunday"},
{"id":"91","name":"Hari & Achill","startTime":"10:00","endTime":"12:00","stage":"Outro Lado","day":"sunday"},
{"id":"92","name":"Pedro Ricardo","startTime":"12:00","endTime":"14:00","stage":"Outro Lado","day":"sunday"},
{"id":"93","name":"Dj Dustin","startTime":"14:00","endTime":"17:00","stage":"Outro Lado","day":"sunday"},
{"id":"94","name":"RAMZi","startTime":"17:00","endTime":"18:00","stage":"Outro Lado","day":"sunday"},
{"id":"95","name":"Petre Inspirescu","startTime":"18:00","endTime":"21:00","stage":"Outro Lado","day":"sunday"},
{"id":"96","name":"Portable","startTime":"21:00","endTime":"22:00","stage":"Outro Lado","day":"sunday"},
{"id":"97","name":"Melchior Productions Ltd.","startTime":"22:00","endTime":"23:00","stage":"Outro Lado","day":"sunday"},
{"id":"98","name":"Lawrence","startTime":"23:00","endTime":"00:00","stage":"Outro Lado","day":"sunday"},
{"id":"99","name":"Mountain People","startTime":"00:00","endTime":"02:00","stage":"Outro Lado","day":"monday"},
{"id":"100","name":"E.Lina","startTime":"02:00","endTime":"04:00","stage":"Outro Lado","day":"monday"},
{"id":"101","name":"Vera","startTime":"04:00","endTime":"06:00","stage":"Outro Lado","day":"monday"},
{"id":"102","name":"Emi","startTime":"06:00","endTime":"08:00","stage":"Outro Lado","day":"monday"},
{"id":"103","name":"Kyle Toole, Zip, Margaret Dygas, Julius Steinhoff, Sevensol,..","startTime":"08:00","endTime":"22:00","stage":"Outro Lado","day":"monday"}
];
