"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { WifiOff, RefreshCw } from "lucide-react"

export default function OfflinePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-900 to-indigo-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white/10 backdrop-blur-lg border-white/20">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 p-3 bg-red-500/20 rounded-full w-fit">
            <WifiOff className="h-8 w-8 text-red-400" />
          </div>
          <CardTitle className="text-white text-2xl">Je bent offline</CardTitle>
          <CardDescription className="text-gray-300">
            Geen internetverbinding gevonden
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-300 text-center">
            Maak je geen zorgen! Je kunt nog steeds je favoriete artiesten bekijken en je tijdschema raadplegen.
          </p>
          
          <div className="space-y-2">
            <h4 className="font-semibold text-white">Wat je nog kunt doen:</h4>
            <ul className="text-sm text-gray-300 space-y-1">
              <li>• Bekijk je opgeslagen favorieten</li>
              <li>• Raadpleeg het festival tijdschema</li>
              <li>• Bekijk artiest informatie</li>
              <li>• Wijzig je favorieten (wordt opgeslagen)</li>
            </ul>
          </div>

          <Button 
            onClick={() => window.location.reload()}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Probeer opnieuw
          </Button>
        </CardContent>
      </Card>
    </div>
  )
} 