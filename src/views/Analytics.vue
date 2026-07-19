<script setup>
import { ref, computed } from 'vue'
import { useMockStore } from '../store/mockData'
import LineChart from '../components/charts/LineChart.vue'
import DonutChart from '../components/charts/DonutChart.vue'
import BarChart from '../components/charts/BarChart.vue'

const store = useMockStore()
const range = ref('30d')

function sparkPoints(values, w = 80, h = 32) {
  const min = Math.min(...values), max = Math.max(...values), r = max - min || 1
  const step = w / (values.length - 1)
  return values.map((v, i) => `${i * step},${h - ((v - min) / r) * h}`).join(' ')
}

const kpis = [
  { label: 'Revenue', value: '$186.4k', mono: true, delta: '+12.4%', status: 'success', spark: [26, 22, 24, 14, 10, 4] },
  { label: 'Tasks completed', value: '312', delta: '+8.1%', status: 'success', spark: [20, 24, 16, 18, 8, 10] },
  { label: 'Avg. cycle time', value: '4.2', suffix: 'd', delta: '+0.4d', status: 'warning', spark: [8, 10, 14, 12, 20, 24] },
  { label: 'Team utilization', value: '78%', delta: '+3.0%', status: 'success', spark: [22, 18, 20, 12, 14, 6] }
]

const clientRevenue = [
  { label: 'Marlow & Finch', value: 33, status: 'running' },
  { label: 'Beacon Health', value: 25, status: 'success' },
  { label: 'Northwind Legal', value: 20, status: 'warning' },
  { label: 'Others', value: 22, status: 'neutral' }
]

const teamUtilization = computed(() => store.users.filter(u => u.status === 'active').map(u => ({ label: u.initials, value: 60 + (u.name.length * 7) % 40, status: 'running' })))
</script>

<template>
  <div class="flex items-center justify-between" style="margin-bottom: var(--space-5); flex-wrap: wrap; gap: var(--space-3);">
    <div>
      <h1>Analytics</h1>
      <p class="text-slate" style="margin-top:4px;">Deep-dive metrics across projects, revenue, and team utilization.</p>
    </div>
    <div class="flex gap-3 items-center">
      <div class="segmented">
        <button v-for="r in ['7d','30d','90d','ytd']" :key="r" :class="{ active: range === r }" @click="range = r">{{ r.toUpperCase() }}</button>
      </div>
      <button class="btn btn-secondary"><svg class="icon icon-sm"><use href="#icon-file" /></svg>Export</button>
    </div>
  </div>

  <div class="grid grid-4" style="margin-bottom: var(--space-6);">
    <div v-for="k in kpis" :key="k.label" class="card">
      <div class="flex items-center justify-between" dir="ltr">
        <div>
          <div class="text-sm text-slate">{{ k.label }}</div>
          <div style="font-family:var(--font-display); font-size:var(--text-2xl); margin-top:var(--space-1);" :class="{ mono: k.mono }">
            {{ k.value }}<span v-if="k.suffix" style="font-size:var(--text-base); color:var(--color-slate);">{{ k.suffix }}</span>
          </div>
          <div class="badge" :class="`status-${k.status}`" style="margin-top:var(--space-2);">{{ k.delta }}</div>
        </div>
        <svg viewBox="0 0 80 32" width="80" height="32">
          <polyline :points="sparkPoints(k.spark)" fill="none" :stroke="`var(--status-${k.status})`" stroke-width="2" />
        </svg>
      </div>
    </div>
  </div>

  <div class="grid" style="grid-template-columns: 1.6fr 1fr; margin-bottom: var(--space-6); gap: var(--space-6); align-items: stretch;">
    <div class="chart-card">
      <div class="card-header" style="margin-bottom: var(--space-4);">
        <div><div class="card-title">Revenue trend</div><div class="card-subtitle">Last 7 months</div></div>
      </div>
      <LineChart :values="store.revenueTrend" :labels="store.revenueMonths" :height="200" />
    </div>
    <div class="chart-card">
      <div class="card-header" style="margin-bottom: var(--space-4);"><div class="card-title">Client revenue share</div></div>
      <DonutChart :segments="clientRevenue" />
    </div>
  </div>

  <div class="chart-card">
    <div class="card-header" style="margin-bottom: var(--space-4);"><div class="card-title">Team utilization</div><div class="card-subtitle">% of capacity booked this period</div></div>
    <BarChart :values="teamUtilization" />
  </div>
</template>
