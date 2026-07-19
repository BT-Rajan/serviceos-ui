<script setup>
import { ref, computed } from 'vue'
import { useMockStore } from '../store/mockData'

const store = useMockStore()
const search = ref('')
const statusFilter = ref('all')

const filtered = computed(() => store.workflows.filter(w => {
  const matchesSearch = w.name.toLowerCase().includes(search.value.toLowerCase())
  const matchesStatus = statusFilter.value === 'all' || w.status === statusFilter.value
  return matchesSearch && matchesStatus
}))

const statusLabel = { running: 'Running', warning: 'At risk', danger: 'Blocked', success: 'Complete', neutral: 'Not started' }

function stepState(w, i) {
  if (i < w.currentStep) return 'is-done'
  if (i === w.currentStep) return 'is-current'
  return ''
}
</script>

<template>
  <div class="flex items-center justify-between" style="margin-bottom: var(--space-6);">
    <div>
      <h1>Workflows</h1>
      <p class="text-slate" style="margin-top:4px;">{{ store.workflows.filter(w=>w.status==='running').length }} active · {{ store.workflows.filter(w=>w.status==='warning').length }} at risk · {{ store.workflows.filter(w=>w.status==='danger').length }} blocked</p>
    </div>
    <div class="flex gap-3">
      <router-link class="btn btn-secondary" to="/templates">
        <svg class="icon icon-sm"><use href="#icon-copy" /></svg>
        Templates
      </router-link>
      <router-link class="btn btn-primary" to="/workflow-designer">
        <svg class="icon icon-sm"><use href="#icon-plus" /></svg>
        New Workflow
      </router-link>
    </div>
  </div>

  <div class="grid grid-4" style="margin-bottom: var(--space-6);">
    <div class="card card-rail status-running">
      <div class="text-sm text-slate">Active Workflows</div>
      <div style="font-family:var(--font-display); font-size:var(--text-3xl); margin-top:var(--space-2);">{{ store.workflows.length }}</div>
      <div class="badge status-success" style="margin-top:var(--space-3);">+4 this week</div>
    </div>
    <div class="card card-rail status-neutral">
      <div class="text-sm text-slate">Avg Cycle Time</div>
      <div class="mono" style="font-family:var(--font-display); font-size:var(--text-3xl); margin-top:var(--space-2);">3.2d</div>
      <div class="badge status-success" style="margin-top:var(--space-3);">-0.4d vs last month</div>
    </div>
    <div class="card card-rail status-success">
      <div class="text-sm text-slate">Completion Rate</div>
      <div style="font-family:var(--font-display); font-size:var(--text-3xl); margin-top:var(--space-2);">94%</div>
      <div class="badge" style="margin-top:var(--space-3);">142 completed MTD</div>
    </div>
    <div class="card card-rail status-danger">
      <div class="text-sm text-slate">Blocked</div>
      <div style="font-family:var(--font-display); font-size:var(--text-3xl); margin-top:var(--space-2);">{{ store.workflows.filter(w=>w.status==='danger').length }}</div>
      <div class="badge status-danger" style="margin-top:var(--space-3);">Needs attention</div>
    </div>
  </div>

  <div class="filter-bar" style="margin-bottom: var(--space-5);">
    <label class="filter-search">
      <svg class="icon icon-sm icon-muted"><use href="#icon-search" /></svg>
      <input type="text" v-model="search" placeholder="Filter by workflow or client…">
    </label>
    <button v-for="s in ['all','running','warning','danger','success']" :key="s" class="filter-chip" :class="{ active: statusFilter === s }" @click="statusFilter = s">
      {{ s === 'all' ? 'All' : statusLabel[s] }}
    </button>
  </div>

  <div class="flex flex-col gap-4">
    <div v-for="w in filtered" :key="w.id" class="card card-rail" :class="`status-${w.status}`">
      <div class="wf-card-top">
        <div>
          <div class="card-title">{{ w.name }}</div>
          <div class="card-subtitle">{{ w.template }}</div>
        </div>
        <div class="flex items-center gap-3">
          <span class="badge" :class="`status-${w.status}`">{{ statusLabel[w.status] }}</span>
          <span class="tag">{{ w.id }}</span>
        </div>
      </div>
      <div class="wf-stepper">
        <template v-for="(step, i) in w.steps" :key="i">
          <div class="wf-step" :class="stepState(w, i)">
            <div class="wf-step-dot">
              <svg v-if="i < w.currentStep" class="icon icon-sm"><use href="#icon-check" /></svg>
              <template v-else>{{ i + 1 }}</template>
            </div>
            <div class="wf-step-label">{{ step }}</div>
          </div>
          <div v-if="i < w.steps.length - 1" class="wf-connector" :class="{ 'is-done': i < w.currentStep - 1 || (i < w.currentStep && i + 1 <= w.currentStep) }"></div>
        </template>
      </div>
      <div class="wf-card-footer">
        <div class="flex items-center gap-3 text-sm text-slate">
          <div class="avatar avatar-sm">{{ w.owner }}</div>
          <span>Started {{ w.started }} · Next: {{ w.steps[w.currentStep] || 'Complete' }}</span>
        </div>
        <button class="btn btn-secondary btn-sm">
          View details <svg class="icon icon-sm"><use href="#icon-chevron-right" /></svg>
        </button>
      </div>
    </div>
    <div v-if="!filtered.length" class="empty-state">
      <svg class="icon"><use href="#icon-git-branch" /></svg>
      <h4>No workflows match</h4>
      <p>Try a different search term or clear the status filter.</p>
    </div>
  </div>
</template>
