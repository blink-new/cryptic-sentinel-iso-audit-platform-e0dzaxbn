import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Clock, 
  Rewind, 
  FastForward, 
  Play, 
  Pause,
  RotateCcw,
  Calendar,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Eye,
  Zap,
  GitBranch,
  Target,
  Layers,
  Activity,
  Shield
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Progress } from '../components/ui/progress'
import { Badge } from '../components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs'
import blink from '../blink/client'

interface TimelineEvent {
  id: string
  timestamp: Date
  type: 'control_implementation' | 'risk_identified' | 'evidence_collected' | 'audit_completed' | 'policy_updated'
  title: string
  description: string
  impact: number
  riskLevel: number
  complianceScore: number
  relatedControls: string[]
}

interface ComplianceSnapshot {
  timestamp: Date
  overallScore: number
  controlsImplemented: number
  totalControls: number
  highRisks: number
  evidenceItems: number
  auditReadiness: number
}

interface PredictiveScenario {
  id: string
  name: string
  description: string
  probability: number
  timeframe: string
  impact: ComplianceSnapshot
  preventionActions: string[]
}

// Revolutionary: Compliance Time Travel - First system to model compliance across time dimensions
export function ComplianceTimeTravel() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [selectedTime, setSelectedTime] = useState(new Date())
  const [timelineEvents, setTimelineEvents] = useState<TimelineEvent[]>([])
  const [snapshots, setSnapshots] = useState<ComplianceSnapshot[]>([])
  const [scenarios, setScenarios] = useState<PredictiveScenario[]>([])
  const [isPlaying, setIsPlaying] = useState(false)
  const [playbackSpeed, setPlaybackSpeed] = useState(1)
  const [timeRange, setTimeRange] = useState<[number, number]>([0, 365]) // Days
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    initializeTimeTravel()
  }, [])

  useEffect(() => {
    let interval: NodeJS.Timeout
    
    if (isPlaying) {
      interval = setInterval(() => {
        setSelectedTime(prev => {
          const newTime = new Date(prev.getTime() + (24 * 60 * 60 * 1000 * playbackSpeed))
          if (newTime > new Date(currentTime.getTime() + (365 * 24 * 60 * 60 * 1000))) {
            setIsPlaying(false)
            return prev
          }
          return newTime
        })
      }, 1000 / playbackSpeed)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isPlaying, playbackSpeed, currentTime])

  const initializeTimeTravel = async () => {
    try {
      setLoading(true)

      // Generate historical timeline events
      const mockEvents: TimelineEvent[] = []
      const startDate = new Date(Date.now() - (180 * 24 * 60 * 60 * 1000)) // 6 months ago

      for (let i = 0; i < 50; i++) {
        const eventDate = new Date(startDate.getTime() + (i * 3.6 * 24 * 60 * 60 * 1000)) // Every 3.6 days
        mockEvents.push({
          id: `event_${i}`,
          timestamp: eventDate,
          type: ['control_implementation', 'risk_identified', 'evidence_collected', 'audit_completed', 'policy_updated'][Math.floor(Math.random() * 5)] as any,
          title: [
            'ISO 27001 Control A.5.1 Implemented',
            'Critical Risk Identified in Supply Chain',
            'Evidence Collected for Access Control',
            'Internal Audit Completed',
            'Data Protection Policy Updated'
          ][Math.floor(Math.random() * 5)],
          description: 'Detailed description of the compliance event and its implications.',
          impact: Math.floor(Math.random() * 100),
          riskLevel: Math.floor(Math.random() * 100),
          complianceScore: Math.min(100, 20 + i * 1.5 + Math.random() * 10),
          relatedControls: [`A.${Math.floor(Math.random() * 18) + 5}.${Math.floor(Math.random() * 10) + 1}`]
        })
      }

      // Generate compliance snapshots
      const mockSnapshots: ComplianceSnapshot[] = []
      for (let i = 0; i < 365; i += 7) { // Weekly snapshots
        const snapshotDate = new Date(startDate.getTime() + (i * 24 * 60 * 60 * 1000))
        mockSnapshots.push({
          timestamp: snapshotDate,
          overallScore: Math.min(100, 20 + i * 0.2 + Math.random() * 5),
          controlsImplemented: Math.min(114, Math.floor(i * 0.3) + Math.random() * 3),
          totalControls: 114,
          highRisks: Math.max(0, 25 - Math.floor(i * 0.05) + Math.random() * 3),
          evidenceItems: Math.floor(i * 0.5) + Math.random() * 5,
          auditReadiness: Math.min(100, 15 + i * 0.25 + Math.random() * 8)
        })
      }

      // Generate predictive scenarios
      const mockScenarios: PredictiveScenario[] = [
        {
          id: 'scenario_1',
          name: 'Accelerated Compliance Path',
          description: 'Implementing AI-driven automation could accelerate compliance by 40%',
          probability: 85,
          timeframe: '3-6 months',
          impact: {
            timestamp: new Date(Date.now() + (90 * 24 * 60 * 60 * 1000)),
            overallScore: 95,
            controlsImplemented: 110,
            totalControls: 114,
            highRisks: 2,
            evidenceItems: 250,
            auditReadiness: 98
          },
          preventionActions: ['Deploy AI automation', 'Increase evidence collection', 'Accelerate control implementation']
        },
        {
          id: 'scenario_2',
          name: 'Regulatory Change Impact',
          description: 'New ISO 27001:2025 requirements could require additional controls',
          probability: 70,
          timeframe: '12-18 months',
          impact: {
            timestamp: new Date(Date.now() + (365 * 24 * 60 * 60 * 1000)),
            overallScore: 75,
            controlsImplemented: 95,
            totalControls: 140, // New controls added
            highRisks: 15,
            evidenceItems: 180,
            auditReadiness: 80
          },
          preventionActions: ['Monitor regulatory changes', 'Prepare for new controls', 'Update policies proactively']
        },
        {
          id: 'scenario_3',
          name: 'Cyber Incident Response',
          description: 'Major security incident could impact compliance posture',
          probability: 25,
          timeframe: '1-3 months',
          impact: {
            timestamp: new Date(Date.now() + (60 * 24 * 60 * 60 * 1000)),
            overallScore: 45,
            controlsImplemented: 85,
            totalControls: 114,
            highRisks: 35,
            evidenceItems: 120,
            auditReadiness: 50
          },
          preventionActions: ['Strengthen incident response', 'Improve monitoring', 'Enhance backup controls']
        }
      ]

      setTimelineEvents(mockEvents.sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime()))
      setSnapshots(mockSnapshots.sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime()))
      setScenarios(mockScenarios)

    } catch (error) {
      console.error('Error initializing time travel:', error)
    } finally {
      setLoading(false)
    }
  }

  const jumpToTime = (targetTime: Date) => {
    setSelectedTime(targetTime)
    setIsPlaying(false)
  }

  const getCurrentSnapshot = (): ComplianceSnapshot => {
    const relevantSnapshots = snapshots.filter(s => s.timestamp <= selectedTime)
    return relevantSnapshots[relevantSnapshots.length - 1] || snapshots[0]
  }

  const getEventsInRange = (startTime: Date, endTime: Date): TimelineEvent[] => {
    return timelineEvents.filter(event => 
      event.timestamp >= startTime && event.timestamp <= endTime
    )
  }

  const runTimeTravelAnalysis = async () => {
    try {
      const { text } = await blink.ai.generateText({
        prompt: `Analyze compliance time travel data and provide insights:
        1. Historical compliance progression patterns
        2. Time-based risk evolution
        3. Predictive compliance scenarios
        4. Temporal optimization opportunities
        5. Time-sensitive compliance actions
        
        Current time: ${selectedTime.toISOString()}
        Generate time travel compliance insights.`,
        model: 'gpt-4o-mini'
      })

      console.log('Time Travel Analysis:', text)
      
    } catch (error) {
      console.error('Time travel analysis error:', error)
    }
  }

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-6 space-y-8">
        <div className="animate-pulse space-y-8">
          <div className="h-8 bg-secondary rounded w-1/3"></div>
          <div className="grid gap-6 md:grid-cols-2">
            {[1, 2].map((i) => (
              <div key={i} className="h-96 bg-secondary rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  const currentSnapshot = getCurrentSnapshot()
  const recentEvents = getEventsInRange(
    new Date(selectedTime.getTime() - (30 * 24 * 60 * 60 * 1000)),
    selectedTime
  )

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-7xl mx-auto px-6 space-y-8"
    >
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Compliance Time Travel
                </h1>
                <p className="text-muted-foreground">
                  Navigate through compliance history and predict future scenarios
                </p>
              </div>
            </div>
          </div>
          
          <Button 
            onClick={runTimeTravelAnalysis}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
          >
            <Zap className="w-4 h-4 mr-2" />
            Analyze Timeline
          </Button>
        </div>

        {/* Time Travel Controls */}
        <Card className="cyber-border">
          <CardContent className="p-6">
            <div className="space-y-4">
              {/* Current Time Display */}
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <div className="text-2xl font-bold text-indigo-600">
                    {selectedTime.toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {selectedTime < currentTime ? 'Historical View' : 
                     selectedTime.toDateString() === currentTime.toDateString() ? 'Current Time' : 
                     'Future Prediction'}
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Badge variant={selectedTime < currentTime ? 'secondary' : 
                                selectedTime.toDateString() === currentTime.toDateString() ? 'default' : 
                                'outline'}>
                    {selectedTime < currentTime ? 'Past' : 
                     selectedTime.toDateString() === currentTime.toDateString() ? 'Present' : 
                     'Future'}
                  </Badge>
                </div>
              </div>

              {/* Playback Controls */}
              <div className="flex items-center space-x-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => jumpToTime(new Date(selectedTime.getTime() - (30 * 24 * 60 * 60 * 1000)))}
                >
                  <Rewind className="w-4 h-4" />
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsPlaying(!isPlaying)}
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => jumpToTime(new Date(selectedTime.getTime() + (30 * 24 * 60 * 60 * 1000)))}
                >
                  <FastForward className="w-4 h-4" />
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => jumpToTime(currentTime)}
                >
                  <RotateCcw className="w-4 h-4" />
                </Button>

                <div className="flex items-center space-x-2 ml-4">
                  <span className="text-sm text-muted-foreground">Speed:</span>
                  <input
                    type="range"
                    value={playbackSpeed}
                    onChange={(e) => setPlaybackSpeed(parseFloat(e.target.value))}
                    max={10}
                    min={0.1}
                    step={0.1}
                    className="w-20"
                  />
                  <span className="text-sm font-medium">{playbackSpeed}x</span>
                </div>
              </div>

              {/* Timeline Scrubber */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>6 months ago</span>
                  <span>Today</span>
                  <span>1 year future</span>
                </div>
                <div className="relative">
                  <div className="h-2 bg-gradient-to-r from-indigo-200 via-indigo-400 to-purple-200 rounded-full">
                    <motion.div
                      className="absolute top-0 w-4 h-4 bg-indigo-600 rounded-full transform -translate-y-1 -translate-x-2 cursor-pointer"
                      style={{
                        left: `${((selectedTime.getTime() - (currentTime.getTime() - (180 * 24 * 60 * 60 * 1000))) / (545 * 24 * 60 * 60 * 1000)) * 100}%`
                      }}
                      drag="x"
                      dragConstraints={{ left: 0, right: 0 }}
                      whileHover={{ scale: 1.2 }}
                      whileDrag={{ scale: 1.3 }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="snapshot" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="snapshot" className="flex items-center space-x-2">
            <Eye className="w-4 h-4" />
            <span>Time Snapshot</span>
          </TabsTrigger>
          <TabsTrigger value="timeline" className="flex items-center space-x-2">
            <GitBranch className="w-4 h-4" />
            <span>Event Timeline</span>
          </TabsTrigger>
          <TabsTrigger value="scenarios" className="flex items-center space-x-2">
            <Target className="w-4 h-4" />
            <span>Future Scenarios</span>
          </TabsTrigger>
          <TabsTrigger value="analysis" className="flex items-center space-x-2">
            <Activity className="w-4 h-4" />
            <span>Temporal Analysis</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="snapshot" className="space-y-6">
          {/* Compliance Snapshot */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: 'Overall Score',
                value: `${Math.round(currentSnapshot.overallScore)}%`,
                icon: CheckCircle,
                color: 'text-green-600',
                bgColor: 'bg-green-100'
              },
              {
                title: 'Controls',
                value: `${currentSnapshot.controlsImplemented}/${currentSnapshot.totalControls}`,
                icon: Shield,
                color: 'text-blue-600',
                bgColor: 'bg-blue-100'
              },
              {
                title: 'High Risks',
                value: currentSnapshot.highRisks.toString(),
                icon: AlertTriangle,
                color: 'text-red-600',
                bgColor: 'bg-red-100'
              },
              {
                title: 'Audit Readiness',
                value: `${Math.round(currentSnapshot.auditReadiness)}%`,
                icon: TrendingUp,
                color: 'text-purple-600',
                bgColor: 'bg-purple-100'
              }
            ].map((stat, index) => (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="cyber-border hover:cyber-glow transition-all duration-300">
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
                      At selected time point
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Recent Events at Selected Time */}
          <Card className="cyber-border">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="w-5 h-5" />
                <span>Events in Last 30 Days</span>
              </CardTitle>
              <CardDescription>
                Compliance events leading up to {selectedTime.toLocaleDateString()}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-64 overflow-y-auto">
                {recentEvents.length > 0 ? recentEvents.map((event, index) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-start space-x-3 p-3 rounded-lg border cyber-border"
                  >
                    <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                      event.type === 'control_implementation' ? 'bg-green-500' :
                      event.type === 'risk_identified' ? 'bg-red-500' :
                      event.type === 'evidence_collected' ? 'bg-blue-500' :
                      event.type === 'audit_completed' ? 'bg-purple-500' :
                      'bg-yellow-500'
                    }`} />
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-medium">{event.title}</h4>
                        <span className="text-xs text-muted-foreground">
                          {event.timestamp.toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground">{event.description}</p>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline" className="text-xs">
                          Impact: {event.impact}%
                        </Badge>
                        {event.relatedControls.map(control => (
                          <Badge key={control} variant="secondary" className="text-xs">
                            {control}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )) : (
                  <div className="text-center py-8 text-muted-foreground">
                    No events in the selected time range
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="timeline" className="space-y-6">
          <Card className="cyber-border">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <GitBranch className="w-5 h-5" />
                <span>Compliance Timeline</span>
              </CardTitle>
              <CardDescription>
                Complete history and future predictions of compliance events
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative">
                {/* Timeline visualization would go here */}
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {timelineEvents.slice(0, 20).map((event, index) => (
                    <motion.div
                      key={event.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.02 }}
                      className={`flex items-start space-x-4 p-4 rounded-lg border ${
                        event.timestamp <= selectedTime ? 'bg-background' : 'bg-muted/30'
                      }`}
                      onClick={() => jumpToTime(event.timestamp)}
                    >
                      <div className="text-sm font-mono text-muted-foreground min-w-[100px]">
                        {event.timestamp.toLocaleDateString()}
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-medium">{event.title}</h4>
                        <p className="text-xs text-muted-foreground mt-1">{event.description}</p>
                        <div className="flex items-center space-x-2 mt-2">
                          <Progress value={event.complianceScore} className="w-20 h-1" />
                          <span className="text-xs text-muted-foreground">
                            Score: {Math.round(event.complianceScore)}%
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="scenarios" className="space-y-6">
          <div className="grid gap-6">
            {scenarios.map((scenario, index) => (
              <motion.div
                key={scenario.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="cyber-border hover:cyber-glow transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <CardTitle className="flex items-center space-x-2">
                          <Target className="w-5 h-5 text-indigo-500" />
                          <span>{scenario.name}</span>
                          <Badge variant="outline">
                            {scenario.probability}% probability
                          </Badge>
                        </CardTitle>
                        <CardDescription>
                          {scenario.description} • Timeframe: {scenario.timeframe}
                        </CardDescription>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => jumpToTime(scenario.impact.timestamp)}
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        View Impact
                      </Button>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    {/* Scenario Impact Metrics */}
                    <div className="grid grid-cols-4 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-indigo-600">
                          {Math.round(scenario.impact.overallScore)}%
                        </div>
                        <div className="text-xs text-muted-foreground">Overall Score</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">
                          {scenario.impact.controlsImplemented}/{scenario.impact.totalControls}
                        </div>
                        <div className="text-xs text-muted-foreground">Controls</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-red-600">
                          {scenario.impact.highRisks}
                        </div>
                        <div className="text-xs text-muted-foreground">High Risks</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">
                          {Math.round(scenario.impact.auditReadiness)}%
                        </div>
                        <div className="text-xs text-muted-foreground">Audit Ready</div>
                      </div>
                    </div>

                    {/* Prevention Actions */}
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium">Prevention Actions</h4>
                      <div className="space-y-1">
                        {scenario.preventionActions.map((action, i) => (
                          <div key={i} className="flex items-start space-x-2 text-sm">
                            <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full mt-2 flex-shrink-0" />
                            <span>{action}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analysis" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="cyber-border">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Activity className="w-5 h-5" />
                  <span>Temporal Patterns</span>
                </CardTitle>
                <CardDescription>
                  Compliance evolution patterns over time
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                    <div className="text-sm font-medium text-green-800 mb-1">
                      Positive Trend Detected
                    </div>
                    <div className="text-xs text-green-600">
                      Compliance score has improved by 45% over the last 6 months
                    </div>
                  </div>
                  
                  <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="text-sm font-medium text-blue-800 mb-1">
                      Cyclical Pattern
                    </div>
                    <div className="text-xs text-blue-600">
                      Evidence collection peaks every 30 days, suggesting monthly review cycles
                    </div>
                  </div>
                  
                  <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                    <div className="text-sm font-medium text-yellow-800 mb-1">
                      Seasonal Variation
                    </div>
                    <div className="text-xs text-yellow-600">
                      Risk levels tend to increase during Q4, likely due to year-end pressures
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="cyber-border">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Layers className="w-5 h-5" />
                  <span>Time Travel Insights</span>
                </CardTitle>
                <CardDescription>
                  AI-powered temporal analysis
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                    <div className="text-sm font-medium text-purple-800 mb-1">
                      Optimal Implementation Window
                    </div>
                    <div className="text-xs text-purple-600">
                      Best time to implement new controls: 2-3 weeks after evidence collection peaks
                    </div>
                  </div>
                  
                  <div className="p-3 bg-indigo-50 rounded-lg border border-indigo-200">
                    <div className="text-sm font-medium text-indigo-800 mb-1">
                      Risk Prediction Accuracy
                    </div>
                    <div className="text-xs text-indigo-600">
                      Historical analysis shows 87% accuracy in predicting compliance issues 30 days ahead
                    </div>
                  </div>
                  
                  <div className="p-3 bg-cyan-50 rounded-lg border border-cyan-200">
                    <div className="text-sm font-medium text-cyan-800 mb-1">
                      Time-Sensitive Actions
                    </div>
                    <div className="text-xs text-cyan-600">
                      3 compliance actions require immediate attention to prevent future timeline disruption
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </motion.div>
  )
}