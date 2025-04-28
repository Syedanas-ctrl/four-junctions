import { useState } from 'react'
import Image from 'next/image'
import { Actor } from '@/lib/types/actors'
import { API_URL } from '@/lib/constants'
import { useToast } from '@/hooks/use-toast'
interface ActorCreationFormProps {
  onSuccess: (actor: Actor) => void
  onCancel: () => void
}

const ActorCreationForm = ({ onSuccess, onCancel }: ActorCreationFormProps) => {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    fullName: '',
    primaryImage: '',
    bio: '',
    birthDate: '',
    height: 0,
    role: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate all required fields
    if (!formData.fullName.trim()) {
      toast({
        title: 'Full Name is required',
        description: 'Please enter a full name for the actor',
      })
      return
    }
    if (!formData.primaryImage.trim()) {
      toast({
        title: 'Image URL is required',
        description: 'Please enter an image URL for the actor',
      })
      return
    }
    if (!formData.bio.trim()) {
      toast({
        title: 'Bio is required',
        description: 'Please enter a bio for the actor',
      })
      return
    }
    if (!formData.birthDate) {
      toast({
        title: 'Birth Date is required',
        description: 'Please enter a birth date for the actor',
      })
      return
    }
    if (formData.height <= 0) {
      toast({
        title: 'Height must be greater than 0',
        description: 'Please enter a height for the actor',
      })
      return
    }
    if (!formData.role.trim()) {
      toast({
        title: 'Role is required',
        description: 'Please enter a role for the actor',
      })
      return
    }

    setIsSubmitting(true)
    setError(null)

    try {
      // Generate a random IMDB ID for the new actor
      const randomImdbId = `nm${Math.floor(Math.random() * 10000000)}`
      
      const response = await fetch(`${API_URL}/api/actors`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          imdbId: randomImdbId,
          birthDate: formData.birthDate ? new Date(formData.birthDate) : new Date(),
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to create actor')
      }

      const createdActor = await response.json()
      onSuccess(createdActor)
    } catch (err) {
      console.error('Error creating actor:', err)
      setError(err instanceof Error ? err.message : 'An unknown error occurred')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-gray-900 p-4 rounded-lg">
      <h2 className="text-xl font-bold mb-4">Create New Actor</h2>
      
      {error && (
        <div className="mb-4 p-3 bg-red-900/50 text-white rounded">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">
            Full Name
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              className="mt-1 block w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white"
              required
            />
          </label>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">
            Image URL
            <input
              type="text"
              name="primaryImage"
              value={formData.primaryImage}
              onChange={handleInputChange}
              className="mt-1 block w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white"
            />
          </label>
          
          {formData.primaryImage && (
            <div className="mt-2 relative h-24 w-24 mx-auto rounded-full overflow-hidden">
              <Image
                src={formData.primaryImage}
                alt="Actor preview"
                fill
                className="object-cover"
              />
            </div>
          )}
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">
            Bio
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleInputChange}
              rows={3}
              className="mt-1 block w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white"
            />
          </label>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Birth Date
              <input
                type="date"
                name="birthDate"
                value={formData.birthDate}
                onChange={handleInputChange}
                className="mt-1 block w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white"
              />
            </label>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">
              Height (cm)
              <input
                type="number"
                name="height"
                value={formData.height}
                onChange={handleNumberChange}
                className="mt-1 block w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white"
              />
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Role
              <input
                type="text"
                name="role"
                value={formData.role}
              onChange={handleInputChange}
                className="mt-1 block w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white"
              />
            </label>
          </div>
        </div>
        
        <div className="flex justify-end space-x-3 pt-2">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded"
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Creating...' : 'Create Actor'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default ActorCreationForm 