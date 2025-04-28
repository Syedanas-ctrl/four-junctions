"use client"

import Image from "next/image"
import { ChevronRight } from "lucide-react"

export function PopularCelebrities() {
  return (
    <section className="max-w-7xl mx-auto px-4 mt-12">
      <h2 className="text-2xl font-bold border-l-4 border-[#f5c518] pl-3 mb-6">
        Most popular celebrities <ChevronRight className="inline-block w-5 h-5 ml-1" />
      </h2>

      <div className="flex mb-4 gap-4">
        <button className="text-[#f5c518] font-bold">TOP RISING</button>
        <button className="text-gray-400">BY RANKING</button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {/* Celebrity 1 */}
        <div className="text-center cursor-pointer">
          <div className="relative w-32 h-32 mx-auto rounded-full overflow-hidden mb-2">
            <Image
              src="https://m.media-amazon.com/images/M/MV5BNzg1MTUyNDYxOF5BMl5BanBnXkFtZTgwNTQ4MTE2MjE@._V1_FMjpg_UX1000_.jpg?height=128&width=128"
              alt="Minka Kelly"
              width={128}
              height={128}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex items-center justify-center gap-1 mb-1">
            <span className="font-bold">7</span>
            <span className="text-gray-400 text-sm">(↑ 744)</span>
          </div>
          <h3 className="font-medium">Minka Kelly</h3>
        </div>

        {/* Celebrity 2 */}
        <div className="text-center cursor-pointer">
          <div className="relative w-32 h-32 mx-auto rounded-full overflow-hidden mb-2">
            <Image
              src="https://m.media-amazon.com/images/M/MV5BNzg1MTUyNDYxOF5BMl5BanBnXkFtZTgwNTQ4MTE2MjE@._V1_FMjpg_UX1000_.jpg?height=128&width=128"
              alt="Josh Duhamel"
              width={128}
              height={128}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex items-center justify-center gap-1 mb-1">
            <span className="font-bold">44</span>
            <span className="text-gray-400 text-sm">(↑ 657)</span>
          </div>
          <h3 className="font-medium">Josh Duhamel</h3>
        </div>

        {/* Celebrity 3 */}
        <div className="text-center cursor-pointer">
          <div className="relative w-32 h-32 mx-auto rounded-full overflow-hidden mb-2">
            <Image
              src="https://m.media-amazon.com/images/M/MV5BNzg1MTUyNDYxOF5BMl5BanBnXkFtZTgwNTQ4MTE2MjE@._V1_FMjpg_UX1000_.jpg?height=128&width=128"
              alt="Isabela Merced"
              width={128}
              height={128}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex items-center justify-center gap-1 mb-1">
            <span className="font-bold">1</span>
            <span className="text-gray-400 text-sm">(↑ 115)</span>
          </div>
          <h3 className="font-medium">Isabela Merced</h3>
        </div>

        {/* Celebrity 4 */}
        <div className="text-center cursor-pointer">
          <div className="relative w-32 h-32 mx-auto rounded-full overflow-hidden mb-2">
            <Image
              src="https://m.media-amazon.com/images/M/MV5BNzg1MTUyNDYxOF5BMl5BanBnXkFtZTgwNTQ4MTE2MjE@._V1_FMjpg_UX1000_.jpg?height=128&width=128"
              alt="Kaitlyn Dever"
              width={128}
              height={128}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex items-center justify-center gap-1 mb-1">
            <span className="font-bold">2</span>
            <span className="text-gray-400 text-sm">(↑ 94)</span>
          </div>
          <h3 className="font-medium">Kaitlyn Dever</h3>
        </div>

        {/* Celebrity 5 */}
        <div className="text-center cursor-pointer">
          <div className="relative w-32 h-32 mx-auto rounded-full overflow-hidden mb-2">
            <Image
              src="https://m.media-amazon.com/images/M/MV5BNzg1MTUyNDYxOF5BMl5BanBnXkFtZTgwNTQ4MTE2MjE@._V1_FMjpg_UX1000_.jpg?height=128&width=128"
              alt="Emma Corrin"
              width={128}
              height={128}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex items-center justify-center gap-1 mb-1">
            <span className="font-bold">3</span>
            <span className="text-gray-400 text-sm">(↑ 18)</span>
          </div>
          <h3 className="font-medium">Emma Corrin</h3>
        </div>

        {/* Celebrity 6 */}
        <div className="text-center cursor-pointer">
          <div className="relative w-32 h-32 mx-auto rounded-full overflow-hidden mb-2">
            <Image
              src="https://m.media-amazon.com/images/M/MV5BNzg1MTUyNDYxOF5BMl5BanBnXkFtZTgwNTQ4MTE2MjE@._V1_FMjpg_UX1000_.jpg?height=128&width=128"
              alt="Nicky Katt"
              width={128}
              height={128}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex items-center justify-center gap-1 mb-1">
            <span className="font-bold">4</span>
            <span className="text-gray-400 text-sm">(↑ 71)</span>
          </div>
          <h3 className="font-medium">Nicky Katt</h3>
        </div>
      </div>

      {/* Next Button */}
      <button className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 p-2 rounded-full">
        <ChevronRight className="w-6 h-6" />
      </button>
    </section>
  )
} 