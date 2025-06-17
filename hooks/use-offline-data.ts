import { useState, useEffect } from 'react'
import { offlineStorage, OfflineData } from '@/lib/offline-storage'
import { timetable } from '@/data/timetable'
import { artistDetails } from '@/data/artist-details'

interface UseOfflineDataReturn {
  data: OfflineData | null
  isLoading: boolean
  error: string | null
  refreshData: () => Promise<void>
  isOnline: boolean
}

export function useOfflineData(): UseOfflineDataReturn {
  const [data, setData] = useState<OfflineData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isOnline, setIsOnline] = useState(true)

  const loadData = async () => {
    try {
      setIsLoading(true)
      setError(null)

      // Try to load from IndexedDB first
      let offlineData = await offlineStorage.getAllData()

      // If no data in IndexedDB, load from static imports and save
      if (!offlineData.timetable.length || !offlineData.artistDetails.length) {
        offlineData = {
          timetable,
          artistDetails,
          favorites: offlineData.favorites,
          lastSync: Date.now(),
          version: '1.0.0'
        }

        // Save to IndexedDB
        await offlineStorage.saveData('timetable', timetable)
        await offlineStorage.saveData('artistDetails', artistDetails)
      }

      setData(offlineData)
    } catch (err) {
      console.error('Error loading offline data:', err)
      setError('Failed to load data')
      
      // Fallback to static data
      setData({
        timetable,
        artistDetails,
        favorites: [],
        lastSync: Date.now(),
        version: '1.0.0'
      })
    } finally {
      setIsLoading(false)
    }
  }

  const refreshData = async () => {
    await loadData()
  }

  // Monitor online/offline status
  useEffect(() => {
    const updateOnlineStatus = () => {
      setIsOnline(navigator.onLine)
    }

    window.addEventListener('online', updateOnlineStatus)
    window.addEventListener('offline', updateOnlineStatus)
    updateOnlineStatus()

    return () => {
      window.removeEventListener('online', updateOnlineStatus)
      window.removeEventListener('offline', updateOnlineStatus)
    }
  }, [])

  // Load data on mount
  useEffect(() => {
    loadData()
  }, [])

  return {
    data,
    isLoading,
    error,
    refreshData,
    isOnline
  }
} 