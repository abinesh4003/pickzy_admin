'use client'
import { useEffect, useState, use } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  ArrowLeft, Edit, Calendar, MapPin, Briefcase, Users, 
  DollarSign, Eye, Clock, FileText, Award, Code, Layers,
  Bookmark, Hash, Database, Shield, UserCheck, Star
} from 'lucide-react'
import { showToast } from '@/components/ui/toast'
import Link from 'next/link'
import { Separator } from '@/components/ui/separator'

export default function PositionDetail({ params }) {
  const router = useRouter()
  const [position, setPosition] = useState(null)
  const [loading, setLoading] = useState(true)

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
      case 'active':
        return <Badge className='text-white bg-green-700'>{status}</Badge>
      case 'draft':
        return <Badge className='text-black bg-yellow-200 '>{status}</Badge>
      case 'closed':
        return <Badge className='text-white bg-red-700'>{status}</Badge>
      default:
        return <Badge className='text-white bg-gray-700'>{status}</Badge>
    }
  }


  const renderField = (icon, label, value, fallback = 'Not specified') => {
    if (!value && value !== 0) return null;
    const IconComponent = icon;
    return (
      <div className="flex items-start">
        <IconComponent className="h-5 w-5 mr-2 mt-0.5 text-muted-foreground flex-shrink-0" />
        <div>
          <p className="text-sm text-muted-foreground">{label}</p>
          <p className="whitespace-pre-wrap">{value || fallback}</p>
        </div>
      </div>
    )
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
            <div className="flex flex-wrap items-center gap-4 mt-2">
              {getStatusBadge(position.status)}
              <div className="flex items-center text-sm text-muted-foreground">
                <Users className="h-4 w-4 mr-1" />
                {position.applicants} applicants
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <Eye className="h-4 w-4 mr-1" />
                {position.views} views
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <Calendar className="h-4 w-4 mr-1" />
                {new Date(position.createdAt).toLocaleDateString()}
              </div>
              {position.updatedAt && (
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4 mr-1" />
                  Updated: {new Date(position.updatedAt).toLocaleDateString()}
                </div>
              )}
            </div>
          </div>
          <Button asChild>
            <Link href={`/admin/positions/${position.id}/edit`}>
              <Edit className="h-4 w-4 mr-2" />
              Edit Position
            </Link>
          </Button>
        </CardHeader>

        <Separator className="mb-6" />

        <CardContent className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {renderField(Briefcase, 'Department', position.department)}
            {renderField(Clock, 'Job Type', position.type)}
            {renderField(MapPin, 'Location', position.location)}
            {renderField(DollarSign, 'Salary', position.salary)}
            {renderField(Calendar, 'Posted', position.posted)}
            {renderField(Bookmark, 'Experience', position.experience)}
            {renderField(Code, 'Skills', position.skills)}
            {renderField(Layers, 'Level', position.level)}
            {renderField(Shield, 'Requirements', position.requirements?.join(', '))}
            {renderField(UserCheck, 'Hiring Manager', position.hiringManager)}
            {renderField(Star, 'Priority', position.priority)}
            {renderField(Hash, 'Position ID', position._id || position.id)}
          </div>

          {position.description && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center">
                <FileText className="h-5 w-5 mr-2" />
                Job Description
              </h3>
              <div className="prose max-w-none bg-muted/50 p-4 rounded-lg">
                {position.description.split('\n').map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
            </div>
          )}

          {position.responsibilities && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center">
                <Database className="h-5 w-5 mr-2" />
                Key Responsibilities
              </h3>
              <ul className="list-disc pl-6 space-y-2 bg-muted/50 p-4 rounded-lg">
                {position.responsibilities.split('\n').map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          )}

          {position.requirements?.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center">
                <Shield className="h-5 w-5 mr-2" />
                Requirements
              </h3>
              <ul className="list-disc pl-6 space-y-2 bg-muted/50 p-4 rounded-lg">
                {position.requirements.map((req, i) => (
                  <li key={i}>{req}</li>
                ))}
              </ul>
            </div>
          )}

          {position.benefits && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center">
                <Award className="h-5 w-5 mr-2" />
                Benefits & Perks
              </h3>
              <div className="prose max-w-none bg-muted/50 p-4 rounded-lg">
                {position.benefits.split('\n').map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
            </div>
          )}
        </CardContent>

        <CardFooter className="flex justify-between items-center pt-6 border-t">
          <div className="text-sm text-muted-foreground">
            Position ID: {position._id || position.id}
          </div>
          <div className="text-sm text-muted-foreground">
            Last updated: {new Date(position.updatedAt || position.createdAt).toLocaleString()}
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}