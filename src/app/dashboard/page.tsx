import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MessageSquare, Star, Eye } from "lucide-react"
import { ActivityGraph } from "./activity-graph"
import { StatsCircle } from "./stats-circle"
import { RecentActivity } from "./recent-activity"
import { SkillsList } from "./skills-list"

export default function DashboardPage() {
  return (
    <div className="flex-1 space-y-8 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Profile Overview</h2>
      </div>
      <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-4">
        {/* Profile Section */}
        <Card className="col-span-3 lg:col-span-2">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-4">
              <div className="h-20 w-20 overflow-hidden rounded-xl border bg-background p-1">
                <img
                  src="/placeholder.svg?height=80&width=80"
                  alt="Profile"
                  className="h-full w-full rounded-lg object-cover"
                />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Username</h2>
                <p className="text-muted-foreground">Rank ~5,000,000</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Circle */}
        <Card>
          <CardHeader>
            <CardTitle>Problem Solving Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <StatsCircle solved={5} total={23465} />
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="col-span-3 lg:col-span-1">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="recent" className="space-y-4">
              <TabsList>
                <TabsTrigger value="recent">Recent</TabsTrigger>
                <TabsTrigger value="solutions">Solutions</TabsTrigger>
                <TabsTrigger value="discuss">Discuss</TabsTrigger>
              </TabsList>
              <TabsContent value="recent">
                <RecentActivity />
              </TabsContent>
              <TabsContent value="solutions">
                <RecentActivity />
              </TabsContent>
              <TabsContent value="discuss">
                <RecentActivity />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Skills */}
        <Card className="col-span-3 lg:col-span-1">
          <CardHeader>
            <CardTitle>Skills & Languages</CardTitle>
          </CardHeader>
          <CardContent>
            <SkillsList />
          </CardContent>
        </Card>

        {/* Difficulty Breakdown */}
        <Card className="col-span-3 lg:col-span-1">
          <CardHeader>
            <CardTitle>Difficulty Breakdown</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-green-500 font-medium">Easy</span>
                <span className="text-muted-foreground">5/861</span>
              </div>
              <Progress value={5} max={861} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-yellow-500 font-medium">Medium</span>
                <span className="text-muted-foreground">0/1800</span>
              </div>
              <Progress value={0} max={1800} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-red-500 font-medium">Hard</span>
                <span className="text-muted-foreground">0/804</span>
              </div>
              <Progress value={0} max={804} className="h-2" />
            </div>
          </CardContent>
        </Card>

        {/* Community Stats */}
        <Card className="col-span-3 lg:col-span-2">
          <CardHeader>
            <CardTitle>Community Stats</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2 rounded-lg border p-4">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Eye className="h-4 w-4" />
                  <span className="text-sm font-medium">Total Views</span>
                </div>
                <div className="text-2xl font-bold">0</div>
              </div>
              <div className="space-y-2 rounded-lg border p-4">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MessageSquare className="h-4 w-4" />
                  <span className="text-sm font-medium">Solutions</span>
                </div>
                <div className="text-2xl font-bold">0</div>
              </div>
              <div className="space-y-2 rounded-lg border p-4">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Star className="h-4 w-4" />
                  <span className="text-sm font-medium">Reputation</span>
                </div>
                <div className="text-2xl font-bold">0</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Activity Graph */}
        <Card className="col-span-3 lg:col-span-2">
          <CardHeader>
            <CardTitle>Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <ActivityGraph />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}