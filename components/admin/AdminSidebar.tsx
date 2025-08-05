'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Briefcase, Users, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

export function AdminSidebar() {
  const pathname = usePathname()

  const menuItems = [
    { href: '/admin', icon: <Briefcase className="h-4 w-4 mr-2" />, label: 'Dashboard' },
    { href: '/admin/positions', icon: <Users className="h-4 w-4 mr-2" />, label: 'Positions' },
    { href: '/admin/positions/new', icon: <Plus className="h-4 w-4 mr-2" />, label: 'New Position' },
  ]

  return (
    <div className="space-y-4">
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium">Admin Menu</h3>
          <Separator className="my-2" />
        </div>
        <nav className="space-y-1">
          {menuItems.map((item) => (
            <Button
              key={item.href}
              variant={pathname === item.href ? 'secondary' : 'ghost'}
              className="w-full justify-start"
              asChild
            >
              <Link href={item.href}>
                {item.icon}
                {item.label}
              </Link>
            </Button>
          ))}
        </nav>
      </div>
    </div>
  )
}