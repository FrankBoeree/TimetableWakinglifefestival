# Festival Timetable PWA - Offline First

Een Progressive Web App (PWA) voor het Waking Life Festival 2025 die volledig offline werkt. Alle data wordt lokaal opgeslagen en de app blijft functioneren zonder internetverbinding.

## 🚀 Features

### Offline Functionaliteit
- **Volledig offline werkend**: Alle data wordt lokaal opgeslagen
- **Service Worker**: Cached alle assets en data voor offline gebruik
- **IndexedDB**: Snelle lokale opslag voor grote datasets
- **Automatische synchronisatie**: Data wordt opgeslagen zodra je online bent
- **Offline status indicator**: Zie wanneer je offline bent

### PWA Features
- **Installeerbaar**: Voeg toe aan startscherm
- **App-like ervaring**: Volledig scherm zonder browser UI
- **Push notifications**: (Toekomstige feature)
- **Background sync**: (Toekomstige feature)

### Festival Features
- **Timetable view**: Bekijk alle optredens per dag en stage
- **Lineup view**: Overzicht van alle artiesten
- **Favorieten**: Markeer je favoriete artiesten
- **Artiest details**: Meer informatie over artiesten
- **Offline favorieten**: Wijzigingen worden lokaal opgeslagen

## 📱 Installatie

### Voor Gebruikers
1. Open de app in je browser
2. Klik op "Installeer App" wanneer de prompt verschijnt
3. Of gebruik het menu van je browser om de app te installeren
4. De app is nu beschikbaar op je startscherm

### Voor Ontwikkelaars
```bash
# Clone de repository
git clone [repository-url]
cd festival-timetable-pwa

# Installeer dependencies
pnpm install

# Start development server
pnpm dev

# Build voor productie
pnpm build
```

## 🛠 Technische Details

### Offline Storage
- **IndexedDB**: Voor grote datasets (timetable, artiest details)
- **localStorage**: Voor kleine data (favorieten)
- **Service Worker Cache**: Voor assets en API responses

### Data Flow
1. **Eerste keer laden**: Data wordt geïmporteerd en opgeslagen in IndexedDB
2. **Offline gebruik**: Data wordt geladen uit IndexedDB
3. **Online synchronisatie**: Nieuwe data wordt gedownload en opgeslagen
4. **Favorieten**: Worden direct opgeslagen in localStorage en IndexedDB

### Service Worker
- **Cache Strategy**: Cache-first voor statische assets
- **Network Fallback**: Probeer netwerk, val terug op cache
- **Background Sync**: Voor toekomstige offline acties

## 📊 Data Structuur

### Timetable Data
```typescript
interface Artist {
  id: string
  name: string
  startTime: string
  endTime: string
  stage: string
  day: string
}
```

### Artist Details
```typescript
interface ArtistDetail {
  id: string
  name: string
  image?: string
  description?: string
  genre?: string
  country?: string
}
```

### Offline Data
```typescript
interface OfflineData {
  timetable: Artist[]
  artistDetails: ArtistDetail[]
  favorites: string[]
  lastSync: number
  version: string
}
```

## 🔧 Configuratie

### Service Worker
De service worker wordt automatisch geregistreerd en cached:
- Statische assets (HTML, CSS, JS, afbeeldingen)
- API responses
- Offline fallback pagina

### PWA Manifest
- App naam en beschrijving
- Icons voor verschillende formaten
- Theme colors
- Display mode (standalone)
- Shortcuts voor snelle toegang

## 📱 Browser Ondersteuning

### Vereist
- Service Workers
- IndexedDB
- localStorage
- Fetch API

### Ondersteunde Browsers
- Chrome 40+
- Firefox 44+
- Safari 11.1+
- Edge 17+

## 🚨 Troubleshooting

### App werkt niet offline
1. Controleer of Service Worker is geregistreerd
2. Open DevTools > Application > Service Workers
3. Controleer of IndexedDB data aanwezig is

### Favorieten verdwijnen
1. Controleer localStorage in DevTools
2. Controleer IndexedDB in DevTools > Application > Storage
3. Data wordt opgeslagen in beide locaties

### Installatie werkt niet
1. Controleer of HTTPS wordt gebruikt (vereist voor PWA)
2. Controleer of manifest.json correct is
3. Controleer browser ondersteuning

## 🔮 Toekomstige Features

- [ ] Push notifications voor favoriete artiesten
- [ ] Background sync voor offline wijzigingen
- [ ] Offline maps en navigatie
- [ ] Social features (delen van favorieten)
- [ ] Offline foto's en media
- [ ] Real-time updates wanneer online

## 📄 Licentie

MIT License - zie LICENSE bestand voor details.

## 🤝 Bijdragen

Pull requests zijn welkom! Voor grote wijzigingen, open eerst een issue om te bespreken wat je wilt veranderen.

## 📞 Support

Voor vragen of problemen:
1. Check de troubleshooting sectie
2. Open een issue op GitHub
3. Neem contact op via [email] 