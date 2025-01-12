'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from 'next/link'
import { FaBook, FaClipboardList, FaHandsHelping } from 'react-icons/fa'
import { Header } from '@/components/Header'
import { Hero } from '@/components/Hero'
import { WhatWeOffer } from '@/components/WhatWeOffer'
import { HowItWorks } from '@/components/HowItWorks'
import { Footer } from '@/components/Footer'

export default function Home() {
  return (
    <div className="min-h-screen bg-[#f8faff]">
      <Header />
      <Hero />
      <WhatWeOffer />
      <HowItWorks />
      <Footer />
    </div>
  )
}

