'use client'

import { useState } from 'react'
import { MapPin, DollarSign, Plus } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import {
  positionTypes,
  departments,
  experienceLevels,
  positionStatuses,
} from '@/lib/constants'

export function PositionForm({
  initialData,
  onSubmit,
  isSubmitting,
  formType = 'add',
}) {
  const [requirements, setRequirements] = useState(initialData.requirements || [])
  const [newRequirement, setNewRequirement] = useState('')
  const [activeTab, setActiveTab] = useState('details')
  const [formData, setFormData] = useState(initialData)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ 
      ...prev, 
      [name]: name === 'applicants' || name === 'views' ? Number(value) : value 
    }))
  }

  const handleSelectChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const addRequirement = () => {
    if (newRequirement.trim() && !requirements.includes(newRequirement.trim())) {
      const updated = [...requirements, newRequirement.trim()]
      setRequirements(updated)
      setFormData(prev => ({ ...prev, requirements: updated }))
      setNewRequirement('')
    }
  }

  const removeRequirement = (req) => {
    const updated = requirements.filter(r => r !== req)
    setRequirements(updated)
    setFormData(prev => ({ ...prev, requirements: updated }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="description">Description</TabsTrigger>
          <TabsTrigger value="requirements">Requirements</TabsTrigger>
        </TabsList>

        {/* Details Tab */}
        <TabsContent value="details" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Job Title */}
            <div>
              <Label htmlFor="title">Job Title *</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* Department */}
            <div>
              <Label htmlFor="department">Department *</Label>
              <Select
                value={formData.department}
                onValueChange={(value) => handleSelectChange('department', value)}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent>
                  {departments.map((dept) => (
                    <SelectItem key={dept} value={dept}>
                      {dept}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Employment Type */}
            <div>
              <Label htmlFor="type">Employment Type *</Label>
              <Select
                value={formData.type}
                onValueChange={(value) => handleSelectChange('type', value)}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  {positionTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Experience Level */}
            <div>
              <Label htmlFor="experience">Experience Level *</Label>
              <Select
                value={formData.experience}
                onValueChange={(value) => handleSelectChange('experience', value)}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select level" />
                </SelectTrigger>
                <SelectContent>
                  {experienceLevels.map((level) => (
                    <SelectItem key={level} value={level}>
                      {level}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Location */}
            <div>
              <Label htmlFor="location">Location *</Label>
              <Input
                id="location"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* Salary */}
            <div>
              <Label htmlFor="salary">Salary Range *</Label>
              <Input
                id="salary"
                name="salary"
                value={formData.salary}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* Status (Edit only) */}
            {formType === 'edit' && (
              <div>
                <Label htmlFor="status">Status</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) => handleSelectChange('status', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    {positionStatuses.map((status) => (
                      <SelectItem key={status} value={status}>
                        {status}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Applicants (Edit only) */}
            {formType === 'edit' && (
              <div>
                <Label htmlFor="applicants">Applicants</Label>
                <Input
                  id="applicants"
                  name="applicants"
                  type="number"
                  min="0"
                  value={formData.applicants}
                  onChange={handleInputChange}
                />
              </div>
            )}

            {/* Views (Edit only) */}
            {formType === 'edit' && (
              <div>
                <Label htmlFor="views">Views</Label>
                <Input
                  id="views"
                  name="views"
                  type="number"
                  min="0"
                  value={formData.views}
                  onChange={handleInputChange}
                />
              </div>
            )}
          </div>

          <div className="flex justify-between pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => router.push('/admin/positions')}
            >
              Cancel
            </Button>
            <Button 
              type="button" 
              onClick={() => setActiveTab('description')}
            >
              Next: Description
            </Button>
          </div>
        </TabsContent>

        {/* Description Tab */}
        <TabsContent value="description" className="space-y-6">
          <div>
            <Label htmlFor="description">Job Description *</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={8}
              required
            />
          </div>

          <div>
            <Label htmlFor="responsibilities">Key Responsibilities</Label>
            <Textarea
              id="responsibilities"
              name="responsibilities"
              value={formData.responsibilities}
              onChange={handleInputChange}
              rows={6}
            />
          </div>

          <div>
            <Label htmlFor="benefits">Benefits & Perks</Label>
            <Textarea
              id="benefits"
              name="benefits"
              value={formData.benefits}
              onChange={handleInputChange}
              rows={4}
            />
          </div>

          <div className="flex justify-between pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setActiveTab('details')}
            >
              Back
            </Button>
            <Button 
              type="button" 
              onClick={() => setActiveTab('requirements')}
            >
              Next: Requirements
            </Button>
          </div>
        </TabsContent>

        {/* Requirements Tab */}
        <TabsContent value="requirements" className="space-y-6">
          <div>
            <Label>Requirements *</Label>
            <div className="flex gap-2 mb-2">
              <Input
                value={newRequirement}
                onChange={(e) => setNewRequirement(e.target.value)}
                placeholder="Add a requirement (e.g. Python, UI/UX)"
              />
              <Button
                type="button"
                onClick={addRequirement}
                variant="outline"
                disabled={!newRequirement.trim()}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add
              </Button>
            </div>

            <div className="flex flex-wrap gap-2">
              {requirements.map((req) => (
                <Badge 
                  key={req} 
                  variant="outline" 
                  className="flex items-center gap-1 py-1 px-3 rounded-full"
                >
                  {req}
                  <button
                    type="button"
                    onClick={() => removeRequirement(req)}
                    className="text-red-500 hover:text-red-700 ml-1"
                  >
                    ×
                  </button>
                </Badge>
              ))}
            </div>
          </div>

          <div className="flex justify-between pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setActiveTab('description')}
            >
              Back
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <svg 
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" 
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="none" 
                    viewBox="0 0 24 24"
                  >
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {formType === 'add' ? 'Creating...' : 'Updating...'}
                </>
              ) : (
                <>
                  {formType === 'add' ? 'Create Position' : 'Update Position'}
                </>
              )}
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </form>
  )
}