"use client"

import { useEffect, useState } from "react"

export function StatsCircle({ solved, total }: { solved: number; total: number }) {
  const [progress, setProgress] = useState(0)
  const percentage = (solved / total) * 100
  const radius = 80
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (progress / 100) * circumference

  useEffect(() => {
    const timer = setTimeout(() => {
      setProgress(percentage)
    }, 100)
    return () => clearTimeout(timer)
  }, [percentage])

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative">
        <svg className="transform -rotate-90 w-48 h-48">
          <circle
            className="text-muted stroke-current"
            strokeWidth="8"
            stroke="currentColor"
            fill="transparent"
            r={radius}
            cx="96"
            cy="96"
          />
          <circle
            className="text-primary stroke-current"
            strokeWidth="8"
            strokeLinecap="round"
            stroke="currentColor"
            fill="transparent"
            r={radius}
            cx="96"
            cy="96"
            style={{
              strokeDasharray: circumference,
              strokeDashoffset,
              transition: "stroke-dashoffset 0.5s ease",
            }}
          />
        </svg>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
          <span className="text-4xl font-bold">{solved}</span>
          <span className="text-sm text-muted-foreground">/{total}</span>
          <div className="text-sm text-muted-foreground">Solved</div>
        </div>
      </div>
    </div>
  )
}

