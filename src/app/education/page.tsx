'use client'

import { useState } from 'react'
import { Courses } from '@/components/Courses'
import { ClassRooms } from '@/components/ClassRooms'
import { CustomContent } from '@/components/CustomContent'
import { Tests } from '@/components/Tests'
import { AIAssistant } from '@/components/AIAssistant'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, Users, FileText, ClipboardList, Bot } from 'lucide-react'
import Link from 'next/link'

export default function EducationPage() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }

  return (
    <div className="min-h-screen bg-[#f8faff]">
      <div className="min-h-screen bg-[#f8faff]">
        <main className="relative container mx-auto px-4 py-8">
          <div className="absolute top-6 ml-40">
            <button
              type="button"
              onClick={toggleDropdown}
              className="justify-center gap-2 items-center shadow-xl text-lg bg-gray-50 backdrop-blur-md lg:font-semibold isolation-auto border-gray-50 
              before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full 
              before:bg-yellow-500 hover:text-gray-50 before:-z-10 before:aspect-square before:hover:scale-150 before:hover:duration-700 
              relative z-10 px-4 py-2 overflow-hidden border-2 rounded-full group"
            >
              Flash Cards
            </button>
            {isDropdownOpen && (
              <div className="absolute mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                  <Link href="/option1" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
                    Option 1
                  </Link>
                  <Link href="/option2" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
                    Option 2
                  </Link>
                  <Link href="/option3" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
                    Option 3
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* 3D Classroom Button - Positioned at Top Right */}
          <div className="absolute top-6 right-4">
            <Link href="/aiteacher">
              <button
                type="submit"
                className="flex justify-center gap-2 items-center shadow-xl text-lg bg-gray-50 backdrop-blur-md lg:font-semibold isolation-auto border-gray-50 
                before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full 
                before:bg-emerald-500 hover:text-gray-50 before:-z-10 before:aspect-square before:hover:scale-150 before:hover:duration-700 
                relative z-10 px-4 py-2 overflow-hidden border-2 rounded-full group"
              >
                3D Classroom
                <svg
                  className="w-8 h-8 justify-end group-hover:rotate-90 group-hover:bg-gray-50 text-gray-50 ease-linear duration-300 rounded-full 
                  border border-gray-700 group-hover:border-none p-2 rotate-45"
                  viewBox="0 0 16 19"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7 18C7 18.5523 7.44772 19 8 19C8.55228 19 9 18.5523 9 18H7ZM8.70711 0.292893C8.31658 -0.0976311 7.68342 -0.0976311 7.29289 0.292893L0.928932 6.65685C0.538408 7.04738 0.538408 7.68054 0.928932 8.07107C1.31946 8.46159 1.95262 8.46159 2.34315 8.07107L8 2.41421L13.6569 8.07107C14.0474 8.46159 14.6805 8.46159 15.0711 8.07107C15.4616 7.68054 15.4616 7.04738 15.0711 6.65685L8.70711 0.292893ZM9 18L9 1H7L7 18H9Z"
                    className="fill-gray-800 group-hover:fill-gray-800"
                  ></path>
                </svg>
              </button>
            </Link>
          </div>

          {/* Home Button - Positioned at Top Left */}
          <div className="absolute top-6 left-4">
            <Link href="/">
              <button
                type="button"
                className="flex justify-center gap-2 items-center shadow-xl text-lg bg-gray-50 backdrop-blur-md lg:font-semibold isolation-auto border-gray-50 
                before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full 
                before:bg-emerald-500 hover:text-gray-50 before:-z-10 before:aspect-square before:hover:scale-150 before:hover:duration-700 
                relative z-10 px-4 py-2 overflow-hidden border-2 rounded-full group"
              >
                Home
                <svg
                  className="w-8 h-8 justify-end group-hover:-rotate-90 group-hover:bg-gray-50 text-gray-50 ease-linear duration-300 rounded-full 
                  border border-gray-700 group-hover:border-none p-2 rotate-45"
                  viewBox="0 0 16 19"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7 18C7 18.5523 7.44772 19 8 19C8.55228 19 9 18.5523 9 18H7ZM8.70711 0.292893C8.31658 -0.0976311 7.68342 -0.0976311 7.29289 0.292893L0.928932 6.65685C0.538408 7.04738 0.538408 7.68054 0.928932 8.07107C1.31946 8.46159 1.95262 8.46159 2.34315 8.07107L8 2.41421L13.6569 8.07107C14.0474 8.46159 14.6805 8.46159 15.0711 8.07107C15.4616 7.68054 15.4616 7.04738 15.0711 6.65685L8.70711 0.292893ZM9 18L9 1H7L7 18H9Z"
                    className="fill-gray-800 group-hover:fill-gray-800"
                  ></path>
                </svg>
              </button>
            </Link>
          </div>

          <h1 className="text-4xl font-bold font-mono text-gray-900 mb-8 text-center">Learning Platform</h1>

          <Tabs defaultValue="courses" className="bg-white rounded-lg shadow-lg p-6">
            <TabsList className="grid w-full grid-cols-5 mb-6">
              <TabsTrigger value="courses" className="flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                Courses
              </TabsTrigger>
              <TabsTrigger value="classrooms" className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                ClassRooms
              </TabsTrigger>
              <TabsTrigger value="custom-content" className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Custom Content
              </TabsTrigger>
              <TabsTrigger value="tests" className="flex items-center gap-2">
                <ClipboardList className="w-4 h-4" />
                Tests
              </TabsTrigger>
              <TabsTrigger value="ai-assistant" className="flex items-center gap-2">
                <Bot className="w-4 h-4" />
                AI Assistant
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="courses">
              <Courses />
            </TabsContent>
            <TabsContent value="classrooms">
              <ClassRooms />
            </TabsContent>
            <TabsContent value="custom-content">
              <CustomContent />
            </TabsContent>
            <TabsContent value="tests">
              <Tests />
            </TabsContent>
            <TabsContent value="ai-assistant">
              <AIAssistant />
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}