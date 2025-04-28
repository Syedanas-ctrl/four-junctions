"use client"

import Image from "next/image"
import { ChevronRight } from "lucide-react"

export function TopTenMovies() {
  return (
    <section className="max-w-7xl mx-auto px-4 mt-12">
      <h2 className="text-2xl font-bold border-l-4 border-[#f5c518] pl-3 mb-6">
        Top 10 on IMDb this week <ChevronRight className="inline-block w-5 h-5 ml-1" />
      </h2>

      <div className="relative">
        <div className="flex overflow-x-auto gap-4 pb-4 hide-scrollbar">
          {/* Movie 1 */}
          <div className="flex-shrink-0 w-[180px] bg-[#1a1a1a] rounded overflow-hidden">
            <div className="relative">
              <Image
                src="/placeholder.svg?height=270&width=180"
                alt="Black Mirror"
                width={180}
                height={270}
                className="w-full object-cover"
              />
              <button className="absolute top-2 left-2 bg-black/50 rounded-full p-1">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                  <path d="M12 5v14M5 12h14"></path>
                </svg>
              </button>
              <div className="absolute bottom-0 left-0 bg-black/60 px-2 py-1 text-xs">A NETFLIX SERIES</div>
              <div className="absolute bottom-0 right-0 bg-black/60 px-2 py-1 text-xs">NETFLIX</div>
            </div>
            <div className="p-3">
              <div className="flex items-center mb-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="#f5c518" className="mr-1">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                </svg>
                <span className="font-bold">8.7</span>
                <button className="ml-2">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="text-blue-400"
                  >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                  </svg>
                </button>
              </div>
              <h3 className="font-medium mb-2">1. Black Mirror</h3>
              <button className="w-full bg-[#2c2c2c] text-[#5699ef] py-1 rounded text-sm mb-2">
                Watch options
              </button>
              <button className="w-full bg-[#2c2c2c] text-white py-1 rounded text-sm flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="white" stroke="none" className="mr-1">
                  <polygon points="5 3 19 12 5 21 5 3"></polygon>
                </svg>
                Trailer
              </button>
            </div>
          </div>

          {/* Movie 2 */}
          <div className="flex-shrink-0 w-[180px] bg-[#1a1a1a] rounded overflow-hidden">
            <div className="relative">
              <Image
                src="/placeholder.svg?height=270&width=180"
                alt="The Last of Us"
                width={180}
                height={270}
                className="w-full object-cover"
              />
              <button className="absolute top-2 left-2 bg-black/50 rounded-full p-1">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                  <path d="M12 5v14M5 12h14"></path>
                </svg>
              </button>
              <div className="absolute bottom-0 right-0 bg-black/60 px-2 py-1 text-xs">APRIL 13 · max</div>
            </div>
            <div className="p-3">
              <div className="flex items-center mb-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="#f5c518" className="mr-1">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                </svg>
                <span className="font-bold">8.7</span>
                <button className="ml-2">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="text-blue-400"
                  >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                  </svg>
                </button>
              </div>
              <h3 className="font-medium mb-2">2. The Last of Us</h3>
              <button className="w-full bg-[#2c2c2c] text-[#5699ef] py-1 rounded text-sm mb-2">
                Watch options
              </button>
              <button className="w-full bg-[#2c2c2c] text-white py-1 rounded text-sm flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="white" stroke="none" className="mr-1">
                  <polygon points="5 3 19 12 5 21 5 3"></polygon>
                </svg>
                Trailer
              </button>
            </div>
          </div>

          {/* Additional movies can be added here */}
          
          {/* Movie 3, 4, 5, etc. */}
        </div>

        {/* Next Button */}
        <button className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black/50 p-2 rounded-full">
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </section>
  )
} 