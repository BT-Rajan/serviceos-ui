export const NAV = [
  { group: 'Overview', items: [
    { key: 'dashboard', label: 'Dashboard', icon: 'grid', to: '/' },
  ]},
  { group: 'Work', items: [
    { key: 'projects', label: 'Projects', icon: 'folder', to: '/projects' },
    { key: 'tasks', label: 'Tasks', icon: 'check-square', to: '/tasks' },
    { key: 'documents', label: 'Documents', icon: 'file', to: '/documents' },
  ]},
  { group: 'Workflow', items: [
    { key: 'workflow', label: 'Workflows', icon: 'git-branch', to: '/workflow' },
    { key: 'workflow-designer', label: 'Workflow Designer', icon: 'layout', to: '/workflow-designer' },
    { key: 'templates', label: 'Templates', icon: 'copy', to: '/templates' },
  ]},
  { group: 'People', items: [
    { key: 'users', label: 'Users', icon: 'users', to: '/users' },
    { key: 'vendors', label: 'Vendors', icon: 'truck', to: '/vendors' },
    { key: 'clients', label: 'Clients', icon: 'briefcase', to: '/clients' },
  ]},
  { group: 'Insights', items: [
    { key: 'reports', label: 'Reports', icon: 'bar-chart', to: '/reports' },
    { key: 'analytics', label: 'Analytics', icon: 'trending-up', to: '/analytics' },
  ]},
  { group: 'Communication', items: [
    { key: 'chatbot', label: 'Chatbot', icon: 'message-circle', to: '/chatbot' },
    { key: 'notifications', label: 'Notifications', icon: 'bell', to: '/notifications' },
  ]},
  { group: 'Administration', items: [
    { key: 'agent-studio', label: 'Agent Studio', icon: 'cpu', to: '/agent-studio' },
    { key: 'audit', label: 'Audit Log', icon: 'shield', to: '/audit' },
    { key: 'settings', label: 'Settings', icon: 'settings', to: '/settings' },
  ]},
]
