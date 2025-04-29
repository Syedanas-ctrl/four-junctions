'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { useParams, useRouter } from 'next/navigation'
import { Header } from '@/components/Header'
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks'
import { fetchMovieByImdbId, updateMovie, createMovie, selectSelectedMovie, selectMovieStatus } from '@/lib/redux/features/movieSlice'
import { Actor } from '@/lib/types/actors'
import { Producer } from '@/lib/types/producers'
import ActorSelectionModal from '@/components/ActorSelectionModal'
import ProducerSelectionModal from '@/components/ProducerSelectionModal'

export default function EditMoviePage() {
  const { imdbId } = useParams()
  const router = useRouter()
  const dispatch = useAppDispatch()
  const movie = useAppSelector(selectSelectedMovie)
  const status = useAppSelector(selectMovieStatus)

  const [formData, setFormData] = useState({
    primaryTitle: '',
    originalTitle: '',
    description: '',
    primaryImage: '',
    startYear: 0,
    contentRating: '',
    runtimeMinutes: 0,
    genres: [] as string[],
    language: '',
    averageRating: 0,
    numVotes: 0,
    countriesOfOrigin: [] as string[],
    spokenLanguages: [] as string[],
    budget: 0,
    grossWorldwide: 0,
    imdbId: '',
    actors: [] as Actor[],
    url: '',
    endYear: 0,
    releaseDate: '',
    interests: [] as string[],
    externalLinks: [] as string[],
    filmingLocations: [] as string[],
  })

  const [selectedActors, setSelectedActors] = useState<Actor[]>([])
  const [selectedProducer, setSelectedProducer] = useState<Producer | null>(null)
  const [newGenre, setNewGenre] = useState('')
  const [newOrigin, setNewOrigin] = useState('')
  const [newLanguage, setNewLanguage] = useState('')
  
  const [isActorModalOpen, setIsActorModalOpen] = useState(false)
  const [isProducerModalOpen, setIsProducerModalOpen] = useState(false)

  // Fetch movie data if editing an existing movie
  useEffect(() => {
    if (imdbId && imdbId !== 'new') {
      dispatch(fetchMovieByImdbId(imdbId as string))
    }
  }, [dispatch, imdbId])

  // Populate form when movie data is loaded
  useEffect(() => {
    if (movie && imdbId !== 'new') {
      setFormData({
        primaryTitle: movie.primaryTitle || '',
        originalTitle: movie.originalTitle || '',
        description: movie.description || '',
        primaryImage: movie.primaryImage || '',
        startYear: movie.startYear || 0,
        contentRating: movie.contentRating || '',
        runtimeMinutes: movie.runtimeMinutes || 0,
        genres: movie.genres || [],
        language: movie.language || '',
        averageRating: movie.averageRating || 0,
        numVotes: movie.numVotes || 0,
        countriesOfOrigin: movie.countriesOfOrigin || [],
        spokenLanguages: movie.spokenLanguages || [],
        budget: movie.budget || 0,
        grossWorldwide: movie.grossWorldwide || 0,
        imdbId: movie.imdbId || '',
        actors: movie.actors || [],
        url: movie.url || '',
        endYear: movie.endYear || 0,
        releaseDate: movie.releaseDate || '',
        interests: movie.interests || [],
        externalLinks: movie.externalLinks || [],
        filmingLocations: movie.filmingLocations || [],
      })
      
      setSelectedActors(movie.actors || [])
      setSelectedProducer(movie.producer || null)
    }
  }, [movie, imdbId])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: Number(value)
    })
  }

  const addGenre = () => {
    if (newGenre && !formData.genres.includes(newGenre)) {
      setFormData({
        ...formData,
        genres: [...formData.genres, newGenre]
      })
      setNewGenre('')
    }
  }

  const removeGenre = (genre: string) => {
    setFormData({
      ...formData,
      genres: formData.genres.filter(g => g !== genre)
    })
  }

  const addOrigin = () => {
    if (newOrigin && !formData.countriesOfOrigin.includes(newOrigin)) {
      setFormData({
        ...formData,
        countriesOfOrigin: [...formData.countriesOfOrigin, newOrigin]
      })
      setNewOrigin('')
    }
  }

  const removeOrigin = (origin: string) => {
    setFormData({
      ...formData,
      countriesOfOrigin: formData.countriesOfOrigin.filter(o => o !== origin)
    })
  }

  const addLanguage = () => {
    if (newLanguage && !formData.spokenLanguages.includes(newLanguage)) {
      setFormData({
        ...formData,
        spokenLanguages: [...formData.spokenLanguages, newLanguage]
      })
      setNewLanguage('')
    }
  }

  const removeLanguage = (language: string) => {
    setFormData({
      ...formData,
      spokenLanguages: formData.spokenLanguages.filter(l => l !== language)
    })
  }

  const handleActorSelect = (actor: Actor) => {
    setSelectedActors([...selectedActors, actor])
    setIsActorModalOpen(false)
  }

  const removeActor = (actorId: number) => {
    setSelectedActors(selectedActors.filter(actor => actor.id !== actorId))
  }

  const handleProducerSelect = (producer: Producer) => {
    setSelectedProducer(producer)
    setIsProducerModalOpen(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate all required fields
    if (!formData.primaryTitle.trim()) {
      window.alert('Primary Title is required. Please enter a primary title for the movie')
      return
    }
    if (!formData.description.trim()) {
      window.alert('Description is required. Please enter a description for the movie')
      return
    }
    if (!formData.primaryImage.trim()) {
      window.alert('Primary Image URL is required. Please enter an image URL for the movie')
      return
    }
    if (formData.startYear <= 0) {
      window.alert('Start Year is required. Please enter a valid start year for the movie')
      return
    }
    if (formData.runtimeMinutes <= 0) {
      window.alert('Runtime is required. Please enter a valid runtime in minutes')
      return
    }
    if (formData.genres.length === 0) {
      window.alert('Please add at least one genre for the movie')
      return
    }
    if (!selectedProducer) {
      window.alert('Producer is required. Please select a producer for the movie')
      return
    }
    
    const movieData = {
      ...formData,
      actors: selectedActors,
      producer: selectedProducer || undefined,
    }
    
    try {
      if (imdbId && imdbId !== 'new') {
        // Update existing movie
        await dispatch(updateMovie({ 
          id: movie?.id as number, 
          movie: movieData 
        }))
        router.push(`/movie/${imdbId}`)
      } else {
        // Create new movie with generated IMDb ID
        const randomImdbId = `tt${Math.floor(Math.random() * 10000000)}`
        
        // Check if producer exists before creating movie
        if (!selectedProducer) {
          alert('Please select a producer before creating a movie');
          return;
        }
        
        await dispatch(createMovie({
            ...movieData,
            imdbId: randomImdbId,
            type: 'movie',
            isAdult: 0,
            producerId: selectedProducer.id,
            categories: [],
            producer: selectedProducer, // This should be non-null since we checked above
        }))
        router.push('/category/most-popular-movies')
      }
    } catch (error) {
      console.error('Error saving movie:', error)
    }
  }

  if (status === 'loading' && imdbId !== 'new') {
    return (
      <div className="max-w-6xl min-h-screen md:px-36 bg-black text-white">
        <Header />
        <div className="flex justify-center items-center h-96">
          <p className="text-xl">Loading movie details...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl min-h-screen  mx-auto">
      <Header />
      
      <div className="px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">
          {imdbId === 'new' ? 'Add New Movie' : 'Edit Movie'}
        </h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Movie Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">
                Primary Title
                <input
                  type="text"
                  name="primaryTitle"
                  value={formData.primaryTitle}
                  onChange={handleInputChange}
                  className="mt-1 block w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white"
                  required
                />
              </label>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">
                Original Title
                <input
                  type="text"
                  name="originalTitle"
                  value={formData.originalTitle}
                  onChange={handleInputChange}
                  className="mt-1 block w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white"
                />
              </label>
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-2">
                Description
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={4}
                  className="mt-1 block w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white"
                  required
                />
              </label>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">
                Primary Image URL
                <input
                  type="text"
                  name="primaryImage"
                  value={formData.primaryImage}
                  onChange={handleInputChange}
                  className="mt-1 block w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white"
                  required
                />
              </label>
              
              {formData.primaryImage && (
                <div className="mt-2 relative h-40 w-28">
                  <Image
                    src={formData.primaryImage}
                    alt="Movie poster preview"
                    fill
                    className="object-cover rounded"
                  />
                </div>
              )}
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Year
                  <input
                    type="number"
                    name="startYear"
                    value={formData.startYear}
                    onChange={handleNumberChange}
                    className="mt-1 block w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white"
                    required
                  />
                </label>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">
                  Runtime (minutes)
                  <input
                    type="number"
                    name="runtimeMinutes"
                    value={formData.runtimeMinutes}
                    onChange={handleNumberChange}
                    className="mt-1 block w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white"
                    required
                  />
                </label>
              </div>
            </div>
          </div>
          
          {/* Rating Information */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">
                Content Rating
                <input
                  type="text"
                  name="contentRating"
                  value={formData.contentRating}
                  onChange={handleInputChange}
                  className="mt-1 block w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white"
                />
              </label>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">
                Average Rating
                <input
                  type="number"
                  name="averageRating"
                  value={formData.averageRating}
                  onChange={handleNumberChange}
                  step="0.1"
                  min="0"
                  max="10"
                  className="mt-1 block w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white"
                />
              </label>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">
                Number of Votes
                <input
                  type="number"
                  name="numVotes"
                  value={formData.numVotes}
                  onChange={handleNumberChange}
                  className="mt-1 block w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white"
                />
              </label>
            </div>
          </div>
          
          {/* Financial Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">
                Budget ($)
                <input
                  type="number"
                  name="budget"
                  value={formData.budget}
                  onChange={handleNumberChange}
                  className="mt-1 block w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white"
                />
              </label>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">
                Worldwide Gross ($)
                <input
                  type="number"
                  name="grossWorldwide"
                  value={formData.grossWorldwide}
                  onChange={handleNumberChange}
                  className="mt-1 block w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white"
                />
              </label>
            </div>
          </div>
          
          {/* Genres */}
          <div>
            <h3 className="text-lg font-medium mb-3">Genres</h3>
            <div className="flex flex-wrap gap-2 mb-3">
              {formData.genres.map((genre, index) => (
                <div key={index} className="flex items-center bg-blue-900 rounded-full px-3 py-1">
                  <span className="text-sm">{genre}</span>
                  <button 
                    type="button" 
                    onClick={() => removeGenre(genre)}
                    className="ml-2 text-xs text-white/70 hover:text-white"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
            <div className="flex">
              <input
                type="text"
                value={newGenre}
                onChange={(e) => setNewGenre(e.target.value)}
                placeholder="Add a genre"
                className="flex-grow bg-gray-800 border border-gray-700 rounded-l px-3 py-2 text-white"
              />
              <button
                type="button"
                onClick={addGenre}
                className="bg-blue-600 text-white px-4 py-2 rounded-r"
              >
                Add
              </button>
            </div>
          </div>
          
          {/* Countries of Origin */}
          <div>
            <h3 className="text-lg font-medium mb-3">Countries of Origin</h3>
            <div className="flex flex-wrap gap-2 mb-3">
              {formData.countriesOfOrigin.map((origin, index) => (
                <div key={index} className="flex items-center bg-blue-900 rounded-full px-3 py-1">
                  <span className="text-sm">{origin}</span>
                  <button 
                    type="button" 
                    onClick={() => removeOrigin(origin)}
                    className="ml-2 text-xs text-white/70 hover:text-white"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
            <div className="flex">
              <input
                type="text"
                value={newOrigin}
                onChange={(e) => setNewOrigin(e.target.value)}
                placeholder="Add a country"
                className="flex-grow bg-gray-800 border border-gray-700 rounded-l px-3 py-2 text-white"
              />
              <button
                type="button"
                onClick={addOrigin}
                className="bg-blue-600 text-white px-4 py-2 rounded-r"
              >
                Add
              </button>
            </div>
          </div>
          
          {/* Languages */}
          <div>
            <h3 className="text-lg font-medium mb-3">Languages</h3>
            <div className="mb-3">
              <label className="block text-sm font-medium mb-2">
                Primary Language
                <input
                  type="text"
                  name="language"
                  value={formData.language}
                  onChange={handleInputChange}
                  className="mt-1 block w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white"
                />
              </label>
            </div>
            <div className="flex flex-wrap gap-2 mb-3">
              {formData.spokenLanguages.map((language, index) => (
                <div key={index} className="flex items-center bg-blue-900 rounded-full px-3 py-1">
                  <span className="text-sm">{language}</span>
                  <button 
                    type="button" 
                    onClick={() => removeLanguage(language)}
                    className="ml-2 text-xs text-white/70 hover:text-white"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
            <div className="flex">
              <input
                type="text"
                value={newLanguage}
                onChange={(e) => setNewLanguage(e.target.value)}
                placeholder="Add a language"
                className="flex-grow bg-gray-800 border border-gray-700 rounded-l px-3 py-2 text-white"
              />
              <button
                type="button"
                onClick={addLanguage}
                className="bg-blue-600 text-white px-4 py-2 rounded-r"
              >
                Add
              </button>
            </div>
          </div>
          
          {/* Cast Section */}
          <div>
            <h3 className="text-lg font-medium mb-3">Cast</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              {selectedActors.map((actor) => (
                <div key={actor.id} className="flex items-center bg-gray-800 p-3 rounded">
                  <div className="relative h-12 w-12 rounded-full overflow-hidden mr-3">
                    <Image 
                      src={actor.primaryImage || '/actor-placeholder.jpg'} 
                      alt={actor.fullName}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{actor.fullName}</p>
                  </div>
                  <button 
                    type="button"
                    onClick={() => removeActor(actor.id)}
                    className="text-red-400 hover:text-red-300"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={() => setIsActorModalOpen(true)}
              className="w-full bg-gray-700 hover:bg-gray-600 text-white py-2 rounded"
            >
              Add Actor
            </button>
          </div>
          
          {/* Producer Section */}
          <div>
            <h3 className="text-lg font-medium mb-3">Producer</h3>
            {selectedProducer ? (
              <div className="flex items-center bg-gray-800 p-3 rounded mb-4">
                <div className="relative h-12 w-12 rounded-full overflow-hidden mr-3">
                  <Image 
                    src={selectedProducer.primaryImage || '/producer-placeholder.jpg'} 
                    alt={selectedProducer.fullName}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <p className="font-medium">{selectedProducer.fullName}</p>
                </div>
                <button 
                  type="button"
                  onClick={() => setSelectedProducer(null)}
                  className="text-red-400 hover:text-red-300"
                >
                  Remove
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setIsProducerModalOpen(true)}
                className="w-full bg-gray-700 hover:bg-gray-600 text-white py-2 rounded mb-4"
              >
                Select Producer
              </button>
            )}
          </div>
          
          {/* Submit Button */}
          <div className="flex justify-end pt-4">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded"
            >
              {imdbId === 'new' ? 'Create Movie' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
      
      {/* Modals */}
      <ActorSelectionModal
        isOpen={isActorModalOpen}
        onClose={() => setIsActorModalOpen(false)}
        onSelect={handleActorSelect}
        selectedActorIds={selectedActors.map(actor => actor.id)}
      />
      
      <ProducerSelectionModal
        isOpen={isProducerModalOpen}
        onClose={() => setIsProducerModalOpen(false)}
        onSelect={handleProducerSelect}
      />
    </div>
  )
} 