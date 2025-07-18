import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { 
  Moon, 
  Sun, 
  LogOut, 
  Shield,
  Menu,
  Settings,
  User,

  LayoutDashboard,
  Search,
  FileText,
  AlertTriangle,
  Users,
  BarChart3,
  Bot,
  Calendar,
  Package,
  MessageSquare,
  Home,
  Brain,
  Network,
  Clock
} from 'lucide-react'
import { useTheme } from 'next-themes'
import { Button } from '../ui/button'
import { Avatar, AvatarFallback } from '../ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import { NotificationTrigger } from '../ui/NotificationCenter'
import blink from '../../blink/client'

interface User {
  id: string
  email: string
  displayName?: string
}

interface HeaderProps {
  onMenuClick: () => void
  user: User
}

const navigationItems = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Executive Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'AI Audit Engine', href: '/audit-engine', icon: Search },
  { name: 'Evidence Collection', href: '/evidence', icon: FileText },
  { name: 'Risk Register', href: '/risk-register', icon: AlertTriangle },
  { name: 'Third-Party Risk', href: '/third-party-risk', icon: Users },
  { name: 'Reports & Analytics', href: '/reports', icon: BarChart3 },
]

const aiFeatures = [
  { name: 'AI Compliance Copilot', href: '/ai-copilot', icon: Bot },
  { name: 'Compliance Timeline', href: '/compliance-timeline', icon: Calendar },
  { name: 'Audit Pack Generator', href: '/audit-pack-generator', icon: Package },
  { name: 'Audit Simulation', href: '/audit-simulation', icon: MessageSquare },
]

const revolutionaryFeatures = [
  { name: 'Quantum Risk Predictor', href: '/quantum-risk-predictor', icon: Brain },
  { name: 'Neural Compliance', href: '/neural-compliance', icon: Network },
  { name: 'Compliance Time Travel', href: '/compliance-time-travel', icon: Clock },
]

export function Header({ onMenuClick, user }: HeaderProps) {
  const { theme, setTheme } = useTheme()
  const navigate = useNavigate()


  const handleLogout = () => {
    blink.auth.logout()
  }

  const getInitials = (email: string, displayName?: string) => {
    if (displayName) {
      return displayName.split(' ').map(n => n[0]).join('').toUpperCase()
    }
    return email.split('@')[0].slice(0, 2).toUpperCase()
  }

  const handleBrandClick = () => {
    navigate('/')
  }

  const handleNavigationClick = (href: string) => {
    navigate(href)
  }

  return (
    <header className="sticky top-0 z-50 executive-backdrop border-b executive-border premium-shadow">
      <div className="flex h-16 items-center justify-between px-6">
        <div className="flex items-center space-x-4">
          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden executive-hover-subtle"
            onClick={onMenuClick}
          >
            <Menu className="h-5 w-5" />
          </Button>
          
          {/* Executive Brand Logo with Navigation Dropdown */}
          <div className="flex items-center space-x-2">
            <motion.div
              className="flex items-center cursor-pointer group"
              onClick={handleBrandClick}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center space-x-3">
                <motion.div 
                  className="w-10 h-10 executive-gradient rounded-xl flex items-center justify-center premium-shadow-lg"
                  whileHover={{ rotate: 5, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <Shield className="w-6 h-6 text-white" />
                </motion.div>
                <div className="hidden sm:block">
                  <motion.h1 
                    className="text-xl font-bold executive-text-gradient group-hover:scale-105 transition-transform"
                    whileHover={{ 
                      background: "linear-gradient(45deg, #0ea5e9, #8b5cf6)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent"
                    }}
                  >
                    Cryptic Sentinel
                  </motion.h1>
                  <motion.p 
                    className="text-xs executive-caption group-hover:text-accent transition-colors"
                    initial={{ opacity: 0.7 }}
                    whileHover={{ opacity: 1 }}
                  >
                    Enterprise Compliance Platform
                  </motion.p>
                </div>
              </div>
            </motion.div>

            {/* Navigation Dropdown - Hidden by default, shows on hover */}
            <div className="relative group">
              <div className="absolute left-0 top-full mt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                <div className="w-80 executive-backdrop border executive-border premium-shadow-xl rounded-lg overflow-hidden">
                  {/* Core Platform */}
                  <div className="px-3 py-2 border-b border-border/30">
                    <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Core Platform
                    </div>
                  </div>
                  <div className="py-2">
                    {navigationItems.map((item) => (
                      <button
                        key={item.name}
                        className="w-full text-left px-3 py-2 executive-hover-subtle cursor-pointer flex items-center"
                        onClick={() => handleNavigationClick(item.href)}
                      >
                        <item.icon className="mr-3 h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">{item.name}</span>
                      </button>
                    ))}
                  </div>

                  {/* AI-Powered Tools */}
                  <div className="px-3 py-2 border-t border-b border-border/30">
                    <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      AI-Powered Tools
                    </div>
                  </div>
                  <div className="py-2">
                    {aiFeatures.map((item) => (
                      <button
                        key={item.name}
                        className="w-full text-left px-3 py-2 executive-hover-subtle cursor-pointer flex items-center"
                        onClick={() => handleNavigationClick(item.href)}
                      >
                        <item.icon className="mr-3 h-4 w-4 text-accent" />
                        <span className="font-medium">{item.name}</span>
                      </button>
                    ))}
                  </div>

                  {/* Revolutionary Features */}
                  <div className="px-3 py-2 border-t border-border/30">
                    <div className="text-xs font-semibold text-purple-600 uppercase tracking-wider flex items-center">
                      Revolutionary Features
                      <div className="w-2 h-2 bg-purple-500 rounded-full ml-2 animate-pulse" />
                    </div>
                  </div>
                  <div className="py-2">
                    {revolutionaryFeatures.map((item) => (
                      <button
                        key={item.name}
                        className="w-full text-left px-3 py-2 executive-hover-subtle cursor-pointer hover:bg-gradient-to-r hover:from-purple-600/10 hover:to-pink-600/10 flex items-center"
                        onClick={() => handleNavigationClick(item.href)}
                      >
                        <item.icon className="mr-3 h-4 w-4 text-purple-600" />
                        <span className="font-medium">{item.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {/* Notifications */}
          <NotificationTrigger />

          {/* Theme Toggle */}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="ghost"
              size="sm"
              className="executive-hover-subtle w-10 h-10 rounded-xl"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            >
              <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </Button>
          </motion.div>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="ghost" className="relative h-10 w-10 rounded-xl executive-hover-subtle">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="executive-gradient text-white text-xs font-semibold">
                      {getInitials(user.email, user.displayName)}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </motion.div>
            </DropdownMenuTrigger>
            <DropdownMenuContent 
              className="w-64 executive-backdrop border executive-border premium-shadow-lg dropdown-enter" 
              align="end" 
              forceMount
            >
              <div className="flex flex-col space-y-2 p-4">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="executive-gradient text-white font-semibold">
                      {getInitials(user.email, user.displayName)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <p className="text-sm font-semibold executive-heading">
                      {user.displayName || user.email.split('@')[0]}
                    </p>
                    <p className="text-xs executive-caption">
                      {user.email}
                    </p>
                  </div>
                </div>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                className="executive-hover-subtle cursor-pointer"
                onClick={() => navigate('/settings')}
              >
                <User className="mr-3 h-4 w-4" />
                <span>Profile Settings</span>
              </DropdownMenuItem>
              <DropdownMenuItem 
                className="executive-hover-subtle cursor-pointer"
                onClick={() => navigate('/settings')}
              >
                <Settings className="mr-3 h-4 w-4" />
                <span>Preferences</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                className="executive-hover-subtle cursor-pointer text-red-600 focus:text-red-600"
                onClick={handleLogout}
              >
                <LogOut className="mr-3 h-4 w-4" />
                <span>Sign Out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}