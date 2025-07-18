import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  MessageSquare, 
  Play, 
  Pause, 
  RotateCcw, 
  CheckCircle, 
  AlertTriangle,
  Clock,
  User,
  Bot,
  FileText,
  Shield,
  Target,
  Lightbulb,
  Star,
  TrendingUp
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Badge } from '../components/ui/badge'
import { Progress } from '../components/ui/progress'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select'
import { Textarea } from '../components/ui/textarea'
import { ScrollArea } from '../components/ui/scroll-area'
import { Separator } from '../components/ui/separator'
import blink from '../blink/client'

interface SimulationQuestion {
  id: string
  question: string
  category: string
  difficulty: 'basic' | 'intermediate' | 'advanced'
  expectedAnswer: string
  hints: string[]
  relatedControls: string[]
}

interface SimulationSession {
  id: string
  type: 'stage1' | 'stage2' | 'surveillance'
  questions: SimulationQuestion[]
  currentQuestionIndex: number
  answers: { questionId: string; answer: string; score: number }[]
  startTime: Date
  status: 'not-started' | 'in-progress' | 'completed'
  overallScore: number
}

interface AuditorPersona {
  id: string
  name: string
  style: string
  description: string
  avatar: string
}

const auditorPersonas: AuditorPersona[] = [
  {
    id: 'strict',
    name: 'Dr. Sarah Mitchell',
    style: 'Strict & Detail-Oriented',
    description: 'Focuses on documentation completeness and technical implementation details',
    avatar: '👩‍💼'
  },
  {
    id: 'practical',
    name: 'Mark Thompson',
    style: 'Practical & Business-Focused',
    description: 'Emphasizes real-world application and business risk management',
    avatar: '👨‍💼'
  },
  {
    id: 'technical',
    name: 'Alex Chen',
    style: 'Technical & Process-Driven',
    description: 'Deep dives into technical controls and process effectiveness',
    avatar: '👨‍💻'
  }
]

const simulationTypes = [
  {
    id: 'stage1',
    name: 'Stage 1 Audit (Documentation Review)',
    description: 'Focus on ISMS documentation, policies, and procedures',
    duration: '30-45 minutes',
    questionCount: 15
  },
  {
    id: 'stage2',
    name: 'Stage 2 Audit (Implementation Review)',
    description: 'Assess actual implementation and effectiveness of controls',
    duration: '45-60 minutes',
    questionCount: 20
  },
  {
    id: 'surveillance',
    name: 'Surveillance Audit',
    description: 'Review ongoing compliance and continuous improvement',
    duration: '20-30 minutes',
    questionCount: 10
  }
]

export function AuditSimulation() {
  const [selectedAuditor, setSelectedAuditor] = useState<AuditorPersona>(auditorPersonas[0])
  const [selectedType, setSelectedType] = useState<string>('stage1')
  const [currentSession, setCurrentSession] = useState<SimulationSession | null>(null)
  const [currentAnswer, setCurrentAnswer] = useState('')
  const [isEvaluating, setIsEvaluating] = useState(false)
  const [showHints, setShowHints] = useState(false)
  const [sessionHistory, setSessionHistory] = useState<SimulationSession[]>([])
  const scrollRef = useRef<HTMLDivElement>(null)

  const startSimulation = async () => {
    try {
      // Generate questions based on audit type and auditor persona
      const prompt = `Generate ${simulationTypes.find(t => t.id === selectedType)?.questionCount} realistic ISO 27001 audit questions for a ${selectedType} audit. 

      Auditor persona: ${selectedAuditor.name} - ${selectedAuditor.style}
      ${selectedAuditor.description}

      Questions should:
      - Be realistic and commonly asked during actual audits
      - Vary in difficulty (basic, intermediate, advanced)
      - Cover different ISO 27001 control categories
      - Include follow-up questions that auditors typically ask
      - Be appropriate for the audit stage (${selectedType})

      Format each question with:
      - The actual question
      - Category (e.g., "Access Control", "Risk Management")
      - Difficulty level
      - Expected answer elements
      - Related ISO 27001 controls
      - Helpful hints for preparation

      Make questions sound natural and conversational, as if spoken by ${selectedAuditor.name}.`

      const { text } = await blink.ai.generateText({
        prompt,
        model: 'gpt-4o-mini',
        maxTokens: 3000
      })

      // Parse the generated questions (in a real implementation, you'd have better parsing)
      const questions = parseGeneratedQuestions(text)

      const session: SimulationSession = {
        id: Date.now().toString(),
        type: selectedType as any,
        questions,
        currentQuestionIndex: 0,
        answers: [],
        startTime: new Date(),
        status: 'in-progress',
        overallScore: 0
      }

      setCurrentSession(session)
    } catch (error) {
      console.error('Error starting simulation:', error)
      alert('Error starting simulation. Please try again.')
    }
  }

  const parseGeneratedQuestions = (text: string): SimulationQuestion[] => {
    // This is a simplified parser - in a real implementation, you'd use structured output
    const questions: SimulationQuestion[] = []
    
    // Generate some sample questions for demo
    const sampleQuestions = [
      {
        id: '1',
        question: "Can you walk me through your organization's approach to information security risk management? How do you identify and assess risks?",
        category: "Risk Management",
        difficulty: 'intermediate' as const,
        expectedAnswer: "Should cover risk identification process, risk assessment methodology, risk treatment options, and regular review cycles.",
        hints: [
          "Mention your risk register and how it's maintained",
          "Explain the risk assessment criteria and methodology",
          "Discuss how risks are communicated to management"
        ],
        relatedControls: ['A.6.1.1', 'A.6.1.2', 'A.6.1.3']
      },
      {
        id: '2',
        question: "How does your organization ensure that access to information systems is properly controlled and monitored?",
        category: "Access Control",
        difficulty: 'basic' as const,
        expectedAnswer: "Should describe user access provisioning, role-based access, regular access reviews, and monitoring mechanisms.",
        hints: [
          "Explain your user onboarding/offboarding process",
          "Describe how you implement least privilege principle",
          "Mention access logging and monitoring"
        ],
        relatedControls: ['A.9.1.1', 'A.9.1.2', 'A.9.2.1']
      },
      {
        id: '3',
        question: "What evidence can you provide that your security policies are effectively communicated to all relevant personnel?",
        category: "Policy Management",
        difficulty: 'intermediate' as const,
        expectedAnswer: "Should include training records, acknowledgment forms, communication methods, and awareness metrics.",
        hints: [
          "Show training completion records",
          "Provide policy acknowledgment documentation",
          "Explain your communication channels"
        ],
        relatedControls: ['A.5.1.1', 'A.7.2.2']
      }
    ]

    return sampleQuestions
  }

  const submitAnswer = async () => {
    if (!currentSession || !currentAnswer.trim()) return

    setIsEvaluating(true)

    try {
      const currentQuestion = currentSession.questions[currentSession.currentQuestionIndex]
      
      // Use AI to evaluate the answer
      const evaluationPrompt = `As an ISO 27001 auditor (${selectedAuditor.name} - ${selectedAuditor.style}), evaluate this answer to the audit question:

      Question: "${currentQuestion.question}"
      Category: ${currentQuestion.category}
      Expected elements: ${currentQuestion.expectedAnswer}
      
      Candidate's Answer: "${currentAnswer}"
      
      Provide:
      1. A score from 0-100
      2. Specific feedback on what was good
      3. What was missing or could be improved
      4. Follow-up questions you might ask
      5. Overall assessment
      
      Be constructive but realistic in your evaluation.`

      const { text: evaluation } = await blink.ai.generateText({
        prompt: evaluationPrompt,
        model: 'gpt-4o-mini',
        maxTokens: 1000
      })

      // Parse score (simplified - in real implementation, use structured output)
      const scoreMatch = evaluation.match(/score[:\s]*(\d+)/i)
      const score = scoreMatch ? parseInt(scoreMatch[1]) : 75

      const newAnswer = {
        questionId: currentQuestion.id,
        answer: currentAnswer,
        score,
        evaluation
      }

      const updatedSession = {
        ...currentSession,
        answers: [...currentSession.answers, newAnswer]
      }

      setCurrentSession(updatedSession)
      setCurrentAnswer('')
      setShowHints(false)

    } catch (error) {
      console.error('Error evaluating answer:', error)
    } finally {
      setIsEvaluating(false)
    }
  }

  const nextQuestion = () => {
    if (!currentSession) return

    if (currentSession.currentQuestionIndex < currentSession.questions.length - 1) {
      setCurrentSession({
        ...currentSession,
        currentQuestionIndex: currentSession.currentQuestionIndex + 1
      })
    } else {
      // Complete the session
      const overallScore = Math.round(
        currentSession.answers.reduce((acc, answer) => acc + answer.score, 0) / 
        currentSession.answers.length
      )

      const completedSession = {
        ...currentSession,
        status: 'completed' as const,
        overallScore
      }

      setCurrentSession(completedSession)
      setSessionHistory(prev => [...prev, completedSession])
    }
  }

  const resetSimulation = () => {
    setCurrentSession(null)
    setCurrentAnswer('')
    setShowHints(false)
  }

  const currentQuestion = currentSession?.questions[currentSession.currentQuestionIndex]
  const currentAnswerData = currentSession?.answers.find(a => a.questionId === currentQuestion?.id)
  const progress = currentSession ? ((currentSession.currentQuestionIndex + (currentAnswerData ? 1 : 0)) / currentSession.questions.length) * 100 : 0

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
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
              <MessageSquare className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Audit Simulation Bot</h1>
              <p className="text-muted-foreground">Simulates questions an external auditor may ask, with answer prep guidance</p>
            </div>
          </div>
        </div>
      </div>

      {!currentSession ? (
        /* Setup Screen */
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Configuration */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="w-5 h-5" />
                  <span>Select Auditor Persona</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {auditorPersonas.map((auditor) => (
                  <div
                    key={auditor.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-all ${
                      selectedAuditor.id === auditor.id ? 'border-primary bg-primary/5' : 'border-border hover:bg-secondary/50'
                    }`}
                    onClick={() => setSelectedAuditor(auditor)}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="text-2xl">{auditor.avatar}</div>
                      <div className="space-y-1">
                        <h4 className="font-medium">{auditor.name}</h4>
                        <p className="text-sm font-medium text-primary">{auditor.style}</p>
                        <p className="text-sm text-muted-foreground">{auditor.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="w-5 h-5" />
                  <span>Simulation Type</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {simulationTypes.map((type) => (
                  <div
                    key={type.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-all ${
                      selectedType === type.id ? 'border-primary bg-primary/5' : 'border-border hover:bg-secondary/50'
                    }`}
                    onClick={() => setSelectedType(type.id)}
                  >
                    <div className="space-y-2">
                      <h4 className="font-medium">{type.name}</h4>
                      <p className="text-sm text-muted-foreground">{type.description}</p>
                      <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                        <span>⏱️ {type.duration}</span>
                        <span>❓ {type.questionCount} questions</span>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Preview & Start */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Simulation Preview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-secondary/50 rounded-lg">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="text-2xl">{selectedAuditor.avatar}</div>
                    <div>
                      <p className="font-medium">{selectedAuditor.name}</p>
                      <p className="text-sm text-muted-foreground">{selectedAuditor.style}</p>
                    </div>
                  </div>
                  <p className="text-sm italic">
                    "Good morning! I'm here to conduct your {simulationTypes.find(t => t.id === selectedType)?.name.toLowerCase()}. 
                    I'll be asking you questions about your ISO 27001 implementation. Please provide detailed, 
                    evidence-based answers. Shall we begin?"
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Audit Type:</span>
                    <span className="font-medium">{simulationTypes.find(t => t.id === selectedType)?.name}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Duration:</span>
                    <span className="font-medium">{simulationTypes.find(t => t.id === selectedType)?.duration}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Questions:</span>
                    <span className="font-medium">{simulationTypes.find(t => t.id === selectedType)?.questionCount}</span>
                  </div>
                </div>

                <Separator />

                <Button onClick={startSimulation} className="w-full" size="lg">
                  <Play className="w-4 h-4 mr-2" />
                  Start Audit Simulation
                </Button>
              </CardContent>
            </Card>

            {/* Session History */}
            {sessionHistory.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <TrendingUp className="w-5 h-5" />
                    <span>Previous Sessions</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {sessionHistory.slice(-3).map((session) => (
                      <div key={session.id} className="p-3 border rounded-lg">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-sm">
                              {simulationTypes.find(t => t.id === session.type)?.name}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {session.startTime.toLocaleDateString()}
                            </p>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center space-x-1">
                              <Star className="w-4 h-4 text-yellow-500" />
                              <span className="font-medium">{session.overallScore}%</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      ) : (
        /* Simulation Screen */
        <div className="space-y-6">
          {/* Progress Header */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="text-2xl">{selectedAuditor.avatar}</div>
                  <div>
                    <p className="font-medium">{selectedAuditor.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {simulationTypes.find(t => t.id === currentSession.type)?.name}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Progress</p>
                    <p className="font-medium">
                      {currentSession.currentQuestionIndex + (currentAnswerData ? 1 : 0)} / {currentSession.questions.length}
                    </p>
                  </div>
                  <Button variant="outline" onClick={resetSimulation}>
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Reset
                  </Button>
                </div>
              </div>
              
              <Progress value={progress} className="h-2" />
            </CardContent>
          </Card>

          {currentSession.status === 'completed' ? (
            /* Results Screen */
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span>Simulation Complete</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center space-y-4">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                    <Star className="w-10 h-10 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">Overall Score: {currentSession.overallScore}%</h3>
                    <p className="text-muted-foreground">
                      {currentSession.overallScore >= 80 ? 'Excellent preparation!' :
                       currentSession.overallScore >= 60 ? 'Good foundation, some areas to improve' :
                       'Significant preparation needed'}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 border rounded-lg">
                    <p className="text-2xl font-bold text-green-600">
                      {currentSession.answers.filter(a => a.score >= 80).length}
                    </p>
                    <p className="text-sm text-muted-foreground">Strong Answers</p>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <p className="text-2xl font-bold text-yellow-600">
                      {currentSession.answers.filter(a => a.score >= 60 && a.score < 80).length}
                    </p>
                    <p className="text-sm text-muted-foreground">Adequate Answers</p>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <p className="text-2xl font-bold text-red-600">
                      {currentSession.answers.filter(a => a.score < 60).length}
                    </p>
                    <p className="text-sm text-muted-foreground">Needs Improvement</p>
                  </div>
                </div>

                <div className="flex justify-center space-x-4">
                  <Button onClick={resetSimulation}>
                    <Play className="w-4 h-4 mr-2" />
                    New Simulation
                  </Button>
                  <Button variant="outline">
                    <FileText className="w-4 h-4 mr-2" />
                    Download Report
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            /* Question Screen */
            currentQuestion && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Question */}
                <div className="lg:col-span-2">
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center space-x-2">
                          <Bot className="w-5 h-5" />
                          <span>Question {currentSession.currentQuestionIndex + 1}</span>
                        </CardTitle>
                        <Badge className={
                          currentQuestion.difficulty === 'advanced' ? 'bg-red-100 text-red-800' :
                          currentQuestion.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }>
                          {currentQuestion.difficulty}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="p-4 bg-secondary/50 rounded-lg">
                        <p className="font-medium mb-2">{currentQuestion.category}</p>
                        <p className="text-lg">{currentQuestion.question}</p>
                      </div>

                      {!currentAnswerData ? (
                        <div className="space-y-4">
                          <Textarea
                            value={currentAnswer}
                            onChange={(e) => setCurrentAnswer(e.target.value)}
                            placeholder="Provide your detailed answer here..."
                            rows={8}
                            className="resize-none"
                          />
                          
                          <div className="flex items-center justify-between">
                            <Button
                              variant="outline"
                              onClick={() => setShowHints(!showHints)}
                            >
                              <Lightbulb className="w-4 h-4 mr-2" />
                              {showHints ? 'Hide' : 'Show'} Hints
                            </Button>
                            
                            <Button
                              onClick={submitAnswer}
                              disabled={!currentAnswer.trim() || isEvaluating}
                            >
                              {isEvaluating ? (
                                <>
                                  <Clock className="w-4 h-4 mr-2 animate-spin" />
                                  Evaluating...
                                </>
                              ) : (
                                'Submit Answer'
                              )}
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <div className="p-4 border rounded-lg bg-secondary/20">
                            <p className="font-medium mb-2">Your Answer:</p>
                            <p className="text-sm">{currentAnswerData.answer}</p>
                          </div>
                          
                          <div className="p-4 border rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                              <p className="font-medium">Score: {currentAnswerData.score}/100</p>
                              <Badge variant={currentAnswerData.score >= 80 ? 'default' : 
                                           currentAnswerData.score >= 60 ? 'secondary' : 'destructive'}>
                                {currentAnswerData.score >= 80 ? 'Strong' :
                                 currentAnswerData.score >= 60 ? 'Adequate' : 'Needs Work'}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                              {currentAnswerData.evaluation}
                            </p>
                          </div>
                          
                          <div className="flex justify-end">
                            <Button onClick={nextQuestion}>
                              {currentSession.currentQuestionIndex < currentSession.questions.length - 1 ? 
                                'Next Question' : 'Complete Simulation'}
                            </Button>
                          </div>
                        </div>
                      )}

                      {showHints && (
                        <div className="p-4 border rounded-lg bg-blue-50">
                          <p className="font-medium mb-2 flex items-center">
                            <Lightbulb className="w-4 h-4 mr-2" />
                            Preparation Hints:
                          </p>
                          <ul className="text-sm space-y-1">
                            {currentQuestion.hints.map((hint, index) => (
                              <li key={index} className="flex items-start">
                                <span className="mr-2">•</span>
                                <span>{hint}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Question Details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Category</p>
                        <p className="font-medium">{currentQuestion.category}</p>
                      </div>
                      
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Difficulty</p>
                        <Badge className={
                          currentQuestion.difficulty === 'advanced' ? 'bg-red-100 text-red-800' :
                          currentQuestion.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }>
                          {currentQuestion.difficulty}
                        </Badge>
                      </div>
                      
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Related Controls</p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {currentQuestion.relatedControls.map(control => (
                            <Badge key={control} variant="outline" className="text-xs">
                              {control}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Progress</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {currentSession.questions.map((_, index) => (
                          <div key={index} className="flex items-center space-x-3">
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                              index < currentSession.currentQuestionIndex ? 'bg-green-500 text-white' :
                              index === currentSession.currentQuestionIndex ? 'bg-blue-500 text-white' :
                              'bg-gray-200 text-gray-600'
                            }`}>
                              {index < currentSession.currentQuestionIndex ? (
                                <CheckCircle className="w-3 h-3" />
                              ) : (
                                index + 1
                              )}
                            </div>
                            <span className={`text-sm ${
                              index === currentSession.currentQuestionIndex ? 'font-medium' : 'text-muted-foreground'
                            }`}>
                              Question {index + 1}
                            </span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )
          )}
        </div>
      )}
    </motion.div>
  )
}