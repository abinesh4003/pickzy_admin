import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Home, Briefcase, User, LogIn } from 'lucide-react'

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <h1 className="text-4xl font-bold tracking-tight">
          Welcome to <span className="text-primary">RecruitPro</span>
        </h1>
      </div>

      <div className="mb-32 grid text-center lg:mb-0 lg:grid-cols-3 lg:text-left gap-8">
        <Card className="group hover:border-primary transition-colors">
          <CardHeader>
            <div className="bg-secondary p-3 rounded-full w-fit mb-4">
              <Briefcase className="h-6 w-6 text-primary" />
            </div>
            <CardTitle>For Employers</CardTitle>
            <CardDescription>
              Find the best talent for your organization
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild variant="outline" className="w-full">
              <Link href="/admin">
                Employer Dashboard
                <LogIn className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="group hover:border-primary transition-colors">
          <CardHeader>
            <div className="bg-secondary p-3 rounded-full w-fit mb-4">
              <User className="h-6 w-6 text-primary" />
            </div>
            <CardTitle>For Candidates</CardTitle>
            <CardDescription>
              Discover your next career opportunity
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild variant="outline" className="w-full">
              <Link href="/jobs">
                Browse Jobs
                <LogIn className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="group hover:border-primary transition-colors">
          <CardHeader>
            <div className="bg-secondary p-3 rounded-full w-fit mb-4">
              <Home className="h-6 w-6 text-primary" />
            </div>
            <CardTitle>About Us</CardTitle>
            <CardDescription>
              Learn about our recruitment platform
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild variant="outline" className="w-full">
              <Link href="/about">
                Our Story
                <LogIn className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}