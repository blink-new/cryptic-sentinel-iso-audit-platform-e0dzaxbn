import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Package, 
  Download, 
  FileText, 
  Shield, 
  AlertTriangle, 
  CheckCircle,
  Settings,
  Loader2,
  Eye,
  Calendar,
  Building,
  Users,
  Zap
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Badge } from '../components/ui/badge'
import { Progress } from '../components/ui/progress'
import { Checkbox } from '../components/ui/checkbox'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select'
import { Textarea } from '../components/ui/textarea'
import { Separator } from '../components/ui/separator'
import blink from '../blink/client'

interface PackageComponent {
  id: string
  name: string
  description: string
  type: 'policy' | 'control' | 'risk' | 'evidence' | 'report'
  included: boolean
  required: boolean
  size: string
  lastUpdated: Date
}

interface AuditPackage {
  id: string
  name: string
  description: string
  components: PackageComponent[]
  organizationInfo: {
    name: string
    industry: string
    size: string
    scope: string
  }
  generatedAt?: Date
  downloadUrl?: string
}

const defaultComponents: PackageComponent[] = [
  {
    id: '1',
    name: 'Information Security Policy',
    description: 'Comprehensive information security policy document',
    type: 'policy',
    included: true,
    required: true,
    size: '2.3 MB',
    lastUpdated: new Date('2024-01-15')
  },
  {
    id: '2',
    name: 'Risk Assessment Report',
    description: 'Complete risk assessment with identified risks and treatments',
    type: 'risk',
    included: true,
    required: true,
    size: '1.8 MB',
    lastUpdated: new Date('2024-02-01')
  },
  {
    id: '3',
    name: 'Statement of Applicability (SoA)',
    description: 'ISO 27001 Annex A controls applicability statement',
    type: 'control',
    included: true,
    required: true,
    size: '856 KB',
    lastUpdated: new Date('2024-01-20')
  },
  {
    id: '4',
    name: 'Asset Inventory',
    description: 'Complete inventory of information assets',
    type: 'evidence',
    included: true,
    required: true,
    size: '1.2 MB',
    lastUpdated: new Date('2024-02-10')
  },
  {
    id: '5',
    name: 'Access Control Policy',
    description: 'User access management and control procedures',
    type: 'policy',
    included: true,
    required: false,
    size: '743 KB',
    lastUpdated: new Date('2024-01-25')
  },
  {
    id: '6',
    name: 'Incident Response Plan',
    description: 'Security incident response procedures and contacts',
    type: 'policy',
    included: true,
    required: false,
    size: '1.1 MB',
    lastUpdated: new Date('2024-02-05')
  },
  {
    id: '7',
    name: 'Business Continuity Plan',
    description: 'Business continuity and disaster recovery procedures',
    type: 'policy',
    included: false,
    required: false,
    size: '2.1 MB',
    lastUpdated: new Date('2024-01-30')
  },
  {
    id: '8',
    name: 'Vendor Risk Assessments',
    description: 'Third-party vendor security assessments',
    type: 'risk',
    included: true,
    required: false,
    size: '967 KB',
    lastUpdated: new Date('2024-02-08')
  },
  {
    id: '9',
    name: 'Security Training Records',
    description: 'Employee security awareness training documentation',
    type: 'evidence',
    included: false,
    required: false,
    size: '1.5 MB',
    lastUpdated: new Date('2024-02-12')
  },
  {
    id: '10',
    name: 'Internal Audit Report',
    description: 'Latest internal audit findings and recommendations',
    type: 'report',
    included: true,
    required: false,
    size: '2.7 MB',
    lastUpdated: new Date('2024-02-15')
  },
  {
    id: '11',
    name: 'Control Implementation Evidence',
    description: 'Screenshots, configurations, and implementation proof',
    type: 'evidence',
    included: true,
    required: false,
    size: '4.2 MB',
    lastUpdated: new Date('2024-02-14')
  },
  {
    id: '12',
    name: 'Management Review Minutes',
    description: 'ISMS management review meeting minutes and decisions',
    type: 'report',
    included: false,
    required: false,
    size: '432 KB',
    lastUpdated: new Date('2024-02-10')
  }
]

const typeIcons = {
  policy: FileText,
  control: Shield,
  risk: AlertTriangle,
  evidence: CheckCircle,
  report: Eye
}

const typeColors = {
  policy: 'bg-blue-100 text-blue-800',
  control: 'bg-green-100 text-green-800',
  risk: 'bg-red-100 text-red-800',
  evidence: 'bg-purple-100 text-purple-800',
  report: 'bg-orange-100 text-orange-800'
}

export function AuditPackGenerator() {
  const [components, setComponents] = useState<PackageComponent[]>(defaultComponents)
  const [isGenerating, setIsGenerating] = useState(false)
  const [generationProgress, setGenerationProgress] = useState(0)
  const [organizationInfo, setOrganizationInfo] = useState({
    name: '',
    industry: '',
    size: '',
    scope: ''
  })
  const [customInstructions, setCustomInstructions] = useState('')
  const [generatedPackage, setGeneratedPackage] = useState<AuditPackage | null>(null)

  const toggleComponent = (id: string) => {
    setComponents(prev => prev.map(comp => 
      comp.id === id ? { ...comp, included: !comp.included } : comp
    ))
  }

  const selectedComponents = components.filter(comp => comp.included)
  const totalSize = selectedComponents.reduce((acc, comp) => {
    const size = parseFloat(comp.size.split(' ')[0])
    const unit = comp.size.split(' ')[1]
    return acc + (unit === 'MB' ? size : size / 1000)
  }, 0)

  const generateAuditPack = async () => {
    if (!organizationInfo.name || !organizationInfo.industry) {
      alert('Please fill in organization name and industry')
      return
    }

    setIsGenerating(true)
    setGenerationProgress(0)

    try {
      // Simulate progress
      const progressInterval = setInterval(() => {
        setGenerationProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval)
            return prev
          }
          return prev + Math.random() * 15
        })
      }, 500)

      // Generate AI-enhanced content for each component
      const componentPromises = selectedComponents.map(async (component) => {
        const prompt = `Generate a comprehensive ${component.name} for ${organizationInfo.name}, a ${organizationInfo.size} ${organizationInfo.industry} organization. 
        
        Scope: ${organizationInfo.scope}
        Custom requirements: ${customInstructions}
        
        The document should be ISO 27001:2022 compliant and tailored to the organization's specific context. Include practical implementation guidance and templates where appropriate.`

        const { text } = await blink.ai.generateText({
          prompt,
          model: 'gpt-4o-mini',
          maxTokens: 2000
        })

        return {
          ...component,
          generatedContent: text
        }
      })

      const enhancedComponents = await Promise.all(componentPromises)
      
      setGenerationProgress(100)
      
      const auditPackage: AuditPackage = {
        id: Date.now().toString(),
        name: `${organizationInfo.name} - ISO 27001 Audit Pack`,
        description: `Complete audit package for ${organizationInfo.name}`,
        components: enhancedComponents,
        organizationInfo,
        generatedAt: new Date(),
        downloadUrl: '#' // In real implementation, this would be a generated download link
      }

      setGeneratedPackage(auditPackage)
      
    } catch (error) {
      console.error('Error generating audit pack:', error)
      alert('Error generating audit pack. Please try again.')
    } finally {
      setIsGenerating(false)
    }
  }

  const downloadPackage = () => {
    // In a real implementation, this would trigger the actual download
    alert('Download started! The audit pack will be available shortly.')
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
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-teal-600 rounded-xl flex items-center justify-center">
              <Package className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Auto-Audit Pack Generator</h1>
              <p className="text-muted-foreground">Download entire ISO audit pack with policies, risks, evidence, and mappings</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Configuration Panel */}
        <div className="lg:col-span-1 space-y-6">
          {/* Organization Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Building className="w-5 h-5" />
                <span>Organization Details</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="orgName">Organization Name *</Label>
                <Input
                  id="orgName"
                  value={organizationInfo.name}
                  onChange={(e) => setOrganizationInfo(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter organization name"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="industry">Industry *</Label>
                <Select value={organizationInfo.industry} onValueChange={(value) => 
                  setOrganizationInfo(prev => ({ ...prev, industry: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select industry" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="technology">Technology</SelectItem>
                    <SelectItem value="healthcare">Healthcare</SelectItem>
                    <SelectItem value="finance">Financial Services</SelectItem>
                    <SelectItem value="manufacturing">Manufacturing</SelectItem>
                    <SelectItem value="retail">Retail</SelectItem>
                    <SelectItem value="education">Education</SelectItem>
                    <SelectItem value="government">Government</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="size">Organization Size</Label>
                <Select value={organizationInfo.size} onValueChange={(value) => 
                  setOrganizationInfo(prev => ({ ...prev, size: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="small">Small (1-50 employees)</SelectItem>
                    <SelectItem value="medium">Medium (51-250 employees)</SelectItem>
                    <SelectItem value="large">Large (251-1000 employees)</SelectItem>
                    <SelectItem value="enterprise">Enterprise (1000+ employees)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="scope">ISMS Scope</Label>
                <Textarea
                  id="scope"
                  value={organizationInfo.scope}
                  onChange={(e) => setOrganizationInfo(prev => ({ ...prev, scope: e.target.value }))}
                  placeholder="Describe the scope of your ISMS (e.g., IT services, customer data processing...)"
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Custom Instructions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Settings className="w-5 h-5" />
                <span>Custom Instructions</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label htmlFor="instructions">Additional Requirements</Label>
                <Textarea
                  id="instructions"
                  value={customInstructions}
                  onChange={(e) => setCustomInstructions(e.target.value)}
                  placeholder="Any specific requirements, compliance frameworks, or customizations needed..."
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>

          {/* Package Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Package Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Selected Components</span>
                <span className="font-medium">{selectedComponents.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Estimated Size</span>
                <span className="font-medium">{totalSize.toFixed(1)} MB</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Required Items</span>
                <span className="font-medium">
                  {components.filter(c => c.required && c.included).length}/
                  {components.filter(c => c.required).length}
                </span>
              </div>
              <Separator />
              <Button 
                onClick={generateAuditPack}
                disabled={isGenerating || !organizationInfo.name || !organizationInfo.industry}
                className="w-full"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4 mr-2" />
                    Generate Audit Pack
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Components Selection */}
        <div className="lg:col-span-2 space-y-6">
          {/* Generation Progress */}
          {isGenerating && (
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Generating Audit Pack</span>
                    <span className="text-sm text-muted-foreground">{Math.round(generationProgress)}%</span>
                  </div>
                  <Progress value={generationProgress} className="h-2" />
                  <p className="text-sm text-muted-foreground">
                    AI is customizing documents for your organization...
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Generated Package */}
          {generatedPackage && (
            <Card className="border-green-200 bg-green-50">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span>Audit Pack Generated</span>
                  </div>
                  <Button onClick={downloadPackage} className="bg-green-600 hover:bg-green-700">
                    <Download className="w-4 h-4 mr-2" />
                    Download Pack
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <p className="text-sm">
                    <strong>{generatedPackage.name}</strong> has been generated successfully.
                  </p>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <span>📦 {generatedPackage.components.length} components</span>
                    <span>📅 Generated {generatedPackage.generatedAt?.toLocaleString()}</span>
                    <span>💾 {totalSize.toFixed(1)} MB</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Components List */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Select Components</span>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setComponents(prev => prev.map(c => ({ ...c, included: true })))}
                  >
                    Select All
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setComponents(prev => prev.map(c => ({ ...c, included: c.required })))}
                  >
                    Required Only
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {components.map((component) => {
                  const Icon = typeIcons[component.type]
                  
                  return (
                    <div
                      key={component.id}
                      className={`p-4 border rounded-lg transition-all ${
                        component.included ? 'border-primary bg-primary/5' : 'border-border'
                      }`}
                    >
                      <div className="flex items-start space-x-4">
                        <Checkbox
                          checked={component.included}
                          onCheckedChange={() => !component.required && toggleComponent(component.id)}
                          disabled={component.required}
                          className="mt-1"
                        />
                        
                        <div className="flex-1 space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${typeColors[component.type]}`}>
                                <Icon className="w-4 h-4" />
                              </div>
                              <div>
                                <h4 className="font-medium">{component.name}</h4>
                                {component.required && (
                                  <Badge variant="secondary" className="text-xs">Required</Badge>
                                )}
                              </div>
                            </div>
                            
                            <div className="text-right text-sm text-muted-foreground">
                              <div>{component.size}</div>
                              <div>Updated {component.lastUpdated.toLocaleDateString()}</div>
                            </div>
                          </div>
                          
                          <p className="text-sm text-muted-foreground">{component.description}</p>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </motion.div>
  )
}