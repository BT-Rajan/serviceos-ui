<script setup>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useTheme } from '../composables/useTheme'
import { useLang } from '../composables/useLang'
import { useSidebar } from '../composables/useSidebar'
import { useToast } from '../composables/useToast'
import { useMockStore } from '../store/mockData'
import IconSprite from '../components/IconSprite.vue'
import ToastStack from '../components/ToastStack.vue'

const route = useRoute()
const router = useRouter()
const { theme, toggle: toggleTheme } = useTheme()
const { toggle: toggleLang } = useLang()
const { collapsed, mobileOpen, toggleCollapsed, toggleMobile, closeMobile } = useSidebar()
const { toast } = useToast()
const store = useMockStore()

const notifOpen = ref(false)
const userMenuOpen = ref(false)
const notifDismissed = ref(false)

const activePage = computed(() => route.meta.page)
const searchInput = ref(null)

function onGlobalKeydown(e) {
  if (e.key === '/' && document.activeElement !== searchInput.value) {
    e.preventDefault()
    searchInput.value?.focus()
  }
  if (e.key === 'Escape' && document.activeElement === searchInput.value) {
    searchInput.value?.blur()
  }
}

function markAllRead() {
  notifDismissed.value = true
  notifOpen.value = false
}

function logout() {
  userMenuOpen.value = false
  router.push('/login')
}

function onNavClick() {
  closeMobile()
}

window.addEventListener('keydown', onGlobalKeydown)
window.addEventListener('click', () => {
  notifOpen.value = false
  userMenuOpen.value = false
})

setTimeout(() => {
  toast({ title: 'Welcome back, Rukmani', message: '3 tasks are due today.', status: 'running' })
}, 600)
</script>

<template>
  <IconSprite />
  <div class="app-shell" :class="{ 'sidebar-collapsed': collapsed }">
    <aside class="app-sidebar" :class="{ open: mobileOpen }">
      <div class="sidebar-brand">
        <span class="dot"></span>
        <span>ServiceOS</span>
      </div>

      <nav class="sidebar-nav">
        <div class="sidebar-group-label">Overview</div>
        <router-link class="nav-item" :class="{ active: activePage === 'dashboard' }" to="/dashboard" @click="onNavClick">
          <svg class="icon"><use href="#icon-grid" /></svg><span>Dashboard</span>
        </router-link>

        <div class="sidebar-group-label">Work</div>
        <router-link class="nav-item" :class="{ active: activePage === 'projects' }" to="/projects" @click="onNavClick">
          <svg class="icon"><use href="#icon-folder" /></svg><span>Projects</span>
        </router-link>
        <router-link class="nav-item" :class="{ active: activePage === 'tasks' }" to="/tasks" @click="onNavClick">
          <svg class="icon"><use href="#icon-check-square" /></svg><span>Tasks</span>
        </router-link>
        <router-link class="nav-item" :class="{ active: activePage === 'documents' }" to="/documents" @click="onNavClick">
          <svg class="icon"><use href="#icon-file" /></svg><span>Documents</span>
        </router-link>

        <div class="sidebar-group-label">Workflow</div>
        <router-link class="nav-item" :class="{ active: activePage === 'workflow' }" to="/workflow" @click="onNavClick">
          <svg class="icon"><use href="#icon-git-branch" /></svg><span>Workflows</span>
        </router-link>
        <router-link class="nav-item" :class="{ active: activePage === 'workflow-designer' }" to="/workflow-designer" @click="onNavClick">
          <svg class="icon"><use href="#icon-layout" /></svg><span>Workflow Designer</span>
        </router-link>
        <router-link class="nav-item" :class="{ active: activePage === 'templates' }" to="/templates" @click="onNavClick">
          <svg class="icon"><use href="#icon-copy" /></svg><span>Templates</span>
        </router-link>

        <div class="sidebar-group-label">People</div>
        <router-link class="nav-item" :class="{ active: activePage === 'users' }" to="/users" @click="onNavClick">
          <svg class="icon"><use href="#icon-users" /></svg><span>Users</span>
        </router-link>
        <router-link class="nav-item" :class="{ active: activePage === 'vendors' }" to="/vendors" @click="onNavClick">
          <svg class="icon"><use href="#icon-truck" /></svg><span>Vendors</span>
        </router-link>
        <router-link class="nav-item" :class="{ active: activePage === 'clients' }" to="/clients" @click="onNavClick">
          <svg class="icon"><use href="#icon-briefcase" /></svg><span>Clients</span>
        </router-link>

        <div class="sidebar-group-label">Insights</div>
        <router-link class="nav-item" :class="{ active: activePage === 'reports' }" to="/reports" @click="onNavClick">
          <svg class="icon"><use href="#icon-bar-chart" /></svg><span>Reports</span>
        </router-link>
        <router-link class="nav-item" :class="{ active: activePage === 'analytics' }" to="/analytics" @click="onNavClick">
          <svg class="icon"><use href="#icon-trending-up" /></svg><span>Analytics</span>
        </router-link>

        <div class="sidebar-group-label">Communication</div>
        <router-link class="nav-item" :class="{ active: activePage === 'chatbot' }" to="/chatbot" @click="onNavClick">
          <svg class="icon"><use href="#icon-message-circle" /></svg><span>Chatbot</span>
        </router-link>
        <router-link class="nav-item" :class="{ active: activePage === 'notifications' }" to="/notifications" @click="onNavClick">
          <svg class="icon"><use href="#icon-bell" /></svg><span>Notifications</span>
        </router-link>

        <div class="sidebar-group-label">Administration</div>
        <router-link class="nav-item" :class="{ active: activePage === 'agent-studio' }" to="/agent-studio" @click="onNavClick">
          <svg class="icon"><use href="#icon-cpu" /></svg><span>Agent Studio</span>
        </router-link>
        <router-link class="nav-item" :class="{ active: activePage === 'audit' }" to="/audit" @click="onNavClick">
          <svg class="icon"><use href="#icon-shield" /></svg><span>Audit Log</span>
        </router-link>
        <router-link class="nav-item" :class="{ active: activePage === 'settings' }" to="/settings" @click="onNavClick">
          <svg class="icon"><use href="#icon-settings" /></svg><span>Settings</span>
        </router-link>
      </nav>

      <div class="sidebar-footer">
        <button class="nav-item" style="width:100%;" @click="toggleCollapsed">
          <svg class="icon icon-directional"><use href="#icon-chevrons-left" /></svg>
          <span>Collapse</span>
        </button>
      </div>
    </aside>

    <header class="app-header">
      <button class="header-toggle" aria-label="Toggle sidebar" @click.stop="toggleMobile">
        <svg class="icon"><use href="#icon-menu" /></svg>
      </button>

      <label class="header-search">
        <svg class="icon icon-muted"><use href="#icon-search" /></svg>
        <input ref="searchInput" type="text" placeholder="Search projects, tasks, clients…">
        <kbd>/</kbd>
      </label>

      <div class="header-spacer"></div>

      <div class="header-actions">
        <button class="icon-button" aria-label="Toggle theme" @click="toggleTheme">
          <svg class="icon"><use :href="theme === 'dark' ? '#icon-sun' : '#icon-moon'" /></svg>
        </button>

        <button class="icon-button" aria-label="Toggle language" @click="toggleLang">
          <svg class="icon"><use href="#icon-globe" /></svg>
        </button>

        <div class="dropdown">
          <button class="icon-button" aria-label="Notifications" @click.stop="notifOpen = !notifOpen; userMenuOpen = false">
            <svg class="icon"><use href="#icon-bell" /></svg>
            <span v-if="!notifDismissed" class="notif-dot"></span>
          </button>
          <div class="dropdown-panel wide" :class="{ open: notifOpen }" @click.stop>
            <div class="dropdown-header">
              <span>Notifications</span>
              <button class="btn btn-ghost btn-sm" @click="markAllRead">Mark all read</button>
            </div>
            <div>
              <div v-for="n in store.notifications.slice(0, 5)" :key="n.id" class="notif-item" :class="`status-${n.status}`">
                <svg class="icon icon-sm icon-muted"><use :href="`#icon-${n.icon || 'bell'}`" /></svg>
                <div>
                  <div class="notif-item-title">{{ n.title }}</div>
                  <div class="notif-item-meta">{{ n.time }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="dropdown">
          <button class="user-menu-trigger" @click.stop="userMenuOpen = !userMenuOpen; notifOpen = false">
            <div class="avatar avatar-sm">{{ store.currentUser.initials }}</div>
            <svg class="icon icon-sm icon-muted"><use href="#icon-chevron-down" /></svg>
          </button>
          <div class="dropdown-panel" :class="{ open: userMenuOpen }" @click.stop>
            <div class="dropdown-header">{{ store.currentUser.name }}</div>
            <button class="dropdown-item"><svg class="icon icon-sm"><use href="#icon-user" /></svg>Profile</button>
            <router-link class="dropdown-item" to="/settings" @click="userMenuOpen = false">
              <svg class="icon icon-sm"><use href="#icon-settings" /></svg>Settings
            </router-link>
            <div class="dropdown-divider"></div>
            <button class="dropdown-item" @click="logout">
              <svg class="icon icon-sm"><use href="#icon-log-out" /></svg>Log out
            </button>
          </div>
        </div>
      </div>
    </header>

    <main class="app-main">
      <router-view />
    </main>
  </div>

  <ToastStack />
</template>
