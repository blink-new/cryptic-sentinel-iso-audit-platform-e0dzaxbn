import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { 
  Shield, 
  Zap, 
  Brain, 
  Lock, 
  TrendingUp, 
  Users,
  ArrowRight,
  CheckCircle,
  Star,
  Globe,
  Sparkles,
  Network,
  Clock,
  Award,
  BarChart3,
  FileText,
  Eye
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Badge } from '../components/ui/badge'

const features = [
  {
    icon: Brain,
    title: "AI-Powered Audit Engine",
    description: "Upload documents and let AI map them to ISO 27001 controls automatically with enterprise-grade precision",
    href: "/audit-engine",
    image: "https://images.unsplash.com/photo-1729551610680-c6ea05b08937?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NzI1Njd8MHwxfHNlYXJjaHw0fHxjb3Jwb3JhdGUlMjBib2FyZHJvb20lMjBleGVjdXRpdmUlMjBtZWV0aW5nJTIwcHJvZmVzc2lvbmFsJTIwYnVzaW5lc3N8ZW58MHwwfHx8MTc1Mjg0NDI1MHww&ixlib=rb-4.1.0&q=80&w=1080",
    gradient: "from-slate-600 to-sky-600"
  },
  {
    icon: Shield,
    title: "Evidence Collection",
    description: "Upload, tag & store evidence per control with intelligent organization and executive reporting",
    href: "/evidence",
    image: "https://images.unsplash.com/photo-1618506487216-4e8c60a64c73?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NzI1Njd8MHwxfHNlYXJjaHwzfHxjb3Jwb3JhdGUlMjBib2FyZHJvb20lMjBleGVjdXRpdmUlMjBtZWV0aW5nJTIwcHJvZmVzc2lvbmFsJTIwYnVzaW5lc3N8ZW58MHwwfHx8MTc1Mjg0NDI1MHww&ixlib=rb-4.1.0&q=80&w=1080",
    gradient: "from-emerald-600 to-teal-600"
  },
  {
    icon: TrendingUp,
    title: "Risk Register",
    description: "Custom risk matrix & scoring engine with automated risk assessment and board-level insights",
    href: "/risk-register",
    image: "https://images.unsplash.com/photo-1667646639408-b320d58836e5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NzI1Njd8MHwxfHNlYXJjaHwyfHxjb3Jwb3JhdGUlMjBib2FyZHJvb20lMjBleGVjdXRpdmUlMjBtZWV0aW5nJTIwcHJvZmVzc2lvbmFsJTIwYnVzaW5lc3N8ZW58MHwwfHx8MTc1Mjg0NDI1MHww&ixlib=rb-4.1.0&q=80&w=1080",
    gradient: "from-amber-600 to-orange-600"
  },
  {
    icon: Users,
    title: "Third-Party Risk Scoring",
    description: "AI evaluates vendor risks using preset criteria with Red/Amber/Green scoring for executive decisions",
    href: "/third-party-risk",
    image: "https://images.unsplash.com/photo-1581374820531-029275791beb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NzI1Njd8MHwxfHNlYXJjaHwxfHxjb3Jwb3JhdGUlMjBib2FyZHJvb20lMjBleGVjdXRpdmUlMjBtZWV0aW5nJTIwcHJvZmVzc2lvbmFsJTIwYnVzaW5lc3N8ZW58MHwwfHx8MTc1Mjg0NDI1MHww&ixlib=rb-4.1.0&q=80&w=1080",
    gradient: "from-purple-600 to-indigo-600"
  },
  {
    icon: BarChart3,
    title: "Executive Dashboards",
    description: "Real-time compliance metrics, risk heatmaps, and audit progress designed for C-suite visibility",
    href: "/reports",
    image: "https://images.unsplash.com/photo-1737502483541-92e91801cfaf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NzI1Njd8MHwxfHNlYXJjaHwxfHxlbnRlcnByaXNlJTIwc2VjdXJpdHklMjB0ZWNobm9sb2d5JTIwcHJvZmVzc2lvbmFsJTIwZGFzaGJvYXJkfGVufDB8MHx8fDE3NTI4NDQyNTV8MA&ixlib=rb-4.1.0&q=80&w=1080",
    gradient: "from-sky-600 to-blue-600"
  },
  {
    icon: Zap,
    title: "AI Compliance Copilot",
    description: "Ask questions about ISO 27001 controls, audit readiness, and compliance strategy in natural language",
    href: "/ai-copilot",
    image: "https://images.unsplash.com/photo-1591833255191-c42cf1b749f0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NzI1Njd8MHwxfHNlYXJjaHw0fHxlbnRlcnByaXNlJTIwc2VjdXJpdHklMjB0ZWNobm9sb2d5JTIwcHJvZmVzc2lvbmFsJTIwZGFzaGJvYXJkfGVufDB8MHx8fDE3NTI4NDQyNTV8MA&ixlib=rb-4.1.0&q=80&w=1080",
    gradient: "from-violet-600 to-purple-600"
  }
]

const stats = [
  { label: "ISO Controls Automated", value: "114+", icon: CheckCircle, color: "text-emerald-600" },
  { label: "Audit Time Reduction", value: "80%", icon: TrendingUp, color: "text-sky-600" },
  { label: "Compliance Accuracy", value: "99.9%", icon: Award, color: "text-amber-600" },
  { label: "Enterprise Clients", value: "500+", icon: Globe, color: "text-purple-600" }
]

const revolutionaryFeatures = [
  {
    icon: Brain,
    title: 'Quantum Risk Predictor',
    description: 'Multi-dimensional risk analysis using quantum computing principles for unprecedented accuracy',
    gradient: 'from-purple-600 to-pink-600',
    href: '/quantum-risk-predictor',
    image: 'https://images.unsplash.com/photo-1655036387197-566206c80980?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NzI1Njd8MHwxfHNlYXJjaHwzfHxlbnRlcnByaXNlJTIwc2VjdXJpdHklMjB0ZWNobm9sb2d5JTIwcHJvZmVzc2lvbmFsJTIwZGFzaGJvYXJkfGVufDB8MHx8fDE3NTI4NDQyNTV8MA&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    icon: Network,
    title: 'Neural Compliance Orchestrator',
    description: 'AI neural network modeling of compliance systems with predictive intelligence',
    gradient: 'from-blue-600 to-cyan-600',
    href: '/neural-compliance',
    image: 'https://images.unsplash.com/photo-1729184648234-7650c1484905?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NzI1Njd8MHwxfHNlYXJjaHwyfHxlbnRlcnByaXNlJTIwc2VjdXJpdHklMjB0ZWNobm9sb2d5JTIwcHJvZmVzc2lvbmFsJTIwZGFzaGJvYXJkfGVufDB8MHx8fDE3NTI4NDQyNTV8MA&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    icon: Clock,
    title: 'Compliance Time Travel',
    description: 'Navigate compliance across temporal dimensions with historical trend analysis',
    gradient: 'from-indigo-600 to-purple-600',
    href: '/compliance-time-travel',
    image: 'https://images.unsplash.com/photo-1719925219818-a09debbf804f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NzI1Njd8MHwxfHNlYXJjaHw1fHxlbnRlcnByaXNlJTIwc2VjdXJpdHklMjB0ZWNobm9sb2d5JTIwcHJvZmVzc2lvbmFsJTIwZGFzaGJvYXJkfGVufDB8MHx8fDE3NTI4NDQyNTV8MA&ixlib=rb-4.1.0&q=80&w=1080'
  }
]

export function Home() {
  return (
    <div className="min-h-screen professional-gradient">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="executive-container executive-section space-y-20"
      >
        {/* Executive Hero Section */}
        <div className="relative">
          {/* Premium Background */}
          <div className="absolute inset-0 -z-10 overflow-hidden rounded-3xl">
            <motion.img
              initial={{ scale: 1.1, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.15 }}
              transition={{ duration: 2 }}
              src="https://images.unsplash.com/photo-1649211612005-6f7728fecbd0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NzI1Njd8MHwxfHNlYXJjaHw1fHxjb3Jwb3JhdGUlMjBib2FyZHJvb20lMjBleGVjdXRpdmUlMjBtZWV0aW5nJTIwcHJvZmVzc2lvbmFsJTIwYnVzaW5lc3N8ZW58MHwwfHx8MTc1Mjg0NDI1MHww&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Executive Boardroom"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/40" />
          </div>

          <div className="relative text-center space-y-8 py-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-6"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="inline-block"
              >
                <Badge 
                  variant="secondary" 
                  className="px-6 py-3 text-sm font-medium executive-backdrop border-border/30 text-foreground"
                >
                  <Shield className="w-4 h-4 mr-2 text-accent" />
                  Enterprise ISO 27001 Compliance Platform
                </Badge>
              </motion.div>
              
              <motion.h1 
                className="text-6xl md:text-8xl font-bold tracking-tight executive-text-gradient"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                Cryptic Sentinel
              </motion.h1>
              
              <motion.p 
                className="text-3xl md:text-4xl font-medium text-muted-foreground"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                Audit Smarter. Trust Faster.
              </motion.p>
              
              <motion.p 
                className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                The world's most sophisticated AI-powered ISO 27001:2022 audit platform. 
                Trusted by Fortune 500 companies, government agencies, and industry leaders 
                for enterprise-grade compliance automation.
              </motion.p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button asChild size="lg" className="px-10 py-6 text-lg executive-button premium-shadow-lg">
                  <Link to="/dashboard">
                    Start Enterprise Trial
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button asChild variant="outline" size="lg" className="px-10 py-6 text-lg executive-border executive-backdrop">
                  <Link to="/ai-copilot">
                    <Brain className="mr-2 w-5 h-5" />
                    Try AI Copilot
                  </Link>
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Executive Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="executive-grid-4"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.4 + index * 0.1 }}
              whileHover={{ y: -4 }}
            >
              <Card className="text-center executive-card executive-hover premium-shadow">
                <CardContent className="pt-8 pb-6">
                  <div className="flex justify-center mb-4">
                    <div className="w-14 h-14 bg-secondary rounded-full flex items-center justify-center">
                      <stat.icon className={`w-7 h-7 ${stat.color}`} />
                    </div>
                  </div>
                  <div className={`text-4xl font-bold mb-2 ${stat.color}`}>{stat.value}</div>
                  <div className="text-sm executive-caption font-medium">{stat.label}</div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Revolutionary Features Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6 }}
          className="executive-card p-10 premium-shadow-xl"
        >
          <div className="text-center space-y-6 mb-12">
            <motion.div 
              className="inline-block"
              whileHover={{ scale: 1.05 }}
            >
              <Badge 
                variant="outline" 
                className="px-6 py-3 text-sm font-medium executive-backdrop border-accent/30 text-accent"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Revolutionary Innovation
              </Badge>
            </motion.div>
            <h2 className="text-4xl font-bold executive-heading">
              First-in-Class Compliance Intelligence
            </h2>
            <p className="text-xl executive-subheading max-w-3xl mx-auto">
              Experience three groundbreaking features that redefine enterprise compliance automation
            </p>
          </div>

          <div className="executive-grid-3 mb-10">
            {revolutionaryFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.8 + index * 0.1 }}
                whileHover={{ y: -8 }}
              >
                <Card className="overflow-hidden executive-card executive-hover premium-shadow-lg h-full">
                  <Link to={feature.href}>
                    <div className="relative h-56 overflow-hidden">
                      <motion.img
                        src={feature.image}
                        alt={feature.title}
                        className="w-full h-full object-cover"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.5 }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      <div className={`absolute top-4 right-4 w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center premium-shadow-lg`}>
                        <feature.icon className="h-6 w-6 text-white" />
                      </div>
                    </div>
                    <CardHeader className="text-center">
                      <CardTitle className="text-xl executive-heading group-hover:text-accent transition-colors">
                        {feature.title}
                      </CardTitle>
                      <CardDescription className="executive-subheading">
                        {feature.description}
                      </CardDescription>
                    </CardHeader>
                  </Link>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <Button asChild size="lg" className="executive-accent-button px-10 premium-shadow-lg">
              <Link to="/revolutionary-showcase">
                <Eye className="w-5 h-5 mr-2" />
                Explore Revolutionary Features
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </div>
        </motion.div>

        {/* Core Features Grid */}
        <div className="space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.0 }}
            className="text-center space-y-6"
          >
            <h2 className="text-5xl font-bold executive-heading">
              Complete Enterprise Compliance Suite
            </h2>
            <p className="text-xl executive-subheading max-w-4xl mx-auto">
              From document analysis to executive reporting, our AI-powered platform handles 
              every aspect of your ISO 27001 compliance journey with enterprise-grade precision.
            </p>
          </motion.div>

          <div className="executive-grid-3">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.2 + index * 0.1 }}
                whileHover={{ y: -8 }}
              >
                <Card className="h-full overflow-hidden executive-card executive-hover premium-shadow-lg group">
                  <Link to={feature.href}>
                    <div className="relative h-56 overflow-hidden">
                      <motion.img
                        src={feature.image}
                        alt={feature.title}
                        className="w-full h-full object-cover"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.5 }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      <div className={`absolute top-4 right-4 w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center premium-shadow-lg group-hover:scale-110 transition-transform`}>
                        <feature.icon className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <CardHeader>
                      <CardTitle className="text-xl executive-heading group-hover:text-accent transition-colors">
                        {feature.title}
                      </CardTitle>
                      <CardDescription className="executive-subheading leading-relaxed">
                        {feature.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <motion.div 
                        className="flex items-center text-accent font-medium group-hover:translate-x-2 transition-transform"
                        whileHover={{ x: 8 }}
                      >
                        Explore Feature
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </motion.div>
                    </CardContent>
                  </Link>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Executive CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.8 }}
          className="text-center space-y-10 py-20 executive-card premium-shadow-xl"
        >
          <div className="space-y-6">
            <h2 className="text-5xl font-bold executive-heading">
              Ready to Transform Your Compliance Strategy?
            </h2>
            <p className="text-xl executive-subheading max-w-3xl mx-auto">
              Join Fortune 500 companies and government agencies worldwide who trust 
              Cryptic Sentinel for their mission-critical ISO 27001 compliance needs.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button asChild size="lg" className="px-10 py-6 text-lg executive-button premium-shadow-lg">
                <Link to="/dashboard">
                  <Shield className="mr-2 w-5 h-5" />
                  Start Enterprise Audit
                </Link>
              </Button>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button asChild variant="outline" size="lg" className="px-10 py-6 text-lg executive-border executive-backdrop">
                <Link to="/reports">
                  <FileText className="mr-2 w-5 h-5" />
                  View Executive Demo
                </Link>
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}