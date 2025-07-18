import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { ThemeProvider } from 'next-themes'
import { motion, AnimatePresence } from 'framer-motion'
import { Toaster } from 'sonner'
import blink from './blink/client'

// Components
import { Sidebar } from './components/layout/Sidebar'
import { Header } from './components/layout/Header'
import { LoadingScreen } from './components/ui/LoadingScreen'

// Pages
import { Home } from './pages/Home'
import { Dashboard } from './pages/Dashboard'
import { AuditEngine } from './pages/AuditEngine'
import { EvidenceCollection } from './pages/EvidenceCollection'
import { RiskRegister } from './pages/RiskRegister'
import { ThirdPartyRisk } from './pages/ThirdPartyRisk'
import { Reports } from './pages/Reports'
import { Settings } from './pages/Settings'
import { AICopilot } from './pages/AICopilot'
import { ComplianceTimeline } from './pages/ComplianceTimeline'
import { AuditPackGenerator } from './pages/AuditPackGenerator'
import { AuditSimulation } from './pages/AuditSimulation'

import { QuantumRiskPredictor } from './pages/QuantumRiskPredictor'
import { NeuralComplianceOrchestrator } from './pages/NeuralComplianceOrchestrator'
import { ComplianceTimeTravel } from './pages/ComplianceTimeTravel'
import { RevolutionaryShowcase } from './pages/RevolutionaryShowcase'

interface User {
  id: string
  email: string
  displayName?: string
}

function App() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    const unsubscribe = blink.auth.onAuthStateChanged((state) => {
      setUser(state.user)
      setLoading(state.isLoading)
    })
    return unsubscribe
  }, [])

  // Global ResizeObserver error suppression
  useEffect(() => {
    const handleResizeObserverError = (e: ErrorEvent) => {
      if (e.message === 'ResizeObserver loop completed with undelivered notifications.') {
        e.stopImmediatePropagation()
        return false
      }
    }
    
    window.addEventListener('error', handleResizeObserverError)
    return () => window.removeEventListener('error', handleResizeObserverError)
  }, [])

  if (loading) {
    return <LoadingScreen />
  }

  // For demo purposes, create a mock user if none exists
  const currentUser = user || {
    id: 'demo-user',
    email: 'demo@crypticsentinel.com',
    displayName: 'Demo User'
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <Router>
        <div className="min-h-screen bg-background">
          <Sidebar open={sidebarOpen} onOpenChange={setSidebarOpen} />
          
          <div className="lg:pl-72">
            <Header onMenuClick={() => setSidebarOpen(true)} user={currentUser} />
            
            <main className="py-6">
              <AnimatePresence mode="wait">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/audit-engine" element={<AuditEngine />} />
                  <Route path="/evidence" element={<EvidenceCollection />} />
                  <Route path="/risk-register" element={<RiskRegister />} />
                  <Route path="/third-party-risk" element={<ThirdPartyRisk />} />
                  <Route path="/reports" element={<Reports />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="/ai-copilot" element={<AICopilot />} />

                  <Route path="/compliance-timeline" element={<ComplianceTimeline />} />
                  <Route path="/audit-pack-generator" element={<AuditPackGenerator />} />
                  <Route path="/audit-simulation" element={<AuditSimulation />} />
                  <Route path="/quantum-risk-predictor" element={<QuantumRiskPredictor />} />
                  <Route path="/neural-compliance" element={<NeuralComplianceOrchestrator />} />
                  <Route path="/compliance-time-travel" element={<ComplianceTimeTravel />} />
                  <Route path="/revolutionary-showcase" element={<RevolutionaryShowcase />} />
                </Routes>
              </AnimatePresence>
            </main>
          </div>
          
          <Toaster position="top-right" richColors />
        </div>
      </Router>
    </ThemeProvider>
  )
}

export default App