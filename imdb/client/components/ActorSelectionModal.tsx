import { useState, useEffect } from 'react'
import Image from 'next/image'
import { X, Search, Plus } from 'lucide-react'
import { Actor } from '@/lib/types/actors'
import { API_URL } from '@/lib/constants'
import ActorCreationForm from './ActorCreationForm'

interface ActorSelectionModalProps {
  isOpen: boolean
  onClose: () => void
  onSelect: (actor: Actor) => void
  selectedActorIds: number[]
}

const ActorSelectionModal = ({ isOpen, onClose, onSelect, selectedActorIds }: ActorSelectionModalProps) => {
  const [actors, setActors] = useState<Actor[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredActors, setFilteredActors] = useState<Actor[]>([])
  const [showCreationForm, setShowCreationForm] = useState(false);

  useEffect(() => {
    const fetchActors = async () => {
      try {
        setLoading(true)
        const response = await fetch(`${API_URL}/api/actors`)
        if (!response.ok) throw new Error('Failed to fetch actors')
        const data = await response.json()
        setActors(data)
        setFilteredActors(data)
      } catch (error) {
        console.error('Error fetching actors:', error)
      } finally {
        setLoading(false)
      }
    }
    
    if (isOpen) {
      fetchActors()
    }
  }, [isOpen])

  const handleSearch = async () => {
    const response = await fetch(`${API_URL}/api/actors/search/${searchTerm}`)
    const data = await response.json()
    setFilteredActors(data)
  }

  useEffect(() => {
    if (searchTerm) {
      const filtered = actors.filter(actor => 
        actor.fullName.toLowerCase().includes(searchTerm.toLowerCase())
      )
      setFilteredActors(filtered)
    } else {
      setFilteredActors(actors)
    }
  }, [searchTerm, actors])

  const handleActorCreated = (newActor: Actor) => {
    setActors([...actors, newActor])
    setShowCreationForm(false)
    onSelect(newActor)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 rounded-lg w-full max-w-3xl max-h-[80vh] flex flex-col">
        {showCreationForm ? (
          <div className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Add New Actor</h3>
              <button onClick={() => setShowCreationForm(false)} className="text-gray-400 hover:text-white">
                <X size={24} />
              </button>
            </div>
            <ActorCreationForm 
              onSuccess={handleActorCreated} 
              onCancel={() => setShowCreationForm(false)} 
            />
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between p-4 border-b border-gray-700">
              <h2 className="text-xl font-bold">Select Actor</h2>
              <button 
                onClick={onClose}
                className="text-gray-400 hover:text-white"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="p-4 border-b border-gray-700">
              <div className="flex space-x-2">
                <div className="relative flex-1">
                  <input
                    type="text"
                    placeholder="Search actors..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-gray-800 border border-gray-700 rounded px-4 py-2 pl-10 text-white"
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                </div>
                <button 
                  onClick={handleSearch}
                  className="flex items-center gap-1 bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-500"
                >
                  <Search size={18} />
                  Search
                </button>
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4">
              {loading ? (
                <div className="flex justify-center items-center h-40">
                  <p className="text-gray-400">Loading actors...</p>
                </div>
              ) : filteredActors.length === 0 ? (
                <div className="flex flex-col justify-center items-center h-40 space-y-4">
                  <p className="text-gray-400">No actors found matching "{searchTerm}"</p>
                  <button 
                    onClick={() => setShowCreationForm(true)}
                    className="flex items-center gap-1 bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-500"
                  >
                    <Plus size={18} />
                    Create New Actor
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredActors.map(actor => (
                    <button
                      key={actor.id}
                      onClick={() => onSelect(actor)}
                      disabled={selectedActorIds.includes(actor.id)}
                      className={`flex items-center p-3 rounded text-left ${
                        selectedActorIds.includes(actor.id) 
                          ? 'bg-blue-900/50 cursor-not-allowed opacity-70' 
                          : 'bg-gray-800 hover:bg-gray-700'
                      }`}
                    >
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
                        {selectedActorIds.includes(actor.id) && (
                          <p className="text-sm text-blue-400">Already selected</p>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            <div className="p-4 border-t border-gray-700">
              <button
                onClick={onClose}
                className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default ActorSelectionModal 