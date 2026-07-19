<script setup>
import { ref, computed } from 'vue'
import { useMockStore } from '../store/mockData'

const store = useMockStore()
const search = ref('')
const statusFilter = ref('all')

const statusLabel = { active: 'Active', 'under-review': 'Under review', inactive: 'Inactive' }
const statusColor = { active: 'success', 'under-review': 'warning', inactive: 'neutral' }

const filtered = computed(() => store.vendors.filter(v => {
  const matchesSearch = v.name.toLowerCase().includes(search.value.toLowerCase()) || v.category.toLowerCase().includes(search.value.toLowerCase())
  const matchesStatus = statusFilter.value === 'all' || v.status === statusFilter.value
  return matchesSearch && matchesStatus
}))
</script>

<template>
  <div class="flex items-center justify-between" style="margin-bottom: var(--space-6);">
    <div>
      <h1>Vendors</h1>
      <p class="text-slate" style="margin-top:4px;">{{ store.vendors.length }} vendors · ${{ store.vendors.reduce((s,v)=>s+v.spend,0).toLocaleString() }} total spend YTD</p>
    </div>
    <button class="btn btn-primary">
      <svg class="icon icon-sm"><use href="#icon-plus" /></svg>
      Add Vendor
    </button>
  </div>

  <div class="filter-bar" style="margin-bottom: var(--space-5);">
    <label class="filter-search">
      <svg class="icon icon-sm icon-muted"><use href="#icon-search" /></svg>
      <input type="text" v-model="search" placeholder="Search by vendor or category…">
    </label>
    <button v-for="s in ['all','active','under-review','inactive']" :key="s" class="filter-chip" :class="{ active: statusFilter === s }" @click="statusFilter = s">
      {{ s === 'all' ? 'All' : statusLabel[s] }}
    </button>
  </div>

  <div class="grid grid-3">
    <div v-for="v in filtered" :key="v.id" class="card card-rail" :class="`status-${statusColor[v.status]}`">
      <div class="card-header">
        <div class="flex items-center gap-3">
          <div class="avatar" style="background:var(--color-signal-soft); color:var(--color-signal);">
            <svg class="icon icon-sm"><use href="#icon-truck" /></svg>
          </div>
          <div><div class="card-title">{{ v.name }}</div><div class="card-subtitle">{{ v.category }}</div></div>
        </div>
        <span class="badge" :class="`status-${statusColor[v.status]}`">{{ statusLabel[v.status] }}</span>
      </div>
      <div class="info-row"><span class="label">Contact</span><span class="value">{{ v.contact }}</span></div>
      <div class="info-row">
        <span class="label">Rating</span>
        <span class="value flex items-center gap-1">
          <svg class="icon icon-sm" style="color:var(--status-warning);"><use href="#icon-star" /></svg>{{ v.rating }}
        </span>
      </div>
      <div class="info-row"><span class="label">Spend YTD</span><span class="value mono">${{ v.spend.toLocaleString() }}</span></div>
      <button class="btn btn-secondary" style="width:100%; margin-top:var(--space-4);">View vendor</button>
    </div>
    <div v-if="!filtered.length" class="empty-state" style="grid-column: 1 / -1;">
      <svg class="icon"><use href="#icon-truck" /></svg>
      <h4>No vendors match</h4>
      <p>Try a different search term or clear the status filter.</p>
    </div>
  </div>
</template>
