<script setup>
import { ref } from 'vue'
import { useMockStore } from '../store/mockData'
import { useTheme } from '../composables/useTheme'
import { useLang } from '../composables/useLang'
import { useToast } from '../composables/useToast'

const store = useMockStore()
const { theme, toggle: toggleTheme } = useTheme()
const { lang, toggle: toggleLang } = useLang()
const { toast } = useToast()

const tab = ref('profile')
const notifPrefs = ref({ email: true, push: true, digest: false, mentions: true })

function savePrefs() {
  toast({ title: 'Preferences saved', status: 'success' })
}
</script>

<template>
  <div class="flex items-center justify-between" style="margin-bottom: var(--space-6);">
    <div>
      <h1>Settings</h1>
      <p class="text-slate" style="margin-top:4px;">Manage your profile, appearance, and notification preferences.</p>
    </div>
  </div>

  <div class="tabs">
    <button class="tab" :class="{ active: tab === 'profile' }" @click="tab = 'profile'">Profile</button>
    <button class="tab" :class="{ active: tab === 'appearance' }" @click="tab = 'appearance'">Appearance</button>
    <button class="tab" :class="{ active: tab === 'notifications' }" @click="tab = 'notifications'">Notifications</button>
    <button class="tab" :class="{ active: tab === 'security' }" @click="tab = 'security'">Security</button>
  </div>

  <div v-if="tab === 'profile'" class="card" style="max-width:560px;">
    <div class="flex items-center gap-4" style="margin-bottom: var(--space-5);">
      <div class="avatar avatar-lg">{{ store.currentUser.initials }}</div>
      <div>
        <div style="font-weight:600;">{{ store.currentUser.name }}</div>
        <div class="text-sm text-slate">{{ store.currentUser.role }}</div>
      </div>
    </div>
    <div class="field">
      <label class="field-label">Full name</label>
      <input class="input" type="text" :value="store.currentUser.name">
    </div>
    <div class="field">
      <label class="field-label">Email</label>
      <input class="input" type="email" :value="store.currentUser.email">
    </div>
    <div class="field">
      <label class="field-label">Role</label>
      <input class="input" type="text" :value="store.currentUser.role" disabled>
    </div>
    <button class="btn btn-primary" @click="savePrefs">Save changes</button>
  </div>

  <div v-else-if="tab === 'appearance'" class="card" style="max-width:560px;">
    <div class="info-row">
      <span class="label">Theme</span>
      <button class="btn btn-secondary btn-sm" @click="toggleTheme">
        <svg class="icon icon-sm"><use :href="theme === 'dark' ? '#icon-sun' : '#icon-moon'" /></svg>
        {{ theme === 'dark' ? 'Dark' : 'Light' }}
      </button>
    </div>
    <div class="info-row">
      <span class="label">Language / direction</span>
      <button class="btn btn-secondary btn-sm" @click="toggleLang">
        <svg class="icon icon-sm"><use href="#icon-globe" /></svg>
        {{ lang === 'ar' ? 'العربية (RTL)' : 'English (LTR)' }}
      </button>
    </div>
  </div>

  <div v-else-if="tab === 'notifications'" class="card" style="max-width:560px;">
    <label class="checkbox" style="display:flex; margin-bottom: var(--space-4);">
      <input type="checkbox" v-model="notifPrefs.email"> Email notifications
    </label>
    <label class="checkbox" style="display:flex; margin-bottom: var(--space-4);">
      <input type="checkbox" v-model="notifPrefs.push"> Push notifications
    </label>
    <label class="checkbox" style="display:flex; margin-bottom: var(--space-4);">
      <input type="checkbox" v-model="notifPrefs.digest"> Weekly digest email
    </label>
    <label class="checkbox" style="display:flex; margin-bottom: var(--space-5);">
      <input type="checkbox" v-model="notifPrefs.mentions"> Notify me on @mentions
    </label>
    <button class="btn btn-primary" @click="savePrefs">Save preferences</button>
  </div>

  <div v-else class="card" style="max-width:560px;">
    <div class="info-row"><span class="label">Password</span><button class="btn btn-secondary btn-sm">Change password</button></div>
    <div class="info-row"><span class="label">Two-factor authentication</span><span class="badge status-success">Enabled</span></div>
    <div class="info-row"><span class="label">Active sessions</span><span class="value">2 devices</span></div>
    <div class="info-row"><span class="label">API keys</span><button class="btn btn-secondary btn-sm">Manage</button></div>
  </div>
</template>
