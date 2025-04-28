"use client"

import Image from "next/image"
import Link from "next/link"

export function FeaturedToday() {
  return (
    <section className="max-w-7xl mx-auto px-4 mt-8">
      <h2 className="text-2xl font-bold text-[#f5c518] mb-4">Featured today</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* List 1 */}
        <div className="relative group cursor-pointer">
          <div className="relative h-[250px] overflow-hidden rounded">
            <Image
              src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjnsjBOjhuWOht-gfnfj6YgCdjA4sxOukRErKC5gA0WcpLL6P24KJGkTPwF9SL_g9WmIp-BXV4ibRJuuUqRm3iScqA1vEUM3ixkgMr8JPn4vG7ZasljWw26g3_i5jFmf6VlV0cway5pSH6-/w2560-h1600-c/avengers-endgame-movie-characters-uhdpaper.com-4K-52.jpg?height=250&width=500"
              alt="Hansal Mehta's Favourite Indian Female Actors"
              width={500}
              height={250}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-0 left-0 bg-[#f5c518] text-black px-2 py-1 text-sm font-medium flex items-center">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="8" y1="6" x2="21" y2="6"></line>
                <line x1="8" y1="12" x2="21" y2="12"></line>
                <line x1="8" y1="18" x2="21" y2="18"></line>
                <line x1="3" y1="6" x2="3.01" y2="6"></line>
                <line x1="3" y1="12" x2="3.01" y2="12"></line>
                <line x1="3" y1="18" x2="3.01" y2="18"></line>
              </svg>
              <span className="ml-1">List</span>
            </div>
            <div className="absolute top-4 right-4 bg-[#f5c518] text-black px-2 py-1 text-sm font-bold">
              FAVOURITE INDIAN FEMALE ACTORS
            </div>
          </div>
          <h3 className="text-lg font-bold mt-2">Hansal Mehta's Favourite Indian Female Actors</h3>
          <Link href="/list" className="text-[#5699ef] text-sm">
            See the list
          </Link>
        </div>

        {/* List 2 */}
        <div className="relative group cursor-pointer">
          <div className="relative h-[250px] overflow-hidden rounded">
            <Image
              src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjnsjBOjhuWOht-gfnfj6YgCdjA4sxOukRErKC5gA0WcpLL6P24KJGkTPwF9SL_g9WmIp-BXV4ibRJuuUqRm3iScqA1vEUM3ixkgMr8JPn4vG7ZasljWw26g3_i5jFmf6VlV0cway5pSH6-/w2560-h1600-c/avengers-endgame-movie-characters-uhdpaper.com-4K-52.jpg?height=250&width=500"
              alt="Hansal Mehta's List of Breakout Male Talent"
              width={500}
              height={250}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-0 left-0 bg-[#f5c518] text-black px-2 py-1 text-sm font-medium flex items-center">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="8" y1="6" x2="21" y2="6"></line>
                <line x1="8" y1="12" x2="21" y2="12"></line>
                <line x1="8" y1="18" x2="21" y2="18"></line>
                <line x1="3" y1="6" x2="3.01" y2="6"></line>
                <line x1="3" y1="12" x2="3.01" y2="12"></line>
                <line x1="3" y1="18" x2="3.01" y2="18"></line>
              </svg>
              <span className="ml-1">List</span>
            </div>
            <div className="absolute top-4 right-4 bg-[#f5c518] text-black px-2 py-1 text-sm font-bold">
              INDIAN MALE BREAKOUT TALENT
            </div>
          </div>
          <h3 className="text-lg font-bold mt-2">Hansal Mehta's List of Breakout Male Talent</h3>
          <Link href="/list" className="text-[#5699ef] text-sm">
            See the list
          </Link>
        </div>
      </div>
    </section>
  )
} 