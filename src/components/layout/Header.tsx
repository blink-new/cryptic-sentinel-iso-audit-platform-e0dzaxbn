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
  User
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
          
          {/* Executive Brand Logo - Simple Click to Home */}
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