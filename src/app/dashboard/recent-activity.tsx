import { CalendarDays } from "lucide-react"

export function RecentActivity() {
  const activities = [
    {
      title: "Two Sum",
      time: "6 hours ago",
    },
    {
      title: "Search Insert Position",
      time: "a day ago",
    },
    {
      title: "Remove Element",
      time: "a day ago",
    },
  ]

  return (
    <div className="space-y-4">
      {activities.map((activity, i) => (
        <div key={i} className="flex justify-between items-center">
          <span className="font-medium">{activity.title}</span>
          <div className="flex items-center text-sm text-muted-foreground">
            <CalendarDays className="h-4 w-4 mr-1" />
            {activity.time}
          </div>
        </div>
      ))}
    </div>
  )
}

