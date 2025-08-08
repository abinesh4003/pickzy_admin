// app/admin/positions/new/page.jsx
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { showToast } from '@/components/ui/toast'
import { PositionForm } from '@/components/admin/PositionForm'


export default function NewPositionPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const initialFormData = {
    title: '',
    department: '',
    type: '',
    location: '',
    salary: '',
    experience: '',
    posted: '',
    description: '',
    responsibilities: '',
    benefits: '',
    requirements: [],
    status: 'draft',
    applicants: 0,
    views: 0,
  }

  const handleSubmit = async (formData) => {
    setIsSubmitting(true)
    try {
      const response = await fetch('/api/positions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to create position')
      }

      const data = await response.json()
      showToast('Success', 'Position created successfully', 'success')
      router.push('/admin/positions')
    } catch (error) {
      console.error('Error creating position:', error)
      showToast(
        'Error', 
        error instanceof Error ? error.message : 'Failed to create position',
        'error'
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="border-0 shadow-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Create New Position</CardTitle>
        <p className="text-sm text-muted-foreground">
          Fill in all required fields to create a new job opening
        </p>
      </CardHeader>
      <CardContent>
        <PositionForm
          initialData={initialFormData}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
          formType="add"
        />
      </CardContent>
    </Card>
  )
}