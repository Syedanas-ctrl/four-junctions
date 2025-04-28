import { useState, useEffect } from 'react'
import Image from 'next/image'
import { X, Search, Plus } from 'lucide-react'
import { Producer } from '@/lib/types/producers'
import { API_URL } from '@/lib/constants'
import ProducerCreationForm from './ProducerCreationForm'

interface ProducerSelectionModalProps {
  isOpen: boolean
  onClose: () => void
  onSelect: (producer: Producer) => void
}

const ProducerSelectionModal = ({ isOpen, onClose, onSelect }: ProducerSelectionModalProps) => {
  const [producers, setProducers] = useState<Producer[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredProducers, setFilteredProducers] = useState<Producer[]>([])
  const [showCreationForm, setShowCreationForm] = useState(false)

  useEffect(() => {
    const fetchProducers = async () => {
      try {
        setLoading(true)
        const response = await fetch(`${API_URL}/api/producers`)
        if (!response.ok) throw new Error('Failed to fetch producers')
        const data = await response.json()
        setProducers(data)
        setFilteredProducers(data)
      } catch (error) {
        console.error('Error fetching producers:', error)
      } finally {
        setLoading(false)
      }
    }
    
    if (isOpen) {
      fetchProducers()
    }
  }, [isOpen])

  useEffect(() => {
    if (searchTerm) {
      const filtered = producers.filter(producer => 
        producer.fullName.toLowerCase().includes(searchTerm.toLowerCase())
      )
      setFilteredProducers(filtered)
    } else {
      setFilteredProducers(producers)
    }
  }, [searchTerm, producers])

  const handleProducerCreated = (newProducer: Producer) => {
    setProducers([...producers, newProducer])
    setShowCreationForm(false)
    onSelect(newProducer)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 rounded-lg w-full max-w-3xl max-h-[80vh] flex flex-col">
        {showCreationForm ? (
          <div className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Add New Producer</h3>
              <button onClick={() => setShowCreationForm(false)} className="text-gray-400 hover:text-white">
                <X size={24} />
              </button>
            </div>
            <ProducerCreationForm 
              onSuccess={handleProducerCreated} 
              onCancel={() => setShowCreationForm(false)} 
            />
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between p-4 border-b border-gray-700">
              <h2 className="text-xl font-bold">Select Producer</h2>
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
                    placeholder="Search producers..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-gray-800 border border-gray-700 rounded px-4 py-2 pl-10 text-white"
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                </div>
                <button 
                  onClick={() => setShowCreationForm(true)}
                  className="flex items-center gap-1 bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-500"
                >
                  <Plus size={18} />
                  New Producer
                </button>
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4">
              {loading ? (
                <div className="flex justify-center items-center h-40">
                  <p className="text-gray-400">Loading producers...</p>
                </div>
              ) : filteredProducers.length === 0 ? (
                <div className="flex flex-col justify-center items-center h-40 space-y-4">
                  <p className="text-gray-400">No producers found matching "{searchTerm}"</p>
                  <button 
                    onClick={() => setShowCreationForm(true)}
                    className="flex items-center gap-1 bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-500"
                  >
                    <Plus size={18} />
                    Create New Producer
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredProducers.map(producer => (
                    <button
                      key={producer.id}
                      onClick={() => onSelect(producer)}
                      className="flex items-center p-3 rounded text-left bg-gray-800 hover:bg-gray-700"
                    >
                      <div className="relative h-12 w-12 rounded-full overflow-hidden mr-3">
                        <Image 
                          src={producer.primaryImage || '/producer-placeholder.jpg'} 
                          alt={producer.fullName}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{producer.fullName}</p>
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

export default ProducerSelectionModal 