// Offline storage utility using IndexedDB for better performance
export interface OfflineData {
  timetable: any[]
  favorites: string[]
  lastSync: number
  version: string
  // artistDetails: any[] // legacy, niet meer gebruikt
}

class OfflineStorage {
  private dbName = 'FestivalTimetableDB'
  private dbVersion = 1
  private storeName = 'festivalData'

  async initDB(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.dbVersion)

      request.onerror = () => reject(request.error)
      request.onsuccess = () => resolve(request.result)

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result
        if (!db.objectStoreNames.contains(this.storeName)) {
          const store = db.createObjectStore(this.storeName, { keyPath: 'id' })
          store.createIndex('type', 'type', { unique: false })
        }
      }
    })
  }

  async saveData(type: string, data: any): Promise<void> {
    const db = await this.initDB()
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([this.storeName], 'readwrite')
      const store = transaction.objectStore(this.storeName)
      
      const request = store.put({
        id: type,
        type,
        data,
        timestamp: Date.now()
      })

      request.onsuccess = () => resolve()
      request.onerror = () => reject(request.error)
    })
  }

  async getData(type: string): Promise<any> {
    const db = await this.initDB()
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([this.storeName], 'readonly')
      const store = transaction.objectStore(this.storeName)
      const request = store.get(type)

      request.onsuccess = () => {
        resolve(request.result?.data || null)
      }
      request.onerror = () => reject(request.error)
    })
  }

  async getAllData(): Promise<OfflineData> {
    const [timetable, favorites] = await Promise.all([
      this.getData('timetable'),
      this.getData('favorites')
    ])

    return {
      timetable: timetable || [],
      favorites: favorites || [],
      lastSync: Date.now(),
      version: '1.0.0'
    }
  }

  async clearData(): Promise<void> {
    const db = await this.initDB()
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([this.storeName], 'readwrite')
      const store = transaction.objectStore(this.storeName)
      const request = store.clear()

      request.onsuccess = () => resolve()
      request.onerror = () => reject(request.error)
    })
  }

  // Check if we're online
  isOnline(): boolean {
    return typeof navigator !== 'undefined' && navigator.onLine
  }

  // Get storage usage info
  async getStorageInfo(): Promise<{ used: number; available: number }> {
    if ('storage' in navigator && 'estimate' in navigator.storage) {
      const estimate = await navigator.storage.estimate()
      return {
        used: estimate.usage || 0,
        available: estimate.quota || 0
      }
    }
    return { used: 0, available: 0 }
  }
}

export const offlineStorage = new OfflineStorage()

// Service Worker registration
export async function registerServiceWorker(): Promise<ServiceWorkerRegistration | null> {
  if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js')
      console.log('Service Worker registered:', registration)
      return registration
    } catch (error) {
      console.error('Service Worker registration failed:', error)
      return null
    }
  }
  return null
}

// Initialize offline capabilities
export async function initializeOfflineCapabilities(): Promise<void> {
  // Register service worker
  await registerServiceWorker()

  // Pre-cache essential data
  if (typeof window !== 'undefined') {
    // Import data modules
    const { timetable } = await import('@/data/timetable')

    // Save to IndexedDB
    await offlineStorage.saveData('timetable', timetable)

    // Load favorites from localStorage and save to IndexedDB
    const storedFavorites = localStorage.getItem('festival-favorites')
    if (storedFavorites) {
      const favorites = JSON.parse(storedFavorites)
      await offlineStorage.saveData('favorites', favorites)
    }
  }
} 