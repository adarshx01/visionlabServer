'use client'

import Link from 'next/link'
import { Button } from "@/components/ui/button"

export function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-2xl font-bold text-[#1a73e8]">
            GiftedBooks
          </Link>
          
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="text-gray-800 hover:text-[#1a73e8]">
              Home
            </Link>
            <Link href="/education" className="text-gray-800 hover:text-[#1a73e8]">
              Education
            </Link>
            <Link href="/grievance" className="text-gray-800 hover:text-[#1a73e8]">
              Grievance
            </Link>
            <Link href="/marketplace" className="text-gray-800 hover:text-[#1a73e8]">
              Marketplace
            </Link>
            <Link href="/about" className="text-gray-800 hover:text-[#1a73e8]">
              About Us
            </Link>
            <Link href="/contact" className="text-gray-800 hover:text-[#1a73e8]">
              Contact Us
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <span className="text-gray-800">Welcome, vish.adarsh01@gmail.com</span>
            <Button className="bg-[#1a73e8] hover:bg-[#1557b0]">
              Logout
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}

