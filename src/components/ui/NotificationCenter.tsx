import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { 
  Bell, 
  X, 
  CheckCircle, 
  AlertTriangle, 
  Info, 
  Clock,
  Shield,
  FileText,
  Users,
  TrendingUp
} from 'lucide-react'
import { Button } from './button'
import { Badge } from './badge'
import { Card, CardContent, CardHeader, CardTitle } from './card'

interface Notification {
  id: string
  type: 'success' | 'warning' | 'info' | 'audit'
  title: string
  message: string
  timestamp: string
  read: boolean
  icon?: React.ComponentType<{ className?: string }>
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'audit',
    title: 'Audit Engine Update',
    message: 'New ISO 27001:2022 controls have been mapped to your documents',
    timestamp: '2 minutes ago',
    read: false,
    icon: Shield
  },
  {
    id: '2',
    type: 'success',
    title: 'Evidence Collection Complete',
    message: 'All required evidence for A.8.1 has been successfully uploaded',
    timestamp: '15 minutes ago',
    read: false,
    icon: CheckCircle
  },
  {
    id: '3',
    type: 'warning',
    title: 'Risk Assessment Due',
    message: 'Third-party vendor risk assessment expires in 3 days',
    timestamp: '1 hour ago',
    read: true,
    icon: AlertTriangle
  },
  {
    id: '4',
    type: 'info',
    title: 'Compliance Timeline Updated',
    message: 'Your ISO 27001 implementation timeline has been optimized',
    timestamp: '2 hours ago',
    read: true,
    icon: Clock
  },
  {
    id: '5',
    type: 'audit',
    title: 'AI Copilot Insight',
    message: 'Detected potential compliance gaps in access control policies',
    timestamp: '4 hours ago',
    read: true,
    icon: Info
  }
]

interface NotificationCenterProps {
  isOpen: boolean
  onClose: () => void
}

export function NotificationCenter({ isOpen, onClose }: NotificationCenterProps) {
  const [notifications, setNotifications] = useState(mockNotifications)
  
  const unreadCount = notifications.filter(n => !n.read).length

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    )
  }

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })))
  }

  const getNotificationIcon = (notification: Notification) => {
    if (notification.icon) {
      return notification.icon
    }
    
    switch (notification.type) {
      case 'success':
        return CheckCircle
      case 'warning':
        return AlertTriangle
      case 'info':
        return Info
      case 'audit':
        return Shield
      default:
        return Bell
    }
  }

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'success':
        return 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950'
      case 'warning':
        return 'text-amber-600 bg-amber-50 dark:bg-amber-950'
      case 'info':
        return 'text-blue-600 bg-blue-50 dark:bg-blue-950'
      case 'audit':
        return 'text-purple-600 bg-purple-50 dark:bg-purple-950'
      default:
        return 'text-gray-600 bg-gray-50 dark:bg-gray-950'
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 z-40"
            onClick={onClose}
          />
          
          {/* Notification Panel */}
          <motion.div
            initial={{ opacity: 0, x: 300, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 300, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed top-16 right-4 w-96 max-h-[80vh] z-50"
          >
            <Card className="executive-backdrop border executive-border premium-shadow-xl overflow-hidden">
              <CardHeader className="border-b executive-border">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center">
                      <Bell className="w-4 h-4 text-accent" />
                    </div>
                    <CardTitle className="text-lg executive-heading">
                      Notifications
                    </CardTitle>
                    {unreadCount > 0 && (
                      <Badge variant="secondary" className="bg-accent text-accent-foreground">
                        {unreadCount}
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    {unreadCount > 0 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={markAllAsRead}
                        className="text-xs executive-hover-subtle"
                      >
                        Mark all read
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={onClose}
                      className="executive-hover-subtle w-8 h-8 p-0"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="p-0 max-h-96 overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="p-8 text-center">
                    <Bell className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
                    <p className="text-sm text-muted-foreground">No notifications</p>
                  </div>
                ) : (
                  <div className="divide-y executive-border">
                    {notifications.map((notification, index) => {
                      const IconComponent = getNotificationIcon(notification)
                      const colorClass = getNotificationColor(notification.type)
                      
                      return (
                        <motion.div
                          key={notification.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className={`p-4 cursor-pointer transition-colors ${
                            !notification.read 
                              ? 'bg-accent/5 hover:bg-accent/10' 
                              : 'hover:bg-muted/50'
                          }`}
                          onClick={() => markAsRead(notification.id)}
                        >
                          <div className="flex items-start space-x-3">
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${colorClass}`}>
                              <IconComponent className="w-4 h-4" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between mb-1">
                                <h4 className={`text-sm font-medium executive-heading truncate ${
                                  !notification.read ? 'text-foreground' : 'text-muted-foreground'
                                }`}>
                                  {notification.title}
                                </h4>
                                {!notification.read && (
                                  <div className="w-2 h-2 bg-accent rounded-full flex-shrink-0 ml-2" />
                                )}
                              </div>
                              <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
                                {notification.message}
                              </p>
                              <div className="flex items-center text-xs text-muted-foreground">
                                <Clock className="w-3 h-3 mr-1" />
                                {notification.timestamp}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )
                    })}
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export function NotificationTrigger() {
  const [isOpen, setIsOpen] = useState(false)
  const unreadCount = mockNotifications.filter(n => !n.read).length

  return (
    <>
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button 
          variant="ghost" 
          size="sm" 
          className="relative executive-hover-subtle w-10 h-10 rounded-xl"
          onClick={() => setIsOpen(!isOpen)}
        >
          <Bell className="h-4 w-4" />
          {unreadCount > 0 && (
            <motion.span 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-1 -right-1 w-5 h-5 bg-accent rounded-full text-[10px] text-accent-foreground flex items-center justify-center font-medium premium-shadow"
            >
              {unreadCount > 9 ? '9+' : unreadCount}
            </motion.span>
          )}
        </Button>
      </motion.div>
      
      <NotificationCenter isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  )
}