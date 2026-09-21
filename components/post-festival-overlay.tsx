"use client"

import { useEffect, useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog"

const ARCHIVE_START = new Date("2025-07-06T23:59:59").getTime()

export function PostFestivalOverlay() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    setOpen(Date.now() >= ARCHIVE_START)
  }, [])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="w-[calc(100%-2rem)] border-gray-700 bg-black p-6 text-white sm:max-w-md">
        <DialogTitle className="pr-8 text-2xl font-bold lowercase text-white">
          this festival is over
        </DialogTitle>
        <DialogDescription className="sr-only">
          Waking Life 2025 is over. Discover future festival timetables on One More Set.
        </DialogDescription>

        <div className="space-y-5 pt-2 text-sm font-medium leading-6 text-gray-200">
          <p>
            Thanks for using this timetable. Discover future festival timetables and new editions on
            One More Set.
          </p>
          <p>
            Looking for a timetable for another festival? You can submit a request on the site.
          </p>
          <div className="flex flex-col gap-3 pt-1">
            <a
              href="https://onemoreset.app"
              className="inline-flex w-full items-center justify-center rounded-md bg-pink-500 px-4 py-3 text-sm font-bold lowercase text-white transition-colors hover:bg-pink-600"
            >
              go to onemoreset.app
            </a>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="inline-flex w-full items-center justify-center rounded-md border border-gray-600 px-4 py-3 text-sm font-bold lowercase text-white transition-colors hover:bg-gray-800"
            >
              view this timetable
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
