'use client'
import type React from "react"
import { useState, useRef } from "react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ImageIcon, Mic, Loader2 } from "lucide-react"
import DrawingCanvas from "./drawing-canvas"

export default function StoryInterface() {
  const [isDrawing, setIsDrawing] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [userInput, setUserInput] = useState("")
  const [imageUrl, setImageUrl] = useState("/placeholder.svg?height=400&width=400")
  const [aiStory, setAiStory] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Reset any previous errors
      setError(null)
      
      const reader = new FileReader()
      reader.onload = (event) => {
        const url = event.target?.result as string
        setImageUrl(url)
        setIsDrawing(false)
        generateStory(url)
      }
      reader.onerror = () => {
        setError("Failed to read the image file")
      }
      reader.readAsDataURL(file)
    }
  }

  const handleDrawClick = () => {
    setIsDrawing(true)
    // Reset any previous errors
    setError(null)
  }

  const handleDrawingSave = (url: string) => {
    setImageUrl(url)
    setIsDrawing(false)
    generateStory(url)
  }

  const generateStory = async (imageUrl: string) => {
    setIsLoading(true)
    setError(null)
    
    try {
      const response = await fetch("/api/storify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: imageUrl, prompt: userInput }),
      })
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to generate story")
      }
      
      const data = await response.json()
      
      if (!data.text) {
        throw new Error("No story was generated")
      }
      
      setAiStory(data.text)
      
    } catch (error) {
      console.error("Failed to generate story:", error)
      setError(error instanceof Error ? error.message : "Failed to generate story")
      setAiStory("") // Clear any previous story
    } finally {
      setIsLoading(false)
    }
  }

  const handleVoiceInput = () => {
    // Reset any previous errors
    setError(null)
    
    if (!window.SpeechRecognition && !window.webkitSpeechRecognition) {
      setError("Speech recognition is not supported in your browser")
      return
    }
    
    setIsListening(true)
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    const recognition = new SpeechRecognition()

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript
      setUserInput(transcript)
      setIsListening(false)
      generateStory(imageUrl)
    }

    recognition.onerror = (event) => {
      console.error("Speech recognition error", event.error)
      setIsListening(false)
      setError(`Speech recognition error: ${event.error}`)
    }

    recognition.start()
  }

  return (
    <Card className="p-6 bg-white rounded-lg shadow-lg">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="prose">
          <h2 className="text-xl font-semibold mb-4">AI-Generated Story</h2>
          {isLoading ? (
            <div className="flex items-center justify-center h-full">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          ) : error ? (
            <div className="text-red-500">
              <p>Oops! Something went wrong.</p>
              <p className="text-sm">{error}</p>
            </div>
          ) : (
            <p className="text-base leading-relaxed whitespace-pre-line">{aiStory || "Your magical story will appear here!"}</p>
          )}
        </div>
        <div className="relative h-[400px] rounded-lg overflow-hidden">
          {isDrawing ? (
            <DrawingCanvas onSave={handleDrawingSave} />
          ) : (
            <img
              src={imageUrl || "/placeholder.svg"}
              alt="Story illustration"
              className="w-full h-full object-cover rounded-lg"
            />
          )}
        </div>
      </div>
      <div className="mt-6 flex gap-2 items-center">
        <Input
          placeholder="Unleash Your Thoughts in a Magical Story!"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          className="flex-1"
        />
        <input type="file" accept="image/*" className="hidden" ref={fileInputRef} onChange={handleFileUpload} />
        <Button variant="ghost" size="icon" onClick={() => fileInputRef.current?.click()} className="shrink-0">
          <ImageIcon className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" onClick={handleDrawClick} className="shrink-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M8 21s-4-3-4-9 4-9 4-9" />
            <path d="M16 3s4 3 4 9-4 9-4 9" />
            <line x1="8" y1="12" x2="16" y2="12" />
          </svg>
        </Button>
        <Button variant="ghost" size="icon" className="shrink-0" onClick={handleVoiceInput} disabled={isListening}>
          <Mic className={`h-5 w-5 ${isListening ? "text-red-500" : ""}`} />
        </Button>
      </div>
    </Card>
  )
}