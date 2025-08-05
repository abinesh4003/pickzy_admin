"use client"
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { useEffect, useState } from 'react'

export function AdminStatsCard() {

  const[positions,setPositions]=useState([])

  
  useEffect(() => {
    const fetchPositions = async () => {
      try {
        const response = await fetch('/api/positions')
        if (!response.ok) throw new Error('Failed to fetch positions')
        const data = await response.json()
        setPositions(data)
      } catch (error) {
        console.error('Error fetching positions:', error)
      }
    }
    fetchPositions()

  }, [])
  
  return (
    <Card className="border-0 shadow-sm">
      <CardContent className="p-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Quick Stats</h3>
          <Separator className="my-2" />
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Total Positions</span>
              <span className="text-sm font-medium">{positions.length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Active Positions</span>
              <span className="text-sm font-medium">{positions.filter((p) => p.status === 'active').length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Total Applicants</span>
              <span className="text-sm font-medium"> {positions.reduce((sum, pos) => sum + (pos.applicants || 0), 0)} </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}