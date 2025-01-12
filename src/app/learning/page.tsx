'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2 } from 'lucide-react'

export default function Learning() {
  const [query, setQuery] = useState('')
  const [response, setResponse] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    // Simulating AI response with a delay
    setTimeout(() => {
      setResponse(`Here's what I know about "${query}": [AI-generated content would appear here]`)
      setLoading(false)
    }, 1500)
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center">AI-Based Learning</h1>
      <Card>
        <CardHeader>
          <CardTitle>Ask the AI</CardTitle>
          <CardDescription>Enter your question and our AI will provide you with an answer.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="What would you like to learn about?"
            />
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing
                </>
              ) : (
                'Submit'
              )}
            </Button>
          </form>
        </CardContent>
        {response && (
          <CardFooter>
            <div className="w-full">
              <h2 className="font-bold mb-2">AI Response:</h2>
              <p className="text-gray-700">{response}</p>
            </div>
          </CardFooter>
        )}
      </Card>
    </div>
  )
}

