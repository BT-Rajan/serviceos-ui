<script setup>
import { ref, computed } from 'vue'
import { useMockStore } from '../store/mockData'
import { useToast } from '../composables/useToast'

const store = useMockStore()
const { toast } = useToast()
const view = ref('kanban')
const dragTaskId = ref(null)

const columns = [
  { key: 'todo', label: 'To do', status: 'neutral' },
  { key: 'in-progress', label: 'In progress', status: 'running' },
  { key: 'blocked', label: 'Blocked', status: 'danger' },
  { key: 'done', label: 'Done', status: 'success' }
]

function tasksIn(key) {
  return store.tasks.filter(t => t.status === key)
}

function onDrop(colKey) {
  const task = store.tasks.find(t => t.id === dragTaskId.value)
  if (task && task.status !== colKey) {
    task.status = colKey
    toast({ title: `"${task.title}" moved to ${colKey.replace('-', ' ')}`, status: 'success' })
  }
  dragTaskId.value = null
}

const priorityStatus = { high: 'danger', medium: 'warning', low: 'neutral' }

const sortedByDue = computed(() => [...store.tasks].sort((a, b) => a.due.localeCompare(b.due)))
</script>

<template>
  <div class="flex items-center justify-between" style="margin-bottom: var(--space-6);">
    <div>
      <h1>Tasks</h1>
      <p class="text-slate" style="margin-top:4px;">{{ store.tasks.length }} tasks across all projects.</p>
    </div>
    <div class="flex gap-3">
      <div class="segmented">
        <button :class="{ active: view === 'kanban' }" @click="view = 'kanban'">
          <svg class="icon icon-sm"><use href="#icon-columns" /></svg> Board
        </button>
        <button :class="{ active: view === 'list' }" @click="view = 'list'">
          <svg class="icon icon-sm"><use href="#icon-list" /></svg> List
        </button>
        <button :class="{ active: view === 'calendar' }" @click="view = 'calendar'">
          <svg class="icon icon-sm"><use href="#icon-calendar" /></svg> Calendar
        </button>
      </div>
      <button class="btn btn-primary">
        <svg class="icon icon-sm"><use href="#icon-plus" /></svg>
        New Task
      </button>
    </div>
  </div>

  <!-- Kanban -->
  <div v-if="view === 'kanban'" class="kanban-board">
    <div v-for="col in columns" :key="col.key" class="kanban-column" @dragover.prevent @drop="onDrop(col.key)">
      <div class="kanban-column-header">
        <div class="flex items-center gap-2">
          <span class="chart-legend-swatch" :style="{ background: `var(--status-${col.status})` }"></span>
          <span class="kanban-column-title">{{ col.label }}</span>
        </div>
        <span class="kanban-column-count">{{ tasksIn(col.key).length }}</span>
      </div>
      <div class="kanban-cards">
        <div
          v-for="t in tasksIn(col.key)" :key="t.id"
          class="kanban-card" :class="`status-${priorityStatus[t.priority]}`"
          style="cursor:grab;"
          draggable="true"
          @dragstart="dragTaskId = t.id">
          <div class="kanban-card-title">{{ t.title }}</div>
          <div class="flex items-center justify-between">
            <span class="chip">{{ t.project }}</span>
            <span class="avatar avatar-sm">{{ t.assignee }}</span>
          </div>
          <div class="kanban-card-meta text-xs text-slate">
            <span class="flex items-center gap-1"><svg class="icon icon-sm"><use href="#icon-clock" /></svg>{{ t.due }}</span>
          </div>
        </div>
        <div v-if="!tasksIn(col.key).length" class="text-xs text-slate" style="padding: var(--space-3); text-align:center;">No tasks</div>
      </div>
    </div>
  </div>

  <!-- List -->
  <div v-else-if="view === 'list'" class="card" style="padding:0;">
    <table class="table">
      <thead>
        <tr><th>Task</th><th>Project</th><th>Assignee</th><th>Priority</th><th>Status</th><th>Due</th></tr>
      </thead>
      <tbody>
        <tr v-for="t in sortedByDue" :key="t.id" :class="`status-${priorityStatus[t.priority]}`">
          <td style="font-weight:500;">{{ t.title }}</td>
          <td class="text-sm">{{ t.project }}</td>
          <td><span class="avatar avatar-sm">{{ t.assignee }}</span></td>
          <td><span class="badge" :class="`status-${priorityStatus[t.priority]}`">{{ t.priority }}</span></td>
          <td class="text-sm">{{ t.status.replace('-', ' ') }}</td>
          <td class="mono text-sm">{{ t.due }}</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- Calendar (simplified agenda grouped by date) -->
  <div v-else class="card">
    <div class="card-header"><div class="card-title">Upcoming by date</div></div>
    <div class="flex flex-col gap-4">
      <div v-for="date in [...new Set(sortedByDue.map(t => t.due))]" :key="date">
        <div class="text-xs text-slate mono" style="margin-bottom: var(--space-2);">{{ date }}</div>
        <div class="flex flex-col gap-2">
          <div v-for="t in sortedByDue.filter(t => t.due === date)" :key="t.id" class="notif-item" :class="`status-${priorityStatus[t.priority]}`">
            <svg class="icon icon-sm icon-muted"><use href="#icon-check-square" /></svg>
            <div>
              <div class="notif-item-title">{{ t.title }}</div>
              <div class="notif-item-meta">{{ t.project }} · {{ t.assignee }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
