import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

export function AdminStatsCard() {
  return (
    <Card className="border-0 shadow-sm">
      <CardContent className="p-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Quick Stats</h3>
          <Separator className="my-2" />
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Active Positions</span>
              <span className="text-sm font-medium">24</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Applications Today</span>
              <span className="text-sm font-medium">12</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Total Candidates</span>
              <span className="text-sm font-medium">342</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}