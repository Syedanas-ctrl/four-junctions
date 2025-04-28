"use client"

import { ChevronRight } from "lucide-react"

export function Watchlist() {
  return (
    <section className="max-w-7xl mx-auto px-4 mt-8">
      <h2 className="text-2xl font-bold border-l-4 border-[#f5c518] pl-3 mb-6">
        From your Watchlist <ChevronRight className="inline-block w-5 h-5 ml-1" />
      </h2>

      {/* Sign in prompt */}
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="relative w-10 h-10 mb-4">
          <div className="absolute inset-0 flex items-center justify-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <path d="M12 5v14M5 12h14"></path>
            </svg>
          </div>
          <div className="absolute inset-0 border border-gray-600"></div>
        </div>
        <h3 className="text-lg font-bold mb-2">Sign in to access your Watchlist</h3>
        <p className="text-gray-400 mb-6">Save shows and movies to keep track of what you want to watch.</p>
        <button className="bg-[#5699ef] text-white px-4 py-2 rounded hover:bg-[#4a86d5]">Sign in to IMDb</button>
      </div>
    </section>
  )
} 