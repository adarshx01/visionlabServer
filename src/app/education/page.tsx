'use client'

import { useState } from 'react'
import { Courses } from '@/components/Courses'
import { ClassRooms } from '@/components/ClassRooms'
import { CustomContent } from '@/components/CustomContent'
import { Tests } from '@/components/Tests'
import { AIAssistant } from '@/components/AIAssistant'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, Users, FileText, ClipboardList, Bot } from 'lucide-react'

export default function EducationPage() {
  return (
    <div className="min-h-screen bg-[#f8faff]">
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Learning Platform</h1>
        
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
  )
}

