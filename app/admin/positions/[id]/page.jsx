'use client'
import { useEffect, useState, use } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, Edit, Calendar, MapPin, Briefcase, Users, DollarSign } from 'lucide-react'
import { showToast } from '@/components/ui/toast'
import Link from 'next/link'

export default function PositionDetail({ params }) {
  const router = useRouter()
  const [position, setPosition] = useState(null)
  const [loading, setLoading] = useState(true)

  // Properly unwrap the params promise
  const unwrappedParams = use(params)
  const positionId = unwrappedParams.id

  useEffect(() => {
    const fetchPosition = async () => {
      try {
        const response = await fetch(`/api/positions/${positionId}`)
        if (!response.ok) throw new Error('Failed to fetch position')
        const data = await response.json()
        setPosition(data)
      } catch (error) {
        console.error('Error fetching position:', error)
        showToast('Error', 'Failed to load position', 'error')
      } finally {
        setLoading(false)
      }
    }

    if (positionId) {
      fetchPosition()
    }
  }, [positionId])

  // ... rest of your component remains the same
  if (loading) {
    return (
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle>Loading Position...</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </CardContent>
      </Card>
    )
  }

  if (!position) {
    return (
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle>Position Not Found</CardTitle>
        </CardHeader>
        <CardContent>
          <Button variant="outline" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Positions
          </Button>
        </CardContent>
      </Card>
    )
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case 'published':
        return <Badge variant="success">Published</Badge>
      case 'draft':
        return <Badge variant="secondary">Draft</Badge>
      case 'archived':
        return <Badge variant="destructive">Archived</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <Button variant="outline" onClick={() => router.back()}>
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Positions
      </Button>

      <Card className="border-0 shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-2xl">{position.title}</CardTitle>
            <div className="flex items-center space-x-4 mt-2">
              {getStatusBadge(position.status)}
              <div className="flex items-center text-sm text-muted-foreground">
                <Users className="h-4 w-4 mr-1" />
                {position.applicants} applicants
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <Calendar className="h-4 w-4 mr-1" />
                {new Date(position.createdAt).toLocaleDateString()}
              </div>
            </div>
          </div>
          <Button asChild>
            <Link href={`/admin/positions/${position.id}/edit`}>
              <Edit className="h-4 w-4 mr-2" />
              Edit Position
            </Link>
          </Button>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center">
              <Briefcase className="h-5 w-5 mr-2 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Department</p>
                <p>{position.department}</p>
              </div>
            </div>
            <div className="flex items-center">
              <MapPin className="h-5 w-5 mr-2 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Location</p>
                <p>{position.location}</p>
              </div>
            </div>
            <div className="flex items-center">
              <DollarSign className="h-5 w-5 mr-2 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Salary</p>
                <p>{position.salary}</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Job Description</h3>
            <div className="prose max-w-none">
              {position.description.split('\n').map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          </div>

          {position.responsibilities && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Key Responsibilities</h3>
              <ul className="list-disc pl-6 space-y-2">
                {position.responsibilities.split('\n').map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          )}

          {position.requirements?.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Requirements</h3>
              <ul className="list-disc pl-6 space-y-2">
                {position.requirements.map((req, i) => (
                  <li key={i}>{req}</li>
                ))}
              </ul>
            </div>
          )}

          {position.benefits && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Benefits & Perks</h3>
              <div className="prose max-w-none">
                {position.benefits.split('\n').map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}