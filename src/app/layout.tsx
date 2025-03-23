import './globals.css'
import { Inter } from 'next/font/google'
// import { Navbar } from '@/components/Navbar (1)'
import { Footer } from '@/components/Footer'
import Navbar from '@/components/Navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'GiftedBooks AI Learning Platform',
  description: 'AI-based learning, poverty assistance, and social grievance registration',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        <nav className="sticky top-0 z-50 bg-white shadow">
          <Navbar />
        </nav>
        <main className="flex-grow">{children}</main>
      </body>
    </html>
  )
}

