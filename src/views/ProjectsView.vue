<script setup>
import { ref, computed } from 'vue'

const projects = [
  { id: 'PRJ-1042', name: 'Client Onboarding', client: 'Acme Retail', status: 'running', label: 'Running', progress: 62, due: 'Due Aug 4', owners: ['PK', 'RD'], overflow: 2 },
  { id: 'PRJ-1039', name: 'Q3 Vendor Review', client: 'Northwind Logistics', status: 'warning', label: 'At risk', progress: 38, due: 'Due Jul 22', owners: ['SM', 'JT'] },
  { id: 'PRJ-1031', name: 'Vendor Sync Migration', client: 'Meridian Supply', status: 'danger', label: 'Blocked', progress: 21, due: 'Due Jul 19', owners: ['DN'] },
  { id: 'PRJ-1018', name: 'Brand Refresh', client: 'Solace Wellness', status: 'success', label: 'Complete', progress: 100, due: 'Closed Jul 10', owners: ['RB', 'PK'] },
  { id: 'PRJ-1044', name: 'Fleet Audit', client: 'Meridian Supply', status: 'running', label: 'Running', progress: 80, due: 'Due Jul 28', owners: ['JT', 'SM'] },
  { id: 'PRJ-1051', name: 'Loyalty Program Pilot', client: 'Acme Retail', status: 'neutral', label: 'Not started', progress: 0, due: 'Starts Aug 12', owners: ['RD'] },
]

const filters = [
  { key: 'all', label: 'All' },
  { key: 'running', label: 'Running' },
  { key: 'warning', label: 'At risk' },
  { key: 'danger', label: 'Blocked' },
  { key: 'success', label: 'Complete' },
]

const activeFilter = ref('all')
const query = ref('')
const view = ref('grid') // grid | table

const filtered = computed(() => projects.filter((p) => {
  const matchesFilter = activeFilter.value === 'all' || p.status === activeFilter.value
  const q = query.value.trim().toLowerCase()
  const matchesQuery = !q || `${p.name} ${p.client}`.toLowerCase().includes(q)
  return matchesFilter && matchesQuery
}))
</script>

<template>
  <div class="flex items-center justify-between" style="margin-bottom: var(--space-6);">
    <div>
      <h1>Projects</h1>
      <p class="text-slate" style="margin-top:4px;">24 active · 6 at risk · 3 blocked</p>
    </div>
    <AppButton variant="primary" icon="plus">New Project</AppButton>
  </div>

  <!-- FILTER BAR -->
  <div class="filter-bar">
    <label class="filter-search">
      <AppIcon name="search" size="sm" muted />
      <input v-model="query" type="text" placeholder="Filter by name or client…">
    </label>
    <button
      v-for="f in filters" :key="f.key"
      class="filter-chip" :class="{ active: activeFilter === f.key }"
      @click="activeFilter = f.key"
    >{{ f.label }}</button>
    <div class="header-spacer"></div>
    <div class="segmented">
      <button :class="{ active: view === 'grid' }" aria-label="Grid view" @click="view = 'grid'">
        <AppIcon name="grid" size="sm" />
      </button>
      <button :class="{ active: view === 'table' }" aria-label="Table view" @click="view = 'table'">
        <AppIcon name="list" size="sm" />
      </button>
    </div>
  </div>

  <!-- GRID VIEW -->
  <div v-if="view === 'grid'" class="grid grid-3">
    <router-link
      v-for="p in filtered" :key="p.id"
      class="card card-rail" :class="`status-${p.status}`"
      to="/projects/details"
    >
      <div class="card-header">
        <div>
          <div class="card-title">{{ p.name }}</div>
          <div class="card-subtitle">{{ p.client }}</div>
        </div>
        <StatusBadge :status="p.status">{{ p.label }}</StatusBadge>
      </div>
      <div class="progress" style="margin-bottom:var(--space-2);">
        <div class="progress-bar" :class="`status-${p.status}`" :style="{ width: p.progress + '%' }"></div>
      </div>
      <div class="flex items-center justify-between text-sm text-slate">
        <span>{{ p.progress }}% complete</span><span class="mono">{{ p.due }}</span>
      </div>
      <div class="flex items-center justify-between" style="margin-top:var(--space-4);">
        <div class="avatar-stack">
          <div v-for="o in p.owners" :key="o" class="avatar avatar-sm">{{ o }}</div>
          <div v-if="p.overflow" class="avatar avatar-sm avatar-overflow">+{{ p.overflow }}</div>
        </div>
        <span class="tag">{{ p.id }}</span>
      </div>
    </router-link>
    <p v-if="!filtered.length" class="text-slate">No projects match this filter.</p>
  </div>

  <!-- TABLE VIEW -->
  <div v-else class="table-wrap">
    <table class="table-responsive">
      <thead>
        <tr><th>Project</th><th>Client</th><th>Status</th><th>Progress</th><th>Owner</th><th>Due</th><th></th></tr>
      </thead>
      <tbody>
        <tr v-for="p in filtered" :key="p.id" :class="`status-${p.status}`">
          <td data-label="Project"><router-link to="/projects/details" style="color:var(--color-ink); font-weight:500;">{{ p.name }}</router-link></td>
          <td data-label="Client">{{ p.client }}</td>
          <td data-label="Status"><StatusBadge :status="p.status">{{ p.label }}</StatusBadge></td>
          <td data-label="Progress" class="mono">{{ p.progress }}%</td>
          <td data-label="Owner"><div class="avatar avatar-sm">{{ p.owners[0] }}</div></td>
          <td data-label="Due" class="mono">{{ p.due }}</td>
          <td><AppIcon name="chevron-right" size="sm" muted /></td>
        </tr>
        <tr v-if="!filtered.length"><td colspan="7" class="text-slate">No projects match this filter.</td></tr>
      </tbody>
    </table>
  </div>

  <div class="pagination">
    <span class="text-sm text-slate">Showing {{ filtered.length }} of 24 projects</span>
    <div class="pagination-pages">
      <button class="active">1</button>
      <button>2</button>
      <button>3</button>
      <button>4</button>
    </div>
  </div>
</template>
