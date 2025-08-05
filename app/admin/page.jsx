'use client'
import { useEffect, useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Briefcase, Users, ArrowRight, Calendar } from 'lucide-react'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'

export default function AdminDashboard() {
  const [positions, setPositions] = useState([])
  const [loading, setLoading] = useState(true)
  const [metrics, setMetrics] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/positions')
        if (!response.ok) throw new Error('Failed to fetch data')
        const data = await response.json()
        
        setPositions(data)
        
        // Calculate metrics from positions data
        const activePositions = data.filter(p => p.status === 'active').length
        const totalApplicants = data.reduce((sum, pos) => sum + (pos.applicants || 0), 0)
        const recentPositions = data
          .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
          .slice(0, 3)
          console.log(recentPositions)
        setMetrics({
          activePositions,
          totalApplicants,
          recentPositions,
          positionsAddedThisMonth: data.filter(p => 
            new Date(p.createdAt) > new Date(new Date().setDate(1))
          ).length
        })
      } catch (error) {
        console.error('Error:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-[110px] w-full" />
          ))}
        </div>
        <Skeleton className="h-[400px] w-full" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Active Positions
            </CardTitle>
            <Briefcase className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics?.activePositions || 0}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {metrics?.positionsAddedThisMonth || 0} added this month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Applicants
            </CardTitle>
            <Users className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics?.totalApplicants || 0}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Across all positions
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Open Positions
            </CardTitle>
            <Briefcase className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics?.activePositions || 0}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Currently hiring
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Recently Updated
            </CardTitle>
            <Calendar className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {metrics?.recentPositions?.length || 0}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Positions updated
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Positions */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Recent Positions</CardTitle>
              <CardDescription>
                Recently updated job positions
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
          {metrics?.recentPositions?.length > 0 ? (
            <div className="space-y-4">
              {metrics.recentPositions
               .filter(position => position && position.id)
              .map((position) => (
                <div 
                  key={position.id.toString()}
                  className="flex items-center justify-between p-3 hover:bg-muted/50 rounded-lg transition-colors"
                >
                  <div>
                    <div className="font-medium">{position.title}</div>
                    <div className="text-sm text-muted-foreground">
                      {position.department} • {position.applicants} applicants • {position.location}
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
                      <Link href={`/admin/positions/${position._id}`}>
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              No positions found
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}