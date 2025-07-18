import { motion } from 'framer-motion'
import { Shield, Loader2 } from 'lucide-react'

export function LoadingScreen() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center space-y-6"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="mx-auto w-16 h-16 text-primary"
        >
          <Shield className="w-full h-full" />
        </motion.div>
        
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-primary">Cryptic Sentinel</h1>
          <p className="text-muted-foreground">Initializing secure audit platform...</p>
        </div>
        
        <div className="flex items-center justify-center space-x-2 text-muted-foreground">
          <Loader2 className="w-4 h-4 animate-spin" />
          <span className="text-sm">Loading</span>
        </div>
      </motion.div>
    </div>
  )
}