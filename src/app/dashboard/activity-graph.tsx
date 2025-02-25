"use client"

export function ActivityGraph() {
  const months = ["Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb"]
  const data = Array(12)
    .fill(0)
    .map(() => Math.floor(Math.random() * 10))

  return (
    <div className="w-full">
      <div className="flex items-end justify-between h-32 gap-1">
        {data.map((value, i) => (
          <div key={i} className="flex-1 flex flex-col items-center gap-2">
            <div
              className="w-full bg-primary/10 rounded-sm transition-all hover:bg-primary/20"
              style={{ height: `${value * 10}%` }}
            >
              <div className="w-full bg-primary rounded-sm" style={{ height: `${value * 5}%` }} />
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-between mt-4 text-sm text-muted-foreground">
        {months.map((month) => (
          <div key={month} className="flex-1 text-center">
            {month}
          </div>
        ))}
      </div>
    </div>
  )
}

