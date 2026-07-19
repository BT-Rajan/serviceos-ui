<script setup>
import { ref, computed } from 'vue'
import { useMockStore } from '../store/mockData'

const store = useMockStore()
const filter = ref('all')

const items = ref(store.notifications.map((n, i) => ({
  ...n,
  group: ['success', 'success'].includes(n.status) ? 'projects' : n.icon === 'truck' ? 'vendors' : n.icon === 'cpu' ? 'workflow' : 'projects',
  unread: i < 3
})))

const tabs = [
  { key: 'all', label: 'All' },
  { key: 'unread', label: 'Unread' },
  { key: 'projects', label: 'Projects' },
  { key: 'workflow', label: 'Workflow' },
  { key: 'vendors', label: 'Vendors' }
]

const filtered = computed(() => {
  if (filter.value === 'all') return items.value
  if (filter.value === 'unread') return items.value.filter(n => n.unread)
  return items.value.filter(n => n.group === filter.value)
})

const unreadCount = computed(() => items.value.filter(n => n.unread).length)

function markAllRead() {
  items.value.forEach(n => (n.unread = false))
}
</script>

<template>
  <div class="flex items-center justify-between" style="margin-bottom: var(--space-5); flex-wrap:wrap; gap:var(--space-3);">
    <div>
      <h1>Notifications</h1>
      <p class="text-slate" style="margin-top:4px;">{{ unreadCount }} unread</p>
    </div>
    <div class="flex gap-3">
      <button class="btn btn-secondary" @click="markAllRead"><svg class="icon icon-sm"><use href="#icon-check-square" /></svg>Mark all as read</button>
      <router-link to="/settings" class="btn btn-secondary"><svg class="icon icon-sm"><use href="#icon-settings" /></svg>Preferences</router-link>
    </div>
  </div>

  <div class="tabs">
    <button v-for="t in tabs" :key="t.key" class="tab" :class="{ active: filter === t.key }" @click="filter = t.key">
      {{ t.label }}
      <span v-if="t.key === 'all'" class="tab-count">{{ items.length }}</span>
      <span v-else-if="t.key === 'unread'" class="tab-count">{{ unreadCount }}</span>
    </button>
  </div>

  <div class="flex flex-col gap-2" style="margin-top: var(--space-4);">
    <div v-for="n in filtered" :key="n.id" class="card notif-item" :class="[`status-${n.status}`, { unread: n.unread }]">
      <svg class="icon icon-sm"><use :href="`#icon-${n.icon}`" /></svg>
      <div style="flex:1;">
        <div class="flex items-center justify-between">
          <div class="notif-item-title">{{ n.title }}</div>
          <span v-if="n.unread" style="width:8px;height:8px;border-radius:50%;background:var(--color-signal); flex-shrink:0;"></span>
        </div>
        <div class="notif-item-meta">{{ n.time }}</div>
      </div>
    </div>
    <div v-if="!filtered.length" class="empty-state">
      <svg class="icon"><use href="#icon-bell" /></svg>
      <h4>Nothing here</h4>
      <p>You're all caught up in this category.</p>
    </div>
  </div>
</template>
