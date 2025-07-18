import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Bot, 
  Send, 
  Mic, 
  MicOff, 
  Loader2, 
  Sparkles,
  Shield,
  FileText,
  AlertTriangle,
  CheckCircle,
  MessageSquare
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Badge } from '../components/ui/badge'
import { ScrollArea } from '../components/ui/scroll-area'
import blink from '../blink/client'

interface Message {
  id: string
  type: 'user' | 'assistant'
  content: string
  timestamp: Date
  suggestions?: string[]
}

const quickPrompts = [
  {
    icon: Shield,
    title: "What controls am I missing?",
    description: "Analyze gaps in your ISO 27001 implementation",
    prompt: "Analyze my current ISO 27001 implementation and identify which controls I'm missing or need improvement. Focus on high-priority gaps."
  },
  {
    icon: FileText,
    title: "Simulate audit readiness",
    description: "Test your organization's audit preparedness",
    prompt: "Simulate an ISO 27001 audit readiness assessment. What areas would an external auditor focus on and what questions would they ask?"
  },
  {
    icon: AlertTriangle,
    title: "Risk assessment guidance",
    description: "Get help with risk identification and scoring",
    prompt: "Help me conduct a comprehensive risk assessment for my organization. What are the key risk categories I should evaluate?"
  },
  {
    icon: CheckCircle,
    title: "Policy generation help",
    description: "Generate or improve security policies",
    prompt: "I need help creating comprehensive information security policies that align with ISO 27001 requirements. What should I include?"
  }
]

export function AICopilot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'assistant',
      content: "Hello! I'm your AI Copilot for ISO 27001 compliance. I can help you identify missing controls, simulate audit readiness, generate policies, and answer any compliance questions. What would you like to explore today?",
      timestamp: new Date(),
      suggestions: [
        "What controls am I missing?",
        "Simulate audit readiness",
        "Help with risk assessment",
        "Generate security policies"
      ]
    }
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async (messageText?: string) => {
    const text = messageText || input.trim()
    if (!text || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: text,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      let aiResponse = ''
      
      await blink.ai.streamText(
        {
          messages: [
            {
              role: 'system',
              content: `You are an expert ISO 27001 compliance consultant and auditor. You help organizations implement and maintain ISO 27001:2022 compliance. 

Key capabilities:
- Identify missing or weak controls
- Simulate audit scenarios and questions
- Generate policy recommendations
- Provide risk assessment guidance
- Explain compliance requirements
- Suggest remediation actions

Always provide practical, actionable advice. When discussing controls, reference the specific Annex A control numbers (e.g., A.5.1, A.8.1.1). Be thorough but concise.`
            },
            {
              role: 'user',
              content: text
            }
          ],
          model: 'gpt-4o-mini',
          maxTokens: 1000
        },
        (chunk) => {
          aiResponse += chunk
          setMessages(prev => {
            const newMessages = [...prev]
            const lastMessage = newMessages[newMessages.length - 1]
            
            if (lastMessage && lastMessage.type === 'assistant' && lastMessage.id === 'streaming') {
              lastMessage.content = aiResponse
            } else {
              newMessages.push({
                id: 'streaming',
                type: 'assistant',
                content: aiResponse,
                timestamp: new Date()
              })
            }
            
            return newMessages
          })
        }
      )

      // Update the streaming message with final content and suggestions
      setMessages(prev => {
        const newMessages = [...prev]
        const lastMessage = newMessages[newMessages.length - 1]
        
        if (lastMessage && lastMessage.id === 'streaming') {
          lastMessage.id = Date.now().toString()
          lastMessage.suggestions = generateSuggestions(aiResponse)
        }
        
        return newMessages
      })

    } catch (error) {
      console.error('Error sending message:', error)
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        type: 'assistant',
        content: "I apologize, but I encountered an error. Please try again or rephrase your question.",
        timestamp: new Date()
      }])
    } finally {
      setIsLoading(false)
    }
  }

  const generateSuggestions = (response: string): string[] => {
    // Generate contextual follow-up suggestions based on the response
    const suggestions = []
    
    if (response.toLowerCase().includes('control')) {
      suggestions.push("Show me implementation examples")
    }
    if (response.toLowerCase().includes('risk')) {
      suggestions.push("Help me prioritize these risks")
    }
    if (response.toLowerCase().includes('policy')) {
      suggestions.push("Generate a policy template")
    }
    if (response.toLowerCase().includes('audit')) {
      suggestions.push("What evidence should I prepare?")
    }
    
    // Add some general suggestions
    suggestions.push("What's the next step?", "Explain this in more detail")
    
    return suggestions.slice(0, 3)
  }

  const startVoiceRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      setIsListening(true)
      
      // Note: In a real implementation, you'd use the Web Speech API or similar
      // For now, we'll simulate voice input
      setTimeout(() => {
        setIsListening(false)
        setInput("What controls am I missing for access management?")
      }, 3000)
      
    } catch (error) {
      console.error('Error accessing microphone:', error)
    }
  }

  const stopVoiceRecording = () => {
    setIsListening(false)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-6xl mx-auto px-6 h-[calc(100vh-8rem)]"
    >
      <div className="flex flex-col h-full space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold tracking-tight">AI Copilot Chat</h1>
                <p className="text-muted-foreground">Your intelligent ISO 27001 compliance assistant</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse" />
              Online
            </Badge>
          </div>
        </div>

        <div className="flex-1 grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Quick Prompts Sidebar */}
          <div className="lg:col-span-1">
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="text-lg flex items-center space-x-2">
                  <Sparkles className="w-5 h-5" />
                  <span>Quick Prompts</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {quickPrompts.map((prompt, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleSendMessage(prompt.prompt)}
                    className="w-full p-3 text-left border rounded-lg hover:bg-secondary/50 transition-colors"
                  >
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <prompt.icon className="w-4 h-4 text-primary" />
                      </div>
                      <div className="space-y-1">
                        <p className="font-medium text-sm">{prompt.title}</p>
                        <p className="text-xs text-muted-foreground">{prompt.description}</p>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Chat Interface */}
          <div className="lg:col-span-3">
            <Card className="h-full flex flex-col">
              {/* Messages */}
              <ScrollArea className="flex-1 p-6">
                <div className="space-y-6">
                  <AnimatePresence>
                    {messages.map((message) => (
                      <motion.div
                        key={message.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className={`max-w-[80%] ${message.type === 'user' ? 'order-2' : 'order-1'}`}>
                          <div className={`flex items-start space-x-3 ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                              message.type === 'user' 
                                ? 'bg-primary text-primary-foreground' 
                                : 'bg-gradient-to-br from-blue-500 to-purple-600 text-white'
                            }`}>
                              {message.type === 'user' ? (
                                <span className="text-sm font-medium">U</span>
                              ) : (
                                <Bot className="w-4 h-4" />
                              )}
                            </div>
                            
                            <div className="space-y-2">
                              <div className={`p-4 rounded-2xl ${
                                message.type === 'user'
                                  ? 'bg-primary text-primary-foreground'
                                  : 'bg-secondary'
                              }`}>
                                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                              </div>
                              
                              {message.suggestions && message.suggestions.length > 0 && (
                                <div className="flex flex-wrap gap-2">
                                  {message.suggestions.map((suggestion, index) => (
                                    <Button
                                      key={index}
                                      variant="outline"
                                      size="sm"
                                      onClick={() => handleSendMessage(suggestion)}
                                      className="text-xs"
                                    >
                                      {suggestion}
                                    </Button>
                                  ))}
                                </div>
                              )}
                              
                              <p className="text-xs text-muted-foreground">
                                {message.timestamp.toLocaleTimeString()}
                              </p>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                  
                  {isLoading && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex justify-start"
                    >
                      <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                          <Bot className="w-4 h-4 text-white" />
                        </div>
                        <div className="bg-secondary p-4 rounded-2xl">
                          <div className="flex items-center space-x-2">
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span className="text-sm">Thinking...</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
                <div ref={messagesEndRef} />
              </ScrollArea>

              {/* Input */}
              <div className="p-6 border-t">
                <div className="flex items-center space-x-3">
                  <div className="flex-1 relative">
                    <Input
                      ref={inputRef}
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Ask about ISO 27001 controls, audit readiness, or compliance questions..."
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      className="pr-12"
                    />
                    <Button
                      size="sm"
                      variant="ghost"
                      className="absolute right-1 top-1/2 -translate-y-1/2"
                      onClick={isListening ? stopVoiceRecording : startVoiceRecording}
                    >
                      {isListening ? (
                        <MicOff className="w-4 h-4 text-red-500" />
                      ) : (
                        <Mic className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                  
                  <Button 
                    onClick={() => handleSendMessage()}
                    disabled={!input.trim() || isLoading}
                    className="px-6"
                  >
                    {isLoading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Send className="w-4 h-4" />
                    )}
                  </Button>
                </div>
                
                <p className="text-xs text-muted-foreground mt-2 text-center">
                  AI responses are generated and may not always be accurate. Always verify compliance requirements.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </motion.div>
  )
}