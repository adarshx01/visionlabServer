"use client"

import type React from "react"
import { useState } from "react"
import { motion, AnimatePresence, type PanInfo } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface FlashcardProps {
  content: string
  color: string
  number: number
  total: number
}

const Flashcard: React.FC<FlashcardProps> = ({ content, color, number, total }) => {
  return (
    <Card className="w-96 h-full relative overflow-hidden shadow-lg">
      <CardContent
        className="flex items-center justify-center h-full p-6 text-center rounded-lg shadow-md transform transition-all"
        style={{ backgroundColor: color }}
      >
        <motion.div
          className="text-2xl font-semibold"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {content}
        </motion.div>
        <div className="absolute bottom-2 right-2 text-sm opacity-50">
          {number} / {total}
        </div>
      </CardContent>
    </Card>
  )
}

const flashcardData = [
  { content: "What is the capital of France?", color: "hsl(210, 100%, 97%)" },
  { content: "Who painted the Mona Lisa?", color: "hsl(180, 100%, 97%)" },
  { content: "What is the largest planet in our solar system?", color: "hsl(150, 100%, 97%)" },
  { content: "What year did World War II end?", color: "hsl(120, 100%, 97%)" },
  { content: "Who wrote 'Romeo and Juliet'?", color: "hsl(90, 100%, 97%)" },
]

export default function FlashcardDeckvr() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)

  const pageFlipVariants = {
    enter: (direction: number) => ({
      rotateY: direction > 0 ? 120 : -120,
      rotateZ: direction > 0 ? 30 : -30,
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      rotateY: 0,
      rotateZ: 0,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      rotateY: direction < 0 ? 120 : -120,
      rotateZ: direction < 0 ? 30 : -30,
      x: direction < 0 ? -300 : 300,
      opacity: 0,
    }),
  }

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.x > 100 && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
      setDirection(-1)
    } else if (info.offset.x < -100 && currentIndex < flashcardData.length - 1) {
      setCurrentIndex(currentIndex + 1)
      setDirection(1)
    }
  }

  return (
    <div className="relative w-full max-w-md mx-auto h-64 md:h-80 perspective-1000">
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={pageFlipVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.5, ease: "easeInOut" }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.3}
          onDragEnd={handleDragEnd}
          className="w-full h-full absolute"
        >
          <Flashcard
            content={flashcardData[currentIndex].content}
            color={flashcardData[currentIndex].color}
            number={currentIndex + 1}
            total={flashcardData.length}
          />
        </motion.div>
      </AnimatePresence>
      <button
        onClick={() => setCurrentIndex(Math.max(0, currentIndex - 1))}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-200 hover:bg-gray-300 p-2 rounded-full shadow-md z-10 transition"
        disabled={currentIndex === 0}
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={() => setCurrentIndex(Math.min(flashcardData.length - 1, currentIndex + 1))}
        className="absolute -right-96 top-1/2 transform -translate-y-1/2 bg-gray-200 hover:bg-gray-300 p-2 rounded-full shadow-md z-10 transition"
        disabled={currentIndex === flashcardData.length - 1}
      >
        <ChevronRight className="w-6 h-6" />
      </button>
    </div>
  )
}
