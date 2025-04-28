"use client"

import { Header } from "@/components/Header"
import { HeroSection } from "@/components/HeroSection"
import { FeaturedToday } from "@/components/FeaturedToday"
import { PopularCelebrities } from "@/components/PopularCelebrities"
import { WhatToWatch } from "@/components/WhatToWatch"
import { Watchlist } from "@/components/Watchlist"
import { FanFavorites } from "@/components/FanFavorites"
import { TopTenMovies } from "@/components/TopTenMovies"

export default function IMDbHomepage() {
  return (
    <div className="min-h-screen md:px-36 bg-black text-white">
      <Header />

      {/* Main Content */}
      <main className="pb-8">
        <HeroSection />
        <FeaturedToday />
        <PopularCelebrities />
        {/* <TrendingTrailers /> */}
        <WhatToWatch />
        {/* <Ad /> */}
        <Watchlist />
        <TopTenMovies />
        <FanFavorites />
      </main>
    </div>
  )
}
