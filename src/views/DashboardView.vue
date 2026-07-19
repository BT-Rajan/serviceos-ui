<script setup>
import { computed } from 'vue'

const kpis = [
  { label: 'Active Projects', value: '24', status: 'running', badge: '+3 this month', badgeStatus: 'success' },
  { label: 'Tasks Due Today', value: '17', status: 'warning', badge: '5 overdue', badgeStatus: 'warning' },
  { label: 'Revenue MTD', value: '$186.4k', status: 'success', badge: '+12.4% vs last month', badgeStatus: 'success', mono: true },
  { label: 'Client Satisfaction', value: '4.7', suffix: '/5', status: 'neutral', badge: '142 responses', badgeStatus: 'neutral' },
]

const activity = [
  { icon: 'check-square', status: 'success', title: 'Priya closed "Vendor contract review"', meta: '10:24 AM · Project Falcon' },
  { icon: 'git-branch', status: 'running', title: 'Workflow "Client Onboarding" started', meta: '9:58 AM · Acme Retail' },
  { icon: 'file', status: 'warning', title: 'Invoice #4021 awaiting approval', meta: '9:15 AM · Northwind Logistics' },
  { icon: 'truck', status: 'danger', title: 'Vendor sync failed for Meridian Supply', meta: '8:47 AM · Auto-retry in 20m' },
  { icon: 'users', status: 'neutral', title: 'Dinesh added 2 new users', meta: 'Yesterday, 5:12 PM' },
]

const workflowSlices = [
  { status: 'success', label: 'Complete', pct: 50 },
  { status: 'running', label: 'Running', pct: 30 },
  { status: 'warning', label: 'At risk', pct: 15 },
  { status: 'danger', label: 'Blocked', pct: 5 },
]

// Calendar — July 2026, static mock: 1st falls on a Wednesday, today is the 19th
const CIRCUMFERENCE = 301.6
const donutSlices = computed(() => {
  let offset = 0
  return workflowSlices.map((s) => {
    const dash = (s.pct / 100) * CIRCUMFERENCE
    const slice = { ...s, dash, offset: -offset }
    offset += dash
    return slice
  })
})

const startOffset = 3
const daysInMonth = 31
const today = 19
const marked = { 14: 'running', 22: 'warning' }
const calendarDays = computed(() => {
  const cells = Array.from({ length: startOffset }, () => null)
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ day: d, isToday: d === today, mark: marked[d] || null })
  }
  return cells
})

const upcoming = [
  { status: 'running', label: 'Kickoff — Acme Retail' },
  { status: 'warning', label: 'Invoice due — Northwind' },
]
</script>

<template>
  <div class="flex items-center justify-between" style="margin-bottom: var(--space-6);">
    <div>
      <h1>Dashboard</h1>
      <p class="text-slate" style="margin-top:4px;">Wednesday, 19 July — here's where things stand.</p>
    </div>
    <div class="flex gap-3">
      <AppButton icon="file">Export</AppButton>
      <AppButton variant="primary" icon="plus">New Project</AppButton>
    </div>
  </div>

  <!-- KPI ROW -->
  <div class="grid grid-4" style="margin-bottom: var(--space-6);">
    <AppCard v-for="k in kpis" :key="k.label" :status="k.status">
      <div class="text-sm text-slate">{{ k.label }}</div>
      <div :class="k.mono && 'mono'" style="font-family:var(--font-display); font-size:var(--text-3xl); margin-top:var(--space-2);">
        {{ k.value }}<span v-if="k.suffix" style="font-size:var(--text-lg); color:var(--color-slate);">{{ k.suffix }}</span>
      </div>
      <StatusBadge :status="k.badgeStatus" style="margin-top:var(--space-3);">{{ k.badge }}</StatusBadge>
    </AppCard>
  </div>

  <!-- CHARTS ROW -->
  <div class="grid grid-2" style="margin-bottom: var(--space-6); align-items: stretch;">
    <div class="chart-card">
      <div class="card-header" style="margin-bottom: var(--space-4);">
        <div>
          <div class="card-title">Revenue trend</div>
          <div class="card-subtitle">Last 6 months</div>
        </div>
        <span class="chip">MTD</span>
      </div>
      <svg viewBox="0 0 480 160" style="width:100%; height:160px;">
        <polyline points="0,120 80,100 160,108 240,70 320,60 400,30 480,20"
          fill="none" stroke="var(--color-signal)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
        <polyline points="0,120 80,100 160,108 240,70 320,60 400,30 480,20 480,160 0,160"
          fill="var(--color-signal-soft)" opacity="0.6" stroke="none"/>
        <g fill="var(--color-signal)">
          <circle cx="0" cy="120" r="3"/><circle cx="80" cy="100" r="3"/><circle cx="160" cy="108" r="3"/>
          <circle cx="240" cy="70" r="3"/><circle cx="320" cy="60" r="3"/><circle cx="400" cy="30" r="3"/><circle cx="480" cy="20" r="3"/>
        </g>
      </svg>
      <div class="chart-legend">
        <span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span><span>Jul</span>
      </div>
    </div>

    <div class="chart-card">
      <div class="card-header" style="margin-bottom: var(--space-4);">
        <div>
          <div class="card-title">Workflow status</div>
          <div class="card-subtitle">Across all active projects</div>
        </div>
      </div>
      <div class="flex items-center gap-4">
        <svg viewBox="0 0 120 120" width="120" height="120">
          <circle cx="60" cy="60" r="48" fill="none" stroke="var(--color-border)" stroke-width="16"/>
          <circle
            v-for="s in donutSlices" :key="s.label"
            cx="60" cy="60" r="48" fill="none" :stroke="`var(--status-${s.status})`" stroke-width="16"
            :stroke-dasharray="`${s.dash} ${CIRCUMFERENCE}`" :stroke-dashoffset="s.offset"
            transform="rotate(-90 60 60)"
          />
        </svg>
        <div class="flex flex-col gap-3" style="flex:1;">
          <div v-for="s in workflowSlices" :key="s.label" class="chart-legend-item">
            <span class="chart-legend-swatch" :style="{ background: `var(--status-${s.status})` }"></span>{{ s.label }} — {{ s.pct }}%
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- ACTIVITY / CALENDAR / NOTIFICATIONS ROW -->
  <div class="grid" style="grid-template-columns: 1.4fr 1fr 1fr;">
    <AppCard>
      <div class="card-header">
        <div class="card-title">Recent activity</div>
        <router-link to="/audit" class="text-sm">View all</router-link>
      </div>
      <div class="flex flex-col gap-3">
        <div v-for="(a, i) in activity" :key="i" class="notif-item" :class="`status-${a.status}`">
          <AppIcon :name="a.icon" size="sm" />
          <div><div class="notif-item-title">{{ a.title }}</div><div class="notif-item-meta">{{ a.meta }}</div></div>
        </div>
      </div>
    </AppCard>

    <AppCard>
      <div class="card-header">
        <div class="card-title">Calendar</div>
        <span class="text-sm text-slate">July</span>
      </div>
      <div style="display:grid; grid-template-columns:repeat(7,1fr); gap:4px; text-align:center; font-size:var(--text-xs); color:var(--color-slate-soft); margin-bottom:var(--space-2);">
        <span>S</span><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span>
      </div>
      <div style="display:grid; grid-template-columns:repeat(7,1fr); gap:4px;">
        <span
          v-for="(c, i) in calendarDays" :key="i"
          style="aspect-ratio:1; display:flex; align-items:center; justify-content:center; border-radius:var(--radius-sm); font-size:var(--text-xs);"
          :style="c && c.isToday
            ? { background: 'var(--color-signal)', color: 'var(--color-signal-ink)', fontWeight: 600 }
            : c && c.mark
              ? { color: 'var(--color-ink)', boxShadow: `inset 0 -2px 0 var(--status-${c.mark})` }
              : { color: 'var(--color-ink)' }"
        >{{ c ? c.day : '' }}</span>
      </div>
      <div class="flex flex-col gap-2" style="margin-top:var(--space-4);">
        <div v-for="u in upcoming" :key="u.label" class="flex items-center gap-2 text-sm">
          <span style="width:6px;height:6px;border-radius:50%;" :style="{ background: `var(--status-${u.status})` }"></span>{{ u.label }}
        </div>
      </div>
    </AppCard>

    <AppCard>
      <div class="card-header">
        <div class="card-title">Notifications</div>
        <StatusBadge status="danger">3 new</StatusBadge>
      </div>
      <div class="flex flex-col gap-2">
        <div v-for="(a, i) in activity.slice(0, 4)" :key="i" class="notif-item" :class="`status-${a.status}`">
          <AppIcon :name="a.icon" size="sm" />
          <div><div class="notif-item-title">{{ a.title }}</div><div class="notif-item-meta">{{ a.meta }}</div></div>
        </div>
      </div>
    </AppCard>
  </div>
</template>
