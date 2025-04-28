"use client"

import Link from "next/link"
import { ChevronRight } from "lucide-react"

export function WhatToWatch() {
  return (
    <section className="max-w-7xl mx-auto px-4 mt-12">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-[#f5c518]">What to watch</h2>
        <Link href="/recommendations" className="text-[#5699ef] flex items-center">
          Get more recommendations <ChevronRight className="w-4 h-4 ml-1" />
        </Link>
      </div>
    </section>
  )
} 