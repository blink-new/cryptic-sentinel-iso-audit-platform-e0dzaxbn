import { motion, AnimatePresence } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'
import { 
  Shield, 
  LayoutDashboard, 
  Search, 
  FileText, 
  AlertTriangle, 
  Users, 
  BarChart3, 
  Settings,
  Bot,
  Calendar,
  Package,
  MessageSquare,
  X,
  Home,
  ShieldCheck,
  Sparkles,
  Brain,
  Network,
  Clock
} from 'lucide-react'
import { cn } from '../../lib/utils'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'

interface SidebarProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const navigation = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Executive Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'AI Audit Engine', href: '/audit-engine', icon: Search },
  { name: 'Evidence Collection', href: '/evidence', icon: FileText },
  { name: 'Risk Register', href: '/risk-register', icon: AlertTriangle },
  { name: 'Third-Party Risk', href: '/third-party-risk', icon: Users },
  { name: 'Reports & Analytics', href: '/reports', icon: BarChart3 },
]

const aiFeatures = [
  { name: 'AI Compliance Copilot', href: '/ai-copilot', icon: Bot, status: 'active' },
  { name: 'Compliance Timeline', href: '/compliance-timeline', icon: Calendar },
  { name: 'Audit Pack Generator', href: '/audit-pack-generator', icon: Package },
  { name: 'Audit Simulation', href: '/audit-simulation', icon: MessageSquare },
]

const revolutionaryFeatures = [
  { name: 'Quantum Risk Predictor', href: '/quantum-risk-predictor', icon: Brain, badge: 'NEW' },
  { name: 'Neural Compliance', href: '/neural-compliance', icon: Network, badge: 'BETA' },
  { name: 'Compliance Time Travel', href: '/compliance-time-travel', icon: Clock, badge: 'ALPHA' },
]

export function Sidebar({ open, onOpenChange }: SidebarProps) {
  const location = useLocation()

  return (
    <>
      {/* Mobile backdrop */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/50 lg:hidden"
            onClick={() => onOpenChange(false)}
          />
        )}
      </AnimatePresence>

      {/* Executive Sidebar */}
      <motion.div
        initial={false}
        animate={{ x: open ? 0 : '-100%' }}
        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-72 bg-sidebar border-r border-sidebar-border premium-shadow-xl",
          "lg:translate-x-0 lg:static lg:inset-0"
        )}
      >
        <div className="flex h-full flex-col">
          {/* Executive Header */}
          <div className="flex h-16 items-center justify-between px-6 border-b border-sidebar-border">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 executive-gradient rounded-xl flex items-center justify-center premium-shadow-lg">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="font-bold text-sidebar-foreground">Cryptic Sentinel</h1>
                <p className="text-xs text-sidebar-foreground/70">Enterprise Platform</p>
              </div>
            </div>
            
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden text-sidebar-foreground hover:bg-sidebar-accent rounded-xl"
              onClick={() => onOpenChange(false)}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-8 overflow-y-auto">
            {/* Core Features */}
            <div>
              <h2 className="px-3 text-xs font-semibold text-sidebar-foreground/60 uppercase tracking-wider mb-4">
                Core Platform
              </h2>
              <ul className="space-y-1">
                {navigation.map((item) => {
                  const isActive = location.pathname === item.href
                  return (
                    <li key={item.name}>
                      <Link
                        to={item.href}
                        className={cn(
                          "group flex items-center px-3 py-3 text-sm font-medium rounded-xl transition-all duration-200",
                          isActive
                            ? "bg-sidebar-primary text-sidebar-primary-foreground premium-shadow"
                            : "text-sidebar-foreground/80 hover:text-sidebar-foreground hover:bg-sidebar-accent/50 executive-hover-subtle"
                        )}
                        onClick={() => onOpenChange(false)}
                      >
                        <item.icon className="mr-3 h-5 w-5 flex-shrink-0" />
                        <span className="flex-1">{item.name}</span>
                        {isActive && (
                          <motion.div
                            layoutId="activeIndicator"
                            className="w-2 h-2 bg-sidebar-ring rounded-full"
                            initial={false}
                            transition={{ type: "spring", stiffness: 500, damping: 30 }}
                          />
                        )}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>

            {/* AI-Powered Tools */}
            <div>
              <h2 className="px-3 text-xs font-semibold text-sidebar-foreground/60 uppercase tracking-wider mb-4">
                AI-Powered Tools
              </h2>
              <ul className="space-y-1">
                {aiFeatures.map((item) => {
                  const isActive = location.pathname === item.href
                  return (
                    <li key={item.name}>
                      <Link
                        to={item.href}
                        className={cn(
                          "group flex items-center px-3 py-3 text-sm font-medium rounded-xl transition-all duration-200",
                          isActive
                            ? "bg-gradient-to-r from-sidebar-primary to-sidebar-accent text-sidebar-primary-foreground premium-shadow"
                            : "text-sidebar-foreground/80 hover:text-sidebar-foreground hover:bg-sidebar-accent/50 executive-hover-subtle"
                        )}
                        onClick={() => onOpenChange(false)}
                      >
                        <item.icon className="mr-3 h-5 w-5 flex-shrink-0" />
                        <span className="flex-1">{item.name}</span>
                        {item.status === 'active' && (
                          <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                        )}
                        {isActive && (
                          <motion.div
                            layoutId="activeIndicatorAI"
                            className="w-2 h-2 bg-sidebar-ring rounded-full"
                            initial={false}
                            transition={{ type: "spring", stiffness: 500, damping: 30 }}
                          />
                        )}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>

            {/* Revolutionary Features */}
            <div>
              <div className="flex items-center px-3 mb-4">
                <h2 className="text-xs font-semibold text-sidebar-foreground/60 uppercase tracking-wider flex-1">
                  Revolutionary
                </h2>
                <Sparkles className="w-3 h-3 text-sidebar-accent" />
              </div>
              <ul className="space-y-1">
                {revolutionaryFeatures.map((item) => {
                  const isActive = location.pathname === item.href
                  return (
                    <li key={item.name}>
                      <Link
                        to={item.href}
                        className={cn(
                          "group flex items-center px-3 py-3 text-sm font-medium rounded-xl transition-all duration-200 relative",
                          isActive
                            ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white premium-shadow"
                            : "text-sidebar-foreground/80 hover:text-sidebar-foreground hover:bg-gradient-to-r hover:from-purple-600/10 hover:to-pink-600/10 executive-hover-subtle"
                        )}
                        onClick={() => onOpenChange(false)}
                      >
                        <item.icon className="mr-3 h-5 w-5 flex-shrink-0" />
                        <span className="flex-1">{item.name}</span>
                        {item.badge && (
                          <Badge 
                            variant="secondary" 
                            className="ml-2 text-[10px] px-1.5 py-0.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0"
                          >
                            {item.badge}
                          </Badge>
                        )}
                        {isActive && (
                          <motion.div
                            layoutId="activeIndicatorRevolutionary"
                            className="w-2 h-2 bg-white rounded-full"
                            initial={false}
                            transition={{ type: "spring", stiffness: 500, damping: 30 }}
                          />
                        )}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>
          </nav>

          {/* Executive Footer */}
          <div className="p-4 border-t border-sidebar-border">
            <Link
              to="/settings"
              className={cn(
                "flex items-center px-3 py-3 text-sm font-medium rounded-xl transition-all duration-200",
                location.pathname === '/settings'
                  ? "bg-sidebar-primary text-sidebar-primary-foreground premium-shadow"
                  : "text-sidebar-foreground/80 hover:text-sidebar-foreground hover:bg-sidebar-accent/50 executive-hover-subtle"
              )}
              onClick={() => onOpenChange(false)}
            >
              <Settings className="mr-3 h-5 w-5" />
              <span className="flex-1">Settings</span>
            </Link>
          </div>
        </div>
      </motion.div>
    </>
  )
}