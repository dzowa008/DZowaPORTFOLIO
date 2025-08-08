import React, { useState, useEffect } from 'react';
import { X, Settings, Palette, Globe, Type, Grid, List, Baseline as Timeline, Home, FileText, BarChart3, Save, Sparkles, Tag, FileDown, CheckSquare, Shield, Fingerprint, Key, Clock, Cloud, CloudOff, HardDrive, Trash2, Brain, MessageSquare, Mic, Lightbulb, User, Smartphone, CreditCard, LogOut, Download, Upload, Code, Zap, Calendar, Monitor, Sun, Moon, ChevronRight, ChevronDown, Info, AlertCircle, CheckCircle } from 'lucide-react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Settings {
  // General Settings
  theme: 'light' | 'dark' | 'system';
  language: string;
  fontSize: 'small' | 'medium' | 'large';
  fontStyle: 'inter' | 'roboto' | 'opensans' | 'poppins';
  defaultView: 'list' | 'grid' | 'timeline';
  startupPage: 'home' | 'last-note' | 'dashboard';
  
  // Note Preferences
  autoSaveInterval: number;
  enableAISuggestions: boolean;
  autoTagDetection: boolean;
  markdownMode: boolean;
  spellCheck: boolean;
  exportFormat: 'pdf' | 'markdown' | 'txt' | 'docx';
  
  // Privacy & Security
  biometricLock: boolean;
  pinLock: boolean;
  endToEndEncryption: boolean;
  encryptionPassphrase: string;
  sessionTimeout: number;
  
  // Sync & Storage
  cloudSync: boolean;
  cloudProvider: 'google-drive' | 'dropbox' | 'internal';
  offlineMode: boolean;
  backupFrequency: 'daily' | 'weekly' | 'monthly';
  
  // AI Settings
  aiChatEnabled: boolean;
  autoSummarization: boolean;
  meetingTranscription: boolean;
  followUpSuggestions: boolean;
  aiModel: 'gpt-4' | 'claude' | 'gemini';
  
  // Account
  profileName: string;
  profileEmail: string;
}

const defaultSettings: Settings = {
  theme: 'dark',
  language: 'en',
  fontSize: 'medium',
  fontStyle: 'inter',
  defaultView: 'grid',
  startupPage: 'dashboard',
  autoSaveInterval: 30,
  enableAISuggestions: true,
  autoTagDetection: true,
  markdownMode: false,
  spellCheck: true,
  exportFormat: 'pdf',
  biometricLock: false,
  pinLock: false,
  endToEndEncryption: true,
  encryptionPassphrase: '',
  sessionTimeout: 60,
  cloudSync: true,
  cloudProvider: 'internal',
  offlineMode: false,
  backupFrequency: 'daily',
  aiChatEnabled: true,
  autoSummarization: true,
  meetingTranscription: true,
  followUpSuggestions: true,
  aiModel: 'gpt-4',
  profileName: 'John Doe',
  profileEmail: 'john@example.com'
};

function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
  const [settings, setSettings] = useState<Settings>(defaultSettings);
  const [activeSection, setActiveSection] = useState('general');
  const [expandedSections, setExpandedSections] = useState<string[]>(['general']);
  const [storageUsage, setStorageUsage] = useState({ used: 2.4, total: 15 });
  const [connectedDevices, setConnectedDevices] = useState([
    { id: '1', name: 'iPhone 15 Pro', lastSync: '2 minutes ago', current: true },
    { id: '2', name: 'MacBook Pro', lastSync: '1 hour ago', current: false },
    { id: '3', name: 'iPad Air', lastSync: '3 hours ago', current: false }
  ]);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle');
  const [pinCode, setPinCode] = useState('');
  const [showPinSetup, setShowPinSetup] = useState(false);
  const [developerMode, setDeveloperMode] = useState(false);
  const [integrations, setIntegrations] = useState([
    { name: 'Zapier', status: 'Connected', icon: <Zap className="w-4 h-4" /> },
    { name: 'Google Calendar', status: 'Not Connected', icon: <Calendar className="w-4 h-4" /> },
    { name: 'Notion', status: 'Not Connected', icon: <FileText className="w-4 h-4" /> }
  ]);

  useEffect(() => {
    // Load settings from localStorage
    const savedSettings = localStorage.getItem('smartaSettings');
    if (savedSettings) {
      setSettings({ ...defaultSettings, ...JSON.parse(savedSettings) });
    }

    // Apply theme immediately
    applyTheme(settings.theme);
    
    // Apply font settings
    applyFontSettings(settings.fontSize, settings.fontStyle);
    
    // Set up auto-save interval
    setupAutoSave(settings.autoSaveInterval);
    
    // Set up session timeout
    setupSessionTimeout(settings.sessionTimeout);
  }, []);

  const applyTheme = (theme: string) => {
    const root = document.documentElement;
    if (theme === 'light') {
      root.classList.remove('dark');
      root.classList.add('light');
      document.body.style.backgroundColor = '#ffffff';
      document.body.style.color = '#000000';
    } else if (theme === 'dark') {
      root.classList.remove('light');
      root.classList.add('dark');
      document.body.style.backgroundColor = '#000000';
      document.body.style.color = '#ffffff';
    } else {
      // System theme
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (prefersDark) {
        root.classList.add('dark');
        document.body.style.backgroundColor = '#000000';
        document.body.style.color = '#ffffff';
      } else {
        root.classList.add('light');
        document.body.style.backgroundColor = '#ffffff';
        document.body.style.color = '#000000';
      }
    }
  };

  const applyFontSettings = (fontSize: string, fontStyle: string) => {
    const root = document.documentElement;
    
    // Apply font size
    const fontSizeMap = {
      small: '14px',
      medium: '16px',
      large: '18px'
    };
    root.style.fontSize = fontSizeMap[fontSize as keyof typeof fontSizeMap];
    
    // Apply font family
    const fontFamilyMap = {
      inter: 'Inter, sans-serif',
      roboto: 'Roboto, sans-serif',
      opensans: 'Open Sans, sans-serif',
      poppins: 'Poppins, sans-serif'
    };
    root.style.fontFamily = fontFamilyMap[fontStyle as keyof typeof fontFamilyMap];
  };

  const setupAutoSave = (interval: number) => {
    // Clear existing interval
    const existingInterval = localStorage.getItem('autoSaveInterval');
    if (existingInterval) {
      clearInterval(parseInt(existingInterval));
    }
    
    // Set new interval
    const newInterval = setInterval(() => {
      // Auto-save logic here
      console.log('Auto-saving notes...');
      localStorage.setItem('lastAutoSave', new Date().toISOString());
    }, interval * 1000);
    
    localStorage.setItem('autoSaveInterval', newInterval.toString());
  };

  const setupSessionTimeout = (timeout: number) => {
    // Clear existing timeout
    const existingTimeout = localStorage.getItem('sessionTimeout');
    if (existingTimeout) {
      clearTimeout(parseInt(existingTimeout));
    }
    
    // Set new timeout
    const newTimeout = setTimeout(() => {
      if (settings.sessionTimeout > 0) {
        localStorage.removeItem('isAuthenticated');
        alert('Session expired. Please sign in again.');
        window.location.reload();
      }
    }, timeout * 60 * 1000);
    
    localStorage.setItem('sessionTimeout', newTimeout.toString());
  };

  const updateSetting = <K extends keyof Settings>(key: K, value: Settings[K]) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    
    // Apply changes immediately
    if (key === 'theme') {
      applyTheme(value as string);
    }
    
    if (key === 'fontSize' || key === 'fontStyle') {
      applyFontSettings(newSettings.fontSize, newSettings.fontStyle);
    }
    
    if (key === 'autoSaveInterval') {
      setupAutoSave(value as number);
    }
    
    if (key === 'sessionTimeout') {
      setupSessionTimeout(value as number);
    }
    
    // Auto-save to localStorage
    setSaveStatus('saving');
    setTimeout(() => {
      localStorage.setItem('smartaSettings', JSON.stringify(newSettings));
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus('idle'), 2000);
    }, 500);
  };

  const toggleSection = (section: string) => {
    setExpandedSections(prev => 
      prev.includes(section) 
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  const exportAllNotes = () => {
    // Get all notes from localStorage or state
    const notes = JSON.parse(localStorage.getItem('smartaNotes') || '[]');
    
    let content = '';
    if (settings.exportFormat === 'markdown') {
      content = '# SmaRta Notes Export\n\n';
      notes.forEach((note: any) => {
        content += `## ${note.title}\n\n${note.content}\n\n---\n\n`;
      });
    } else if (settings.exportFormat === 'txt') {
      content = 'SmaRta Notes Export\n\n';
      notes.forEach((note: any) => {
        content += `${note.title}\n${note.content}\n\n---\n\n`;
      });
    } else {
      // Default to markdown
      content = '# SmaRta Notes Export\n\n';
      notes.forEach((note: any) => {
        content += `## ${note.title}\n\n${note.content}\n\n---\n\n`;
      });
    }
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `smarta-notes-export.${settings.exportFormat}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const importNotes = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json,.md,.txt';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            const content = e.target?.result as string;
            let notes = [];
            
            if (file.name.endsWith('.json')) {
              notes = JSON.parse(content);
            } else {
              // Parse markdown or text
              const sections = content.split('---');
              notes = sections.map((section, index) => ({
                id: Date.now() + index,
                title: `Imported Note ${index + 1}`,
                content: section.trim(),
                type: 'text',
                tags: [],
                category: 'Imported',
                createdAt: new Date(),
                updatedAt: new Date(),
                isStarred: false
              }));
            }
            
            localStorage.setItem('smartaNotes', JSON.stringify(notes));
            alert(`Successfully imported ${notes.length} notes!`);
          } catch (error) {
            alert('Error importing notes. Please check the file format.');
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  const clearCache = () => {
    // Clear various cache items
    localStorage.removeItem('smartaCache');
    localStorage.removeItem('smartaTempFiles');
    localStorage.removeItem('smartaSearchCache');
    
    // Update storage usage
    setStorageUsage(prev => ({ ...prev, used: prev.used * 0.3 }));
    
    alert('Cache cleared successfully!');
  };

  const enableBiometricLock = async () => {
    if ('credentials' in navigator) {
      try {
        // Simulate biometric authentication setup
        const credential = await navigator.credentials.create({
          publicKey: {
            challenge: new Uint8Array(32),
            rp: { name: "SmaRta" },
            user: {
              id: new Uint8Array(16),
              name: settings.profileEmail,
              displayName: settings.profileName,
            },
            pubKeyCredParams: [{ alg: -7, type: "public-key" }],
            authenticatorSelection: {
              authenticatorAttachment: "platform",
              userVerification: "required"
            }
          }
        });
        
        if (credential) {
          updateSetting('biometricLock', true);
          alert('Biometric lock enabled successfully!');
        }
      } catch (error) {
        alert('Biometric authentication not available on this device.');
        updateSetting('biometricLock', false);
      }
    } else {
      alert('Biometric authentication not supported in this browser.');
      updateSetting('biometricLock', false);
    }
  };

  const setupPinLock = () => {
    if (pinCode.length === 4) {
      localStorage.setItem('smartaPinCode', pinCode);
      updateSetting('pinLock', true);
      setShowPinSetup(false);
      setPinCode('');
      alert('PIN lock enabled successfully!');
    } else {
      alert('Please enter a 4-digit PIN code.');
    }
  };

  const removeDevice = (deviceId: string) => {
    setConnectedDevices(prev => prev.filter(device => device.id !== deviceId));
    alert('Device removed successfully!');
  };

  const toggleIntegration = (integrationName: string) => {
    setIntegrations(prev => prev.map(integration => 
      integration.name === integrationName 
        ? { ...integration, status: integration.status === 'Connected' ? 'Not Connected' : 'Connected' }
        : integration
    ));
  };

  const performBackup = () => {
    const backupData = {
      settings,
      notes: JSON.parse(localStorage.getItem('smartaNotes') || '[]'),
      timestamp: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `smarta-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    
    alert('Backup created successfully!');
  };

  const syncWithCloud = async () => {
    if (settings.cloudSync) {
      setSaveStatus('saving');
      
      // Simulate cloud sync
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      localStorage.setItem('lastCloudSync', new Date().toISOString());
      setSaveStatus('saved');
      alert(`Synced with ${settings.cloudProvider} successfully!`);
    }
  };

  const signOut = () => {
    if (confirm('Are you sure you want to sign out?')) {
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('smartaSettings');
      localStorage.removeItem('smartaNotes');
      window.location.reload();
    }
  };

  if (!isOpen) return null;

  const sections = [
    {
      id: 'general',
      title: 'General Settings',
      icon: <Settings className="w-5 h-5" />,
      content: (
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-3">Theme</label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { value: 'light', label: 'Light', icon: <Sun className="w-4 h-4" /> },
                { value: 'dark', label: 'Dark', icon: <Moon className="w-4 h-4" /> },
                { value: 'system', label: 'System', icon: <Monitor className="w-4 h-4" /> }
              ].map((theme) => (
                <button
                  key={theme.value}
                  onClick={() => updateSetting('theme', theme.value as any)}
                  className={`flex items-center space-x-2 p-3 rounded-lg border transition-all ${
                    settings.theme === theme.value
                      ? 'border-purple-500 bg-purple-500/10 text-purple-300'
                      : 'border-gray-700 bg-gray-800/50 text-gray-300 hover:border-gray-600'
                  }`}
                >
                  {theme.icon}
                  <span className="text-sm">{theme.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-3">Language</label>
            <select
              value={settings.language}
              onChange={(e) => updateSetting('language', e.target.value)}
              className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-purple-500"
            >
              <option value="en">English</option>
              <option value="es">Español</option>
              <option value="fr">Français</option>
              <option value="de">Deutsch</option>
              <option value="zh">中文</option>
              <option value="ja">日本語</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-3">Font Size</label>
              <select
                value={settings.fontSize}
                onChange={(e) => updateSetting('fontSize', e.target.value as any)}
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-purple-500"
              >
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="large">Large</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-3">Font Style</label>
              <select
                value={settings.fontStyle}
                onChange={(e) => updateSetting('fontStyle', e.target.value as any)}
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-purple-500"
              >
                <option value="inter">Inter</option>
                <option value="roboto">Roboto</option>
                <option value="opensans">Open Sans</option>
                <option value="poppins">Poppins</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-3">Default Note View</label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { value: 'list', label: 'List', icon: <List className="w-4 h-4" /> },
                { value: 'grid', label: 'Grid', icon: <Grid className="w-4 h-4" /> },
                { value: 'timeline', label: 'Timeline', icon: <Timeline className="w-4 h-4" /> }
              ].map((view) => (
                <button
                  key={view.value}
                  onClick={() => updateSetting('defaultView', view.value as any)}
                  className={`flex items-center space-x-2 p-3 rounded-lg border transition-all ${
                    settings.defaultView === view.value
                      ? 'border-purple-500 bg-purple-500/10 text-purple-300'
                      : 'border-gray-700 bg-gray-800/50 text-gray-300 hover:border-gray-600'
                  }`}
                >
                  {view.icon}
                  <span className="text-sm">{view.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-3">Startup Page</label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { value: 'home', label: 'Home', icon: <Home className="w-4 h-4" /> },
                { value: 'last-note', label: 'Last Note', icon: <FileText className="w-4 h-4" /> },
                { value: 'dashboard', label: 'Dashboard', icon: <BarChart3 className="w-4 h-4" /> }
              ].map((page) => (
                <button
                  key={page.value}
                  onClick={() => updateSetting('startupPage', page.value as any)}
                  className={`flex items-center space-x-2 p-3 rounded-lg border transition-all ${
                    settings.startupPage === page.value
                      ? 'border-purple-500 bg-purple-500/10 text-purple-300'
                      : 'border-gray-700 bg-gray-800/50 text-gray-300 hover:border-gray-600'
                  }`}
                >
                  {page.icon}
                  <span className="text-sm">{page.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'notes',
      title: 'Note Preferences',
      icon: <FileText className="w-5 h-5" />,
      content: (
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-3">
              Auto-save Interval (seconds)
            </label>
            <input
              type="range"
              min="10"
              max="300"
              step="10"
              value={settings.autoSaveInterval}
              onChange={(e) => updateSetting('autoSaveInterval', parseInt(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-gray-400 mt-1">
              <span>10s</span>
              <span className="text-purple-400">{settings.autoSaveInterval}s</span>
              <span>5min</span>
            </div>
          </div>

          <div className="space-y-4">
            {[
              { key: 'enableAISuggestions', label: 'Enable AI Suggestions', icon: <Sparkles className="w-4 h-4" /> },
              { key: 'autoTagDetection', label: 'Auto-detect Tags', icon: <Tag className="w-4 h-4" /> },
              { key: 'markdownMode', label: 'Markdown Mode', icon: <Code className="w-4 h-4" /> },
              { key: 'spellCheck', label: 'Spell Check & Grammar', icon: <CheckSquare className="w-4 h-4" /> }
            ].map((setting) => (
              <div key={setting.key} className="flex items-center justify-between p-3 bg-gray-800/30 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="text-purple-400">{setting.icon}</div>
                  <span className="text-gray-300">{setting.label}</span>
                </div>
                <button
                  onClick={() => updateSetting(setting.key as keyof Settings, !settings[setting.key as keyof Settings])}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    settings[setting.key as keyof Settings] ? 'bg-purple-500' : 'bg-gray-600'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings[setting.key as keyof Settings] ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-3">Default Export Format</label>
            <select
              value={settings.exportFormat}
              onChange={(e) => updateSetting('exportFormat', e.target.value as any)}
              className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-purple-500"
            >
              <option value="pdf">PDF</option>
              <option value="markdown">Markdown</option>
              <option value="txt">Plain Text</option>
              <option value="docx">Word Document</option>
            </select>
          </div>
        </div>
      )
    },
    {
      id: 'security',
      title: 'Privacy & Security',
      icon: <Shield className="w-5 h-5" />,
      content: (
        <div className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-gray-800/30 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="text-purple-400"><Fingerprint className="w-4 h-4" /></div>
                <span className="text-gray-300">Biometric Lock</span>
              </div>
              <button
                onClick={() => settings.biometricLock ? updateSetting('biometricLock', false) : enableBiometricLock()}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.biometricLock ? 'bg-purple-500' : 'bg-gray-600'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.biometricLock ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-800/30 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="text-purple-400"><Key className="w-4 h-4" /></div>
                <span className="text-gray-300">PIN Lock</span>
              </div>
              <button
                onClick={() => settings.pinLock ? updateSetting('pinLock', false) : setShowPinSetup(true)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.pinLock ? 'bg-purple-500' : 'bg-gray-600'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.pinLock ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-800/30 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="text-purple-400"><Shield className="w-4 h-4" /></div>
                <span className="text-gray-300">End-to-End Encryption</span>
              </div>
              <button
                onClick={() => updateSetting('endToEndEncryption', !settings.endToEndEncryption)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.endToEndEncryption ? 'bg-purple-500' : 'bg-gray-600'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.endToEndEncryption ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>

          {showPinSetup && (
            <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
              <h4 className="text-purple-300 font-medium mb-3">Set up PIN Lock</h4>
              <input
                type="password"
                value={pinCode}
                onChange={(e) => setPinCode(e.target.value)}
                placeholder="Enter 4-digit PIN"
                maxLength={4}
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 mb-3"
              />
              <div className="flex space-x-3">
                <button
                  onClick={setupPinLock}
                  className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
                >
                  Set PIN
                </button>
                <button
                  onClick={() => setShowPinSetup(false)}
                  className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {settings.endToEndEncryption && (
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-3">
                Encryption Passphrase
              </label>
              <input
                type="password"
                value={settings.encryptionPassphrase}
                onChange={(e) => updateSetting('encryptionPassphrase', e.target.value)}
                placeholder="Enter a strong passphrase"
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-3">
              Session Timeout (minutes)
            </label>
            <input
              type="range"
              min="5"
              max="480"
              step="5"
              value={settings.sessionTimeout}
              onChange={(e) => updateSetting('sessionTimeout', parseInt(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-gray-400 mt-1">
              <span>5min</span>
              <span className="text-purple-400">{settings.sessionTimeout}min</span>
              <span>8hrs</span>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'sync',
      title: 'Sync & Storage',
      icon: <Cloud className="w-5 h-5" />,
      content: (
        <div className="space-y-6">
          <div className="flex items-center justify-between p-3 bg-gray-800/30 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="text-purple-400">
                {settings.cloudSync ? <Cloud className="w-4 h-4" /> : <CloudOff className="w-4 h-4" />}
              </div>
              <span className="text-gray-300">Cloud Sync</span>
            </div>
            <button
              onClick={() => updateSetting('cloudSync', !settings.cloudSync)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                settings.cloudSync ? 'bg-purple-500' : 'bg-gray-600'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.cloudSync ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {settings.cloudSync && (
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-3">Cloud Provider</label>
              <select
                value={settings.cloudProvider}
                onChange={(e) => updateSetting('cloudProvider', e.target.value as any)}
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-purple-500"
              >
                <option value="internal">SmaRta Cloud</option>
                <option value="google-drive">Google Drive</option>
                <option value="dropbox">Dropbox</option>
              </select>
              <button
                onClick={syncWithCloud}
                className="mt-3 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
              >
                Sync Now
              </button>
            </div>
          )}

          <div className="flex items-center justify-between p-3 bg-gray-800/30 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="text-purple-400"><HardDrive className="w-4 h-4" /></div>
              <span className="text-gray-300">Offline Mode</span>
            </div>
            <button
              onClick={() => updateSetting('offlineMode', !settings.offlineMode)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                settings.offlineMode ? 'bg-purple-500' : 'bg-gray-600'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.offlineMode ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-3">Backup Frequency</label>
            <select
              value={settings.backupFrequency}
              onChange={(e) => updateSetting('backupFrequency', e.target.value as any)}
              className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-purple-500"
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
            <button
              onClick={performBackup}
              className="mt-3 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Backup Now
            </button>
          </div>

          <div className="bg-gray-800/30 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-gray-300 font-medium">Storage Usage</span>
              <span className="text-sm text-gray-400">{storageUsage.used.toFixed(1)}GB / {storageUsage.total}GB</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2 mb-3">
              <div 
                className="bg-purple-500 h-2 rounded-full transition-all duration-300" 
                style={{ width: `${(storageUsage.used / storageUsage.total) * 100}%` }}
              />
            </div>
            <button
              onClick={clearCache}
              className="flex items-center space-x-2 text-purple-400 hover:text-purple-300 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              <span>Clear Cache</span>
            </button>
          </div>
        </div>
      )
    },
    {
      id: 'ai',
      title: 'AI Settings',
      icon: <Brain className="w-5 h-5" />,
      content: (
        <div className="space-y-6">
          <div className="space-y-4">
            {[
              { key: 'aiChatEnabled', label: 'AI Chat with Notes', icon: <MessageSquare className="w-4 h-4" /> },
              { key: 'autoSummarization', label: 'Auto Summarization', icon: <FileText className="w-4 h-4" /> },
              { key: 'meetingTranscription', label: 'Meeting Transcription', icon: <Mic className="w-4 h-4" /> },
              { key: 'followUpSuggestions', label: 'Follow-up Suggestions', icon: <Lightbulb className="w-4 h-4" /> }
            ].map((setting) => (
              <div key={setting.key} className="flex items-center justify-between p-3 bg-gray-800/30 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="text-purple-400">{setting.icon}</div>
                  <span className="text-gray-300">{setting.label}</span>
                </div>
                <button
                  onClick={() => updateSetting(setting.key as keyof Settings, !settings[setting.key as keyof Settings])}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    settings[setting.key as keyof Settings] ? 'bg-purple-500' : 'bg-gray-600'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings[setting.key as keyof Settings] ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-3">AI Model</label>
            <select
              value={settings.aiModel}
              onChange={(e) => updateSetting('aiModel', e.target.value as any)}
              className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-purple-500"
            >
              <option value="gpt-4">GPT-4 (Recommended)</option>
              <option value="claude">Claude 3</option>
              <option value="gemini">Gemini Pro</option>
            </select>
          </div>

          <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Info className="w-5 h-5 text-blue-400 mt-0.5" />
              <div>
                <h4 className="text-blue-300 font-medium mb-1">AI Usage</h4>
                <p className="text-blue-200 text-sm">
                  AI features consume processing credits. Current usage: 1,247 / 10,000 monthly credits.
                </p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'account',
      title: 'Account Settings',
      icon: <User className="w-5 h-5" />,
      content: (
        <div className="space-y-6">
          <div className="bg-gray-800/30 rounded-lg p-4">
            <h4 className="text-white font-medium mb-4">Profile Information</h4>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Name</label>
                <input
                  type="text"
                  value={settings.profileName}
                  onChange={(e) => updateSetting('profileName', e.target.value)}
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                <input
                  type="email"
                  value={settings.profileEmail}
                  onChange={(e) => updateSetting('profileEmail', e.target.value)}
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-purple-500"
                />
              </div>
            </div>
          </div>

          <div className="bg-gray-800/30 rounded-lg p-4">
            <h4 className="text-white font-medium mb-4">Connected Devices</h4>
            <div className="space-y-3">
              {connectedDevices.map((device) => (
                <div key={device.id} className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Smartphone className="w-4 h-4 text-purple-400" />
                    <div>
                      <div className="text-white text-sm font-medium">
                        {device.name}
                        {device.current && <span className="ml-2 text-xs text-green-400">(Current)</span>}
                      </div>
                      <div className="text-gray-400 text-xs">Last sync: {device.lastSync}</div>
                    </div>
                  </div>
                  {!device.current && (
                    <button 
                      onClick={() => removeDevice(device.id)}
                      className="text-red-400 hover:text-red-300 text-sm"
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gray-800/30 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-white font-medium">Subscription Status</h4>
              <span className="px-3 py-1 bg-purple-500/20 text-purple-300 text-sm rounded-full">Pro Plan</span>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              Your Pro subscription is active until March 15, 2025
            </p>
            <button className="flex items-center space-x-2 text-purple-400 hover:text-purple-300 transition-colors">
              <CreditCard className="w-4 h-4" />
              <span>Manage Subscription</span>
            </button>
          </div>

          <button
            onClick={signOut}
            className="w-full flex items-center justify-center space-x-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 py-3 rounded-lg transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      )
    },
    {
      id: 'advanced',
      title: 'Advanced',
      icon: <Code className="w-5 h-5" />,
      content: (
        <div className="space-y-6">
          <div className="bg-gray-800/30 rounded-lg p-4">
            <h4 className="text-white font-medium mb-4">Import/Export</h4>
            <div className="space-y-3">
              <button
                onClick={exportAllNotes}
                className="w-full flex items-center justify-center space-x-2 bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/30 text-purple-400 py-3 rounded-lg transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>Export All Notes</span>
              </button>
              <button 
                onClick={importNotes}
                className="w-full flex items-center justify-center space-x-2 bg-gray-700/50 hover:bg-gray-700/70 border border-gray-600 text-gray-300 py-3 rounded-lg transition-colors"
              >
                <Upload className="w-4 h-4" />
                <span>Import Notes</span>
              </button>
            </div>
          </div>

          <div className="bg-gray-800/30 rounded-lg p-4">
            <h4 className="text-white font-medium mb-4">Integrations</h4>
            <div className="space-y-3">
              {integrations.map((integration, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="text-purple-400">{integration.icon}</div>
                    <span className="text-gray-300">{integration.name}</span>
                  </div>
                  <button
                    onClick={() => toggleIntegration(integration.name)}
                    className={`text-sm px-3 py-1 rounded-full ${
                      integration.status === 'Connected' 
                        ? 'bg-green-500/20 text-green-400' 
                        : 'bg-gray-600/50 text-gray-400 hover:bg-purple-500/20 hover:text-purple-400'
                    }`}
                  >
                    {integration.status === 'Connected' ? 'Disconnect' : 'Connect'}
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 text-orange-400 mt-0.5" />
              <div>
                <h4 className="text-orange-300 font-medium mb-1">Developer Options</h4>
                <p className="text-orange-200 text-sm mb-3">
                  Advanced settings for developers and power users. Use with caution.
                </p>
                <button 
                  onClick={() => setDeveloperMode(!developerMode)}
                  className="text-orange-400 hover:text-orange-300 text-sm font-medium"
                >
                  {developerMode ? 'Disable' : 'Enable'} Developer Mode
                </button>
                {developerMode && (
                  <div className="mt-3 p-3 bg-gray-800/50 rounded-lg">
                    <p className="text-gray-300 text-sm">Developer mode enabled. Additional debugging options are now available.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 border border-gray-800 rounded-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden flex">
        {/* Sidebar */}
        <div className="w-80 bg-gray-800/50 border-r border-gray-700 flex flex-col">
          <div className="p-6 border-b border-gray-700">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-white">Settings</h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            <nav className="space-y-2">
              {sections.map((section) => (
                <div key={section.id}>
                  <button
                    onClick={() => {
                      setActiveSection(section.id);
                      toggleSection(section.id);
                    }}
                    className={`w-full flex items-center justify-between p-3 rounded-lg transition-all ${
                      activeSection === section.id
                        ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                        : 'text-gray-300 hover:text-white hover:bg-gray-700/50'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      {section.icon}
                      <span className="font-medium">{section.title}</span>
                    </div>
                    {expandedSections.includes(section.id) ? (
                      <ChevronDown className="w-4 h-4" />
                    ) : (
                      <ChevronRight className="w-4 h-4" />
                    )}
                  </button>
                </div>
              ))}
            </nav>
          </div>

          {/* Save Status */}
          <div className="p-4 border-t border-gray-700">
            <div className="flex items-center space-x-2">
              {saveStatus === 'saving' && (
                <>
                  <div className="w-4 h-4 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
                  <span className="text-sm text-gray-400">Saving...</span>
                </>
              )}
              {saveStatus === 'saved' && (
                <>
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span className="text-sm text-green-400">Saved</span>
                </>
              )}
              {saveStatus === 'idle' && (
                <span className="text-sm text-gray-500">Auto-save enabled</span>
              )}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col">
          <div className="p-6 border-b border-gray-700">
            <h3 className="text-2xl font-semibold text-white">
              {sections.find(s => s.id === activeSection)?.title}
            </h3>
          </div>

          <div className="flex-1 overflow-y-auto p-6">
            {sections.find(s => s.id === activeSection)?.content}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SettingsModal;