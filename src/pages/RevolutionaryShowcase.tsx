import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { 
  Brain, 
  Network, 
  Clock, 
  Sparkles, 
  Zap, 
  ArrowRight,
  Shield,
  Target,
  Activity,
  Eye,
  Cpu,
  Radar,
  GitBranch,
  Layers
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Badge } from '../components/ui/badge'

const revolutionaryFeatures = [
  {
    id: 'quantum-risk',
    title: 'Quantum Risk Predictor',
    subtitle: 'Multi-Dimensional Risk Analysis',
    description: 'World\'s first quantum-dimensional risk prediction engine that analyzes risks across temporal, behavioral, technological, regulatory, and geopolitical dimensions simultaneously.',
    icon: Brain,
    gradient: 'from-purple-500 to-pink-500',
    textGradient: 'from-purple-600 to-pink-600',
    path: '/quantum-risk-predictor',
    features: [
      'Quantum risk factor analysis',
      'Multi-dimensional threat modeling',
      'Temporal risk clustering',
      'Behavioral anomaly superposition',
      'Predictive quantum scenarios'
    ],
    uniqueness: 'First-in-class quantum approach to cybersecurity risk prediction',
    demo: {
      metric: '87%',
      label: 'Prediction Accuracy',
      subtext: 'Across 5 quantum dimensions'
    }
  },
  {
    id: 'neural-compliance',
    title: 'Neural Compliance Orchestrator',
    subtitle: 'AI Neural Network Modeling',
    description: 'Revolutionary system that models your entire compliance framework as an interconnected neural network, enabling real-time optimization and emergent compliance behaviors.',
    icon: Network,
    gradient: 'from-blue-500 to-cyan-500',
    textGradient: 'from-blue-600 to-cyan-600',
    path: '/neural-compliance',
    features: [
      'Neural network compliance modeling',
      'Real-time pathway optimization',
      'Emergent compliance behaviors',
      'Auto-strengthening connections',
      'Neural insight generation'
    ],
    uniqueness: 'First system to model compliance as a living neural network',
    demo: {
      metric: '114',
      label: 'Neural Nodes',
      subtext: 'Interconnected controls'
    }
  },
  {
    id: 'time-travel',
    title: 'Compliance Time Travel',
    subtitle: 'Temporal Compliance Navigation',
    description: 'Breakthrough technology that allows you to navigate through compliance history, analyze temporal patterns, and predict future compliance scenarios with unprecedented accuracy.',
    icon: Clock,
    gradient: 'from-indigo-500 to-purple-500',
    textGradient: 'from-indigo-600 to-purple-600',
    path: '/compliance-time-travel',
    features: [
      'Historical compliance analysis',
      'Future scenario prediction',
      'Temporal pattern recognition',
      'Time-sensitive action alerts',
      'Compliance timeline optimization'
    ],
    uniqueness: 'First platform to enable time-dimensional compliance analysis',
    demo: {
      metric: '365',
      label: 'Days Analyzed',
      subtext: 'Past & future insights'
    }
  }
]

export function RevolutionaryShowcase() {
  const [selectedFeature, setSelectedFeature] = useState(revolutionaryFeatures[0])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-7xl mx-auto px-6 space-y-12"
    >
      {/* Hero Section */}
      <div className="text-center space-y-6">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="space-y-4"
        >
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Sparkles className="w-8 h-8 text-yellow-500" />
            <Badge variant="outline" className="bg-gradient-to-r from-yellow-100 to-orange-100 border-yellow-300 text-yellow-800 px-4 py-2">
              WORLD'S FIRST
            </Badge>
            <Sparkles className="w-8 h-8 text-yellow-500" />
          </div>
          
          <h1 className="text-5xl font-bold tracking-tight">
            <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Revolutionary
            </span>
            <br />
            <span className="text-foreground">Compliance Intelligence</span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Introducing three groundbreaking, first-in-class features that redefine how organizations 
            approach compliance, risk management, and audit preparation.
          </p>
        </motion.div>

        {/* Innovation Badges */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex flex-wrap justify-center gap-4"
        >
          {[
            { icon: Brain, text: 'Quantum AI', color: 'text-purple-600' },
            { icon: Network, text: 'Neural Networks', color: 'text-blue-600' },
            { icon: Clock, text: 'Time Dimension', color: 'text-indigo-600' },
            { icon: Zap, text: 'Real-time', color: 'text-yellow-600' }
          ].map((badge, index) => (
            <motion.div
              key={badge.text}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.6 + index * 0.1 }}
              className="flex items-center space-x-2 bg-background border rounded-full px-4 py-2 shadow-sm"
            >
              <badge.icon className={`w-4 h-4 ${badge.color}`} />
              <span className="text-sm font-medium">{badge.text}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Feature Selection */}
      <div className="grid gap-6 lg:grid-cols-3">
        {revolutionaryFeatures.map((feature, index) => (
          <motion.div
            key={feature.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 + index * 0.1 }}
            onClick={() => setSelectedFeature(feature)}
            className={`cursor-pointer transition-all duration-300 ${
              selectedFeature.id === feature.id ? 'scale-105' : 'hover:scale-102'
            }`}
          >
            <Card className={`cyber-border h-full ${
              selectedFeature.id === feature.id ? 'cyber-glow ring-2 ring-primary/20' : 'hover:cyber-glow'
            }`}>
              <CardHeader className="text-center">
                <div className={`w-16 h-16 mx-auto rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <CardTitle className={`text-xl bg-gradient-to-r ${feature.textGradient} bg-clip-text text-transparent`}>
                  {feature.title}
                </CardTitle>
                <CardDescription className="font-medium">
                  {feature.subtitle}
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <div className="space-y-3">
                  <div className="text-3xl font-bold text-primary">
                    {feature.demo.metric}
                  </div>
                  <div className="text-sm font-medium">
                    {feature.demo.label}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {feature.demo.subtext}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Selected Feature Details */}
      <motion.div
        key={selectedFeature.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        <Card className="cyber-border cyber-glow">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${selectedFeature.gradient} flex items-center justify-center`}>
                  <selectedFeature.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <CardTitle className={`text-2xl bg-gradient-to-r ${selectedFeature.textGradient} bg-clip-text text-transparent`}>
                    {selectedFeature.title}
                  </CardTitle>
                  <CardDescription className="text-base">
                    {selectedFeature.subtitle}
                  </CardDescription>
                </div>
              </div>
              <Button asChild className={`bg-gradient-to-r ${selectedFeature.gradient} hover:opacity-90`}>
                <Link to={selectedFeature.path}>
                  <Eye className="w-4 h-4 mr-2" />
                  Experience Now
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <p className="text-lg text-muted-foreground leading-relaxed">
              {selectedFeature.description}
            </p>

            <div className="grid gap-6 md:grid-cols-2">
              {/* Key Features */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center space-x-2">
                  <Target className="w-5 h-5 text-primary" />
                  <span>Key Capabilities</span>
                </h3>
                <div className="space-y-2">
                  {selectedFeature.features.map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start space-x-3"
                    >
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Uniqueness */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center space-x-2">
                  <Sparkles className="w-5 h-5 text-yellow-500" />
                  <span>Innovation Breakthrough</span>
                </h3>
                <div className="p-4 bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg">
                  <p className="text-sm font-medium text-yellow-800">
                    {selectedFeature.uniqueness}
                  </p>
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="flex items-center justify-center pt-6 border-t">
              <Button asChild size="lg" className={`bg-gradient-to-r ${selectedFeature.gradient} hover:opacity-90 text-lg px-8 py-3`}>
                <Link to={selectedFeature.path}>
                  <Zap className="w-5 h-5 mr-2" />
                  Launch {selectedFeature.title}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Innovation Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
        className="grid gap-6 md:grid-cols-4"
      >
        {[
          { icon: Brain, label: 'AI Models', value: '3', desc: 'Revolutionary algorithms' },
          { icon: Cpu, label: 'Dimensions', value: '5+', desc: 'Risk analysis vectors' },
          { icon: Activity, label: 'Real-time', value: '100%', desc: 'Live processing' },
          { icon: Shield, label: 'First-in-Class', value: '3', desc: 'Breakthrough features' }
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1.4 + index * 0.1 }}
          >
            <Card className="cyber-border hover:cyber-glow transition-all duration-300 text-center">
              <CardContent className="p-6">
                <div className="space-y-3">
                  <div className="w-12 h-12 mx-auto bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                    <stat.icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div className="text-3xl font-bold text-primary">{stat.value}</div>
                  <div className="text-sm font-medium">{stat.label}</div>
                  <div className="text-xs text-muted-foreground">{stat.desc}</div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Bottom CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.6 }}
        className="text-center space-y-6 py-12"
      >
        <h2 className="text-3xl font-bold">
          Ready to Experience the Future of Compliance?
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Join the revolution and be among the first to use these groundbreaking compliance intelligence features.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          {revolutionaryFeatures.map((feature) => (
            <Button
              key={feature.id}
              asChild
              variant="outline"
              className="hover:scale-105 transition-transform"
            >
              <Link to={feature.path}>
                <feature.icon className="w-4 h-4 mr-2" />
                Try {feature.title.split(' ')[0]}
              </Link>
            </Button>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}