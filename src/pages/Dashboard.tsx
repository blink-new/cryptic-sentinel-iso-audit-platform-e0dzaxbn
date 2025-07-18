import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Shield, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  Clock,
  Users,
  FileText,
  BarChart3,
  Upload,
  Zap
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Progress } from '../components/ui/progress'
import { Badge } from '../components/ui/badge'
import { Button } from '../components/ui/button'
import { Link } from 'react-router-dom'
import blink from '../blink/client'

interface CompanyProfile {
  id: string
  user_id: string
  company_name?: string
  industry?: string
  employee_count: number
  audit_progress: number
  controls_mapped: number
  total_controls: number
  high_risks: number
  evidence_items: number
}

interface DashboardStats {
  auditProgress: number
  controlsMapped: number
  totalControls: number
  highRisks: number
  evidenceItems: number
  vendorCount: number
  threatsDetected: number
}

const recentActivities = [
  {
    id: 1,
    action: 'Welcome to Cryptic Sentinel! Start by uploading your first document.',
    time: 'Just now',
    type: 'info',
  },
  {
    id: 2,
    action: 'System initialized and ready for ISO 27001 audit automation',
    time: '1 minute ago',
    type: 'success',
  },
  {
    id: 3,
    action: 'AI Copilot is online and ready to assist with compliance questions',
    time: '2 minutes ago',
    type: 'success',
  },
  {
    id: 4,
    action: 'Digital Risk Protection monitoring activated',
    time: '3 minutes ago',
    type: 'info',
  },
]

const upcomingTasks = [
  {
    id: 1,
    task: 'Upload your first policy document to AI Audit Engine',
    dueDate: 'Today',
    priority: 'High',
    href: '/audit-engine'
  },
  {
    id: 2,
    task: 'Set up evidence collection for key controls',
    dueDate: 'This week',
    priority: 'Medium',
    href: '/evidence'
  },
  {
    id: 3,
    task: 'Configure Digital Risk Protection monitoring',
    dueDate: 'This week',
    priority: 'Medium',
    href: '/digital-risk-protection'
  },
]

export function Dashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    auditProgress: 0,
    controlsMapped: 0,
    totalControls: 114,
    highRisks: 0,
    evidenceItems: 0,
    vendorCount: 0,
    threatsDetected: 0
  })
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        // Get current user
        const currentUser = await blink.auth.me()
        setUser(currentUser)

        // Initialize company profile if it doesn't exist
        const profiles = await blink.db.companyProfile.list({
          where: { userId: currentUser.id },
          limit: 1
        })

        let profile: CompanyProfile
        if (profiles.length === 0) {
          // Create initial profile
          profile = await blink.db.companyProfile.create({
            id: `profile_${Date.now()}`,
            userId: currentUser.id,
            companyName: 'Your Company',
            industry: 'Technology',
            employeeCount: 0,
            auditProgress: 0,
            controlsMapped: 0,
            totalControls: 114,
            highRisks: 0,
            evidenceItems: 0
          })
        } else {
          profile = profiles[0]
        }

        // Get evidence count
        const evidenceItems = await blink.db.evidenceItems.list({
          where: { userId: currentUser.id }
        })

        // Get risk count
        const riskItems = await blink.db.riskItems.list({
          where: { userId: currentUser.id }
        })
        const highRisks = riskItems.filter(risk => risk.riskScore >= 15).length

        // Get vendor count
        const vendors = await blink.db.vendors.list({
          where: { userId: currentUser.id }
        })

        // Get threat count
        const threats = await blink.db.drpThreats.list({
          where: { userId: currentUser.id }
        })

        // Get audit documents count for controls mapped
        const auditDocs = await blink.db.auditDocuments.list({
          where: { userId: currentUser.id }
        })

        // Calculate audit progress based on uploaded documents and evidence
        const totalItems = evidenceItems.length + auditDocs.length
        const progressPercentage = Math.min((totalItems / 20) * 100, 100) // Assume 20 items for 100% progress

        setStats({
          auditProgress: Math.round(progressPercentage),
          controlsMapped: auditDocs.length,
          totalControls: 114,
          highRisks: highRisks,
          evidenceItems: evidenceItems.length,
          vendorCount: vendors.length,
          threatsDetected: threats.length
        })

        // Update company profile with latest stats
        await blink.db.companyProfile.update(profile.id, {
          auditProgress: Math.round(progressPercentage),
          controlsMapped: auditDocs.length,
          highRisks: highRisks,
          evidenceItems: evidenceItems.length
        })

      } catch (error) {
        console.error('Error loading dashboard data:', error)
      } finally {
        setLoading(false)
      }
    }

    loadDashboardData()
  }, [])

  const dashboardStats = [
    {
      title: 'Audit Progress',
      value: `${stats.auditProgress}%`,
      change: stats.auditProgress > 0 ? `+${stats.auditProgress}%` : '0%',
      icon: Shield,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      title: 'Controls Mapped',
      value: `${stats.controlsMapped}/${stats.totalControls}`,
      change: stats.controlsMapped > 0 ? `+${stats.controlsMapped}` : '0',
      icon: CheckCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      title: 'High Risks',
      value: stats.highRisks.toString(),
      change: stats.highRisks > 0 ? `+${stats.highRisks}` : '0',
      icon: AlertTriangle,
      color: 'text-red-600',
      bgColor: 'bg-red-100',
    },
    {
      title: 'Evidence Items',
      value: stats.evidenceItems.toString(),
      change: stats.evidenceItems > 0 ? `+${stats.evidenceItems}` : '0',
      icon: FileText,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
  ]

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-6 space-y-8">
        <div className="animate-pulse space-y-8">
          <div className="h-8 bg-secondary rounded w-1/3"></div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-32 bg-secondary rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-7xl mx-auto px-6 space-y-8"
    >
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here's your ISO 27001 audit progress overview.
        </p>
      </div>

      {/* Quick Start Banner */}
      {stats.auditProgress === 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gradient-to-r from-primary to-accent rounded-lg p-6 text-primary-foreground cyber-glow"
        >
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <h2 className="text-xl font-bold">Get Started with Cryptic Sentinel</h2>
              <p className="text-primary-foreground/90">
                Upload your first document to begin AI-powered ISO 27001 audit automation
              </p>
            </div>
            <div className="flex space-x-3">
              <Button asChild variant="secondary" className="hover:scale-105 transition-transform">
                <Link to="/audit-engine">
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Document
                </Link>
              </Button>
              <Button asChild variant="outline" className="border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10">
                <Link to="/ai-copilot">
                  <Zap className="w-4 h-4 mr-2" />
                  Try AI Copilot
                </Link>
              </Button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {dashboardStats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="relative overflow-hidden cyber-border hover:cyber-glow transition-all duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                  <stat.icon className={`h-4 w-4 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  <span className={stat.change.startsWith('+') && stat.change !== '+0%' && stat.change !== '+0' ? 'text-green-600' : 'text-muted-foreground'}>
                    {stat.change}
                  </span>
                  {' '}from last week
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Audit Progress */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2"
        >
          <Card className="cyber-border">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="h-5 w-5" />
                <span>Audit Progress by Domain</span>
              </CardTitle>
              <CardDescription>
                ISO 27001:2022 Annex A control implementation status
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {[
                { domain: 'A.5 Information Security Policies', progress: Math.min(stats.controlsMapped * 10, 95), total: 2 },
                { domain: 'A.6 Organization of Information Security', progress: Math.min(stats.controlsMapped * 8, 87), total: 7 },
                { domain: 'A.7 Human Resource Security', progress: Math.min(stats.controlsMapped * 7, 78), total: 6 },
                { domain: 'A.8 Asset Management', progress: Math.min(stats.controlsMapped * 6, 65), total: 10 },
                { domain: 'A.9 Access Control', progress: Math.min(stats.controlsMapped * 5, 72), total: 14 },
                { domain: 'A.10 Cryptography', progress: Math.min(stats.controlsMapped * 4, 45), total: 2 },
              ].map((item, index) => (
                <div key={item.domain} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">{item.domain}</span>
                    <span className="text-muted-foreground">
                      {Math.round((item.progress / 100) * item.total)}/{item.total} controls
                    </span>
                  </div>
                  <Progress value={item.progress} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent Activities */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="cyber-border">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Clock className="h-5 w-5" />
                <span>Recent Activities</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex space-x-3">
                    <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                      activity.type === 'success' ? 'bg-green-500' :
                      activity.type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
                    }`} />
                    <div className="space-y-1">
                      <p className="text-sm">{activity.action}</p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Upcoming Tasks */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="cyber-border">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="h-5 w-5" />
              <span>Recommended Next Steps</span>
            </CardTitle>
            <CardDescription>
              Action items to accelerate your compliance journey
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingTasks.map((task) => (
                <div key={task.id} className="flex items-center justify-between p-4 border rounded-lg cyber-border hover:cyber-glow transition-all duration-300">
                  <div className="space-y-1">
                    <p className="font-medium">{task.task}</p>
                    <p className="text-sm text-muted-foreground">Due: {task.dueDate}</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Badge variant={
                      task.priority === 'High' ? 'destructive' :
                      task.priority === 'Medium' ? 'default' : 'secondary'
                    }>
                      {task.priority}
                    </Badge>
                    <Button asChild variant="outline" size="sm" className="hover:scale-105 transition-transform">
                      <Link to={task.href}>
                        Start
                      </Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}