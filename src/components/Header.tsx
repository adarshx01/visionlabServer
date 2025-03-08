import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { useAuth } from '@/hooks/useAuth'
import { signOut } from 'firebase/auth'
import { auth } from '@/lib/firebase'

export function Header() {
  const { user } = useAuth()

  const handleSignOut = async () => {
    try {
      await signOut(auth)
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

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
            <Link href="/dashboard" className="text-gray-800 hover:text-[#1a73e8]">
              Dashboard
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <span className="text-gray-800">Welcome, {user.email}</span>
                <Button onClick={handleSignOut} className="bg-[#1a73e8] hover:bg-[#1557b0]">
                  Logout
                </Button>
              </>
            ) : (
              <Link href="/login" passHref>
                <Button className="bg-[#1a73e8] hover:bg-[#1557b0]">
                  Login
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

