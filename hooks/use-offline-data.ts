import { useState, useEffect } from 'react'
import { offlineStorage, OfflineData } from '@/lib/offline-storage'
import { timetable } from '@/data/timetable'

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
      let offlineData: OfflineData | null = null
      
      try {
        offlineData = await offlineStorage.getAllData()
      } catch (dbError) {
        console.warn('IndexedDB not available, using static data:', dbError)
      }

      // If no data in IndexedDB or IndexedDB failed, use static imports
      if (!offlineData || !offlineData.timetable.length) {
        offlineData = {
          timetable,
          favorites: offlineData?.favorites || [],
          lastSync: Date.now(),
          version: '1.0.0'
        }

        // Try to save to IndexedDB (but don't fail if it doesn't work)
        try {
          await offlineStorage.saveData('timetable', timetable)
        } catch (saveError) {
          console.warn('Failed to save to IndexedDB:', saveError)
        }
      }

      setData(offlineData)
    } catch (err) {
      console.error('Error loading offline data:', err)
      setError('Failed to load data')
      
      // Always provide fallback data
      setData({
        timetable,
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