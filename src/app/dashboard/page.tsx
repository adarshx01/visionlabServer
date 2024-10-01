import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"; 
import { redirect } from "next/navigation";
import { 
  Camera, 
  AlertTriangle, 
  BarChart, 
  MessageCircle, 
  Home, 
  Bell, 
  Shield, 
  TrendingUp, 
  Smartphone, 
  FileText, 
  AlertOctagon 
} from "lucide-react"

const Dashboard=async()=> {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
  
    // Check if the user is not logged in and redirect to home page
    if (!user) {
      redirect("/"); // Redirect to home if user is not logged in
    }
  const features = [
    {
      title: "AI-Powered Monitoring Video Analysis",
      description: "Advanced AI algorithms analyze video feeds in real-time for enhanced monitoring and insights.",
      icon: <Camera className="h-8 w-8 text-primary" />,
    },
    {
      title: "Early Warning System",
      description: "Proactive alerts to potential issues before they escalate into major problems.",
      icon: <AlertTriangle className="h-8 w-8 text-primary" />,
    },
    {
      title: "Resource Optimization",
      description: "Intelligent allocation and management of resources for maximum efficiency.",
      icon: <BarChart className="h-8 w-8 text-primary" />,
    },
    {
      title: "AI Chatbot Support",
      description: "24/7 intelligent chatbot assistance for quick resolution of queries and issues.",
      icon: <MessageCircle className="h-8 w-8 text-primary" />,
    },
    {
      title: "Home Care Integration",
      description: "Seamless integration with home care services for comprehensive patient support.",
      icon: <Home className="h-8 w-8 text-primary" />,
    },
    {
      title: "Real-time Alerts",
      description: "Instant notifications for critical events requiring immediate attention.",
      icon: <Bell className="h-8 w-8 text-primary" />,
    },
    {
      title: "Data Security",
      description: "Robust encryption and security measures to protect sensitive information.",
      icon: <Shield className="h-8 w-8 text-primary" />,
    },
    {
      title: "Predictive Analytics",
      description: "Advanced algorithms to forecast trends and potential issues for proactive management.",
      icon: <TrendingUp className="h-8 w-8 text-primary" />,
    },
    {
      title: "Mobile Access",
      description: "Access your dashboard and receive alerts on-the-go with our mobile application.",
      icon: <Smartphone className="h-8 w-8 text-primary" />,
    },
    {
      title: "Automated Reporting",
      description: "Generate comprehensive reports automatically for easy analysis and decision-making.",
      icon: <FileText className="h-8 w-8 text-primary" />,
    },
    {
      title: "Customizable Alerts",
      description: "Tailor alert settings to your specific needs and preferences for optimal monitoring.",
      icon: <AlertOctagon className="h-8 w-8 text-primary" />,
    },
  ]

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {features.map((feature, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {feature.icon}
                <span>{feature.title}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>{feature.description}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
export default Dashboard