export interface ArtistDetail {
  id: string
  name: string
  image?: string
  description?: string
  genre?: string
  country?: string
}

export const artistDetails: ArtistDetail[] = [
  {
    id: "1",
    name: "Ronnie Flex & The Fam",
    image: "/placeholder.svg?height=300&width=300",
    description: "Dutch rapper and singer known for his versatile style blending hip-hop, R&B, and pop influences.",
    genre: "Hip-Hop/R&B",
    country: "Netherlands",
  },
  {
    id: "4",
    name: "Oscar and The Wolf",
    image: "/placeholder.svg?height=300&width=300",
    description: "Belgian indie pop project known for dreamy electronic soundscapes and ethereal vocals.",
    genre: "Indie Pop/Electronic",
    country: "Belgium",
  },
  {
    id: "5",
    name: "Justin Timberlake",
    image: "/placeholder.svg?height=300&width=300",
    description: "American singer, songwriter, and actor. Former member of NSYNC and successful solo artist.",
    genre: "Pop/R&B",
    country: "United States",
  },
  {
    id: "9",
    name: "Warhaus",
    image: "/placeholder.svg?height=300&width=300",
    description:
      "Side project of Maarten Devoldere from Balthazar, featuring dark indie rock with electronic elements.",
    genre: "Indie Rock",
    country: "Belgium",
  },
  {
    id: "14",
    name: "Dua Lipa",
    image: "/placeholder.svg?height=300&width=300",
    description: "British-Albanian singer known for her disco-influenced pop music and powerful vocals.",
    genre: "Pop/Dance",
    country: "United Kingdom",
  },
]
