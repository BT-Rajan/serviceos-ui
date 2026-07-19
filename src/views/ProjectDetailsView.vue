<script setup>
import { ref } from 'vue'

const tabs = [
  { key: 'overview', label: 'Overview' },
  { key: 'tasks', label: 'Tasks', count: 14 },
  { key: 'workflow', label: 'Workflow' },
  { key: 'documents', label: 'Documents', count: 8 },
  { key: 'activity', label: 'Activity' },
  { key: 'team', label: 'Team', count: 4 },
]
const activeTab = ref('overview')

const milestones = [
  { icon: 'check-square', status: 'success', title: 'Kickoff & discovery', meta: 'Completed Jun 30' },
  { icon: 'check-square', status: 'success', title: 'Data migration', meta: 'Completed Jul 12' },
  { icon: 'git-branch', status: 'running', title: 'Staff training', meta: 'In progress — 3 of 5 sessions done' },
  { icon: 'bell', status: 'neutral', title: 'Go-live', meta: 'Scheduled Aug 4' },
  { icon: 'bell', status: 'neutral', title: 'Hypercare close-out', meta: 'Scheduled Sep 3' },
]

const openTasks = ref([
  { label: 'Confirm POS hardware shipment', done: false, badge: 'Due today', status: 'warning' },
  { label: 'Session 4: register staff training', done: false, badge: 'Tomorrow', status: 'running' },
  { label: 'Draft hypercare runbook', done: true, badge: 'Done', status: 'success' },
])

const taskTable = [
  { label: 'Confirm POS hardware shipment', assignee: 'RD', status: 'warning', badge: 'Due today', due: 'Jul 19' },
  { label: 'Session 4: register staff training', assignee: 'SM', status: 'running', badge: 'Scheduled', due: 'Jul 20' },
  { label: 'Draft hypercare runbook', assignee: 'JT', status: 'success', badge: 'Done', due: 'Jul 15' },
  { label: 'Prepare go-live comms', assignee: 'PK', status: 'neutral', badge: 'Not started', due: 'Jul 30' },
]

const workflowStages = [
  { label: 'Discovery', status: 'success' },
  { label: 'Data migration', status: 'success' },
  { label: 'Staff training', status: 'running' },
  { label: 'Go-live', status: 'neutral' },
  { label: 'Hypercare', status: 'neutral' },
]

const documents = [
  { name: 'Onboarding SOW.pdf', meta: '1.2 MB · Jun 24' },
  { name: 'Data Migration Plan.xlsx', meta: '840 KB · Jul 2' },
  { name: 'Training Deck.pptx', meta: '3.4 MB · Jul 14' },
  { name: 'Hypercare Runbook.docx', meta: '210 KB · Jul 15' },
]

const activity = [
  { icon: 'check-square', status: 'success', title: 'Priya closed "Draft hypercare runbook"', meta: 'Jul 15, 4:02 PM' },
  { icon: 'git-branch', status: 'running', title: 'Staff training milestone started', meta: 'Jul 14, 9:00 AM' },
  { icon: 'file', status: 'neutral', title: 'Sara uploaded Training Deck.pptx', meta: 'Jul 14, 8:41 AM' },
  { icon: 'check-square', status: 'success', title: 'Data migration milestone completed', meta: 'Jul 12, 6:15 PM' },
]

const team = [
  { initials: 'PK', name: 'Priya Kannan', role: 'Project owner' },
  { initials: 'RD', name: 'Rahul Dev', role: 'Implementation lead' },
  { initials: 'SM', name: 'Sara Menon', role: 'Training' },
  { initials: 'JT', name: 'James Tan', role: 'Support' },
]
</script>

<template>
  <div class="breadcrumb">
    <router-link to="/projects">Projects</router-link>
    <span class="sep">/</span>
    <span class="current">Client Onboarding</span>
  </div>

  <div class="flex items-center justify-between" style="margin-bottom: var(--space-5); flex-wrap: wrap; gap: var(--space-3);">
    <div>
      <div class="flex items-center gap-3">
        <h1>Client Onboarding</h1>
        <StatusBadge status="running">Running</StatusBadge>
      </div>
      <p class="text-slate" style="margin-top:4px;">Acme Retail · PRJ-1042 · Owned by Priya Kannan</p>
    </div>
    <div class="flex gap-3">
      <AppButton icon="copy">Duplicate</AppButton>
      <AppButton icon="file">Archive</AppButton>
      <AppButton variant="primary" icon="settings">Edit Project</AppButton>
    </div>
  </div>

  <!-- TABS -->
  <div class="tabs">
    <button
      v-for="t in tabs" :key="t.key"
      class="tab" :class="{ active: activeTab === t.key }"
      @click="activeTab = t.key"
    >{{ t.label }} <span v-if="t.count" class="tab-count">{{ t.count }}</span></button>
  </div>

  <!-- OVERVIEW -->
  <div v-if="activeTab === 'overview'" class="grid" style="grid-template-columns: 2fr 1fr; align-items:start;">
    <div class="flex flex-col gap-5">
      <AppCard>
        <div class="card-title" style="margin-bottom:var(--space-3);">Description</div>
        <p style="margin:0;">Full onboarding of Acme Retail across billing, store systems, and staff accounts. Covers data migration from their legacy POS, staff training sessions, and a 30-day hypercare window after go-live.</p>
        <div class="flex gap-2" style="margin-top:var(--space-4);">
          <span class="tag">retail</span><span class="tag">onboarding</span><span class="tag">priority: high</span>
        </div>
      </AppCard>

      <AppCard>
        <div class="card-header"><div class="card-title">Milestones</div></div>
        <div class="flex flex-col gap-3">
          <div v-for="(m, i) in milestones" :key="i" class="notif-item" :class="`status-${m.status}`">
            <AppIcon :name="m.icon" size="sm" />
            <div><div class="notif-item-title">{{ m.title }}</div><div class="notif-item-meta">{{ m.meta }}</div></div>
          </div>
        </div>
      </AppCard>

      <AppCard>
        <div class="card-header"><div class="card-title">Open tasks</div><router-link to="/tasks" class="text-sm">View all in Tasks</router-link></div>
        <div class="flex flex-col gap-2">
          <div v-for="(t, i) in openTasks" :key="i" class="flex items-center gap-3 text-sm" style="padding:var(--space-2) 0;">
            <input v-model="t.done" type="checkbox" class="checkbox">
            <span style="flex:1;" :style="t.done ? { textDecoration: 'line-through', color: 'var(--color-slate-soft)' } : null">{{ t.label }}</span>
            <StatusBadge :status="t.done ? 'success' : t.status">{{ t.done ? 'Done' : t.badge }}</StatusBadge>
          </div>
        </div>
      </AppCard>
    </div>

    <div class="flex flex-col gap-5">
      <AppCard>
        <div class="card-title" style="margin-bottom:var(--space-3);">Key info</div>
        <div class="info-row"><span class="label">Client</span><span class="value">Acme Retail</span></div>
        <div class="info-row"><span class="label">Owner</span><span class="value">Priya Kannan</span></div>
        <div class="info-row"><span class="label">Start date</span><span class="value mono">Jun 24, 2026</span></div>
        <div class="info-row"><span class="label">Due date</span><span class="value mono">Aug 4, 2026</span></div>
        <div class="info-row"><span class="label">Budget</span><span class="value mono">$42,000</span></div>
        <div class="info-row"><span class="label">Priority</span><span class="value">High</span></div>
      </AppCard>

      <AppCard>
        <div class="card-title" style="margin-bottom:var(--space-3);">Progress</div>
        <div class="progress" style="margin-bottom:var(--space-2);"><div class="progress-bar" style="width:62%;"></div></div>
        <div class="flex justify-between text-sm text-slate"><span>62% complete</span><span>3 of 5 milestones</span></div>
      </AppCard>

      <AppCard>
        <div class="card-header"><div class="card-title">Team</div><span class="text-sm text-slate">4 members</span></div>
        <div class="flex flex-col gap-3">
          <div v-for="m in team" :key="m.initials" class="flex items-center gap-3">
            <div class="avatar avatar-sm">{{ m.initials }}</div>
            <div><div style="font-size:var(--text-sm); font-weight:500;">{{ m.name }}</div><div class="text-xs text-slate-soft">{{ m.role }}</div></div>
          </div>
        </div>
      </AppCard>
    </div>
  </div>

  <!-- TASKS -->
  <div v-else-if="activeTab === 'tasks'" class="table-wrap">
    <table class="table-responsive">
      <thead><tr><th>Task</th><th>Assignee</th><th>Status</th><th>Due</th></tr></thead>
      <tbody>
        <tr v-for="(t, i) in taskTable" :key="i" :class="`status-${t.status}`">
          <td data-label="Task">{{ t.label }}</td>
          <td data-label="Assignee"><div class="avatar avatar-sm">{{ t.assignee }}</div></td>
          <td data-label="Status"><StatusBadge :status="t.status">{{ t.badge }}</StatusBadge></td>
          <td data-label="Due" class="mono">{{ t.due }}</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- WORKFLOW -->
  <AppCard v-else-if="activeTab === 'workflow'">
    <div class="card-header"><div class="card-title">Linked workflow</div><router-link to="/workflow" class="text-sm">Open in Workflows</router-link></div>
    <div class="flex items-center gap-2" style="overflow-x:auto; padding:var(--space-4) 0;">
      <template v-for="(s, i) in workflowStages" :key="s.label">
        <StatusBadge :status="s.status">{{ s.label }}</StatusBadge>
        <AppIcon v-if="i < workflowStages.length - 1" name="chevron-right" size="sm" muted directional />
      </template>
    </div>
  </AppCard>

  <!-- DOCUMENTS -->
  <div v-else-if="activeTab === 'documents'" class="grid grid-4">
    <AppCard v-for="d in documents" :key="d.name">
      <AppIcon name="file" size="lg" muted />
      <div style="margin-top:var(--space-3); font-size:var(--text-sm); font-weight:500;">{{ d.name }}</div>
      <div class="text-xs text-slate-soft">{{ d.meta }}</div>
    </AppCard>
  </div>

  <!-- ACTIVITY -->
  <AppCard v-else-if="activeTab === 'activity'">
    <div class="flex flex-col gap-3">
      <div v-for="(a, i) in activity" :key="i" class="notif-item" :class="`status-${a.status}`">
        <AppIcon :name="a.icon" size="sm" />
        <div><div class="notif-item-title">{{ a.title }}</div><div class="notif-item-meta">{{ a.meta }}</div></div>
      </div>
    </div>
  </AppCard>

  <!-- TEAM -->
  <div v-else-if="activeTab === 'team'" class="grid grid-4">
    <AppCard v-for="m in team" :key="m.initials" class="flex items-center gap-3">
      <div class="avatar">{{ m.initials }}</div>
      <div><div style="font-weight:500;">{{ m.name }}</div><div class="text-xs text-slate-soft">{{ m.role }}</div></div>
    </AppCard>
  </div>
</template>
