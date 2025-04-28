'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Header } from '@/components/Header'

export default function NewMoviePage() {
  const router = useRouter()
  
  useEffect(() => {
    // Redirect to the edit page with 'new' parameter
    router.push('/movie/edit/new')
  }, [router])
  
  return (
    <div className="max-w-6xl min-h-screen bg-black text-white mx-auto">
      <Header />
      <div className="flex justify-center items-center h-96">
        <p className="text-xl">Redirecting to movie creation form...</p>
      </div>
    </div>
  )
} 