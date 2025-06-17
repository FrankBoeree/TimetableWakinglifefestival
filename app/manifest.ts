import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Waking Life 2025 Timetable",
    short_name: "Waking Life",
    description: "Festival timetable and lineup for Waking Life 2025",
    start_url: "/",
    display: "standalone",
    background_color: "#000000",
    theme_color: "#ec4899",
    icons: [
      {
        src: "/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  }
}
