<script setup>
import { ref, computed } from 'vue'
import { useMockStore } from '../store/mockData'
import { useToast } from '../composables/useToast'

const store = useMockStore()
const { toast } = useToast()
const search = ref('')
const statusFilter = ref('all')

const statusLabel = { active: 'Active', invited: 'Invited', suspended: 'Suspended' }
const statusColor = { active: 'success', invited: 'running', suspended: 'danger' }

const filtered = computed(() => store.users.filter(u => {
  const matchesSearch = u.name.toLowerCase().includes(search.value.toLowerCase()) || u.email.toLowerCase().includes(search.value.toLowerCase())
  const matchesStatus = statusFilter.value === 'all' || u.status === statusFilter.value
  return matchesSearch && matchesStatus
}))

function toggleSuspend(u) {
  u.status = u.status === 'suspended' ? 'active' : 'suspended'
  toast({ title: `${u.name} ${u.status === 'suspended' ? 'suspended' : 'reactivated'}`, status: u.status === 'suspended' ? 'warning' : 'success' })
}
</script>

<template>
  <div class="flex items-center justify-between" style="margin-bottom: var(--space-6);">
    <div>
      <h1>Users</h1>
      <p class="text-slate" style="margin-top:4px;">{{ store.users.length }} people with access to ServiceOS.</p>
    </div>
    <button class="btn btn-primary">
      <svg class="icon icon-sm"><use href="#icon-plus" /></svg>
      Invite User
    </button>
  </div>

  <div class="filter-bar" style="margin-bottom: var(--space-5);">
    <label class="filter-search">
      <svg class="icon icon-sm icon-muted"><use href="#icon-search" /></svg>
      <input type="text" v-model="search" placeholder="Search by name or email…">
    </label>
    <button v-for="s in ['all','active','invited','suspended']" :key="s" class="filter-chip" :class="{ active: statusFilter === s }" @click="statusFilter = s">
      {{ s === 'all' ? 'All' : statusLabel[s] }}
    </button>
  </div>

  <div class="card" style="padding:0;">
    <table>
      <thead>
        <tr><th>Name</th><th>Role</th><th>Team</th><th>Status</th><th>Last active</th><th></th></tr>
      </thead>
      <tbody>
        <tr v-for="u in filtered" :key="u.id" :class="`status-${statusColor[u.status]}`">
          <td>
            <div class="flex items-center gap-3">
              <div class="avatar avatar-sm">{{ u.initials }}</div>
              <div>
                <div style="font-weight:500;">{{ u.name }}</div>
                <div class="text-xs text-slate">{{ u.email }}</div>
              </div>
            </div>
          </td>
          <td class="text-sm">{{ u.role }}</td>
          <td class="text-sm">{{ u.team }}</td>
          <td><span class="badge" :class="`status-${statusColor[u.status]}`">{{ statusLabel[u.status] }}</span></td>
          <td class="mono text-sm">{{ u.lastActive }}</td>
          <td>
            <button class="btn btn-ghost btn-sm" @click="toggleSuspend(u)">
              {{ u.status === 'suspended' ? 'Reactivate' : 'Suspend' }}
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <div v-if="!filtered.length" class="empty-state">
      <svg class="icon"><use href="#icon-users" /></svg>
      <h4>No users match</h4>
      <p>Try a different search term or clear the status filter.</p>
    </div>
  </div>
</template>
