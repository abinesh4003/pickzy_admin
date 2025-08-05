import { AdminSidebar } from '@/components/admin/AdminSidebar'
import { AdminHeader } from '@/components/admin/AdminHeader'
import { AdminStatsCard } from '@/components/admin/AdminStatsCard'
import { Card, CardContent } from '@/components/ui/card'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sticky Sidebar */}
          <div className="lg:col-span-3">
            <div className="sticky top-24 space-y-4">
              <Card className="border-0 shadow-sm">
                <CardContent className="p-6">
                  <AdminSidebar />
                </CardContent>
              </Card>
              <AdminStatsCard />
            </div>
          </div>
          
          {/* Main Content */}
          <div className="lg:col-span-9">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}