'use client'
import Image from "next/image"
import Link from "next/link"
import { ChevronDown, ChevronRight, Info, Menu, Search, Share2, Star, Plus } from "lucide-react"
import { Header } from "@/components/Header"
import { TopTenMovies } from "@/components/TopTenMovies"
import { FanFavorites } from "@/components/FanFavorites"
import SidebarList from "@/components/SidebarList"
import MovieList from "@/components/MovieList"
import { useParams } from "next/navigation";
import { MovieCategories, MovieCategoriesLabels } from "@/lib/types/movies";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks"
import { fetchMovies, selectAllMovies, selectMovieStatus } from "@/lib/redux/features/movieSlice";
import { useEffect } from "react";

export default function Page() {
  const { type } = useParams();
  const dispatch = useAppDispatch();
  const movies = useAppSelector(selectAllMovies);
  const status = useAppSelector(selectMovieStatus);
  useEffect(() => {
    dispatch(fetchMovies(type as MovieCategories));
  }, [dispatch, type]);
  return (
    <div className="md:px-36 min-h-screen bg-black">
      {/* Navigation Bar */}
     <Header />

      {/* Main Content */}
      <main className="max-w-6xl px-4 py-6 h-screen bg-white text-black">
        <div className="flex justify-between items-center mb-2">
          <h1 className="text-2xl font-bold">IMDb Charts</h1>
          <button className="flex items-center gap-1 text-sm">
            Share <Share2 className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-start">
          {/* Left Content */}
          <div className="flex-1 pr-8">
            <h2 className="text-3xl font-bold border-l-4 border-[#f5c518] pl-3 mb-2">{MovieCategoriesLabels[type as MovieCategories]}</h2>
            <p className="text-sm text-gray-600 mb-6">As rated by regular IMDb voters.</p>

            <div className="flex justify-between items-center mb-4">
              <div className="text-sm">
                <span className="font-bold">0 OF {movies.length} WATCHED</span>
              </div>
              <div className="flex items-center gap-2">
                <Link href="/movie/new" className="flex items-center gap-1 bg-[#f5c518] text-black px-3 py-1.5 rounded font-medium">
                  <Plus className="w-4 h-4" />
                  <span>Add Movie</span>
                </Link>
                <span className="text-sm">{movies.length} Titles</span>
              </div>
            </div>

            <div className="flex justify-between items-center mb-6">
              <button className="bg-[#3976db] text-white px-3 py-1.5 rounded flex items-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="4" y1="9" x2="20" y2="9"></line>
                  <line x1="4" y1="15" x2="20" y2="15"></line>
                  <line x1="10" y1="3" x2="8" y2="21"></line>
                  <line x1="16" y1="3" x2="14" y2="21"></line>
                </svg>
              </button>
              <div className="flex items-center gap-2">
                <span className="text-sm">Sort by</span>
                <button className="flex items-center text-[#3976db] font-medium">
                  Ranking <ChevronDown className="w-4 h-4 ml-1" />
                </button>
                <button className="p-1">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3976db" strokeWidth="2">
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <polyline points="19 12 12 19 5 12"></polyline>
                  </svg>
                </button>
              </div>
            </div>

            {/* Movie List */}
            <MovieList movies={movies} status={status} />
          </div>

          {/* Right Sidebar */}
          <SidebarList />
        </div>
      </main>
      
      {/* Additional Components */}
      <TopTenMovies />
      <FanFavorites />
    </div>
  )
}
