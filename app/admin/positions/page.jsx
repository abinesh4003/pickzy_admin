'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Plus, Edit, Trash2, Eye } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { showToast } from '@/components/ui/toast'

 const PositionsPage = () => {
  const router = useRouter()
  const [positions, setPositions] = useState([])
  const [loading, setLoading] = useState(true)
  const [deletingId, setDeletingId] = useState(null)

  useEffect(() => {
    const fetchPositions = async () => {
      try {
        const response = await fetch('/api/positions')
        if (!response.ok) throw new Error('Failed to fetch positions')
        const data = await response.json()
        setPositions(data)
      } catch (error) {
        console.error('Error fetching positions:', error)
        showToast('Error', 'Failed to load positions', 'error')
      } finally {
        setLoading(false)
      }
    }

    fetchPositions()
  }, [])

  const handleDelete = async (id) => {
    setDeletingId(id)
    try {
      const response = await fetch(`/api/positions/${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) throw new Error('Failed to delete position')

      setPositions(positions.filter(position => position.id !== id))
      showToast('Success', 'Position deleted successfully', 'success')
    } catch (error) {
      console.error('Error deleting position:', error)
      showToast('Error', 'Failed to delete position', 'error')
    } finally {
      setDeletingId(null)
    }
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case 'active':
        return <Badge className='text-white bg-green-700'>{status}</Badge>
      case 'draft':
        return <Badge className='text-white bg-yellow-700 '>{status}</Badge>
      case 'closed':
        return <Badge className='text-white bg-red-700'>{status}</Badge>
      default:
        return <Badge className='text-white bg-gray-700'>{status}</Badge>
    }
  }

  if (loading) {
    return (
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle>Loading Positions...</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-0 shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Job Positions</CardTitle>
          <p className="text-sm text-muted-foreground">
            Manage your open positions
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/positions/new">
            <Plus className="h-4 w-4 mr-2" />
            New Position
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Applicants</TableHead>
              <TableHead>Created</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {positions.length > 0 ? (
              positions.map(position => (
                <TableRow key={position.id}>
                  <TableCell className="font-medium">{position.title}</TableCell>
                  <TableCell>{position.department}</TableCell>
                  <TableCell>{position.type}</TableCell>
                  <TableCell>{position.location}</TableCell>
                  <TableCell>{getStatusBadge(position.status)}</TableCell>
                  <TableCell>{position.applicants}</TableCell>
                  <TableCell>
                    {new Date(position.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="flex justify-end space-x-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => router.push(`/admin/positions/${position.id}`)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => router.push(`/admin/positions/${position.id}/edit`)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(position.id)}
                      disabled={deletingId === position.id}
                    >
                      {deletingId === position.id ? (
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                      ) : (
                        <Trash2 className="h-4 w-4 text-destructive" />
                      )}
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                  No positions found. Create your first position.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

export default PositionsPage;