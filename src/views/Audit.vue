<script setup>
import { ref, computed } from 'vue'
import { useMockStore } from '../store/mockData'

const store = useMockStore()
const search = ref('')
const statusFilter = ref('all')

const statusLabel = { success: 'Success', warning: 'Attention', danger: 'Failed', running: 'In progress', neutral: 'Info' }

const filtered = computed(() => store.auditLog.filter(a => {
  const matchesSearch = a.action.toLowerCase().includes(search.value.toLowerCase()) || a.actor.toLowerCase().includes(search.value.toLowerCase())
  const matchesStatus = statusFilter.value === 'all' || a.status === statusFilter.value
  return matchesSearch && matchesStatus
}))
</script>

<template>
  <div class="flex items-center justify-between" style="margin-bottom: var(--space-6);">
    <div>
      <h1>Audit Log</h1>
      <p class="text-slate" style="margin-top:4px;">Full change history across projects, users, and permissions.</p>
    </div>
    <button class="btn btn-secondary">
      <svg class="icon icon-sm"><use href="#icon-download" /></svg>
      Export CSV
    </button>
  </div>

  <div class="filter-bar" style="margin-bottom: var(--space-5);">
    <label class="filter-search">
      <svg class="icon icon-sm icon-muted"><use href="#icon-search" /></svg>
      <input type="text" v-model="search" placeholder="Search by actor or action…">
    </label>
    <button v-for="s in ['all','success','warning','danger','running']" :key="s" class="filter-chip" :class="{ active: statusFilter === s }" @click="statusFilter = s">
      {{ s === 'all' ? 'All' : statusLabel[s] }}
    </button>
  </div>

  <div class="card" style="padding:0;">
    <table>
      <thead>
        <tr><th>Actor</th><th>Action</th><th>Time</th><th>Status</th></tr>
      </thead>
      <tbody>
        <tr v-for="a in filtered" :key="a.id" :class="`status-${a.status}`">
          <td>
            <div class="flex items-center gap-2">
              <svg class="icon icon-sm icon-muted"><use :href="a.actor === 'System' ? '#icon-cpu' : '#icon-user'" /></svg>
              {{ a.actor }}
            </div>
          </td>
          <td>{{ a.action }}</td>
          <td class="mono text-sm">{{ a.time }}</td>
          <td><span class="badge" :class="`status-${a.status}`">{{ statusLabel[a.status] }}</span></td>
        </tr>
      </tbody>
    </table>
    <div v-if="!filtered.length" class="empty-state">
      <svg class="icon"><use href="#icon-shield" /></svg>
      <h4>No events match</h4>
      <p>Try a different search term or clear the status filter.</p>
    </div>
  </div>
</template>
