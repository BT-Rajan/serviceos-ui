import { defineStore } from 'pinia'

// Central mock dataset for the ServiceOS prototype. No backend — everything
// here is sample data used to drive the UI so every page feels populated
// and consistent with the same records across views.

export const useMockStore = defineStore('mockData', {
  state: () => ({
    currentUser: { name: 'Rukmani Bala', initials: 'RB', role: 'Operations Lead', email: 'rukmani.bala@serviceos.io' },

    notifications: [
      { id: 1, title: 'Workflow "Client Onboarding" completed', time: '2m ago', status: 'success', icon: 'check-square' },
      { id: 2, title: 'Invoice #4021 needs approval', time: '18m ago', status: 'warning', icon: 'file' },
      { id: 3, title: 'Vendor sync failed — retrying', time: '1h ago', status: 'danger', icon: 'truck' },
      { id: 4, title: 'New client "Marlow & Finch" added', time: '3h ago', status: 'running', icon: 'briefcase' },
      { id: 5, title: 'Weekly report generated', time: 'Yesterday', status: 'neutral', icon: 'bar-chart' },
      { id: 6, title: 'Task "Draft proposal" assigned to you', time: 'Yesterday', status: 'running', icon: 'check-square' },
      { id: 7, title: 'Agent "Support Bot" deployed', time: '2 days ago', status: 'success', icon: 'cpu' }
    ],

    projects: [
      { id: 'PRJ-1042', name: 'Client Onboarding — Marlow & Finch', client: 'Marlow & Finch', status: 'running', owner: 'RB', progress: 62, due: '2026-08-02', budget: 42000 },
      { id: 'PRJ-1041', name: 'Q3 Marketing Automation', client: 'Halcyon Retail', status: 'running', owner: 'AS', progress: 38, due: '2026-08-14', budget: 28500 },
      { id: 'PRJ-1039', name: 'Vendor Consolidation Program', client: 'Internal', status: 'warning', owner: 'JT', progress: 71, due: '2026-07-25', budget: 15000 },
      { id: 'PRJ-1036', name: 'Website Redesign — Phase 2', client: 'Northwind Legal', status: 'success', owner: 'RB', progress: 100, due: '2026-07-10', budget: 33000 },
      { id: 'PRJ-1033', name: 'Data Migration — CRM', client: 'Internal', status: 'danger', owner: 'MK', progress: 24, due: '2026-07-20', budget: 51000 },
      { id: 'PRJ-1030', name: 'Annual Compliance Audit', client: 'Beacon Health', status: 'neutral', owner: 'JT', progress: 0, due: '2026-09-01', budget: 19500 },
      { id: 'PRJ-1028', name: 'Support Chatbot Rollout', client: 'Internal', status: 'running', owner: 'AS', progress: 55, due: '2026-08-08', budget: 22000 },
      { id: 'PRJ-1024', name: 'Vendor Onboarding — Atlas Freight', client: 'Atlas Freight', status: 'success', owner: 'MK', progress: 100, due: '2026-06-30', budget: 9800 }
    ],

    tasks: [
      { id: 'T-501', title: 'Draft onboarding checklist', project: 'PRJ-1042', assignee: 'RB', priority: 'high', status: 'todo', due: '2026-07-21' },
      { id: 'T-502', title: 'Review vendor contract terms', project: 'PRJ-1039', assignee: 'JT', priority: 'medium', status: 'todo', due: '2026-07-22' },
      { id: 'T-503', title: 'Configure automation triggers', project: 'PRJ-1041', assignee: 'AS', priority: 'high', status: 'in-progress', due: '2026-07-20' },
      { id: 'T-504', title: 'QA the new chatbot flows', project: 'PRJ-1028', assignee: 'AS', priority: 'medium', status: 'in-progress', due: '2026-07-23' },
      { id: 'T-505', title: 'Migrate legacy CRM records', project: 'PRJ-1033', assignee: 'MK', priority: 'high', status: 'in-progress', due: '2026-07-19' },
      { id: 'T-506', title: 'Client kickoff call — Marlow & Finch', project: 'PRJ-1042', assignee: 'RB', priority: 'high', status: 'blocked', due: '2026-07-19' },
      { id: 'T-507', title: 'Finalize compliance checklist', project: 'PRJ-1030', assignee: 'JT', priority: 'low', status: 'todo', due: '2026-08-05' },
      { id: 'T-508', title: 'Publish redesign to production', project: 'PRJ-1036', assignee: 'RB', priority: 'medium', status: 'done', due: '2026-07-10' },
      { id: 'T-509', title: 'Prepare Q3 marketing report', project: 'PRJ-1041', assignee: 'AS', priority: 'low', status: 'todo', due: '2026-07-28' },
      { id: 'T-510', title: 'Set up vendor scorecards', project: 'PRJ-1039', assignee: 'JT', priority: 'medium', status: 'done', due: '2026-07-12' }
    ],

    documents: [
      { id: 'D-1', name: 'Client Onboarding Playbook.pdf', type: 'pdf', size: '2.4 MB', project: 'PRJ-1042', owner: 'RB', updated: '2026-07-18' },
      { id: 'D-2', name: 'Vendor Contract — Atlas Freight.docx', type: 'doc', size: '312 KB', project: 'PRJ-1024', owner: 'MK', updated: '2026-07-17' },
      { id: 'D-3', name: 'Q3 Campaign Assets.zip', type: 'archive', size: '18.7 MB', project: 'PRJ-1041', owner: 'AS', updated: '2026-07-16' },
      { id: 'D-4', name: 'Compliance Checklist 2026.xlsx', type: 'sheet', size: '86 KB', project: 'PRJ-1030', owner: 'JT', updated: '2026-07-15' },
      { id: 'D-5', name: 'Website Redesign — Final Mockups.png', type: 'image', size: '5.1 MB', project: 'PRJ-1036', owner: 'RB', updated: '2026-07-10' },
      { id: 'D-6', name: 'CRM Migration Field Map.xlsx', type: 'sheet', size: '140 KB', project: 'PRJ-1033', owner: 'MK', updated: '2026-07-09' },
      { id: 'D-7', name: 'Chatbot Intent Library.pdf', type: 'pdf', size: '1.1 MB', project: 'PRJ-1028', owner: 'AS', updated: '2026-07-08' }
    ],

    users: [
      { id: 'U-1', name: 'Rukmani Bala', initials: 'RB', email: 'rukmani.bala@serviceos.io', role: 'Operations Lead', team: 'Operations', status: 'active', lastActive: '2m ago' },
      { id: 'U-2', name: 'Aditi Shah', initials: 'AS', email: 'aditi.shah@serviceos.io', role: 'Automation Specialist', team: 'Marketing Ops', status: 'active', lastActive: '12m ago' },
      { id: 'U-3', name: 'James Turner', initials: 'JT', email: 'james.turner@serviceos.io', role: 'Vendor Manager', team: 'Procurement', status: 'active', lastActive: '1h ago' },
      { id: 'U-4', name: 'Maya Kapoor', initials: 'MK', email: 'maya.kapoor@serviceos.io', role: 'Data Engineer', team: 'IT', status: 'invited', lastActive: '—' },
      { id: 'U-5', name: 'Liam Chen', initials: 'LC', email: 'liam.chen@serviceos.io', role: 'Project Manager', team: 'Operations', status: 'active', lastActive: '3h ago' },
      { id: 'U-6', name: 'Priya Nair', initials: 'PN', email: 'priya.nair@serviceos.io', role: 'Client Success', team: 'Client Services', status: 'suspended', lastActive: '6d ago' }
    ],

    vendors: [
      { id: 'V-1', name: 'Atlas Freight', category: 'Logistics', contact: 'Dana Ruiz', status: 'active', rating: 4.6, spend: 84200 },
      { id: 'V-2', name: 'BrightCloud Hosting', category: 'Infrastructure', contact: 'Sam Okafor', status: 'active', rating: 4.8, spend: 132000 },
      { id: 'V-3', name: 'Northgate Legal Partners', category: 'Legal', contact: 'Elena Voss', status: 'active', rating: 4.3, spend: 46500 },
      { id: 'V-4', name: 'Pixel & Pen Studio', category: 'Creative', contact: 'Theo Marsh', status: 'under-review', rating: 3.9, spend: 21800 },
      { id: 'V-5', name: 'Sterling Payroll Services', category: 'Finance', contact: 'Nora Blake', status: 'active', rating: 4.5, spend: 58900 },
      { id: 'V-6', name: 'QuickShip Couriers', category: 'Logistics', contact: 'Ravi Desai', status: 'inactive', rating: 3.1, spend: 9400 }
    ],

    clients: [
      { id: 'C-1', name: 'Marlow & Finch', industry: 'Retail', tier: 'Enterprise', status: 'success', owner: 'RB', mrr: 12400, projects: 2 },
      { id: 'C-2', name: 'Halcyon Retail', industry: 'Retail', tier: 'Mid-market', status: 'running', owner: 'AS', mrr: 8200, projects: 1 },
      { id: 'C-3', name: 'Northwind Legal', industry: 'Legal', tier: 'Enterprise', status: 'success', owner: 'RB', mrr: 15600, projects: 1 },
      { id: 'C-4', name: 'Beacon Health', industry: 'Healthcare', tier: 'Enterprise', status: 'neutral', owner: 'JT', mrr: 21000, projects: 1 },
      { id: 'C-5', name: 'Atlas Freight', industry: 'Logistics', tier: 'Mid-market', status: 'success', owner: 'MK', mrr: 6400, projects: 1 },
      { id: 'C-6', name: 'Solace Wellness', industry: 'Healthcare', tier: 'SMB', status: 'warning', owner: 'AS', mrr: 3100, projects: 1 }
    ],

    templates: [
      { id: 'TPL-1', name: 'Client Onboarding', category: 'Onboarding', steps: 8, uses: 142, status: 'success' },
      { id: 'TPL-2', name: 'Vendor Approval', category: 'Procurement', steps: 5, uses: 76, status: 'running' },
      { id: 'TPL-3', name: 'Marketing Campaign Launch', category: 'Marketing', steps: 11, uses: 54, status: 'running' },
      { id: 'TPL-4', name: 'Compliance Review', category: 'Legal', steps: 6, uses: 33, status: 'neutral' },
      { id: 'TPL-5', name: 'Invoice Escalation', category: 'Finance', steps: 4, uses: 98, status: 'warning' }
    ],

    workflows: [
      { id: 'WF-1', name: 'Client Onboarding — Marlow & Finch', template: 'Client Onboarding', status: 'running', progress: 62, started: '2026-07-14', currentStep: 2, owner: 'RB',
        steps: ['Intake', 'Contract', 'Kickoff Call', 'Setup', 'Go-Live'] },
      { id: 'WF-2', name: 'Vendor Approval — Pixel & Pen', template: 'Vendor Approval', status: 'warning', progress: 40, started: '2026-07-15', currentStep: 1, owner: 'JT',
        steps: ['Application', 'Screening', 'Approval', 'Contract', 'Activation'] },
      { id: 'WF-3', name: 'Q3 Campaign Launch', template: 'Marketing Campaign Launch', status: 'running', progress: 28, started: '2026-07-16', currentStep: 2, owner: 'AS',
        steps: ['Brief', 'Assets', 'Review', 'Schedule', 'Launch', 'Report'] },
      { id: 'WF-4', name: 'Annual Compliance Review', template: 'Compliance Review', status: 'neutral', progress: 0, started: '—', currentStep: 0, owner: 'JT',
        steps: ['Scope', 'Evidence Collection', 'Review', 'Sign-off'] },
      { id: 'WF-5', name: 'Invoice #4021 Escalation', template: 'Invoice Escalation', status: 'danger', progress: 80, started: '2026-07-17', currentStep: 3, owner: 'RB',
        steps: ['Flagged', 'Manager Review', 'Finance Review', 'Resolution'] }
    ],

    auditLog: [
      { id: 'A-1', actor: 'Rukmani Bala', action: 'Approved invoice #4021', time: '2026-07-19 09:14', status: 'success' },
      { id: 'A-2', actor: 'System', action: 'Vendor sync failed for QuickShip Couriers', time: '2026-07-19 08:02', status: 'danger' },
      { id: 'A-3', actor: 'Aditi Shah', action: 'Published workflow "Q3 Campaign Launch"', time: '2026-07-18 17:41', status: 'running' },
      { id: 'A-4', actor: 'James Turner', action: 'Updated vendor contract for Atlas Freight', time: '2026-07-18 15:20', status: 'neutral' },
      { id: 'A-5', actor: 'Maya Kapoor', action: 'Deleted document "old-crm-export.csv"', time: '2026-07-18 11:05', status: 'warning' },
      { id: 'A-6', actor: 'System', action: 'Nightly backup completed', time: '2026-07-18 02:00', status: 'success' },
      { id: 'A-7', actor: 'Priya Nair', action: 'Login from new device', time: '2026-07-17 19:32', status: 'warning' }
    ],

    agents: [
      { id: 'AG-1', name: 'Support Bot', purpose: 'Customer support triage', status: 'success', conversations: 1284, deployed: '2026-06-02' },
      { id: 'AG-2', name: 'Knowledge Assistant', purpose: 'Internal knowledge Q&A', status: 'success', conversations: 842, deployed: '2026-05-18' },
      { id: 'AG-3', name: 'Vendor Screener', purpose: 'Screens new vendor applications', status: 'running', conversations: 96, deployed: '2026-07-01' },
      { id: 'AG-4', name: 'Onboarding Concierge', purpose: 'Guides new clients through setup', status: 'neutral', conversations: 0, deployed: '—' }
    ],

    revenueTrend: [64, 78, 74, 92, 104, 118, 132],
    revenueMonths: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul']
  }),

  getters: {
    kpis: (state) => ({
      activeProjects: state.projects.filter(p => p.status === 'running').length,
      tasksDueToday: state.tasks.filter(t => t.due === '2026-07-19').length,
      revenueMTD: 186400,
      clientSatisfaction: 4.7
    })
  }
})
