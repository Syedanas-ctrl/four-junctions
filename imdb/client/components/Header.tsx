"use client"

import Image from "next/image"
import Link from "next/link"
import { ChevronDown, Menu, Search, X } from "lucide-react"
import { useState } from "react"

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      <header className="flex items-center px-4 py-2 bg-black text-white relative">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex-shrink-0">
            <Image
              src="/placeholder.svg?height=32&width=64"
              alt="IMDb"
              width={64}
              height={32}
              className="bg-[#f5c518] rounded px-2 py-1"
            />
          </Link>
          <button 
            className="flex items-center gap-1 px-2 py-1" 
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Menu className="w-5 h-5" />
            <span>Menu</span>
          </button>
        </div>

        <div className="flex items-center mx-4 flex-1">
          <div className="relative flex items-center w-full max-w-xl">
            <input type="text" placeholder="Search IMDb" className="w-full px-4 py-1.5 text-black" />
            <button className="absolute right-0 px-2">
              <Search className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        </div>
      </header>

      {/* Dropdown Menu */}
      {menuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-95 z-50 flex justify-center overflow-y-auto">
          <div className="relative w-full max-w-7xl mx-auto py-8 px-4">
            <button 
              className="absolute top-0 right-4 p-2 text-white"
              onClick={() => setMenuOpen(false)}
            >
              <X className="w-8 h-8" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-12 mt-12">
              {/* Movies Section */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4v16M17 4v16M3 8h18M3 16h18" />
                  </svg>
                  <h2 className="text-xl font-semibold">Movies</h2>
                </div>
                <nav className="flex flex-col space-y-4">
                  <Link href="/calendar" className="hover:text-gray-300">Release Calendar</Link>
                  <Link href="/top250" className="hover:text-gray-300">Top 250 Movies</Link>
                  <Link href="/popular" className="hover:text-gray-300">Most Popular Movies</Link>
                  <Link href="/browse" className="hover:text-gray-300">Browse Movies by Genre</Link>
                  <Link href="/boxoffice" className="hover:text-gray-300">Top Box Office</Link>
                  <Link href="/showtimes" className="hover:text-gray-300">Showtimes & Tickets</Link>
                  <Link href="/news" className="hover:text-gray-300">Movie News</Link>
                  <Link href="/india" className="hover:text-gray-300">India Movie Spotlight</Link>
                </nav>
              </div>

              {/* TV Shows Section */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <h2 className="text-xl font-semibold">TV Shows</h2>
                </div>
                <nav className="flex flex-col space-y-4">
                  <Link href="/tv/whats-on" className="hover:text-gray-300">What's on TV & Streaming</Link>
                  <Link href="/tv/top250" className="hover:text-gray-300">Top 250 TV Shows</Link>
                  <Link href="/tv/popular" className="hover:text-gray-300">Most Popular TV Shows</Link>
                  <Link href="/tv/browse" className="hover:text-gray-300">Browse TV Shows by Genre</Link>
                  <Link href="/tv/news" className="hover:text-gray-300">TV News</Link>
                </nav>
              </div>

              {/* Watch Section */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h2 className="text-xl font-semibold">Watch</h2>
                </div>
                <nav className="flex flex-col space-y-4">
                  <Link href="/what-to-watch" className="hover:text-gray-300">What to Watch</Link>
                  <Link href="/trailers" className="hover:text-gray-300">Latest Trailers</Link>
                  <Link href="/originals" className="hover:text-gray-300">IMDb Originals</Link>
                  <Link href="/picks" className="hover:text-gray-300">IMDb Picks</Link>
                  <Link href="/spotlight" className="hover:text-gray-300">IMDb Spotlight</Link>
                  <Link href="/podcasts" className="hover:text-gray-300">IMDb Podcasts</Link>
                </nav>
              </div>

              {/* Awards & Events Section */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                  <h2 className="text-xl font-semibold">Awards & Events</h2>
                </div>
                <nav className="flex flex-col space-y-4">
                  <Link href="/oscars" className="hover:text-gray-300">Oscars</Link>
                  <Link href="/cannes" className="hover:text-gray-300">Cannes Film Festival</Link>
                  <Link href="/starwars" className="hover:text-gray-300">Star Wars</Link>
                  <Link href="/sxsw" className="hover:text-gray-300">SXSW Film Festival</Link>
                  <Link href="/starmeter" className="hover:text-gray-300">STARmeter Awards</Link>
                  <Link href="/awards" className="hover:text-gray-300">Awards Central</Link>
                  <Link href="/festival" className="hover:text-gray-300">Festival Central</Link>
                  <Link href="/events" className="hover:text-gray-300">All Events</Link>
                </nav>
              </div>

              {/* Split the last column into two sections */}
              <div className="space-y-12">
                {/* Celebs Section */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <h2 className="text-xl font-semibold">Celebs</h2>
                  </div>
                  <nav className="flex flex-col space-y-4">
                    <Link href="/born-today" className="hover:text-gray-300">Born Today</Link>
                    <Link href="/most-popular-celebs" className="hover:text-gray-300">Most Popular Celebs</Link>
                    <Link href="/celebrity-news" className="hover:text-gray-300">Celebrity News</Link>
                  </nav>
                </div>

                {/* Community Section */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <h2 className="text-xl font-semibold">Community</h2>
                  </div>
                  <nav className="flex flex-col space-y-4">
                    <Link href="/help" className="hover:text-gray-300">Help Center</Link>
                    <Link href="/contributor" className="hover:text-gray-300">Contributor Zone</Link>
                    <Link href="/polls" className="hover:text-gray-300">Polls</Link>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
} 