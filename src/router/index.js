import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/login', name: 'login', component: () => import('../views/Login.vue'), meta: { layout: 'blank', title: 'Sign in' } },
  { path: '/', redirect: '/dashboard' },
  { path: '/dashboard', name: 'dashboard', component: () => import('../views/Dashboard.vue'), meta: { title: 'Dashboard', page: 'dashboard' } },
  { path: '/projects', name: 'projects', component: () => import('../views/Projects.vue'), meta: { title: 'Projects', page: 'projects' } },
  { path: '/projects/:id', name: 'project-details', component: () => import('../views/ProjectDetails.vue'), meta: { title: 'Project details', page: 'projects' } },
  { path: '/tasks', name: 'tasks', component: () => import('../views/Tasks.vue'), meta: { title: 'Tasks', page: 'tasks' } },
  { path: '/documents', name: 'documents', component: () => import('../views/Documents.vue'), meta: { title: 'Documents', page: 'documents' } },
  { path: '/workflow', name: 'workflow', component: () => import('../views/Workflow.vue'), meta: { title: 'Workflows', page: 'workflow' } },
  { path: '/workflow-designer', name: 'workflow-designer', component: () => import('../views/WorkflowDesigner.vue'), meta: { title: 'Workflow Designer', page: 'workflow-designer' } },
  { path: '/templates', name: 'templates', component: () => import('../views/Templates.vue'), meta: { title: 'Templates', page: 'templates' } },
  { path: '/users', name: 'users', component: () => import('../views/Users.vue'), meta: { title: 'Users', page: 'users' } },
  { path: '/vendors', name: 'vendors', component: () => import('../views/Vendors.vue'), meta: { title: 'Vendors', page: 'vendors' } },
  { path: '/clients', name: 'clients', component: () => import('../views/Clients.vue'), meta: { title: 'Clients', page: 'clients' } },
  { path: '/reports', name: 'reports', component: () => import('../views/Reports.vue'), meta: { title: 'Reports', page: 'reports' } },
  { path: '/analytics', name: 'analytics', component: () => import('../views/Analytics.vue'), meta: { title: 'Analytics', page: 'analytics' } },
  { path: '/chatbot', name: 'chatbot', component: () => import('../views/Chatbot.vue'), meta: { title: 'Chatbot', page: 'chatbot' } },
  { path: '/notifications', name: 'notifications', component: () => import('../views/Notifications.vue'), meta: { title: 'Notifications', page: 'notifications' } },
  { path: '/agent-studio', name: 'agent-studio', component: () => import('../views/AgentStudio.vue'), meta: { title: 'Agent Studio', page: 'agent-studio' } },
  { path: '/audit', name: 'audit', component: () => import('../views/Audit.vue'), meta: { title: 'Audit Log', page: 'audit' } },
  { path: '/settings', name: 'settings', component: () => import('../views/Settings.vue'), meta: { title: 'Settings', page: 'settings' } },
  { path: '/:pathMatch(.*)*', redirect: '/dashboard' }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  }
})

router.afterEach((to) => {
  document.title = to.meta.title ? `ServiceOS — ${to.meta.title}` : 'ServiceOS'
})

export default router
