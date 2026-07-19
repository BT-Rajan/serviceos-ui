<script setup>
import { ref, computed } from 'vue'

const kpis = [
  { label: 'Active Workflows', value: '18', status: 'running', badge: '+4 this week', badgeStatus: 'success' },
  { label: 'Avg Cycle Time', value: '3.2d', status: 'neutral', badge: '-0.4d vs last month', badgeStatus: 'success', mono: true },
  { label: 'Completion Rate', value: '94%', status: 'success', badge: '142 completed MTD', badgeStatus: 'neutral' },
  { label: 'Blocked', value: '1', status: 'danger', badge: 'Needs attention', badgeStatus: 'danger' },
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

const workflows = [
  {
    id: 'wf1', code: 'WF-2201', title: 'Client Onboarding', client: 'Acme Retail', status: 'running', label: 'Running',
    owner: 'PK', meta: 'Started Jul 14 · Next: Kickoff call with client stakeholders',
    steps: [
      { label: 'Intake', state: 'done', meta: 'Completed Jul 14, 9:02 AM · Priya K.' },
      { label: 'Contract', state: 'done', meta: 'Completed Jul 15, 3:40 PM · Priya K.' },
      { label: 'Kickoff Call', state: 'current', meta: 'In progress · scheduled Jul 21, 10:00 AM' },
      { label: 'Setup', state: '', meta: 'Not started' },
      { label: 'Go-Live', state: '', meta: 'Not started' },
    ],
  },
  {
    id: 'wf2', code: 'WF-2188', title: 'Vendor Onboarding', client: 'Meridian Supply', status: 'danger', label: 'Blocked',
    owner: 'DN', meta: 'Started Jul 10 · Blocked: missing insurance certificate',
    steps: [
      { label: 'Application', state: 'done', meta: 'Completed Jul 10, 11:15 AM · Dinesh N.' },
      { label: 'Compliance Check', state: 'current', danger: true, meta: 'Blocked · missing insurance certificate since Jul 12' },
      { label: 'Contract', state: '', meta: 'Not started' },
      { label: 'Sync to ERP', state: '', meta: 'Not started' },
    ],
  },
  {
    id: 'wf3', code: 'WF-2214', title: 'Invoice Approval', client: 'Northwind Logistics', status: 'warning', label: 'At risk',
    owner: 'SM', meta: 'Started Jul 16 · Awaiting finance sign-off, 2 days overdue',
    steps: [
      { label: 'Submitted', state: 'done', meta: 'Completed Jul 16, 8:30 AM · System' },
      { label: 'Manager Review', state: 'done', meta: 'Completed Jul 16, 4:12 PM · Sara M.' },
      { label: 'Finance Review', state: 'current', meta: 'In progress · 2 days overdue' },
      { label: 'Payment', state: '', meta: 'Not started' },
    ],
  },
  {
    id: 'wf4', code: 'WF-2219', title: 'Project Kickoff', client: 'Acme Retail', status: 'running', label: 'Running',
    owner: 'JT', meta: 'Started Jul 17 · Next: assign delivery team',
    steps: [
      { label: 'Discovery', state: 'done', meta: 'Completed Jul 17, 1:00 PM · Jamie T.' },
      { label: 'Resource Allocation', state: 'current', meta: 'In progress · assigning delivery team' },
      { label: 'Kickoff Meeting', state: '', meta: 'Not started' },
      { label: 'Charter Sign-off', state: '', meta: 'Not started' },
    ],
  },
  {
    id: 'wf5', code: 'WF-2223', title: 'Vendor Sync', client: 'Falcon Industries', status: 'running', label: 'Running',
    owner: 'PK', meta: 'Started Jul 18 · Next: automated field validation',
    steps: [
      { label: 'Request', state: 'done', meta: 'Completed Jul 18, 7:45 AM · System' },
      { label: 'Validate', state: 'current', meta: 'In progress · automated field validation' },
      { label: 'Sync', state: '', meta: 'Not started' },
      { label: 'Confirm', state: '', meta: 'Not started' },
    ],
  },
  {
    id: 'wf6', code: 'WF-2179', title: 'Contract Renewal', client: 'Solace Wellness', status: 'success', label: 'Complete',
    owner: 'RB', meta: 'Closed Jul 15 · Renewed for 12 months',
    steps: [
      { label: 'Draft', state: 'done', meta: 'Completed Jul 11 · Rajan B.' },
      { label: 'Legal Review', state: 'done', meta: 'Completed Jul 12 · Rajan B.' },
      { label: 'Client Signature', state: 'done', meta: 'Completed Jul 14 · Client' },
      { label: 'Archived', state: 'done', meta: 'Completed Jul 15 · System' },
    ],
  },
]

const filtered = computed(() => workflows.filter((w) => {
  const matchesFilter = activeFilter.value === 'all' || w.status === activeFilter.value
  const q = query.value.trim().toLowerCase()
  const matchesQuery = !q || `${w.title} ${w.client}`.toLowerCase().includes(q)
  return matchesFilter && matchesQuery
}))

// Drawer state
const drawerOpen = ref(false)
const activeWf = ref(null)
const openDrawer = (wf) => { activeWf.value = wf; drawerOpen.value = true }
const closeDrawer = () => { drawerOpen.value = false }

// Lightweight local toast, mirrors the original ServiceOSToast prototype behavior
const toast = ref(null)
let toastTimer = null
function showToast(title, message, status) {
  clearTimeout(toastTimer)
  toast.value = { title, message, status }
  toastTimer = setTimeout(() => { toast.value = null }, 3200)
}
</script>

<template>
  <div class="flex items-center justify-between" style="margin-bottom: var(--space-6);">
    <div>
      <h1>Workflows</h1>
      <p class="text-slate" style="margin-top:4px;">18 active · 1 at risk · 1 blocked</p>
    </div>
    <div class="flex gap-3">
      <router-link class="btn btn-secondary" to="/templates"><AppIcon name="copy" size="sm" />Templates</router-link>
      <router-link class="btn btn-primary" to="/workflow-designer"><AppIcon name="plus" size="sm" />New Workflow</router-link>
    </div>
  </div>

  <!-- KPI ROW -->
  <div class="grid grid-4" style="margin-bottom: var(--space-6);">
    <AppCard v-for="k in kpis" :key="k.label" :status="k.status">
      <div class="text-sm text-slate">{{ k.label }}</div>
      <div :class="k.mono && 'mono'" style="font-family:var(--font-display); font-size:var(--text-3xl); margin-top:var(--space-2);">{{ k.value }}</div>
      <StatusBadge :status="k.badgeStatus" style="margin-top:var(--space-3);">{{ k.badge }}</StatusBadge>
    </AppCard>
  </div>

  <!-- FILTER BAR -->
  <div class="filter-bar">
    <label class="filter-search">
      <AppIcon name="search" size="sm" muted />
      <input v-model="query" type="text" placeholder="Filter by workflow or client…">
    </label>
    <button
      v-for="f in filters" :key="f.key"
      class="filter-chip" :class="{ active: activeFilter === f.key }"
      @click="activeFilter = f.key"
    >{{ f.label }}</button>
  </div>

  <!-- WORKFLOW INSTANCE LIST -->
  <div v-if="filtered.length">
    <div v-for="wf in filtered" :key="wf.id" class="card card-rail wf-card" :class="`status-${wf.status}`">
      <div class="wf-card-top">
        <div>
          <div class="card-title">{{ wf.title }}</div>
          <div class="card-subtitle">{{ wf.client }}</div>
        </div>
        <div class="flex items-center gap-3">
          <StatusBadge :status="wf.status">{{ wf.label }}</StatusBadge>
          <span class="tag">{{ wf.code }}</span>
        </div>
      </div>
      <WfStepper :steps="wf.steps" />
      <div class="wf-card-footer">
        <div class="flex items-center gap-3 text-sm text-slate">
          <div class="avatar avatar-sm">{{ wf.owner }}</div>
          <span>{{ wf.meta }}</span>
        </div>
        <AppButton size="sm" @click="openDrawer(wf)">
          View details <AppIcon name="chevron-right" size="sm" directional />
        </AppButton>
      </div>
    </div>
  </div>

  <!-- EMPTY STATE -->
  <div v-else class="empty-state">
    <AppIcon name="git-branch" />
    <h4>No workflows match</h4>
    <p>Try a different filter or search term, or start a new workflow from a template.</p>
    <router-link class="btn btn-primary" to="/templates"><AppIcon name="copy" size="sm" />Browse Templates</router-link>
  </div>

  <!-- WORKFLOW DETAIL DRAWER -->
  <div class="wf-drawer-backdrop" :class="{ open: drawerOpen }" @click="closeDrawer"></div>
  <aside class="drawer wf-drawer" :class="{ open: drawerOpen }" :aria-hidden="!drawerOpen">
    <template v-if="activeWf">
      <div class="modal-header">
        <div>
          <div class="card-title">{{ activeWf.title }}</div>
          <div class="card-subtitle">{{ activeWf.client }}</div>
        </div>
        <button class="icon-button" aria-label="Close" @click="closeDrawer"><AppIcon name="x" /></button>
      </div>
      <div class="flex items-center gap-3" style="margin-bottom: var(--space-5);">
        <StatusBadge :status="activeWf.status">{{ activeWf.label }}</StatusBadge>
        <span class="tag">{{ activeWf.code }}</span>
      </div>
      <div class="card-title" style="font-size:var(--text-base); margin-bottom:var(--space-2);">Stage timeline</div>
      <div>
        <div v-for="s in activeWf.steps" :key="s.label" class="wf-timeline-item" :class="s.state && `is-${s.state}`">
          <div class="wf-timeline-dot"></div>
          <div>
            <div style="font-size:var(--text-sm); font-weight:500;">{{ s.label }}</div>
            <div class="text-xs text-slate" style="margin-top:2px;">{{ s.meta }}</div>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <AppButton variant="danger" @click="showToast('Cancel Workflow', 'This is a prototype — no workflow was cancelled.', 'danger')">Cancel Workflow</AppButton>
        <AppButton variant="primary" @click="showToast('Advance Stage', 'This is a prototype — no stage was advanced.', 'running')">Advance Stage</AppButton>
      </div>
    </template>
  </aside>

  <!-- TOAST -->
  <div class="toast-stack">
    <div v-if="toast" class="toast" :class="`status-${toast.status}`">
      <div style="font-weight:500;">{{ toast.title }}</div>
      <div class="text-sm text-slate">{{ toast.message }}</div>
    </div>
  </div>
</template>
