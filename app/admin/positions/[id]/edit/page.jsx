// app/admin/positions/[id]/edit/page.jsx
'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { showToast } from '@/components/ui/toast'
import { PositionForm } from '@/components/admin/PositionForm'

export default function EditPosition() {
  const router = useRouter()
  const { id: positionId } = useParams()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [initialData, setInitialData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPosition = async () => {
      try {
        const response = await fetch(`/api/positions/${positionId}`)
        if (!response.ok) throw new Error('Failed to fetch position')
        const data = await response.json()
        
        setInitialData({
          ...data,
          _id: data._id?.toString(), // Convert ObjectId to string if needed
        })
      } catch (error) {
        console.error('Error fetching position:', error)
        showToast('Error', 'Failed to load position', 'error')
      } finally {
        setLoading(false)
      }
    }

    if (positionId) fetchPosition()
  }, [positionId])

  const handleSubmit = async (formData) => {
    setIsSubmitting(true)
    try {
      const response = await fetch(`/api/positions/${positionId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          updatedAt: new Date().toISOString(),
        }),
      })

      if (!response.ok) throw new Error('Failed to update position')

      showToast('Success', 'Position updated successfully', 'success')
      router.push(`/admin/positions/${positionId}`)
    } catch (error) {
      console.error('Error updating position:', error)
      showToast(
        'Error', 
        error instanceof Error ? error.message : 'Failed to update position',
        'error'
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!initialData) {
    return (
      <div className="flex justify-center items-center h-64">
        <p>Position not found</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <Button variant="outline" onClick={() => router.back()}>
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Position
      </Button>

      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Edit Position</CardTitle>
          <p className="text-sm text-muted-foreground">
            Update the details of this job position
          </p>
        </CardHeader>
        <CardContent>
          <PositionForm
            initialData={initialData}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
            formType="edit"
          />
        </CardContent>
      </Card>
    </div>
  )
}