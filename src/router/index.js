import { createRouter, createWebHistory } from 'vue-router'
import AppShell from '../components/layout/AppShell.vue'
import DashboardView from '../views/DashboardView.vue'
import PlaceholderView from '../views/PlaceholderView.vue'

const stub = (title) => ({ component: PlaceholderView, props: { title } })

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: AppShell,
      children: [
        { path: '', name: 'dashboard', component: DashboardView },
        { path: 'projects', name: 'projects', ...stub('Projects') },
        { path: 'tasks', name: 'tasks', ...stub('Tasks') },
        { path: 'documents', name: 'documents', ...stub('Documents') },
        { path: 'workflow', name: 'workflow', ...stub('Workflows') },
        { path: 'workflow-designer', name: 'workflow-designer', ...stub('Workflow Designer') },
        { path: 'templates', name: 'templates', ...stub('Templates') },
        { path: 'users', name: 'users', ...stub('Users') },
        { path: 'vendors', name: 'vendors', ...stub('Vendors') },
        { path: 'clients', name: 'clients', ...stub('Clients') },
        { path: 'reports', name: 'reports', ...stub('Reports') },
        { path: 'analytics', name: 'analytics', ...stub('Analytics') },
        { path: 'chatbot', name: 'chatbot', ...stub('Chatbot') },
        { path: 'notifications', name: 'notifications', ...stub('Notifications') },
        { path: 'agent-studio', name: 'agent-studio', ...stub('Agent Studio') },
        { path: 'audit', name: 'audit', ...stub('Audit Log') },
        { path: 'settings', name: 'settings', ...stub('Settings') },
      ],
    },
  ],
})
