import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Calendar, 
  CheckCircle, 
  Clock, 
  AlertTriangle, 
  Plus,
  Filter,
  Download,
  Users,
  FileText,
  Shield,
  Target,
  Zap
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Badge } from '../components/ui/badge'
import { Progress } from '../components/ui/progress'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog'
import { Input } from '../components/ui/input'
import { Textarea } from '../components/ui/textarea'
import { Label } from '../components/ui/label'

interface Milestone {
  id: string
  title: string
  description: string
  category: 'policy' | 'control' | 'audit' | 'training' | 'assessment'
  status: 'completed' | 'in-progress' | 'pending' | 'overdue'
  priority: 'high' | 'medium' | 'low'
  startDate: Date
  endDate: Date
  assignee: string
  dependencies: string[]
  progress: number
  controls: string[]
}

const initialMilestones: Milestone[] = [
  {
    id: '1',
    title: 'Information Security Policy Development',
    description: 'Create comprehensive information security policies aligned with ISO 27001',
    category: 'policy',
    status: 'completed',
    priority: 'high',
    startDate: new Date('2024-01-01'),
    endDate: new Date('2024-01-15'),
    assignee: 'Security Team',
    dependencies: [],
    progress: 100,
    controls: ['A.5.1.1', 'A.5.1.2']
  },
  {
    id: '2',
    title: 'Asset Inventory and Classification',
    description: 'Complete inventory of all information assets and classify them',
    category: 'control',
    status: 'completed',
    priority: 'high',
    startDate: new Date('2024-01-16'),
    endDate: new Date('2024-02-15'),
    assignee: 'IT Team',
    dependencies: ['1'],
    progress: 100,
    controls: ['A.8.1.1', 'A.8.1.2', 'A.8.2.1']
  },
  {
    id: '3',
    title: 'Risk Assessment Implementation',
    description: 'Conduct comprehensive risk assessment across all business areas',
    category: 'assessment',
    status: 'in-progress',
    priority: 'high',
    startDate: new Date('2024-02-01'),
    endDate: new Date('2024-03-15'),
    assignee: 'Risk Team',
    dependencies: ['2'],
    progress: 75,
    controls: ['A.6.1.1', 'A.6.1.2']
  },
  {
    id: '4',
    title: 'Access Control Implementation',
    description: 'Implement role-based access controls and user access management',
    category: 'control',
    status: 'in-progress',
    priority: 'high',
    startDate: new Date('2024-02-15'),
    endDate: new Date('2024-04-01'),
    assignee: 'IT Security',
    dependencies: ['2'],
    progress: 60,
    controls: ['A.9.1.1', 'A.9.1.2', 'A.9.2.1', 'A.9.2.2']
  },
  {
    id: '5',
    title: 'Security Awareness Training',
    description: 'Deliver security awareness training to all employees',
    category: 'training',
    status: 'pending',
    priority: 'medium',
    startDate: new Date('2024-03-01'),
    endDate: new Date('2024-04-15'),
    assignee: 'HR Team',
    dependencies: ['1'],
    progress: 0,
    controls: ['A.7.2.2']
  },
  {
    id: '6',
    title: 'Incident Response Plan',
    description: 'Develop and test incident response procedures',
    category: 'control',
    status: 'pending',
    priority: 'high',
    startDate: new Date('2024-03-15'),
    endDate: new Date('2024-05-01'),
    assignee: 'Security Team',
    dependencies: ['3'],
    progress: 0,
    controls: ['A.16.1.1', 'A.16.1.2', 'A.16.1.3']
  },
  {
    id: '7',
    title: 'Internal Audit Preparation',
    description: 'Prepare for internal ISO 27001 audit',
    category: 'audit',
    status: 'pending',
    priority: 'high',
    startDate: new Date('2024-05-01'),
    endDate: new Date('2024-06-01'),
    assignee: 'Audit Team',
    dependencies: ['4', '5', '6'],
    progress: 0,
    controls: ['A.18.2.1']
  },
  {
    id: '8',
    title: 'External Certification Audit',
    description: 'Undergo external certification audit',
    category: 'audit',
    status: 'pending',
    priority: 'high',
    startDate: new Date('2024-06-15'),
    endDate: new Date('2024-07-15'),
    assignee: 'Management',
    dependencies: ['7'],
    progress: 0,
    controls: []
  }
]

const categoryIcons = {
  policy: FileText,
  control: Shield,
  audit: Target,
  training: Users,
  assessment: AlertTriangle
}

const categoryColors = {
  policy: 'bg-blue-100 text-blue-800',
  control: 'bg-green-100 text-green-800',
  audit: 'bg-purple-100 text-purple-800',
  training: 'bg-orange-100 text-orange-800',
  assessment: 'bg-red-100 text-red-800'
}

const statusColors = {
  completed: 'bg-green-500',
  'in-progress': 'bg-blue-500',
  pending: 'bg-gray-400',
  overdue: 'bg-red-500'
}

export function ComplianceTimeline() {
  const [milestones, setMilestones] = useState<Milestone[]>(initialMilestones)
  const [filter, setFilter] = useState<string>('all')
  const [viewMode, setViewMode] = useState<'timeline' | 'gantt'>('timeline')
  const [selectedMilestone, setSelectedMilestone] = useState<Milestone | null>(null)
  const [isAddingMilestone, setIsAddingMilestone] = useState(false)

  const filteredMilestones = milestones.filter(milestone => {
    if (filter === 'all') return true
    if (filter === 'active') return milestone.status === 'in-progress' || milestone.status === 'pending'
    return milestone.category === filter
  })

  const overallProgress = Math.round(
    milestones.reduce((acc, milestone) => acc + milestone.progress, 0) / milestones.length
  )

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case 'in-progress':
        return <Zap className="w-4 h-4 text-blue-600" />
      case 'overdue':
        return <AlertTriangle className="w-4 h-4 text-red-600" />
      default:
        return <Clock className="w-4 h-4 text-gray-600" />
    }
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    })
  }

  const getDaysRemaining = (endDate: Date) => {
    const today = new Date()
    const diffTime = endDate.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-7xl mx-auto px-6 space-y-8"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Compliance Timeline</h1>
              <p className="text-muted-foreground">Visual Gantt-style timeline of ISO implementation milestones</p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Filter by..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Milestones</SelectItem>
              <SelectItem value="active">Active Only</SelectItem>
              <SelectItem value="policy">Policies</SelectItem>
              <SelectItem value="control">Controls</SelectItem>
              <SelectItem value="audit">Audits</SelectItem>
              <SelectItem value="training">Training</SelectItem>
              <SelectItem value="assessment">Assessments</SelectItem>
            </SelectContent>
          </Select>
          
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          
          <Dialog open={isAddingMilestone} onOpenChange={setIsAddingMilestone}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add Milestone
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add New Milestone</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Title</Label>
                    <Input id="title" placeholder="Milestone title" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="policy">Policy</SelectItem>
                        <SelectItem value="control">Control</SelectItem>
                        <SelectItem value="audit">Audit</SelectItem>
                        <SelectItem value="training">Training</SelectItem>
                        <SelectItem value="assessment">Assessment</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" placeholder="Milestone description" />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="startDate">Start Date</Label>
                    <Input id="startDate" type="date" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="endDate">End Date</Label>
                    <Input id="endDate" type="date" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="assignee">Assignee</Label>
                    <Input id="assignee" placeholder="Team/Person" />
                  </div>
                </div>
                <div className="flex justify-end space-x-3">
                  <Button variant="outline" onClick={() => setIsAddingMilestone(false)}>
                    Cancel
                  </Button>
                  <Button onClick={() => setIsAddingMilestone(false)}>
                    Add Milestone
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Progress Overview */}
      <div className="grid gap-6 md:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Overall Progress</p>
                <p className="text-2xl font-bold">{overallProgress}%</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <Target className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <Progress value={overallProgress} className="mt-3" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Completed</p>
                <p className="text-2xl font-bold">
                  {milestones.filter(m => m.status === 'completed').length}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">In Progress</p>
                <p className="text-2xl font-bold">
                  {milestones.filter(m => m.status === 'in-progress').length}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Zap className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Pending</p>
                <p className="text-2xl font-bold">
                  {milestones.filter(m => m.status === 'pending').length}
                </p>
              </div>
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                <Clock className="w-6 h-6 text-gray-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Timeline View */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Implementation Timeline</span>
            <div className="flex items-center space-x-2">
              <Button
                variant={viewMode === 'timeline' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('timeline')}
              >
                Timeline
              </Button>
              <Button
                variant={viewMode === 'gantt' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('gantt')}
              >
                Gantt Chart
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {filteredMilestones.map((milestone, index) => {
              const Icon = categoryIcons[milestone.category]
              const daysRemaining = getDaysRemaining(milestone.endDate)
              
              return (
                <motion.div
                  key={milestone.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative"
                >
                  {/* Timeline connector */}
                  {index < filteredMilestones.length - 1 && (
                    <div className="absolute left-6 top-16 w-0.5 h-16 bg-border" />
                  )}
                  
                  <div className="flex items-start space-x-4">
                    {/* Status indicator */}
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${statusColors[milestone.status]} relative z-10`}>
                      {getStatusIcon(milestone.status)}
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="bg-card border rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer"
                           onClick={() => setSelectedMilestone(milestone)}>
                        <div className="flex items-start justify-between">
                          <div className="space-y-2">
                            <div className="flex items-center space-x-3">
                              <h3 className="font-semibold text-lg">{milestone.title}</h3>
                              <Badge className={categoryColors[milestone.category]}>
                                <Icon className="w-3 h-3 mr-1" />
                                {milestone.category}
                              </Badge>
                              <Badge variant={milestone.priority === 'high' ? 'destructive' : 
                                           milestone.priority === 'medium' ? 'default' : 'secondary'}>
                                {milestone.priority} priority
                              </Badge>
                            </div>
                            <p className="text-muted-foreground">{milestone.description}</p>
                            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                              <span>📅 {formatDate(milestone.startDate)} - {formatDate(milestone.endDate)}</span>
                              <span>👤 {milestone.assignee}</span>
                              {milestone.controls.length > 0 && (
                                <span>🛡️ {milestone.controls.join(', ')}</span>
                              )}
                            </div>
                          </div>
                          
                          <div className="text-right space-y-2">
                            <div className="text-sm font-medium">
                              {milestone.progress}% Complete
                            </div>
                            {milestone.status !== 'completed' && (
                              <div className={`text-sm ${daysRemaining < 0 ? 'text-red-600' : 
                                             daysRemaining < 7 ? 'text-orange-600' : 'text-muted-foreground'}`}>
                                {daysRemaining < 0 ? `${Math.abs(daysRemaining)} days overdue` :
                                 daysRemaining === 0 ? 'Due today' :
                                 `${daysRemaining} days remaining`}
                              </div>
                            )}
                          </div>
                        </div>
                        
                        {milestone.status !== 'completed' && (
                          <div className="mt-4">
                            <Progress value={milestone.progress} className="h-2" />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Milestone Detail Dialog */}
      <Dialog open={!!selectedMilestone} onOpenChange={() => setSelectedMilestone(null)}>
        <DialogContent className="max-w-2xl">
          {selectedMilestone && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${statusColors[selectedMilestone.status]}`}>
                    {getStatusIcon(selectedMilestone.status)}
                  </div>
                  <span>{selectedMilestone.title}</span>
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-6">
                <div className="flex items-center space-x-3">
                  <Badge className={categoryColors[selectedMilestone.category]}>
                    {selectedMilestone.category}
                  </Badge>
                  <Badge variant={selectedMilestone.priority === 'high' ? 'destructive' : 
                               selectedMilestone.priority === 'medium' ? 'default' : 'secondary'}>
                    {selectedMilestone.priority} priority
                  </Badge>
                </div>
                
                <p className="text-muted-foreground">{selectedMilestone.description}</p>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium">Start Date</Label>
                    <p className="text-sm">{formatDate(selectedMilestone.startDate)}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">End Date</Label>
                    <p className="text-sm">{formatDate(selectedMilestone.endDate)}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Assignee</Label>
                    <p className="text-sm">{selectedMilestone.assignee}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Progress</Label>
                    <p className="text-sm">{selectedMilestone.progress}%</p>
                  </div>
                </div>
                
                {selectedMilestone.controls.length > 0 && (
                  <div>
                    <Label className="text-sm font-medium">Related Controls</Label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {selectedMilestone.controls.map(control => (
                        <Badge key={control} variant="outline">{control}</Badge>
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Progress</Label>
                  <Progress value={selectedMilestone.progress} className="h-3" />
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </motion.div>
  )
}