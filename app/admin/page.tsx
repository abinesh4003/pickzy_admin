'use client'
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Activity, Briefcase, Users, FileText, ArrowRight, Calendar, BarChart2 } from 'lucide-react'
import Link from 'next/link'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'

// Mock data - replace with real API calls
const metrics = [
  { title: 'Open Positions', value: 18, icon: <Briefcase className="h-5 w-5" />, change: '+3 this month' },
  { title: 'Active Candidates', value: 142, icon: <Users className="h-5 w-5" />, change: '+12% from last month' },
  { title: 'New Applications', value: 27, icon: <FileText className="h-5 w-5" />, change: '5 today' },
  { title: 'Interviews', value: 9, icon: <Calendar className="h-5 w-5" />, change: '2 scheduled today' }
]

const recentPositions = [
  { id: 'pos_001', title: 'Senior Frontend Engineer', department: 'Engineering', applicants: 15, status: 'active' },
  { id: 'pos_002', title: 'UX Designer', department: 'Product', applicants: 8, status: 'active' },
  { id: 'pos_003', title: 'HR Manager', department: 'People', applicants: 5, status: 'draft' }
]

const recentActivities = [
  { id: 1, action: 'New application received', position: 'Frontend Engineer', time: '2 hours ago' },
  { id: 2, action: 'Interview completed', position: 'Product Designer', time: '1 day ago' },
  { id: 3, action: 'Offer accepted', position: 'Backend Developer', time: '2 days ago' }
]

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      {/* Dashboard Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here's what's happening with your recruitment.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Calendar className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button>
            <BarChart2 className="mr-2 h-4 w-4" />
            Generate Report
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {metric.title}
              </CardTitle>
              <div className="text-muted-foreground">{metric.icon}</div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {metric.change}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* Recent Positions */}
        <Card className="lg:col-span-4">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Recent Positions</CardTitle>
                <CardDescription>
                  Recently active job positions
                </CardDescription>
              </div>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/admin/positions">
                  View all
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentPositions.map((position) => (
                <div 
                  key={position.id}
                  className="flex items-center justify-between p-3 hover:bg-muted/50 rounded-lg transition-colors"
                >
                  <div>
                    <div className="font-medium">{position.title}</div>
                    <div className="text-sm text-muted-foreground">
                      {position.department} • {position.applicants} applicants
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={position.status === 'active' ? 'default' : 'secondary'}>
                      {position.status}
                    </Badge>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-8 w-8 p-0"
                      asChild
                    >
                      <Link href={`/admin/positions/${position.id}`}>
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest actions in your recruitment pipeline</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3">
                  <div className="mt-1 rounded-full bg-primary/10 p-2">
                    <Activity className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium leading-none">{activity.action}</p>
                    <p className="text-sm text-muted-foreground">{activity.position}</p>
                    <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Hiring Pipeline */}
      <Card>
        <CardHeader>
          <CardTitle>Hiring Pipeline</CardTitle>
          <CardDescription>Current month recruitment progress</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { stage: 'Applications', count: 42, value: 100 },
              { stage: 'Screening', count: 28, value: 67 },
              { stage: 'Interviews', count: 12, value: 29 },
              { stage: 'Offers', count: 5, value: 12 },
            ].map((item, index) => (
              <div key={index} className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{item.stage}</span>
                  <span className="text-sm text-muted-foreground">{item.count}</span>
                </div>
                <Progress value={item.value} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}