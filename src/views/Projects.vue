<script setup>
import { ref, computed } from 'vue'
import { useMockStore } from '../store/mockData'

const store = useMockStore()
const search = ref('')
const statusFilter = ref('all')

const filtered = computed(() => store.projects.filter(p => {
  const matchesSearch = p.name.toLowerCase().includes(search.value.toLowerCase()) || p.client.toLowerCase().includes(search.value.toLowerCase())
  const matchesStatus = statusFilter.value === 'all' || p.status === statusFilter.value
  return matchesSearch && matchesStatus
}))

const statusLabel = { running: 'Running', success: 'Complete', warning: 'At risk', danger: 'Blocked', neutral: 'Not started' }
</script>

<template>
  <div class="flex items-center justify-between" style="margin-bottom: var(--space-6);">
    <div>
      <h1>Projects</h1>
      <p class="text-slate" style="margin-top:4px;">{{ store.projects.length }} projects across all clients.</p>
    </div>
    <button class="btn btn-primary">
      <svg class="icon icon-sm"><use href="#icon-plus" /></svg>
      New Project
    </button>
  </div>

  <div class="filter-bar" style="margin-bottom: var(--space-5);">
    <label class="filter-search">
      <svg class="icon icon-sm icon-muted"><use href="#icon-search" /></svg>
      <input type="text" v-model="search" placeholder="Search projects or clients…">
    </label>
    <button
      v-for="s in ['all', 'running', 'warning', 'success', 'danger', 'neutral']" :key="s"
      class="filter-chip" :class="{ active: statusFilter === s }"
      @click="statusFilter = s">
      {{ s === 'all' ? 'All' : statusLabel[s] }}
    </button>
  </div>

  <div class="card" style="padding:0;">
    <table class="table">
      <thead>
        <tr>
          <th>Project</th>
          <th>Client</th>
          <th>Owner</th>
          <th>Progress</th>
          <th>Due</th>
          <th>Budget</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="p in filtered" :key="p.id" :class="`status-${p.status}`">
          <td>
            <router-link :to="`/projects/${p.id}`" style="font-weight:500;">{{ p.name }}</router-link>
            <div class="text-xs text-slate mono">{{ p.id }}</div>
          </td>
          <td>{{ p.client }}</td>
          <td><span class="avatar avatar-sm">{{ p.owner }}</span></td>
          <td style="min-width:120px;">
            <div class="flex items-center gap-2">
              <div class="progress" style="flex:1;">
                <div class="progress-bar" :class="`status-${p.status}`" :style="{ width: p.progress + '%' }"></div>
              </div>
              <span class="text-xs mono">{{ p.progress }}%</span>
            </div>
          </td>
          <td class="mono text-sm">{{ p.due }}</td>
          <td class="mono text-sm">${{ p.budget.toLocaleString() }}</td>
          <td><span class="badge" :class="`status-${p.status}`">{{ statusLabel[p.status] }}</span></td>
        </tr>
      </tbody>
    </table>
    <div v-if="!filtered.length" class="empty-state">
      <svg class="icon"><use href="#icon-folder" /></svg>
      <h4>No projects match</h4>
      <p>Try a different search term or clear the status filter.</p>
    </div>
  </div>
</template>
