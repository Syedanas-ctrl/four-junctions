"use client"

import Image from "next/image"
import Link from "next/link"
import { ChevronRight } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative">
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/70 via-transparent to-transparent"></div>
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-transparent via-transparent to-black"></div>

      {/* Navigation Arrows */}
      <button className="absolute left-0 top-1/2 z-20 -translate-y-1/2 bg-black/30 p-4 hover:bg-black/50">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
      </button>
      <button className="absolute right-0 top-1/2 z-20 -translate-y-1/2 bg-black/30 p-4 hover:bg-black/50">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      </button>

      <div className="relative flex">
        {/* Main Hero Image */}
        <div className="relative w-full h-[450px]">
          <Image
            src="https://4kwallpapers.com/images/wallpapers/marvels-avengers-marvel-superheroes-playstation-4-3440x1440-4965.jpg?height=450&width=800"
            alt="I Know What You Did Last Summer"
            width={800}
            height={450}
            className="w-full h-full object-cover"
          />

          {/* Movie Poster Thumbnail */}
          <div className="absolute left-6 bottom-6 z-20 w-32 h-44 border border-gray-700 shadow-lg">
            <Image
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsqp15FUcVO6qQ-2QLnFk0TYXU1E17eDrNmw&s?height=176&width=128"
              alt="Movie Poster"
              width={128}
              height={176}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Play Button and Title */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center">
            <button className="w-16 h-16 rounded-full bg-black/50 flex items-center justify-center mb-4 hover:bg-black/70">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="white" stroke="none">
                <polygon points="5 3 19 12 5 21 5 3"></polygon>
              </svg>
            </button>
            <h1 className="text-4xl font-bold text-center text-white mb-2">'I Know What You Did Last Summer'</h1>
            <p className="text-lg text-gray-300">Watch the Trailer</p>
            <div className="flex items-center gap-4 mt-2">
              <div className="flex items-center">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  className="text-gray-400"
                >
                  <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
                </svg>
                <span className="ml-1">391</span>
              </div>
              <div className="flex items-center">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  className="text-gray-400"
                >
                  <path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h3a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2h-3"></path>
                </svg>
                <span className="ml-1">135</span>
              </div>
            </div>
            <div className="absolute right-[-300px] bottom-0 text-white text-xl">2:04</div>
          </div>
        </div>

        {/* Up Next Section */}
        <div className="w-[350px] flex-shrink-0 bg-black">
          <h2 className="text-xl font-bold text-[#f5c518] p-4">Up next</h2>

          {/* Video 1 */}
          <div className="flex p-4 hover:bg-gray-900 cursor-pointer">
            <div className="w-32 h-20 relative flex-shrink-0">
              <Image
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsqp15FUcVO6qQ-2QLnFk0TYXU1E17eDrNmw&s?height=80&width=128"
                alt="The Rise of Pedro Pascal"
                width={128}
                height={80}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-8 h-8 rounded-full bg-black/50 flex items-center justify-center">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="white" stroke="none">
                    <polygon points="5 3 19 12 5 21 5 3"></polygon>
                  </svg>
                </div>
              </div>
              <div className="absolute bottom-1 right-1 bg-black/70 text-white text-xs px-1">4:33</div>
            </div>
            <div className="ml-3">
              <h3 className="font-medium">The Rise of Pedro Pascal</h3>
              <p className="text-sm text-gray-400">From "Buffy the Vampire Slayer" to "The Last of Us"</p>
              <div className="flex items-center gap-2 mt-1">
                <div className="flex items-center">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    className="text-gray-400"
                  >
                    <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
                  </svg>
                  <span className="ml-1 text-xs">178</span>
                </div>
                <div className="flex items-center">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    className="text-gray-400"
                  >
                    <path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h3a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2h-3"></path>
                  </svg>
                  <span className="ml-1 text-xs">83</span>
                </div>
              </div>
            </div>
          </div>

          {/* Video 2 */}
          <div className="flex p-4 hover:bg-gray-900 cursor-pointer">
            <div className="w-32 h-20 relative flex-shrink-0">
              <Image
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsqp15FUcVO6qQ-2QLnFk0TYXU1E17eDrNmw&s?height=80&width=128"
                alt="The Summer I Turned Pretty"
                width={128}
                height={80}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-8 h-8 rounded-full bg-black/50 flex items-center justify-center">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="white" stroke="none">
                    <polygon points="5 3 19 12 5 21 5 3"></polygon>
                  </svg>
                </div>
              </div>
              <div className="absolute bottom-1 right-1 bg-black/70 text-white text-xs px-1">0:54</div>
            </div>
            <div className="ml-3">
              <h3 className="font-medium">"The Summer I Turned Pretty"</h3>
              <p className="text-sm text-gray-400">Watch the Season 3 Teaser</p>
              <div className="flex items-center gap-2 mt-1">
                <div className="flex items-center">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    className="text-gray-400"
                  >
                    <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
                  </svg>
                  <span className="ml-1 text-xs">39</span>
                </div>
                <div className="flex items-center">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    className="text-gray-400"
                  >
                    <path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h3a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2h-3"></path>
                  </svg>
                  <span className="ml-1 text-xs">24</span>
                </div>
              </div>
            </div>
          </div>

          {/* Video 3 */}
          <div className="flex p-4 hover:bg-gray-900 cursor-pointer">
            <div className="w-32 h-20 relative flex-shrink-0">
              <Image
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsqp15FUcVO6qQ-2QLnFk0TYXU1E17eDrNmw&s?height=80&width=128"
                alt="The Last Of Us"
                width={128}
                height={80}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-8 h-8 rounded-full bg-black/50 flex items-center justify-center">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="white" stroke="none">
                    <polygon points="5 3 19 12 5 21 5 3"></polygon>
                  </svg>
                </div>
              </div>
              <div className="absolute bottom-1 right-1 bg-black/70 text-white text-xs px-1">1:15</div>
            </div>
            <div className="ml-3">
              <h3 className="font-medium">Watch "The Last Of Us" Side by Side</h3>
              <p className="text-sm text-gray-400">Scene Comparisons</p>
              <p className="text-xs text-gray-400">Take a Look Back at Season 1</p>
              <div className="flex items-center gap-2 mt-1">
                <div className="flex items-center">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    className="text-gray-400"
                  >
                    <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
                  </svg>
                  <span className="ml-1 text-xs">24</span>
                </div>
                <div className="flex items-center">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    className="text-gray-400"
                  >
                    <path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h3a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2h-3"></path>
                  </svg>
                  <span className="ml-1 text-xs">11</span>
                </div>
              </div>
            </div>
          </div>

          <Link href="/trailers" className="flex items-center text-[#5699ef] p-4 font-medium">
            Browse trailers <ChevronRight className="w-5 h-5 ml-1" />
          </Link>
        </div>
      </div>
    </section>
  )
} 