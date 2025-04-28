import Link from 'next/link'
import React from 'react'
import { ChevronRight } from 'lucide-react'
import { MovieCategories, MovieCategoriesLabels } from '@/lib/types/movies'
const SidebarList = () => {
  return (
    <div className="w-72">
            <div className="border-l-4 border-[#f5c518] pl-3 mb-6">
              <h2 className="text-2xl font-bold mb-4">More to explore</h2>

              <div className="mb-6">
                <h3 className="text-xl font-bold mb-2">Charts</h3>

                {
                  Object.values(MovieCategories).map((category) => (
                    <div key={category} className="mb-4">
                      <Link href={`/category/${category}`} className="flex items-center justify-between text-[#3976db] font-medium mb-1">
                        {MovieCategoriesLabels[category]} <ChevronRight className="w-4 h-4" />
                      </Link>
                      <p className="text-sm text-gray-600">From the past weekend</p>
                    </div>
                  ))
                }
              </div>
            </div>
          </div>
  )
}

export default SidebarList