"use client"

import Image from "next/image"
import Link from "next/link"
import { Menu, Search, X } from "lucide-react"
import { useState, useEffect, useCallback } from "react"
import { Movie, MovieCategories, MovieCategoriesLabels } from "@/lib/types/movies"
import { API_URL } from "@/lib/constants"
import dayjs from "dayjs"

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState<Movie[]>([])
  const [showResults, setShowResults] = useState(false)

  const handleSearch = useCallback(async () => {
    if (searchTerm.trim() === '') {
      setSearchResults([])
      setShowResults(false)
      return
    }

    const response = await fetch(`${API_URL}/api/movies/search/${searchTerm}`)
    const data = await response.json()
    setSearchResults(data)
    setShowResults(true)
  }, [searchTerm])

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      if (searchTerm) {
        handleSearch()
      }
    }, 600) // 300ms delay

    return () => {
      clearTimeout(debounceTimer) // Clean up the timer on each searchTerm change
    }
  }, [searchTerm, handleSearch])

  return (
    <>
      <header className="flex items-center px-4 py-2 bg-black text-white relative">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex-shrink-0">
            <Image
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/IMDB_Logo_2016.svg/1280px-IMDB_Logo_2016.svg.png"
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
            <input 
              onChange={(e) => setSearchTerm(e.target.value)}
              type="text" 
              placeholder="Search IMDb" 
              className="w-full px-4 py-1.5 text-black"
              onFocus={() => setShowResults(true)}
              onBlur={() => {
                setTimeout(() => setShowResults(false), 200)
              }}
            />
            <button className="absolute right-0 px-2">
              <Search className="w-5 h-5 text-gray-500" />
            </button>

            {/* Search Results Dropdown */}
            {showResults && searchResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 bg-white text-black mt-1 rounded-md shadow-lg z-50 max-h-96 overflow-y-auto">
                {searchResults.map((movie, index) => (
                  <Link
                    key={movie.imdbId || index}
                    href={`/movie/${movie.imdbId}`}
                    className="flex items-center gap-3 p-3 hover:bg-gray-100 transition-colors"
                  >
                    {movie.primaryImage && (
                      <Image
                        src={movie.primaryImage}
                        alt={movie.primaryTitle}
                        width={40}
                        height={60}
                        className="object-cover rounded"
                      />
                    )}
                    <div>
                      <div className="font-medium">{movie.primaryTitle}</div>
                      <div className="text-sm text-gray-500">{dayjs(movie.releaseDate).format('YYYY')}</div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
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
                {
                  Object.values(MovieCategories).map((category) => (
                    <div key={category} className="mb-4">
                      <Link href={`/category/${category}`} className="flex items-center justify-between text-[#3976db] font-medium mb-1">
                        {MovieCategoriesLabels[category]}
                      </Link>
                      <p className="text-sm text-gray-600">From the past weekend</p>
                    </div>
                  ))
                }

                </nav>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
} 