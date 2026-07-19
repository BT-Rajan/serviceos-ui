<script setup>
import { computed } from 'vue'
import { useMockStore } from '../store/mockData'
import StatCard from '../components/StatCard.vue'
import LineChart from '../components/charts/LineChart.vue'
import DonutChart from '../components/charts/DonutChart.vue'

const store = useMockStore()

const workflowSegments = [
  { label: 'Complete', value: 50, status: 'success' },
  { label: 'Running', value: 30, status: 'running' },
  { label: 'At risk', value: 15, status: 'warning' },
  { label: 'Blocked', value: 5, status: 'danger' }
]

const recentActivity = computed(() => store.auditLog.slice(0, 4))
const upcoming = computed(() => store.tasks.filter(t => t.status !== 'done').slice(0, 4))
</script>

<template>
  <div class="flex items-center justify-between" style="margin-bottom: var(--space-6);">
    <div>
      <h1>Dashboard</h1>
      <p class="text-slate" style="margin-top:4px;">Sunday, 19 July — here's where things stand.</p>
    </div>
    <div class="flex gap-3">
      <button class="btn btn-secondary">
        <svg class="icon icon-sm"><use href="#icon-file" /></svg>
        Export
      </button>
      <router-link to="/projects" class="btn btn-primary">
        <svg class="icon icon-sm"><use href="#icon-plus" /></svg>
        New Project
      </router-link>
    </div>
  </div>

  <div class="grid grid-4" style="margin-bottom: var(--space-6);">
    <StatCard label="Active Projects" :value="store.kpis.activeProjects" status="running" badge="+3 this month" badge-status="success" />
    <StatCard label="Tasks Due Today" :value="store.tasks.filter(t => t.due === '2026-07-19').length" status="warning" badge="5 overdue" badge-status="warning" />
    <StatCard label="Revenue MTD" value="$186.4k" status="success" badge="+12.4% vs last month" badge-status="success" mono />
    <StatCard label="Client Satisfaction" value="4.7" suffix="/5" status="neutral" badge="142 responses" />
  </div>

  <div class="grid grid-2" style="margin-bottom: var(--space-6); align-items: stretch;">
    <div class="chart-card">
      <div class="card-header" style="margin-bottom: var(--space-4);">
        <div>
          <div class="card-title">Revenue trend</div>
          <div class="card-subtitle">Last 7 months</div>
        </div>
        <span class="chip">MTD</span>
      </div>
      <LineChart :values="store.revenueTrend" :labels="store.revenueMonths" />
    </div>

    <div class="chart-card">
      <div class="card-header" style="margin-bottom: var(--space-4);">
        <div>
          <div class="card-title">Workflow status</div>
          <div class="card-subtitle">Across all active projects</div>
        </div>
      </div>
      <DonutChart :segments="workflowSegments" />
    </div>
  </div>

  <div class="grid" style="grid-template-columns: 1.4fr 1fr 1fr; gap: var(--space-6);">
    <div class="card">
      <div class="card-header">
        <div class="card-title">Recent activity</div>
        <router-link to="/audit" class="text-sm">View all</router-link>
      </div>
      <div class="flex flex-col gap-3">
        <div v-for="a in recentActivity" :key="a.id" class="notif-item" :class="`status-${a.status}`">
          <svg class="icon icon-sm icon-muted"><use href="#icon-activity" /></svg>
          <div>
            <div class="notif-item-title">{{ a.action }}</div>
            <div class="notif-item-meta">{{ a.actor }} · {{ a.time }}</div>
          </div>
        </div>
      </div>
    </div>

    <div class="card">
      <div class="card-header">
        <div class="card-title">Tasks due soon</div>
        <router-link to="/tasks" class="text-sm">View all</router-link>
      </div>
      <div class="flex flex-col gap-3">
        <div v-for="t in upcoming" :key="t.id" class="notif-item" :class="`status-${t.priority === 'high' ? 'danger' : t.priority === 'medium' ? 'warning' : 'neutral'}`">
          <svg class="icon icon-sm icon-muted"><use href="#icon-check-square" /></svg>
          <div>
            <div class="notif-item-title">{{ t.title }}</div>
            <div class="notif-item-meta">Due {{ t.due }}</div>
          </div>
        </div>
      </div>
    </div>

    <div class="card">
      <div class="card-header">
        <div class="card-title">Notifications</div>
        <router-link to="/notifications" class="text-sm">View all</router-link>
      </div>
      <div class="flex flex-col gap-3">
        <div v-for="n in store.notifications.slice(0, 4)" :key="n.id" class="notif-item" :class="`status-${n.status}`">
          <svg class="icon icon-sm icon-muted"><use :href="`#icon-${n.icon}`" /></svg>
          <div>
            <div class="notif-item-title">{{ n.title }}</div>
            <div class="notif-item-meta">{{ n.time }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
