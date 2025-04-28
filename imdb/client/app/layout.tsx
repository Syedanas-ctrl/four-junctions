import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { ReduxProvider } from "@/lib/redux/provider"

export const metadata: Metadata = {
  title: "IMDb: Ratings, Reviews, and Where to Watch the Best Movies & TV Shows",
  description: "IMDb is the world's most popular and authoritative source for movie, TV and celebrity content.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          {children}
        </ReduxProvider>
      </body>
    </html>
  )
}
