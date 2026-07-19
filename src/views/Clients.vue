<script setup>
import { ref, computed } from 'vue'
import { useMockStore } from '../store/mockData'

const store = useMockStore()
const search = ref('')
const statusFilter = ref('all')
const view = ref('grid')

const statusLabel = { success: 'Active', warning: 'At risk', neutral: 'Inactive', running: 'Active', danger: 'At risk' }

function initials(name) {
  return name.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase()
}

const filtered = computed(() => store.clients.filter(c => {
  const matchesSearch = c.name.toLowerCase().includes(search.value.toLowerCase()) || c.industry.toLowerCase().includes(search.value.toLowerCase())
  const matchesStatus = statusFilter.value === 'all' || c.status === statusFilter.value
  return matchesSearch && matchesStatus
}))
</script>

<template>
  <div class="flex items-center justify-between" style="margin-bottom: var(--space-6);">
    <div>
      <h1>Clients</h1>
      <p class="text-slate" style="margin-top:4px;">{{ store.clients.length }} clients · {{ store.clients.filter(c => c.status !== 'neutral').length }} active engagements</p>
    </div>
    <button class="btn btn-primary">
      <svg class="icon icon-sm"><use href="#icon-plus" /></svg>
      New Client
    </button>
  </div>

  <div class="filter-bar" style="margin-bottom: var(--space-5);">
    <label class="filter-search">
      <svg class="icon icon-sm icon-muted"><use href="#icon-search" /></svg>
      <input type="text" v-model="search" placeholder="Filter by client or industry…">
    </label>
    <button v-for="s in ['all','success','warning','neutral']" :key="s" class="filter-chip" :class="{ active: statusFilter === s }" @click="statusFilter = s">
      {{ s === 'all' ? 'All' : statusLabel[s] }}
    </button>
    <div class="header-spacer"></div>
    <div class="segmented">
      <button :class="{ active: view === 'grid' }" aria-label="Grid view" @click="view = 'grid'"><svg class="icon icon-sm"><use href="#icon-grid" /></svg></button>
      <button :class="{ active: view === 'table' }" aria-label="Table view" @click="view = 'table'"><svg class="icon icon-sm"><use href="#icon-list" /></svg></button>
    </div>
  </div>

  <div v-if="view === 'grid'" class="grid grid-3">
    <div v-for="c in filtered" :key="c.id" class="card card-rail" :class="`status-${c.status}`">
      <div class="card-header">
        <div class="flex items-center gap-3">
          <div class="avatar" :style="{ background: `var(--status-${c.status}-soft)`, color: `var(--status-${c.status})` }">{{ initials(c.name) }}</div>
          <div><div class="card-title">{{ c.name }}</div><div class="card-subtitle">{{ c.industry }}</div></div>
        </div>
        <span class="badge" :class="`status-${c.status}`">{{ statusLabel[c.status] }}</span>
      </div>
      <div class="info-row"><span class="label">Tier</span><span class="value">{{ c.tier }}</span></div>
      <div class="info-row"><span class="label">Owner</span><span class="value">{{ c.owner }}</span></div>
      <div class="info-row"><span class="label">Active projects</span><span class="value">{{ c.projects }}</span></div>
      <div class="info-row"><span class="label">MRR</span><span class="value mono">${{ c.mrr.toLocaleString() }}</span></div>
      <button class="btn btn-secondary" style="width:100%; margin-top:var(--space-4);">View client</button>
    </div>
    <div v-if="!filtered.length" class="empty-state" style="grid-column: 1 / -1;">
      <svg class="icon"><use href="#icon-briefcase" /></svg>
      <h4>No clients match</h4>
      <p>Try a different search term or clear the status filter.</p>
    </div>
  </div>

  <div v-else class="card" style="padding:0;">
    <table class="table">
      <thead>
        <tr><th>Client</th><th>Industry</th><th>Tier</th><th>Owner</th><th>Projects</th><th>MRR</th><th>Status</th></tr>
      </thead>
      <tbody>
        <tr v-for="c in filtered" :key="c.id" :class="`status-${c.status}`">
          <td style="font-weight:500;">{{ c.name }}</td>
          <td class="text-sm">{{ c.industry }}</td>
          <td class="text-sm">{{ c.tier }}</td>
          <td><span class="avatar avatar-sm">{{ c.owner }}</span></td>
          <td>{{ c.projects }}</td>
          <td class="mono text-sm">${{ c.mrr.toLocaleString() }}</td>
          <td><span class="badge" :class="`status-${c.status}`">{{ statusLabel[c.status] }}</span></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
