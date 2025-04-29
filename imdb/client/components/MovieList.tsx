import { Info, Star } from "lucide-react";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Movie } from "@/lib/types/movies";
import dayjs from "dayjs";

const MovieList = ({ movies, status }: { movies: Movie[], status: string }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const moviesPerPage = 10;
  
  // Calculate pagination
  const totalPages = Math.ceil(movies.length / moviesPerPage);
  const startIndex = (currentPage - 1) * moviesPerPage;
  const endIndex = startIndex + moviesPerPage;
  const currentMovies = movies.slice(startIndex, endIndex);

  return (
    <div className="space-y-4">
      {movies.length > 0 ? (
        <>
          {currentMovies.map((movie) => (
            <div key={movie.id} className="flex border-b border-gray-200 p-4">
              <Link href={`/movie/${movie.imdbId}`} className="flex-shrink-0 relative w-16 h-24 mr-4">
                <Image
                  src={`${movie.primaryImage}?height=96&width=64`}
                  alt={movie.primaryTitle}
                  width={64}
                  height={96}
                  className="object-cover"
                />
                <button className="absolute top-1 left-1 bg-black/70 rounded-full p-0.5">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                  </svg>
                </button>
              </Link>
              <div className="flex-1">
                <Link href={`/movie/${movie.imdbId}`} className="hover:text-[#3976db]">
                  <h3 className="text-lg font-bold">{movie.primaryTitle}</h3>
                </Link>
                <div className="text-sm text-gray-600 mb-2">
                  {dayjs(movie.releaseDate).format("YYYY")} · {movie.runtimeMinutes}m
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-[#f5c518] fill-[#f5c518]" />
                    <span className="ml-1 font-medium">
                      {movie.averageRating} ({movie.numVotes >= 1000000 
                        ? `${(movie.numVotes / 1000000).toFixed(1)}M` 
                        : movie.numVotes >= 1000 
                          ? `${(movie.numVotes / 1000).toFixed(1)}K` 
                          : movie.numVotes})
                    </span>
                  </div>
                  <button disabled className="flex items-center text-[#3976db]">
                    <Star className="w-4 h-4 mr-1" />
                    Rate
                  </button>
                  <button disabled className="flex items-center text-[#3976db]">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="mr-1">
                      <polyline points="9 11 12 14 22 4"></polyline>
                      <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                    </svg>
                    Mark as watched
                  </button>
                </div>
              </div>
              <Link href={`/movie/${movie.imdbId}`} className="ml-2">
                <Info className="w-5 h-5 text-gray-400 hover:text-[#3976db]" />
              </Link>
            </div>
          ))}
          
          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-4">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 rounded border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
              >
                Previous
              </button>
              
              <span className="text-sm text-gray-600">
                Page {currentPage} of {totalPages}
              </span>
              
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 rounded border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
              >
                Next
              </button>
            </div>
          )}
        </>
      ) : (
        (status === 'loading' || status === 'failed') ? (
          <div className="flex justify-center items-center h-full">
            <p className="text-gray-400">{status === 'loading' ? 'Loading...' : 'Failed to fetch movies'}</p>
          </div>
        ) : (
          <div className="flex justify-center items-center h-full">
            <p className="text-gray-400">No movies found</p>
          </div>
        )
      )}
    </div>
  );
};

export default MovieList;
