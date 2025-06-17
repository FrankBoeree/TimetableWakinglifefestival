import type { MetadataRoute } from "next"

export const dynamic = "force-static"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Waking Life 2025 Timetable",
    short_name: "Waking Life",
    description: "Festival timetable and lineup for Waking Life 2025 - Works offline!",
    start_url: "/",
    display: "standalone",
    background_color: "#000000",
    theme_color: "#ec4899",
    orientation: "portrait",
    scope: "/",
    lang: "en",
    categories: ["entertainment", "music", "lifestyle"],
    icons: [
      {
        src: "/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable"
      },
      {
        src: "/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable"
      },
    ],
    screenshots: [
      {
        src: "/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
        form_factor: "wide"
      },
      {
        src: "/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
        form_factor: "narrow"
      }
    ],
    shortcuts: [
      {
        name: "Favorites",
        short_name: "Favorites",
        description: "View your favorite artists",
        url: "/?view=favorites",
        icons: [
          {
            src: "/icon-192x192.png",
            sizes: "192x192"
          }
        ]
      },
      {
        name: "Timetable",
        short_name: "Schedule",
        description: "View festival timetable",
        url: "/?view=timetable",
        icons: [
          {
            src: "/icon-192x192.png",
            sizes: "192x192"
          }
        ]
      }
    ]
  }
}
