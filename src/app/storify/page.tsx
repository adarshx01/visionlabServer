import StoryInterface from "./story-interface"

export default function Page() {
  return (
    <div className="min-h-screen bg-sky-500 p-4">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-4xl font-bold text-white text-center mb-8">Storyfy</h1>
        <StoryInterface />
      </div>
    </div>
  )
}

