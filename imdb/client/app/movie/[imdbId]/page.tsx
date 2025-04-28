'use client'
import { useEffect } from 'react'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { Star, Edit } from 'lucide-react'
import { Header } from '@/components/Header'
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks'
import { fetchMovieByImdbId, selectSelectedMovie, selectMovieStatus, selectMovieError } from '@/lib/redux/features/movieSlice'
import Link from 'next/link'

export default function MovieDetailPage() {
  const { imdbId } = useParams()
  const dispatch = useAppDispatch()
  const movie = useAppSelector(selectSelectedMovie)
  const status = useAppSelector(selectMovieStatus)
  const error = useAppSelector(selectMovieError)

  useEffect(() => {
    if (imdbId) {
      dispatch(fetchMovieByImdbId(imdbId as string))
    }
  }, [dispatch, imdbId])

  if (status === 'loading') {
    return (
      <div className="max-w-6xl min-h-screen md:px-36 bg-black text-white">
        <Header />
        <div className="flex justify-center items-center h-96">
          <p className="text-xl">Loading movie details...</p>
        </div>
      </div>
    )
  }

  if (status === 'failed' || !movie) {
    return (
      <div className="max-w-6xl min-h-screen md:px-36 bg-black text-white">
        <Header />
        <div className="flex flex-col justify-center items-center h-96">
          <p className="text-xl text-red-500">Failed to load movie details</p>
          <p className="mt-2">{error || 'Unknown error occurred'}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl min-h-screen bg-black text-white mx-auto">
      {/* Navigation Bar */}
      <Header />

      {/* Hero Section with Movie Backdrop */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent z-10"></div>
        <div className="relative h-[28rem] w-full overflow-hidden">
          <Image 
            src={movie.primaryImage || '/placeholder.jpg'} 
            alt={movie.primaryTitle}
            fill
            className="object-cover opacity-40"
            priority
          />
        </div>

        {/* Movie Details Overlay */}
        <div className="absolute top-0 left-0 right-0 z-20 pt-16 px-4 md:px-36">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Movie Poster */}
            <div className="flex-shrink-0 relative w-64 h-96 rounded overflow-hidden shadow-lg">
              <Image 
                src={movie.primaryImage || '/placeholder.jpg'} 
                alt={movie.primaryTitle}
                fill
                className="object-cover"
              />
            </div>

            {/* Movie Information */}
            <div className="flex-1">
              <h1 className="text-4xl font-bold mb-2">{movie.primaryTitle}</h1>
              {movie.originalTitle !== movie.primaryTitle && (
                <h2 className="text-xl text-gray-300 mb-4">Original title: {movie.originalTitle}</h2>
              )}
              
              <div className="flex items-center gap-2 text-sm text-gray-300 mb-4">
                <span>{movie.startYear}</span>
                <span>•</span>
                <span>{movie.contentRating}</span>
                <span>•</span>
                <span>{movie.runtimeMinutes}m</span>
              </div>
              
              <div className="flex items-center gap-6 mb-6">
                <div className="flex flex-col items-center">
                  <div className="flex items-center gap-1">
                    <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                    <span className="font-bold">{movie.averageRating}</span>
                    <span className="text-sm text-gray-400">/10</span>
                  </div>
                  <span className="text-xs text-gray-400">{movie.numVotes}M</span>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4 mb-6">
                <Link href={`/movie/edit/${imdbId}`} className="flex whitespace-nowrap items-center justify-center gap-2 bg-[#f5c518] text-black font-bold rounded px-4 py-2">
                  <Edit className="w-5 h-5" />
                  <span>Edit</span>
                </Link>
              </div>
              
              <p className="text-lg mb-6">{movie.description}</p>
              
              <div className="mb-6">
                <h3 className="text-lg font-bold mb-2">Genres</h3>
                <div className="flex flex-wrap gap-2">
                  {movie?.genres?.map((genre, index) => (
                    <span key={index} className="bg-white/10 rounded-full px-3 py-1 text-sm">
                      {genre}
                    </span>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-bold mb-2">Producers</h3>
                <div className="flex items-start">
                
                {
                  movie.producer?.primaryImage && (
                    <div className="flex-shrink-0 relative w-24 h-24 mr-3 rounded-full overflow-hidden">
                      <Image 
                        src={movie.producer?.primaryImage} 
                        alt={movie.producer?.fullName || 'Unknown Producer'}
                        fill
                        className="object-cover"
                  />
                </div>
                )
                }
                {
                  movie?.producer && (
                    <div className='pt-2'>
                      <p className="font-bold text-blue-400 hover:underline cursor-pointer">{movie.producer.fullName}</p>
                    </div>
                  )
                }
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='w-full h-40' /> 
      </div>

      {/* More Details Section */}
      <div className="px-4 md:px-36 py-8">
        {/* Top Cast Section */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-bold">Top cast</h2>
              <span className="text-lg text-gray-400">{movie.actors?.length || 0}</span>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            {(movie?.actors)?.map((actor) => (
              <div key={actor.id} className="flex items-start">
                <div className="flex-shrink-0 relative w-24 h-24 mr-3 rounded-full overflow-hidden">
                  <Image 
                    src={actor.primaryImage || '/actor-placeholder.jpg'} 
                    alt={actor.fullName}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className='pt-2'>
                  <p className="font-bold text-blue-400 hover:underline cursor-pointer">{actor.fullName}</p>
                  <p className="text-sm text-gray-200">{actor.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="col-span-2">
            <h2 className="text-2xl font-bold mb-4">Storyline</h2>
            <p className="mb-6">{movie.description}</p>
            
            <h2 className="text-2xl font-bold mb-4">Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4">
              <div>
                <h3 className="text-lg font-bold">Release Date</h3>
                <p>{movie.releaseDate}</p>
              </div>
              <div>
                <h3 className="text-lg font-bold">Countries of Origin</h3>
                <p>{movie.countriesOfOrigin?.join(', ') || 'Unknown'}</p>
              </div>
              <div>
                <h3 className="text-lg font-bold">Languages</h3>
                <p>{movie.spokenLanguages?.join(', ') || movie.language || 'Unknown'}</p>
              </div>
              <div>
                <h3 className="text-lg font-bold">Budget</h3>
                <p>${movie.budget?.toLocaleString() || 'Unknown'}</p>
              </div>
              <div>
                <h3 className="text-lg font-bold">Worldwide Gross</h3>
                <p>${movie.grossWorldwide?.toLocaleString() || 'Unknown'}</p>
              </div>
              <div>
                <h3 className="text-lg font-bold">Filming Locations</h3>
                <p>{movie.filmingLocations?.join(', ') || 'Unknown'}</p>
              </div>
            </div>
          </div>
          
          <div>
            <h2 className="text-2xl font-bold mb-4">More Like This</h2>
            <div className="flex flex-col gap-4">
              {/* This would typically fetch similar movies */}
              <p className="text-gray-400">Similar movie recommendations would appear here.</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
} 