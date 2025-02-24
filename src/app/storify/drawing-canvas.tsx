"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"

interface DrawingCanvasProps {
  onSave: (url: string) => void
}

export default function DrawingCanvas({ onSave }: DrawingCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    ctx.strokeStyle = "#000000"
    ctx.lineWidth = 2
    ctx.lineCap = "round"
    ctx.lineJoin = "round"
    setContext(ctx)

    // Set canvas size
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    // Fill with white background
    ctx.fillStyle = "#ffffff"
    ctx.fillRect(0, 0, canvas.width, canvas.height)
  }, [])

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!context) return
    setIsDrawing(true)
    const { offsetX, offsetY } = e.nativeEvent
    context.beginPath()
    context.moveTo(offsetX, offsetY)
  }

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !context) return
    const { offsetX, offsetY } = e.nativeEvent
    context.lineTo(offsetX, offsetY)
    context.stroke()
  }

  const stopDrawing = () => {
    if (!context) return
    setIsDrawing(false)
    context.closePath()
  }

  const handleSave = () => {
    if (!canvasRef.current) return
    const url = canvasRef.current.toDataURL()
    onSave(url)
  }

  return (
    <div className="relative h-full">
      <canvas
        ref={canvasRef}
        className="w-full h-full border rounded-lg cursor-crosshair"
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
      />
      <Button className="absolute bottom-4 right-4" onClick={handleSave}>
        Save Drawing
      </Button>
    </div>
  )
}

