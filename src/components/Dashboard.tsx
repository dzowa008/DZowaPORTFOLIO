import React, { useState, useRef, useEffect } from 'react';
import SettingsModal from './SettingsModal';
import { 
  Plus, 
  Search, 
  Mic, 
  Upload, 
  FileText, 
  Video, 
  Music, 
  Image, 
  MessageSquare, 
  Bot, 
  Sparkles, 
  Filter, 
  Grid, 
  List, 
  Star, 
  Clock, 
  Tag, 
  Folder, 
  Settings, 
  User, 
  Bell, 
  Menu, 
  X, 
  Play, 
  Pause, 
  Square, 
  Download, 
  Share2, 
  Edit3, 
  Trash2, 
  MoreHorizontal,
  ChevronDown,
  Zap,
  Brain,
  Wand2,
  BookOpen,
  Headphones,
  Camera,
  PenTool,
  Archive,
  TrendingUp,
  Calendar,
  Hash
} from 'lucide-react';

interface Note {
  id: string;
  title: string;
  content: string;
  type: 'text' | 'audio' | 'video' | 'image' | 'document';
  tags: string[];
  category: string;
  createdAt: Date;
  updatedAt: Date;
  summary?: string;
  transcription?: string;
  isStarred: boolean;
}

interface ChatMessage {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

function Dashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [chatInput, setChatInput] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isCreatingNote, setIsCreatingNote] = useState(false);
  const [newNoteTitle, setNewNoteTitle] = useState('');
  const [newNoteContent, setNewNoteContent] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const recordingIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Sample data
  useEffect(() => {
    const sampleNotes: Note[] = [
      {
        id: '1',
        title: 'Meeting Notes - Q4 Planning',
        content: 'Discussed quarterly goals, budget allocation, and team expansion plans...',
        type: 'text',
        tags: ['meeting', 'planning', 'Q4'],
        category: 'Work',
        createdAt: new Date('2024-01-15'),
        updatedAt: new Date('2024-01-15'),
        summary: 'Q4 planning meeting covering goals, budget, and team expansion.',
        isStarred: true
      },
      {
        id: '2',
        title: 'Research Interview Audio',
        content: 'Audio recording of user interview session...',
        type: 'audio',
        tags: ['research', 'interview', 'user-feedback'],
        category: 'Research',
        createdAt: new Date('2024-01-14'),
        updatedAt: new Date('2024-01-14'),
        transcription: 'User expressed satisfaction with current features but requested better search functionality...',
        summary: 'User interview revealing satisfaction with features and need for improved search.',
        isStarred: false
      },
      {
        id: '3',
        title: 'Product Demo Video',
        content: 'Screen recording of product demonstration...',
        type: 'video',
        tags: ['demo', 'product', 'presentation'],
        category: 'Marketing',
        createdAt: new Date('2024-01-13'),
        updatedAt: new Date('2024-01-13'),
        summary: 'Product demo showcasing key features and user workflows.',
        isStarred: false
      }
    ];
    setNotes(sampleNotes);
  }, []);

  // Recording functionality
  const startRecording = () => {
    setIsRecording(true);
    setRecordingTime(0);
    recordingIntervalRef.current = setInterval(() => {
      setRecordingTime(prev => prev + 1);
    }, 1000);
  };

  const stopRecording = () => {
    setIsRecording(false);
    if (recordingIntervalRef.current) {
      clearInterval(recordingIntervalRef.current);
    }
    // Simulate creating a new audio note
    const newNote: Note = {
      id: Date.now().toString(),
      title: `Audio Recording ${new Date().toLocaleDateString()}`,
      content: 'Audio recording captured',
      type: 'audio',
      tags: ['audio', 'recording'],
      category: 'Personal',
      createdAt: new Date(),
      updatedAt: new Date(),
      isStarred: false
    };
    setNotes(prev => [newNote, ...prev]);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // File upload handler
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      Array.from(files).forEach(file => {
        setIsProcessing(true);
        // Simulate processing
        setTimeout(() => {
          const fileType = file.type.startsWith('audio/') ? 'audio' : 
                          file.type.startsWith('video/') ? 'video' : 
                          file.type.startsWith('image/') ? 'image' : 'document';
          
          const newNote: Note = {
            id: Date.now().toString(),
            title: file.name,
            content: `Uploaded ${fileType} file`,
            type: fileType as Note['type'],
            tags: [fileType, 'uploaded'],
            category: 'Uploads',
            createdAt: new Date(),
            updatedAt: new Date(),
            summary: `AI-generated summary for ${file.name}`,
            isStarred: false
          };
          setNotes(prev => [newNote, ...prev]);
          setIsProcessing(false);
        }, 2000);
      });
    }
  };

  // Chat functionality
  const sendChatMessage = () => {
    if (!chatInput.trim()) return;
    
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: chatInput,
      timestamp: new Date()
    };
    
    setChatMessages(prev => [...prev, userMessage]);
    setChatInput('');
    
    // Simulate AI response
    setTimeout(() => {
      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: `Based on your notes, I can help you with that. Here's what I found relevant to "${chatInput}"...`,
        timestamp: new Date()
      };
      setChatMessages(prev => [...prev, aiMessage]);
    }, 1000);
  };

  // Create new note
  const createNewNote = () => {
    if (!newNoteTitle.trim()) return;
    
    const newNote: Note = {
      id: Date.now().toString(),
      title: newNoteTitle,
      content: newNoteContent,
      type: 'text',
      tags: [],
      category: 'Personal',
      createdAt: new Date(),
      updatedAt: new Date(),
      isStarred: false
    };
    
    setNotes(prev => [newNote, ...prev]);
    setNewNoteTitle('');
    setNewNoteContent('');
    setIsCreatingNote(false);
  };

  // Filter notes
  const filteredNotes = notes.filter(note => {
    const matchesSearch = note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         note.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         note.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || note.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ['all', ...Array.from(new Set(notes.map(note => note.category)))];

  const stats = {
    totalNotes: notes.length,
    audioNotes: notes.filter(n => n.type === 'audio').length,
    videoNotes: notes.filter(n => n.type === 'video').length,
    starredNotes: notes.filter(n => n.isStarred).length
  };

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Notes</p>
              <p className="text-2xl font-bold text-white">{stats.totalNotes}</p>
            </div>
            <FileText className="w-8 h-8 text-purple-400" />
          </div>
        </div>
        <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Audio Notes</p>
              <p className="text-2xl font-bold text-white">{stats.audioNotes}</p>
            </div>
            <Headphones className="w-8 h-8 text-blue-400" />
          </div>
        </div>
        <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Video Notes</p>
              <p className="text-2xl font-bold text-white">{stats.videoNotes}</p>
            </div>
            <Camera className="w-8 h-8 text-green-400" />
          </div>
        </div>
        <div className="bg-gradient-to-br from-orange-500/10 to-red-500/10 border border-orange-500/20 rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Starred</p>
              <p className="text-2xl font-bold text-white">{stats.starredNotes}</p>
            </div>
            <Star className="w-8 h-8 text-orange-400" />
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-2xl p-6">
        <h3 className="text-xl font-semibold text-white mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button
            onClick={() => setIsCreatingNote(true)}
            className="flex flex-col items-center p-4 bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/30 rounded-xl transition-all duration-200 hover:scale-105"
          >
            <PenTool className="w-8 h-8 text-purple-400 mb-2" />
            <span className="text-sm text-gray-300">New Note</span>
          </button>
          <button
            onClick={startRecording}
            disabled={isRecording}
            className="flex flex-col items-center p-4 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 rounded-xl transition-all duration-200 hover:scale-105 disabled:opacity-50"
          >
            <Mic className="w-8 h-8 text-red-400 mb-2" />
            <span className="text-sm text-gray-300">Record Audio</span>
          </button>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex flex-col items-center p-4 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30 rounded-xl transition-all duration-200 hover:scale-105"
          >
            <Upload className="w-8 h-8 text-blue-400 mb-2" />
            <span className="text-sm text-gray-300">Upload File</span>
          </button>
          <button
            onClick={() => setActiveTab('chat')}
            className="flex flex-col items-center p-4 bg-green-500/10 hover:bg-green-500/20 border border-green-500/30 rounded-xl transition-all duration-200 hover:scale-105"
          >
            <MessageSquare className="w-8 h-8 text-green-400 mb-2" />
            <span className="text-sm text-gray-300">Chat with AI</span>
          </button>
        </div>
      </div>

      {/* Recent Notes */}
      <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-white">Recent Notes</h3>
          <button
            onClick={() => setActiveTab('notes')}
            className="text-purple-400 hover:text-purple-300 text-sm font-medium"
          >
            View All
          </button>
        </div>
        <div className="space-y-3">
          {notes.slice(0, 5).map(note => (
            <div key={note.id} className="flex items-center space-x-3 p-3 bg-gray-800/30 rounded-lg hover:bg-gray-800/50 transition-colors cursor-pointer">
              <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                {note.type === 'audio' && <Headphones className="w-5 h-5 text-purple-400" />}
                {note.type === 'video' && <Camera className="w-5 h-5 text-purple-400" />}
                {note.type === 'text' && <FileText className="w-5 h-5 text-purple-400" />}
                {note.type === 'document' && <BookOpen className="w-5 h-5 text-purple-400" />}
              </div>
              <div className="flex-1">
                <h4 className="text-white font-medium">{note.title}</h4>
                <p className="text-gray-400 text-sm">{note.createdAt.toLocaleDateString()}</p>
              </div>
              {note.isStarred && <Star className="w-4 h-4 text-yellow-400 fill-current" />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderNotes = () => (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search notes, tags, or content..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
          />
        </div>
        <div className="flex gap-2">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-purple-500"
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category === 'all' ? 'All Categories' : category}
              </option>
            ))}
          </select>
          <button
            onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
            className="px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-gray-300 hover:text-white transition-colors"
          >
            {viewMode === 'grid' ? <List className="w-5 h-5" /> : <Grid className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Notes Grid/List */}
      <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
        {filteredNotes.map(note => (
          <div
            key={note.id}
            className={`bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-2xl p-6 hover:border-purple-500/50 transition-all duration-300 cursor-pointer group ${
              viewMode === 'list' ? 'flex items-center space-x-4' : ''
            }`}
            onClick={() => setSelectedNote(note)}
          >
            <div className={`w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center ${viewMode === 'list' ? 'flex-shrink-0' : 'mb-4'}`}>
              {note.type === 'audio' && <Headphones className="w-6 h-6 text-purple-400" />}
              {note.type === 'video' && <Camera className="w-6 h-6 text-purple-400" />}
              {note.type === 'text' && <FileText className="w-6 h-6 text-purple-400" />}
              {note.type === 'document' && <BookOpen className="w-6 h-6 text-purple-400" />}
              {note.type === 'image' && <Image className="w-6 h-6 text-purple-400" />}
            </div>
            <div className="flex-1">
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-lg font-semibold text-white group-hover:text-purple-300 transition-colors">
                  {note.title}
                </h3>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setNotes(prev => prev.map(n => n.id === note.id ? {...n, isStarred: !n.isStarred} : n));
                  }}
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Star className={`w-5 h-5 ${note.isStarred ? 'text-yellow-400 fill-current' : 'text-gray-400'}`} />
                </button>
              </div>
              <p className="text-gray-400 text-sm mb-3 line-clamp-2">{note.summary || note.content}</p>
              <div className="flex items-center justify-between">
                <div className="flex flex-wrap gap-1">
                  {note.tags.slice(0, 3).map(tag => (
                    <span key={tag} className="px-2 py-1 bg-purple-500/20 text-purple-300 text-xs rounded-full">
                      #{tag}
                    </span>
                  ))}
                </div>
                <span className="text-gray-500 text-xs">{note.createdAt.toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderChat = () => (
    <div className="h-full flex flex-col">
      <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-2xl flex-1 flex flex-col">
        <div className="p-6 border-b border-gray-800">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">AI Assistant</h3>
              <p className="text-gray-400 text-sm">Ask questions about your notes</p>
            </div>
          </div>
        </div>
        
        <div className="flex-1 p-6 overflow-y-auto space-y-4">
          {chatMessages.length === 0 ? (
            <div className="text-center py-12">
              <Bot className="w-16 h-16 text-purple-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Start a conversation</h3>
              <p className="text-gray-400">Ask me anything about your notes, or request summaries and insights.</p>
            </div>
          ) : (
            chatMessages.map(message => (
              <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                  message.type === 'user' 
                    ? 'bg-purple-500 text-white' 
                    : 'bg-gray-800 text-gray-300'
                }`}>
                  <p>{message.content}</p>
                  <p className="text-xs opacity-70 mt-1">
                    {message.timestamp.toLocaleTimeString()}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
        
        <div className="p-6 border-t border-gray-800">
          <div className="flex space-x-3">
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendChatMessage()}
              placeholder="Ask about your notes..."
              className="flex-1 px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
            />
            <button
              onClick={sendChatMessage}
              className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-200"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAudioRecorder = () => (
    <div className="space-y-6">
      <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-2xl p-8 text-center">
        <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-red-500/20 to-pink-500/20 rounded-full flex items-center justify-center">
          <Mic className={`w-16 h-16 ${isRecording ? 'text-red-400 animate-pulse' : 'text-gray-400'}`} />
        </div>
        
        <h3 className="text-2xl font-bold text-white mb-2">Audio Recorder</h3>
        <p className="text-gray-400 mb-6">Record audio notes and get AI-powered transcription and summaries</p>
        
        {isRecording && (
          <div className="mb-6">
            <div className="text-3xl font-mono text-red-400 mb-2">{formatTime(recordingTime)}</div>
            <div className="w-full bg-gray-800 rounded-full h-2">
              <div className="bg-red-500 h-2 rounded-full animate-pulse" style={{width: '100%'}}></div>
            </div>
          </div>
        )}
        
        <div className="flex justify-center space-x-4">
          {!isRecording ? (
            <button
              onClick={startRecording}
              className="flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-full font-semibold hover:from-red-600 hover:to-pink-600 transition-all duration-200 transform hover:scale-105"
            >
              <Mic className="w-5 h-5" />
              <span>Start Recording</span>
            </button>
          ) : (
            <button
              onClick={stopRecording}
              className="flex items-center space-x-2 px-8 py-4 bg-gray-600 hover:bg-gray-700 text-white rounded-full font-semibold transition-all duration-200"
            >
              <Square className="w-5 h-5" />
              <span>Stop Recording</span>
            </button>
          )}
        </div>
      </div>
      
      {/* Recent Recordings */}
      <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-2xl p-6">
        <h3 className="text-xl font-semibold text-white mb-4">Recent Recordings</h3>
        <div className="space-y-3">
          {notes.filter(note => note.type === 'audio').map(note => (
            <div key={note.id} className="flex items-center space-x-3 p-3 bg-gray-800/30 rounded-lg">
              <div className="w-10 h-10 bg-red-500/20 rounded-lg flex items-center justify-center">
                <Headphones className="w-5 h-5 text-red-400" />
              </div>
              <div className="flex-1">
                <h4 className="text-white font-medium">{note.title}</h4>
                <p className="text-gray-400 text-sm">{note.transcription || 'Processing transcription...'}</p>
              </div>
              <button className="text-gray-400 hover:text-white">
                <Play className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Background Elements */}
      <div className="fixed inset-0 bg-gradient-to-br from-purple-900/20 via-black to-pink-900/20 pointer-events-none" />
      
      <div className="flex h-screen">
        {/* Sidebar */}
        <div className={`${isSidebarOpen ? 'w-64' : 'w-16'} bg-gray-900/50 backdrop-blur-xl border-r border-gray-800 transition-all duration-300 flex flex-col`}>
          <div className="p-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
                <Bot className="w-6 h-6 text-white" />
              </div>
              {isSidebarOpen && (
                <div>
                  <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    SmaRta
                  </h1>
                  <p className="text-xs text-gray-400">AI Notes Dashboard</p>
                </div>
              )}
            </div>
          </div>
          
          <nav className="flex-1 px-4">
            <div className="space-y-2">
              {[
                { id: 'dashboard', label: 'Dashboard', icon: TrendingUp },
                { id: 'notes', label: 'All Notes', icon: FileText },
                { id: 'chat', label: 'AI Chat', icon: MessageSquare },
                { id: 'recorder', label: 'Audio Recorder', icon: Mic },
                { id: 'upload', label: 'Upload Files', icon: Upload },
                { id: 'search', label: 'Smart Search', icon: Search },
                { id: 'categories', label: 'Categories', icon: Folder },
                { id: 'starred', label: 'Starred', icon: Star },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200 ${
                    activeTab === item.id
                      ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                      : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  {isSidebarOpen && <span>{item.label}</span>}
                </button>
              ))}
            </div>
          </nav>
          
          <div className="p-4 border-t border-gray-800">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="w-full flex items-center justify-center p-2 text-gray-400 hover:text-white transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <header className="bg-gray-900/50 backdrop-blur-xl border-b border-gray-800 px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white capitalize">{activeTab}</h2>
                <p className="text-gray-400">
                  {activeTab === 'dashboard' && 'Overview of your AI-powered notes'}
                  {activeTab === 'notes' && `${filteredNotes.length} notes found`}
                  {activeTab === 'chat' && 'Conversation with your AI assistant'}
                  {activeTab === 'recorder' && 'Record and transcribe audio notes'}
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <button className="p-2 text-gray-400 hover:text-white transition-colors">
                  <Bell className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => setIsSettingsOpen(true)}
                  className="p-2 text-gray-400 hover:text-white transition-colors"
                >
                  <Settings className="w-5 h-5" />
                </button>
                <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
              </div>
            </div>
          </header>

          {/* Content Area */}
          <main className="flex-1 overflow-y-auto p-6">
            {activeTab === 'dashboard' && renderDashboard()}
            {activeTab === 'notes' && renderNotes()}
            {activeTab === 'chat' && renderChat()}
            {activeTab === 'recorder' && renderAudioRecorder()}
            
            {/* Upload Tab */}
            {activeTab === 'upload' && (
              <div className="space-y-6">
                <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-2xl p-8 text-center">
                  <Upload className="w-16 h-16 text-purple-400 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-white mb-2">Upload Files</h3>
                  <p className="text-gray-400 mb-6">Upload documents, audio, video, or images for AI processing</p>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-200 transform hover:scale-105"
                  >
                    Choose Files
                  </button>
                  {isProcessing && (
                    <div className="mt-4">
                      <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
                      <p className="text-gray-400 mt-2">Processing files...</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="audio/*,video/*,image/*,.pdf,.doc,.docx,.txt"
        onChange={handleFileUpload}
        className="hidden"
      />

      {/* Create Note Modal */}
      {isCreatingNote && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 w-full max-w-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-white">Create New Note</h3>
              <button
                onClick={() => setIsCreatingNote(false)}
                className="text-gray-400 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Note title..."
                value={newNoteTitle}
                onChange={(e) => setNewNoteTitle(e.target.value)}
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
              />
              <textarea
                placeholder="Start writing your note..."
                value={newNoteContent}
                onChange={(e) => setNewNoteContent(e.target.value)}
                rows={8}
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 resize-none"
              />
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setIsCreatingNote(false)}
                  className="px-6 py-2 text-gray-400 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={createNewNote}
                  className="px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-200"
                >
                  Create Note
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Note Detail Modal */}
      {selectedNote && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-semibold text-white">{selectedNote.title}</h3>
              <button
                onClick={() => setSelectedNote(null)}
                className="text-gray-400 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <span className="px-3 py-1 bg-purple-500/20 text-purple-300 text-sm rounded-full">
                  {selectedNote.type}
                </span>
                <span className="text-gray-400 text-sm">{selectedNote.createdAt.toLocaleDateString()}</span>
                <span className="text-gray-400 text-sm">{selectedNote.category}</span>
              </div>
              {selectedNote.summary && (
                <div className="bg-gray-800/30 rounded-lg p-4">
                  <h4 className="text-lg font-semibold text-white mb-2">AI Summary</h4>
                  <p className="text-gray-300">{selectedNote.summary}</p>
                </div>
              )}
              {selectedNote.transcription && (
                <div className="bg-gray-800/30 rounded-lg p-4">
                  <h4 className="text-lg font-semibold text-white mb-2">Transcription</h4>
                  <p className="text-gray-300">{selectedNote.transcription}</p>
                </div>
              )}
              <div>
                <h4 className="text-lg font-semibold text-white mb-2">Content</h4>
                <p className="text-gray-300 whitespace-pre-wrap">{selectedNote.content}</p>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-white mb-2">Tags</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedNote.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 bg-purple-500/20 text-purple-300 text-sm rounded-full">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Settings Modal */}
      <SettingsModal 
        isOpen={isSettingsOpen} 
        onClose={() => setIsSettingsOpen(false)} 
      />
    </div>
  );
}

export default Dashboard;