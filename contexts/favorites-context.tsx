"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import { offlineStorage } from "@/lib/offline-storage"

interface FavoritesContextType {
  favorites: string[]
  toggleFavorite: (artistId: string) => void
  isFavorite: (artistId: string) => boolean
  isLoading: boolean
  isOnline: boolean
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined)

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isOnline, setIsOnline] = useState(true)

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        // Try to load from IndexedDB first
        const storedFavorites = await offlineStorage.getData('favorites')
        if (storedFavorites && Array.isArray(storedFavorites)) {
          setFavorites(storedFavorites)
        } else {
          // Fallback to localStorage
          const localStored = localStorage.getItem("festival-favorites")
          if (localStored) {
            const parsed = JSON.parse(localStored)
            setFavorites(parsed)
            // Save to IndexedDB for future use
            await offlineStorage.saveData('favorites', parsed)
          }
        }
      } catch (error) {
        console.error('Error loading favorites:', error)
        // Fallback to localStorage
        const localStored = localStorage.getItem("festival-favorites")
        if (localStored) {
          setFavorites(JSON.parse(localStored))
        }
      } finally {
        setIsLoading(false)
      }
    }

    loadFavorites()
  }, [])

  // Monitor online/offline status
  useEffect(() => {
    const updateOnlineStatus = () => {
      setIsOnline(navigator.onLine)
    }

    window.addEventListener('online', updateOnlineStatus)
    window.addEventListener('offline', updateOnlineStatus)
    updateOnlineStatus() // Set initial status

    return () => {
      window.removeEventListener('online', updateOnlineStatus)
      window.removeEventListener('offline', updateOnlineStatus)
    }
  }, [])

  const toggleFavorite = async (artistId: string) => {
    setFavorites((prev) => {
      const newFavorites = prev.includes(artistId) 
        ? prev.filter((id) => id !== artistId) 
        : [...prev, artistId]

      // Save to both localStorage and IndexedDB
      localStorage.setItem("festival-favorites", JSON.stringify(newFavorites))
      
      // Save to IndexedDB asynchronously
      offlineStorage.saveData('favorites', newFavorites).catch(error => {
        console.error('Error saving favorites to IndexedDB:', error)
      })

      return newFavorites
    })
  }

  const isFavorite = (artistId: string) => favorites.includes(artistId)

  return (
    <FavoritesContext.Provider value={{ 
      favorites, 
      toggleFavorite, 
      isFavorite, 
      isLoading,
      isOnline 
    }}>
      {children}
    </FavoritesContext.Provider>
  )
}

export function useFavorites() {
  const context = useContext(FavoritesContext)
  if (context === undefined) {
    throw new Error("useFavorites must be used within a FavoritesProvider")
  }
  return context
}
