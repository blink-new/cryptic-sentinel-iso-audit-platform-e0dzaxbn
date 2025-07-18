import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  FileText, 
  Upload, 
  Tag, 
  Search, 
  Filter,
  Download,
  Eye,
  Trash2,
  Plus,
  X,
  File,
  Image,
  FileSpreadsheet,
  FileCode,
  Loader2,
  CheckCircle,
  AlertCircle
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Badge } from '../components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog'
import { Label } from '../components/ui/label'
import { Textarea } from '../components/ui/textarea'
import { ScrollArea } from '../components/ui/scroll-area'
import { toast } from 'sonner'
import blink from '../blink/client'

interface EvidenceItem {
  id: string
  user_id: string
  title: string
  description?: string
  file_url?: string
  file_name?: string
  file_type?: string
  file_size?: number
  control_id?: string
  tags?: string
  upload_date: string
  created_at: string
  updated_at: string
}

const controlOptions = [
  'A.5.1 - Information security policies',
  'A.5.2 - Information security roles and responsibilities',
  'A.6.1 - Internal organization',
  'A.6.2 - Mobile devices and teleworking',
  'A.7.1 - Prior to employment',
  'A.7.2 - During employment',
  'A.7.3 - Termination and change of employment',
  'A.8.1 - Responsibility for assets',
  'A.8.2 - Information classification',
  'A.8.3 - Media handling',
  'A.9.1 - Business requirements of access control',
  'A.9.2 - User access management',
  'A.9.3 - User responsibilities',
  'A.9.4 - System and application access control',
  'A.10.1 - Cryptographic controls',
  'A.11.1 - Secure areas',
  'A.11.2 - Equipment',
  'A.12.1 - Operational procedures and responsibilities',
  'A.12.2 - Protection from malware',
  'A.12.3 - Backup',
  'A.12.4 - Logging and monitoring',
  'A.12.5 - Control of operational software',
  'A.12.6 - Technical vulnerability management',
  'A.12.7 - Information systems audit considerations',
  'A.13.1 - Network security management',
  'A.13.2 - Information transfer',
  'A.14.1 - Security requirements of information systems',
  'A.14.2 - Security in development and support processes',
  'A.14.3 - Test data',
  'A.15.1 - Information security in supplier relationships',
  'A.15.2 - Supplier service delivery management',
  'A.16.1 - Management of information security incidents',
  'A.17.1 - Information security continuity',
  'A.17.2 - Redundancies',
  'A.18.1 - Compliance with legal and contractual requirements',
  'A.18.2 - Information security reviews'
]

const commonTags = [
  'Policy', 'Procedure', 'Risk Assessment', 'Training', 'Audit', 'Incident Response',
  'Access Control', 'Backup', 'Encryption', 'Network Security', 'Physical Security',
  'Vendor Management', 'Business Continuity', 'Compliance', 'Documentation'
]

export function EvidenceCollection() {
  const [evidenceItems, setEvidenceItems] = useState<EvidenceItem[]>([])
  const [filteredItems, setFilteredItems] = useState<EvidenceItem[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [controlFilter, setControlFilter] = useState('all')
  const [tagFilter, setTagFilter] = useState('all')
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [uploadDialog, setUploadDialog] = useState(false)
  const [newEvidence, setNewEvidence] = useState({
    title: '',
    description: '',
    control_id: '',
    tags: [] as string[]
  })
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    loadEvidenceItems()
  }, [])

  useEffect(() => {
    filterItems()
  }, [evidenceItems, searchTerm, controlFilter, tagFilter, filterItems])

  const loadEvidenceItems = async () => {
    try {
      const user = await blink.auth.me()
      const items = await blink.db.evidenceItems.list({
        where: { userId: user.id },
        orderBy: { createdAt: 'desc' }
      })
      setEvidenceItems(items)
    } catch (error) {
      console.error('Error loading evidence items:', error)
      toast.error('Failed to load evidence items')
    } finally {
      setLoading(false)
    }
  }

  const filterItems = useCallback(() => {
    let filtered = evidenceItems

    if (searchTerm) {
      filtered = filtered.filter(item => 
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.description && item.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (item.file_name && item.file_name.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    }

    if (controlFilter !== 'all') {
      filtered = filtered.filter(item => item.control_id === controlFilter)
    }

    if (tagFilter !== 'all') {
      filtered = filtered.filter(item => {
        if (!item.tags) return false
        try {
          const tags = JSON.parse(item.tags)
          return tags.includes(tagFilter)
        } catch {
          return false
        }
      })
    }

    setFilteredItems(filtered)
  }, [evidenceItems, searchTerm, controlFilter, tagFilter])

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      if (!newEvidence.title) {
        setNewEvidence(prev => ({ ...prev, title: file.name.split('.')[0] }))
      }
    }
  }

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault()
  }

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault()
    const file = event.dataTransfer.files[0]
    if (file) {
      setSelectedFile(file)
      if (!newEvidence.title) {
        setNewEvidence(prev => ({ ...prev, title: file.name.split('.')[0] }))
      }
    }
  }

  const uploadEvidence = async () => {
    if (!selectedFile || !newEvidence.title) {
      toast.error('Please select a file and provide a title')
      return
    }

    setUploading(true)
    try {
      const user = await blink.auth.me()
      
      // Upload file to storage
      const { publicUrl } = await blink.storage.upload(
        selectedFile,
        `evidence/${user.id}/${Date.now()}_${selectedFile.name}`,
        { upsert: true }
      )

      // Create evidence record
      const evidenceItem = await blink.db.evidenceItems.create({
        id: `evidence_${Date.now()}`,
        userId: user.id,
        title: newEvidence.title,
        description: newEvidence.description,
        fileUrl: publicUrl,
        fileName: selectedFile.name,
        fileType: selectedFile.type,
        fileSize: selectedFile.size,
        controlId: newEvidence.control_id || null,
        tags: JSON.stringify(newEvidence.tags),
        uploadDate: new Date().toISOString()
      })

      setEvidenceItems(prev => [evidenceItem, ...prev])
      toast.success('Evidence uploaded successfully!')
      
      // Reset form
      setNewEvidence({ title: '', description: '', control_id: '', tags: [] })
      setSelectedFile(null)
      setUploadDialog(false)
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    } catch (error) {
      console.error('Error uploading evidence:', error)
      toast.error('Failed to upload evidence')
    } finally {
      setUploading(false)
    }
  }

  const deleteEvidence = async (id: string) => {
    try {
      await blink.db.evidenceItems.delete(id)
      setEvidenceItems(prev => prev.filter(item => item.id !== id))
      toast.success('Evidence deleted successfully')
    } catch (error) {
      console.error('Error deleting evidence:', error)
      toast.error('Failed to delete evidence')
    }
  }

  const getFileIcon = (fileType?: string) => {
    if (!fileType) return File
    
    if (fileType.startsWith('image/')) return Image
    if (fileType.includes('spreadsheet') || fileType.includes('excel')) return FileSpreadsheet
    if (fileType.includes('pdf')) return FileText
    if (fileType.includes('code') || fileType.includes('json')) return FileCode
    return File
  }

  const formatFileSize = (bytes?: number) => {
    if (!bytes) return 'Unknown size'
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(1024))
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i]
  }

  const addTag = (tag: string) => {
    if (!newEvidence.tags.includes(tag)) {
      setNewEvidence(prev => ({ ...prev, tags: [...prev.tags, tag] }))
    }
  }

  const removeTag = (tag: string) => {
    setNewEvidence(prev => ({ ...prev, tags: prev.tags.filter(t => t !== tag) }))
  }

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-6 space-y-8">
        <div className="animate-pulse space-y-8">
          <div className="h-8 bg-secondary rounded w-1/3"></div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-32 bg-secondary rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
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
          <h1 className="text-3xl font-bold tracking-tight">Evidence Collection</h1>
          <p className="text-muted-foreground">
            Upload, tag & store evidence per control with intelligent organization
          </p>
        </div>
        
        <Dialog open={uploadDialog} onOpenChange={setUploadDialog}>
          <DialogTrigger asChild>
            <Button className="cyber-glow hover:scale-105 transition-transform">
              <Upload className="w-4 h-4 mr-2" />
              Upload Evidence
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Upload Evidence</DialogTitle>
              <DialogDescription>
                Upload a document or file as evidence for ISO 27001 controls
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-6">
              {/* File Upload Area */}
              <div
                className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors cyber-border"
                onDragOver={handleDragOver}
                onDrop={handleDrop}
              >
                {selectedFile ? (
                  <div className="space-y-3">
                    <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mx-auto">
                      {(() => {
                        const IconComponent = getFileIcon(selectedFile.type)
                        return <IconComponent className="w-8 h-8 text-primary" />
                      })()}
                    </div>
                    <div>
                      <p className="font-medium">{selectedFile.name}</p>
                      <p className="text-sm text-muted-foreground">{formatFileSize(selectedFile.size)}</p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedFile(null)}
                    >
                      <X className="w-4 h-4 mr-2" />
                      Remove
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="w-16 h-16 bg-secondary rounded-lg flex items-center justify-center mx-auto">
                      <Upload className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-lg font-medium">Drop files here or click to browse</p>
                      <p className="text-sm text-muted-foreground">
                        Supports PDF, DOCX, images, and other document formats
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      Select File
                    </Button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      className="hidden"
                      onChange={handleFileSelect}
                      accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png,.gif,.xlsx,.xls,.ppt,.pptx"
                    />
                  </div>
                )}
              </div>

              {/* Evidence Details */}
              <div className="grid gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    value={newEvidence.title}
                    onChange={(e) => setNewEvidence(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Enter evidence title"
                    className="cyber-border"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={newEvidence.description}
                    onChange={(e) => setNewEvidence(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Describe this evidence and its relevance"
                    className="cyber-border"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="control">ISO 27001 Control</Label>
                  <Select
                    value={newEvidence.control_id}
                    onValueChange={(value) => setNewEvidence(prev => ({ ...prev, control_id: value }))}
                  >
                    <SelectTrigger className="cyber-border">
                      <SelectValue placeholder="Select a control" />
                    </SelectTrigger>
                    <SelectContent>
                      {controlOptions.map(control => (
                        <SelectItem key={control} value={control}>
                          {control}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Tags</Label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {newEvidence.tags.map(tag => (
                      <Badge key={tag} variant="secondary" className="cursor-pointer" onClick={() => removeTag(tag)}>
                        {tag}
                        <X className="w-3 h-3 ml-1" />
                      </Badge>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {commonTags.filter(tag => !newEvidence.tags.includes(tag)).map(tag => (
                      <Button
                        key={tag}
                        variant="outline"
                        size="sm"
                        onClick={() => addTag(tag)}
                        className="h-7 text-xs"
                      >
                        <Plus className="w-3 h-3 mr-1" />
                        {tag}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-3">
                <Button variant="outline" onClick={() => setUploadDialog(false)}>
                  Cancel
                </Button>
                <Button onClick={uploadEvidence} disabled={uploading || !selectedFile || !newEvidence.title}>
                  {uploading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Uploading...
                    </>
                  ) : (
                    <>
                      <Upload className="w-4 h-4 mr-2" />
                      Upload Evidence
                    </>
                  )}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="cyber-border hover:cyber-glow transition-all duration-300">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Evidence</p>
                <p className="text-3xl font-bold">{evidenceItems.length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="cyber-border hover:cyber-glow transition-all duration-300">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Controls Covered</p>
                <p className="text-3xl font-bold">
                  {new Set(evidenceItems.filter(item => item.control_id).map(item => item.control_id)).size}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="cyber-border hover:cyber-glow transition-all duration-300">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Recent Uploads</p>
                <p className="text-3xl font-bold">
                  {evidenceItems.filter(item => 
                    new Date(item.upload_date) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
                  ).length}
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <Upload className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="cyber-border hover:cyber-glow transition-all duration-300">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Storage Used</p>
                <p className="text-3xl font-bold">
                  {formatFileSize(evidenceItems.reduce((total, item) => total + (item.file_size || 0), 0))}
                </p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                <Tag className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="cyber-border">
        <CardHeader>
          <CardTitle className="text-lg">Filter Evidence</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Search</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search evidence..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 cyber-border"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label>Control</Label>
              <Select value={controlFilter} onValueChange={setControlFilter}>
                <SelectTrigger className="cyber-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Controls</SelectItem>
                  {controlOptions.map(control => (
                    <SelectItem key={control} value={control}>
                      {control}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label>Tag</Label>
              <Select value={tagFilter} onValueChange={setTagFilter}>
                <SelectTrigger className="cyber-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Tags</SelectItem>
                  {commonTags.map(tag => (
                    <SelectItem key={tag} value={tag}>
                      {tag}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Evidence Grid */}
      <Card className="cyber-border">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Evidence Items ({filteredItems.length})</CardTitle>
          <Button variant="outline" size="sm" className="cyber-border">
            <Download className="w-4 h-4 mr-2" />
            Export All
          </Button>
        </CardHeader>
        <CardContent>
          {filteredItems.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-muted-foreground">No evidence found</h3>
              <p className="text-muted-foreground mb-4">
                {evidenceItems.length === 0 
                  ? "Upload your first evidence document to get started"
                  : "Try adjusting your filters or search terms"
                }
              </p>
              <Button onClick={() => setUploadDialog(true)} className="cyber-glow">
                <Upload className="w-4 h-4 mr-2" />
                Upload Evidence
              </Button>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <AnimatePresence>
                {filteredItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="cyber-border hover:cyber-glow transition-all duration-300 group">
                      <CardContent className="p-4">
                        <div className="space-y-3">
                          <div className="flex items-start justify-between">
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                                {(() => {
                                  const IconComponent = getFileIcon(item.file_type)
                                  return <IconComponent className="w-5 h-5 text-primary" />
                                })()}
                              </div>
                              <div className="flex-1 min-w-0">
                                <h3 className="font-medium truncate">{item.title}</h3>
                                <p className="text-sm text-muted-foreground truncate">
                                  {item.file_name}
                                </p>
                              </div>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => deleteEvidence(item.id)}
                              className="opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <Trash2 className="w-4 h-4 text-red-500" />
                            </Button>
                          </div>

                          {item.description && (
                            <p className="text-sm text-muted-foreground line-clamp-2">
                              {item.description}
                            </p>
                          )}

                          {item.control_id && (
                            <Badge variant="outline" className="text-xs">
                              {item.control_id.split(' - ')[0]}
                            </Badge>
                          )}

                          {item.tags && (
                            <div className="flex flex-wrap gap-1">
                              {JSON.parse(item.tags).slice(0, 3).map((tag: string) => (
                                <Badge key={tag} variant="secondary" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                              {JSON.parse(item.tags).length > 3 && (
                                <Badge variant="secondary" className="text-xs">
                                  +{JSON.parse(item.tags).length - 3}
                                </Badge>
                              )}
                            </div>
                          )}

                          <div className="flex items-center justify-between text-xs text-muted-foreground">
                            <span>{new Date(item.upload_date).toLocaleDateString()}</span>
                            <span>{formatFileSize(item.file_size)}</span>
                          </div>

                          <div className="flex space-x-2">
                            {item.file_url && (
                              <Button
                                variant="outline"
                                size="sm"
                                asChild
                                className="flex-1 hover:scale-105 transition-transform"
                              >
                                <a href={item.file_url} target="_blank" rel="noopener noreferrer">
                                  <Eye className="w-4 h-4 mr-2" />
                                  View
                                </a>
                              </Button>
                            )}
                            {item.file_url && (
                              <Button
                                variant="outline"
                                size="sm"
                                asChild
                                className="flex-1 hover:scale-105 transition-transform"
                              >
                                <a href={item.file_url} download={item.file_name}>
                                  <Download className="w-4 h-4 mr-2" />
                                  Download
                                </a>
                              </Button>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}